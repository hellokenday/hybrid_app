steroids.navigationBar.show("GPS");

/*** --- Map Panel --- ***/

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

/**
 * function snippet from: http://zsprawl.com/iOS/2012/03/using-phonegap-with-google-maps/
 */
function onSuccess() {
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


/** --- Stats and History --- **/

/**
 * Code built on gps tutorial: http://code.tutsplus.com/tutorials/build-an-exercise-tracking-app-geolocation-tracking--mobile-11070
 */

function gps_distance(lat1, lon1, lat2, lon2) {
	// http://www.movable-type.co.uk/scripts/latlong.html
    var R = 6371; // km
    var dLat = (lat2-lat1) * (Math.PI / 180);
    var dLon = (lon2-lon1) * (Math.PI / 180);
    var lat1 = lat1 * (Math.PI / 180);
    var lat2 = lat2 * (Math.PI / 180);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    
    return d;
}

//document.addEventListener("deviceready", function(){
//	
//	if(navigator.network.connection.type == Connection.NONE){
//		$("#home_network_button").text('No Internet Access')
//								 .attr("data-icon", "delete")
//								 .button('refresh');
//	}
//
//});


var track_id = '';      // Name/ID of the exercise
var watch_id = null;    // ID of the geolocation
var tracking_data = []; // Array containing GPS position objects

function startTracking_start(){
	// Start tracking the User
    watch_id = navigator.geolocation.watchPosition(
    
    	// Success
        function(position){
            tracking_data.push(position);
        },
        
        // Error
        function(error){
            console.log(error);
        },
        
        // Settings
        { frequency: 3000, enableHighAccuracy: true });
    
    // Tidy up the UI
    track_id = $("#track_id").val();
    
    $("#track_id").hide();
    
    $("#startTracking_status").html("Tracking workout: <strong>" + track_id + "</strong>");
}


function startTracking_stop(){
    
	// Stop tracking the user
	navigator.geolocation.clearWatch(watch_id);
	
	// Save the tracking data
	window.localStorage.setItem(track_id, JSON.stringify(tracking_data));
    
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    window.localStorage.setItem("last_track", track_id);

	// Reset watch_id and tracking_data 
	var watch_id = null;
	var tracking_data = null;

	// Tidy up the UI
	$("#track_id").val("").show();
	
	$("#startTracking_status").html("Stopped tracking workout: <strong>" + track_id + "</strong>");

}

//// When the user views the history page
//$('#history').live('pageshow', function () {
//	
//	// Count the number of entries in localStorage and display this information to the user
//	tracks_recorded = window.localStorage.length;
//	$("#tracks_recorded").html("<strong>" + tracks_recorded + "</strong> workout(s) recorded");
//	
//	// Empty the list of recorded tracks
//	$("#history_tracklist").empty();
//	
//	// Iterate over all of the recorded tracks, populating the list
//	for(i=0; i<tracks_recorded; i++){
//		$("#history_tracklist").append("<li><a href='#track_info' data-ajax='false'>" + window.localStorage.key(i) + "</a></li>");
//	}
//	
//	// Tell jQueryMobile to refresh the list
//	$("#history_tracklist").listview('refresh');
//
//});
//
//// When the user clicks a link to view track info, set/change the track_id attribute on the track_info page.
//$("#history_tracklist li a").live('click', function(){
//
//	$("#track_info").attr("track_id", $(this).text());
//	
//});


// When the user views the Track Info page
function loadMap(){
	// Find the track_id of the workout they are viewing
    var key =  window.localStorage.getItem("last_track");
	// Get all the GPS data for the specific workout
	var data = window.localStorage.getItem(key);

	// Turn the stringified GPS data back into a JS object
	data = JSON.parse(data);

	// Calculate the total distance travelled
	total_km = 0;

	for(i = 0; i < data.length; i++){
	    
	    if(i == (data.length - 1)){
	        break;
	    }
	    
	    total_km += gps_distance(data[i].coords.latitude, data[i].coords.longitude, data[i+1].coords.latitude, data[i+1].coords.longitude);
	}
	
	total_km_rounded = total_km.toFixed(2);
	
	// Calculate the total time taken for the track
	start_time = new Date(data[0].timestamp).getTime();
	end_time = new Date(data[data.length-1].timestamp).getTime();

	total_time_ms = end_time - start_time;
	total_time_s = total_time_ms / 1000;
	
	final_time_m = Math.floor(total_time_s / 60);
	final_time_s = total_time_s - (final_time_m * 60);

	// Display total distance and time
	$("#track_info_info").html('Travelled <strong>' + total_km_rounded + '</strong> km in <strong>' + final_time_m + 'm</strong> and <strong>' + final_time_s + 's</strong>');
	
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

    var trackCoords = [];
    
    // Add each GPS entry to an array
    for(i=0; i<data.length; i++){
    	trackCoords.push(new google.maps.LatLng(data[i].coords.latitude, data[i].coords.longitude));
    }
    
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