checkForLocalhost();

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
    function s
() {
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