const express = require('express');
var cors = require('cors'); //added cors
const app = express();

const port = process.env.PORT || 8080
var bodyParser = require("body-parser");

app.listen(8080, () => console.log(`listening to port ${port}`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(cors()); //added cors

var langPercent = require("../api/routes/langPercentRoute");
langPercent(app);

var Person = require("../api/routes/person");
Person(app);

var nativeList = require("../api/routes/nativeList");
nativeList(app);
//installation express, body parser, cors, mysql