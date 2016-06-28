sap.ui.controller("view.Nav", {
    onAfterRendering: function() {
    	if (gSelection !== 'null') {
			this.loadContent(gSelection);
		}
	},
	
	escapeHtml: function(string) {
		var entityMap = {
	            "&": "&amp;",
	            "<": "&lt;",
	            ">": "&gt;",
	           "\"": "&quot;",
	            "'": "&#39;",
	            "/": "&#x2F;",
	            "{": "&#123;",
	            "}": "&#125",
	            ";": "&#59",
	            ":": "&#58"
	        };

		
        return String(string).replace(/[&<>"'\/{};:]/g, function(s) {
            return entityMap[s];
        });
	}, 
	
	viewObjects: function(oEvent){
		var sId = oEvent.getParameter("id");
    	var oController = sap.ui.getCore().byId("Nav").getController();
    	oController.loadContent(sId);
	},
	
	
	loadContent: function(sId){
		var oExerciseJSON = sap.ui.getCore().getModel("exercises").getData();
    	var oController = sap.ui.getCore().byId("Nav").getController();
		
		for ( var i = 0; i < oExerciseJSON.exercises.length; i++) {
			for ( var isub = 0; isub < oExerciseJSON.exercises[i].steps.length; isub++) {
				if (oExerciseJSON.exercises[i].steps[isub].key.toLowerCase() === sId.toLowerCase()) {
					
					var ShortUrl = '/rest/file/';
				 	var package = oExerciseJSON.exercises[i].steps[isub].package;
					//var lPath = package.replace(/[.]/g, '/');
					var aUrl = ShortUrl + package;
					aUrl = aUrl + '/'
					+ oExerciseJSON.exercises[i].steps[isub].object;
					//+ '.'
					//+ oExerciseJSON.exercises[i].steps[isub].extension;	
					var title =  oExerciseJSON.exercises[i].steps[isub].text;
						
					// var oSapBackPack = new Object();
			        // oSapBackPack.Workspace='SHINE_DATA';
			        // var sapBackPack = JSON.stringify(oSapBackPack);

					jQuery.ajax({
						url : aUrl,
						method : 'GET',
						dataType : 'text',
					//	headers : {
		            //        "SapBackPack" : sapBackPack,
		            //    },						
						success : function(oEvent){oController.onInsertContent(oEvent,title)},
						error : oController.onErrorCall,
						async : true
					});
				}
			}
		}			
	},
	
	onInsertContent: function(myTXT,title) {
		sap.ui.getCore().byId("Empty--PanelContent").removeAllContent();
		sap.ui.getCore().byId("Empty--PanelContent").setHeaderText("Source Code Template");
    	var oController = sap.ui.getCore().byId("Nav").getController();
    	var userName = sap.ui.getCore().getModel("config").getData().UserName;
	    var parts = userName.split("_");
	    var grpNumber = parts[1];
	    if (typeof(grpNumber) != 'undefined' && grpNumber != null){
	    	myTXT = myTXT.replace(/<group number>/g,grpNumber);
	    	myTXT = myTXT.replace(/<group_number>/g,grpNumber);  
	    	myTXT = myTXT.replace(/<group>/g,grpNumber);     	
	    	myTXT = myTXT.replace(/<Your User>/g,gUserName);
	   	}
	    var newContent = oController.escapeHtml(myTXT);
		var html = new sap.ui.core.HTML({
			// static content
			content : '<div class="wiki"><div class="code"><pre>'
					+ newContent + '\n' + '</pre></div></div>',
			preferDOM : false
		});
		sap.ui.getCore().byId("Empty--PanelContent").setHeaderText("Source Code Template: " + title);
        sap.ui.getCore().byId("Empty--PanelContent").addContent(html); 
	},	
	
    onErrorCall: function(jqXHR) {
        if (jqXHR.responseText === "NaN") {
            sap.m.MessageBox.alert("Invalid Input Value");
        } else {
            sap.m.MessageBox.alert(escape(jqXHR.responseText) );
        }
        return;
    }
});