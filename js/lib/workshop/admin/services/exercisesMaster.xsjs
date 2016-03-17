var SESSIONINFO = $.import("workshop.admin.services", "session");

function getExercises(){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody('No longer implemented on the server. Please use the DT REST interface call instead');
	
}

function getWorkshopList(){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody('No longer implemented on the server. Please use the DT REST interface call instead');
  
}
function getObject(){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody('No longer implemented on the server. Please use the DT REST interface call instead');

}

function createWorkshop(){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody('No longer implemented on the server. Please use the DT REST interface call instead');

}

function getPackages(){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody('No longer implemented on the server. Please use the DT REST interface call instead');

	
}

function getObjList(){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody('No longer implemented on the server. Please use the DT REST interface call instead');
	
}

function getExtList(){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody('No longer implemented on the server. Please use the DT REST interface call instead');

	
}

var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {
case "getExercises":
	getExercises();
	break;
case "getObject":
    getObject();
    break;
case "getWorkshopList":
	getWorkshopList();
	break;
case "createWorkshop":
	createWorkshop();
	break;
case "getSessionInfo":
	SESSIONINFO.fillSessionInfo();
	break; 
case "getPackages":
	getPackages();
	break;
case "getObjList":
	getObjList();
	break;
case "getExtList":
	getExtList();
	break;
default:
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody('Invalid Request Method');
}