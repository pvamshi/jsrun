

## What is this 

Check the app at [https://jsrun.dev](https://jsrun.dev). The app lets you to run javascript code and preview the `console.log` output. It can be used for learning or as a scratchpad. 

### Features

* **Transparency** : Entire source code is available in github
* **You own your data** : All the scripts you save is stored in gists, you own them. They are not tied to jsrun anyway.
* **Secure** : Authentication is by github. So, only github knows that you logged into this app and your credentials. 
* **Single purpose**: The goal of this app is to do one thing and do it well. So it *not* a replacement for other good apps such as [https://codepen.io](https://codepen.io) or [https://jsbin.com](https://jsbin.com) or [https://jsfiddle.net](https://jsfiddle.net)

### Tech stack 

* [ReactJS](https://reactjs.org/) (web framework)
* No backend 😆
* [BlueprintJs](https://blueprintjs.com/) (Components) 
* [Create React AppContainer](https://github.com/facebook/create-react-app) (project generating and build scripts) 
* Github Oauth2 ( authentication) 
* [Gists](https://gists.github.com) ( Store your scripts ) 
