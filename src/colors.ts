export function hex2rgba( hex: string ): [ number, number, number, number ] {

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
