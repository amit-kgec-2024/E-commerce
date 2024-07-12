const express = require("express");
const cors = require("cors");
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
const userRoutes = require("./routes/UserRoutes");
const adminRouters = require("./routes/AdminRoutes");
const placeOrderRouters = require("./routes/PlaceOrderRoutes");
const productReviewsRouters = require("./routes/ProductReviewsRouter");
const addtoCartRouters = require("./routes/AddCartRoutes");
const allDataRouters = require("./routes/AllData");
const deliveryRoutes = require("./routes/DeliveryRoutes");
const managementRoutes = require("./routes/ManagementRouter");
const helpdeskRouter = require("./routes/HelpdeskRouter");

// useRouter..............
app.use("/api", userRoutes);
app.use("/api", adminRouters);
app.use("/api", placeOrderRouters);
app.use("/api", productReviewsRouters);
app.use("/api", addtoCartRouters);
app.use("/api", allDataRouters);
app.use("/api", deliveryRoutes);
app.use("/api", managementRoutes);
app.use("/api", helpdeskRouter);

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.end("Welcome Database");
});
// .............................
app.listen(port, () => {
  console.log("listing on port" + port);
});
