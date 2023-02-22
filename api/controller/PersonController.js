"use strict";

var PersonModel = require("../model/personModel");

exports.readPersonInfo = function(req, res) {
    PersonModel.getPersonInfo(
        req.params.cedula,
        function(err, user) {
            console.log("param url " + req.params.cedula);
            if (err) res.send(err);
            res.json(user);
        }
    )
}