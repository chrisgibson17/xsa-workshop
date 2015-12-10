sap.ui.controller("exercise_management.Edit", {


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


	 onTreeSelect: function(oEvent, oController){
		 var oNode = oEvent.getParameters().node;
		 var key = oNode.getId();
		 sap.ui.getCore().byId("nodeKey").setValue(key);
		 var text = oNode.getText();
		 sap.ui.getCore().byId("nodeText").setValue(text);
		 
		 sap.ui.getCore().byId("nodePackage").setValue("");
		 sap.ui.getCore().byId("nodeObject").setValue("");
		// sap.ui.getCore().byId("nodeExtension").setValue("");
		 
		 for ( var i = 0; i < workshopJSON.exercises.length; i++) {
			 if(typeof(workshopJSON.exercises[i].steps) != 'undefined'){
				for ( var isub = 0; isub < workshopJSON.exercises[i].steps.length; isub++) {
					if(key === workshopJSON.exercises[i].steps[isub].key){
						
						 sap.ui.getCore().byId("nodePackage").setValue(workshopJSON.exercises[i].steps[isub].package);
						 sap.ui.getCore().byId("nodeObject").setValue(workshopJSON.exercises[i].steps[isub].object);
					//	 sap.ui.getCore().byId("nodeExtension").setValue(workshopJSON.exercises[i].steps[isub].extension);						
					}
				}}
			}
	 },
	 
	 onUpdate: function(oController){
		 var key = sap.ui.getCore().byId("nodeKey").getValue();
		 for ( var i = 0; i < workshopJSON.exercises.length; i++) {
			 if(key === workshopJSON.exercises[i].key){
				 workshopJSON.exercises[i].text = sap.ui.getCore().byId("nodeText").getValue(); 

			 }
			 if(typeof(workshopJSON.exercises[i].steps) != 'undefined'){
			 for ( var isub = 0; isub < workshopJSON.exercises[i].steps.length; isub++) {
					if(key === workshopJSON.exercises[i].steps[isub].key){
						workshopJSON.exercises[i].steps[isub].text = sap.ui.getCore().byId("nodeText").getValue();
						workshopJSON.exercises[i].steps[isub].package = sap.ui.getCore().byId("nodePackage").getValue();
						workshopJSON.exercises[i].steps[isub].object =  sap.ui.getCore().byId("nodeObject").getValue();
					//	workshopJSON.exercises[i].steps[isub].extension = sap.ui.getCore().byId("nodeExtension").getValue(); 

					}
			 }}
		 }
		 
		 refreshTree();
	 },
	 
	 onDelete: function(oController){
		 var key = sap.ui.getCore().byId("nodeKey").getValue();
		 for ( var i = 0; i < workshopJSON.exercises.length; i++) {

			 if(typeof(workshopJSON.exercises[i].steps) != 'undefined'){ 
			 for ( var isub = 0; isub < workshopJSON.exercises[i].steps.length; isub++) {
					if(key === workshopJSON.exercises[i].steps[isub].key){
						workshopJSON.exercises[i].steps.splice(isub,1);
				
					}
			 }}
			 if(key === workshopJSON.exercises[i].key){
				 workshopJSON.exercises.splice(i,1);
			 }
		 }
		 refreshTree();
	 },
	 
	 onMoveUp: function(oController){
		 var key = sap.ui.getCore().byId("nodeKey").getValue();
		 var up = -1; var start;
		 var up2 = -1;
		 for ( var i = 0; i < workshopJSON.exercises.length; i++) {
			 if(key === workshopJSON.exercises[i].key){
				 up = i - 1;
				 if(up>=0){
				 workshopJSON.exercises.move(i,up);
				 return;
				 }
			 }
			 for ( var isub = 0; isub < workshopJSON.exercises[i].steps.length; isub++) {
					if(key === workshopJSON.exercises[i].steps[isub].key){
						up2 = isub - 1;
						if(up2 >= 0){
						workshopJSON.exercises[i].steps.move(isub, up2);
						return;
						}
					} 
			 }
			
		 }
 
	 }, 
	 
	 onMoveDown: function(oController){
		 var key = sap.ui.getCore().byId("nodeKey").getValue();
		 var down;
		 for ( var i = 0; i < workshopJSON.exercises.length; i++) {
			 if(key === workshopJSON.exercises[i].key){
				 down = i + 1;
				 if(down < workshopJSON.exercises.length){
				 workshopJSON.exercises.move(i,down);
				 return;
				 }
			 }
			 for ( var isub = 0; isub < workshopJSON.exercises[i].steps.length; isub++) {
					if(key === workshopJSON.exercises[i].steps[isub].key){
						down = isub + 1;
						if(down < workshopJSON.exercises[i].steps.length){
						workshopJSON.exercises[i].steps.move(isub, down);
						return;
						}
					}
			 }
		 }
 
	 },
	 
	 loadPackageFilter: function(oEvent,oController){
		   gSearchParam = oEvent.getParameter("suggestValue");
		    if(typeof(gSearchParam) != 'undefined'){
			}
			else{ gSearchParam = "*";}

		    if(gSearchParam === ''){
		    	 gSearchParam = "*";
			}


		    var aUrl = '/rest/directories/'+escape(gSearchParam);
		    jQuery.ajax({
		       url: aUrl,
		       method: 'GET',
		       dataType: 'json',
		       success: oController.onLoadFilter,
		       error: oController.onErrorCall });
	 },
	 
	 onLoadFilter: function(myJSON){
		  var oSearchControl = sap.ui.getCore().byId("nodePackage");
		  oSearchControl.destroyItems();
		  for( var i = 0; i<myJSON.length; i++)
		     {
			  oSearchControl.addItem(new sap.ui.core.ListItem({text: myJSON[i]}));

		     }
		},
	 
		 loadObjectFilter: function(oEvent,oController){
			   gSearchParam = oEvent.getParameter("suggestValue");
		    	if(typeof(gSearchParam) != 'undefined'){
				}
				else{ gSearchParam = "*";}
			    if(gSearchParam === ''){
		    	 gSearchParam = "*";
				}
			   packageName = sap.ui.getCore().byId("nodePackage").getValue();
			    var aUrl = '/rest/files/'+escape(packageName)+'/'+gSearchParam;
			    jQuery.ajax({
			       url: aUrl,
			       method: 'GET',
			       dataType: 'json',
			       success: oController.onLoadObjFilter,
			       error: oController.onErrorCall });
		 },
		 
		 onLoadObjFilter: function(myJSON){
			  var oSearchControl = sap.ui.getCore().byId("nodeObject");
			  oSearchControl.destroyItems();
			  for( var i = 0; i<myJSON.length; i++)
			     {
				  oSearchControl.addItem(new sap.ui.core.ListItem({text: myJSON[i]}))

			     }
			},

			 loadExtFilter: function(oEvent,oController){
				   gSearchParam = sap.ui.getCore().byId("nodeObject").getValue();
				   
				   if(typeof(gSearchParam) != 'undefined'){
					   if(gSearchParam == "*"){gSearchParam="";}
				   }
				   else{ gSearchParam = "";}
				   packageName = sap.ui.getCore().byId("nodePackage").getValue();
				    var aUrl = '/workshop/admin/services/exercisesMaster.xsjs?cmd=getExtList&package='+escape(packageName)+'&obj='+gSearchParam;
				    jQuery.ajax({
				       url: aUrl,
				       method: 'GET',
				       dataType: 'json',
				       success: oController.onLoadExtFilter,
				       error: oController.onErrorCall });
			 },
			 
			 onLoadExtFilter: function(myJSON){
				  var oSearchControl = sap.ui.getCore().byId("nodeExtension");
				  oSearchControl.destroyItems();
				  for( var i = 0; i<myJSON.Extensions.length; i++)
				     {
					  oSearchControl.addItem(new sap.ui.core.ListItem({text: myJSON.Extensions[i].OBJECT_SUFFIX}))

				     }
				},
				
     onErrorCall: function(jqXHR, textStatus, errorThrown){
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
