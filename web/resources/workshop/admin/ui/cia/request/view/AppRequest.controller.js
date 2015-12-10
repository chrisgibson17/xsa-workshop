sap.ui.controller("view.AppRequest", {
	 onInit : function(){
         this.getView().addStyleClass("sapUiSizeCompact"); // make everything inside this View appear in Compact mode
	 },
	 
	 onAfterRendering: function() {
		   this.getClientInstanceDetails(this); 
	 },	
	 
	 onLinkPress: function(oEvent){
		 
		 //Download RDP file
			 $.download('/workshop/admin/services/cia.xsjs','cmd=RDP','GET' );
 
	 },  
   
	 getClientInstanceDetails: function(oController){
			var aUrl = '/workshop/admin/services/cia.xsjs?cmd=getClientInstance';

		    jQuery.ajax({
		       url: aUrl,
		       method: 'GET',
		       dataType: 'json',
		       success: function(myJSON){oController.onLoadSession(myJSON,oController); },
		       error: onErrorCall });
	 },
	 
	 onLoadSession: function(myJSON,oController){
			for( var i = 0; i<myJSON.Assignment.length; i++)
		     {
				var model =  sap.ui.getCore().getModel();
				model.setProperty("/UserID",myJSON.Assignment[i].USER_ID);
				model.setProperty("/ClientInstance",myJSON.Assignment[i].CLIENT_IP_ADDRESS); 
				model.setProperty("/TimeStamp",myJSON.Assignment[i].ASSIGNMENT_TIMESTAMP); 

		     }
	 },		
	 
});