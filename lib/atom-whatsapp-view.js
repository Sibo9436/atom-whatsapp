'use babel';
// const fs = require('fs');
const { shell } = require('electron');
const {handleColor, hexToRGB, arrToString} = require('./utils.js');

export default class AtomWhatsappView {
	//Someday this will, maybe, be used https://web.whatsapp.com/send?text=cia&app_absent=0

	constructor(seriFontFamily, seriColors) {
		// Create root element
		this.element = document.createElement('webview');
		this.element.classList.add('atom-whatsapp');
		this.element.useragent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36";

		// Se non era serializzato, cancellare la cache
		if (seriFontFamily === undefined && seriColors === undefined) {
			// Per ora basta, vediamo poi se sarà necessario anche rimuovere la cache
			this.element.addEventListener("did-finish-load", (event) => {
				this.element.reloadIgnoringCache();
			}, { once: true });
		}

		this.element.addEventListener('new-window', async (e) => {
			await shell.openExternal(e.url)
		});

		// Create message element
		this.element.preload=`${__dirname}/preload.js`;

		this.element.addEventListener('ipc-message',(message)=>{
			const notificationData = JSON.parse(message.channel);
			const sendCallback  = (data)=>{
				this.element.send('response',data)
				atom.workspace.open("whatsatom://blank");
			}
			const replyCallback = (data)=>{
				this.element.send('reply',data);
			}
			//TODO: Ricordarsi che, per quanto amabili siano le template string, questo oggetto è spiacevolmente
			//      prono a essere iniettato
			const notificationHTML = `<div>${notificationData.title}</div>
				<div class="block">
				<div class="block">
				<img class="inline-block-tight" src="${notificationData.icon}" style="border-radius:50%;width:50px;" >
				<div class="inline-block-tight text-smaller">${notificationData.body}</div>
				</div>
				${atom.config.get('atom-whatsapp.notificationBehaviour')==='reply'?`<input id="whatsapp-message" class="message input-text" type='text' placeholder='Answer me'/>`:'<div>'}
				</div>`;
			const notifica = atom.notifications.addInfo(notificationHTML, {
				buttons:[
					{
						className:"btn btn-info",
						text:atom.config.get('atom-whatsapp.notificationBehaviour')==="show"?"Show":"Reply",
						onDidClick:()=>{
							if (document.getElementById('whatsapp-message')) {
								replyCallback({chat:notificationData,reply:document.getElementById('whatsapp-message').value});
							}else{
								sendCallback({chat:notificationData});
							}
							notifica.dismiss();
						}
					}
				],
				dismissable:true,
			});
		});

		// Function used to create the CSS stylesheet, passed later with insertCSS
		this.setColors = () => {
			const style = getComputedStyle(document.getElementsByClassName("atom-whatsapp")[0]);

			let atom_bg = arrToString(hexToRGB((style.getPropertyValue('--atom-app-background-color'))));
			let atom_bg_error = handleColor(style.getPropertyValue('--atom-background-color-error'), atom_bg);
			let atom_bg_highlight = handleColor(style.getPropertyValue('--atom-background-color-highlight'), atom_bg);
			let atom_bg_info = handleColor(style.getPropertyValue('--atom-background-color-info'), atom_bg);
			let atom_bg_selected = handleColor(style.getPropertyValue('--atom-background-color-selected'), atom_bg);
			let atom_bg_success = handleColor(style.getPropertyValue('--atom-background-color-success'), atom_bg);
			let atom_bg_warning = handleColor(style.getPropertyValue('--atom-background-color-warning'), atom_bg);
			let atom_fg = handleColor(style.getPropertyValue('--atom-text-color'), atom_bg);
			let atom_fg_error = handleColor(style.getPropertyValue('--atom-text-color-error'), atom_bg_error);
			let atom_fg_highlight = handleColor(style.getPropertyValue('--atom-text-color-highlight'), atom_bg_highlight);
			let atom_fg_info = handleColor(style.getPropertyValue('--atom-text-color-info'), atom_bg_info);
			let atom_fg_selected = handleColor(style.getPropertyValue('--atom-text-color-selected'), atom_bg_selected);
			let atom_fg_subtle = handleColor(style.getPropertyValue('--atom-text-color-subtle'), atom_bg);
			let atom_fg_success = handleColor(style.getPropertyValue('--atom-text-color-success'), atom_bg_success);

			return `body{
				--active-tab-marker:rgb(${atom_fg_highlight}) !important;
				--active-tab-marker-rgb:${atom_fg_highlight} !important;
				--app-background:rgb(${atom_bg}) !important;
				--app-background-rgb:${atom_bg} !important;
				--audio-progress-incoming:rgb(${atom_fg_success}) !important;
				--audio-progress-incoming-rgb:${atom_fg_success} !important;
				--audio-progress-outgoing:rgb(${atom_fg_success}) !important;
				--audio-progress-outgoing-rgb:${atom_fg_success} !important;
				--audio-progress-played-incoming:rgb(${atom_fg_info})!important;
				--audio-progress-played-incoming-rgb:${atom_fg_info}!important;
				--audio-progress-played-outgoing:rgb(${atom_fg_info})!important;
				--audio-progress-played-outgoing-rgb:${atom_fg_info}!important;
				--audio-track-incoming:rgb(${atom_fg_subtle}) !important;
				--audio-track-incoming-rgb:${atom_fg_subtle} !important;
				--audio-track-outgoing:rgb(${atom_fg_subtle}) !important;
				--audio-track-outgoing-rgb:${atom_fg_subtle} !important;
				--avatar-background:rgb(${atom_bg}) !important;
				--avatar-background-rgb:${atom_bg} !important;
				--avatar-placeholder-background:rgb(${atom_fg_subtle}) !important;
				--avatar-placeholder-background-rgb:${atom_fg_subtle} !important;
				--avatar-placeholder-primary:rgb(${atom_bg}) !important;
				--avatar-placeholder-primary-rgb:${atom_bg} !important;
				--background-default:rgb(${atom_bg}) !important;
				--background-default-rgb:${atom_bg} !important;
				--background-default-active:rgb(${atom_bg_highlight}) !important;
				--background-default-active-rgb:${atom_bg_highlight} !important;
				--background-default-hover:rgb(${atom_bg_highlight}) !important;
				--background-default-hover-rgb:${atom_bg_highlight} !important;
				--border-default:rgb(${atom_bg}) !important;
				--border-default-rgb:${atom_bg} !important;
				--border-list:rgb(${atom_bg}) !important;
				--border-list-rgb:${atom_bg} !important;
				--border-panel:rgb(${atom_bg}) !important;
				--border-panel-rgb:${atom_bg} !important;
				--border-strong:rgb(${atom_bg}) !important;
				--border-strong-rgb:${atom_bg} !important;
				--border-stronger:rgb(${atom_bg_highlight}) !important;
				--border-stronger-rgb:${atom_bg_highlight} !important;
				--bubble-meta:rgb(${atom_fg_selected}) !important;
				--bubble-meta-rgb:${atom_fg_selected} !important;
				--bubble-meta-icon:rgb(${atom_fg_selected}) !important;
				--bubble-meta-icon-rgb:${atom_fg_selected} !important;
				--butterbar-battery-background:rgb(${atom_bg_error}) !important;
				--butterbar-battery-background-rgb:${atom_bg_error} !important;
				--butterbar-battery-icon:rgb(${atom_fg}) !important;
				--butterbar-battery-icon-rgb:${atom_fg} !important;
				--butterbar-battery-primary:rgb(${atom_fg_highlight}) !important;
				--butterbar-battery-primary-rgb:${atom_fg_highlight} !important;
				--butterbar-battery-secondary:rgb(${atom_fg_highlight}) !important;
				--butterbar-battery-secondary-rgb:${atom_fg_highlight} !important;
				--butterbar-connection-background:rgb(${atom_bg_warning}) !important;
				--butterbar-connection-background-rgb:${atom_bg_warning} !important;
				--butterbar-connection-primary:rgb(${atom_fg_highlight}) !important;
				--butterbar-connection-primary-rgb:${atom_fg_highlight} !important;
				--butterbar-connection-secondary:rgb(${atom_fg_highlight}) !important;
				--butterbar-connection-secondary-rgb:${atom_fg_highlight} !important;
				--butterbar-default-background:rgb(${atom_bg_info}) !important;
				--butterbar-default-background-rgb:${atom_bg_info} !important;
				--butterbar-update-background:rgb(${atom_bg_success}) !important;:
				--butterbar-update-background-rgb:${atom_bg_success} !important;:
				--butterbar-update-icon:rgb(${atom_fg}) !important;
				--butterbar-update-icon-rgb:${atom_fg} !important;
				--button-alternative:rgb(${atom_fg}) !important;
				--button-alternative-rgb:${atom_fg} !important;
				--button-alternative-background:rgb(${atom_bg}) !important;
				--button-alternative-background-rgb:${atom_bg} !important;
				--button-primary:rgb(${atom_fg}) !important;
				--button-primary-rgb:${atom_fg} !important;
				--button-primary-background:rgb(${atom_bg_selected}) !important;
				--button-primary-background-rgb:${atom_bg_selected} !important;
				--button-primary-hover:rgb(${atom_bg_highlight}) !important;
				--button-primary-hover-rgb:${atom_bg_highlight} !important;
				--button-round-background:rgb(${atom_fg}) !important;
				--button-round-background-rgb:${atom_fg} !important;
				--button-secondary:rgb(${atom_bg_selected}) !important;
				--button-secondary-rgb:${atom_bg_selected} !important;
				--button-secondary-background:rgb(${atom_fg}) !important;
				--button-secondary-background-rgb:${atom_fg} !important;
				--button-secondary-background-hover:rgb(${atom_fg_selected}) !important;
				--button-secondary-background-hover-rgb:${atom_fg_selected} !important;
				--button-secondary-hover:rgb(${atom_bg_selected}) !important;
				--button-secondary-hover-rgb:${atom_bg_selected} !important;
				--chatlist-icon:rgb(${atom_fg}) !important;
				--chatlist-icon-rgb:${atom_fg} !important;
				--checkbox-background:rgb(${atom_bg_selected}) !important;
				--checkbox-background-rgb:${atom_bg_selected} !important;
				--checkbox-mark:rgb(${atom_fg}) !important;
				--checkbox-mark-rgb:${atom_fg} !important;
				--chevron-button-background:rgb(${atom_bg_selected}) !important;
				--chevron-button-background-rgb:${atom_bg_selected} !important;
				--compose-input-background:rgb(${atom_bg}) !important;
				--compose-input-background-rgb:${atom_bg} !important;
				--compose-input-background-hover:rgb(${atom_bg}) !important;
				--compose-input-background-hover-rgb:${atom_bg} !important;
				--compose-input-border:rgb(${atom_bg}) !important;
				--compose-input-border-rgb:${atom_bg} !important;
				--compose-primary:rgb(${atom_fg}) !important;
				--compose-primary-rgb:${atom_fg} !important;
				--conversation-panel-background:rgb(${atom_bg}) !important;
				--conversation-panel-background-rgb:${atom_bg} !important;
				--conversation-panel-border:rgb(${atom_bg}) !important;
				--conversation-panel-border-rgb:${atom_bg} !important;
				--danger:rgb(${atom_bg_error}) !important;
				--danger-rgb:${atom_bg_error} !important;
				--drawer-background:rgb(${atom_bg}) !important;
				--drawer-background-rgb:${atom_bg} !important;
				--drawer-background-deep:rgb(${atom_bg}) !important;
				--drawer-background-deep-rgb:${atom_bg} !important;
				--drawer-gallery-background:rgb(${atom_bg}) !important;
				--drawer-gallery-background-rgb:${atom_bg} !important;
				--drawer-header-title:rgb(${atom_fg}) !important;
				--drawer-header-title-rgb:${atom_fg} !important;
				--drawer-section-background:rgb(${atom_bg}) !important;
				--drawer-section-background-rgb:${atom_bg} !important;
				--dropdown-background:rgb(${atom_bg_selected}) !important;
				--dropdown-background-rgb:${atom_bg_selected} !important;
				--dropdown-background-hover:rgb(${atom_bg_highlight}) !important;
				--dropdown-background-hover-rgb:${atom_bg_highlight} !important;
				--focus-animation:rgb(${atom_bg_selected}) !important;
				--focus-animation-rgb:${atom_bg_selected} !important;
				--highlight:rgb(${atom_fg_highlight}) !important;
				--highlight-rgb:${atom_fg_highlight} !important;
				--icon:rgb(${atom_fg}) !important;
				--icon-rgb:${atom_fg} !important;
				--icon-fixed:rgb(${atom_fg}) !important;
				--icon-fixed-rgb:${atom_fg} !important;
				--icon-lighter:rgb(${atom_fg_highlight}) !important;
				--icon-lighter-rgb:${atom_fg_highlight} !important;
				--icon-search-back:rgb(${atom_fg_highlight}) !important;
				--icon-search-back-rgb:${atom_fg_highlight} !important;
				--icon-strong:rgb(${atom_fg_highlight}) !important;
				--icon-strong-rgb:${atom_fg_highlight} !important;
				--incoming-background:rgb(${atom_bg_highlight}) !important;
				--incoming-background-rgb:${atom_bg_highlight} !important;
				--incoming-background-deeper:rgb(${atom_bg}) !important;
				--incoming-background-deeper-rgb:${atom_bg} !important;
				--input-border-active:rgb(${atom_fg}) !important;
				--input-border-active-rgb:${atom_fg} !important;
				--input-placeholder:rgb(${atom_fg}) !important;
				--input-placeholder-rgb:${atom_fg} !important;
				--intro-background:rgb(${atom_bg}) !important;
				--intro-background-rgb:${atom_bg} !important;
				--intro-border:rgb(${atom_fg_selected}) !important;
				--intro-border-rgb:${atom_fg_selected} !important;
				--intro-logo:rgb(${atom_fg}) !important;
				--intro-logo-rgb:${atom_fg} !important;
				--intro-secondary:rgb(${atom_fg}) !important;
				--intro-secondary-rgb:${atom_fg} !important;
				--inverse:rgb(${atom_fg_subtle}) !important;
				--inverse-rgb:${atom_fg_subtle} !important;
				--link:rgb(${atom_fg_info}) !important;
				--link-rgb:${atom_fg_info} !important;
				--live-location-footer-background:rgb(${atom_bg}) !important;
				--live-location-footer-background-rgb:${atom_bg} !important;
				--live-location-glow:rgb(${atom_fg_success}) !important;
				--live-location-glow-rgb:${atom_fg_success} !important;
				--live-location-glow-stale:rgb(${atom_fg_error}) !important;
				--live-location-glow-stale-rgb:${atom_fg_error} !important;
				--location-cluster-background:rgb(${atom_bg}) !important;
				--location-cluster-background-rgb:${atom_bg} !important;
				--media-viewer-background:rgb(${atom_bg}) !important;
				--media-viewer-background-rgb:${atom_bg} !important;
				--menu-tabs-list-active:rgb(${atom_bg_selected}) !important;
				--menu-tabs-list-active-rgb:${atom_bg_selected} !important;
				--message-primary:rgb(${atom_fg_selected}) !important;
				--message-primary-rgb:${atom_fg_selected} !important;
				--modal-background:rgb(${atom_bg}) !important;
				--modal-background-rgb:${atom_bg} !important;
				--outgoing-background:rgb(${atom_bg_selected}) !important;
				--outgoing-background-rgb:${atom_bg_selected} !important;
				--outgoing-background-deeper:rgb(${atom_bg_highlight}) !important;
				--outgoing-background-deeper-rgb:${atom_bg_highlight} !important;
				--panel-background-colored:rgb(${atom_bg}) !important;
				--panel-background-colored-rgb:${atom_bg} !important;
				--panel-background-colored-deeper:rgb(${atom_bg}) !important;
				--panel-background-colored-deeper-rgb:${atom_bg} !important;
				--panel-background-deep:rgb(${atom_bg}) !important;
				--panel-background-deep-rgb:${atom_bg} !important;
				--panel-background-deeper:rgb(${atom_bg_selected}) !important;
				--panel-background-deeper-rgb:${atom_bg_selected} !important;
				--panel-background-lighter:rgb(${atom_bg}) !important;
				--panel-background-lighter-rgb:${atom_bg} !important;
				--panel-header-background:rgb(${atom_bg_highlight}) !important;
				--panel-header-background-rgb:${atom_bg_highlight} !important;
				--panel-header-icon:rgb(${atom_fg_highlight}) !important;
				--panel-header-icon-rgb:${atom_fg_highlight} !important;
				--panel-input-background:rgb(${atom_bg_highlight}) !important;
				--panel-input-background-rgb:${atom_bg_highlight} !important;
				--panel-primary:rgb(${atom_fg_highlight}) !important;
				--panel-primary-rgb:${atom_fg_highlight} !important;
				--photopicker-overlay-background:rgba(${atom_bg},0.8) !important;
				--photopicker-overlay-background-rgb:${atom_bg} !important;
				--primary:rgb(${atom_fg}) !important;
				--primary-rgb:${atom_fg} !important;
				--primary-strong:rgb(${atom_fg_selected}) !important;
				--primary-strong-rgb:${atom_fg_selected} !important;
				--ppt-blue:rgb(${atom_fg_info}) !important;
				--ppt-blue-rgb:${atom_fg_info} !important;
				--ppt-button-cancel:rgb(${atom_fg_error}) !important;
				--ppt-button-cancel-rgb:${atom_fg_error} !important;
				--ppt-button-send:rgb(${atom_fg_success}) !important;
				--ppt-button-send-rgb:${atom_fg_success} !important;
				--ppt-button-grey:rgb(${atom_fg}) !important;
				--ppt-button-grey-rgb:${atom_fg} !important;
				--ppt-green:rgb(${atom_fg_success}) !important;
				--ppt-green-rgb:${atom_fg_success} !important;
				--ppt-message-blue:rgb(${atom_fg_info}) !important;
				--ppt-message-blue-rgb:${atom_fg_info} !important;
				--quick-action-button:rgb(${atom_fg}) !important;
				--quick-action-button-rgb:${atom_fg} !important;
				--quick-action-button-background:rgb(${atom_bg_highlight}) !important;
				--quick-action-button-background-rgb:${atom_bg_highlight} !important;
				--rich-text-panel-background:rgb(${atom_bg_highlight}) !important;
				--rich-text-panel-background-rgb:${atom_bg_highlight} !important;
				--search-container-background:rgb(${atom_bg}) !important;
				--search-container-background-rgb:${atom_bg} !important;
				--search-input-background:rgb(${atom_bg_highlight}) !important;
				--search-input-background-rgb:${atom_bg_highlight} !important;
				--secondary:rgb(${atom_fg}) !important;
				--secondary-rgb:${atom_fg} !important;
				--secondary-lighter:rgb(${atom_fg_selected}) !important;
				--secondary-lighter-rgb:${atom_fg_selected} !important;
				--secondary-stronger:rgb(${atom_fg_selected}) !important;
				--secondary-stronger-rgb:${atom_fg_selected} !important;
				--shadow:rgb(${atom_bg_highlight}) !important;
				--shadow-rgb:${atom_bg_highlight} !important;
				--shadow-light:rgb(${atom_bg_highlight}) !important;
				--shadow-light-rgb:${atom_bg_highlight} !important;
				--startup-background:rgb(${atom_bg}) !important;
				--startup-background-rgb:${atom_bg} !important;
				--status-background:rgb(${atom_bg}) !important;
				--status-background-rgb:${atom_bg} !important;
				--status-background-hover:rgb(${atom_bg_highlight}) !important;
				--status-background-hover-rgb:${atom_bg_highlight} !important;
				--status-primary:rgb(${atom_fg_highlight}) !important;
				--status-primary-rgb:${atom_fg_highlight} !important;
				--status-secondary:rgb(${atom_fg}) !important;
				--status-secondary-rgb:${atom_fg} !important;
				--status-secondary-stronger:rgb(${atom_fg}) !important;
				--status-secondary-stronger-rgb:${atom_fg} !important;
				--success:rgb(${atom_fg_success}) !important;
				--success-rgb:${atom_fg_success} !important;
				--system-message-background:rgb(${atom_bg_highlight}) !important;
				--system-message-background-rgb:${atom_bg_highlight} !important;
				--system-message-color:rgb(${atom_bg_info}) !important;
				--system-message-color-rgb:${atom_bg_info} !important;
				--system-message-text:rgb(${atom_fg}) !important;
				--system-message-text-rgb:${atom_fg} !important;
				--teal:rgb(${atom_fg_success}) !important;
				--teal-rgb:${atom_fg_success} !important;
				--teal-pale:rgb(${atom_bg_selected}) !important;
				--teal-pale-rgb:${atom_bg_selected} !important;
				--thumb-border-viewer-active:rgb(${atom_fg_selected}) !important;
				--thumb-border-viewer-active-rgb:${atom_fg_selected} !important;
				--tooltip-background: #def !important;
				--typing:rgb(${atom_fg_success}) !important;
				--typing-rgb:${atom_fg_success} !important;
				--unread-background:rgb(${atom_bg}) !important;
				--unread-background-rgb:${atom_bg} !important;
				--unread-bar-background:rgb(${atom_bg_highlight}) !important;
				--unread-bar-background-rgb:${atom_bg_highlight} !important;
				--unread-marker-background:rgb(${atom_bg_selected}) !important;
				--unread-marker-background-rgb:${atom_bg_selected} !important;
				--unread-marker-text:rgb(${atom_fg_highlight}) !important;
				--unread-marker-text-rgb:${atom_fg_highlight} !important;
				--video-player-background:rgb(${atom_bg}) !important;
				--video-player-background-rgb:${atom_bg} !important;
				--video-player-primary:rgb(${atom_fg}) !important;
				--video-player-primary-rgb:${atom_fg} !important;
				--wallpaper-background:rgb(${atom_bg}) !important;
				--wallpaper-background-rgb:${atom_bg} !important;
				--wallpaper-thumb-border-active:rgb(${atom_fg_selected}) !important;
				--wallpaper-thumb-border-active-rgb:${atom_fg_selected} !important;
				--wallpaper-thumb-border-hover:rgb(${atom_fg_highlight}) !important;
				--wallpaper-thumb-border-hover-rgb:${atom_fg_highlight} !important;
			}`;
		};

		this.setFont = (seriFontFamily) => {
			if (seriFontFamily) {
				this.element.insertCSS(`body {
					font-family: ${seriFontFamily} !important;
				}`);
				seriFontFamily = undefined;
			} else {
				this.element.insertCSS(`body {
					font-family: ${atom.config.get('editor.fontFamily')} !important;
				}`)
			}
		}

		// Event listener for the ready document
		this.element.addEventListener('dom-ready',(e)=>{
			if (atom.config.get('atom-whatsapp.devToolsOnStart')) {
				this.element.openDevTools();
			}

			if (atom.config.get('atom-whatsapp.useAtomFont')) {
				this.setFont(seriFontFamily);
			}

			atom.config.observe('editor.fontFamily', (newFont) => {
				this.element.insertCSS(`body {
					font-family: ${newFont} !important;
				}`)
			});

			if(atom.config.get('atom-whatsapp.useAtomThemes')) {
				this.element.insertCSS(seriColors ? seriColors : this.setColors());
			}

			atom.themes.onDidChangeActiveThemes(() => {
				if(atom.config.get('atom-whatsapp.useAtomThemes')) {
					this.element.insertCSS(this.setColors());
				}
			});
		});

		this.element.src="https://web.whatsapp.com";
	}

	// Returns an object that can be retrieved when package is activated
	serialize() {
		return {
			deserializer: "AtomWhatsappView",
			colors: this.setColors(),
			fontFamily: atom.config.get('editor').fontFamily
		}
	}

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
