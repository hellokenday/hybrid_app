// An event that fires when the steroids.view.WebView visibility changes
document.addEventListener("visibilitychange", onVisibilityChange, false);

function onVisibilityChange() {
    
    alert('visibility change');
    if (document.hidden) {
        alert('hidden');
        steroids.drawers.disableGesture()
    }
    else if (document.visible) {
                alert('visibile');
        steroids.drawers.enableGesture()
    }
}