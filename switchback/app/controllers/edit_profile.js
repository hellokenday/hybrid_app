//steroids.view.navigationBar.show();
 
document.addEventListener("deviceready", onDeviceReady, false);

var cancelButton = new steroids.buttons.NavigationBarButton();
var saveButton = new steroids.buttons.NavigationBarButton();

cancelButton.title = "Cancel";
saveButton.title = "Save";

function onDeviceReady() {
    steroids.view.navigationBar.show();
    steroids.view.navigationBar.update({
        title: "Edit Profile",
        overrideBackButton: true,
        buttons: {
            left: [cancelButton],
            right: [saveButton],
        }
    });
}    

cancelButton.onTap = function() {
    //  cancel stuff
    steroids.layers.pop(); 
};

saveButton.onTap = function() {
    //  save stuff
    steroids.layers.pop(); 
};