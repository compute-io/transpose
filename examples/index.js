'use strict';

var matrix = require( 'dstructs-matrix' ),
	transpose = require( './../lib' );

var data,
	mat,
	t, i;

data = new Int8Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}

mat = matrix( data, [5,2], 'int8' );
console.log( mat.toString() );
// returns '0,1;2,3;4,5;6,7;8,9'

t = transpose( mat );
console.log( t.toString() );
// returns '0,2,4,6,8;1,3,5,7,9'


