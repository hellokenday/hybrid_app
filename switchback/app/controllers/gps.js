steroids.navigationBar.show("GPS");
// --- Map Panel --- //

// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// vars
var track_count = "track_count";
var positions = [];
var watchID;

var defaultLocationOptions = { 
    enableHighAccuracy: true, 
    timeout           : 20000
};

var currentLocationMap;
var currentLocationMarker;
var historyMap;
var historyMarkers = [];

var tab1Inited = false;
var tab2Inited = false;
var tab3Inited = false;

function createMap (divID){

    var defaultMapOptions = {
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    return new google.maps.Map(document.getElementById(divID), defaultMapOptions);
}

function initCurrentLocationMap () {

    currentLocationMap = createMap("map_canvas");
    
    tab2Inited = true;

    // call again now the map's initialised
    updateCurrentLocation();
}

function initHistoryMap () {

    initMap("map_canvas2", historyMap);
    tab3Inited = true;
}

function initSegmented (argument) {

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

/**
 * Note: getCurrentPosition() tries to answer as fast as 
 * possible with a low accuracy result
 */
function updateCurrentLocation() {
        
    if(tab2Inited === false) initCurrentLocationMap();
    else watchID = navigator.geolocation.getCurrentPosition(onGetCurrentLocationSuccess, onGetCurrentLocationError, defaultLocationOptions);
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
            updateCurrentLocation();
            break;
        case 2:
            console.log('3');
            break;
        default:
            console.log('onTabClicked: unknown tab index: ' + tabIndex);
    }
}

// onSuccess Geolocation
function onGetCurrentLocationSuccess(position) {

    console.log('onGetCurrentLocationSuccess');

    if(currentLocationMarker) currentLocationMarker.setMap(null);

    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    currentLocationMarker = new google.maps.Marker({
        position: latlng,
        map: currentLocationMap,
        title:"Current location"
    });

    currentLocationMap.panTo(latlng);
}
function onGetCurrentLocationError(e) { console.log('onGetCurrentLocationError: '    + e.code    + ': ' + 'message: ' + e.message); }

