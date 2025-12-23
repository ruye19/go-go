const TravelAgency = require('../models/TravelAgency');

// Get all travel agencies
exports.getAllTravelAgencies = async (req, res) => {
  try {
    const agencies = await TravelAgency.find().sort({ createdAt: -1 });
    res.json(agencies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single travel agency
exports.getTravelAgency = async (req, res) => {
  try {
    const agency = await TravelAgency.findById(req.params.id);
    if (!agency) {
      return res.status(404).json({ error: 'Travel agency not found' });
    }
    res.json(agency);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create travel agency
exports.createTravelAgency = async (req, res) => {
  try {
    const agency = new TravelAgency(req.body);
    await agency.save();
    res.status(201).json(agency);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update travel agency
exports.updateTravelAgency = async (req, res) => {
  try {
    const agency = await TravelAgency.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!agency) {
      return res.status(404).json({ error: 'Travel agency not found' });
    }
    res.json(agency);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete travel agency
exports.deleteTravelAgency = async (req, res) => {
  try {
    const agency = await TravelAgency.findByIdAndDelete(req.params.id);
    if (!agency) {
      return res.status(404).json({ error: 'Travel agency not found' });
    }
    res.json({ message: 'Travel agency deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

