// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// preload view vars
var peopleView = new steroids.views.WebView("views/people/index.html");
peopleView.preload();

var searchView = new steroids.views.WebView("views/search/index.html");

//function onDeviceReady() {
////    initSheetButtons();
////    initPopupButtons();
////    initNavBar();
////    disableScrolling();
//} 

function onDeviceReady() {
    initVisibilityChange();
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
        
        searchView.unload();
    }
}

function backToPeople() {
    steroids.view.navigationBar.show();
    steroids.layers.pop();
}



//function initSheetButtons() {
//    
//    $('.mute_btn').on('singletap', closeSheetandShowMuteOptions);
//    $('.block_btn').on('singletap', closeAndShowBlockView);
//    $('.cancel_btn').on('singletap', closeFlagControls);
//}