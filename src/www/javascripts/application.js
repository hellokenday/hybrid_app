// steroids.view.navigationBar.show("Hello World");

function showCamera() {
  var webView = new steroids.views.WebView("views/camera/index.html");
  steroids.layers.push(webView);
}


function showFirebase() {
  var webView = new steroids.views.WebView("views/firebase/index.html");
  steroids.layers.push(webView);
}


function showDrawer() {
  var webView = new steroids.views.WebView("views/drawer/index.html");
  steroids.layers.push(webView);
}

function showGPS() {
  var webView = new steroids.views.WebView("views/gps/index.html");
  steroids.layers.push(webView);
}

function showSettings() {
  var webView = new steroids.views.WebView("views/settings/index.html");
  steroids.layers.push(webView);
}

function showPrivacy() {
  var webView = new steroids.views.WebView("views/privacy/index.html");
  steroids.layers.push(webView);
}

function showFeedback() {
  var webView = new steroids.views.WebView("views/feedback/index.html");
  steroids.layers.push(webView);
}

steroids.view.navigationBar.show("Layer Stack");