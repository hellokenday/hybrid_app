	steroids.navigationBar.show("GPS");
// --- Map Panel --- //

// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// vars
var track_count = "track_count";
var $output = $("#output");
var positions = [];
var watchID;
var options = { 
    enableHighAccuracy: true, 
    timeout           : 20000
};

var currentLocationMap;
var historyMap;

var tab1Inited = false;
var tab2Inited = false;
var tab3Inited = false;

function initCurrentLocationMap () {
    var mapOptions = {
        center: latlng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    currentLocationMap = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    tab2Inited = true;
}

function initSegmented (argument) {

    console.log('initSegmented');
    var segmentedOptions = {
        id: 'mySegmented',
        labels : ['Stats','Map','History'],
        selected: 0
     };
     var segmentedResponse = function(e) {
        e.stopPropagation();
        onTabClicked($('.segmented').find('.selected').index());
     };
     var newSegmented = $.UICreateSegmented(segmentedOptions);
     $('#segmentedPanel').append(newSegmented);
     $('.segmented').UISegmented({callback:segmentedResponse});
     $('.segmented').UIPanelToggle('#toggle-panels',function(){$.noop;});
     var selectedPanel = $('.segmented').find('.selected').index();
}

function getCurrentLocation() {
    
    console.log('_getCurrentLocation');
    
    if(!tab2Inited) _initCurrentLocationMap();
  
    // Throw an error if no update is received every 30 seconds
    watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
}

function onDeviceReady () {
    initSegmented();
}

function onTabClicked(tabIndex) {
        
    switch(tabIndex)
    {
        case 0:
            console.log('1');
            break;
        case 1:
            console.log('2');
            break;
        case 2:
            console.log('3');
            break;
        default:
            console.log('onTabClicked: unknown tab index: ' + tabIndex);
    }
}

// onSuccess Geolocation
function onSuccess() {

    // function snippet from: http://zsprawl.com/iOS/2012/03/using-phonegap-with-google-maps/
    var win = function(position) {

        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var latlng = new google.maps.LatLng(lat, long);

        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title:"You are here"
        });
    };
    var fail = function(e) { $.noop(); };

    watchID = navigator.geolocation.getCurrentPosition(win, fail);
}
function onError(e) { console.log('code: '    + e.code    + '\n' + 'message: ' + e.message + '\n'); }

