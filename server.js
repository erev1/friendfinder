// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var htmlRouter = require("./app/routing/htmlRoutes.js")
var apiRouter = require("./app/routing/apiRoutes.js")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// // Sets up the Express app to handle data parsing


app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use("/", htmlRouter)
app.use("/api", apiRouter)

app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});