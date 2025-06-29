const Livraison = require('../models/livraison');
const Trajet = require('../models/trajet');
const { parseDuration, formatDuration } = require('../utils/durationUtils');
const { io } = require('../app'); // Import io to emit events

exports.createLivraison = async (req, res) => {
    try {
        const livraison = await Livraison.create(req.body);
        io.emit('newLivraison', livraison); // 🔴 Real-time broadcast
        res.status(201).json(livraison);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllLivraisons = async (req, res) => {
    const livraisons = await Livraison.find().populate('trajets');
    res.json(livraisons);
};

exports.getLivraison = async (req, res) => {
    const livraison = await Livraison.findById(req.params.id).populate('trajets');
    res.json(livraison);
};

exports.updateLivraison = async (req, res) => {
    const updated = await Livraison.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

exports.deleteLivraison = async (req, res) => {
    await Livraison.findByIdAndDelete(req.params.id);
    res.json({ message: 'Livraison deleted' });
};

exports.getLivraisonSummary = async (req, res) => {
    try {
        const livraison = await Livraison.findById(req.params.id).populate('trajets');
        if (!livraison) return res.status(404).json({ error: "Livraison not found" });

        let totalDistance = 0;
        let totalDurationMin = 0;

        livraison.trajets.forEach(trajet => {
            totalDistance += trajet.distance || 0;
            totalDurationMin += parseDuration(trajet.duration || "0h 0m");
        });

        const summary = {
            id: livraison._id,
            destination: livraison.destination,
            date: livraison.date,
            trajets: livraison.trajets,
            totalDistance: `${totalDistance} km`,
            totalDuration: formatDuration(totalDurationMin)
        };

        res.json(summary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.filterLivraisons = async (req, res) => {
    try {
        const { destination, startDate, endDate } = req.query;
        const query = {};

        if (destination) query.destination = { $regex: destination, $options: 'i' };
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        const results = await Livraison.find(query).populate('trajets');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
