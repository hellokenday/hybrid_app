// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);
                          
// nav bar vars
var notificationsDrawer = new steroids.views.WebView("views/notifications/index.html");
var notificationsButton = new steroids.buttons.NavigationBarButton();
notificationsButton.imagePath = "/icons/pill@2x.png";

// preload view vars
var friendView = new steroids.views.WebView("views/friend/index.html");
friendView.preload();


function onDeviceReady () {

    initNavBar();
    initDrawer();
    initSegmented();
    initButtons();
}

function initNavBar() {
    steroids.view.navigationBar.show();
    steroids.view.navigationBar.update({
        title: "People",
        overrideBackButton: false,
        buttons: {
            left: [notificationsButton],
        }
    });
}

function initDrawer() {
    
    // Initialize the left drawer
    notificationsDrawer.preload({},{
        onSuccess: initGesture  // When the view has loaded, enable finger tracking
    });
}

function initGesture() {
    
    steroids.drawers.enableGesture({
        view: notificationsDrawer,
        edge: steroids.screen.edges.RIGHT,
    });
}

// Helper functions
function initSegmented () {

    // chocloate-chip UI - segmented list
    var segmentedOptions = {

        id: 'mySegmented',
        labels : ['Friends','Groups'],
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

notificationsButton.onTap = function() {
    // enable notifications button to open and close drawer when drawer gesture is disabled
    
    // https://moot.it/appgyver#!/?close drawer
    if(stateDraw === "open"){
        localStorage.setItem("drawerstate", "close");
        stateDraw = localStorage.getItem("drawerstate");
        steroids.drawers.hideAll();     
    }
    else if(stateDraw === "close"){
        localStorage.setItem("drawerstate", "open"); 
        stateDraw = localStorage.getItem("drawerstate"); 
        steroids.drawers.show(notificationsDrawer);  
    }
    else{
        localStorage.setItem("drawerstate", "open");
        stateDraw = localStorage.getItem("drawerstate");
        steroids.drawers.show(notificationsDrawer);
    }
};

function initButtons() {
    $('.friend_btn').on('singletap', showFriend);
}

function showFriend() {
    
    steroids.layers.push( {
        view: friendView,
        navigationBar: false,
        tabBar: false
    });
} 
