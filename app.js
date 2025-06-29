const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();
require('./config/db');
const twig = require('twig');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);          // 🔄 Create HTTP server
const io = socketIo(server);                    // 🔌 Attach Socket.IO to server

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'twig');
app.set('views', './views');

// Serve static files if needed
app.use(express.static('public'));

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('🟢 A client connected');

  socket.on('disconnect', () => {
    console.log('🔴 A client disconnected');
  });
});

// Export io to use in other files
module.exports = { io };

// Routes
app.use('/api/livraisons', require('./routes/livraisonRoute'));
app.use('/api/trajets', require('./routes/trajetRoute'));

// Views
const Livraison = require('./models/livraison');
const Trajet = require('./models/trajet');

app.get('/', async (req, res) => {
  const livraisons = await Livraison.find().populate('trajets');
  res.render('livraisons', { livraisons });
});

app.get('/livraisons/:id', async (req, res) => {
  const livraison = await Livraison.findById(req.params.id).populate('trajets');
  res.render('livraison_detail', { livraison });
});

app.get('/trajets', async (req, res) => {
  const trajets = await Trajet.find().populate('livraison');
  res.render('trajets', { trajets });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
