source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.0'
gem 'dotenv-rails'

gem 'activeadmin'

gem 'tinymce-rails'
gem 'devise', '>= 4.7.1'
gem 'aasm'
gem 'sidekiq'
gem 'foreman'

# rails cache
gem 'redis-rails'
gem 'exception_notification'

# Bundle puma application server
gem 'puma'
gem 'puma_worker_killer'

# Simplified production logging
gem 'lograge'

group :development do
  gem 'bullet'
  gem 'capistrano', '~> 3.5.0', group: :capistrano, require: false
  gem 'capistrano-rvm',     require: false
  gem 'capistrano-rails',   require: false
  gem 'capistrano-bundler', require: false
  gem 'capistrano-sidekiq', require: false
  gem 'mqtt', :git => 'https://github.com/njh/ruby-mqtt.git'
  gem 'ed25519',            require: false
  gem 'bcrypt_pbkdf',       require: false
end

gem 'haml'
gem 'redcarpet'

# kaminari must be listed before elasticsearch and api-pagination
gem 'kaminari'

gem 'pg', group: :postgresql
gem 'elasticsearch-model'
gem 'elasticsearch-rails'

# Use SCSS for stylesheets
gem 'sass-rails'
gem 'bootstrap-sass', '~> 3.3.5'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails'

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder'
gem 'yajl-ruby'

# Cross origin resource sharing for public json api and ajax clients
gem 'rack-cors', :require => 'rack/cors'

# API pagination
gem 'api-pagination'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
  gem 'ruby-graphviz', :require => 'graphviz' # Optional: only required for graphing
end

group :development, :test do
  gem 'pry-rails'
  gem 'pry-byebug'
end

group :test do
  gem 'factory_bot_rails'
  gem 'rails-controller-testing'
end
