"use strict"

const conn = require("../../Conn/database");

var Person = function (Person) {
    this.cedula = Person.cedula;
    // this.titulo = Person.titulo;
    // this.Nombre = Person.Nombre;
    // this.SegundoNombre = Person.SegundoNombre;
    // this.apellido = Person.apellido;
    // this.SegundoApellido = Person.SegundoApellido;
    // this.Sufijo = Person.Sufijo;
    // this.email = Person.email;
    // this.fechaNacimiento = Person.fechaNacimiento;
};

Person.getPersonInfo = function (cedula, result) {
    conn.query("select p.Id, p.cedula, p.titulo, p.Nombre, p.SegundoNombre, p.Apellido, p.SegundoApellido, p.sufijo, p.Email, p.FechaNacimiento, pi.IdiomaNativo, pi.NivelDominio, i.idiomaNombre, i.Siglas, i.EsLengRomance from persona p INNER JOIN personaidioma pi ON p.Id = pi.IdPersona INNER JOIN idioma i ON  pi.IdIdioma = i.Id  where p.cedula = ? ",
    [cedula], 
    function (err, res) {
        if (err) {
            console.log("error", err);
            result(err, null);
        } else {
            result(null, res);
        }
    }
    );
};


// Person.getPersonInfo = function (cedula, result) {
//     conn.query("select p.Id, p.cedula, p.titulo, p.Nombre, p.SegundoNombre, p.Apellido, p.SegundoApellido, p.sufijo, p.Email, p.FechaNacimiento, group_concat(`IdiomaNativo`) as IdiomaNativo,  group_concat(`NivelDominio`) as NivelDominio, group_concat(`idiomaNombre`) AS idiomaNombre, group_concat(`Siglas`) as Sigla  from persona p INNER JOIN personaidioma pi ON p.Id = pi.IdPersona INNER JOIN idioma i ON  pi.IdIdioma = i.Id  where p.cedula = ? group by p.Id",
//     [cedula], 
//     function (err, res) {
//         if (err) {
//             console.log("error", err);
//             result(err, null);
//         } else {
//             result(null, res);
//         }
//     }
//     );
// };

module.exports = Person;