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
      this.element.openDevTools();
      this.element.insertCSS(`body{
        --conversation-panel-background:${style.getPropertyValue('--atom-app-background-color')} !important;
        --search-container-background:${style.getPropertyValue('--atom-app-background-color')} !important;
        --background-default:${style.getPropertyValue('--atom-app-background-color')} !important;
        --border-list:${style.getPropertyValue('--atom-app-background-color')} !important;
        --rich-text-panel-background:${style.getPropertyValue('--atom-app-background-color')} !important;
        --intro-background:${style.getPropertyValue('--atom-app-background-color')} !important;
        --panel-background-lighter:${style.getPropertyValue('--atom-app-background-color')} !important;
        --media-viewer-background:${style.getPropertyValue('--atom-app-background-color')} !important;
        --video-player-background:${style.getPropertyValue('--atom-app-background-color')} !important;
        --unread-background:${style.getPropertyValue('--atom-app-background-color')} !important;
	--border-panel:${style.getPropertyValue('--atom-app-background-color')} !important;
	--border-stronger:${style.getPropertyValue('--atom-app-background-color')} !important;
	--drawer-backgroun:${style.getPropertyValue('--atom-app-background-color')} !important;
	--drawer-section-background:${style.getPropertyValue('--atom-app-background-color')} !important;
	--drawer-gallery-background:${style.getPropertyValue('--atom-app-background-color')} !important;
	--conversation-panel-border:${style.getPropertyValue('--atom-app-background-color')} !important;

        --background-default-active:${style.getPropertyValue('--atom-background-color-selected')} !important;
        --background-default-hover:${style.getPropertyValue('--atom-background-color-selected')} !important;
        --outgoing-background:${style.getPropertyValue('--atom-background-color-selected')} !important;
        --dropdown-background:${style.getPropertyValue('--atom-background-color-selected')} !important;
        --unread-marker-background:${style.getPropertyValue('--atom-background-color-selected')} !important;
	--focus-animation:${style.getPropertyValue('--atom-background-color-selected')} !important;

        --compose-input-background:${style.getPropertyValue('--atom-background-color-highlight')} !important;
        --compose-input-border:${style.getPropertyValue('--atom-background-color-highlight')} !important;
        --search-input-background:${style.getPropertyValue('--atom-background-color-highlight')} !important;
        --incoming-background:${style.getPropertyValue('--atom-background-color-highlight')} !important;
        --system-message-background:${style.getPropertyValue('--atom-background-color-highlight')}!important;
        --panel-header-background:${style.getPropertyValue('--atom-background-color-highlight')} !important;
        --quick-action-button-background:${style.getPropertyValue('--atom-background-color-highlight')} !important;
        --incoming-background-deeper:${style.getPropertyValue('--atom-background-color-highlight')} !important;
        --outgoing-background-deeper:${style.getPropertyValue('--atom-background-color-highlight')} !important;
        --dropdown-background-hover:${style.getPropertyValue('--atom-background-color-highlight')} !important;
        --unread-bar-background:${style.getPropertyValue('--atom-background-color-highlight')} !important;
	--panel-background-colored:${style.getPropertyValue('--atom-background-color-highlight')} !important;
	--active-tab-marker:${style.getPropertyValue('--atom-background-color-highlight')} !important;

	--butterbar-battery-background:${style.getPropertyValue('--atom-background-color-error')} !important;

	--butterbar-connection-background:${style.getPropertyValue('--atom-background-color-warning')} !important;

	--butterbar-update-background${style.getPropertyValue('--atom-background-color-success')} !important;:

        --secondary:${style.getPropertyValue('--atom-text-color')} !important;
        --input-placeholder:${style.getPropertyValue('--atom-text-color')} !important;
        --icon:${style.getPropertyValue('--atom-text-color')} !important;
        --quick-action-button:${style.getPropertyValue('--atom-text-color')} !important;
	--bubble-meta:${style.getPropertyValue('--atom-text-color')} !important;
	--bubble-meta-icon:${style.getPropertyValue('--atom-text-color')} !important;
	--butterbar-battery-icon:${style.getPropertyValue('--atom-text-color')} !important;
	--icon-fixed:${style.getPropertyValue('--atom-text-color')} !important;

        --primary:${style.getPropertyValue('--atom-text-color-highlight')} !important;
        --message-primary:${style.getPropertyValue('--atom-text-color-highlight')}!important;
        --compose-primary:${style.getPropertyValue('--atom-text-color-highlight')} !important;
        --primary-strong:${style.getPropertyValue('--atom-text-color-highlight')} !important;
        --secondary-stronger:${style.getPropertyValue('--atom-text-color-highlight')} !important;
        --inverse:${style.getPropertyValue('--atom-text-color-highlight')} !important;
        --intro-logo:${style.getPropertyValue('--atom-text-color-highlight')} !important;
        --intro-secondary:${style.getPropertyValue('--atom-text-color-highlight')} !important;
        --unread-marker-text:${style.getPropertyValue('--atom-text-color-highlight')} !important;
	--butterbar-battery-primary:${style.getPropertyValue('--atom-text-color-highlight')} !important;
	--butterbar-battery-secondary:${style.getPropertyValue('--atom-text-color-highlight')} !important;
	--butterbar-connection-primary:${style.getPropertyValue('--atom-text-color-highlight')} !important;
	--butterbar-connection-secondary:${style.getPropertyValue('--atom-text-color-highlight')} !important;
	--chatlist-icon:${style.getPropertyValue('--atom-text-color-highlight')} !important;
	--drawer-header-title:${style.getPropertyValue('--atom-text-color-highlight')} !important;
	--icon-lighter:${style.getPropertyValue('--atom-text-color-highlight')} !important;
	--icon-search-back:${style.getPropertyValue('--atom-text-color-highlight')} !important;

        --link:${style.getPropertyValue('--atom-text-color-info')} !important;
        --system-message-color:${style.getPropertyValue('--atom-text-color-info')}!important;
        --audio-progress-played-incoming:${style.getPropertyValue('--atom-text-color-info')}!important;
        --audio-progress-played-outgoing:${style.getPropertyValue('--atom-text-color-info')}!important;

        --typing:${style.getPropertyValue('--atom-text-color-success')} !important;
        --audio-progress-incoming:${style.getPropertyValue('--atom-text-color-success')} !important;
        --audio-progress-outgoing:${style.getPropertyValue('--atom-text-color-success')} !important;

        --audio-track-incoming:${style.getPropertyValue('--atom-text-color-subtle')} !important;
        --audio-track-outgoing:${style.getPropertyValue('--atom-text-color-subtle')} !important;
      }`)
    });
    this.element.useragent="Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.146 Safari/537.36";
    this.element.src="https://web.whatsapp.com";
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

}
