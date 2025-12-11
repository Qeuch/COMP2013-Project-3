const express = require("express");
const crypto = require("crypto");
const server = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/product");
const User = require("./models/user");
require("dotenv").config();
const { DB_URI } = process.env;
const { SECRET_KEY } = process.env;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//Connect to DB
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Connected to DB\nServer is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

server.get("/", (request, response) => {
  response.send("LIVE!");
});

//Display products
server.get("/main", (request, response) => {
  response.send("LIVE!");
});

server.get("/not-authorized", (request, response) => {
  response.status(401);
  response.send("NOT AUTHORIZED!");
});

server.get("/products", async (request, response) => {
  console.log("GET /products hit");
  try {
    await Product.find().then((result) => response.status(200).send(result));
  } catch (error) {
    console.log(error.message);
  }
});

//Add product

//Register new user route
server.post("/create-user", async (request, response) => {
  const { username, password } = request.body;
  try {
    //Hashing a password need bcrypt and salt rounds as an int
    const id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      _id: id,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    response.send({ message: "User Created!" });
  } catch (error) {
    response
      .status(500)
      .send({ message: "User Already Exists, please find another username" });
  }
});

server.post("/add-product", async (request, response) => {
  const { productName, brand, image, price } = request.body;
  const id = crypto.randomUUID();
  const product = new Product({
    productName,
    brand,
    price,
    image,
    id,
  });

  //Server's response to product being added
  try {
    await product.save();
    response.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

//Delete product
server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  //Server's response to item being deleted
  try {
    await Product.findByIdAndDelete(id).then((result) => {
      console.log(result);
      response.status(200).send(result);
    });
  } catch (error) {
    console.log(error.message);
  }
});

server.patch("/edit-product/:id", async (request, response) => {
  const prodId = request.params.id;
  const { productName, brand, image, price, id } = request.body;

  //Server's response to item being editted
  try {
    await Product.findByIdAndUpdate(prodId, {
      productName,
      brand,
      image,
      price,
      id,
    }).then((result) =>
      response.status(200).send(`${productName} edited\nwith id: ${prodId}`)
    );
  } catch (error) {
    console.log(error.message);
  }
});

//Login existing user route
server.post("/", async (request, response) => {
  const { username, password } = request.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return response.status(404).send({ message: "User does not exist" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return response
        .status(403)
        .send({ message: "Incorrect username or password" });
    }

    const jwtToken = jwt.sign(
      { id: user._id, username, role: user.role },
      SECRET_KEY
    );
    return response
      .status(201)
      .send({ message: "User Authenticated", token: jwtToken });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// this catch-all needs to be at the very end of the routes
server.get("*", (request, response) => {
  response.status(401);
  response.send("NO SUCH PAGE!");
});
