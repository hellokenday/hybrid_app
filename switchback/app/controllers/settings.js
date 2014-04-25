// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

steroids.navigationBar.show("Settings");
var privacyView = new steroids.views.WebView("views/privacy/index.html");
privacyView.preload();

var feedbackView = new steroids.views.WebView("views/feedback/index.html");
feedbackView.preload();

function onDeviceReady() {
    
    initVisibilityChange();
}

function initVisibilityChange() {
    
   document.addEventListener("visibilitychange", onVisibilityChange, false);
}

function onVisibilityChange() {

    console.log("document.visibilityState: " + document.visibilityState);
    console.log("document.hidden: " + document.hidden);
    
    if(!document.hidden) {
        // if document is visible... do this:
            
        steroids.tabBar.selectTab({
            index: 3
          },
          {
          onSuccess: function() {
            console.log("Tab selected");
          },
          onFailure: function() {
            console.log("Failed to select tab.");
          }
        });
        
    }
    
    if(document.hidden) {
        // if document is hidden... do this:
        

    }
}

function showPrivacy() {
    
    steroids.layers.push( {
        view: privacyView,
        navigationBar: true,
        tabBar: false
    });
} 

function showFeedback() {
    
    steroids.layers.push( {
        view: feedbackView,
        navigationBar: true,
        tabBar: false
    });
}