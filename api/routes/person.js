"use strict"

module.exports = function(app) {
    var person = require("../controller/PersonController");

    app
        .route("/person/:cedula")
        .get(person.readPersonInfo);
}