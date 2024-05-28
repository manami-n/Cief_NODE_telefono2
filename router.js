//Cargar MySQL
//const mysql = require('mysql');
import mysql from 'mysql';
//Cargar Express
//const express = require('express');
import express from 'express';
// Cargar config de rutas
const router = express.Router();

// to be able to use the absolute path.
import path from 'path'; 

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);


// to not to show everyone connection info, adding info in .env and bringing info.
const configMySQL = {
    host: process.env.HOST,
    port: process.env.MYPORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}
// connection information with mysql and using info of configMySQL
const connMySQL = mysql.createConnection(configMySQL)

// ============ SHOWING INDEX =================
router.get("/", (req, res) => {
    //console.log(configMySQL) to check if mysql is connected
    const select = "SELECT * FROM agenda"
    connMySQL.query(select, (err, resultado, fields) => {
      if (err) throw err
      //console.log(resultado);
      res.render("index", {title: "Mi Agenda", datos: resultado })  // {key:value}  
    })
    
    //res.render('index', {title: "Mi Agenda"})
})

// ============ DELETING CONTACT =================
router.get("/borrar/:id", (req, res) => {
    const {id} = req.params;
    const deleteRow = `DELETE FROM agenda WHERE id = ${id}`
    connMySQL.query(deleteRow, (err, resultado, fields) => {
        if (err) throw err
        res.redirect("/")  // Redirect to index page
      })
})


// ============ EDITING CONTACT =================
//Version 1
router.get("/form/:id", (req, res) => {
    const {id} = req.params;
    const select = `SELECT * FROM agenda WHERE id = ${id}`
    
    connMySQL.query(select, (err, resultado, fields) => {
        if (err) throw err
        res.render('form', {
            title: "Editar Contacto Ver.1",
            btn: "Editar",
            id: 1, // switch to change the form to show.
            contacto: resultado[0]
        })
    })
})

//Version 2
router.get("/form/:id/:nombre/:apellido/:telefono/:tipo", (req, res) => {
    const contacto = {
        ...req.params,
    }
    res.render('form', {
        title: "Editar Contacto Ver.2",
        btn: "Editar",
        id: 1, // switch to change the form to show.
        contacto: contacto // cinformation getting from url
    })
})

router.post("/update", (req, res) => {
    const {id, nombre, apellido, telefono, tipo} = req.body // saving the data
    const update = `UPDATE agenda SET nombre = '${nombre}', apellido = '${apellido}', telefono = '${telefono}', tipo = '${tipo}' WHERE id = '${id}'`
    connMySQL.query(update, (err, resultado, fields) => {
        if (err) throw err
        res.redirect("/")  // Redirect to index page
      })

})


// ============ SHOWING FORM =================
router.get("/form", (req, res) => {
    res.render('form', {
        title: "Añadir Contacto",
        btn: "Añadir",
        id: 0 // switch to change the form to show
    })
})

// ============ GETTING INFORMATION FROM THE FORM =================
// getting information from form insert, nad posting it to database
router.post("/insert", (req, res) => {
    console.log(req.body) // showing the info of requested body
    //const nombre = req.body.nombre ... will be one way but need to make many
    const {nombre, apellido, telefono, tipo} = req.body // saving the data
    const insert = `INSERT INTO agenda (nombre, apellido, telefono, tipo) VALUES ('${nombre}','${apellido}','${telefono}','${tipo}')` // inserting to database
    connMySQL.query(insert, (err, resultado, fields) => {
        if (err) throw err
        res.redirect("/")  // Redirect to index page
      })

})



router.use((req,res) => {
    res.status(404).render('404', {title: "Not Found"});
})



//module.exports = router
export default router; //new type