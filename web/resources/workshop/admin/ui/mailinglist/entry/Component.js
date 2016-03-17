jQuery.sap.declare("sap.workshop.mailingList.Component");


sap.ui.core.UIComponent.extend("sap.workshop.mailingList.Component", {
	init: function(){
		jQuery.sap.require("sap.m.MessageBox");
		jQuery.sap.require("sap.m.MessageToast");		
		
        var model = new sap.ui.model.json.JSONModel({});
        sap.ui.getCore().setModel(model);
	    var oConfig = new sap.ui.model.json.JSONModel({});
        sap.ui.getCore().setModel(oConfig, "config"); 
        this.getSessionInfo(); 
	          
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
	},
	
	createContent: function() {
     
		var settings = {
				ID: "App",
				title: "Workshop Mailing List",
				description: "Workshop Mailing List"
			};
		
		var oView = sap.ui.view({
			id: "App",
			viewName: "view.AppEntry",
			type: "XML",
			viewData: settings
		});
		 oView.setModel(sap.ui.getCore().getModel("config"), "config");		 
		 oView.setModel(sap.ui.getCore().getModel()); 		 
		return oView;
	},
	
	getSessionInfo: function(){
		var aUrl = '/workshop/admin/services/exercisesMaster.xsjs?cmd=getSessionInfo';
	    this.onLoadSession(
	    		JSON.parse(jQuery.ajax({
	    		       url: aUrl,
	    		       method: 'GET',
	    		       dataType: 'json',
	    		       async: false}).responseText));    
	   
	},
	
	onLoadSession: function(myJSON){
		for( var i = 0; i<myJSON.session.length; i++)
	     {
		   var config =  sap.ui.getCore().getModel("config");
		   config.setProperty("/UserName",myJSON.session[i].UserName);
	     }
	}	
});