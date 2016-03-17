sap.ui.jsview("view.Nav", { 

        getControllerName: function() {
            return "view.Nav"; 
        },

        createContent: function(oController) {
        	var oExercises = sap.ui.getCore().getModel("exercises").getData();
        	var oOuterList = new sap.m.List({});
        	for ( var i = 0; i < oExercises.exercises.length; i++) { 
        		var oPanel = new sap.m.Panel({
        			expandable: true,
        			expanded: false
        		});
        		oPanel.setHeaderText(oExercises.exercises[i].text);
        		var oInnerList = new sap.m.List({});
        		//Inner Items
        		for ( var isub = 0; isub < oExercises.exercises[i].steps.length; isub++) {
        			
        			var key = oExercises.exercises[i].steps[isub].key;
        			if(key===gSelection){
        				oPanel.setExpanded(true);
        			}
        			var path = oExercises.exercises[i].steps[isub].package + "/" +
        					   oExercises.exercises[i].steps[isub].object + "." +
        					   oExercises.exercises[i].steps[isub].extension;
        			var oText = new sap.m.Text({
        				text: oExercises.exercises[i].steps[isub].text
        			});
        			var oGrid = new sap.ui.layout.Grid({});
        			oGrid.addContent(oText);
        			var TextLayout = new sap.ui.layout.GridData({
        				span: "L10 M10 S10"
        			});
        			oText.setLayoutData(TextLayout);
        			
        			var oButton = new sap.m.Button({
        				id:key,
        				class:"objectBtnContent",
        				icon:"sap-icon://arrow-right",
        				tooltip: path,
        				type:"Transparent",
        				press: oController.viewObjects        					
        					
        			});
        			var ButtonLayout = new sap.ui.layout.GridData({
        				span: "L2 M2 S2"
        			});
        			oButton.setLayoutData(ButtonLayout);
        			oGrid.addContent(oButton);
        			
        			oInnerList.addItem( new sap.m.CustomListItem({}).addContent(oGrid));
	
        			
        		}
        		oPanel.addContent(oInnerList);        		
        		oOuterList.addItem( new sap.m.CustomListItem({}).addContent(oPanel));
        	}

        	
        	
        	return oOuterList;
        	
		}       	
});