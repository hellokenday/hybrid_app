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
    
    if(document.hidden) {
        // if document is hidden... do this:
        
        // delay prevents keyboard showing during view animation
        steroids.view.navigationBar.show();
    }
    
    if (!document.hidden) {
        // if document is visible... do this:
        
        steroids.view.navigationBar.hide();
        
        // unload search view from memory to bring back nav bar on layer pop
        searchView.unload();
    }
}

function backToPeople() {

    steroids.layers.pop();
}



//function initSheetButtons() {
//    
//    $('.mute_btn').on('singletap', closeSheetandShowMuteOptions);
//    $('.block_btn').on('singletap', closeAndShowBlockView);
//    $('.cancel_btn').on('singletap', closeFlagControls);
//}