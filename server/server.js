import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import db from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// New Farmer Location Route
import farmerRoutes from "./routes/farmerRoutes.js";


dotenv.config();


const app = express();


const server = http.createServer(app);



export const io = new Server(server, {

  cors: {

    origin: "http://localhost:5173",

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE"
    ],

  },

});



io.on("connection", (socket) => {

  console.log(
    "User Connected :",
    socket.id
  );


  socket.on("disconnect", () => {

    console.log(
      "User Disconnected :",
      socket.id
    );

  });


});



// Middleware

app.use(

cors({

origin:"http://localhost:5173",

credentials:true

})

);


app.use(
express.json()
);



app.use(

"/uploads",

express.static("uploads")

);



// Existing Routes

app.use(

"/api/auth",

authRoutes

);



app.use(

"/api/profile",

profileRoutes

);



app.use(

"/api/products",

productRoutes

);



app.use(

"/api/orders",

orderRoutes

);



app.use(

"/api/payment",

paymentRoutes

);



// New Farmer Location API

app.use(

"/api/farmer",

farmerRoutes

);




// Test API

app.get("/", (req,res)=>{

res.send(
"Farm2Home API Running"
);

});




// Server

const PORT =
process.env.PORT || 5000;



server.listen(PORT,()=>{


console.log(

`Server Running On Port ${PORT}`

);


});