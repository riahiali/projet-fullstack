const express = require('express');
const router = express.Router();
const trajetController = require('../controller/trajetController');

router.post('/', trajetController.createTrajet);
router.get('/', trajetController.getAllTrajets);
router.get('/:id', trajetController.getTrajet);
router.put('/:id', trajetController.updateTrajet);
router.delete('/:id', trajetController.deleteTrajet);

module.exports = router;
