// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// preload view vars
var peopleView = new steroids.views.WebView("views/people/index.html");
peopleView.preload();

var searchView = new steroids.views.WebView("views/search/index.html");

function onDeviceReady() {
    initVisibilityChange();
    initButtons();
    initNavBar();
} 

function initVisibilityChange() {
    
   document.addEventListener("visibilitychange", onVisibilityChange, false);
}

function onVisibilityChange() {
    
    // fallback if navigationBar.show fails in backToPeople
    
    if(document.hidden) {
        // if document is hidden... do this:
        
        steroids.view.navigationBar.show();
    }
    
    if (!document.hidden) {
        // if document is visible... do this:
                
        steroids.view.navigationBar.hide();
        setTimeout(initTextAreaFocus, 500);
    //  searchView.unload();
    }
}

// strip nav bar incase it does show
function initNavBar() {
    steroids.view.navigationBar.update({
        title: "",
        overrideBackButton: true,
        buttons: {
            left: [],
            right: []
        }
    });
}

function initButtons() {
    
    $('.cancel_btn').on('singletap', backToPeople);
}

function initTextAreaFocus() {

    // focus on text area when view is visible
    $(".search-bar-input").focus();
}

function backToPeople() {
    steroids.view.navigationBar.show();
    steroids.layers.pop();
}
