const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export const api = {
  // Accommodations
  getAccommodations: async () => {
    const res = await fetch(`${API_URL}/accommodations`)
    if (!res.ok) throw new Error('Failed to fetch accommodations')
    return res.json()
  },

  // Explore Items
  getExploreItems: async () => {
    const res = await fetch(`${API_URL}/explore`)
    if (!res.ok) throw new Error('Failed to fetch explore items')
    return res.json()
  },

  // Travel Agencies
  getTravelAgencies: async () => {
    const res = await fetch(`${API_URL}/travel-agencies`)
    if (!res.ok) throw new Error('Failed to fetch travel agencies')
    return res.json()
  },
}

