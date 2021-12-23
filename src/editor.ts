import { hex2rgba } from "./colors";

export default () => ( {

  file: undefined as File | undefined,
  fileUrl: './sample.jpg',

  color1: '#480091',
  color2: '#ffecc4',

  tableValuesR: '',
  tableValuesG: '',
  tableValuesB: '',

  init() {
    this.$watch( 'color1', this.updateTableValues.bind( this ) );
    this.$watch( 'color2', this.updateTableValues.bind( this ) );
    this.updateTableValues();
  },

  onChangeFile( event: Event ) {
    if ( event.target && event.target instanceof HTMLInputElement && event.target.files ) {
      this.file = event.target.files[ 0 ];
    }

    if ( this.file ) {
      this.fileUrl = URL.createObjectURL( this.file );
    }
  },

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

  },

  copyButton: {

    showMessage: false,

    [ '@clipboard-copy' ]() {
      this.copyButton.showMessage = true;
      setTimeout( () => {
        this.copyButton.showMessage = false;
      }, 1000 );
    },

    [ ':class' ]() {
      return {
        'success': this.copyButton.showMessage,
      };
    },

    [ 'x-text' ]() {
      return this.copyButton.showMessage ? 'Copied ✅' : 'Copy';
    },

  },

} );
