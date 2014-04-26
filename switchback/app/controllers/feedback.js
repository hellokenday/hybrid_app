// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// nav bar vars
var saveButton = new steroids.buttons.NavigationBarButton();
saveButton.title = "Save";

var settingsView = new steroids.views.WebView("views/settings/index.html");
settingsView.preload();

function onDeviceReady() {
    initNavBar();
    initSwitch();
    initSelectableList();
}

function initNavBar() {

    steroids.view.navigationBar.show();
    steroids.view.navigationBar.update({
        title: "Feedback",
        overrideBackButton: true,
        buttons: {
            left: [saveButton],
        }
    });
}

function initSwitch() {
    
    // chui switches

    $('.switch').each(function(ctx, idx) {
        if (window && window.jQuery) ctx = idx;
        if (ctx.classList.contains('on')) {
            $('#response').html($(ctx).find('input').val());
        }
    });

    $('.switch').on('singletap swipeleft swiperight', function() {
        if (this.classList.contains('on')) {
            $('#response').html($(this).find('input').val());
        } 
        else {
            $('#response').empty();
        }
    });
}


function initSelectableList() {
     
    // chui selectable list
    
    $('.tick').UISelectList({
        selected: 2,
        callback: function() {
            $("#response").html($(this).text());
        }
    });
    if (window.jQuery) {
        $('.select').each(function(idx, ctx) {
            if ($(ctx).hasClass('selected')) {
                $("#response").html($(ctx).text());
            }
        });
    } 
    else {
        $("#response").html($('li').hasClass('selected').text());
    }
}

saveButton.onTap = function() {
    
    steroids.layers.pop(); 
};