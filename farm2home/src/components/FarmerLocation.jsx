import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";

function LocationMarker({ setLocation }) {
  useMapEvents({
    click(e) {
      setLocation({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      });
    },
  });

  return null;
}

function ChangeMapView({ coords }) {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.setView([coords.latitude, coords.longitude], 15);
    }
  }, [coords, map]);

  return null;
}

function FarmerLocation() {
  const [location, setLocation] = useState(null);
  const [mapPosition, setMapPosition] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSavedLocation();
  }, []);

  const loadSavedLocation = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const res = await axios.get(
        `http://localhost:5000/api/farmer/location/${user.id}`
      );

      if (res.data.success && res.data.location) {
        setLocation(res.data.location);
        setMapPosition(res.data.location);
      }
    } catch (err) {
      console.log("No saved location found");
    }
  };

  const searchLocation = async () => {
    if (!search.trim()) {
      alert("Enter a location");
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          search
        )}`
      );

      const data = await response.json();

      if (data.length === 0) {
        alert("Location not found");
        return;
      }

      const coords = {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      };

      setLocation(coords);
      setMapPosition(coords);
    } catch (err) {
      console.log(err);
      alert("Search failed");
    }
  };

  const saveLocation = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first");
        return;
      }

      if (!location) {
        alert("Please select a location");
        return;
      }

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/farmer/save-location",
        {
          farmerId: user.id,
          latitude: location.latitude,
          longitude: location.longitude,
        }
      );

      if (res.data.success) {
        alert("Farm location saved successfully.");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to save farm location."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        marginTop: "30px",
      }}
    >
      <h2
        style={{
          color: "#2e7d32",
          marginBottom: "15px",
        }}
      >
        📍 Select Farm Location
      </h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search village, city, area..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={searchLocation}
          style={{
            background: "#2e7d32",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{
          height: "450px",
          width: "100%",
          borderRadius: "15px",
        }}
      >
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {mapPosition && <ChangeMapView coords={mapPosition} />}

        <LocationMarker setLocation={setLocation} />

        {location && (
          <Marker
            position={[
              location.latitude,
              location.longitude,
            ]}
          >
            <Popup>Your Farm Location</Popup>
          </Marker>
        )}
      </MapContainer>

      {location && (
        <div
          style={{
            marginTop: "20px",
            background: "#f1f8e9",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>Selected Farm Location</h3>

          <p>
            <strong>Latitude:</strong>{" "}
            {location.latitude}
          </p>

          <p>
            <strong>Longitude:</strong>{" "}
            {location.longitude}
          </p>

          <button
            onClick={saveLocation}
            disabled={loading}
            style={{
              marginTop: "15px",
              background: "#388e3c",
              color: "#fff",
              border: "none",
              padding: "12px 25px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {loading ? "Saving..." : "Save Location"}
          </button>
        </div>
      )}
    </div>
  );
}

export default FarmerLocation;