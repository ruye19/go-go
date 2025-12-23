require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Accommodation = require('../models/Accommodation');
const ExploreItem = require('../models/ExploreItem');
const TravelAgency = require('../models/TravelAgency');

// Seed data
const accommodations = [
  {
    name: "Kuriftu Resort & Spa",
    type: "Resort",
    rating: 4.3,
    pricePerNight: 280,
    image: "/kuriftu-resort.jpg",
    description: "Luxury resort with 89 rooms, world-class spa, swimming pools, and cinema. Situated on the shores of Lake Kuriftu with stunning Rift Valley views.",
    amenities: ["Pool", "Spa", "Cinema", "WiFi", "Restaurant", "Bar", "Lake Access"],
    bookingUrl: "https://kurifturesortspa.com",
  },
  {
    name: "Babogaya Resort",
    type: "Resort",
    rating: 4.4,
    pricePerNight: 220,
    image: "/lakeside-resort-water-view.jpg",
    description: "Modern resort with stylish accommodations and lakeside restaurant. Located on the scenic banks of Lake Babogaya.",
    amenities: ["Pool", "Lake Access", "Restaurant", "WiFi", "Bar", "Parking"],
    bookingUrl: "https://www.booking.com",
  },
  {
    name: "Adulala Resort & Spa",
    type: "Resort",
    rating: 4.5,
    pricePerNight: 260,
    image: "/luxury-5-star-resort.jpg",
    description: "Spacious nature-inspired retreat spanning 53,000 square meters along Lake Babogaya. Offers luxurious accommodations and world-class hospitality.",
    amenities: ["Pool", "Spa", "Lake Access", "Restaurant", "WiFi", "Garden", "Parking"],
    bookingUrl: "https://www.booking.com",
  },
  {
    name: "Asham Africa Hotel and Resort",
    type: "Hotel",
    rating: 4.3,
    pricePerNight: 180,
    image: "/heritage-hotel-traditional.jpg",
    description: "Unique hotel featuring rooms themed after various African nations. Includes an art gallery showcasing traditional Ethiopian and African pieces.",
    amenities: ["Restaurant", "Art Gallery", "WiFi", "Parking", "Bar", "Cultural Tours"],
    bookingUrl: "https://www.ashamafrica.com",
  },
  {
    name: "Liesak Resort",
    type: "Resort",
    rating: 4.1,
    pricePerNight: 240,
    image: "/lake-resort.jpg",
    description: "Luxurious resort overlooking Lake Babogaya, combining premium amenities with unparalleled natural beauty. Perfect for families, couples, and corporate groups.",
    amenities: ["Pool", "Lake Access", "Restaurant", "Spa", "WiFi", "Bar", "Conference Facilities"],
    bookingUrl: "https://www.liesakresort.com",
  },
  {
    name: "Dreamland Hotel and Resort",
    type: "Hotel",
    rating: 4.2,
    pricePerNight: 150,
    image: "/luxury-hotel.jpg",
    description: "Comfortable hotel with panoramic views of Lake Bishoftu. Features high standard service and stylish accommodations.",
    amenities: ["WiFi", "Restaurant", "Bar", "Parking", "Lake View", "Room Service"],
    bookingUrl: "https://www.booking.com",
  },
  {
    name: "Pyramid Hotels & Resorts",
    type: "Hotel",
    rating: 4.0,
    pricePerNight: 130,
    image: "/hotel-modern-architecture.jpg",
    description: "Well-established hotel offering comfortable accommodations and various amenities. Recognized for excellent hospitality services in Bishoftu.",
    amenities: ["WiFi", "Restaurant", "Bar", "Parking", "Business Center", "Room Service"],
    bookingUrl: "https://www.booking.com",
  },
  {
    name: "Bishoftu Guest House",
    type: "Guest House",
    rating: 4.2,
    pricePerNight: 70,
    image: "/guest-house-cozy.jpg",
    description: "Welcoming guest house with local charm and warm Ethiopian hospitality. Affordable accommodation in central Bishoftu.",
    amenities: ["WiFi", "Breakfast", "Parking", "Garden", "24/7 Reception"],
    bookingUrl: "https://www.booking.com",
  },
];

