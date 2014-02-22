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