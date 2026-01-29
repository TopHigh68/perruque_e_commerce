const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ analytics: {}, message: 'Route analytics à implémenter' });
});

module.exports = router;