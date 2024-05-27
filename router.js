//Cargar MySQL
//const mysql = require('mysql');
import mysql from 'mysql';
//Cargar Express
//const express = require('express');
import express from 'express';
// Cargar config de rutas
const router = express.Router();



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

// getting information from form insert, nad posting it to database
router.post("/insert", (req, res) => {
    console.log(req.body) // showing the info of requested body
    //const nombre = req.body.nombre ... will be one way but need to make many
    const {nombre, apellido, telefono, tipo} = req.body // saving the data
    const insert = `INSERT INTO agenda (nombre, apellido, telefono, tipo) VALUES ('${nombre}','${apellido}','${telefono}','${tipo}')` // inserting to database
    connMySQL.query(insert, (err, resultado, fields) => {
        if (err) throw err
        res.render("index", {title: "Mi Agenda", datos: resultado })  // {key:value}  
      })

})

router.get("/form", (req, res) => {
    res.render('form', {
        title: "Formulario"
    })
})

router.use((req,res) => {
    res.status(404).render('404', {title: "Not Found"});
})

//module.exports = router
export default router; //new type