// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// preload views vars
var editProfileView = new steroids.views.WebView("views/edit_profile/index.html");
editProfileView.preload();

// Edit and Save buttons
var flagButton = new steroids.buttons.NavigationBarButton();
flagButton.imagePath = "/icons/flag@2x.png";

var backButton = new steroids.buttons.NavigationBarButton();
backButton.imagePath = "/icons/back_btn@2x.png";

function onDeviceReady() {
    initNavBar();
    disableScrolling();
    initChuiSheet();
    initSheetButtons();
} 

function initNavBar() {
    steroids.view.navigationBar.show();
    steroids.view.navigationBar.update({
        title: "Friend",
        overrideBackButton: true,
        buttons: {
            left: [backButton],
            right: [flagButton]
        }
    });
}

function initChuiSheet() {

    $.UISheet();
    $('.sheet').find('section').append("<ul class='list'></li>");
    $('.sheet .list').append("<li><a class='button mute_btn' href='javascript:void(null)'>Mute friend_Name</a></li><li><a class='button block_btn' href='javascript:void(null)'>Block friend_Name</a></li><li><a class='button cancel' href='javascript:void(null)'>Cancel</a></li>");
}

function initSheetButtons() {
    
    $('.mute_btn').on('singletap', closeShowMuteOptions);
    $('.block_btn').on('singletap', closeShowBlockView);
    $('.cancel').on('singletap', closeFlagControls);
}

function closeFlagControls() {
    
    $.UIHideSheet();
}

function closeShowMuteOptions() {
    $.UIHideSheet();
    showMuteOptions();
}

function showMuteOptions() {
    $.UIPopup({
        id: "warning",
        title: 'Mute Friend_Name', 
        message: 'You will stop getting notifications from friend_name. You can still see posts in your stream or on their profile.', 
        cancelButton: 'Cancel', 
        continueButton: 'Mute', 
        callback: function() {
         // var popupMessageTarget = document.querySelector('#popupMessageTarget');
         // popupMessageTarget.textContent = 'Thanks for staying with us a bit longer.';
            popupMessageTarget.className = "";
            popupMessageTarget.className = "animatePopupMessage";
        }
    });
}

function closeShowBlockView() {
    alert('closeShowBlockView');
    $.UIHideSheet();
}

function backToPeople() {

    steroids.layers.pop();
}

function disableScrolling() {
    
    // http://www.sitepoint.com/forums/showthread.php?673175-iphone-gt-safari-gt-Lock-viewport-scrolling
    $('body').bind("touchmove", {}, function(event){
        event.preventDefault();
    });
}

backButton.onTap = function() {

    steroids.layers.pop(); 
};

flagButton.onTap = function() {

    $.UIShowSheet(); 
};