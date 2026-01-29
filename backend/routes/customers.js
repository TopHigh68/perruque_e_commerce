const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ customers: [], message: 'Route customers à implémenter' });
});

module.exports = router;