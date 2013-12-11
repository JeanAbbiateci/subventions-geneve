jQuery.extend( jQuery.fn.dataTableExt.oSort, {
	/**
	 * European dates dd.mm(.yyyy) or dd/mm(/yyyy), will be detected automatically
	 */
	"date-eu-pre": function ( date ) {
		var year = '', // year is optional
			month, day,
			character='/';
		if ( date.indexOf('.') > 0 )
			character = '.'; // if found, use . as the separator, otherwise use /
		date = date.replace( " ", "" ).split( character );
		if ( date[2] )
			year = date[2];
		month = date[1];
		if ( month.length == 1 )
			month = '0' + month;
		day = date[0];
		if ( day.length == 1 )
			day = '0' + day;
		return (year + month + day) * 1;
	},
	"date-eu-asc": function ( a, b ) {
		return a - b;
	},
	"date-eu-desc": function ( a, b ) {
		return b - a;
	},

	/**
	 * Formatted numbers, currency and percentage values, will be detected automatically
	 */
	"formatted-num-pre": function ( a ) {
		a = ( a == "-" ) ? 0 : a.replace( /[^\d\-\.]/g, "" );
		return parseFloat( a );
	},
	"formatted-num-asc": function ( a, b ) {
		return a - b;
	},
	"formatted-num-desc": function ( a, b ) {
		return b - a;
	},

	/**
	 * Numeric Comma (numbers like 0,5), NOT detected automatically!
	 */
	"numeric-comma-pre": function ( a ) {
		a = ( a == "-" ) ? 0 : a.replace( /,/, "." );
		return parseFloat( a );
	},
	"numeric-comma-asc": function ( a, b ) {
		return a - b;
	},
	"numeric-comma-desc": function ( a, b ) {
		return b - a;
	}
} );

/**
 * Type detection for currency and percentage values
 */
jQuery.fn.dataTableExt.aTypes.unshift( function ( sData ) {
	if ( sData !== null && sData.match( /^(0[1-9]|[12][0-9]|30|31)[\.\/](0[1-9]|1[012])[\.\/](19|20|21)\d\d$/ ) )
		return 'date-eu';
	return null;
} );

/**
 * Type detection for currency and percentage values
 */
(function(){
	var re = new RegExp( "[^\$£€%0-9\.,' -]" ); // Init the regex just once for speed

	jQuery.fn.dataTableExt.aTypes.unshift( function ( data ) {
		if ( typeof data !== 'string' || re.test( data ) )
			return null;
		return 'formatted-num';
	} );
}());

/**
 * Type detection for formatted numbers
 */
jQuery.fn.dataTableExt.aTypes.unshift( function ( sData ) {
	var deformatted = sData.replace(/[^\d\-\.\/a-zA-Z]/g,'');
	if ( jQuery.isNumeric( deformatted ) || deformatted === "-" )
		return 'formatted-num';
	return null;
} );