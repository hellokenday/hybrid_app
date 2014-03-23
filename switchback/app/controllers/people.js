steroids.navigationBar.show("People");

var notificationsButton = new steroids.buttons.NavigationBarButton();
notificationsButton.imagePath = "/icons/pill@2x.png";

notificationsButton.onTap = function() {
    // open drawer
    openDrawer();
};

// Initially display the login button

steroids.view.navigationBar.setButtons({
    left: [notificationsButton]
    
});

// Initialize the left drawer

var notificationsDrawer = new steroids.views.WebView("views/notifications/index.html");

notificationsDrawer.preload({},{
    onSuccess: initGesture  // When the view has loaded, enable finger tracking
});

function initGesture() {
    steroids.drawers.enableGesture({
        view: notificationsDrawer,
        edge: steroids.screen.edges.RIGHT,
    });
}


// Helper functions

function openDrawer() {
    steroids.drawers.show(notificationsDrawer);
}

// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

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

function onDeviceReady () {

    initSegmented();
}

function onSegmentSelected(e) {

    // stop any events/weird stuff happening
    e.stopPropagation();

    //call onTabClicked, we'll decide what to do from there
    onTabClicked($('.segmented').find('.selected').index());
 }