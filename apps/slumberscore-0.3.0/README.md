Slumber Score (0.3.0)
=====================

Slumber Score is a simple example application demonstrating the use of mHealth Connect and the mHealth API. You can see Slumber Score running at [http://www.slumberscoreapp.com/](http://www.slumberscoreapp.com/).

You can read more about mHealth, mHealth Connect, and the mHealth API at [http://mhealth.att.com/dev/documentation](http://mhealth.att.com/dev/documentation).

About
-----

Slumber Score consists of a simple server-side application written in Ruby, and a mobile application written in HTML5 + JavaScript using Sencha Touch.

You can read more about Ruby at [http://www.ruby-lang.org/en/](http://www.ruby-lang.org/en/), and more about Sencha Touch at [http://www.sencha.com/products/touch](http://www.sencha.com/products/touch).

Running Slumber Score
---------------------

To run Slumber Score on your machine you will Ruby and the Bundler gem installed. Read more about Bundler here [http://gembundler.com/](http://gembundler.com/), or install via:

    gem install bundler

Once installed, run `bundle install` to install the remaining pre-requisites.

You will then need a `config/settings.yml` file which contains settings for your copy of Slumber Score. An example is available in `config/settings.yml.example`. For starters; copy `config/settings.yml.example` to `config/settings.yml` and enter your own Client ID and Secret Key. If you do not yet have a Client ID and Secret Key, please see the [getting started guide](http://mhealth.att.com/dev/documentation/mhealth) for instructions on obtaining them.

Finally, run `rackup` to start the Ruby application, and point your browser at [http://localhost:9292/](http://localhost:9292/).
