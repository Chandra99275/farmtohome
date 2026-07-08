# 🌱 Farm2Home

Farm2Home is a full-stack web application that connects farmers directly with customers. The platform allows farmers to sell fresh agricultural products without intermediaries while enabling customers to discover nearby farms, browse products, place orders, and make secure online payments.

---

## 📌 Features

### 👨‍🌾 Farmer Features

* Farmer Registration & Login
* Farmer Dashboard
* Add, View, and Delete Products
* Upload Product Images
* Manage Orders
* Update Farmer Profile
* Select Farm Location using Interactive Map
* Save Farm Location (Latitude & Longitude)
* Display Farm Location for Customers

### 🛒 Customer Features

* Customer Registration & Login
* Customer Dashboard
* Browse Farm Products
* Search Products
* Product Details Page
* Shopping Cart
* Secure Checkout
* Order History
* Customer Profile
* View Nearby Farms on Interactive Map

### 📍 Location Features

* Interactive Map using Leaflet
* OpenStreetMap Integration
* Farm Location Selection
* User Geolocation
* Nearby Farm Discovery
* Distance Calculation between Customer and Farmers

### 💳 Payment Features

* Online Payment Integration
* Order Confirmation
* Payment Status Tracking

### 🔒 Security Features

* JWT Authentication
* Password Encryption
* Protected API Routes
* Secure Database Access
* Input Validation

---

# 🛠 Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* React Leaflet
* Leaflet
* HTML5
* CSS3
* JavaScript (ES6)

## Backend

* Node.js
* Express.js
* MySQL
* JWT Authentication
* Multer (Image Upload)
* Socket.IO
* CORS
* Dotenv

---

# 📂 Project Structure

```
Farm2Home/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙ Installation

## Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Farm2Home.git
```

---

## Navigate to the Project

```bash
cd Farm2Home
```

---

## Install Frontend Dependencies

```bash
cd client
npm install
```

---

## Install Backend Dependencies

```bash
cd ../server
npm install
```

---

# ▶ Running the Application

## Start Backend

```bash
cd server
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## Start Frontend

```bash
cd client
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🗄 Database

Database: **MySQL**

Create a MySQL database and update your `.env` file.

Example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=farm2home
PORT=5000
JWT_SECRET=your_secret_key
```

---

# 📦 Required Packages

## Frontend

```bash
npm install
```

Additional packages:

```bash
npm install axios
npm install react-router-dom
npm install react-leaflet leaflet
```

---

## Backend

```bash
npm install
```

Additional packages:

```bash
npm install express
npm install mysql2
npm install multer
npm install jsonwebtoken
npm install bcryptjs
npm install dotenv
npm install cors
npm install socket.io
```

---

# 📷 Screens

* Home Page
* Login
* Signup
* Farmer Dashboard
* Customer Dashboard
* Product Listing
* Product Details
* Shopping Cart
* Checkout
* Farmer Profile
* Customer Profile
* Farmer Orders
* Customer Orders
* Farm Location Map
* Nearby Farms Map

---

# 🚀 Future Enhancements

* AI-Based Crop Recommendation
* Weather Forecast Integration
* Live Product Tracking
* Farmer Ratings & Reviews
* Wishlist
* Voice Search
* Push Notifications
* Delivery Tracking
* Admin Dashboard
* Mobile Application

---

# 👨‍💻 Developed By

**Mahesh**

Full Stack Developer | Cyber Security Enthusiast

---

# 📄 License

This project is developed for educational and academic purposes.
