// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);


// drawer local storage
var stateDraw = localStorage.getItem("drawerstate");
stateDraw = "close";