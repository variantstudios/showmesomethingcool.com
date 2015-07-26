# showmesomethingcool.com

[![Build Status](https://travis-ci.org/variantstudios/showmesomethingcool.com.svg)](https://travis-ci.org/variantstudios/showmesomethingcool.com)


# Get your local environment setup on OSX

## Install Homebrew

`$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

This fixes the issues with html-proofiler not working on OSX. Without it you'll see the following error: 

An error occurred while installing nokogiri (1.6.6.2), and Bundler cannot continue.
Make sure that `gem install nokogiri -v '1.6.6.2'` succeeds before bundling.

So do this and you won't see the errors ;)
{% highlight ruby %}
$ brew install libxml2
$ bundle config build.nokogiri "--use-system-libraries --with-xml2-include=/usr/local/opt/libxml2/include/libxml2"
$ bundle install
{% endhighlight %}

## Install Node 0.10 (which includes npm)

`$ brew install node010`



# Setup the site

## Clone the repo

Create and move to the directory where you want to copy the site/repo:
{% highlight ruby %} $ mkdir ~/VS/showmesomethingcool.com/local && ~/VS/showmesomethingcool.com/local {% endhighlight %}

Clone the repo into the local directory:
{% highlight ruby %} $ git clone https://github.com/variantstudios/showmesomethingcool.com . {% endhighlight %}

## Setup the site

### Install the Ruby Gems
`$ bundle install`

### Install the Node packages
`$ npm install`

## Compile 