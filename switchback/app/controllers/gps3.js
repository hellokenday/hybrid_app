steroids.navigationBar.show("GPS");
// --- Map Panel --- //

// Wait for device API libraries to load

document.addEventListener("deviceready", onDeviceReady, false);

var watchID = null;

// device APIs are available
//
function onDeviceReady() {
    // Throw an error if no update is received every 30 seconds
    var options = { timeout: 30000 };
    watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
}

// onSuccess Geolocation
//
function onSuccess() {
    // function snippet from: http://zsprawl.com/iOS/2012/03/using-phonegap-with-google-maps/
    var win = function(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var myLatlng = new google.maps.LatLng(lat, long);

        var myOptions = {
            center: myLatlng,
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };
        map_element = document.getElementById("map_canvas");
        map = new google.maps.Map(map_element, myOptions);
        
        var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title:"You are here"
      });
    };

    var fail = function(e) {
        $.mobile.hidePageLoadingMsg();
        alert('Can\'t retrieve position.\nError: ' + e);
    };

    watchID = navigator.geolocation.getCurrentPosition(win, fail);
} 

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }


// --- Stats and History --- //
// Code built on gps tutorial: http://code.tutsplus.com/tutorials/build-an-exercise-tracking-app-geolocation-tracking--mobile-11070
$(document).ready(function() {
	
	console.log('document.ready');

	// vars
	var track_count = "track_count";
	var $output = $("#output");
	var positions = [];
	var watchID;
	var options = { 
		enableHighAccuracy: true, 
		timeout           : 10000
	};
	
	if ("geolocation" in navigator) {
		_initButtons();
	}
	else console.log('geolocation not supported....');
	
	function _initButtons(){

		$('.start').click(_startTracking);
		$('.stop').click(_stopTracking);
	}

	function _startTracking(){
		
		console.log('_startTracking');

		_reset();

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
		var trackID = (!Number.isNaN(trackCount)) ? trackCount+1 : 1;

        // turn position object in positions array into a string
		window.localStorage.setItem(trackID, JSON.stringify(positions));
        // append and update trackCount in local storage
		window.localStorage.setItem(track_count, trackID);

        // clears output in HTML and empties position array
		_reset();
        
        _drawMap();
	}

	function _drawMap() {

		console.log('_drawMap');

        // get the number of tracks stored in local storage and convert into integer
		var lastID = parseInt(window.localStorage.getItem(track_count));
        // get the last track in the array
		console.log(lastID + ": " + window.localStorage.getItem(lastID));
        
        var data = window.localStorage.getItem(lastID));
        
        data = JSON.parse(data);
        
        // Set the initial Lat and Long of the Google Map
	    var myLatLng = new google.maps.LatLng(data[0].coords.latitude, data[0].coords.longitude);

        // Google Map options
        var myOptions = {
          zoom: 15,
          center: myLatLng,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };
    
        // Create the Google Map, set options
        var map = new google.maps.Map(document.getElementById("map_canvas2"), myOptions);
        
        // Plot the GPS entries as a line on the Google Map
        var trackPath = new google.maps.Polyline({
          path: coords,
          strokeColor: "#00d8ff",
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        // Apply the line to the map
        trackPath.setMap(map);	
    }
    
	function _reset(){

		positions = [];
		$output.html('');
	}
});