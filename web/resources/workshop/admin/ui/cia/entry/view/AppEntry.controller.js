sap.ui.controller("view.AppEntry", {
	 onInit : function(){
         this.getView().addStyleClass("sapUiSizeCompact"); // make everything inside this View appear in Compact mode
	 },
	 
	onSubmit: function() {
		var oController = sap.ui.getCore().byId("App").getController();
		 
		var userID = sap.ui.getCore().getModel().getProperty("/userID"); 
		var clientIPAddress = sap.ui.getCore().getModel().getProperty("/clientIPAddress"); 
		var emailAddress = sap.ui.getCore().getModel().getProperty("/eMail"); 

		var aUrl = '/workshop/admin/services/cia.xsjs?cmd=Insert'+
		'&UserID='+escape(userID)+
		'&ClientIPAddress='+escape(clientIPAddress)+
		'&EmailAddress='+escape(emailAddress);

		jQuery.ajax({
			url: aUrl,
			method: 'GET',
			dataType: 'text',
			success: function(myTxt){
				oController.onSubmitSuccess(myTxt,oController); },
				error: onErrorCall });			 
		return;		
	},
	
	onSubmitSuccess: function(myTxt,oController){

		// Clear screen fields, and issue success message.
		sap.ui.getCore().getModel().setProperty("/userID"," ");
		sap.ui.getCore().getModel().setProperty("/clientIPAddress", " "); 
		sap.ui.getCore().getModel().setProperty("/eMail", " "); 
		sap.m.MessageToast.show("Your information has been submitted successfully");

	},	
	 
});