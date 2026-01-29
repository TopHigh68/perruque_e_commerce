const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ messages: [], message: 'Route messages à implémenter' });
});

module.exports = router;