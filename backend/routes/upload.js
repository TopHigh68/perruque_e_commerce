const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.json({ url: '', message: 'Route upload à implémenter' });
});

module.exports = router;