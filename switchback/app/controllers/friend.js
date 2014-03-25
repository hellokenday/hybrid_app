    steroids.navigationBar.show();
// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// preload views vars
var editProfileView = new steroids.views.WebView("views/edit_profile/index.html");
editProfileView.preload();

// Edit and Save buttons
//var editButton = new steroids.buttons.NavigationBarButton();
//editButton.title = "Edit";
//
//var logOutButton = new steroids.buttons.NavigationBarButton();
//logOutButton.title = "Log Out";

function onDeviceReady() {
    initButtons();
    disableScrolling();
    initChuiSheet();
    initSheetButtons();
//    initNavBar();
} 

//function initNavBar() {
//    steroids.view.navigationBar.show();
//    steroids.view.navigationBar.update({
//        title: "Profile",
//        overrideBackButton: false,
//        buttons: {
//            left: [logOutButton],
//            right: [editButton],
//        }
//    });
//}

function initChuiSheet() {

    $.UISheet();
    $('.sheet').find('section').append("<ul class='list'></li>");
    $('.sheet .list').append("<li><a class='button' href='javascript:void(null)'>Log Out</a></li><li><a class='button' href='javascript:void(null)'>Cancel</a></li>");
}

function initButtons() {

    $('.back_btn').on('singletap', backToPeople);
    $('.settings_btn').on('singletap', showSettingsControls);
}

function initSheetButtons() {
    $('.sheet .list').on('singletap', '.button', closeSettingsControls);
}

function showSettingsControls() {
    
    $.UIShowSheet();
}

function closeSettingsControls() {
    
    $.UIHideSheet();
}

function showFriend() {
    
    steroids.layers.push( {
        view: friendView,
        navigationBar: false,
        tabBar: false
    });
} 


function backToPeople() {

    steroids.layers.pop( {
        tabBar: true
    }); 
}

function disableScrolling() {
    
    // http://www.sitepoint.com/forums/showthread.php?673175-iphone-gt-safari-gt-Lock-viewport-scrolling
    $('body').bind("touchmove", {}, function(event){
        event.preventDefault();
    });
}