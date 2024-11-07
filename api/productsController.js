// Get list of products
router.get('/', async (req, res) => {
  // Logic to retrieve list of products
  res.status(200).json( { message: 'Product list retrieved successfully' });
});

module.exports = router;
