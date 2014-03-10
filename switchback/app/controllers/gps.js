/**
 * The map panel
 */

steroids.navigationBar.show("GPS");

// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// vars
var track_count = "track_count";
var positions = [];
var latLngPositions = [];
var watchID;
var currentLocationMap;
var currentLocationMarker;
var historyMap;
var historyMarkers = [];
var historyTrackPath;

var tab1Inited = false;
var tab2Inited = false;
var tab3Inited = false;
var tracking = false;

var defaultLocationOptions = { 
    
    enableHighAccuracy: true, 
    timeout           : 20000
};

function createMap (divID) {

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

    historyMap = createMap("map_canvas2", historyMap);
    tab3Inited = true;
}

function initSegmented () {

    var segmentedOptions = {

        id: 'mySegmented',
        labels : ['Stats','Map','History'],
        selected: 0
     };
     var segmentedComponent = $.UICreateSegmented(segmentedOptions);

     $('#segmentedPanel').append(segmentedComponent);
     $('.segmented').UISegmented({callback:onSegmentSelected});
     $('.segmented').UIPanelToggle('#toggle-panels',function(){$.noop;});     
}

function initStats () {

    $('.start').click(startTracking);
    $('.stop').click(stopTracking);

    tab1Inited = true;
}

function addHistoryMarker (latlng) {

    if(historyMarkers.length > 1) removeLastHistoryMarker();

    var marker = new google.maps.Marker({
        position: latlng,
        map: historyMap
    });

    historyMarkers.push(marker);
}

function removeLastHistoryMarker () {

    removeHistoryMarkerAtIndex(historyMarkers.length-1);

}

function removeHistoryMarkerAtIndex () {

    historyMarkers[historyMarkers.length-1].setMap(null);

}

function startTracking () {

    if(tracking === true) return;

    resetHistoryMarkers();

    positions = [];
    latLngPositions = [];

    tracking = true;

    watchID = navigator.geolocation.watchPosition(onLocationUpdatedSuccess, onLocationUpdatedError, defaultLocationOptions);
}

function stopTracking () {

    if(tracking === false) return;

    navigator.geolocation.clearWatch(watchID);
    watchID = null;

    tracking = false;

    saveTrackData();
}

function saveTrackData () {

    var trackCount = parseInt(window.localStorage.getItem(track_count));
    var trackID = (!isNaN(trackCount)) ? trackCount+1 : 1;

    window.localStorage.setItem(trackID, JSON.stringify(positions));
    window.localStorage.setItem(track_count, trackID);
}

/**
 * Note: getCurrentPosition() tries to answer as fast as 
 * possible with a low accuracy result
 */
function updateCurrentLocation () {
        
    if(tab2Inited === false) initCurrentLocationMap();
    else navigator.geolocation.getCurrentPosition(onGetCurrentLocationSuccess, onGetCurrentLocationError, defaultLocationOptions);
}

function updateStats () {

    // nothing to do...
}

function updateHistoryPath () {

    // no point carrying on if...
    if(positions.length < 2) return;

    if(historyTrackPath) historyTrackPath.setMap(null);

    historyTrackPath = new google.maps.Polyline({
      path: latLngPositions,
      strokeColor: "#00d8ff",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    historyTrackPath.setMap(historyMap);
}

function resetCurrentLocationMarker () {

    if(currentLocationMarker) {

        currentLocationMarker.setMap(null);
        currentLocationMarker = null;
    }
}

function resetHistoryMarkers () {

    if(historyMarkers.length > 0) {

        for (var i = 0; i < historyMarkers.length; i++) {

            historyMarkers[i].setMap(null);
        }

        historyMarkers = [];
    }
}

/**
 * Event handling
 */

function onDeviceReady () {

    initSegmented();
    initStats();
}

function onGetCurrentLocationSuccess(position) {

    if(currentLocationMarker) resetCurrentLocationMarker();

    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    currentLocationMarker = new google.maps.Marker({
        position: latlng,
        map: currentLocationMap,
        title:"Current location"
    });

    currentLocationMap.panTo(latlng);
}
function onGetCurrentLocationError(e) { console.log('onGetCurrentLocationError: '    + e.code    + ': ' + 'message: ' + e.message); }

function onLocationUpdatedSuccess(position) {

    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    historyMap.panTo(latlng)
    
    addHistoryMarker(latlng);

    positions.push(position);
    latLngPositions.push(latlng);

    updateHistoryPath();
}
function onLocationUpdatedError(e) { console.log('onGetCurrentLocationError: '    + e.code    + ': ' + 'message: ' + e.message); }

function onSegmentSelected(e) {

    // stop any events/weird stuff happening
    e.stopPropagation();

    //call onTabClicked, we'll decide what to do from there
    onTabClicked($('.segmented').find('.selected').index());
 }

 function onTabClicked(tabIndex) {
        
    switch(tabIndex) {

        case 0:
            updateStats();
            break;
        case 1:
            updateCurrentLocation();
            break;
        case 2:
            if(!tab3Inited) initHistoryMap();
            break;
        default:
            console.log('onTabClicked: unknown tab index: ' + tabIndex);
    }
}

