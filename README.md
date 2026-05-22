# 🎨 Thumblify — AI-Powered YouTube Thumbnail Generator

Thumblify is a state-of-the-art MERN-stack web application that allows creators to instantly generate visually stunning, high-click-through-rate (CTR) YouTube thumbnails. 

By leveraging the **Groq SDK** (running the **Llama-3.3-70b-versatile** model) to refine user requests into visual prompts, and feeding them into **Pollinations AI** (using **Flux** and **Kontext** models), Thumblify automates visual concepts into production-ready images optimized for YouTube's wide aspect ratios.

---

## 🚀 Key Features

* **AI Prompt Optimization**: Takes a simple title and style direction, then translates it into a detailed, visually separated prompt optimized for image generation models via the **Groq SDK**.
* **High-Quality Image Synthesis**: Integrates with **Pollinations AI** using the state-of-the-art **Flux** (for generation) and **Kontext** (for image-to-image/reference mode) pipelines.
* **Aspect Ratio Options**: Supports YouTube Standard (`16:9`), Square (`1:1`), and Short/TikTok standard (`9:16`).
* **Interactive Dashboard**: Track past generations, recreate designs with specific feedback, and manage your generation history.
* **Credits System**: Built-in user model with authentication and credit deduction mechanism.

---

## 🛠️ Tech Stack

### Backend
* **Node.js** & **Express**
* **MongoDB** (with **Mongoose**)
* **Groq SDK** for AI prompt refining
* **JSON Web Tokens (JWT)** & **Bcrypt.js** for authentication
* **Morgan** for HTTP request logging

### Frontend
* **Vite** & **React** (Single Page App)
* **React Router DOM** for client-side routing
* **Tailwind CSS** & **PostCSS** for premium, modern aesthetics

---

## 📂 Project Structure

```text
thumblify/
├── client/                 # Vite + React Frontend
│   ├── src/                # React App Source Code
│   ├── public/             # Static Assets
│   ├── package.json        # Frontend Dependencies
│   └── vite.config.js      # Vite Configuration
│
├── server/                 # Express Backend API
│   ├── config/             # DB & Config Files
│   ├── controllers/        # Route Handlers / API Controllers
│   ├── models/             # Mongoose Database Schemas
│   ├── routes/             # Express Routing
│   ├── utils/              # Helper utilities & prompts
│   ├── server.js           # Server Entrypoint
│   └── package.json        # Backend Dependencies
```

---

## ⚙️ Environment Variables Setup

Before running the application, configure your environments in both the frontend and backend directories.

### 1. Server Configuration
Create a `.env` file in the `server/` directory:

```env
MONGO_URI=mongodb://127.0.0.1:27017/thumblify   # Or MongoDB Atlas connection URI
JWT_SECRET=your_super_secure_jwt_secret_key
GROQ_API_KEY=gsk_your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
CLIENT_URL=http://localhost:5173
PORT=5000
```

### 2. Client Configuration
Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🏃 Run the Project Locally

### Step 1: Install Dependencies
Run the install command in both directories.

**For the Backend:**
```bash
cd server
npm install
```

**For the Frontend:**
```bash
cd ../client
npm install
```

### Step 2: Run Development Servers

**Start the Backend API Server:**
```bash
cd server
npm run dev
```
The backend server will run on `http://127.0.0.1:5000`.

**Start the Frontend App:**
```bash
cd client
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 🔮 How It Works under the Hood

1. **User Request**: The user fills out a thumbnail request form specifying a `title`, a `style` (e.g. bold, minimalist, dramatic), `color direction`, and `aspectRatio`.
2. **Groq Prompt Optimization**: The system builds a detailed instruction prompt template and sends it to the Groq API using `llama-3.3-70b-versatile` to produce a highly concise, descriptive visual prompt (max 45 words).
3. **Pollinations Generation**: The generated prompt query is structured and sent to Pollinations AI. If a reference image is supplied, Kontext is used; otherwise, Flux builds the final image.
4. **Image Warming & Persistence**: The backend makes background warming calls to ensure the image is cached upstream, saves the thumbnail details to MongoDB, deducts one credit from the user, and returns the thumbnail object to the frontend.
