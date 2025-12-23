"use client"

import { useState, useMemo, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { api } from "@/lib/api"

// Fallback data if API fails
const fallbackAccommodations = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
    name: "Bishoftu Guest House",
    type: "Guest House",
    rating: 4.2,
    pricePerNight: 70,
    image: "/guest-house-cozy.jpg",
    description: "Welcoming guest house with local charm and warm Ethiopian hospitality. Affordable accommodation in central Bishoftu.",
    amenities: ["WiFi", "Breakfast", "Parking", "Garden", "24/7 Reception"],
    bookingUrl: "https://www.booking.com",
  },
]

export default function AccommodationsPage() {
  const [accommodations, setAccommodations] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [minRating, setMinRating] = useState(0)

  const types = ["All", "Hotel", "Guest House", "Resort", "Lodge"]

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const data = await api.getAccommodations()
        setAccommodations(data)
      } catch (error) {
        console.error("Error fetching accommodations:", error)
        setAccommodations(fallbackAccommodations)
      } finally {
        setLoading(false)
      }
    }
    fetchAccommodations()
  }, [])

  const filteredAccommodations = useMemo(() => {
    return accommodations.filter((acc) => {
      const typeMatch = selectedType === "All" || acc.type === selectedType
      const priceMatch = acc.pricePerNight >= priceRange[0] && acc.pricePerNight <= priceRange[1]
      const ratingMatch = acc.rating >= minRating
      return typeMatch && priceMatch && ratingMatch
    })
  }, [accommodations, selectedType, priceRange, minRating])

  return (
    <>
      <Navigation />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/5 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Accommodations</h1>
            <p className="text-lg text-foreground/70">
              Find your perfect stay in Bishoftu with our curated selection of luxury and comfort options.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 shadow-md sticky top-24">
                <h3 className="text-xl font-bold text-foreground mb-6">Filters</h3>

                {/* Type Filter */}
                <div className="mb-8">
                  <h4 className="font-semibold text-foreground mb-3">Type</h4>
                  <div className="space-y-2">
                    {types.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedType === type
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-8">
                  <h4 className="font-semibold text-foreground mb-3">Price per Night</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-foreground/70">Min: ${priceRange[0]}</label>
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-foreground/70">Max: ${priceRange[1]}</label>
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[0, 3.5, 4.0, 4.5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          minRating === rating
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        {rating === 0 ? "All Ratings" : `${rating}+ Stars`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Accommodations Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-foreground/70">
                  {loading ? "Loading..." : `Showing ${filteredAccommodations.length} accommodations`}
                </p>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <p className="text-lg text-foreground/70">Loading accommodations...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAccommodations.map((accommodation) => (
                  <div
                    key={accommodation.id}
                    className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={accommodation.image || "/placeholder.svg"}
                      alt={accommodation.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="text-sm font-semibold text-accent mb-1">{accommodation.type}</div>
                          <h3 className="text-lg font-bold text-foreground">{accommodation.name}</h3>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm font-semibold text-foreground">{accommodation.rating}</span>
                        </div>
                      </div>

                      <p className="text-sm text-foreground/70 mb-4">{accommodation.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {accommodation.amenities.map((amenity, idx) => (
                          <span key={idx} className="text-xs bg-accent/15 text-accent px-2 py-1 rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold text-primary">${accommodation.pricePerNight}</span>
                          <span className="text-sm text-foreground/70">/night</span>
                        </div>
                        <a
                          href={accommodation.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[oklch(0.62_0.2_50)] text-white rounded-lg font-semibold hover:opacity-90 transition-all text-sm"
                        >
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              )}

              {!loading && filteredAccommodations.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-foreground/70">
                    No accommodations match your filters. Try adjusting your criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
