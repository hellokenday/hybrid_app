
// steroids.view.navigationBar.show("Hello World");

function showCamera() {
  var webView = new steroids.views.WebView("views/camera/index.html");
  steroids.layers.push(webView);
}

steroids.view.navigationBar.show("Layer Stack");


function showFirebase() {
  var webView = new steroids.views.WebView("views/firebase/index.html");
  steroids.layers.push(webView);
}

steroids.view.navigationBar.show("Layer Stack");

function showDrawer() {
  var webView = new steroids.views.WebView("views/drawer/index.html");
  steroids.layers.push(webView);
}

steroids.view.navigationBar.show("Layer Stack");

function showGPS() {
  var webView = new steroids.views.WebView("views/gps/index.html");
  steroids.layers.push(webView);
}

steroids.view.navigationBar.show("Layer Stack");

function showSettings() {
  var webView = new steroids.views.WebView("views/settings/index.html");
  steroids.layers.push(webView);
}

steroids.view.navigationBar.show("Layer Stack");