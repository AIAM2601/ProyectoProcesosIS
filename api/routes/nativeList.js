"use strict"

module.exports = function(app) {
    var nativeList = require("../controller/nativeListController");

    app
        .route("/nativeList/:idiomaNombre/:idiomaNativo")
        .get(nativeList.getNativeList);
}