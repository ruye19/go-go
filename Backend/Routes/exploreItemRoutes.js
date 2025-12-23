const express = require('express');
const router = express.Router();
const {
  getAllExploreItems,
  getExploreItem,
  createExploreItem,
  updateExploreItem,
  deleteExploreItem,
} = require('../Controller/exploreItemController');

router.get('/', getAllExploreItems);
router.get('/:id', getExploreItem);
router.post('/', createExploreItem);
router.put('/:id', updateExploreItem);
router.delete('/:id', deleteExploreItem);

module.exports = router;

