/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ).raw,

	// Module to be tested:
	transpose = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-transpose', function tests() {

	var mat;

	beforeEach( function before() {
		var data, i;

		data = new Int8Array( 10 );
		for ( i = 0; i < data.length; i++ ) {
			data[ i ] = i;
		}
		mat = matrix( data, [5,2], 'int8' );
	});

	it( 'should export a function', function test() {
		expect( transpose ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is not matrix-like', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				transpose( value );
			};
		}
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				transpose( mat, value );
			};
		}
	});

	it( 'should compute the matrix transpose', function test() {
		var nRows,
			nCols,
			t,
			i, j;

		t = transpose( mat );

		nRows = t.shape[ 0 ];
		nCols = t.shape[ 1 ];

		assert.notEqual( mat, t );

		for ( i = 0; i < nRows; i++ ) {
			for ( j = 0; j < nCols; j++ ) {
				assert.strictEqual( t.get( i, j ), mat.get( j, i ) );
			}
		}

		// Flip the matrix horizontally and then transpose...
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		t = transpose( mat );

		for ( i = 0; i < nRows; i++ ) {
			for ( j = 0; j < nCols; j++ ) {
				assert.strictEqual( t.get( i, j ), mat.get( j, i ) );
			}
		}

		// Flip the matrix vertically and then transpose...
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length - 1;

		t = transpose( mat );

		for ( i = 0; i < nRows; i++ ) {
			for ( j = 0; j < nCols; j++ ) {
				assert.strictEqual( t.get( i, j ), mat.get( j, i ) );
			}
		}

		// Flip the matrix horizontally and then transpose...
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.length + mat.strides[ 0 ];

		t = transpose( mat );

		for ( i = 0; i < nRows; i++ ) {
			for ( j = 0; j < nCols; j++ ) {
				assert.strictEqual( t.get( i, j ), mat.get( j, i ) );
			}
		}
	});

	it( 'should transpose and mutate the input matrix', function test() {
		var nRows,
			nCols,
			copy,
			t,
			i, j;

		copy = matrix( mat.data, mat.shape, mat.dtype );

		t = transpose( mat, {
			'copy': false
		});

		nRows = t.shape[ 0 ];
		nCols = t.shape[ 1 ];

		assert.strictEqual( mat, t );

		for ( i = 0; i < nRows; i++ ) {
			for ( j = 0; j < nCols; j++ ) {
				assert.strictEqual( t.get( i, j ), copy.get( j, i ) );
			}
		}

		// Flip the matrix horizontally and then transpose...
		mat = t;
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		t = transpose( mat );

		for ( i = 0; i < nRows; i++ ) {
			for ( j = 0; j < nCols; j++ ) {
				assert.strictEqual( t.get( i, j ), mat.get( j, i ) );
			}
		}

		// Flip the matrix vertically and then transpose...
		mat = t;
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length - 1;

		t = transpose( mat );

		for ( i = 0; i < nRows; i++ ) {
			for ( j = 0; j < nCols; j++ ) {
				assert.strictEqual( t.get( i, j ), mat.get( j, i ) );
			}
		}

		// Flip the matrix horizontally and then transpose...
		mat = t;
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.length + mat.strides[ 0 ];

		t = transpose( mat );

		for ( i = 0; i < nRows; i++ ) {
			for ( j = 0; j < nCols; j++ ) {
				assert.strictEqual( t.get( i, j ), mat.get( j, i ) );
			}
		}
	});

});
