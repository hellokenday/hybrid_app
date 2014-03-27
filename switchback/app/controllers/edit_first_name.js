// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// preload views vars
var someView = new steroids.views.WebView("");
someView.preload();

// Edit and Save buttons
var doneButton = new steroids.buttons.NavigationBarButton();
doneButton.title = "Done";

var backButton = new steroids.buttons.NavigationBarButton();
backButton.imagePath = "/icons/back_btn@2x.png";

function onDeviceReady() {
    initNavBar();
    initVisibilityChange();
} 

function initVisibilityChange() {
    
   document.addEventListener("visibilitychange", onVisibilityChange, false);
}

function onVisibilityChange() {
    
    if(!document.hidden) {
        // if document is visible... do this:
          setTimeout(initTextAreaFocus, 500); 
    }
}

function initNavBar() {
    steroids.view.navigationBar.show();
    steroids.view.navigationBar.update({
        title: "Edit Name",
        overrideBackButton: true,
        buttons: {
            left: [backButton],
            right: [doneButton]
        }
    });
}

function initTextAreaFocus() {

    // focus on text area when view is visible
    $(".form-text-textarea").focus();
}

backButton.onTap = function() {

    steroids.layers.pop(); 
};

doneButton.onTap = function() {

    steroids.layers.pop(); 
};