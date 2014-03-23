steroids.view.navigationBar.show("Profile");


//document.addEventListener("DOMContentLoaded", function() {
//  loginText = document.querySelector("#login-text");
//});

// Edit and Save buttons

var editButton = new steroids.buttons.NavigationBarButton();
editButton.title = "Edit";

var saveButton = new steroids.buttons.NavigationBarButton();
saveButton.title = "Save";

var logOutButton = new steroids.buttons.NavigationBarButton();
logOutButton.title = "Log Out";

editButton.onTap = function() {
    
    // open modal view
    showPrivacy();
};

saveButton.onTap = function() {
//  loginText.textContent = "Please log in.";
  steroids.view.navigationBar.setButtons({
    right: [editButton]
  });
}

// Initially display the login button

steroids.view.navigationBar.setButtons({
    right: [editButton],
    left: [logOutButton]
    
});

var privacyView = new steroids.views.WebView("views/privacy/index.html");
privacyView.preload();

function showPrivacy() {
    steroids.layers.push(privacyView);
} 



/*
steroids.view.navigationBar.update({
  titleImagePath: "/icons/telescope@2x.png",
  overrideBackButton: false,
  buttons: {
    left: [leftButton],
    right: [rightButton, imageButton]
  }
}, {
  onSuccess: function() {
    alert("Navigation bar updated!");
  },
  onFailure: function() {
    alert("Failed to update the navigation bar.");
  }
});
checkForLocalhost();

// nav bar vars
var leftButton;
var rightButton;
var imageButton;


// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    
    initNavBar();
}

function initNavBar() {
    
    leftButton = new steroids.buttons.NavigationBarButton();
    rightButton = new steroids.buttons.NavigationBarButton();
    imageButton = new steroids.buttons.NavigationBarButton();
    
    leftButton.title = "Left";
    rightButton.title = "Right";
    imageButton.imagePath = "/icons/pill@2x.png";

}


leftButton.onTap = function() { alert("Left button tapped"); }
rightButton.onTap = function() { alert("Right button tapped"); }
imageButton.onTap = function() { alert("Image button tapped"); }

steroids.view.navigationBar.update({
  titleImagePath: "/icons/telescope@2x.png",
  overrideBackButton: false,
  buttons: {
    left: [leftButton],
    right: [rightButton, imageButton]
  }
}, {
  onSuccess: function() {
    alert("Navigation bar updated!");
  },
  onFailure: function() {
    alert("Failed to update the navigation bar.");
  }
});

/*
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
*/