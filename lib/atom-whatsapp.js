'use babel';

import AtomWhatsappView from './atom-whatsapp-view';
import { CompositeDisposable,Disposable} from 'atom';

export default {

  atomWhatsappView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    // this.atomWhatsappView = new AtomWhatsappView(state.atomWhatsappViewState);
    this.atomWhatsappView = new AtomWhatsappView();

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-whatsapp:toggle': () => this.toggle()
    }));

    //Register opener
    this.subscriptions.add(atom.workspace.addOpener(uri=>{
      if(uri =='whatsatom://blank') return new AtomWhatsappView(state.atomWhatsappViewState);
    }));

    //Register a Disposable
    this.subscriptions.add(new Disposable(()=>{
      atom.workspace.getPaneItems().forEach(item=>{
        if (item instanceof AtomWhatsappView) item.destroy();
      })
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {
      atomWhatsappViewState: this.atomWhatsappView.serialize()
    };
  },

  toggle() {
    console.log('AtomWhatsapp was toggled!');
    atom.workspace.toggle('whatsatom://blank');
  },

  deserializeAtomWhatsappView(serialized) {
    return new AtomWhatsappView();
  }

};
