const Trajet = require('../models/trajet');
const Livraison = require('../models/livraison');
const { io } = require('../app');

exports.createTrajet = async (req, res) => {
    try {
        const trajet = await Trajet.create(req.body);
        await Livraison.findByIdAndUpdate(req.body.livraison, {
            $push: { trajets: trajet._id }
        });
        io.emit('newTrajet', trajet);  // 🔴 Emit real-time trajet
        res.status(201).json(trajet);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllTrajets = async (req, res) => {
    const trajets = await Trajet.find().populate('livraison');
    res.json(trajets);
};

exports.getTrajet = async (req, res) => {
    const trajet = await Trajet.findById(req.params.id).populate('livraison');
    res.json(trajet);
};

exports.updateTrajet = async (req, res) => {
    const updated = await Trajet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

exports.deleteTrajet = async (req, res) => {
    const trajet = await Trajet.findById(req.params.id);
    await Livraison.findByIdAndUpdate(trajet.livraison, {
        $pull: { trajets: trajet._id }
    });
    await trajet.deleteOne();
    res.json({ message: 'Trajet deleted' });
};
