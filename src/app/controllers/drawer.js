  // Initialize the left drawer

//function showCamera() {
//  var webView = new steroids.views.WebView("views/camera/index.html");
//  steroids.layers.push(webView);
//}

  var cameraView = new steroids.views.WebView("views/camera/index.html");
  cameraView.preload();
  
  function showCamera() {
    steroids.layers.push(cameraView);
  }


//function showFirebase() {
//  var webView = new steroids.views.WebView("views/firebase/index.html");
//  steroids.layers.push(webView);
//}

// preload firebase web view and show
  var firebaseView = new steroids.views.WebView("views/firebase/index.html");
  firebaseView.preload();
  
  function showFirebase() {
    steroids.layers.push(firebaseView);
  }


//function showGPS() {
//  var webView = new steroids.views.WebView("views/gps/index.html");
//  steroids.layers.push(webView);
//}

// preload GPS web view and show
  var gpsView = new steroids.views.WebView("views/gps/index.html");
  gpsView.preload();
  
  function showGPS() {
    steroids.layers.push(gpsView);
  }

//function showSettings() {
//  var webView = new steroids.views.WebView("views/settings/index.html");
//  steroids.layers.push(webView);
//}

// preload settings web view and show
  var settingsView = new steroids.views.WebView("views/settings/index.html");
  settingsView.preload();
  
  function showSettings() {
    steroids.layers.push(settingsView);
  }