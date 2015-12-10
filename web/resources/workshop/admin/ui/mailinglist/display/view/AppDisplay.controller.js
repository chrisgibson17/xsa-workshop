sap.ui.controller("view.AppDisplay", {
	 onInit : function(){
         this.getView().addStyleClass("sapUiSizeCompact"); // make everything inside this View appear in Compact mode

	 },
	 
	 onDelete: function(oEvent){
		 var oController = sap.ui.getCore().byId("App").getController();		 
		 sap.m.MessageBox.show(
				 "Are you sure that you want to delete all entries?", {
					 icon: sap.m.MessageBox.Icon.QUESTION,
					 title: "Delete All?",
					 actions: [sap.m.MessageBox.Action.DELETE, sap.m.MessageBox.Action.CANCEL],
					 onClose: oController.deleteConfirm
				 }); 
	 },
	 
	 onExport: function(oEvent){
		 $.download('/workshop/admin/services/mailingList.xsjs','cmd=Excel','GET' );
		 return;		 
	 },

	 //Delete Confirmation Dialog Results
	 deleteConfirm: function(oAction){
		 
		 var oController = sap.ui.getCore().byId("App").getController();
		 if(oAction===sap.m.MessageBox.Action.DELETE){
			 var aUrl = '/workshop/admin/services/mailingList.xsjs?cmd=DeleteAll';
			 jQuery.ajax({
			       url: aUrl,
			       method: 'GET',
			       dataType: 'text',
			       success: function(myTxt){
			          	  oController.onDeleteSuccess(myTxt,oController); },
			       error: onErrorCall });	
		 }
	 },
	 
	 //Delete Successful Event Handler
	 onDeleteSuccess: function(myTxt,oController){
		    	
		 oController.refreshTable(oController);
		 sap.m.MessageToast.show("All Mailing List Entries have been deleted");

	 },
	 
	 //Utility function to refresh the table & reset # of recs in title
	 refreshTable: function(oController){
		 var oModel = sap.ui.getCore().getModel("mailing");
         oModel.refresh(); 
	 }	 
	 
});