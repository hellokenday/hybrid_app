  var privacyView = new steroids.views.WebView("views/privacy/index.html");
  privacyView.preload();
  
  function showPrivacy() {
    steroids.layers.push(privacyView);
  } 

  var feedbackView = new steroids.views.WebView("views/feedback/index.html");
  feedbackView.preload();
  
  function showFeedback() {
    steroids.layers.push(feedbackView);
  }