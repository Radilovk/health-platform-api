
const express = require('express');
const router = express.Router();

// Get list of recent articles
router.get('/', async (req, res) => {
  // Logic to retrieve recent articles
  res.status(200).json({ message: 'Recent articles retrieved successfully' });
});

// export default router
module.exports = router;
