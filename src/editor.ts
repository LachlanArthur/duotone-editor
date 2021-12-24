import { AlpineApp } from "./alpineApp";
import { hex2rgba } from "./colors";

export default class Editor extends AlpineApp<Editor> {

  color1 = '#480091';
  color2 = '#ffecc4';

  tableValuesR = '';
  tableValuesG = '';
  tableValuesB = '';

  init() {
    this.$watch( 'color1', this.updateTableValues.bind( this ) );
    this.$watch( 'color2', this.updateTableValues.bind( this ) );
    this.updateTableValues();
  }

  updateTableValues() {

    let tableValuesR: string[] = [];
    let tableValuesG: string[] = [];
    let tableValuesB: string[] = [];

    const colors = [
      this.color1,
      this.color2,
    ]
      .map( hex => hex2rgba( hex )
        .map( decimal => ( decimal / 255 ).toFixed( 3 ) ) );

    colors.forEach( ( [ r, g, b ] ) => {
      tableValuesR.push( r );
      tableValuesG.push( g );
      tableValuesB.push( b );
    } );

    this.tableValuesR = tableValuesR.join( ' ' );
    this.tableValuesG = tableValuesG.join( ' ' );
    this.tableValuesB = tableValuesB.join( ' ' );

  }

  filePicker = {

    file: undefined as File | undefined,
    url: './sample.jpg',

    [ '@change' ]( this: Editor, event: Event ) {
      if ( event.target && event.target instanceof HTMLInputElement && event.target.files ) {
        this.filePicker.file = event.target.files[ 0 ];
      }

      if ( this.filePicker.file ) {
        this.filePicker.url = URL.createObjectURL( this.filePicker.file );
      }
    },

  }

  async saveImage() {

    const canvas = document.createElement( 'canvas' );
    const ctx = canvas.getContext( '2d' )!;

    const image = new Image();
    image.src = this.filePicker.url;

    await new Promise( resolve => image.addEventListener( 'load', resolve ) );

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.filter = 'url(#duotone)';

    ctx.drawImage( image, 0, 0 );

    const blob = await new Promise<Blob | null>( resolve => canvas.toBlob( blob => resolve( blob ) ) );

    if ( !blob ) {
      alert( 'Failed to export image' );
      return;
    }

    const url = URL.createObjectURL( blob );

    window.open( url, '_blank' );

  }

}
