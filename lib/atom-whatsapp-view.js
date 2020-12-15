'use babel';
const fs = require('fs');
const {makeOpaque} = require('./utils.js');
export default class AtomWhatsappView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('webview');
    this.element.classList.add('atom-whatsapp');
    // this.element.style.width='720px';
    this.pain = document.createElement('div');
    this.pain.innerHTML=`<h1>CIAO STO SOFFRENDO</h1>
    <input class="input-text" type='text'/>
    <div class="block">
      <button class="btn btn-warning inline-block-tight">Close</button>
      <button class="btn btn-primary inline-block-tight">Send</button>
    </div>
    `
    // this.modalPanel = atom.workspace.addModalPanel({
    //  item: this.pain,
    //  visible: true
    // });
    // Create message element
    this.element.addEventListener('dom-ready',(e)=>{
      // this.element.insertCSS(fs.readFileSync(__dirname+'/../styles/atom-whatsapp.less','utf-8'))
      // console.log(getComputedStyle(document.querySelector('.atom-whatsapp')).getPropertyValue('--app-background-color'));
      const style = getComputedStyle(document.querySelector('.atom-whatsapp'));
      var atom_bg = style.getPropertyValue('--atom-app-background-color');
      console.log(atom_bg);
      var atom_bg_highlight = makeOpaque(style.getPropertyValue('--atom-background-color-highlight'), atom_bg);
      var atom_bg_selected = makeOpaque(style.getPropertyValue('--atom-background-color-selected'), atom_bg);
      var atom_fg = makeOpaque(style.getPropertyValue('--atom-text-color'), atom_bg);
      var atom_fg_highlight = makeOpaque(style.getPropertyValue('--atom-text-color-highlight'), atom_fg);
      var atom_fg_subtle = makeOpaque(style.getPropertyValue('--atom-text-color-subtle'), atom_fg);
      this.element.openDevTools();

      if(atom.config.get('atom-whatsapp.useAtomThemes'))this.element.insertCSS(`body{
        ${atom.config.get('atom-whatsapp.useAtomFont')?`font-family: ${atom.config.get('editor').fontFamily} !important;`:""}
        --conversation-panel-background:${atom_bg} !important;
        --search-container-background:${atom_bg} !important;
        --background-default:${atom_bg} !important;
        --border-list:${atom_bg} !important;
        --rich-text-panel-background:${atom_bg} !important;
        --intro-background:${atom_bg} !important;
        --panel-background-lighter:${atom_bg} !important;
        --media-viewer-background:${atom_bg} !important;
        --video-player-background:${atom_bg} !important;
        --unread-background:${atom_bg} !important;
	      --border-panel:${atom_bg} !important;
	      --border-stronger:${atom_bg} !important;
	      --drawer-background:${atom_bg} !important;
	      --drawer-section-background:${atom_bg} !important;
	      --drawer-gallery-background:${atom_bg} !important;
	      --conversation-panel-border:${atom_bg} !important;
	      --app-background:${atom_bg} !important;
        --checkbox-mark:${atom_bg} !important;
        --button-alternative-background:${atom_bg} !important;
        --status-background:${atom_bg} !important;
        --border-default:${atom_bg} !important;

        --background-default-active:${atom_bg_selected} !important;
        --background-default-hover:${atom_bg_selected} !important;
        --outgoing-background:${atom_bg_selected} !important;
        --dropdown-background:${atom_bg_selected} !important;
        --unread-marker-background:${atom_bg_selected} !important;
	      --focus-animation:${atom_bg_selected} !important;
	      --avatar-placeholder-background:${atom_bg_selected} !important;
	      --teal-pale:${atom_bg_selected} !important;
	      --button-primary:${atom_bg_selected} !important;
	      --button-secondary-background:${atom_bg_selected} !important;
	      --button-secondary-background:${atom_bg_selected} !important;
	      --button-secondary-hover:${atom_bg_selected} !important;
	      --panel-background-deeper:${atom_bg_selected} !important;

        --compose-input-background:${atom_bg_highlight} !important;
        --compose-input-border:${atom_bg_highlight} !important;
        --search-input-background:${atom_bg_highlight} !important;
        --incoming-background:${atom_bg_highlight} !important;
        --system-message-background:${atom_bg_highlight}!important;
        --panel-header-background:${atom_bg_highlight} !important;
        --quick-action-button-background:${atom_bg_highlight} !important;
        --incoming-background-deeper:${atom_bg_highlight} !important;
        --outgoing-background-deeper:${atom_bg_highlight} !important;
        --dropdown-background-hover:${atom_bg_highlight} !important;
        --unread-bar-background:${atom_bg_highlight} !important;
	      --panel-background-colored:${atom_bg_highlight} !important;
	      --chevron-button-background:${atom_bg_highlight} !important;
	      --button-primary-hover:${atom_bg_highlight} !important;
	      --shadow-light:${atom_bg_highlight} !important;


        --butterbar-battery-background:${style.getPropertyValue('--atom-background-color-error')} !important;

        --butterbar-connection-background:${style.getPropertyValue('--atom-background-color-warning')} !important;

        --butterbar-update-background${style.getPropertyValue('--atom-background-color-success')} !important;:
        --secondary:${atom_fg} !important;
        --input-placeholder:${atom_fg} !important;
        --icon:${atom_fg} !important;
        --quick-action-button:${atom_fg} !important;
	      --bubble-meta:${atom_fg} !important;
	      --bubble-meta-icon:${atom_fg} !important;
	      --butterbar-battery-icon:${atom_fg} !important;
	      --icon-fixed:${atom_fg} !important;
	      --avatar-placeholder-primary:${atom_fg} !important;
	      --button-round-background:${atom_fg} !important;
	      --input-border-active:${atom_fg} !important;
	      --button-alternative:${atom_fg} !important;
	      --status-secondary:${atom_fg} !important;
	      --status-secondary-stronger:${atom_fg} !important;
	      --system-message-text:${atom_fg} !important;

        --primary:${atom_fg_highlight} !important;
        --message-primary:${atom_fg_highlight}!important;
        --compose-primary:${atom_fg_highlight} !important;
        --primary-strong:${atom_fg_highlight} !important;
        --secondary-stronger:${atom_fg_highlight} !important;
        --inverse:${atom_fg_highlight} !important;
        --intro-logo:${atom_fg_highlight} !important;
        --intro-secondary:${atom_fg_highlight} !important;
        --unread-marker-text:${atom_fg_highlight} !important;
        --butterbar-battery-primary:${atom_fg_highlight} !important;
        --butterbar-battery-secondary:${atom_fg_highlight} !important;
        --butterbar-connection-primary:${atom_fg_highlight} !important;
        --butterbar-connection-secondary:${atom_fg_highlight} !important;
	      --chatlist-icon:${atom_fg_highlight} !important;
	      --drawer-header-title:${atom_fg_highlight} !important;
	      --icon-lighter:${atom_fg_highlight} !important;
	      --icon-search-back:${atom_fg_highlight} !important;
	      --active-tab-marker:${atom_fg_highlight} !important;
	      --intro-border:${atom_fg_highlight} !important;
	      --checkbox-background:${atom_fg_highlight} !important;
	      --status-primary:${atom_fg_highlight} !important;
	      --button-primary-background:${atom_fg_highlight} !important;
	      --button-secondary:${atom_fg_highlight} !important;
	      --button-secondary-background-hover:${atom_fg_highlight} !important;
	      --highlight:${atom_fg_highlight} !important;

        --link:${style.getPropertyValue('--atom-text-color-info')} !important;
        --system-message-color:${style.getPropertyValue('--atom-text-color-info')}!important;
        --audio-progress-played-incoming:${style.getPropertyValue('--atom-text-color-info')}!important;
        --audio-progress-played-outgoing:${style.getPropertyValue('--atom-text-color-info')}!important;

        --typing:${style.getPropertyValue('--atom-text-color-success')} !important;
        --audio-progress-incoming:${style.getPropertyValue('--atom-text-color-success')} !important;
        --audio-progress-outgoing:${style.getPropertyValue('--atom-text-color-success')} !important;

        --audio-track-incoming:${atom_fg_subtle} !important;
        --audio-track-outgoing:${atom_fg_subtle} !important;
      }`)
    });
    this.element.useragent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"

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
