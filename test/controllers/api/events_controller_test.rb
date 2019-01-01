require 'test_helper'

class Api::EventsControllerTest < ActionController::TestCase
  setup do
    @key = create(:api_key)
  end

  test 'should list recent events' do
    create(:event)
    get 'index', format: :json, params: { api_key: @key.key }
    assert_response :success
    assert JSON.parse(response.body)
  end

  test 'should list events of conference' do
    ACRONYM = 'frabcon123'
    conference = create(:conference, acronym: ACRONYM)
    create(:event, conference: conference)
    create(:event, conference: conference)
    create(:event, conference: conference)
    get 'index', format: :json, params: { api_key: @key.key, acronym: ACRONYM }
    events = JSON.parse(response.body)
    assert events.size > 2
  end

  test 'should update promoted flag according to view count of events' do
    conference = create(:conference)
    events = []
    events << create(:event_with_recordings, conference: conference, view_count: 1)
    events.last.recordings.first.recording_views.create
    events << create(:event_with_recordings, conference: conference, view_count: 2)
    events.last.recordings.first.recording_views.create
    events << create(:event_with_recordings, conference: conference, view_count: 3)
    events.last.recordings.first.recording_views.create

    get 'update_promoted', format: :json, params: { api_key: @key.key }
    events.each { |event| assert Event.find(event.id).promoted }
  end

  test 'should update view counts of events' do
    EventViewCount.touch!
    conference = create(:conference)
    event = create(:event_with_recordings, conference: conference, view_count: 1)
    event.recordings.first.recording_views.create
    event.recordings.first.recording_views.create
    event.recordings.last.recording_views.create
    other_event = create(:event_with_recordings, conference: conference, view_count: 2)
    other_event.recordings.last.recording_views.create

    get 'update_view_counts', format: :json, params: { api_key: @key.key }
    assert_equal 4, event.reload.view_count
    assert_equal 3, other_event.reload.view_count

    event.recordings.last.recording_views.create
    other_event.recordings.last.recording_views.create
    get 'update_view_counts', format: :json, params: { api_key: @key.key }
    assert_equal 5, event.reload.view_count
    assert_equal 4, other_event.reload.view_count
  end

  test 'should create event' do
    create :conference_with_recordings
    args = event_args
    assert_difference('Event.count') do
      post 'create', format: :json, params: {
        api_key: @key.key,
        acronym: Conference.last.acronym,
        event: args
      }
    end
    assert_response :success
    assert JSON.parse(response.body)
    event = assigns(:event)
    assert_equal 'qwerty', event.guid
    assert_equal 'best_event', event.slug
    assert_equal 'Event?', event.title
    assert_equal %w(p q r), event.persons
    assert_equal %w(t u v), event.tags
  end

  test 'when event create fails it should return json errors' do
    create :conference_with_recordings
    args = event_args
    args.delete(:slug)

    assert_no_difference('Event.count') do
      post 'create', format: :json, params: {
        api_key: @key.key,
        acronym: Conference.last.acronym,
        event: args
      }
    end
    msg = JSON.parse(response.body)
    assert_equal ['slug'], msg.keys
    assert_equal ["can't be blank"], msg['slug']
    assert_response 422

    args = Conference.last.events.first.attributes
    args.delete('guid')
    assert_no_difference('Event.count') do
      post 'create', format: :json, params: {
        api_key: @key.key,
        acronym: Conference.last.acronym,
        event: args
      }
    end
    assert_response 422
    msg = JSON.parse(response.body)
    assert_equal ['slug'], msg.keys
    assert_equal ["has already been taken"], msg['slug']
  end

  def event_args
    {
      guid: 'qwerty',
      poster_url: 'http://koeln.ccc.de/images/chaosknoten_preview.jpg',
      thumb_url: 'http://koeln.ccc.de/images/chaosknoten.jpg',
      timeline_url: 'http://koeln.ccc.de/images/chaosknoten.timeline.jpg',
      thumbnails_url: 'http://koeln.ccc.de/images/chaosknoten.thumbnails.vtt',
      original_language: 'eng-deu',
      slug: 'best_event',
      title: 'Event?',
      subtitle: 'abcd',
      description: 'defgh',
      persons: %w(p q r),
      tags: %w(t u v)
    }
  end
end
