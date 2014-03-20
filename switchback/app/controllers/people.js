steroids.navigationBar.show("People");

// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

function initSegmented () {
    
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