sap.ui.jsview("exercise_management.Search", {

	getControllerName : function() {
		return "exercise_management.Search";
	},

	createContent : function(oController) {
		  //Filter By Panel
	      var searchPanel = new sap.ui.commons.Panel().setText('Select Workshop');
	      searchPanel.setWidth("100%");
	      var layoutNew = new sap.ui.commons.layout.MatrixLayout({width:"auto"});
	      searchPanel.addContent(layoutNew);

	      var oWorkshopListBox = new sap.ui.commons.ListBox("lbWorkshop",{ visibleItems : 5, width: "200px",
	    	  select: function(oEvent){
		        	oController.onWorkshopSelect(oEvent,oController);} }); 
	      
	     oController.getWorkshopList(oController);
		 
	     var oSaveButton = new sap.ui.commons.Button({
	          text : "Save Workshop to Server",
	          icon : "sap-icon://save",
	          press : function(){ saveWorkshop(sap.ui.getCore().byId("lbWorkshop").getSelectedItem().getText()); } 
	      });

 		var oDownloadButton = new sap.ui.commons.Button({
	          text : "Download Workshop",
	          icon : "sap-icon://download",
	          press : function(oEvent){ oController.onWorkshopDownload(oEvent,oController); } 
	      });
 		
 		var oDeleteButton = new sap.ui.commons.Button({
	          text : "Delete Workshop",
	          icon : "sap-icon://delete",
	          press : function(oEvent){ oController.onWorkshopDelete(oEvent,oController); } 
	      }); 		
	    
	    // create the FileUploader control
		var oSimpleFileUploader = new sap.ui.unified.FileUploader({
		id: "fileUploader",
		uploadUrl : "/rest/workshop/upload",   // URL to submit the form to
		name: "simpleUploader",          // name of the input type=file element within the form 
		uploadComplete: oController.handleUploadComplete,
		sendXHR: true,
		useMultipart: false
		});

 		var oUploadButton = new sap.ui.commons.Button({
	          text : "Upload Workshop",
	          icon : "sap-icon://upload",
	          press : oController.handleUploadPress  
	      });

	     layoutNew.createRow(new sap.ui.commons.Label({text: "Workshop: "}), 
	     	  oWorkshopListBox );
		 layoutNew.createRow(oSaveButton, oDownloadButton );
		 layoutNew.createRow(oDeleteButton );	
		 layoutNew.createRow(oSimpleFileUploader, oUploadButton );	 		      	  	     
		 var oLayout = new sap.ui.commons.layout.MatrixLayout({width:"100%"});
		 oLayout.createRow(searchPanel);

		return oLayout;

	}
});