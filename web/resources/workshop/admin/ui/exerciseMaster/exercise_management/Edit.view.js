sap.ui.jsview("exercise_management.Edit", {

	getControllerName : function() {
		return "exercise_management.Edit";
	},

	createContent : function(oController) {
		  //Filter By Panel
	      var editPanel = new sap.ui.commons.Panel().setText('Hierarchy');
	      editPanel.setWidth("100%");
	      var layoutNew = new sap.ui.commons.layout.MatrixLayout({width:"auto"});
	      editPanel.addContent(layoutNew);

	    //create the Tree control
          var oTree = new sap.ui.commons.Tree("workshopTree",{select: function(oEvent){
		        	oController.onTreeSelect(oEvent,oController);}});
          oTree.setTitle("Workshop Exercise Hierarchy");
          oTree.setWidth("300px");
          oTree.setHeight("400px");
          oTree.setShowHeaderIcons(true);
          oTree.setShowHorizontalScrollbar(true);
          layoutNew.createRow(oTree);
          
          
        //Filter By Panel
	      var edit2Panel = new sap.ui.commons.Panel('detailsPanel').setText('Details');
	      edit2Panel.setWidth("100%");
	      var layout2 = new sap.ui.commons.layout.MatrixLayout({width:"auto"});
	      edit2Panel.addContent(layout2);

	      var oKey = new sap.ui.commons.TextField("nodeKey",{tooltip: "Node Key", editable:false, width: '200px'});
	      layout2.createRow(new sap.ui.commons.Label({text: "Node Key: "}), oKey);

	      var oText = new sap.ui.commons.TextField("nodeText",{tooltip: "Node Text", editable:true, width: '200px'});
	      layout2.createRow(new sap.ui.commons.Label({text: "Node Text: "}), oText);
	      
	      //Filter By Package
	      var oPackage = new sap.ui.commons.AutoComplete("nodePackage", {
	        maxPopupItems: 10,
	        tooltip: "Package",
	        width: "300px",
	        suggest: function(oEvent){oController.loadPackageFilter(oEvent,oController); } });
	      
	    //  var oPackage = new sap.ui.commons.TextField("nodePackage",{tooltip: "Package", editable:true, width: '300px'});
	      layout2.createRow(new sap.ui.commons.Label({text: "Package: "}), oPackage);

	      //Filter By Object
	      var oObject = new sap.ui.commons.AutoComplete("nodeObject", {
	        maxPopupItems: 10,
	        tooltip: "Object",
	        width: "300px",
	        suggest: function(oEvent){oController.loadObjectFilter(oEvent,oController); } });
	        oObject.setFilterFunction(
	    		  function(sValue, oItem){
	    			  if(sValue == "*"){
	    				  return true;
	    			  }
	    			  else{
	    				  return jQuery.sap.startsWithIgnoreCase(oItem.getText(), sValue); }
	    		  	  }
	    		  );
    	  

	    //  var oObject = new sap.ui.commons.TextField("nodeObject",{tooltip: "Object", editable:true, width: '300px'});
	      layout2.createRow(new sap.ui.commons.Label({text: "Object: "}), oObject);
	      
	    //Filter By Object
	    /*  var oExtension = new sap.ui.commons.AutoComplete("nodeExtension", {
	        maxPopupItems: 10,
	        tooltip: "Extension",
	        width: "100px",
	        suggest: function(oEvent){oController.loadExtFilter(oEvent,oController); } });
	        oExtension.setFilterFunction(
	    		  function(sValue, oItem){
	    			  if(sValue == "*"){
	    				  return true;
	    			  }
	    			  else{
	    				  return jQuery.sap.startsWithIgnoreCase(oItem.getText(), sValue); }
	    		  	  }
	    		  );
	      
	      //var oExtension = new sap.ui.commons.TextField("nodeExtension",{tooltip: "Extension", editable:true, width: '100px'});
	      layout2.createRow(new sap.ui.commons.Label({text: "Extension: "}), oExtension);
		  */
		  
	      var oUpdateButton = new sap.ui.commons.Button({
	          text : "Update",
	          icon : "sap-icon://save",
	          press : function(){ oController.onUpdate(oController);} 
	      });
	      
	      var oDeleteButton = new sap.ui.commons.Button({
	          text : "Delete",
	          icon : "sap-icon://delete",
	          press : function(){ oController.onDelete(oController);} 
	      });
	      var oMoveUpButton = new sap.ui.commons.Button({
	          text : "Move Up",
	          icon : "sap-icon://up",
	          press : function(){ oController.onMoveUp(oController); refreshTree();	} 
	      });
	      
	      var oMoveDownButton = new sap.ui.commons.Button({
	          text : "Move Down",
	          icon : "sap-icon://down",
	          press : function(){ oController.onMoveDown(oController); refreshTree();	} 
	      });	      
	      
	      var oLayoutInner = new sap.ui.commons.layout.HorizontalLayout("LayoutInner", {
				content: [oUpdateButton,oDeleteButton]
			});
	      
	      layout2.createRow(new sap.ui.commons.Label({text: ""}), oLayoutInner);
	      
	      var oLayoutInner = new sap.ui.commons.layout.HorizontalLayout("LayoutInner2", {
				content: [oMoveUpButton,oMoveDownButton]
			});
	      
	      layout2.createRow(new sap.ui.commons.Label({text: ""}), oLayoutInner);
	      
		 var oLayout = new sap.ui.commons.layout.HorizontalLayout("Layout1", {
				content: [editPanel, edit2Panel]
			});
		 
		return oLayout;

	}
});