ENV["RACK_ENV"] ||= "development"
RACK_ENV = ENV["RACK_ENV"]

ROOT_DIR = File.dirname(__FILE__)
$:.unshift(ROOT_DIR)

require "sinatra"
require "settings"
require "rest-client"
require "json"
require "sequel"

class SlumberScore < Sinatra::Base
  # Loads config/settings.yml and provides the SlumberScore.setting(...) helper
  extend Settings
  
  set :views, ROOT_DIR
  
  # Serves the given URLs from the filesystem and stops processing.
  use Rack::Static, :urls => %w( /css /javascript /images /favicon.ico ), :root => File.expand_path("public", ROOT_DIR)
  # Gives us a HMAC-256 signed session cookie
  use Rack::Session::Cookie, :key => "slumberscore.session"
  
  helpers do
    # Encodes the given URL for use in a query string.
    def encode_url(url)
      URI.escape(url, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))
    end
  end
  
  # Dynamically render the index.html so we can insert values from settings
  # file.
  get "/" do
    @user = User.fetch session[:access_token] if session[:access_token]
    
    erb :"index.html"
  end
  
  # Handle the mHealth Connect redirect URI.
  # 
  # This is where we exchange the Authorization Code from mHealth Connect for
  # an Access Token which will grant Slumber Score access to the user's MyZeo
  # information via the mHealth API.
  # 
  # GET http://www.slumberscoreapp.com/auth/callback
  get "/auth/callback" do
    # If the user denied the request we will get back error=access_denied on
    # the query string, in which case we'll skip the access_token and send them
    # back to the homepage.
    if !params[:error]
      # Sends a POST request to https://mhealth.att.com/access_token.json,
      # providing the Client ID and Secret Key as HTTP Basic Authorization
      # credentials, and a post body containing grant_type=authorization_code,
      # code=the Authorization Code from mHealth Connect, and
      # redirect_uri=the same redirect URI given in the mHealth Connect link.
      response = RestClient.post("https://#{SlumberScore.setting(:client_id)}:#{SlumberScore.setting(:client_secret)}@#{SlumberScore.setting(:mhealth_connect)}/access_token.json", {
        :grant_type => "authorization_code",
        :code => params[:code],
        :redirect_uri => SlumberScore.setting(:redirect_uri)
      })

      # Parses the JSON response from the server (which contains the Access
      # Token) using the Ruby JSON library, and stores the Access Token in a
      # session cookie.
      #
      # The JSON response from the server looks like:
      # {"access_token":"1bf71826-a05a-4fd3-9840-e05f8EXAMPLE"}
      session[:access_token] = JSON.parse(response)["access_token"]
    end

    # With the Access Token on a session cookie, redirects the User to the
    # application root, re-rendering the mobile application. As a client-side
    # application it will read the Access Token from the session cookie and use
    # it to make requests to the mHealth API.
    redirect "/"
  end
end

DB = Sequel.connect SlumberScore.setting(:database)

class User < Sequel::Model
  # Flag to tell us whether the user has ever signed in before. A real
  # application would probably have more use for a user model, but this shows
  # how to make simple use of persisting the user data across connections.
  # Because we have the mHealth ID, this will only be set the first time the
  # user ever connects to SlumberScore
  attr_accessor :first_sign_in
  
  # This is not a great way to do data migrations, but it's simple for demo
  # purposes -- in a real application you would probably have a real data
  # migration setup.
  if !DB.table_exists?(:users)
    DB.create_table :users do
      primary_key :id
      
      String :mhealth_id, :null => false
      String :email, :null => false
      String :name
      
      index :mhealth_id, :unique => true
      index :email, :unique => true
    end
  end
  
  # Fetch the user data associated with the given access_token. If the User
  # already exists it will update the User with their latest profile
  # information, it not it will create the User.
  # 
  # Note that we make use of the unique ID provided by the mHealth API to
  # ensure we're not creating duplicate user entries for users with multiple
  # access tokens (such as when they clear cookies, or connect on a different
  # device), regardless of whether they change their email, name, etc...
  def self.fetch(access_token)
    response = RestClient.get "#{SlumberScore.setting(:mhealth_api)}v2/health/user?oauth_token=#{access_token}"
    profile = JSON.parse response
    
    user = first :mhealth_id => profile["id"]
    
    if user
      user.update :email => profile["email"]["value"], :name => profile["name"]["value"]
    else
      user = create :mhealth_id => profile["id"], :email => profile["email"]["value"], :name => profile["name"]["value"]
      user.first_sign_in = true
    end
    
    user
  end
  
  # Outputs a JSON representation of this User, which we can consume in the
  # client-side JavaScript application.
  def to_json
    { :id => id, :email => email, :name => name, :first_sign_in => first_sign_in }.to_json
  end
end
