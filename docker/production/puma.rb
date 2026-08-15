# Docker production Puma (mounted over image default).
# Tune WEB_CONCURRENCY / RAILS_MAX_THREADS / PUMA_RAM_MB via environment.

max_threads_count = ENV.fetch("RAILS_MAX_THREADS", 5).to_i
min_threads_count = ENV.fetch("RAILS_MIN_THREADS", max_threads_count).to_i
threads min_threads_count, max_threads_count

port ENV.fetch("PORT", 3000)
environment ENV.fetch("RAILS_ENV", "production")
pidfile ENV.fetch("PIDFILE", "tmp/pids/server.pid")

workers ENV.fetch("WEB_CONCURRENCY", 2).to_i
preload_app!

plugin :tmp_restart

before_fork do
  require "puma_worker_killer"
  PumaWorkerKiller.config do |config|
    config.ram = ENV.fetch("PUMA_RAM_MB", "2048").to_i
    config.frequency = 30
    config.percent_usage = 0.95
    config.rolling_restart_frequency = false
  end
  PumaWorkerKiller.start
end

on_worker_boot do
  ActiveRecord::Base.establish_connection if defined?(ActiveRecord)
end
