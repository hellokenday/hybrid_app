// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// preload views vars
var someView = new steroids.views.WebView("");
someView.preload();

// Edit and Save buttons
var flagButton = new steroids.buttons.NavigationBarButton();
flagButton.imagePath = "/icons/flag@2x.png";

var backButton = new steroids.buttons.NavigationBarButton();
backButton.imagePath = "/icons/back_btn@2x.png";

function onDeviceReady() {
    initNavBar();
    initSheetButtons();
    initPopupButtons();
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

function closeFlagControls() {
    $('.action-sheet').removeClass('in');
}

function closeSheetandShowMuteOptions() {
    $('.action-sheet').removeClass('in');
    
    // delay mute alert until action sheet has closed
    setTimeout(showMuteAlert, 300);
}

function showMuteAlert() {
    
//    $('.alert').addClass('in opened');
    
    navigator.notification.confirm(
        'You will stop getting notifications from friend_name. You can still see posts in your stream or on their profile.',                        // message
         onConfirm,               // callback to invoke with index of button pressed
        'Mute friend_name',       // title
        ['Mute','Cancel']         // buttonLabels
    );
}

function onConfirm(buttonIndex) {
    
        if(buttonIndex == 1) {
            navigator.notification.alert(
                'friend_name has been muted',  // message
                alertDismissed,       // callback
                'friend_name',        // title
                'OK'                  // buttonName
            );
        }
        else { // do nothing
            
        }
}

function alertDismissed() {
        // do something
    }

function closeAndShowBlockView() {
    $('.action-sheet').removeClass('in');
    
    setTimeout(showBlockView, 300);
    // block view push here...
}

function showBlockView() {
    
    alert('closeShowBlockView');
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