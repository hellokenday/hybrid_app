var track_id = '';      // Name/ID of the exercise
var watch_id = null;    // ID of the geolocation
var tracking_data = []; // Array containing GPS position objects
 
function startTracking_start(){
     alert("start");
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
  alert("stop");
  // Stop tracking the user
  navigator.geolocation.clearWatch(watch_id);
   
  // Save the tracking data
  window.localStorage.setItem(track_id, JSON.stringify(tracking_data));
 
  // Reset watch_id and tracking_data 
  var watch_id = null;
  var tracking_data = null;
 
  // Tidy up the UI
  $("#track_id").val("").show();
   
  $("#startTracking_status").html("Stopped tracking workout: <strong>" + track_id + "</strong>");
 
}

// --- Current gps position --- //

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
    var win = function(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var myLatlng = new google.maps.LatLng(lat, long);

        var myOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
        map_element = document.getElementById("map_canvas");
        map = new google.maps.Map(map_element, myOptions);
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
