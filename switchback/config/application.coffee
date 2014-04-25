# For an explanation of the steroids.config properties, see the guide at
# http://guides.appgyver.com/steroids/guides/project_configuration/config-application-coffee/

steroids.config.name = "App"

# -- Initial Location --
# steroids.config.location = "http://localhost/index.html"

# -- Tab Bar --
steroids.config.tabBar.enabled = true
steroids.config.tabBar.tabs = [
   {
     title: "Ride"
     icon: "icons/sprint_cycling@2x.png"
     location: "http://localhost/views/gps/index.html"
   },
   {
     title: "People"
     icon: "icons/group@2x.png"
     location: "http://localhost/views/people/index.html"
   },
#  {
#    title: "Chat"
#    icon: "icons/chat@2x.png"
#    location: "http://localhost/views/firebase/index.html"
#  },
   {
     title: "Profile"
     icon: "icons/profile@2x.png"
     location: "http://localhost/views/profile/index.html"
   },
   {
     title: "Settings"
     icon: "icons/cog@2x.png"
     location: "http://localhost/views/settings/index.html"
   }
 ]

steroids.config.tabBar.tintColor = "#ffffff"
steroids.config.tabBar.tabTitleColor = "#14b29b"
steroids.config.tabBar.selectedTabTintColor = "#ffffff"
steroids.config.tabBar.selectedTabBackgroundImage = "icons/selected@2x.png"

# steroids.config.tabBar.backgroundImage = ""

# -- Navigation Bar --
# steroids.config.navigationBar.tintColor = "#eb6f65"
steroids.config.navigationBar.titleColor = "#ffffff"
steroids.config.navigationBar.buttonTintColor = "#ffffff"
steroids.config.navigationBar.buttonTitleColor = "#ffffff"

# steroids.config.navigationBar.landscape.backgroundImage = ""
steroids.config.navigationBar.portrait.backgroundImage = "icons/nav_bar@2x.png"

# -- Android Loading Screen
steroids.config.loadingScreen.tintColor = "#262626"

# -- iOS Status Bar --
steroids.config.statusBar.enabled = true
steroids.config.statusBar.style = "light"

# -- File Watcher --
# steroids.config.watch.exclude = ["www/my_excluded_file.js", "www/my_excluded_dir"]

# -- Pre- and Post-Make hooks --
# steroids.config.hooks.preMake.cmd = "echo"
# steroids.config.hooks.preMake.args = ["running yeoman"]
# steroids.config.hooks.postMake.cmd = "echo"
# steroids.config.hooks.postMake.args = ["cleaning up files"]

# -- Default Editor --
# steroids.config.editor.cmd = "subl"
# steroids.config.editor.args = ["."]
