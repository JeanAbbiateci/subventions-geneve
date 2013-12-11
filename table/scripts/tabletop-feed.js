var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function(){

    initializeTabletopObject('0AvW9Q_v2XAGTdDdXclNrc2NmekdjSG5fNkpmWUFDN0E');

});

// pull data from google spreadsheet
function initializeTabletopObject(dataSpreadsheet){
    Tabletop.init({
        key: dataSpreadsheet,
        callback: writeTableWith,
        simpleSheet: true,
        debug: false
    });
}

// create table headers
function createTableColumns(){

    /* swap out the properties of mDataProp & sTitle to reflect
    the names of columns or keys you want to display.
    Remember, tabletop.js strips out spaces from column titles, which
    is what happens with the More Info column header */

    var tableColumns =   [

		{'mDataProp': 'beneficiaire', 'sTitle': 'Bénéficiaire', 'sClass': 'left'},
		{'mDataProp': 'type', 'sTitle': 'Domaine', 'sClass': 'left'},
		{'mDataProp': 'mandataire', 'sTitle': 'Service', 'sClass': 'left'},
        {'mDataProp': 'budget2014', 'sTitle': 'Subvention 2014 (CHF)', 'sClass': 'left'},
        {'mDataProp': 'budget2013', 'sTitle': 'Subvention 2013 (CHF)', 'sClass': 'left'},
        {'mDataProp': 'budget2012', 'sTitle': 'Subvention 2012 (CHF)', 'sClass': 'left'},
        {'mDataProp': 'evol', 'sTitle': 'Evolution depuis 2012', 'sClass': 'left'}


	];
    return tableColumns;
}

// create the table container and object
function writeTableWith(dataSource){

    jqueryNoConflict('#demo').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered table-striped" id="data-table-container"></table>');

    var oTable = jqueryNoConflict('#data-table-container').dataTable({
		'sPaginationType': 'bootstrap',
		'iDisplayLength': 15,
        'aaData': dataSource,
        'aoColumns': createTableColumns(),
        'oLanguage': {
            'sLengthMenu': ''
        }
    });
};

//define two custom functions (asc and desc) for string sorting
jQuery.fn.dataTableExt.oSort['string-case-asc']  = function(x,y) {
	return ((x < y) ? -1 : ((x > y) ?  0 : 0));
};

jQuery.fn.dataTableExt.oSort['string-case-desc'] = function(x,y) {
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};