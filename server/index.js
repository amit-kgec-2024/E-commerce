const express = require("express");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

// use appp
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// connect DB
require("./db/connections");
// import files
const Users = require("./modules/Users");
const Products = require("./modules/Products");
const AddToCarts = require("./modules/Addtocarts");
const UserDetails = require("./modules/UserDetails");
const UserProfiles = require("./modules/UserProfiles");
const ProductReviews = require("./modules/ProductReviews");
const PlaceOrders = require("./modules/PlaceOrderes");

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.end("Welcome Database");
});
// register............
app.post("/api/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(200).send("Plese all require files");
    } else {
      const isAlreadyExist = await Users.findOne({ email });
      if (isAlreadyExist) {
        res.status(400).send("User alredy Exist");
      } else {
        const newUser = new Users({ username, email });
        bcryptjs.hash(password, 10, (err, hashedPassword) => {
          newUser.set("password", hashedPassword);
          newUser.save();
          next();
        });
        return res.status(200).send("user register Successfully");
      }
    }
  } catch (error) {
    console.log(error, "Error");
  }
});
// login...............
app.post("/api/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Plese all require files");
    } else {
      const user = await Users.findOne({ email });
      if (!user) {
        res.status(400).send("User Email & Password is Incorrect");
      } else {
        const valideteUser = await bcryptjs.compare(password, user.password);
        if (!valideteUser) {
          res.status(400).send("User Email & Password is Incorrect");
        } else {
          const payload = {
            userId: user._id,
            email: user.email,
          };
          const JWT_SECRET_KEY =
            process.env.JWT_SECRET_KEY || "THIS_IS_A_JWT_SECRET_KEY";
          jwt.sign(
            payload,
            JWT_SECRET_KEY,
            { expiresIn: 86400 },
            async (err, token) => {
              await Users.updateOne({ _id: user._id }, { $set: { token } });
              user.save();
              res.status(200).json({
                user: {
                  id: user._id,
                  email: user.email,
                  password: user.password,
                  username: user.username,
                },
                token: token,
              });
            }
          );
        }
      }
    }
  } catch (error) {
    console.log(error, "Error");
  }
});
// User Addresss POST details...
app.post("/api/userdetails", async (req, res) => {
  try {
    const { userId, mobil, place, post, police, dist, pin, state } = req.body;

    if (
      !userId ||
      !mobil ||
      !place ||
      !post ||
      !police ||
      !dist ||
      !pin ||
      !state
    ) {
      return res.status(400).send("Please provide all required fields");
    }

    const existingUser = await UserDetails.findOne({ userId });

    if (existingUser) {
      existingUser.mobil = mobil;
      existingUser.place = place;
      existingUser.post = post;
      existingUser.police = police;
      existingUser.dist = dist;
      existingUser.pin = pin;
      existingUser.state = state;

      await existingUser.save();
      return res.status(200).send("User details updated successfully");
    } else {
      const newUser = new UserDetails({
        userId,
        mobil,
        place,
        post,
        police,
        dist,
        pin,
        state,
      });
      await newUser.save();
      return res.status(201).send("User details registered successfully");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});
// userAddress GET Request.......
app.get("/api/userdetails/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const userdetails = await UserDetails.find({ userId: userId });

    const userdetailsdata = Promise.all(
      userdetails.map(async (details) => {
        return {
          details: {
            userId: details.userId,
            mobil: details.mobil,
            place: details.place,
            post: details.post,
            police: details.police,
            dist: details.dist,
            pin: details.pin,
            state: details.state,
          },
        };
      })
    );

    res.status(200).send(await userdetailsdata);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});
// userProfile PoST..................
app.post("/api/userprofile", async (req, res) => {
  try {
    const { imgUrl, userId, bio } = req.body;
    if (!imgUrl || !userId || !bio) {
      return res.status(400).send("Please provide all required fields");
    }
    const existingprofile = await UserProfiles.findOne({ userId });
    if (existingprofile) {
      existingprofile.img = imgUrl;
      existingprofile.bio = bio;

      await existingprofile.save();
      return res.status(200).send("User details updated successfully");
    } else {
      const newUser = new UserProfiles({ img: imgUrl, userId, bio });
      await newUser.save();
      return res.status(201).send("User details registered successfully");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});

// userProfile GET Request.......
app.get("/api/userprofileget/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const userprofiles = await UserProfiles.find({ userId: userId });

    const userprofilesdata = Promise.all(
      userprofiles.map(async (profile) => {
        return {
          profile: {
            userId: profile.userId,
            img: profile.img,
            bio: profile.bio,
          },
        };
      })
    );

    res.status(200).send(await userprofilesdata);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});
// product register.........
app.post("/api/product/register", async (req, res) => {
  try {
    const { imgUrl, title, price, stars, discount, category, sale } = req.body;

    const newProducts = new Products({
      img: imgUrl,
      title,
      price,
      stars,
      discount,
      category,
      sale,
    });
    newProducts.save();

    return res.status(200).send("product register Successfully");
  } catch (error) {
    console.log(error, "Error");
    res.status(500).send("Internal Server Error");
  }
});

// product GET request..................
app.get("/api/product/register/get", async (req, res) => {
  try {
    const products = await Products.find();
    const productData = Promise.all(
      products.map(async (product) => {
        return {
          product: {
            id: product._id,
            img: product.img,
            title: product.title,
            price: product.price,
            discount: product.discount,
            stars: product.stars,
            category: product.category,
            sale: product.sale,
          },
        };
      })
    );
    res.status(200).send(await productData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});
// AddToCart POST Requests.................
app.post("/api/addToCart", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const isExistAdd = await AddToCarts.findOne({ productId });
    if (isExistAdd) {
      res.status(400).send("Product Alredy Add To Cart");
    } else {
      const newCarts = new AddToCarts({ userId, productId });
      await newCarts.save();
      return res
        .status(200)
        .json({ message: "Product added to cart", newCarts });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});
// AddToCaer GET Request.......
app.get("/api/addToCartGet/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const addToCarts = await AddToCarts.find({ userId: userId });

    const addToCartData = Promise.all(
      addToCarts.map(async (addCart) => {
        const _id = addCart._id;
        return {
          addCart: {
            id: _id,
            userId: addCart.userId,
            productId: addCart.productId,
          },
        };
      })
    );

    res.status(200).send(await addToCartData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});

// AddToCart Delete.................
app.delete("/api/removeFromCart/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const result = await AddToCarts.deleteOne({
      productId: productId,
    });

    if (result.deletedCount > 0) {
      res.status(200).send("Item removed from the cart successfully");
    } else {
      res.status(404).send("Item not found in the cart");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});
// Product Reviews POST.......
app.post("/api/productReviews", async (req, res) => {
  try {
    const { productId, username, reviews } = req.body;
    if (!productId || !username || !reviews) {
      res.status(400).send("Fill All Requires");
    } else {
      const newReviews = new ProductReviews({
        productId,
        username,
        reviews,
      });
      newReviews.save();
      return res.status(200).send("product Reviews register Successfully");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});
// ProductReviews GET Request.............
app.get("/api/productReviews/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const productreviews = await ProductReviews.find({
      productId: productId,
    });
    const reviesData = Promise.all(
      productreviews.map(async (review) => {
        return {
          review: {
            productId: review.productId,
            username: review.username,
            reviews: review.reviews,
          },
        };
      })
    );

    res.status(200).send(await reviesData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});
// OrderPlaced POST......................
app.post("/api/buy/payment/placeorder", async (req, res) => {
  try {
    const {
      img,
      title,
      price,
      items,
      size,
      username,
      userId,
      productId,
      place,
      post,
      police,
      dist,
      pin,
      state,
      mobil,
      conformDate,
      deliveryDate,
      payment,
    } = req.body;
    const newPlaceOrder = new PlaceOrders({
      img,
      title,
      price,
      items,
      size,
      username,
      userId,
      productId,
      place,
      post,
      police,
      dist,
      pin,
      state,
      mobil,
      conformDate,
      deliveryDate,
      payment,
    });
    newPlaceOrder.save();
    return res.status(200).send("Place Order register Successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});
// OrderPlace GET Request...................
app.get("/api/buy/payment/placeorder/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const productOrders = await PlaceOrders.find({
      userId: userId,
    });
    const orderData = Promise.all(
      productOrders.map(async (order) => {
        return {
          order: {
            id: order._id,
            img: order.img,
            title: order.title,
            price: order.price,
            items: order.items,
            size: order.size,
            username: order.username,
            userId: order.userId,
            productId: order.productId,
            place: order.place,
            post: order.post,
            police: order.police,
            dist: order.dist,
            pin: order.pin,
            state: order.state,
            mobil: order.mobil,
            conformDate: order.conformDate,
            deliveryDate: order.deliveryDate,
            payment: order.payment,
          },
        };
      })
    );

    res.status(200).send(await orderData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});
// .............................
app.listen(port, () => {
  console.log("listing on port" + port);
});
