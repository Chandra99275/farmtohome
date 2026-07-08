import React from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {

  const { id } = useParams();

  const product = {
    id,
    name: "Fresh Tomato",
    price: 25,
    unit: "Kg",
    quantity: 50,
    image:
      "https://images.unsplash.com/photo-1546470427-e212b9f0aab8?w=800",
    description:
      "Fresh organic tomatoes directly from the farm.",
    farmer: "Ramesh Farm",
  };

  const addToCart = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
      ...product,
      quantity: 1,
    });

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Added To Cart");
  };

  return (
    <div className="container">

      <img
        src={product.image}
        alt={product.name}
      />

      <div className="details">

        <h1>{product.name}</h1>

        <h2>
          ₹{product.price}/{product.unit}
        </h2>

        <p>{product.description}</p>

        <p>
          Available Stock:
          {product.quantity}
        </p>

        <p>
          Farmer:
          {product.farmer}
        </p>

        <button onClick={addToCart}>
          Add To Cart
        </button>

      </div>

      <style>{`
        .container{
          display:flex;
          gap:40px;
          padding:40px;
        }

        img{
          width:500px;
          border-radius:15px;
        }

        .details{
          flex:1;
        }

        button{
          margin-top:20px;
          padding:12px 25px;
          border:none;
          background:#16a34a;
          color:white;
          border-radius:8px;
        }
      `}</style>

    </div>
  );
}

export default ProductDetails;