"use strict"

const conn = require("../../Conn/database");

var nativeList = function(nativeList) {
    this.idiomaNombre = nativeList.idiomaNombre;
    this.idiomaNativo = nativeList.idiomaNativo;
}

nativeList.getNativeList = function(idiomaNombre, idiomaNativo, result) {
    conn.query("select  persona.Nombre,  persona.SegundoNombre, persona.Apellido, persona.SegundoApellido from persona  INNER JOIN personaidioma ON persona.Id = personaidioma.IdPersona INNER JOIN idioma ON  personaidioma.IdIdioma = idioma.Id  where idioma.idiomaNombre = ? and personaidioma.IdiomaNativo = ? ", 
    [idiomaNombre, idiomaNativo],
    function(err, res) {
        if (err) {
            console.log("error", err);
            result(err, null);
        } else {
            result(null, res);
        }
    }
    );
};

module.exports = nativeList;