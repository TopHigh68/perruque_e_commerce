const express = require('express');
const router = express.Router();

// Routes temporaires qui retournent des données mockées
// À remplacer par de vraies implémentations avec base de données

// GET /api/orders
router.get('/', (req, res) => {
  res.json({ orders: [], message: 'Route orders à implémenter' });
});

module.exports = router;