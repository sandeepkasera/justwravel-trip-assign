# 🧳 Trip Planner – Full Stack Assignment

A full-stack trip planning application built with **Next.js (frontend)**, **Node.js + Fastify (backend)**, and **MongoDB (Mongoose)**.  

---

## 🚀 Features
- Create, edit, and manage trip plans  
- Search, filter, and paginate trips  
- MongoDB (Atlas or local) for persistence  
- Modern UI with Next.js + TailwindCSS  

---

## 🛠️ Prerequisites
- **Node.js** v18+ (recommend v20)  
- **npm** or **pnpm**  
- **MongoDB Atlas account** (or local MongoDB running at `mongodb://localhost:27017`)  

---

## 📦 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/justwravel-trip-assign.git
cd justwravel-trip-assign
```

### 2. Install dependencies
Both frontend and backend have separate dependencies.  

#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd ../frontend
npm install
```

---

### 3. Configure Environment Variables

#### Backend (`backend/.env`)
```env
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/tripDB?retryWrites=true&w=majority
```

> ⚠️ If using special characters in your password (`@`, `#`, `%` etc.), encode them with:
> ```bash
> node -e "console.log(encodeURIComponent('My@Pass#1'))"
> ```

#### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_BASE=http://localhost:4000
```

---

### 4. Run the project

#### Backend (API Server):
```bash
cd backend
npm run dev   # or npm run build && npm start
```

#### Frontend (Next.js):
```bash
cd frontend
npm run dev
```

---

### 5. Open the app
- Frontend: [http://localhost:3000](http://localhost:3000)  
- API Docs: [http://localhost:4000/api/trips](http://localhost:4000/api/trips)  

---

## 🧪 Testing with Dummy Data
You can seed the DB with sample trips.  
Example `trips.json`:
```json
[
  { "title": "Goa Weekend Escape", "destination": "Goa", "days": 3, "budget": 15000 },
  { "title": "Manali Adventure", "destination": "Manali", "days": 5, "budget": 22000 }
]
```

Import into MongoDB:
```bash
mongoimport --uri "$MONGO_URI" --collection trips --file trips.json --jsonArray
```

---


## 📜 Scripts

### Backend
- `npm run dev` → start backend with hot reload  
- `npm run build` → compile TS to `dist/`  
- `npm start` → run compiled backend  

### Frontend
- `npm run dev` → start Next.js frontend  
- `npm run build` → build for production  
- `npm start` → start production server  

---

## 📂 Project Structure
```
justwravel-trip-assign/
│── backend/
│   ├── src/
│   │   ├── models/TripPlan.ts
│   │   ├── routes/trip.ts
│   │   └── server.ts
│   └── dist/  (compiled output)
│
│── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── utils/
│   └── public/
```
