sap.ui.controller("exercise_management.Search", {


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
//   onInit: function() {
//
//   },

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
*/
//   onBeforeRendering: function() {
//
//   },

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
*/
//   onAfterRendering: function() {
//
//   },

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
*/
//   onExit: function() {
//
//   }

	 
	 getWorkshopList: function(oController){
			sap.ui.core.BusyIndicator.show();	
			var aUrl = '/rest/workshops';
			
		    jQuery.ajax({
		       url: aUrl,
		       method: 'GET',
		       dataType: 'json',
		       success: function(myJSON){oController.onLoadWorkshopList(myJSON,oController); },
		       error: oController.onErrorCall });
	 },
	 
	 onWorkshopSelect: function(oEvent,oController){

		 	var workshop = oEvent.getParameters().selectedItem.getText();
		 	var ShortUrl = '/rest/workshop/';
			Url = ShortUrl
			+ workshop;
			//+ '.json';
	 
			
            //var oSapBackPack = new Object();
            //oSapBackPack.Workspace='WORKSHOP_ADMIN';
            //var sapBackPack = JSON.stringify(oSapBackPack);

            
			jQuery.ajax({
				url : Url,
				method : 'GET',
			    dataType: 'json',				
				success: function(myJSON){oController.onLoadWorkshop(myJSON,oController); },
 		        error: oController.onErrorCall	});			
			
		 	
		 	
			//var aUrl = '/workshop/admin/services/exercisesMaster.xsjs?cmd=getObject&package=workshop.admin.services'+
			//           '&objName='+workshop+'&objType=json';
//			
//		    jQuery.ajax({
//		       url: aUrl,
//		       method: 'GET',
//		       dataType: 'json',
//		       success: function(myJSON){oController.onLoadWorkshop(myJSON,oController); },
//		       error: oController.onErrorCall });
	 },
 
	 onWorkshopDownload: function(oEvent,oController){

		 	var workshop = sap.ui.getCore().byId("lbWorkshop").getSelectedItem().getText();
		 	var ShortUrl = '/rest/workshop/download/';
			Url = ShortUrl
			+ workshop;
            window.open(Url);
			return;			
	 },

	 onWorkshopDelete: function(oEvent,oController){

		 	var workshop = sap.ui.getCore().byId("lbWorkshop").getSelectedItem().getText();
		 	var ShortUrl = '/rest/workshop/';
			Url = ShortUrl
			+ workshop;
            
			jQuery.ajax({
				url : Url,
				method : 'DELETE',
			    dataType: 'json',				
				success: function(myJSON){oController.getWorkshopList(oController); },
 		        error: oController.onErrorCall	});			
	 },

	 onLoadWorkshopList: function(workshopJSON,oController){
		 oController.WorkshopList = workshopJSON.Objects;
		 var oWorkshopListBox = sap.ui.getCore().byId("lbWorkshop");
		 oWorkshopListBox.destroyItems();
		 for(i=0;i<oController.WorkshopList.length;i++){
			 var object = oController.WorkshopList[i];
			 oWorkshopListBox.addItem(new sap.ui.core.ListItem({text:object.WORKSHOP_ID}));
		 }
			sap.ui.core.BusyIndicator.hide();
	 },
	 
	 onLoadWorkshop: function(selectedJSON,oController){
		 workshopJSON = selectedJSON;
		 var otree = sap.ui.getCore().byId("workshopTree");
		 otree.destroyNodes();
		 for ( var i = 0; i < workshopJSON.exercises.length; i++) {
			 var oNode1 = new sap.ui.commons.TreeNode(workshopJSON.exercises[i].key, {text:workshopJSON.exercises[i].text, expanded: true});
			 otree.addNode(oNode1);
				for ( var isub = 0; isub < workshopJSON.exercises[i].steps.length; isub++) {
					var oNode2 = new sap.ui.commons.TreeNode(workshopJSON.exercises[i].steps[isub].key, {text:workshopJSON.exercises[i].steps[isub].text, expanded: true});
					oNode1.addNode(oNode2);
				}
			}
			sap.ui.core.BusyIndicator.hide();
	 },
	 
	handleUploadComplete: function(oEvent) {
    	var sResponse = oEvent.getParameter("response");
    	if (sResponse) {
      		var sMsg = "";
      		var m = /^\[(\d\d\d)\]:(.*)$/.exec(sResponse);
      	if (m[1] == "200") {
        	sMsg = "Return Code: " + m[1] + "\n" + m[2], "SUCCESS", "Upload Success";
        	oEvent.getSource().setValue("");
      	} else {
        	sMsg = "Return Code: " + m[1] + "\n" + m[2], "ERROR", "Upload Error";
      	}

      	sap.m.MessageToast.show(sMsg);
    	}
  	},

  	handleUploadPress: function(oEvent) {
    	var oFileUploader = sap.ui.getCore().byId("fileUploader");

		var workshop = sap.ui.getCore().byId("lbWorkshop").getSelectedItem().getText();
		var ShortUrl = '/rest/workshop/';
		var	Url = ShortUrl
			+ escape(workshop);
    	oFileUploader.setUploadUrl(Url);

		oFileUploader.destroyHeaderParameters();	
		oFileUploader.addHeaderParameter( 
			new sap.ui.unified.FileUploaderParameter({
    	        name: 'X-CSRF-Token',
    	        value: getCSRFToken()
    	}));			    		    	
    	oFileUploader.upload();
  	},
    
     onErrorCall: function(jqXHR, textStatus, errorThrown){
			sap.ui.core.BusyIndicator.hide();
   	  if(jqXHR.status == '500'){
	    		 sap.ui.commons.MessageBox.show(jqXHR.responseText, 
	    				 "ERROR",
	    				 "Service Call Error" );	
	    		return;	
   	  }
   	  else{
		         sap.ui.commons.MessageBox.show(jqXHR.statusText, 
	    				 "ERROR",
	    				 "Service Call Error" );	
	    		return;	
   	  }
   	}
	      	
	
});
