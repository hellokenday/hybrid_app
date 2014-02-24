steroids.navigationBar.hide();

var loginView = new steroids.views.WebView("views/login/index.html");
loginView.preload();

function showLogin() {
steroids.layers.push(loginView);
}

var signUpView = new steroids.views.WebView("views/signup/index.html");
signUpView.preload();

function showSignUp() {
steroids.layers.push(signUpView);
}