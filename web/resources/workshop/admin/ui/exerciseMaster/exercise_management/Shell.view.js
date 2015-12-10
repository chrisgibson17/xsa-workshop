sap.ui.jsview("exercise_management.Shell", {

	getControllerName : function() {
		return "exercise_management.Shell";
	},

	createContent : function(oController) {
		
		oController.oShell = new sap.ui.ux3.Shell("myShell", {
			appIcon : "./images/sap_18.png",
			appIconTooltip : "SAP",
			appTitle : "Workshop Exercise Management",
			showInspectorTool : false,
			showFeederTool : false,
			showSearchTool : false
		});

		oController.oShell.attachLogout(oController.handleExitShell);

		createShell(oController);
		buildShellPersonalization(oController);
		buildShellNavigation(oController);

		var oLayout = new sap.ui.commons.layout.MatrixLayout({width:"auto"});		
		
		oController.oSearchView = sap.ui.view({id:"search_view", viewName:"exercise_management.Search", type:sap.ui.core.mvc.ViewType.JS});
		oController.oEditView = sap.ui.view({id:"edit_view", viewName:"exercise_management.Edit", type:sap.ui.core.mvc.ViewType.JS});
		
		oLayout.createRow(oController.oSearchView);   
		oLayout.createRow(oController.oEditView);
		oController.oShell.setContent(oLayout);		
		
		return oController.oShell;
	}
});


