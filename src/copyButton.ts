import { AlpineApp } from "./alpineApp";

export default class CopyButton extends AlpineApp<CopyButton> {

  showMessage = false;

  bindings = {

    [ '@clipboard-copy' ]( this: CopyButton ) {
      this.showMessage = true;
      setTimeout( () => {
        this.showMessage = false;
      }, 1000 );
    },

    [ ':class' ]( this: CopyButton ) {
      return {
        'success': this.showMessage,
      };
    },

    [ 'x-text' ]( this: CopyButton ) {
      return this.showMessage ? 'Copied ✅' : 'Copy code';
    },

  }

}
