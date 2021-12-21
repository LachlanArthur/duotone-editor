type Channel = 'r' | 'g' | 'b';

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

} );

function hex2rgba( hex: string ): [ number, number, number, number ] {

  if ( hex.substring( 0, 1 ) === '#' ) {
    hex = hex.substring( 1 );
  }

  switch ( hex.length ) {

    default:
      return [ -1, -1, -1, -1 ];

    case 3:
      {
        const [ r, g, b ] = hex;
        hex = r + r + g + g + b + b + '00';
      }
      break;

    case 4:
      {
        const [ r, g, b, a ] = hex;
        hex = r + r + g + g + b + b + a + a;
      }
      break;

    case 6:
      hex += '00';
      break;

    case 8:
      // All good
      break;

  }

  return [
    parseInt( hex.substr( 0, 2 ), 16 ),
    parseInt( hex.substr( 2, 2 ), 16 ),
    parseInt( hex.substr( 4, 2 ), 16 ),
    parseInt( hex.substr( 6, 2 ), 16 ),
  ];

}
