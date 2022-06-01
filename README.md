# Projet 7 - Groupomania !

7ème et dernier projet de la formation développeur web d'Openclassrooms.
Créer un réseau social d'entreprise.
La stack utilisée pour ce projet:

- VueJs 
- NodeJs + express + mysql

## Frontend

Dans le dossier ouvrez  le terminal de votre éditeur puis exécuter la commande:

    npm install

puis

    npm start serve

si le navigateur ne s'ouvre pas automatiquement allez à :

- http://localhost:8080/

## Backend

Ouvrir le dossier Backend dans le terminal de votre éditeur puis exécuter la commande:

    npm install

puis

    nodemon serve

## Base de données

Se connecter au serveur **MySql** de votre choix.
Exécuter la commande: `create databases groupomania`
Vérifiez les identifiants dans le fichier config.json du dossier Backend puis importer le fichier socialnetwork.sql s'il vous a été fourni :

    mysql -u root -p groupomania < groupomania_31052022.sql


Les informations pour se connecter au compte admin sont  : 
// sebastien.pro210@gmail.com ADRESSE MAIL ADMIN
// Tokenrandom&1 MOT DE PASSE ADMIN

Le compte donne accès à la modification d'un post et la suppression d'un post !

