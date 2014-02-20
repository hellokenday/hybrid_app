steroids.view.navigationBar.show("App");

  var leftDrawer = new steroids.views.WebView("/views/drawer/drawer.html");

  leftDrawer.preload({},{
    onSuccess: initGesture  // When the view has loaded, enable finger tracking
  });

  function initGesture() {
    steroids.drawers.enableGesture(leftDrawer);
  }

  // Helper functions

  function openDrawer() {
    steroids.drawers.show(leftDrawer);
  }

  function closeDrawer() {
    steroids.drawers.hideAll();
  }