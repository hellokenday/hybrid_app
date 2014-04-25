// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// nav bar vars
var saveButton = new steroids.buttons.NavigationBarButton();
saveButton.title = "Save";

var settingsView = new steroids.views.WebView("views/settings/index.html");
settingsView.preload();

function onDeviceReady() {
    initNavBar();
}

function initNavBar() {

    steroids.view.navigationBar.show();
    steroids.view.navigationBar.update({
        title: "Feedback",
        overrideBackButton: true,
        buttons: {
            left: [saveButton],
        }
    });
}

saveButton.onTap = function() {
    
    steroids.layers.pop(); 
};