// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

var cancelButton = new steroids.buttons.NavigationBarButton();
var saveButton = new steroids.buttons.NavigationBarButton();

cancelButton.title = "Cancel";
saveButton.title = "Save";

function onDeviceReady() {
    initNavBar();
    initButtons();
    initSheetButtons();
    disableScrolling();
    initCamera();
}

function initNavBar() {
    steroids.view.navigationBar.show();
    steroids.view.navigationBar.update({
        title: "Edit Profile",
        overrideBackButton: true,
        buttons: {
            left: [cancelButton],
            right: [saveButton],
        }
    });
}

function initButtons() {
    $('.profile_pic_btn').on('singletap', showCameraSheet);
}

function showCameraSheet() {
    $('.action-sheet').addClass('in');
}

function initSheetButtons() {
    
    $('.take_photo_btn').on('singletap', closeSheetAndTakePhoto);
    $('.choose_photo_btn').on('singletap', closeSheetAndChoosePhoto);
    $('.cancel_btn').on('singletap', closeProfilePictureControls);
}

function closeSheetAndTakePhoto() {
    
    // take photo stuff
    $('.action-sheet').removeClass('in');
}

function closeSheetAndChoosePhoto() {

    // choose photo stuff
    $('.action-sheet').removeClass('in');
}

function closeProfilePictureControls() {
    $('.action-sheet').removeClass('in');
}

function disableScrolling() {
    
    // http://www.sitepoint.com/forums/showthread.php?673175-iphone-gt-safari-gt-Lock-viewport-scrolling
    $('body').bind("touchmove", {}, function(event){
        event.preventDefault();
    });
}

cancelButton.onTap = function() {
    //  cancel stuff
    steroids.layers.pop(); 
};

saveButton.onTap = function() {
    //  save stuff
    steroids.layers.pop(); 
};