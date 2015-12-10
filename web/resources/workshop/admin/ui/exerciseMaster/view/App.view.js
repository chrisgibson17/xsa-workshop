sap.ui.jsview("view.App", { 

        getControllerName: function() {
            return "view.App"; 
        },

        createContent: function(oController) {
        	// make everything inside this View appear in Compact mode
	        this.addStyleClass("sapUiSizeCompact"); 

	        // to avoid scrollbars on desktop the root view must be set to block display
			//this.setDisplayBlock(true);
			
			//this.app = new sap.m.SplitApp();
			
			var Nav = new sap.ui.jsview("Nav", "view.Nav");			
			var Detail = new sap.ui.xmlview("Empty", "view.Empty");
			var Splitter = new sap.ui.layout.Splitter({
				height: "100%",
			    contentAreas: [Nav,Detail]
			});
			var NavLayout = new sap.ui.layout.SplitterLayoutData({
				size: "300px"
			})
			Nav.setLayoutData(NavLayout)


			var appIcon = "./images/sap_18.png";
			var appTitle =  " Exercise Solutions & Templates";
            if(workshopId=='openSAP'){
            	appIcon = "./images/logo_sap.png";
            }
            
            
			return new sap.ui.unified.Shell({
				icon: appIcon,
				content: Splitter,
                user: new sap.ui.unified.ShellHeadUserItem({
                	image:"sap-icon://person-placeholder",
                	username:"{config>/UserName}"
                }),
                headEndItems: 
                    new sap.ui.unified.ShellHeadItem({
                    	icon:"sap-icon://log",
                    	tooltip:"Logoff",
                    	press: oController.logout
                    })
                
			});
		}
});