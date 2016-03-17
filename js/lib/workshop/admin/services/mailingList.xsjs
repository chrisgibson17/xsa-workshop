function isEmpty(str) {
    return (!str || 0 === str.length);
}

function insertMailingListEntry() {
	var body = '';
	var sessionID = $.request.parameters.get('SessionID');
	var firstName = $.request.parameters.get('FirstName');
	var lastName = $.request.parameters.get('LastName');
	var emailAddress = $.request.parameters.get('EmailAddress');

	if ( isEmpty(sessionID) === true ){
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Session ID cannot be empty');
		return;
	}
	
	if ( isEmpty(firstName) === true ){
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('First name cannot be empty');
		return;
	}

	if ( isEmpty(lastName) === true ){
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.setBody('Last name cannot be empty');
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
		query = "INSERT INTO \"workshop.admin.data::mailingList\"  values(\"workshop.admin.data::recordId\".NEXTVAL, ?, ?, now(), ?, ?, ?)";
		conn.executeUpdate(query,sessionID,$.session.getUsername(),firstName,lastName,emailAddress);
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

function deleteAllMailingListEntries() {
	
	var body = '';
	var conn = $.hdb.getConnection();
	var pstmt;
	var rs;
	var query;
	
	try {
		
		// Insert new record
		query = "TRUNCATE TABLE \"workshop.admin.data::mailingList\"";
		conn.executeUpdate(query);
		conn.commit();
		conn.close();
		
	} catch (error) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(error.message);
		return;
	}


	body = 'Deletion Successful'; // Success
	$.trace.debug(body);
//	$.response.contentType = 'application/text';
	$.response.setBody(body);
	$.response.headers.set('access-control-allow-origin', '*');
	$.response.status = $.net.http.OK;

}

function downloadExcel() {
	var body = '';

	try {
		var query = 'SELECT \"RecordId\", \"SessionId\", \"UserId\", \"DateCreated\", \"FirstName\", \"LastName\" , \"EmailAddress\" '
				+ 'FROM \"workshop.admin.data::mailingList\"  order by \"RecordId\"';
		$.trace.debug(query);
		var conn = $.hdb.getConnection();
		var rs = conn.executeQuery(query);

		body = "Record Id" + "\t" + "Session Id" + "\t" +  "User Id" + "\t" + 
		       "Date Created" + "\t" + "First Name" + "\t" + "Last Name" + "\t" + 
		       "Email Address" + "\n"; 

		for(var i=0; i<rs.length;i++){
			body += rs[i].RecordId + "\t" + rs[i].SessionId + "\t"
					+ rs[i].UserId + "\t" + rs[i].DateCreated + "\t" 
					+ rs[i].FirstName + "\t" + rs[i].LastName + "\t" + rs[i].EmailAddress + "\n";
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

function fillSessionInfo(){
	var body = '';
	body = JSON.stringify({
		"session" : [{"UserName": $.session.getUsername(), "Language": $.session.language}]
	});
	$.response.contentType = 'application/json';
	$.response.setBody(body);
	$.response.status = $.net.http.OK;
}

var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {
case "Insert":
	insertMailingListEntry();
	break;
case "Excel":
	downloadExcel();
	break;
case "DeleteAll":
	deleteAllMailingListEntries();
	break;
case "getSessionInfo":
	fillSessionInfo();
	break;
default:
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody('Invalid Command');
}	