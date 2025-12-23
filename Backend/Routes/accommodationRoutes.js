const express = require('express');
const router = express.Router();
const {
  getAllAccommodations,
  getAccommodation,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
} = require('../Controller/accommodationController');

router.get('/', getAllAccommodations);
router.get('/:id', getAccommodation);
router.post('/', createAccommodation);
router.put('/:id', updateAccommodation);
router.delete('/:id', deleteAccommodation);

module.exports = router;

