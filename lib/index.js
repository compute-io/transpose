'use strict';

// MODULES //

var isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	validate = require( './validate.js' );


// TRANSPOSE //

/**
* FUNCTION: transpose( matrix[, options] )
*	Computes the transpose of a matrix.
*
* @param {Matrix} matrix - input matrix
* @param {Object} [options] - function options
* @param {Boolean} [options.copy=true] - boolean indicating whether to return a new Matrix instance
* @returns {Matrix} matrix transpose
*/
function transpose( mat, options ) {
	var strides,
		shape,
		opts,
		err,
		tmp,
		d;

	if ( !isMatrixLike( mat ) ) {
		throw new TypeError( 'transpose()::invalid input argument. First argument must be a matrix. Value: `' + mat + '`.' );
	}
	opts = {};
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	} else {
		opts.copy = true;
	}
	if ( opts.copy ) {
		// Copy the matrix data to a new typed array:
		d = ctors( mat.dtype )( mat.data );

		// Swap the dimensions:
		shape = [
			mat.shape[ 1 ],
			mat.shape[ 0 ]
		];

		// Swap the strides:
		strides = [
			mat.strides[ 1 ],
			mat.strides[ 0 ]
		];

		// Return a new matrix:
		return new mat.constructor( d, mat.dtype, shape, mat.offset, strides );
	} else {
		// Swap the dimensions...
		tmp = mat.shape[ 0 ];
		mat.shape[ 0 ] = mat.shape[ 1 ];
		mat.shape[ 1 ] = tmp;

		// Swap the strides...
		tmp = mat.strides[ 0 ];
		mat.strides[ 0 ] = mat.strides[ 1 ];
		mat.strides[ 1 ] = tmp;

		// Return the matrix transpose:
		return mat;
	}
} // end FUNCTION transpose()


// EXPORTS //

module.exports = transpose;
