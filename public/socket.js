const socket = io();

// Listen for new livraisons
socket.on('newLivraison', (livraison) => {
  alert(`📦 New Livraison to ${livraison.destination} on ${livraison.date}`);
  // Optionally refresh or update UI dynamically
});

// Listen for new trajets
socket.on('newTrajet', (trajet) => {
  alert(`🛣️ New Trajet: ${trajet.path} (${trajet.distance} km, ${trajet.duration})`);
});
