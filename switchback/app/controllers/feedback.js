document.addEventListener("deviceready", onDeviceReady, false);

var saveButton = new steroids.buttons.NavigationBarButton();

saveButton.title = "Save";

function onDeviceReady() {
    steroids.view.navigationBar.show();
    steroids.view.navigationBar.update({
        title: "Feedback",
        overrideBackButton: true,
        buttons: {
            left: [saveButton],
        }
    });
}    

saveButton.onTap = function() {
    //  save stuff
    steroids.layers.pop(); 
};