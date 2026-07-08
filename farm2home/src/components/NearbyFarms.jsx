import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet Marker Icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Automatically move map
function ChangeMapView({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);

  return null;
}

function NearbyFarms() {
  const [userLocation, setUserLocation] = useState(null);
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchFarmers();
    }
  }, [userLocation]);

  // Get Customer Current Location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLoading(false);
      },
      (error) => {
        console.log(error);

        setLoading(false);

        alert("Please allow location permission.");
      },
      {
        enableHighAccuracy: true,
      }
    );
  };

  // Fetch Farmers From Backend
  const fetchFarmers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/farmer/locations"
      );

      console.log("Farmer API:", response.data);

      if (response.data.success) {
        const validFarmers = response.data.farmers.filter(
          (farmer) =>
            farmer.latitude !== null &&
            farmer.longitude !== null
        );

        setFarmers(validFarmers);
      } else {
        setFarmers([]);
      }
    } catch (err) {
      console.log(err);
      setError("Unable to fetch farmers.");
    }
  };

  // Calculate Distance
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return (R * c).toFixed(2);
  };
    return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2e7d32",
          marginBottom: "20px",
        }}
      >
        🌾 Nearby Farms
      </h1>

      <button
        onClick={getCurrentLocation}
        style={{
          background: "#2e7d32",
          color: "#fff",
          border: "none",
          padding: "12px 25px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {loading ? "Getting Location..." : "Refresh My Location"}
      </button>

      {error && (
        <div
          style={{
            color: "red",
            marginBottom: "15px",
            fontWeight: "bold",
          }}
        >
          {error}
        </div>
      )}

      <MapContainer
        center={
          userLocation
            ? [userLocation.latitude, userLocation.longitude]
            : [20.5937, 78.9629]
        }
        zoom={userLocation ? 13 : 5}
        style={{
          height: "600px",
          width: "100%",
          borderRadius: "15px",
        }}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && (
          <>
            <ChangeMapView
              center={[
                userLocation.latitude,
                userLocation.longitude,
              ]}
            />

            <Marker
              position={[
                userLocation.latitude,
                userLocation.longitude,
              ]}
            >
              <Popup>
                <b>📍 Your Current Location</b>
              </Popup>
            </Marker>

            <Circle
              center={[
                userLocation.latitude,
                userLocation.longitude,
              ]}
              radius={5000}
            />
          </>
        )}

        {farmers.map((farmer) => {
          const distance = userLocation
            ? getDistance(
                userLocation.latitude,
                userLocation.longitude,
                Number(farmer.latitude),
                Number(farmer.longitude)
              )
            : "0";

          return (
            <Marker
              key={farmer.id}
              position={[
                Number(farmer.latitude),
                Number(farmer.longitude),
              ]}
            >
              <Popup>
                <div style={{ minWidth: "220px" }}>
                  <h3
                    style={{
                      color: "#2e7d32",
                      marginBottom: "10px",
                    }}
                  >
                    🌱 {farmer.name}
                  </h3>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {farmer.phone || "N/A"}
                  </p>

                  <p>
                    <strong>Address:</strong>{" "}
                    {farmer.address || "N/A"}
                  </p>

                  <p>
                    <strong>Distance:</strong>{" "}
                    {distance} KM
                  </p>

                  <button
                    onClick={() =>
                      window.location.href =
                        "/products?farmer=" + farmer.id
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginTop: "10px",
                      background: "#2e7d32",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    View Products
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <div
        style={{
          marginTop: "25px",
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2e7d32",
            marginBottom: "15px",
          }}
        >
          Nearby Farmers ({farmers.length})
        </h2>

        {farmers.length === 0 ? (
          <p>No nearby farmers found.</p>
        ) : (
          farmers.map((farmer) => {
            const distance = userLocation
              ? getDistance(
                  userLocation.latitude,
                  userLocation.longitude,
                  Number(farmer.latitude),
                  Number(farmer.longitude)
                )
              : "0";

            return (
              <div
                key={farmer.id}
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "15px 0",
                }}
              >
                <h3
                  style={{
                    color: "#2e7d32",
                  }}
                >
                  🌾 {farmer.name}
                </h3>

                <p>
                  📞 {farmer.phone || "N/A"}
                </p>

                <p>
                  📍 {farmer.address || "N/A"}
                </p>

                <p>
                  🚜 {distance} KM Away
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default NearbyFarms;