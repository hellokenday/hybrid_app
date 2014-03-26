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
    initSheetButtons();
    initPopupButtons();
    initNavBar();
    disableScrolling();
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

function initSheetButtons() {
    
    $('.mute_btn').on('singletap', closeSheetandShowMuteOptions);
    $('.block_btn').on('singletap', closeAndShowBlockView);
    $('.cancel_btn').on('singletap', closeFlagControls);
}

function initPopupButtons() {
    $('.left').on('singletap', closeMutePopup);
    $('.right').on('singletap', closeMutePopupAndNotify);
}

function closeFlagControls() {
    $('.action-sheet').removeClass('in');
}

function closeSheetandShowMuteOptions() {
    $('.action-sheet').removeClass('in');
    showMuteAlert();
}

function showMuteAlert() {
    
    $('.alert').addClass('in opened');
}

function closeMutePopup() {
    
    $('.alert').removeClass('in');
}

function closeMutePopupAndNotify() {
    
    
    $('.alert').removeClass('in');
}

function closeAndShowBlockView() {
    $('.action-sheet').removeClass('in');
    alert('closeShowBlockView');
    // block view push here...
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

    $('.action-sheet').addClass('in');
};