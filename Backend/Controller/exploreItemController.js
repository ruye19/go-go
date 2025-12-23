const ExploreItem = require('../models/ExploreItem');

// Get all explore items
exports.getAllExploreItems = async (req, res) => {
  try {
    const items = await ExploreItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single explore item
exports.getExploreItem = async (req, res) => {
  try {
    const item = await ExploreItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Explore item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create explore item
exports.createExploreItem = async (req, res) => {
  try {
    const item = new ExploreItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update explore item
exports.updateExploreItem = async (req, res) => {
  try {
    const item = await ExploreItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) {
      return res.status(404).json({ error: 'Explore item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete explore item
exports.deleteExploreItem = async (req, res) => {
  try {
    const item = await ExploreItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Explore item not found' });
    }
    res.json({ message: 'Explore item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

