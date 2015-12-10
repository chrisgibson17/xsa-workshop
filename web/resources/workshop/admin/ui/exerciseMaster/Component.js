jQuery.sap.declare("sap.workshop.exerciseMaster.Component");


sap.ui.core.UIComponent.extend("sap.workshop.exerciseMaster.Component", {
	init: function(){
		jQuery.sap.require("sap.m.MessageBox");
		jQuery.sap.require("sap.m.MessageToast");		
		
	      var oConfig = new sap.ui.model.json.JSONModel({});
          sap.ui.getCore().setModel(oConfig, "config"); 
          this.getSessionInfo();
	          
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
	},
	
	createContent: function() {
     
		var settings = {
				ID: "app",
				title: "Workshop Exercise Solutions & Templates",
				description: "Workshop Exercise Solutions & Templates",
			};
		
		var oView = sap.ui.view({
			id: "app",
			viewName: "view.App",
			type: "JS",
			viewData: settings
		});
		 oView.setModel(sap.ui.getCore().getModel("config"), "config");		 
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
	    
	    jQuery.ajax({
	    	url : gUrl,
	    	method : 'GET',
	    	dataType : 'json',
	    	success : this.onLoadExercises,
	    	error : this.onErrorCall,
	    	async : false
	    });	    
	},
	
	onLoadSession: function(myJSON){
		for( var i = 0; i<myJSON.session.length; i++)
	     {
		   var config =  sap.ui.getCore().getModel("config");
		   config.setProperty("/UserName",myJSON.session[i].UserName);
	     }
	},
	
	onLoadExercises: function(myJSON) {
	    var oExercises = new sap.ui.model.json.JSONModel(myJSON);
        sap.ui.getCore().setModel(oExercises, "exercises"); 
	},

	onErrorCall: function(jqXHR, textStatus, errorThrown) {
		alert("Workshop "+ workshopId + " is not valid. Please correct the URL");	
		return;	
	}	
});