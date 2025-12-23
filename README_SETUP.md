# GoBishoftu - Setup Instructions

## Backend Setup

1. **Install Dependencies**
   ```bash
   cd Backend
   npm install
   ```

2. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas (cloud)
   - Create a `.env` file in the Backend directory:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/gobisoftu
     ```
   - For MongoDB Atlas, use:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gobisoftu
     ```

3. **Seed the Database** (Optional - to populate with initial data)
   ```bash
   npm run seed
   ```

4. **Start the Backend Server**
   ```bash
   npm run dev
   ```
   Server will run on http://localhost:5000

## Frontend Setup

1. **Install Dependencies** (if not already installed)
   ```bash
   cd Client
   npm install
   ```

2. **Set up Environment Variables** (Optional)
   - Create a `.env.local` file in the Client directory:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:5000/api
     ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:3000

## Using the Dashboard

1. Navigate to http://localhost:3000/dashboard
2. Use the tabs to manage:
   - **Accommodations**: Add, edit, or delete hotels, resorts, lodges, and guest houses
   - **Explore Items**: Manage cultural sites, natural wonders, and travel agents
   - **Travel Agencies**: Manage tour operators and travel agencies

## API Endpoints

### Accommodations
- `GET /api/accommodations` - Get all accommodations
- `GET /api/accommodations/:id` - Get single accommodation
- `POST /api/accommodations` - Create accommodation
- `PUT /api/accommodations/:id` - Update accommodation
- `DELETE /api/accommodations/:id` - Delete accommodation

### Explore Items
- `GET /api/explore` - Get all explore items
- `GET /api/explore/:id` - Get single explore item
- `POST /api/explore` - Create explore item
- `PUT /api/explore/:id` - Update explore item
- `DELETE /api/explore/:id` - Delete explore item

### Travel Agencies
- `GET /api/travel-agencies` - Get all travel agencies
- `GET /api/travel-agencies/:id` - Get single travel agency
- `POST /api/travel-agencies` - Create travel agency
- `PUT /api/travel-agencies/:id` - Update travel agency
- `DELETE /api/travel-agencies/:id` - Delete travel agency

## Notes

- The frontend pages (Home, Accommodations, Explore) automatically fetch data from the API
- If the API is unavailable, fallback data is used
- All data can be managed through the Dashboard interface
- Images should be placed in the `Client/public` directory

