var SESSIONINFO = $.import("workshop.admin.services", "session");

function getExercises(){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody('No longer implemented on the server. Please use the REST interface call instead');
	
}

function getOpenSAPExercises(){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody('No longer implemented on the server. Please use the REST interface call instead');
	
}

function getObject(){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody('No longer implemented on the server. Please use the REST interface call instead');
	
}

var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {
case "getExercises":
	getExercises();
	break;
case "getopenSAP":
	getOpenSAPExercises();
	break;	
case "getObject":
    getObject();
    break;
case "getSessionInfo":
	SESSIONINFO.fillSessionInfo();
	break;    
default:
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody('Invalid Command');
}