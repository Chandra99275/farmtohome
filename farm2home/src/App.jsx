import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import FarmerProfile from "./pages/FarmerProfile";
import CustomerProfile from "./pages/CustomerProfile";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import ForgotPassword from "./pages/ForgotPassword";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import CustomerOrders from "./pages/CustomerOrders";
import FarmerOrders from "./pages/FarmerOrders";

// Farm Location Pages
import AddFarmLocation from "./pages/AddFarmLocation";
import NearbyFarmsPage from "./pages/NearbyFarmsPage";

function App() {
  return (
    <Routes>

      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Dashboards */}
      <Route path="/userdashboard" element={<UserDashboard />} />
      <Route path="/farmerdashboard" element={<FarmerDashboard />} />

      {/* Profiles */}
      <Route path="/farmerprofile" element={<FarmerProfile />} />
      <Route path="/customerprofile" element={<CustomerProfile />} />

      {/* Products */}
      <Route path="/products" element={<Products />} />
      <Route path="/productdetails" element={<ProductDetails />} />

      {/* Cart & Checkout */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* Orders */}
      <Route path="/customerorders" element={<CustomerOrders />} />
      <Route path="/farmerorders" element={<FarmerOrders />} />

      {/* Farmer Location */}
      <Route
        path="/add-farm-location"
        element={<AddFarmLocation />}
      />

      {/* Nearby Farms */}
      <Route
        path="/nearby-farms"
        element={<NearbyFarmsPage />}
      />

    </Routes>
  );
}

export default App;