const exploreItems = [
  {
    name: 'Adadi Maryam Church',
    category: 'Cultural Site',
    description: 'Ancient rock-hewn church carved from volcanic stone, near Bishoftu.',
    details: 'One of Ethiopia\'s most sacred pilgrimage sites, dating back to the 13th century. Located approximately 40km from Bishoftu, this remarkable rock-hewn church features intricate carvings and holds great historical and religious significance.',
    image: '/adadi-maryam-rock-church-ethiopia.jpg',
    location: 'Near Bishoftu (40km)',
    contact: '',
  },
  {
    name: 'Lake Hora',
    category: 'Natural Wonder',
    description: 'Stunning crater lake perfect for boating and picnicking.',
    details: 'One of Bishoftu\'s beautiful crater lakes offering serene views and recreational activities. The lake is surrounded by lush vegetation and is perfect for boat rides and family picnics. Best visited during the dry season for clear views.',
    image: '/lakeside-resort-water-view.jpg',
    location: 'Bishoftu',
    contact: '',
  },
  {
    name: 'Lake Bishoftu',
    category: 'Natural Wonder',
    description: 'The town\'s namesake crater lake with scenic beauty.',
    details: 'The main crater lake after which the town is named. Offers beautiful panoramic views and is surrounded by resorts and hotels. Perfect for leisurely walks, photography, and enjoying the natural landscape.',
    image: '/bishoftu-landscapes-panorama.jpg',
    location: 'Central Bishoftu',
    contact: '',
  },
  {
    name: 'Lake Babogaya',
    category: 'Natural Wonder',
    description: 'Scenic crater lake surrounded by luxury resorts.',
    details: 'One of the most beautiful crater lakes in Bishoftu, surrounded by several luxury resorts including Babogaya Resort, Adulala Resort, and Liesak Resort. Perfect for water activities, bird watching, and enjoying stunning sunsets.',
    image: '/lake-resort.jpg',
    location: 'Bishoftu',
    contact: '',
  },
  {
    name: 'Mount Ziquala',
    category: 'Natural Wonder',
    description: 'Extinct volcano with monastery and panoramic Rift Valley views.',
    details: 'An extinct volcano located near Bishoftu with a historic monastery at its summit. The challenging hike rewards visitors with breathtaking panoramic views of the Rift Valley. The monastery dates back centuries and offers a unique cultural experience. Guides are recommended for the trek.',
    image: '/mountain-rift-valley-landscape.jpg',
    location: 'Near Bishoftu',
    contact: '',
  },
  {
    name: 'Debre Zeit Market',
    category: 'Cultural Site',
    description: 'Traditional Ethiopian market in the heart of Bishoftu.',
    details: 'Experience the vibrant local market culture of Bishoftu (Debre Zeit). Explore traditional Ethiopian crafts, spices, textiles, and local produce. Interact with local vendors and artisans while immersing yourself in authentic Oromo and Ethiopian culture.',
    image: '/heritage-hotel-traditional.jpg',
    location: 'Bishoftu Town Center',
    contact: '',
  },
  {
    name: 'Bishoftu Tour Guides Association',
    category: 'Travel Agent',
    description: 'Professional local guides for authentic Bishoftu experiences.',
    details: 'Experienced guides offering personalized tours including cultural immersion, adventure hikes, and historical site visits. Available in multiple languages.',
    image: '/bishoftu-adventures.jpg',
    location: 'Bishoftu',
    contact: 'guides@gobisoftu.local',
  },
  {
    name: 'Ethiopia Adventure Travel Co.',
    category: 'Travel Agent',
    description: 'Specialized adventure tour operator for Bishoftu region.',
    details: 'Offering customized tour packages including mountain expeditions, cultural tours, and luxury experiences. Multi-day packages available.',
    image: '/rift-valley-tours.jpg',
    location: 'Bishoftu',
    contact: 'info@ethiopiaadventure.com',
  },
  {
    name: 'Heritage Experiences',
    category: 'Travel Agent',
    description: 'Cultural and historical guided tours throughout Bishoftu.',
    details: 'Deep dives into Ethiopian heritage, ancient history, and local traditions. Expert historians and cultural consultants lead all tours.',
    image: '/ethiopia-travel-experts.jpg',
    location: 'Bishoftu',
    contact: 'heritage@gobisoftu.travel',
  },
];

const travelAgencies = [
  {
    name: "Bishoftu Adventures",
    category: "Tour Operator",
    rating: 4.9,
    image: "/bishoftu-adventures.jpg",
    link: "/agencies/bishoftu-adventures",
  },
  {
    name: "Rift Valley Tours",
    category: "Travel Agency",
    rating: 4.7,
    image: "/rift-valley-tours.jpg",
    link: "/agencies/rift-valley-tours",
  },
  {
    name: "Ethiopia Travel Experts",
    category: "Tour Operator",
    rating: 4.8,
    image: "/ethiopia-travel-experts.jpg",
    link: "/agencies/ethiopia-travel-experts",
  },
];

async function seed() {
  try {
    await connectDB();

    // Clear existing data
    await Accommodation.deleteMany({});
    await ExploreItem.deleteMany({});
    await TravelAgency.deleteMany({});

    // Insert seed data
    await Accommodation.insertMany(accommodations);
    await ExploreItem.insertMany(exploreItems);
    await TravelAgency.insertMany(travelAgencies);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();

