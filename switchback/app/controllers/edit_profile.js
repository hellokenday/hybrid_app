// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// preload view vars
var editFirstNameView = new steroids.views.WebView("views/edit_first_name/index.html");
editFirstNameView.preload();

var editLastNameView = new steroids.views.WebView("views/edit_last_name/index.html");
editLastNameView.preload();

var editUsernameView = new steroids.views.WebView("views/edit_username/index.html");
editUsernameView.preload();

var editRidingStylesView = new steroids.views.WebView("views/edit_riding_styles/index.html");
editRidingStylesView.preload();

var editLocationView = new steroids.views.WebView("views/edit_location/index.html");
editLocationView.preload();

// nav bar vars
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
    $('.first_name_btn').on('singletap', showEditName);
    $('.last_name_btn').on('singletap', showEditLastName);
    $('.username_btn').on('singletap', showEditUsername);
    $('.riding_styles_btn').on('singletap', showEditRidingStyles);
    $('.location_btn').on('singletap', showEditLocation);
    
}

function initSheetButtons() {
    
    $('.take_photo_btn').on('singletap', closeSheetAndTakePhoto);
    $('.choose_photo_btn').on('singletap', closeSheetAndChoosePhoto);
    $('.cancel_btn').on('singletap', closeProfilePictureControls);
}

function closeSheetAndTakePhoto() {
    
    $('.action-sheet').removeClass('in');
    capturePhoto();
}

function showCameraSheet() {
    $('.action-sheet').addClass('in');
}

function closeSheetAndChoosePhoto() {

    $('.action-sheet').removeClass('in');
    chooseImage();
}

function closeProfilePictureControls() {
    $('.action-sheet').removeClass('in');
}

function showEditName() {

    steroids.layers.push( {
        view: editFirstNameView,
        navigationBar: true,
        tabBar: false
    });
}

function showEditLastName() {
    
    steroids.layers.push( {
        view: editLastNameView,
        navigationBar: true,
        tabBar: false
    });
}

function showEditUsername() {
    
    steroids.layers.push( {
        view: editUsernameView,
        navigationBar: true,
        tabBar: false
    });
}

function showEditRidingStyles() {

    steroids.layers.push( {
        view: editRidingStylesView,
        navigationBar: true,
        tabBar: false
    });
}

function showEditLocation() {

    steroids.layers.push( {
        view: editRidingStylesView,
        navigationBar: true,
        tabBar: false
    });
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

/**
* Camera
*/

// Define our image and spinner elements and latest image URI
var imgElement = null;
var spinner = null;
var latestURI = null;

document.addEventListener("DOMContentLoaded", function(){
  imgElement = document.querySelector('#photo');
  spinner = document.querySelector('#spinner');
});

function showSpinner() {
  spinner.style.display = "block";
  imgElement.style.display = "none";
}

function showImage() {
  imgElement.style.display = "block";
  spinner.style.display = "none";
}

// Show the selected image
function imageURIReceived(imageURI) {
  imgElement.src = latestURI = imageURI;
  showImage();
}

// Show the Base64-encoded image
function imageDataReceived(imageData) {
  imgElement.src = latestURI = "data:image/jpeg;base64," + imageData;
  showImage();
}

// Camera failure callback
function cameraError(message) {
  navigator.notification.alert('Cordova says: ' + message, null, 'Capturing the photo failed!');
  imgElement.src = latestURI;
  showImage();

  // If no previous image URI exists, hide the image element
  if (latestURI == null) {
    imgElement.style.display = "none";
  }
}

// Choose an image from the device's photo library, the callback receives the image's file URI
function chooseImage() {
  checkForLocalhost();
  navigator.camera.getPicture(imageURIReceived, cameraError, { quality: 100,
    destinationType: navigator.camera.DestinationType.IMAGE_URI,
    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
    correctOrientation: true, // Let Cordova correct the picture orientation (WebViews don't read EXIF data properly)
    targetWidth: 1000,
    popoverOptions: { // iPad camera roll popover position
      width : 768,
      height : 190,
      arrowDir : Camera.PopoverArrowDirection.ARROW_UP
    }
  });
  showSpinner();
}

// Take a photo using the device's camera, the callback receives the image as a Base64-encoded string
function capturePhoto() {
  navigator.camera.getPicture(imageURIReceived, cameraError, { quality: 100,
    destinationType: navigator.camera.DestinationType.IMAGE_URI,
    correctOrientation: true,
    targetWidth: 1000
   });
   showSpinner();
}

// Inform the user that if the project is being served from localhost, the example doesn't function correctly
function checkForLocalhost() {
  if (window.location.href.indexOf("http://localhost") == 0) {
    navigator.notification.alert("Your project is being served from http://localhost/. Since Cordova's Camera API returns the location of the photo file as a file:// URL, trying to display the photo produces an error (due to the different protocols). Please switch the steroids.config.location property in config/application.coffee to just 'cameraExample.html' to fix this.", null, "You're on localhost!")
  }
}