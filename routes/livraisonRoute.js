const express = require('express');
const router = express.Router();
const livraisonController = require('../controller/livraisonController');

// Existing CRUD routes
router.post('/', livraisonController.createLivraison);
router.get('/', livraisonController.getAllLivraisons);
router.get('/:id', livraisonController.getLivraison);
router.put('/:id', livraisonController.updateLivraison);
router.delete('/:id', livraisonController.deleteLivraison);

// 🚀 NEW Features
router.get('/:id/summary', livraisonController.getLivraisonSummary);  // Report
router.get('/filter/search', livraisonController.filterLivraisons);   // Filtering

module.exports = router;
