# PubNub Startup Metrics Dashboard

This is a 5-step model for using Dave McClure's 
metrics framework for your business and customers,
and how to apply it to your product and marketing efforts.
Acquisition, Activation, Retention, Referral, and Revenue (AARRR!)

#### See for Yourself

[![PubNub Startup Metrics Dashboard](http://pubnub.s3.amazonaws.com/assets/startup-metrics-dasbhoard-video.gif)](http://stephenlb.github.io/startup-metrics-dashboard/)

### Let's make your Metrics Realtime

Monitoring your business metrics is complex.
Simplify with a purpose built realtime dashboard.

### Startup Metrics for Pirates

[Startup Metrics for Pirates](
http://www.slideshare.net/dmc500hats/startup-metrics-for-pirates-long-version)
by Dave McClure, venture capitalist, entrepreneur,
internet marketing at 500 Startups.

### Update the Dashboard in Ruby

First install the `pubnub` gem using ruby gems.

```bash
gem install pubnub
```
 
Write a script to **ring the Sales Bell**!
This also allows you to update any values on the dashboard.

```ruby
#!/usr/bin/ruby

require 'pubnub'
pubnub = Pubnub.new(
    :subscribe_key => 'sub-c-44d3418c-4855-11e4-8a5b-02ee2ddab7fe',
    :publish_key   => 'pub-c-eae49ba3-b1ee-46c4-8674-27ce042e7ab3'
)
 
## Get Latest Dashboard and Modify Revenue
pubnub.history( :channel => '', :count => 1 ) do |response|
    dashboard = response[0][0]
 
    ## Trigger Sales Bell!!!
    dashboard.merge({ :revenue => 500 })
    pubnub.publish( :message => dashboard, :channel => 'standard' )
end
```

### Dashboard Schema

You can change the dashboard in realtime with any `PubNub` SDK.
This is the schema for which you can modify any value to
send a signal to the dashboard instantly to change.

```javascript
// Whitelable your Dashboard
title            : "Startup",
subtitle         : "Weekly Goals",
logo_img         : "img/pubnub.png",

// Referral Labels
vanity_one       : 'MENTIONS',
vanity_two       : 'ATTENDEES',
vanity_three     : 'ARTICLES',
vanity_four      : 'STACKOVERFLOW',

// Acquisition
acquisition      : 1,
acquisition_goal : 1,

// Activation
activation       : 1,
activation_goal  : 1,

// Retention
retention        : 1,
retention_goal   : 1,

// Revenue
revenue          : 1,
revenue_goal     : 1,

// Referrals
mentions         : 1,
attendees        : 1,
articles         : 1,
stackoverflow    : 1
```
