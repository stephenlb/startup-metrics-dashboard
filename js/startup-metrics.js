(function(){

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Startup Metrics Default Dashboard Position
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

var startupmetrics = {
    // Acquisition
    acquisition      : 0,
    acquisition_goal : 1,

    // Activation
    activation       : 0,
    activation_goal  : 1,

    // Retention
    retention        : 0,
    retention_goal   : 1,

    // Revenue
    revenue          : 0,
    revenue_goal     : 1,

    // Referrals
    mentions         : 0,
    attendees        : 0,
    articles         : 0,
    stackoverflow    : 0
};


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Update Startup Metrics
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
update_metrics(startupmetrics);
function update_metrics(startup) {
    PUBNUB.each( startup, function( metric, value ) {
        // Update Metric Display
        var display = PUBNUB.$(metric);
        if (!display) return;
        display.innerHTML = value;

        // Percentage Display if Relevant
        if (metric.indexOf('_goal') < 0) return;

        var metric_name  = metric.split('_goal')[0]
        ,   metric_value = startup[metric_name]
        ,   metric_goal  = value;

        update_circle_metrics( metric_name, metric_value, metric_goal );
    } );
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Update Startup Metrics Circles
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function update_circle_metrics( name, value, goal ) {
    var circle  = PUBNUB.$('pc_'+name)
    ,   percent = PUBNUB.$('percent_'+name)
    ,   result  = Math.ceil( (+value / +goal) * 100 )
    ,   resmax  = (result > 999 ? 999 : result)
    ,   pclass  = ' p' + (result > 100 ? 100 : result);

    circle.className  = circle.className.replace( / p\d+/, pclass );
    percent.innerHTML = resmax + '<sup>%</sup>';
}




})();
