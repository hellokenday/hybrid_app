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

function _initCurrentLocation() {
    
    console.log('_initCurrentLocation');
    
    // Throw an error if no update is received every 30 seconds
    watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
}

function _initUI() {
         var segmentedOptions = {
            id: 'mySegmented',
            labels : ['Stats','Map','History'],
            selected: 0
         };
         var segmentedResponse = function(e) {
            e.stopPropagation();
            $('#output').find('h3 > span').html(($(this).index() + 1));
         };
         var newSegmented = $.UICreateSegmented(segmentedOptions);
         $('#segmentedPanel').append(newSegmented);
         $('.segmented').UISegmented({callback:segmentedResponse});
         $('.segmented').UIPanelToggle('#toggle-panels',function(){$.noop;});
         var selectedPanel = $('.segmented').find('.selected').index();
         $('#output').find('span').html(selectedPanel + 1);
}

function _initButtons(){

	$('.start').click(_startTracking);
	$('.stop').click(_stopTracking);
}

function _startTracking(){

    console.log('_startTracking');

    _resetTrackData();

    watchID = navigator.geolocation.watchPosition(function(position) {

        var time = new Date(position.timestamp);

        $output.append("<li>long: " + position.coords.longitude + "lat: " + position.coords.latitude + " at " + time.toTimeString() + "</li>")
        
        positions.push(position);
    }, 
    function(){ console.log('onLocationError: ' + error.code + ": " + error.message);
    }, options);
}

function _stopTracking(){

    console.log('_stopTracking');

    navigator.geolocation.clearWatch(watchID);
    watchID = null;

    // gets the number of track stored in variable
    var trackCount = parseInt(window.localStorage.getItem(track_count));
        
    // if trackCount is a number, set trackID to the next element.
    var trackID = (!isNaN(trackCount)) ? trackCount+1 : 1;

    // turn position object in positions array into a string
    window.localStorage.setItem(trackID, JSON.stringify(positions));
    // append and update trackCount in local storage
    window.localStorage.setItem(track_count, trackID);

    // clears output in HTML and empties position array
    _resetTrackData();

    _drawMap();
}

function _drawMap() {

    console.log('_drawMap');
    
    // get the number of tracks stored in local storage and convert into integer
    var lastID = parseInt(window.localStorage.getItem(track_count));
    var data = JSON.parse(window.localStorage.getItem(lastID));
    var trackCoords = [];
    var $mapDiv = document.getElementById("map_canvas2");
    
    // get the last track in the array
    console.log(lastID + ": " + window.localStorage.getItem(lastID));
    
    // convert the data into a format google maps can use
    for(var i = 0; i < data.length; i++){   
        var currCoords = data[i].coords;
        trackCoords.push(new google.maps.LatLng(currCoords.latitude, currCoords.longitude));
        //trackCoords.push(new google.maps.LatLng(data[i].coords.latitude, data[i].coords.longitude));
    }
    
    // Google Map options
    var mapOptions = {
      zoom: 17,
      center: trackCoords[0],
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };
    
    // Create the Google Map, set options
    var map = new google.maps.Map($mapDiv, mapOptions);
    
    var startMarker = new google.maps.Marker({
        position: trackCoords[0],
        map: map,
        title: "Track start"
    });
    var endMarker = new google.maps.Marker({
        position: trackCoords[trackCoords.length-1],
        map: map,
        title: "Track end"
    });
    
    // Plot the GPS entries as a line on the Google Map
    var trackPath = new google.maps.Polyline({
      path: trackCoords,
      strokeColor: "#00d8ff",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    // Apply the line to the map
    trackPath.setMap(map);
}
    
function _resetTrackData(){

    positions = [];
    $output.html('');
}

// device APIs are available
function onDeviceReady() {
    
    console.log('onDeviceReady');
    
    _initCurrentLocation();
    _initButtons();
    _initUI()
}

// onSuccess Geolocation
function onSuccess() {

    // function snippet from: http://zsprawl.com/iOS/2012/03/using-phonegap-with-google-maps/
    var win = function(position) {

        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var latlng = new google.maps.LatLng(lat, long);

        /*var mapOptions = {
            center: latlng,
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };

        var map_element = document.getElementById("map_canvas");*/
        
        //var map = new google.maps.Map(map_element, mapOptions);
        $('#map_canvas').gmap({'center': latLng});
        
        /*var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title:"You are here"
        });*/
    };

    var fail = function(e) {

        $.mobile.hidePageLoadingMsg();
        alert('Can\'t retrieve position.\nError: ' + e);
    };

    watchID = navigator.geolocation.getCurrentPosition(win, fail);
}

// onError Callback receives a PositionError object
function onError(e) {
    console.log('code: '    + e.code    + '\n' + 'message: ' + e.message + '\n');
}