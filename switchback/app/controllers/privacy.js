// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// nav bar vars
var saveButton = new steroids.buttons.NavigationBarButton();
saveButton.title = "Save";

function onDeviceReady() {
    initNavBar();
}  

function initNavBar() {
    steroids.view.navigationBar.show();
    steroids.view.navigationBar.update({
        title: "Privacy",
        overrideBackButton: true,
        buttons: {
            left: [saveButton],
        }
    });
}

saveButton.onTap = function() {
    //  save stuff
    steroids.layers.pop(); 
};