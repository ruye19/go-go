const express = require('express');
const router = express.Router();
const {
  getAllTravelAgencies,
  getTravelAgency,
  createTravelAgency,
  updateTravelAgency,
  deleteTravelAgency,
} = require('../Controller/travelAgencyController');

router.get('/', getAllTravelAgencies);
router.get('/:id', getTravelAgency);
router.post('/', createTravelAgency);
router.put('/:id', updateTravelAgency);
router.delete('/:id', deleteTravelAgency);

module.exports = router;

