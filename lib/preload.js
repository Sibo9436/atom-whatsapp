/*eslint-disable*/
//Questo codice verrà eseguito nella webview
//This code will be executed in the webview

const reloadOnVersionError = (event) => {
	const {ipcRenderer} = require('electron');
	if (document.getElementsByClassName("text-tip")[0].innerText.slice(0,15).toLowerCase() === "to use whatsapp") {
		const action = "reload";
		ipcRenderer.sendToHost(JSON.stringify({action}));
	}
}

document.addEventListener("DOMContentLoaded", reloadOnVersionError);

const weaselStore = (rob)=>{
  for (const index in rob){
    if(typeof rob[index] ==="object"){
      let first = Object.values(rob[index])[0];
      if(typeof first === "object"){
        for(const key in rob[index]){
          if(rob(key)){
            if(rob(key).default && rob(key).default.Chat && rob(key).default.Msg) {
              window.Store = rob(key).default
            }
            if(rob(key).sendTextMsgToChat){
              window.Store.sendTextMsgToChat = rob(key).sendTextMsgToChat;
            }

          }
        }
      }
    }
  }
}

module.exports = (function () {
    const {ipcRenderer} = require('electron');
    let parasite = 'parasite'+Date.now();
    class AtomNotification extends Notification{
      constructor(title,args){

        ipcRenderer.sendToHost(JSON.stringify({title,...args}));
        const not =  super(title,args);
        not.addEventListener('show',e=>{
          e.preventDefault();
          not.close();
        });
      }
    }
    let weaseled = false;
    const jsonpHandler = {
      set(obj,prop,value){
        if (prop == 13 && !weaseled){
          weaseled = true;
          obj.push([[parasite],{[parasite]: (x, y, z) =>weaselStore(z) },[[parasite]]])
        }
        return Reflect.set(...arguments);

      }
    }
    window.webpackJsonp  =[];
    window.webpackJsonp = new Proxy(window.webpackJsonp,jsonpHandler);
    window.Notification =  AtomNotification;
    ipcRenderer.on('reply',(ev,data)=>{
      const chat = window.Store.Chat._models.find(i=>i["__x_name"]===data.chat.title)
      window.Store.sendTextMsgToChat(chat,data.reply);
    });
    ipcRenderer.on('response',(ev,data)=>{
      document.querySelector(`[title="${data.chat.title}"]`).dispatchEvent(new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window}));
    });
})();
