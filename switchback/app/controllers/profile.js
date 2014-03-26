// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// vars
var editProfileView = new steroids.views.WebView("views/edit_profile/index.html");
editProfileView.preload();

// Edit and Save buttons
var editButton = new steroids.buttons.NavigationBarButton();
editButton.title = "Edit";

var logOutButton = new steroids.buttons.NavigationBarButton();
logOutButton.title = "Log Out";

function onDeviceReady() {
    initSheetButtons();
    initNavBar();
    disableScrolling();
    initChuiSheet();
    initGesture();
} 

function initNavBar() {
    steroids.view.navigationBar.show();
    steroids.view.navigationBar.update({
        title: "Profile",
        overrideBackButton: false,
        buttons: {
            left: [logOutButton],
            right: [editButton],
        }
    });
}

function initSheetButtons() {
    $('.action-sheet-button').on('singletap', closeLogoutControls);
}

function closeLogoutControls() {
    
    steroids.tabBar.show();
    $('.action-sheet').removeClass('in');
}

function disableScrolling() {
    
    // http://www.sitepoint.com/forums/showthread.php?673175-iphone-gt-safari-gt-Lock-viewport-scrolling
    $('body').bind("touchmove", {}, function(event){
        event.preventDefault();
    });
}

function performAnimation() {
    var anim = new steroids.Animation({
        transition: "slideFromBottom",
        duration: 0.3 
    });
    steroids.layers.push({
        view: editProfileView,
        animation: anim,
        tabBar: false 
    });
}

// navigation bar button listeners 
editButton.onTap = function() {
    // open modal view
    performAnimation();
};

logOutButton.onTap = function() {
    
    $('.action-sheet').addClass('in');
    steroids.tabBar.hide();
}