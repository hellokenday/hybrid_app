// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);
                          
// nav bar vars
var notificationsDrawer = new steroids.views.WebView("views/notifications/index.html");

var notificationsButton = new steroids.buttons.NavigationBarButton();
notificationsButton.imagePath = "/icons/bell@2x.png";

var searchButton = new steroids.buttons.NavigationBarButton();
searchButton.imagePath = "/icons/search@2x.png";

// preload view vars
var friendView = new steroids.views.WebView("views/friend/index.html");
friendView.preload();

var searchView = new steroids.views.WebView("views/search/index.html");
searchView.preload();

var GroupView = new steroids.views.WebView("views/group/index.html");
GroupView.preload();


function onDeviceReady () {

    initNavBar();
    initDrawer();
    initSegmented();
    initButtons();
    initVisibilityChange();
} 

function initVisibilityChange() {
    
   document.addEventListener("visibilitychange", onVisibilityChange, false);
}

function onVisibilityChange() {
    
    if(!document.hidden) {
        // if document is visible... do this:
        
        steroids.view.navigationBar.show();
    }
}

function initNavBar() {
    steroids.view.navigationBar.show();
    steroids.view.navigationBar.update({
        title: "People",
        overrideBackButton: true,
        buttons: {
            left: [notificationsButton],
            right: [searchButton]
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

function initButtons() {
    $('.friend_btn').on('singletap', showFriend);
    $('.group_btn').on('singletap', showGroup);
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

searchButton.onTap = function() {
    
        steroids.layers.push( {
        view: searchView,
        navigationBar: false,
        tabBar: false
    });
}

function showFriend() {
    
    steroids.layers.push( {
        view: friendView,
        navigationBar: true,
        tabBar: false
    });
} 

function showGroup() {
    
    steroids.layers.push( {
        view: GroupView,
        navigationBar: true,
        tabBar: false
    });
} 