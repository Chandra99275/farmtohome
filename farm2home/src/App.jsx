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

// New page
import AddFarmLocation from "./pages/AddFarmLocation";


function App() {

  return (

    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route 
        path="/forgot-password" 
        element={<ForgotPassword />} 
      />

      <Route 
        path="/userdashboard" 
        element={<UserDashboard />} 
      />

      <Route 
        path="/farmerdashboard" 
        element={<FarmerDashboard />} 
      />

      <Route 
        path="/farmerprofile" 
        element={<FarmerProfile />} 
      />

      <Route 
        path="/customerprofile" 
        element={<CustomerProfile />} 
      />

      <Route 
        path="/cart" 
        element={<Cart />} 
      />

      <Route 
        path="/products" 
        element={<Products />} 
      />

      <Route 
        path="/productdetails" 
        element={<ProductDetails />} 
      />

      <Route 
        path="/checkout" 
        element={<Checkout />} 
      />

      <Route 
        path="/customerorders" 
        element={<CustomerOrders />} 
      />

      <Route 
        path="/farmerorders" 
        element={<FarmerOrders />} 
      />


      {/* Farmer Location Feature */}
      <Route
        path="/add-farm-location"
        element={<AddFarmLocation />}
      />


    </Routes>

  );

}

export default App;