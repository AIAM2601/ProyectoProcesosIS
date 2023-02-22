"use strict"

const conn = require("../../Conn/database");

var LangPercent = function (LangPercent) {
    this.idiomaNombre = LangPercent.idiomaNombre;
    this.nivelDominio = LangPercent.nivelDominio;
};

LangPercent.getAll = function(result) {
    conn.query("select * from idiomaspersona.persona", function(err, res) {
        if (err) {
            console.log("error ", err);
            result(null, err);
        } else {
            console.log("all info", res) 
            result(null, res);
        }
    });
};

LangPercent.getSpecificInfo = function (idiomaNombre, nivelDominio,  result) { 
    conn.query("select persona.titulo, persona.Nombre, persona.segundoNombre, persona.Apellido, persona.segundoApellido, persona.Sufijo, idioma.idiomaNombre, personaidioma.IdiomaNativo, personaidioma.NivelDominio from persona INNER JOIN personaidioma ON persona.Id = personaidioma.IdPersona INNER JOIN idioma ON  personaidioma.IdIdioma = idioma.Id  where idioma.idiomaNombre = ? and personaidioma.NivelDominio = ? ", 
    [idiomaNombre, 
    nivelDominio], 
    function(err, res){
        if (err) {
            console.log("error", err);
            result(err, null);
        } else {
            result(null, res);
        }
    }
    );
};

module.exports = LangPercent;
/*
Lista de personas que hablan un idioma determinado en al menos cierto porcentaje.
Por ejemplo, se envía el parámetro de idioma 10 (alemán) y un 50 en el nivel de dominio 
y se muestra un listado de todas las personas que tienen conocimiento de ese idioma en al 
menos ese porcentaje, incluyendo el 

-nombre completo en ambos formatos 
-el nombre del idioma
-si es el idioma nativo 
-porcentaje de dominio.
*/