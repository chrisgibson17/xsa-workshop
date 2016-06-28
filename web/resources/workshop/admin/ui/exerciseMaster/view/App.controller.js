/*eslint no-console: 0, no-unused-vars: 0, no-use-before-define: 0, no-redeclare: 0, no-undef: 0*/
//To use a javascript controller its name must end with .controller.js
sap.ui.controller("view.App", {
    onInit: function(){
    },
    
    logout: function() {
        var aUrl = "/sap/hana/xs/formLogin/token.xsjs";
        jQuery.ajax({
            url: aUrl,
            method: "GET",
            dataType: "text",
            beforeSend: function(jqXHR) {
                jqXHR.setRequestHeader("X-CSRF-Token", "Fetch");
            },
            success: function(arg1, arg2, jqXHR) {
                var aUrl = "/sap/hana/xs/formLogin/logout.xscfunc";
                jQuery.ajax({
                    url: aUrl,
                    type: "POST",
                    dataType: "text",
                    beforeSend: function(jqXHR1, settings) {
                        jqXHR1.setRequestHeader("X-CSRF-Token", jqXHR.getResponseHeader("X-CSRF-Token"));
                    },
                    success: function() {
                        location.reload();
                    },
                    error: function() {

                    }
                });

            },
            error: function() {

            }
        });
    } 
});