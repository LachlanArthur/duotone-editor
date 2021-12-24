import { AlpineApp } from "./alpineApp";

export default class CopyButton extends AlpineApp<CopyButton> {

  showMessage = false;

  onCopy() {
    this.showMessage = true;
    setTimeout( () => {
      this.showMessage = false;
    }, 1000 );
  }

}
