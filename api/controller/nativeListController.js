"use strict";

var nativeListModel = require("../model/nativeListModel");

exports.getNativeList = function(req, res) {
    nativeListModel.getNativeList(
        req.params.idiomaNombre,
        req.params.idiomaNativo,
        function (err, user) {
        console.log("parametro url" + req.params.idiomaNombre + " " + req.params.idiomaNativo);
        if (err) res.send(err);
        res.json(user);
    }
    );
};