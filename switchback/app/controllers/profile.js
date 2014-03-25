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
    disableScrolling();
    initChuiSheet();
    initSheetButtons();
    initNavBar();
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

function initChuiSheet() {

    $.UISheet();
    $('.sheet').find('section').append("<ul class='list'></li>");
    $('.sheet .list').append("<li><a class='button' href='javascript:void(null)'>Log Out</a></li><li><a class='button' href='javascript:void(null)'>Cancel</a></li>");
}

function initSheetButtons() {
    $('.sheet .list').on('singletap', '.button', closeLogoutControls);
}

function closeLogoutControls() {
        steroids.tabBar.show();
        $.UIHideSheet();
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
    steroids.tabBar.hide();
    $.UIShowSheet();
}