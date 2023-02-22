"use strict"

module.exports = function(app) {
    var langPercent = require("../controller/langPercentController");

    app
        .route("/info")
        .get(langPercent.getAll);

    app
        .route("/langpercent/:idiomaNombre/:nivelDominio") 
        .get(langPercent.readLangPercent);
    
}