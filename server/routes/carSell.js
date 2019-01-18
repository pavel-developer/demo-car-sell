const express = require('express');
const { getCarSell, updateCarSell } = require('../controllers/carSell');

const router = express.Router();

router.get('/:id', getCarSell);
router.patch('/:id', updateCarSell);

module.exports = router;
