const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Hotel', 'Resort', 'Lodge', 'Guest House'],
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  pricePerNight: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amenities: [{
    type: String,
  }],
  bookingUrl: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Accommodation', accommodationSchema);

