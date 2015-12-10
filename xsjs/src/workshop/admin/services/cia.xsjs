var SESSIONINFO = $.import("workshop.admin.services", "session");

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function insertCIAEntry() {
	var body = '';
	//\"USER_ID\", \"CLIENT_IP_ADDRESS\", \"EMAIL\"'


	var userID = $.request.parameters.get('UserID');
	var clientIPAddress = $.request.parameters.get('ClientIPAddress');
	var emailAddress = $.request.parameters.get('EmailAddress');

	if ( isEmpty(userID) === true ){
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('User ID cannot be empty');
		return;
	}
	
	if ( isEmpty(clientIPAddress) === true ){
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Client IP Address cannot be empty');
		return;
	}

	if ( isEmpty(emailAddress) === true ){
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Email Address cannot be empty');
		return;
	}
	
	var conn = $.hdb.getConnection();
	var pstmt;
	var rs;
	var query;

	
	try {
		
		// Insert new record
		query = "INSERT INTO \"workshop.admin.data::clientInstanceAssignment.Assignments\"  " +		
		        " values(?, ?, now(), ?, ?)";
		conn.executeUpdate(query,userID,clientIPAddress,emailAddress,'X');
		conn.commit();
		conn.close();
		
	} catch (error) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(error.message);
		return;
	}


	body = 'Submission Successful'; // Success
	$.trace.debug(body);
//	$.response.contentType = 'application/text';
	$.response.setBody(body);
	$.response.headers.set('access-control-allow-origin', '*');
	$.response.status = $.net.http.OK;

}

// returns client instance as message to browser
function request() {
	
	var body = '';
	var conn = $.hdb.getConnection();
	var pstmt;
	var rs;
	var query;
	
	try {
		var query = 'SELECT \"USER_ID\", \"CLIENT_IP_ADDRESS\" '
				+ 'FROM \"workshop.admin.data::clientInstanceAssignment.Assignments\" WHERE "USER_ID" = ?';
		var rs = conn.executeQuery(query,$.session.getUsername());

		for(var i = 0; i < rs.length; i++){
			body = "Client instance for user id " + $.session.getUsername() + " is " + rs[i].CLIENT_IP_ADDRESS;
		}
		
		if ( body.length === 0 ){
			 body = 'No client instance has been assigned to user id ' + $.session.getUsername();
		};
		conn.close();

	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
		return;
	}

	$.response.setBody(body);
	$.response.status = $.net.http.OK;

}

// Returns client instance as json, better consumed from UI
function getClientInstance() {
	
	var body = '';
	var conn = $.hdb.getConnection();
	var pstmt;
	var rs;
	var query;
	
	try {
		var query = 'SELECT \"USER_ID\", \"CLIENT_IP_ADDRESS\", \"ASSIGNMENT_TIMESTAMP\"'
				+ 'FROM \"workshop.admin.data::clientInstanceAssignment.Assignments\" WHERE "USER_ID" = ?';
		var rs = conn.executeQuery(query, $.session.getUsername());
		var out = {"Assignment":[]};
		for(var i=0; i<rs.length;i++){
			out.Assignment.push(rs[i]);
		}
		
		if ( out.Assignment.length === 0 ){
			    $.response.setBody('No client instance has been assigned to user id '  + $.session.getUsername());
			    $.response.status = $.net.http.BAD_REQUEST;
		return;
	    }		
		conn.close();

		
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
		return;
	}


	$.response.status = $.net.http.OK;
	$.response.contentType = "application/json";
	$.response.setBody(JSON.stringify(out));		
	
}

function deleteAssignments() {
	
	var body = '';
	var conn = $.hdb.getConnection();
	var pstmt;
	var rs;
	var query;
	
	try {
		
		// Insert new record
		query = "TRUNCATE TABLE \"workshop.admin.data::clientInstanceAssignment.Assignments\"";
		conn.executeUpdate(query);
		conn.commit();
		conn.close();
		
	} catch (error) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(error.message);
		return;
	}

	body = 'Deletion Successful'; // Success
	$.response.setBody(body);
	$.response.headers.set('access-control-allow-origin', '*');
	$.response.status = $.net.http.OK;

}

function downloadExcel() {
	var body = '';

	try {
		var query = 'SELECT \"USER_ID\", \"CLIENT_IP_ADDRESS\", \"ASSIGNMENT_TIMESTAMP\"'
			+ 'FROM \"workshop.admin.data::clientInstanceAssignment.Assignments\"';
		var conn = $.hdb.getConnection();
		var rs = conn.executeQuery(query);

		body = "USER_ID" + "\t" + "CLIENT_INSTANCE_IP" + "\t" +  "ASSIGNMENT_TIMESTAMP" + "\n"; 

		for(var i=0; i<rs.length;i++){
			body += rs[i].USER_ID + "\t" + rs[i].CLIENT_IP_ADDRESS + "\t"	+ rs[i].ASSIGNMENT_TIMESTAMP  + "\n";
		}
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
		return;
	}

	$.response.setBody(body);
	$.response.contentType = 'application/vnd.ms-excel; charset=utf-16le';
	$.response.headers.set('Content-Disposition',
			'attachment; filename=Excel.xls');
	$.response.headers.set('access-control-allow-origin', '*');
	$.response.status = $.net.http.OK;

}

function downloadRDP() {
	var body = '';
	var conn = $.hdb.getConnection();
	var pstmt;
	var rs;
	var query;
	var ip_address;
	
	try {

		var query = 'SELECT \"USER_ID\", \"CLIENT_IP_ADDRESS\", \"ASSIGNMENT_TIMESTAMP\"'
			+ 'FROM \"workshop.admin.data::clientInstanceAssignment.Assignments\" WHERE "USER_ID" = ?';
	    var rs = conn.executeQuery(query, $.session.getUsername());

		for(var i=0; i<rs.length;i++){
			ip_address = rs[i].CLIENT_IP_ADDRESS;
		}
		body +=  'full address:s:' + ip_address + "\n";
		body += 'username:s:Administrator' + "\n";
		
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
		return;
	}

	$.response.setBody(body);
	$.response.contentType = 'application/rdp; charset=utf-8';
	$.response.headers.set('Content-Disposition',
			'attachment; filename=' + ip_address + '.rdp');
	$.response.headers.set('access-control-allow-origin', '*');
	$.response.status = $.net.http.OK;

}


var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {
case "Insert":
	insertCIAEntry();
	break;	
case "getClientInstance":
	getClientInstance();
	break;
case "request":
	request();
	break;
case "getSessionInfo":
	SESSIONINFO.fillSessionInfo();
	break;
case "Excel":
	downloadExcel();
	break;
case "DeleteAll":
	deleteAssignments();
	break;
case "RDP":
	downloadRDP();
	break;
default:
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody('Invalid Command');
}	