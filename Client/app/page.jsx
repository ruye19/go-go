"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { api } from "@/lib/api"

// Fallback data if API fails
const fallbackHotels = [
  {
    id: 1,
    name: "Kuriftu Resort & Spa",
    type: "Resort",
    description: "Luxury resort with 89 rooms, spa, pools, and cinema on Lake Kuriftu shores.",
    image: "/kuriftu-resort.jpg",
    link: "/accommodations",
  },
  {
    id: 2,
    name: "Babogaya Resort",
    type: "Resort",
    description: "Modern lakeside resort with stylish accommodations overlooking Lake Babogaya.",
    image: "/lakeside-resort-water-view.jpg",
    link: "/accommodations",
  },
  {
    id: 3,
    name: "Adulala Resort & Spa",
    type: "Resort",
    description: "Spacious nature-inspired retreat along Lake Babogaya with world-class hospitality.",
    image: "/luxury-5-star-resort.jpg",
    link: "/accommodations",
  },
  {
    id: 4,
    name: "Asham Africa Hotel",
    type: "Hotel",
    description: "Unique African-themed rooms with art gallery showcasing traditional pieces.",
    image: "/heritage-hotel-traditional.jpg",
    link: "/accommodations",
  },
]

const fallbackAgencies = [
  {
    id: 1,
    name: "Bishoftu Adventures",
    category: "Tour Operator",
    rating: 4.9,
    image: "/bishoftu-adventures.jpg",
    link: "/agencies/bishoftu-adventures"
  },
  {
    id: 2,
    name: "Rift Valley Tours",
    category: "Travel Agency",
    rating: 4.7,
    image: "/rift-valley-tours.jpg",
    link: "/agencies/rift-valley-tours"
  },
  {
    id: 3,
    name: "Ethiopia Travel Experts",
    category: "Tour Operator",
    rating: 4.8,
    image: "/ethiopia-travel-experts.jpg",
    link: "/agencies/ethiopia-travel-experts"
  }
]

export default function Home() {
  const [hotels, setHotels] = useState([])
  const [agencies, setAgencies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hotelsData, agenciesData] = await Promise.all([
          api.getAccommodations().catch(() => []),
          api.getTravelAgencies().catch(() => []),
        ])
        setHotels(hotelsData.slice(0, 4)) // Get first 4 for homepage
        setAgencies(agenciesData)
      } catch (error) {
        console.error("Error fetching data:", error)
        setHotels(fallbackHotels)
        setAgencies(fallbackAgencies)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const displayHotels = hotels.length > 0 ? hotels : fallbackHotels
  const displayAgencies = agencies.length > 0 ? agencies : fallbackAgencies

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                  Discover the Soul of Ethiopia/Bishoftu
                </h1>
                <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                  Experience luxury and adventure in Bishoftu. Explore stunning natural wonders, ancient cultural sites,
                  and authentic Ethiopian hospitality. Your journey to unforgettable memories starts here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/accommodations"
                    className="px-8 py-3 bg-[#D4AF37] text-[#123845] rounded-lg font-semibold hover:shadow-lg hover:opacity-90 transition-all text-center"
                  >
                    Browse Accommodations
                  </Link>
                  <Link
                    href="/explore"
                    className="px-8 py-3 border-2 border-[#123845] text-[#123845] rounded-lg font-semibold hover:bg-[#123845]/10 transition-all text-center"
                  >
                    Explore Sites
                  </Link>
                </div>
              </div>
              <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="/kuriftu-resort.jpg"
                  alt="Bishoftu crater lakes and landscape"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* About Us Section */}
<section className="min-h-screen flex items-center justify-center bg-background/50">
  <div className="max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About Us</h2>
    <p className="text-lg text-foreground/70 leading-relaxed">
      At Bishoftu Explorer, we connect travelers with the best hotels, resorts, and travel agencies in Bishoftu.
      Our mission is to make planning your trip easy, reliable, and unforgettable. Discover comfort, adventure, and
      authentic Ethiopian hospitality all in one platform.
    </p>
    <h4 className="text-center my-4">
      "WE CAN PUT OUR MAJOR PARTNERS HERE"
    </h4>
  </div>
  
    

</section>


        {/* Featured Places */}
        <section className="py-16 md:py-24 bg-background">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Hotels & Resorts</h2>
      <p className="text-lg text-foreground/70">Top places to stay for a comfortable Bishoftu experience</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayHotels.map((hotel) => (
        <div
          key={hotel._id || hotel.id}
          className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-40 object-cover" />
          <div className="p-6">
            <div className="text-sm font-semibold text-primary mb-2">{hotel.type}</div>
            <h3 className="text-xl font-bold text-foreground mb-2">{hotel.name}</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">{hotel.description || "Comfortable accommodation in Bishoftu."}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  <div className="text-center my-12">
              <Link
                href="/accommodations"
                className="px-8 py-3 my-3 bg-[#D4AF37] text-[#123845] rounded-lg font-semibold hover:shadow-lg hover:opacity-90 transition-all inline-block"
              >
                Explore All Accommodations
              </Link>
            </div>

        {/* <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Iconic Destinations</h2>
              <p className="text-lg text-foreground/70">Must-visit attractions that define the Bishoftu experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPlaces.map((place) => (
                <div
                  key={place.id}
                  className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <img src={place.image || "/placeholder.svg"} alt={place.name} className="w-full h-40 object-cover" />
                  <div className="p-6">
                    <div className="text-sm font-semibold text-primary mb-2">{place.type}</div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{place.name}</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">{place.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Featured Companies */}


        {/* <section className="py-16 md:py-24 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Accommodations</h2>
              <p className="text-lg text-foreground/70">Handpicked luxury stays for your Bishoftu adventure</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCompanies.map((company) => (
                <div
                  key={company.id}
                  className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={company.image || "/placeholder.svg"}
                    alt={company.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-sm font-semibold text-accent">{company.category}</div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-semibold text-foreground">{company.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">{company.name}</h3>
                    <Link
                      href="/accommodations"
                      className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div> */}
<section className="py-16 md:py-24 bg-secondary/30">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Top Tour & Travel Agencies</h2>
      <p className="text-lg text-foreground/70">Reliable agencies to plan your perfect Bishoftu experience</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {displayAgencies.map((agency) => (
        <div
          key={agency._id || agency.id}
          className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
        >
          <img
            src={agency.image || "/placeholder.svg"}
            alt={agency.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div className="text-sm font-semibold text-accent">{agency.category}</div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="text-sm font-semibold text-foreground">{agency.rating}</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">{agency.name}</h3>
            <Link
              href={agency.link}
              className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Visit Agency
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

          
          {/* </div>
        </section> */}
      </main>
      <Footer />
    </>
  )
}
