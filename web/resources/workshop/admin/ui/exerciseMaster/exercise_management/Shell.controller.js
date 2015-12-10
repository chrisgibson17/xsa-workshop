sap.ui.controller("exercise_management.Shell", {


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


	 getSessionInfo: function(oController,oUserTxt){
			var aUrl = '/workshop/admin/services/exercisesMaster.xsjs?cmd=getSessionInfo';
			
		    jQuery.ajax({
		       url: aUrl,
		       method: 'GET',
		       dataType: 'json',
		       success: function(myJSON){oController.onLoadSession(myJSON,oController,oUserTxt); },
		       error: oController.onErrorCall });
	 },
	 
	 onLoadSession: function(myJSON,oController,oUserTxt){
			for( var i = 0; i<myJSON.session.length; i++)
		     {
			   oUserTxt.setText(myJSON.session[i].UserName);	
		     }
	 },	 
	 
	 onCreateWorkshop: function(oController){
		 var oWorkshopListBox = sap.ui.getCore().byId("lbWorkshop");
		 var oWorkshopName = sap.ui.getCore().byId("workshopName");		
		 var oItem = new sap.ui.core.ListItem({text:oWorkshopName.getValue()});
		 workshopJSONString = '{"exercises":[{"key":"EX1","text":"Exercise 1",'+
			            '"steps":[{'+
			               '"key":"EX1_1","text":"1.1 Placeholder","package":"workshop.solution","object":"test","extension":"txt"}]}]}';
		 workshopJSON = JSON.parse(workshopJSONString);
		 if(saveWorkshop(oWorkshopName.getValue())){oWorkshopListBox.addItem(oItem);};
	 },

	 onCreateExercise: function(oController){
		 var key = sap.ui.getCore().byId("ExerciseNodeKey").getValue();
		 var nodeText = sap.ui.getCore().byId("ExerciseNodeText").getValue();
		 workshopJSON.exercises.push({"key": key, "text": nodeText});
		 refreshTree();

	 },
	 
	 onCreateStep: function(oController){
		 
		 var key = sap.ui.getCore().byId("StepNodeKey").getValue();
		 var nodeText = sap.ui.getCore().byId("StepNodeText").getValue();
		 var parentKey = sap.ui.getCore().byId("StepParent").getValue();
		 for ( var i = 0; i < workshopJSON.exercises.length; i++) {
			 if(parentKey === workshopJSON.exercises[i].key){
				 if(typeof(workshopJSON.exercises[i].steps) != 'undefined'){
					 workshopJSON.exercises[i].steps.push(
						 {"key": key,"text": nodeText, "package": "", "object": "", "extension": "" });
				 }else{
					 workshopJSON.exercises[i].steps = [{"key": key,"text": nodeText, "package": "", "object": "", "extension": "" }];
				 }
				 
				 refreshTree();
				 return;
			 }
		 }
		 
	 },
	
	 onAddExerciseOpen: function(oEvent, oController){
		 var item = sap.ui.getCore().byId("lbWorkshop").getSelectedItem();

		 if(typeof(item) != 'undefined' && item != null){}
		 else {	 
			jQuery.sap.require("sap.ui.commons.MessageBox"); 
	    	sap.ui.commons.MessageBox.show(
	    				 "You must select a valid workshop", 
	    				 sap.ui.commons.MessageBox.Icon.ERROR,
	    				 "Create Exercise Error",
	    				 [sap.ui.commons.MessageBox.Action.CLOSE],
	    				 function(){sap.ui.getCore().byId("addExerciseTool").close(); });				 

    		return false;	
		 }

		 return true;

	 },
	 
	 onAddStepOpen: function(oEvent, oController){
		 var key = sap.ui.getCore().byId("nodeKey").getValue();
		 var nodeText = sap.ui.getCore().byId("nodeText").getValue();
		 jQuery.sap.require("sap.ui.commons.MessageBox");
		 if(key==""){
	    	sap.ui.commons.MessageBox.show("You must select a valid exercise parent in the hierarchy", 
	    				 sap.ui.commons.MessageBox.Icon.ERROR,
	    				 "Create Step Error",
	    				 [sap.ui.commons.MessageBox.Action.CLOSE],
	    				 function(){sap.ui.getCore().byId("addStepTool").close(); });				 
	    	
    		return false;	
		 }

		 var bFound = false;
		 for ( var i = 0; i < workshopJSON.exercises.length; i++) {
			 if(key === workshopJSON.exercises[i].key){
				 bFound = true;
			 }
		 }
		 if(!bFound){
		    	sap.ui.commons.MessageBox.show("You can not insert a step as a child of a step", 
		    			 sap.ui.commons.MessageBox.Icon.ERROR,
	    				 "Create Step Error",
	    				 [sap.ui.commons.MessageBox.Action.CLOSE],
	    				 function(){sap.ui.getCore().byId("addStepTool").close();});				 
			return false;				 
		 }
		 
		 sap.ui.getCore().byId("StepParent").setValue(key);
		 sap.ui.getCore().byId("StepParentTxt").setValue(nodeText);
		 return true;

	 },
	 
	
		
	 handleExitShell: function(oEvent){
	        alert("Logout Button has been clicked.\nThe application can now do whatever is required.\nThis example page will just clear the screen.");
	        oEvent.getSource().forceInvalidation();
	        oEvent.getSource().destroy();
	        sap.ui.getCore().applyChanges();
	        jQuery(document.body).html("<span>Logout had been pressed, screen has been cleared.</span>");
	      },
	      
	      handlePersonalizeShell: function(oEvent){
	    	  sap.ui.getCore().byId("myShell").openPersonalizationDialog();
	      },
	      
	      handlePersonalizeShellChange: function(oEvent){
		        var data = oEvent.getParameter("settings"); // retrieve the personalization data object
		        // ...now persist this data on the server or wherever personalization data is stored
		        // (in-browser is not enough because the user wants his settings when logging in from another browser as well)
		        // browser-only:
		        if (JSON && window["localStorage"]) { // only in browsers with native JSON and offline storage support
		          var string = JSON.stringify(data);
		          localStorage.setItem("sapUiShellTestSettings", string);
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

