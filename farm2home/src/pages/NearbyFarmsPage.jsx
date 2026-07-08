import React from "react";
import NearbyFarms from "../components/NearbyFarms";

function NearbyFarmsPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f8f3",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <NearbyFarms />
      </div>
    </div>
  );
}

export default NearbyFarmsPage;