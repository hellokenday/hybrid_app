// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// vars
var editProfileView = new steroids.views.WebView("views/edit_profile/index.html");
editProfileView.preload();

// Edit and Save buttons
var editButton = new steroids.buttons.NavigationBarButton();
editButton.title = "Edit";

var logOutButton = new steroids.buttons.NavigationBarButton();
logOutButton.title = "Log Out";

function onDeviceReady() {
    initSheetButtons();
    initNavBar();
    disableScrolling();
    initSegmented();
} 

function initNavBar() {
    steroids.view.navigationBar.show();
    steroids.view.navigationBar.update({
        title: "Profile",
        overrideBackButton: false,
        buttons: {
            left: [logOutButton],
            right: [editButton],
        }
    });
}

function initSheetButtons() {
    $('.action-sheet-button').on('singletap', closeLogoutControls);
}

function closeLogoutControls() {
    
    steroids.tabBar.show();
    $('.action-sheet').removeClass('in');
}

function disableScrolling() {
    
    // http://www.sitepoint.com/forums/showthread.php?673175-iphone-gt-safari-gt-Lock-viewport-scrolling
    $('body').bind("touchmove", {}, function(event){
        event.preventDefault();
    });
}

// Helper functions
function initSegmented () {

    // chocloate-chip UI - segmented list
    var segmentedOptions = {

        id: 'mySegmented',
        labels : ['Recent','All'],
        selected: 0
     };
     var segmentedComponent = $.UICreateSegmented(segmentedOptions);

     $('#segmentedPanel').append(segmentedComponent);
     $('.segmented').UISegmented({callback:onSegmentSelected});
     $('.segmented').UIPanelToggle('#toggle-panels',function(){$.noop;});     
}

function onSegmentSelected(e) {

    // stop any events/weird stuff happening
    e.stopPropagation();

    //call onTabClicked, we'll decide what to do from there
    onTabClicked($('.segmented').find('.selected').index());
 }

 function onTabClicked(tabIndex) {
        
    switch(tabIndex) {

        case 0:
            if(!tab1Inited) initRecent();
            break;
        case 1:
            if(!tab2Inited) initAll();
            break;
        default:
            console.log('onTabClicked: unknown tab index: ' + tabIndex);
    }
}

function initRecent() {
    // do something
}

function initAll() {
    // do something
}

function showeditProfile() {
    
    steroids.layers.push( {
        view: editProfileView,
        navigationBar: true,
        tabBar: false
    });
} 

//function performAnimation() {
//    var anim = new steroids.Animation({
//        transition: "slideFromBottom",
//        duration: 0.3 
//    });
//    steroids.layers.push({
//        view: editProfileView,
//        animation: anim,
//        tabBar: false 
//    });
//}

// navigation bar button listeners 
editButton.onTap = function() {
    // open modal view
    // steroids.modal.show(editProfileView);
    
    // steroids.tabBar.hide();
    showeditProfile();
    // performAnimation();
};

logOutButton.onTap = function() {
    
    $('.action-sheet').addClass('in');
    steroids.tabBar.hide();
}