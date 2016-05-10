/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";

var xsjs  = require("sap-xsjs");
var xsenv = require("sap-xsenv");
var port  = process.env.PORT || 3000;
var server = require("http").createServer();
var express = require("express");
var node = require("./myNode"); 

//Create base Express Server App
var app = express(); 
app.use("/rest", node());

var options = xsjs.extend({
	//anonymous : true, // remove to authenticate calls
	redirectUrl : "/index.xsjs"
});
// configure HANA
options = xsjs.extend(options, xsenv.getServices({ hana: {tag: "hana"} }));
// configure UAA
options = xsjs.extend(options, xsenv.getServices({ uaa: {tag: "xsuaa"} }));

//Add XSJS to the base app
var xsjsApp = xsjs(options);
app.use(xsjsApp);

server.on("request", app);
server.listen(port, function () {
    console.log("HTTP Server: " + server.address().port );
});
