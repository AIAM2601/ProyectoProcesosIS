/*****insert******/
insert into idiomaspersona.persona (cedula, titulo, Nombre, segundoNombre, Apellido, segundoApellido, Sufijo, Email, FechaNacimiento) values ("117330590", "Mr", "Andres", "Ignacio", "Aguilar", "Masis", "I", "andres@gmail.com", '1999-01-26');
insert into idiomaspersona.persona (cedula, titulo, Nombre, segundoNombre, Apellido, segundoApellido, Sufijo, Email, FechaNacimiento) values ("123456789",  "Mr", "Andres2", "Ignacio",  "Aguilar2", "Masis", "II", "andres2@gmail.com", '1999-01-26');
insert into idiomaspersona.persona (cedula, titulo, Nombre, segundoNombre, Apellido, segundoApellido, Sufijo, Email, FechaNacimiento) values ("117330599", "Mr", "Andres3",  "Ignacio", "Aguilar3", "Masis", "III", "andres4@gmail.com", '1999-01-26');

insert into idiomaspersona.idioma (idiomaNombre, siglas, eslengromance) values ("español", "esp", true);
insert into idiomaspersona.idioma (idiomaNombre, siglas, eslengromance) values ("ingles", "eng", false);
insert into idiomaspersona.idioma (idiomaNombre, siglas, eslengromance) values ("aleman", "ger", false);

insert into idiomaspersona.personaidioma (idpersona, ididioma, idiomaNativo, NivelDominio) values ("1", "1", true, 100);
insert into idiomaspersona.personaidioma (idpersona, ididioma, idiomaNativo, NivelDominio) values ("2", "2", false, 50);
insert into idiomaspersona.personaidioma (idpersona, ididioma, idiomaNativo, NivelDominio) values ("3", "1", true, 100);

insert into idiomaspersona.personaidioma (idpersona, ididioma, idiomaNativo, NivelDominio) values ("1", "2", true, 100);

/*****selects******/

select * from persona;
select * from idioma;
select * from personaidioma;
select * from idiomaspersona.persona, idiomaspersona.idioma, idiomaspersona.personaidioma;
select * from idiomaspersona.persona, idioma where idioma.Nombre = "ingles";
/******specific selects*****/

/**primer select lo unico que se cambiaria seria donde esta el where para agarrar los parametros del nombre del idioma y el nivel de dominio de la persona*/

select persona.Nombre, persona.Apellido, idioma.idiomaNombre, personaidioma.IdiomaNativo, personaidioma.NivelDominio
        from persona 
        INNER JOIN personaidioma
        ON persona.Id = personaidioma.IdPersona
        INNER JOIN idioma
        ON  personaidioma.IdIdioma = idioma.Id 
        where idioma.idiomaNombre = "ingles" and personaidioma.NivelDominio = 50; 
        
/**select completo de la persona con su idioma y todo y busca por cedula ***/
select p.Id, p.cedula, p.titulo, p.Nombre, p.SegundoNombre, p.Apellido, p.SegundoApellido,
	   p.sufijo, p.Email, p.FechaNacimiento, pi.IdiomaNativo, pi.NivelDominio, i.idiomaNombre, i.Siglas, i.EsLengRomance
        from persona p
        INNER JOIN personaidioma pi
        ON p.Id = pi.IdPersona
        INNER JOIN idioma i
        ON  pi.IdIdioma = i.Id 
        where p.cedula = "117330590"; 
        
        
/**select completo de la persona con su idioma y todo y busca por cedula y concatena por idioma***/
select p.Id, p.cedula, p.titulo, p.Nombre, p.SegundoNombre, p.Apellido, p.SegundoApellido,
	   p.sufijo, p.Email, p.FechaNacimiento, group_concat(`IdiomaNativo`) as IdiomaNativo, 
       group_concat(`NivelDominio`) as NivelDominio, group_concat(`idiomaNombre`) AS idiomaNombre,
       group_concat(`Siglas`) as Sigla
        from persona p
        INNER JOIN personaidioma pi
        ON p.Id = pi.IdPersona
        INNER JOIN idioma i
        ON  pi.IdIdioma = i.Id 
        where p.cedula = "117330590" group by p.Id; 
        


/**select de idioma de manera nativa y nombre ***/
select  persona.Nombre, persona.SegundoNombre, persona.Apellido, persona.SegundoApellido
        from persona 
        INNER JOIN personaidioma
        ON persona.Id = personaidioma.IdPersona
        INNER JOIN idioma
        ON  personaidioma.IdIdioma = idioma.Id 
        where idioma.idiomaNombre = "ingles" and personaidioma.IdiomaNativo = 0;
        
        
/**test***/	
select * from persona INNER JOIN personaidioma 
ON persona.Id = personaidioma.IdPersona INNER JOIN idioma 
ON  personaidioma.IdIdioma = idioma.Id  where idioma.idiomaNombre = 'español' and personaidioma.NivelDominio = 100;


/****para borrar***/
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE idioma;
TRUNCATE personaidioma;
TRUNCATE persona;

SET FOREIGN_KEY_CHECKS = 1;