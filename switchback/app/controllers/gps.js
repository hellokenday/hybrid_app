/**
 * The map panel
 */

steroids.navigationBar.show("GPS");

// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// iscroll vars
//var myScroll;

// gps vars
var track_count = "track_count";
var positions = [];
var latLngPositions = [];
var watchID;
var trackMap;
var trackMarkers = [];
var trackPath;
var distanceTravelled = 0;
var totalSpeed = 0;

var rideOneView;

var tab1Inited = false;
var tab2Inited = false;
var tab3Inited = false;
var tracking = false;

// timer vars
var sec = 00;
var min = 00;
var hour = 0;
var intervalId;
var totalTime = "0 : 00 : 00";
var theTime;

var defaultLocationOptions = { 
    
    enableHighAccuracy: true, 
    timeout           : 20000
};

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

//function initScroll () {
//    
//	myScroll = new IScroll('#wrapper', { mouseWheel: false });
//}

function initTimer() {
    
    console.log('initTimer');
    
    $('.socket').on('click', onTimerPlayClicked)
    $('.socket2').on('click', onTimerFinishClicked);
    
    theTime = document.getElementById("timer");
    
    tab1Inited = true;
}

function initMap () {

    console.log('initMap');
    
    trackMap = createMap("map_canvas");
    if(tracking === false) setCurrentLocation();
    else addMarker(latLngPositions[0]);

    tab2Inited = true;
}

function initHistory() {

    // iscroll
    console.log('initScroll');
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    
	myScroll = new IScroll('#wrapper');
    
    tab3Inited = true;
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

    var marker = new google.maps.Marker({
        position: latlng,
        map: trackMap
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
        
    console.log('setCurrentLocation');
    navigator.geolocation.getCurrentPosition(onGetCurrentLocationSuccess, onGetCurrentLocationError, defaultLocationOptions);
}

// in KM/h
function getAverageSpeed() {
    
    // prevent negative value for avg speed
    if ((totalSpeed/positions.length) < 0) {
        return 0;
    }
    else {
        return (((totalSpeed/positions.length)*60)*60)*0.001;
    }
}

function playTimer(){
    clearInterval(intervalId);
    intervalId = setInterval(onTimerTick, 1000);
    startTracking();
}

function pauseTimer() {
    clearInterval(intervalId);
    stopTracking();
}

function showFinButton(){
    $( ".socket2" ).show('fast');
}

function resetTimer() {
    $('.timer_btn').removeClass('active');
    clearInterval(intervalId);
    totalTime = "00:00:00";
    theTime.innerHTML = ( totalTime );  
    sec = 00;
    min = 00;
    hour = 00;
}

function updateStats() {

    var avgKmh = getAverageSpeed();
    var km = distanceTravelled / 1000; // convert to km
    
    // round to 2 decimal places
    avgKmh = Math.round(avgKmh * 100) / 100;
    // round to 1 decimal places
    km = Math.round(km * 100) / 10;
    
    // set html
    
    // metrics set to 0.00 if < 0.1 or equal to 0
    if (distanceTravelled == 0 && totalSpeed == 0) 
    {
        $("#avg_speed").html("0.00");
        $("#distance").html("0.0");
    }
    if (km < 0.1) 
    {
        $("#distance").html("0.0");
    }
    if (avgKmh < 0.1) 
    {
        $("#avg_speed").html("0.00");
    }
    else
    {
        $("#avg_speed").html(avgKmh);
        $("#distance").html(km);
    }
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

function resetStats() {
    
    totalSpeed = 0;
    distanceTravelled = 0;
}

/**
 * Event handling
 */

function onDeviceReady () {
    
    initTimer();
    initSegmented();
    initNav();
}

function onGetCurrentLocationSuccess(position) {

    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    addMarker(latlng);
    trackMap.panTo(latlng);
}
function onGetCurrentLocationError(e) { console.log('onGetCurrentLocationError: '    + e.code    + ': ' + 'message: ' + e.message); }

function onLocationUpdatedSuccess(position) {
    
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
    positions.push(position);
    latLngPositions.push(latlng);
    totalSpeed += position.coords.speed;
    
    if(trackMap !== undefined) 
    {
        if(latLngPositions.length > 2)
        {
            var distance = google.maps.geometry.spherical.computeDistanceBetween(latlng, latLngPositions[latLngPositions.length-2]);
            distanceTravelled += distance;
        }
        
        if(trackMarkers.length > 1) removeLastMarker();
        
        addMarker(latlng);
        updatePath();
        trackMap.panTo(latlng);
    }
    
    updateStats();
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
//            if(!tab1Inited) initTimer();
            break;
        case 1:
            if(!tab2Inited) initMap();
            break;
        case 2:
            if(!tab3Inited) initHistory();
            break;
        default:
            console.log('onTabClicked: unknown tab index: ' + tabIndex);
    }
}

function onTimerPlayClicked(){
    
    console.log('onTimerPlayClicked');
    $('.timer_btn').toggleClass('active');
    var active = $('.timer_btn').hasClass('active');
    (active) ? playTimer() : pauseTimer();
    showFinButton();
}

function onTimerFinishClicked(){
    console.log('onTimerFinishClicked');
    
    resetStats();
    stopTracking();
    updateStats();
    resetTimer();
}

function onTimerTick() {
    sec++;
    if(sec === 60) {
        sec = 00;
        min++;
    }
    if(min === 60) {
        min = 00;
        hour++;
    }
    totalTime = ((hour < 10) ? "0" + hour : hour) + ":" + ((min < 10) ? "0" + min : min) + ":" + ((sec < 10) ? "0" + sec : sec);
    theTime.innerHTML = ( totalTime );
}