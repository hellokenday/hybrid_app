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


/* 
var timerInterval;
var secondsCount = 0;

play()
{
    stop(true);
    intervalId = setInterval(onTimerInterval, 1000);
}

stop(hardReset)
{
    clearInterval(timerInterval);
    if(hardReset !== false) secondsCount = 0;
}

getTimeString()
{
    var timeString = "";
    
    // http://stackoverflow.com/questions/6312993/javascript-seconds-to-time-with-format-hhmmss
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    timeString = hours + ':' + minutes + ':' + seconds;
    
    var minutes = secondsCount%60;

    return timeString;
}

onTimerInterval()
{
    secondsCount++;
}
*/

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
    setCurrentLocation();

    tab2Inited = true;
}

function initHistory() {

    // do nothing...
    
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
        
    console.log('setCurrentLocation');
    navigator.geolocation.getCurrentPosition(onGetCurrentLocationSuccess, onGetCurrentLocationError, defaultLocationOptions);
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
    
    initTimer();
    initSegmented();
    initNav();
    initGesture();
}

function initGesture() {

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
    
    console.log('play');
    $('.timer_btn').toggleClass('active');
    var active = $('.timer_btn').hasClass('active');
    (active) ? playTimer() : pauseTimer();
    showFinButton();
}

function onTimerFinishClicked(){
    console.log('fin');
    stopTracking();
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