module Frontend
  class Conference < ::Conference
    has_many :events, -> { order(release_date: :desc, id: :desc) }, class_name: 'Frontend::Event'
    has_many :recordings, through: :events

    scope :with_events, -> {
      where('event_last_released_at IS NOT NULL')
    }
    scope :with_recent_events, ->(n) {
      where('event_last_released_at IS NOT NULL')
        .order('event_last_released_at DESC')
        .limit(n)
    }
    scope :with_events_newer, ->(date) {
      where('event_last_released_at IS NOT NULL')
        .order('event_last_released_at DESC')
        .where('event_last_released_at > ?', date)
    }
    scope :with_events_older, ->(date) {
      where('event_last_released_at IS NOT NULL')
        .order('event_last_released_at DESC')
        .where('event_last_released_at < ?', date)
    }
    scope :currently_streaming, -> {
      where('(streaming ->> :key)::boolean', key: 'isCurrentlyStreaming')
    }

    def self.has_live?
      Conference.currently_streaming.any?
    end

    def self.first_live
      Conference.currently_streaming.first
    end

    def self.live
      conferences = Conference.currently_streaming
      groups = conferences.map { |c| c.streaming['groups'].first }.compact
      groups.map { |g| g['rooms'] }.flatten
    end

    def audio_recordings?
      recordings.original_language.where(mime_type: MimeType::AUDIO).exists?
    end

    def mime_types
      return enum_for(:mime_types) unless block_given?
      recordings.pluck(:mime_type).uniq.map { |mime_type|
        yield mime_type.freeze, MimeType.mime_type_slug(mime_type)
      }
    end

    def recordings_url
      File.join(Settings.cdn_url, recordings_path).freeze
    end

    def playlist(event = nil)
      return events.includes(:conference) unless event
      n = events.index(event)
      return events.includes(:conference) unless n.positive?
      events[n..-1]
    end

    def first_slug
      events.first.slug
    end
  end
end
