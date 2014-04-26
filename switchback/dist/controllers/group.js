// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// preload views vars
var someView = new steroids.views.WebView("");
someView.preload();

// Edit and Save buttons
var flagButton = new steroids.buttons.NavigationBarButton();
flagButton.imagePath = "/icons/flag@2x.png";

var backButton = new steroids.buttons.NavigationBarButton();
backButton.imagePath = "/icons/back_btn@2x.png";

function onDeviceReady() {
    initSegmented();
    initSlinky();
//  initNavBar();
//  initScrollToFixed();
    initSheetButtons();

} 

function initSlinky() {
    $('.nav').slinky();
}

function initNavBar() {
    steroids.view.navigationBar.show();
    steroids.view.navigationBar.update({
        title: "Group",
        overrideBackButton: true,
        buttons: {
            left: [backButton],
            right: [flagButton]
        }
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
        labels : ['1','2','3','4'],
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
          // if(!tab1Inited) doSomething();
            break;
        case 1:
          // if(!tab2Inited) doSomething();
            break;
        case 2:
          // if(!tab3Inited) doSomething();
            break;
        case 3:
          // if(!tab4Inited) doSomething();
            break; 
        default:
            console.log('onTabClicked: unknown tab index: ' + tabIndex);
    }
}

function initScrollToFixed() {

    $('.header').scrollToFixed();
}

function initSheetButtons() {
    
    $('.mute_btn').on('singletap', closeSheetandShowMuteOptions);
    $('.block_btn').on('singletap', closeAndShowBlockView);
    $('.cancel_btn').on('singletap', closeFlagControls);
}

function closeFlagControls() {
    $('.action-sheet').removeClass('in');
}

function closeSheetandShowMuteOptions() {
    $('.action-sheet').removeClass('in');
    
    // delay mute alert until action sheet has closed
    setTimeout(showMuteAlert, 300);
}

function showMuteAlert() {
    
//    $('.alert').addClass('in opened');
    
    navigator.notification.confirm(
        'You will stop getting notifications from friend_name. You can still see posts in your stream or on their profile.',                        // message
         onConfirm,               // callback to invoke with index of button pressed
        'Mute friend_name',       // title
        ['Mute','Cancel']         // buttonLabels
    );
}

function onConfirm(buttonIndex) {
    
        if(buttonIndex == 1) {
            navigator.notification.alert(
                'friend_name has been muted',  // message
                alertDismissed,       // callback
                'friend_name',        // title
                'OK'                  // buttonName
            );
        }
        else { // do nothing
            
        }
}

function alertDismissed() {
        // do something
    }

function closeAndShowBlockView() {
    $('.action-sheet').removeClass('in');
    
    setTimeout(showBlockView, 300);
    // block view push here...
}

function showBlockView() {
    
    alert('closeShowBlockView');
}

backButton.onTap = function() {

    steroids.layers.pop(); 
};

flagButton.onTap = function() {

    $('.action-sheet').addClass('in');
};