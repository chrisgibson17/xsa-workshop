sap.ui.controller("view.AppEntry", {
	 onInit : function(){
         this.getView().addStyleClass("sapUiSizeCompact"); // make everything inside this View appear in Compact mode
	 },
	 
	onSubmit: function() {
		var oController = sap.ui.getCore().byId("App").getController();
		 
		var sessionID = sap.ui.getCore().getModel().getProperty("/sessionID"); 
		var fName = sap.ui.getCore().getModel().getProperty("/firstName"); 
		var lName = sap.ui.getCore().getModel().getProperty("/lName"); 
		var emailAddress = sap.ui.getCore().getModel().getProperty("/eMail"); 

		var aUrl = '/workshop/admin/services/mailingList.xsjs?cmd=Insert'+
		'&SessionID='+escape(sessionID)+
		'&FirstName='+escape(fName)+
		'&LastName='+escape(lName)+
		'&EmailAddress='+escape(emailAddress);

		jQuery.ajax({
			url: aUrl,
			method: 'GET',
			dataType: 'text',
			success: function(myTxt){
				oController.onSubmitSuccess(myTxt,oController,fName); },
				error: onErrorCall });			 
		return;		
	},
	
	onSubmitSuccess: function(myTxt,oController, fName){

		// Clear screen fields, and issue success message.
		sap.ui.getCore().getModel().setProperty("/sessionID"," ");
		sap.ui.getCore().getModel().setProperty("/firstName", " "); 
		sap.ui.getCore().getModel().setProperty("/lName", " "); 
		sap.ui.getCore().getModel().setProperty("/eMail", " "); 
		sap.m.MessageToast.show("Your information has been submitted successfully");

	},	
	 
});