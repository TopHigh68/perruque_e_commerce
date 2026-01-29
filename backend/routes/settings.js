const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ settings: {}, message: 'Route settings à implémenter' });
});

module.exports = router;