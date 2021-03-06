module Types
  class QueryType < Types::BaseObject
    # add_field(GraphQL::Types::Relay::NodeField)
    # add_field(GraphQL::Types::Relay::NodesField)

    field :conference, ConferenceType, null: true do
      description 'Find a conference by acronym'
      argument :id, ID, required: true
    end
    def conference(id:)
      Frontend::Conference.find_by(acronym: id)
    end

    field :conferences, function: Resolvers::Conference

    field :conferencesRecent, [ConferenceType], null: true do
      description 'All conferences as List, recent first'
      argument :first, Integer, default_value: 5, prepare: ->(limit) { [limit, 30].min }, required: true
      argument :offset, Integer, default_value: 0, required: false
    end
    def conferences(offset:, first:)
      Frontend::Conference.with_recent_events(first).offset(offset)
    end

    field :allConferences, ConferenceType.connection_type, null: true do
      description 'All conferences as Connection'
    end

    field :lecture, LectureType, null: true do
      description 'Find a lecture by guid'
      argument :guid, ID, required: true
    end
    def lecture(guid:)
      Frontend::Event.find_by(guid: guid)
    end

    field :lectureBySlug, LectureType, null: true do
      description 'Find a lecture by slug'
      argument :slug, ID, required: true
    end
    def lecture_by_slug(slug:)
      Frontend::Event.find_by(slug: slug)
    end

    field :lecturesRelatedTo, LectureType.connection_type, null: true do
      description 'A list of related lectures, ordered by decreasing relevance.'
      argument :guid, ID, required: true
    end
    def lectures_related_to(guid:)
      Frontend::Event.find_by(guid: guid).related_events
    end
  end
end
