"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("accommodations")
  const [accommodations, setAccommodations] = useState([])
  const [exploreItems, setExploreItems] = useState([])
  const [travelAgencies, setTravelAgencies] = useState([])
  const [loading, setLoading] = useState(false)

  // Accommodation form state
  const [accForm, setAccForm] = useState({
    name: "",
    type: "Hotel",
    rating: 4.0,
    pricePerNight: 0,
    image: "",
    description: "",
    amenities: "",
    bookingUrl: "",
  })
  const [editingAcc, setEditingAcc] = useState(null)

  // Explore item form state
  const [exploreForm, setExploreForm] = useState({
    name: "",
    category: "Cultural Site",
    description: "",
    details: "",
    image: "",
    location: "",
    contact: "",
  })
  const [editingExplore, setEditingExplore] = useState(null)

  // Travel agency form state
  const [agencyForm, setAgencyForm] = useState({
    name: "",
    category: "Tour Operator",
    rating: 4.5,
    image: "",
    link: "",
  })
  const [editingAgency, setEditingAgency] = useState(null)

  // Fetch data
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [accRes, exploreRes, agencyRes] = await Promise.all([
        fetch(`${API_URL}/accommodations`),
        fetch(`${API_URL}/explore`),
        fetch(`${API_URL}/travel-agencies`),
      ])
      const accData = await accRes.json()
      const exploreData = await exploreRes.json()
      const agencyData = await agencyRes.json()
      setAccommodations(accData)
      setExploreItems(exploreData)
      setTravelAgencies(agencyData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Accommodation handlers
  const handleAccSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const amenities = accForm.amenities.split(",").map((a) => a.trim()).filter(Boolean)
      const data = { ...accForm, amenities }
      const url = editingAcc
        ? `${API_URL}/accommodations/${editingAcc._id}`
        : `${API_URL}/accommodations`
      const method = editingAcc ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        await fetchData()
        setAccForm({
          name: "",
          type: "Hotel",
          rating: 4.0,
          pricePerNight: 0,
          image: "",
          description: "",
          amenities: "",
          bookingUrl: "",
        })
        setEditingAcc(null)
      }
    } catch (error) {
      console.error("Error saving accommodation:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAccDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this accommodation?")) return
    setLoading(true)
    try {
      await fetch(`${API_URL}/accommodations/${id}`, { method: "DELETE" })
      await fetchData()
    } catch (error) {
      console.error("Error deleting accommodation:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAccEdit = (acc) => {
    setEditingAcc(acc)
    setAccForm({
      ...acc,
      amenities: acc.amenities.join(", "),
    })
  }

  // Explore item handlers
  const handleExploreSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = editingExplore
        ? `${API_URL}/explore/${editingExplore._id}`
        : `${API_URL}/explore`
      const method = editingExplore ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exploreForm),
      })

      if (res.ok) {
        await fetchData()
        setExploreForm({
          name: "",
          category: "Cultural Site",
          description: "",
          details: "",
          image: "",
          location: "",
          contact: "",
        })
        setEditingExplore(null)
      }
    } catch (error) {
      console.error("Error saving explore item:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleExploreDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return
    setLoading(true)
    try {
      await fetch(`${API_URL}/explore/${id}`, { method: "DELETE" })
      await fetchData()
    } catch (error) {
      console.error("Error deleting explore item:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleExploreEdit = (item) => {
    setEditingExplore(item)
    setExploreForm(item)
  }

  // Travel agency handlers
  const handleAgencySubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = editingAgency
        ? `${API_URL}/travel-agencies/${editingAgency._id}`
        : `${API_URL}/travel-agencies`
      const method = editingAgency ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agencyForm),
      })

      if (res.ok) {
        await fetchData()
        setAgencyForm({
          name: "",
          category: "Tour Operator",
          rating: 4.5,
          image: "",
          link: "",
        })
        setEditingAgency(null)
      }
    } catch (error) {
      console.error("Error saving travel agency:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAgencyDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this travel agency?")) return
    setLoading(true)
    try {
      await fetch(`${API_URL}/travel-agencies/${id}`, { method: "DELETE" })
      await fetchData()
    } catch (error) {
      console.error("Error deleting travel agency:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAgencyEdit = (agency) => {
    setEditingAgency(agency)
    setAgencyForm(agency)
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-foreground/70">Manage accommodations, explore items, and travel agencies</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
              <TabsTrigger value="explore">Explore Items</TabsTrigger>
              <TabsTrigger value="agencies">Travel Agencies</TabsTrigger>
            </TabsList>

            {/* Accommodations Tab */}
            <TabsContent value="accommodations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{editingAcc ? "Edit" : "Add"} Accommodation</CardTitle>
                  <CardDescription>
                    {editingAcc ? "Update accommodation details" : "Add a new hotel, resort, lodge, or guest house"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAccSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="acc-name">Name</Label>
                        <Input
                          id="acc-name"
                          value={accForm.name}
                          onChange={(e) => setAccForm({ ...accForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="acc-type">Type</Label>
                        <select
                          id="acc-type"
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                          value={accForm.type}
                          onChange={(e) => setAccForm({ ...accForm, type: e.target.value })}
                          required
                        >
                          <option value="Hotel">Hotel</option>
                          <option value="Resort">Resort</option>
                          <option value="Lodge">Lodge</option>
                          <option value="Guest House">Guest House</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="acc-rating">Rating</Label>
                        <Input
                          id="acc-rating"
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          value={accForm.rating}
                          onChange={(e) => setAccForm({ ...accForm, rating: parseFloat(e.target.value) })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="acc-price">Price per Night ($)</Label>
                        <Input
                          id="acc-price"
                          type="number"
                          min="0"
                          value={accForm.pricePerNight}
                          onChange={(e) => setAccForm({ ...accForm, pricePerNight: parseFloat(e.target.value) })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="acc-image">Image URL</Label>
                        <Input
                          id="acc-image"
                          value={accForm.image}
                          onChange={(e) => setAccForm({ ...accForm, image: e.target.value })}
                          placeholder="/image.jpg"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="acc-booking">Booking URL</Label>
                        <Input
                          id="acc-booking"
                          type="url"
                          value={accForm.bookingUrl}
                          onChange={(e) => setAccForm({ ...accForm, bookingUrl: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="acc-description">Description</Label>
                      <Textarea
                        id="acc-description"
                        value={accForm.description}
                        onChange={(e) => setAccForm({ ...accForm, description: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="acc-amenities">Amenities (comma-separated)</Label>
                      <Input
                        id="acc-amenities"
                        value={accForm.amenities}
                        onChange={(e) => setAccForm({ ...accForm, amenities: e.target.value })}
                        placeholder="Pool, WiFi, Restaurant, Spa"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={loading}>
                        {editingAcc ? "Update" : "Add"} Accommodation
                      </Button>
                      {editingAcc && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setEditingAcc(null)
                            setAccForm({
                              name: "",
                              type: "Hotel",
                              rating: 4.0,
                              pricePerNight: 0,
                              image: "",
                              description: "",
                              amenities: "",
                              bookingUrl: "",
                            })
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {accommodations.map((acc) => (
                  <Card key={acc._id}>
                    <img src={acc.image} alt={acc.name} className="w-full h-40 object-cover rounded-t-lg" />
                    <CardHeader>
                      <CardTitle className="text-lg">{acc.name}</CardTitle>
                      <CardDescription>{acc.type} • Rating: {acc.rating} • ${acc.pricePerNight}/night</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/70 mb-4">{acc.description}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleAccEdit(acc)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleAccDelete(acc._id)}>
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Explore Items Tab */}
            <TabsContent value="explore" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{editingExplore ? "Edit" : "Add"} Explore Item</CardTitle>
                  <CardDescription>
                    {editingExplore ? "Update explore item details" : "Add a new cultural site, natural wonder, or travel agent"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleExploreSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="exp-name">Name</Label>
                        <Input
                          id="exp-name"
                          value={exploreForm.name}
                          onChange={(e) => setExploreForm({ ...exploreForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="exp-category">Category</Label>
                        <select
                          id="exp-category"
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                          value={exploreForm.category}
                          onChange={(e) => setExploreForm({ ...exploreForm, category: e.target.value })}
                          required
                        >
                          <option value="Cultural Site">Cultural Site</option>
                          <option value="Natural Wonder">Natural Wonder</option>
                          <option value="Travel Agent">Travel Agent</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="exp-image">Image URL</Label>
                        <Input
                          id="exp-image"
                          value={exploreForm.image}
                          onChange={(e) => setExploreForm({ ...exploreForm, image: e.target.value })}
                          placeholder="/image.jpg"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="exp-location">Location</Label>
                        <Input
                          id="exp-location"
                          value={exploreForm.location}
                          onChange={(e) => setExploreForm({ ...exploreForm, location: e.target.value })}
                          required
                        />
                      </div>
                      {exploreForm.category === "Travel Agent" && (
                        <div>
                          <Label htmlFor="exp-contact">Contact Email</Label>
                          <Input
                            id="exp-contact"
                            type="email"
                            value={exploreForm.contact}
                            onChange={(e) => setExploreForm({ ...exploreForm, contact: e.target.value })}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="exp-description">Description</Label>
                      <Textarea
                        id="exp-description"
                        value={exploreForm.description}
                        onChange={(e) => setExploreForm({ ...exploreForm, description: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="exp-details">Details</Label>
                      <Textarea
                        id="exp-details"
                        value={exploreForm.details}
                        onChange={(e) => setExploreForm({ ...exploreForm, details: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={loading}>
                        {editingExplore ? "Update" : "Add"} Explore Item
                      </Button>
                      {editingExplore && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setEditingExplore(null)
                            setExploreForm({
                              name: "",
                              category: "Cultural Site",
                              description: "",
                              details: "",
                              image: "",
                              location: "",
                              contact: "",
                            })
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exploreItems.map((item) => (
                  <Card key={item._id}>
                    <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-t-lg" />
                    <CardHeader>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription>{item.category} • {item.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/70 mb-4">{item.description}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleExploreEdit(item)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleExploreDelete(item._id)}>
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Travel Agencies Tab */}
            <TabsContent value="agencies" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{editingAgency ? "Edit" : "Add"} Travel Agency</CardTitle>
                  <CardDescription>
                    {editingAgency ? "Update travel agency details" : "Add a new tour operator or travel agency"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAgencySubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="agency-name">Name</Label>
                        <Input
                          id="agency-name"
                          value={agencyForm.name}
                          onChange={(e) => setAgencyForm({ ...agencyForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="agency-category">Category</Label>
                        <select
                          id="agency-category"
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                          value={agencyForm.category}
                          onChange={(e) => setAgencyForm({ ...agencyForm, category: e.target.value })}
                          required
                        >
                          <option value="Tour Operator">Tour Operator</option>
                          <option value="Travel Agency">Travel Agency</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="agency-rating">Rating</Label>
                        <Input
                          id="agency-rating"
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          value={agencyForm.rating}
                          onChange={(e) => setAgencyForm({ ...agencyForm, rating: parseFloat(e.target.value) })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="agency-image">Image URL</Label>
                        <Input
                          id="agency-image"
                          value={agencyForm.image}
                          onChange={(e) => setAgencyForm({ ...agencyForm, image: e.target.value })}
                          placeholder="/image.jpg"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="agency-link">Link URL</Label>
                        <Input
                          id="agency-link"
                          type="url"
                          value={agencyForm.link}
                          onChange={(e) => setAgencyForm({ ...agencyForm, link: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={loading}>
                        {editingAgency ? "Update" : "Add"} Travel Agency
                      </Button>
                      {editingAgency && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setEditingAgency(null)
                            setAgencyForm({
                              name: "",
                              category: "Tour Operator",
                              rating: 4.5,
                              image: "",
                              link: "",
                            })
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {travelAgencies.map((agency) => (
                  <Card key={agency._id}>
                    <img src={agency.image} alt={agency.name} className="w-full h-40 object-cover rounded-t-lg" />
                    <CardHeader>
                      <CardTitle className="text-lg">{agency.name}</CardTitle>
                      <CardDescription>{agency.category} • Rating: {agency.rating}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleAgencyEdit(agency)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleAgencyDelete(agency._id)}>
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  )
}

