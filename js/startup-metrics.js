(function(){

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Dashboard Settings
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
var settings = {
    ssl           : true,
    subscribe_key : 'sub-c-44d3418c-4855-11e4-8a5b-02ee2ddab7fe',
    publish_key   : 'pub-c-eae49ba3-b1ee-46c4-8674-27ce042e7ab3',
    channel       : urlsetting()
};

var pubnub = PUBNUB(settings);

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Startup Metrics Default Dashboard Position
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
var startupmetrics = {
    // Whitelable
    title            : "Startup",
    subtitle         : "Weekly Goals",
    logo_img         : "img/pubnub.png",

    // Acquisition
    acquisition      : 2,
    acquisition_goal : 4,

    // Activation
    activation       : 2,
    activation_goal  : 3,

    // Retention
    retention        : 15,
    retention_goal   : 7,

    // Revenue
    revenue          : 12,
    revenue_goal     : 9,

    // Referrals
    mentions         : 1,
    attendees        : 1,
    articles         : 1,
    stackoverflow    : 1
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

        // Logo Whitelabel
        if (metric.indexOf('_img') > 0) return PUBNUB.css( display, {
            'background-image' : 'url('+value+')'
        } );

        // Set Inner HTML
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
// Save Startup Metrics
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function save(modification) {
    PUBNUB.each( modification, function( k, v ) { startupmetrics[k] = v } );
    pubnub.publish({ channel : settings.channel, message : startupmetrics });
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

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Change UI Element - Update the Values Visually
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
PUBNUB.bind( 'mousedown,touchstart', document, function(element) {
    var target = (element.target || element.srcElement)
    ,   id     = PUBNUB.attr( target, 'id' )
    ,   input  = PUBNUB.$('editor-input')
    ,   editor = PUBNUB.$('editor');

    // Ignore Clicking Editor Controls
    if (!id || id.indexOf('editor') >= 0) return true;

    // Show Editor
    0&&PUBNUB.css( editor, {
        top  : offset( target, 'Top' )  + 50,
        left : offset( target, 'Left' ) - 25
    } );

    show_editor(true);
    input.value = startupmetrics[id] || '';
    setTimeout( function(){input.focus()}, 250 );

    console.log(target);
    return true;
} );

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Show Editor
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function show_editor(yes) {
    PUBNUB.css( PUBNUB.$('editor'), { display : (yes ? 'block' : 'none') } );
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Editor Controls - SAVE
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
PUBNUB.bind( 'mousedown,touchstart', PUBNUB.$('editor-save'), function() {
    show_editor(false);
} );

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Editor Controls - CANCEL
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
PUBNUB.bind( 'mousedown,touchstart', PUBNUB.$('editor-cancel'), function() {
    show_editor(false);
} );

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Offset
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function offset( node, what ) {
    var pos  = 0
    ,   what = what || 'Top';

    while (node) {
        pos += node['offset'+what];
        node = node.offsetParent;
    }

    return pos;
}


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// URL Param Setting
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function urlsetting() {
    var standard = 'standard'
    ,   spliter  = '?company=';

    if (location.href.indexOf(spliter) < 0) return standard;
    return location.href.split(spliter)[1].split('&')[0] || standard;
}



})();
