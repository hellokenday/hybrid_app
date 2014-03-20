/**
 * The map panel
 */

steroids.navigationBar.show("GPS");

// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// gps vars
var track_count = "track_count";
var positions = [];
var latLngPositions = [];
var watchID;
var trackMap;
var trackMarkers = [];
var trackPath;

var tab1Inited = false;
var tab2Inited = false;
var tab3Inited = false;
var tracking = false;

var defaultLocationOptions = { 
    
    enableHighAccuracy: true, 
    timeout           : 20000
};

// timer gui vars
//var sec = 00,
//    min = 00,
//    hour = 0,
//    intervalId,
//    totalTime = "0 : 00 : 00",
//    theTime = document.getElementById("timer");

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

function initGUI() {
    var sec = 00,
    min = 00,
    hour = 0,
    intervalId,
    totalTime = "0 : 00 : 00",
    theTime = document.getElementById("timer");
    
    console.log('2');
    $('.socket').on('click', function(){
        $('.timer_btn').toggleClass('active');
        var active = $('.timer_btn').hasClass('active');
        console.log('here');
        (active) ? play() : pause();
    })

    $('.socket').on('click', test);

    function test(){
        $( ".socket2" ).show('fast');
    }

    function pause() {
      window.clearInterval(intervalId);
      stopTracking();
        console.log('pause');
    }

    function play(){
      clearInterval(intervalId);
      intervalId = setInterval(startCounting, 1000);
      startTracking();
            console.log('play');
    }

    $('.socket2').on('click', function(){
      window.clearInterval(intervalId);
      totalTime = "00:00:00";
      theTime.innerHTML = ( totalTime );  
      sec = 00;
      min = 00;
      hour = 00;
    });

    function startCounting() {
      sec ++;
      if( sec == 60 ) {
        sec = 00;
        min += 1;
      }
      if( min == 60) {
        min = 00;
        hour += 1;
      }
      totalTime = ((hour<=9) ? "0" + hour : hour) + ":" + ((min<=9) ? "0" + min : min) + ":" + ((sec<=9) ? "0" + sec : sec);
      theTime.innerHTML = ( totalTime );
    }
}

function initStats () {

//    $('.start').click(startTracking);
//    $('.stop').click(stopTracking);

    tab1Inited = true;
}

function initMap () {

    trackMap = createMap("map_canvas");
    setCurrentLocation();

    tab2Inited = true;
}

function initHistory() {

    // do nothing...
}

function createMap (divID) {

    var defaultMapOptions = {

        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    return new google.maps.Map(document.getElementById(divID), defaultMapOptions);
}

function addMarker (latlng) {

    if(positions.length > 1) removeLastMarker();

    var marker = new google.maps.Marker({
        position: latlng,
        map: trackMap,
        title: "Current location"
    });

    trackMarkers.push(marker);
}

function removeLastMarker () {

    removeMarkerAtIndex(trackMarkers.length-1);

}

function removeMarkerAtIndex (index) {

    trackMarkers[index].setMap(null);

}

function startTracking () {

    if(tracking === true) return;

    resetMarkers();

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
function setCurrentLocation () {
        
    navigator.geolocation.getCurrentPosition(onGetCurrentLocationSuccess, onGetCurrentLocationError, defaultLocationOptions);
}

function updateStats () {

    // nothing to do...
}

function updatePath () {

    // no point carrying on if...
    if(positions.length < 2) return;

    if(trackPath) trackPath.setMap(null);

    trackPath = new google.maps.Polyline({
      path: latLngPositions,
      strokeColor: "#00d8ff",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    trackPath.setMap(trackMap);
}

function resetMarkers () {

    if(trackMarkers.length > 0) {

        for (var i = 0; i < trackMarkers.length; i++) {

            trackMarkers[i].setMap(null);
        }

        trackMarkers = [];
    }
}

/**
 * Event handling
 */

function onDeviceReady () {

    initSegmented();
    initStats();
    initGUI();
    initNav();
}

function onGetCurrentLocationSuccess(position) {

    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var marker = new google.maps.Marker({
        position: latlng,
        map: trackMap,
        title: "Start"
    });
    trackMarkers.push(marker);

    trackMap.panTo(latlng);
}
function onGetCurrentLocationError(e) { console.log('onGetCurrentLocationError: '    + e.code    + ': ' + 'message: ' + e.message); }

function onLocationUpdatedSuccess(position) {

    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    trackMap.panTo(latlng)
    
    addMarker(latlng);

    positions.push(position);
    latLngPositions.push(latlng);

    updatePath();
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
            if(!tab2Inited) initMap();
            break;
        case 2:
            initHistory();
            break;
        default:
            console.log('onTabClicked: unknown tab index: ' + tabIndex);
    }
}

// Nav - preload views ! BROKEN !
var rideOneView = new steroids.views.WebView("views/ride_one/index.html");   

function showRideOne() {
    rideOneView.preload();
    steroids.layers.push(rideOneView);
}