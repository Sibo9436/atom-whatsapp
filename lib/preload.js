/*eslint-disable*/
//Questo codice verrà eseguito nella webview
//This code will be executed in the webview

module.exports = (function () {
    const {ipcRenderer} = require('electron');
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
    window.webpackJsonp  =[];
    window.webpackJsonp = new Proxy(window.webpackJsonp,jsonpHandler);
    window.Notification =  AtomNotification;
    ipcRenderer.on('response',(ev,data)=>{
      document.querySelector(`[title="${data.chat.title}"]`).dispatchEvent(new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window}));
    });

    console.log("preload loaded")
})();
