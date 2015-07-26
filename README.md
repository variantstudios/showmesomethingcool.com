# showmesomethingcool.com

[![Build Status](https://travis-ci.org/variantstudios/showmesomethingcool.com.svg)](https://travis-ci.org/variantstudios/showmesomethingcool.com)

## Setup for OSX


This fixes the issues with html-proofiler not working on OSX. Without it you'll see the following error: `An error occurred while installing nokogiri (1.6.6.2), and Bundler cannot
continue.
Make sure that `gem install nokogiri -v '1.6.6.2'` succeeds before bundling.`

So do this and you won't see the errors ;)
`$ brew install libxml2
$ bundle config build.nokogiri "--use-system-libraries --with-xml2-include=/usr/local/opt/libxml2/include/libxml2"
$ bundle install`