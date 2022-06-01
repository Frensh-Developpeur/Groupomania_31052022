//Import de Mongoose
const mongoose = require('mongoose');

/* Création d'un Schéma */
const sauceSchema = mongoose.Schema({
    userId: { type: String, require: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, require: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, require: true },
    dislikes: { type: Number, require: true },
    usersLiked: { type: [String], require: true },
    usersDisliked: { type: [String], require: true }
});

module.exports = mongoose.model('Sauce', sauceSchema);