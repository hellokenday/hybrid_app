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

    console.log('initCurrentLocationMap');

    // give a random centrepoint for now (brighton pier)
    var centre = new google.maps.LatLng(50.815514, -0.137089);

    var mapOptions = {
        center: centre,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    currentLocationMap = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    //watchID = navigator.geolocation.watchPosition(onGetCurrentLocationSuccess, onGetCurrentLocationError, options);

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
    
    console.log('getCurrentLocation');
    
    if(tab2Inited === false) initCurrentLocationMap();
    else watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
}

/**
 * Event handling
 */

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
            getCurrentLocation();
            break;
        case 2:
            console.log('3');
            break;
        default:
            console.log('onTabClicked: unknown tab index: ' + tabIndex);
    }
}

// onSuccess Geolocation
function onGetCurrentLocationSuccess() {

    var success = function(position) {

        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var marker = new google.maps.Marker({
            position: latlng,
            map: currentLocationMap,
            title:"Current location"
        });
    };
    var failure = function(e) { $.noop(); };

    watchID = navigator.geolocation.getCurrentPosition(success, failure);
}
function onGetCurrentLocationError(e) { console.log('onGetCurrentLocationError: '    + e.code    + ': ' + 'message: ' + e.message); }

