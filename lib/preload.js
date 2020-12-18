//Questo codice verrà eseguito nella webview
//This code will be executed in the webview
// const { ipcRenderer } = require('electron')
module.exports = (function () {
    const {ipcRenderer} = require('electron');
    // window.Notification = ProxifiedNotification;
    class AtomNotification extends Notification{
      constructor(title,args){

        ipcRenderer.sendToHost(JSON.stringify({title,...args}));
        // console.log(title,args)
        const not =  super(title,args);
        not.addEventListener('show',e=>{
          e.preventDefault();
          not.close();
        });
      }
    }
    window.Notification =  AtomNotification;
    console.log("preload loaded")
})();

// Notification.requestPermission(function (permission) {
//     if (permission === "granted") {
//         const notif = new Notification('My title');
//     }
// });
