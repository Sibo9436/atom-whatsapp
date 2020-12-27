//Questo codice verrà eseguito nella webview
//This code will be executed in the webview
// const { ipcRenderer } = require('electron')
const weaselStore = (z)=>{
  for (const index in z){
    if(typeof z[index] ==="object"){
      let first = Object.values(z[index])[0];
      if(typeof first === "object"){
        for(const key in z[index]){
          if(z(key)){
            if(z(key).default && z(key).default.Chat && z(key).default.Msg) {
              window.Store = z(key).default
            }
            if(z(key).sendTextMsgToChat){
              window.Store.sendTextMsgToChat = z(key).sendTextMsgToChat;
            }

          }
        }
      }
    }
  }
}

module.exports = (function () {
    const {ipcRenderer} = require('electron');
    // window.Notification = ProxifiedNotification

    let parasite = 'parasite'+Date.now();
    // window.webpackJsonp = new Proxy({},()=>console.log("Something is happening to webpackJsonp "))
    window.addEventListener('load',()=> {
      setTimeout(()=>window.webpackJsonp.push([[parasite],{[parasite]: (x, y, z) =>weaselStore(z) },[[parasite]]]),5000);
      console.log('load')
    });
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
    ipcRenderer.on('reply',(ev,data)=>{
      console.log(data);
      const chat = window.Store.Chat._models.find(i=>i["__x_name"]===data.chat.title)
      window.Store.sendTextMsgToChat(chat,data.reply);
      // document.querySelector(`[title="${data.chat.title}"]`).dispatchEvent(new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window}));
      // console.log(`${data.chat.title}`)//.dispatchEvent(new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window}));
    });
    console.log("preload loaded")
})();

// Notification.requestPermission(function (permission) {
//     if (permission === "granted") {
//         const notif = new Notification('My title');
//     }
// });
