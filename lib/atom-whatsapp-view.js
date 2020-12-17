'use babel';
const fs = require('fs');
const {makeOpaque,stupidRGB} = require('./utils.js');
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
      var atom_bg_rgb = stupidRGB(atom_bg);      
      var atom_bg_error = makeOpaque(style.getPropertyValue('--atom-background-color-error'), atom_bg);
      var atom_bg_highlight = makeOpaque(style.getPropertyValue('--atom-background-color-highlight'), atom_bg);
      var atom_bg_highlight_rgb = stupidRGB(atom_bg_highlight);
      var atom_bg_info = makeOpaque(style.getPropertyValue('--atom-background-color-info'), atom_bg);
      var atom_bg_selected = makeOpaque(style.getPropertyValue('--atom-background-color-selected'), atom_bg);
      var atom_bg_selected_rgb = stupidRGB(atom_bg_selected);
      var atom_bg_success = makeOpaque(style.getPropertyValue('--atom-background-color-success'), atom_bg);
      var atom_bg_warning = makeOpaque(style.getPropertyValue('--atom-background-color-warning'), atom_bg);
      var atom_fg = makeOpaque(style.getPropertyValue('--atom-text-color'), atom_bg);
      var atom_fg_error = makeOpaque(style.getPropertyValue('--atom-text-color-error'), atom_fg);
      var atom_fg_highlight = makeOpaque(style.getPropertyValue('--atom-text-color-highlight'), atom_fg);
      var atom_fg_highlight_rgb = stupidRGB(atom_fg_highlight);
      var atom_fg_info = makeOpaque(style.getPropertyValue('--atom-text-color-info'), atom_fg);
      var atom_fg_selected = makeOpaque(style.getPropertyValue('--atom-text-color-selected'), atom_fg);
      var atom_fg_subtle = makeOpaque(style.getPropertyValue('--atom-text-color-subtle'), atom_fg);
      var atom_fg_success = makeOpaque(style.getPropertyValue('--atom-text-color-success'), atom_fg);
      this.element.openDevTools();

      if(atom.config.get('atom-whatsapp.useAtomThemes'))this.element.insertCSS(`body{
        ${atom.config.get('atom-whatsapp.useAtomFont')?`font-family: ${atom.config.get('editor').fontFamily} !important;`:""}
        --active-tab-marker:${atom_fg_highlight} !important;
        --app-background:${atom_bg} !important;
        --audio-progress-incoming:${atom_fg_success} !important;
        --audio-progress-outgoing:${atom_fg_success} !important;
        --audio-progress-played-incoming:${atom_fg_info}!important;
        --audio-progress-played-outgoing:${atom_fg_info}!important;
        --audio-track-incoming:${atom_fg_subtle} !important;
        --audio-track-outgoing:${atom_fg_subtle} !important;
        --avatar-background:${atom_bg} !important;
        --avatar-placeholder-background:${atom_fg_subtle} !important;
        --avatar-placeholder-primary:${atom_bg} !important;
        --background-default:${atom_bg} !important;
        --background-default-active:${atom_bg_highlight} !important;
        --background-default-hover:${atom_bg_highlight} !important;
        --border-default:${atom_bg} !important;
        --border-list:${atom_bg} !important;
        --border-panel:${atom_bg} !important;
        --border-strong:${atom_bg} !important;
        --border-stronger:${atom_bg} !important;
        --bubble-meta:${atom_fg_selected} !important;
        --bubble-meta-icon:${atom_fg_selected} !important;
        --butterbar-battery-background:${atom_bg_error} !important;
        --butterbar-battery-icon:${atom_fg} !important;
        --butterbar-battery-primary:${atom_fg_highlight} !important;
        --butterbar-battery-secondary:${atom_fg_highlight} !important;
        --butterbar-connection-background:${atom_bg_warning} !important;
        --butterbar-connection-primary:${atom_fg_highlight} !important;
        --butterbar-connection-secondary:${atom_fg_highlight} !important;
        --butterbar-default-background:${atom_bg_info} !important;
        --butterbar-update-background:${atom_bg_success} !important;:
        --butterbar-update-icon:${atom_fg} !important;
        --button-alternative:${atom_fg} !important;
        --button-alternative-background:${atom_bg} !important;
        --button-primary:${atom_fg} !important;
        --button-primary-background:${atom_bg_selected} !important;
        --button-primary-hover:${atom_bg_highlight} !important;
        --button-round-background:${atom_fg} !important;
        --button-secondary:${atom_bg_selected} !important;
        --button-secondary-background:${atom_fg} !important;
        --button-secondary-background-hover:${atom_fg_selected} !important;
        --button-secondary-hover:${atom_bg_selected} !important;
        --chatlist-icon:${atom_fg} !important;
        --checkbox-background:${atom_bg_selected} !important;
        --checkbox-mark:${atom_fg} !important;
        --chevron-button-background:${atom_bg_selected} !important;
        --compose-input-background:${atom_bg} !important;
        --compose-input-background-hover:${atom_bg} !important;
        --compose-input-border:${atom_bg} !important;
        --compose-primary:${atom_fg} !important;
        --conversation-panel-background:${atom_bg} !important;
        --conversation-panel-border:${atom_bg} !important;
        --drawer-background:${atom_bg} !important;
        --drawer-gallery-background:${atom_bg} !important;
        --drawer-header-title:${atom_fg} !important;
        --drawer-section-background:${atom_bg} !important;
        --dropdown-background:${atom_bg_selected} !important;
        --dropdown-background-hover:${atom_bg_highlight} !important;
        --focus-animation:${atom_bg_selected} !important;
        --highlight:${atom_fg_highlight} !important;
        --icon:${atom_fg} !important;
        --icon-fixed:${atom_fg} !important;
        --icon-lighter:${atom_fg_highlight} !important;
        --icon-search-back:${atom_fg_highlight} !important;
        --icon-strong:${atom_fg_highlight} !important;
        --icon-strong-rgb:${atom_fg_highlight_rgb} !important;
        --incoming-background:${atom_bg_highlight} !important;
        --incoming-background-rgb:${atom_bg_highlight_rgb} !important;
        --incoming-background-deeper:${atom_bg} !important;
        --input-border-active:${atom_fg} !important;
        --input-placeholder:${atom_fg} !important;
        --intro-background:${atom_bg} !important;
        --intro-border:${atom_fg_selected} !important;
        --intro-logo:${atom_fg} !important;
        --intro-secondary:${atom_fg} !important;
        --inverse:${atom_bg} !important;
        --link:${atom_fg_info} !important;
        --live-location-footer-background:${atom_bg} !important;
        --live-location-glow:${atom_fg_success} !important;
        --live-location-glow-stale:${atom_fg_error} !important;
        --location-cluster-background:${atom_bg} !important;
        --media-viewer-background:${atom_bg} !important;
        --media-viewer-background-rgb:${atom_bg_rgb} !important;
        --menu-tabs-list-active:${atom_bg_selected} !important;
        --message-primary:${atom_fg_selected} !important;
        --modal-background:${atom_bg} !important;
        --outgoing-background:${atom_bg_selected} !important;
        --outgoing-background-rgb:${atom_bg_selected_rgb} !important;
        --outgoing-background-deeper:${atom_bg_highlight} !important;
        --panel-background-colored:${atom_bg} !important;
        --panel-background-deeper:${atom_bg_selected} !important;
        --panel-background-lighter:${atom_bg} !important;
        --panel-header-background:${atom_bg_highlight} !important;
        --panel-header-icon:${atom_fg_highlight} !important;
        --panel-input-background:${atom_bg_highlight} !important;
        --panel-primary:${atom_fg_highlight} !important;
        --photopicker-overlay-background:${atom_bg} !important;
        --primary:${atom_fg} !important;
        --primary-strong:${atom_fg_selected} !important;
        --ppt-blue:${atom_fg_info} !important;
        --ppt-button-cancel:${atom_fg_error} !important;
        --ppt-button-send:${atom_fg_success} !important;
        --ppt-button-grey:${atom_fg} !important;
        --ppt-green:${atom_fg_success} !important;
        --ppt-message-blue:${atom_fg_info} !important;
        --quick-action-button:${atom_fg} !important;
        --quick-action-button-background:${atom_bg_highlight} !important;
        --rich-text-panel-background:${atom_bg_highlight} !important;
        --search-container-background:${atom_bg} !important;
        --search-input-background:${atom_bg_highlight} !important;
        --secondary:${atom_fg} !important;
        --secondary-lighter:${atom_fg_selected} !important;
        --secondary-stronger:${atom_fg_selected} !important;
        --shadow-light:${atom_bg_highlight} !important;
        --status-background:${atom_bg} !important;
        --status-background-hover:${atom_bg_highlight} !important;
        --status-primary:${atom_fg_highlight} !important;
        --status-secondary:${atom_fg} !important;
        --status-secondary-stronger:${atom_fg} !important;
        --success:${atom_fg_success} !important;
        --system-message-background:${atom_bg_highlight} !important;
        --system-message-color:${atom_bg_info} !important;
        --system-message-text:${atom_fg} !important;
        --teal-pale:${atom_bg_selected} !important;
        --thumb-border-viewer-active:${atom_fg_selected} !important;
        --typing:${atom_fg_success} !important;
        --unread-background:${atom_bg} !important;
        --unread-bar-background:${atom_bg_highlight} !important;
        --unread-marker-background:${atom_bg_selected} !important;
        --unread-marker-text:${atom_fg_highlight} !important;
        --video-player-background:${atom_bg} !important;
        --video-player-primary:${atom_fg} !important;
        --wallpaper-background:${atom_bg} !important;
        --wallpaper-thumb-border-active:${atom_fg_selected} !important;
        --wallpaper-thumb-border-hover:${atom_fg_highlight} !important;
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
