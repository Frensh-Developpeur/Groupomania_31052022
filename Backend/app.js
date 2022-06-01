// Importation de Express et Mongoose
const express = require('express');


//Appel de Express
const app = express();
const bodyParser = require("body-parser");

//importation des routers
const usersRoutes = require('./routes/users');
const postRoutes = require('./routes/post');

// Importation d'un module qui nous offre des fonctionnalités pour le système de maintenance des fichiers
const path = require('path');
// Connexion à la base de données MongoDB
 const mysql = require('mysql');
 const myConnection = require('express-myconnection');


const optiondb = mysql.createConnection({

   host: "localhost",

   user: "admin",

   password: "",

   database : "Groupomania"

 });
 optiondb.connect(function(err) {
   if (err) throw err;
   console.log("Connecté à la base de données MySQL!");
   
 });
 app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Gestion des erreurs CORS (Cross Origin Ressource Sharing) 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Accès à l'API par ALL
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//Requete envoyer a l 'APi
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Middleware qui donne acces au corps de la requete permet d'utiliser les données de la base de données


// Permet d'accéder au dossier image.
// Par défaut le contenu est bloqué.
// Express.Static permet de pouvoir utiliser les fichiers fournie dans le dossier Images.
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(myConnection(mysql, optiondb, "pool"));
// Création de route
app.use('/api/auth', usersRoutes);
app.use('/api/post', postRoutes);

// Exportation de app.js
module.exports = app;