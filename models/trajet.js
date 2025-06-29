const mongoose = require('mongoose');

const trajetSchema = new mongoose.Schema({
    livraison: { type: mongoose.Schema.Types.ObjectId, ref: 'Livraison' },
    distance: Number,
    duration: String,
    path: String
}, { timestamps: true });

module.exports = mongoose.model('Trajet', trajetSchema);