function createShell(oController) {

	var oUserTxt = new sap.ui.commons.TextView({
		tooltip : "Welcome" 
	});
	oController.oShell.addHeaderItem(oUserTxt);
	oController.getSessionInfo(oController,oUserTxt);
	oController.oShell.addHeaderItem(new sap.ui.commons.Button({
		text : "Personalize",
		tooltip : "Personalize",
		press : oController.handlePersonalizeShell
	}));

	
	//Add Workshop Popup
	var popAddWorkshop = new sap.ui.ux3.ToolPopup("addWorkshopTool",{
        title: "Add Workshop",
        tooltip: "Create New Workshop",
        icon: "sap-icon://add" });
	
	var layout = new sap.ui.commons.layout.MatrixLayout({width:"auto"});
    var oText = new sap.ui.commons.TextField("workshopName",{tooltip: "Workshop Name", editable:true, width: '200px'});
    layout.createRow(new sap.ui.commons.Label({text: "Workshop Name: "}), oText);
    
    var oCancelButton = new sap.ui.commons.Button({
        text : "Cancel",
        icon : "sap-icon://decline",
        press : function(){ popAddWorkshop.close();} 
    });
    var oSaveButton = new sap.ui.commons.Button({
        text : "Save",
        icon : "sap-icon://save",
        press : function(){ oController.onCreateWorkshop(oController); popAddWorkshop.close(); } 
    });
    
    layout.createRow(oCancelButton, oSaveButton);
    
	popAddWorkshop.addContent(layout);
	oController.oShell.addToolPopup(popAddWorkshop);
	
	//Add Exercise 
	var popAddExercise = new sap.ui.ux3.ToolPopup("addExerciseTool",{
        title: "Add Exercise",
        tooltip: "Create Exercise",
        icon: "sap-icon://add-favorite",
        open: function(oControlEvent){ oController.onAddExerciseOpen(oControlEvent, oController);  } });
	
	var layout = new sap.ui.commons.layout.MatrixLayout({width:"auto"});
    var oText = new sap.ui.commons.TextField("ExerciseNodeKey",{tooltip: "Node Key", editable:true, width: '200px'});
    layout.createRow(new sap.ui.commons.Label({text: "Node Key: "}), oText);
    var oText = new sap.ui.commons.TextField("ExerciseNodeText",{tooltip: "Node Text", editable:true, width: '200px'});
    layout.createRow(new sap.ui.commons.Label({text: "Node Text: "}), oText);    
    
    var oCancelButton = new sap.ui.commons.Button({
        text : "Cancel",
        icon : "sap-icon://decline",
        press : function(){ popAddExercise.close();} 
    });
    var oSaveButton = new sap.ui.commons.Button({
        text : "Update",
        icon : "sap-icon://save",
        press : function(){ oController.onCreateExercise(oController); popAddExercise.close(); } 
    });
    
    layout.createRow(oCancelButton, oSaveButton);
    
    popAddExercise.addContent(layout);
	oController.oShell.addToolPopup(popAddExercise);
	
	
	//Add Exercise Step Popup
	var popAddStep = new sap.ui.ux3.ToolPopup("addStepTool",{
        title: "Add Exercise Step",
        tooltip: "Create Exercise Step",
        icon: "sap-icon://add-equipment",
        open: function(oControlEvent){ oController.onAddStepOpen(oControlEvent, oController);} });

	
	var layout = new sap.ui.commons.layout.MatrixLayout({width:"auto"});
    var oText = new sap.ui.commons.TextField("StepNodeKey",{tooltip: "Node Key", editable:true, width: '200px'});
    layout.createRow(new sap.ui.commons.Label({text: "Node Key: "}), oText);
    var oText = new sap.ui.commons.TextField("StepNodeText",{tooltip: "Node Text", editable:true, width: '200px'});
    layout.createRow(new sap.ui.commons.Label({text: "Node Text: "}), oText);

    var oText = new sap.ui.commons.TextField("StepParent",{tooltip: "Step Parent", editable:false, width: '100px'});
    var oText2 = new sap.ui.commons.TextField("StepParentTxt",{tooltip: "Step ParentTxt", editable:false, width: '100px'});
    var oLayoutInner = new sap.ui.commons.layout.HorizontalLayout("LayoutInnerPop", {
		content: [oText,oText2]
	});
    
    layout.createRow(new sap.ui.commons.Label({text: "Create Within Exercise: "}),oLayoutInner );
	
	
    var oCancelButton = new sap.ui.commons.Button({
        text : "Cancel",
        icon : "sap-icon://decline",
        press : function(){ popAddStep.close();} 
    });
    var oSaveButton = new sap.ui.commons.Button({
        text : "Update",
        icon : "sap-icon://save",
        press : function(){ oController.onCreateStep(oController); popAddStep.close(); } 
    });
    
    layout.createRow(oCancelButton, oSaveButton);
    
    popAddStep.addContent(layout);
	oController.oShell.addToolPopup(popAddStep);
	
	//Shell Header
	oController.oShell.addHeaderItem(new sap.ui.commons.MenuButton({
		text : "Help",
		tooltip : "Help Menu",
		menu : new sap.ui.commons.Menu("menu1", {
			items : [ new sap.ui.commons.MenuItem("menuitem1", {
				text : "Help"
			}), new sap.ui.commons.MenuItem("menuitem2", {
				text : "Report Incident"
			}), new sap.ui.commons.MenuItem("menuitem3", {
				text : "About"
			}) ]
		})
	})); 
}

function buildShellPersonalization(oController) {
	// EXPERIMENTAL - THIS WILL CHANGE!!
	oController.oShell._getPersonalization().attachPersonalizationChange(
			oController.handlePersonalizeShellChange);
	// initialize settings
	if (JSON && window["localStorage"]) { // only in browsers with native JSON
		// and offline storage support
		var sSettings = localStorage.getItem("sapUiShellTestSettings");
		if (sSettings) {
			oController.oShell.initializePersonalization(JSON.parse(sSettings));
		}
	}
}

function buildShellNavigation(oController) {
	var WI = sap.ui.ux3.NavigationItem;
	oController.oShell.addWorksetItem(new WI("wi_home", {
		key : "wi_home",
		text : 'Exercise Management' }));
	
	
	oController.oShell.attachEvent("worksetItemSelected", function(oEvent){
		var oLayout = new sap.ui.commons.layout.MatrixLayout();	
    	var sId = oEvent.getParameter("id");
		switch (sId) {
		case "wi_home":
			oController.oShell.setContent(oLayout.createRow(oController.oEntryView));
			break;
			
		}
	});  
	

			
}


