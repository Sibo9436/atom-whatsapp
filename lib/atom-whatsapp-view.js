'use babel';
const fs = require('fs');
export default class AtomWhatsappView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('webview');
    this.element.classList.add('atom-whatsapp');
    // Create message element
    this.element.addEventListener('dom-ready',(e)=>{
      // this.element.insertCSS(fs.readFileSync(__dirname+'/../styles/atom-whatsapp.less','utf-8'))
      // console.log(getComputedStyle(document.querySelector('.atom-whatsapp')).getPropertyValue('--app-background-color'));
      const style = getComputedStyle(document.querySelector('.atom-whatsapp'));
      this.element.insertCSS(`body{
        --conversation-panel-background:${style.getPropertyValue('--atom-app-background-color')} !important;
        --outgoing-background:${style.getPropertyValue('--atom-background-color-selected')} !important;
        --system-message-background:${style.getPropertyValue('--atom-background-color-selected')}!important;
        --system-message-color:${style.getPropertyValue('--atom-text-color')}!important;
        --message-primary:${style.getPropertyValue('--atom-text-color')}!important;
        --incoming-background:${style.getPropertyValue('--atom-background-color-highlight')}!important;
      }`)
    });
    this.element.useragent="Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.146 Safari/537.36"
    this.element.src="https://web.whatsapp.com";
    // this.element.style.width = "670px";
    // this.element.style.heigth = "700px";


  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
  getTitle(){
    return 'Whatsapp'
  }
  getURI(){
    return "whatsatom://blank";
  }
  // getDefaultLocation(){
  //   return 'bottom';
  // }
  // getAllowedLocations(){
  //   return['right','left','bottom'];
  // }

}
