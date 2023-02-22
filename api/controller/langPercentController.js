"use strict";

var langPercentModel = require("../model/langPercentModel");

exports.getAll = function(req, res) {
    langPercentModel.getAll(function (err, getAll) {
        console.log("controller");
        if (err) res.send(err);
        console.log("res", getAll);
        res.send(getAll);
    });
};

exports.readLangPercent = function(req, res) {
    langPercentModel.getSpecificInfo(
        req.params.idiomaNombre, 
        req.params.nivelDominio,
        function(err, user) {
            console.log("parametro del url " + "nombre idioma: " + req.params.idiomaNombre, "nivel dominio: " + req.params.nivelDominio); //
            if (err) res.send(err);
            res.json(user);
        }
    );
};