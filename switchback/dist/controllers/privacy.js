// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// nav bar vars
var saveButton = new steroids.buttons.NavigationBarButton();
saveButton.title = "Save";

function onDeviceReady() {
    initNavBar();
    initSelectableList();
}  

function initNavBar() {
    steroids.view.navigationBar.show();
    steroids.view.navigationBar.update({
        title: "Privacy",
        overrideBackButton: true,
        buttons: {
            left: [saveButton],
        }
    });
}

function initSelectableList() {
     
    // chui selectable list
    
    $('.list').UISelectList({
        selected: 2,
        callback: function() {
            $("#response").html($(this).text());
        }
    });
    if (window.jQuery) {
        $('li').each(function(idx, ctx) {
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
    //  save stuff
    steroids.layers.pop(); 
};