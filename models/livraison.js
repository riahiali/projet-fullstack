const mongoose = require('mongoose');

const livraisonSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    destination: { type: String, required: true },
    trajets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trajet' }]
}, { timestamps: true });

module.exports = mongoose.model('Livraison', livraisonSchema);
