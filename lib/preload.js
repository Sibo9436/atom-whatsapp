//Questo codice verrà eseguito nella webview
//This code will be executed in the webview
// const { ipcRenderer } = require('electron')
module.exports = (function () {
    const {ipcRenderer} = require('electron');
    // window.Notification = ProxifiedNotification

    //Questo è molto in beta e decisamente da mettere in un altro preload con impostazione
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
    ipcRenderer.on('response',(ev,data)=>{
      console.log(data);
      document.querySelector(`[title="${data.chat.title}"]`).dispatchEvent(new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window}));
      // console.log(`${data.chat.title}`)//.dispatchEvent(new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window}));
    });
    console.log("preload loaded")
})();

// Notification.requestPermission(function (permission) {
//     if (permission === "granted") {
//         const notif = new Notification('My title');
//     }
// });
