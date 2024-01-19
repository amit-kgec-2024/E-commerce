const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://amitmandalbetai:oVS1bGAh81mYygCB@ecomreact1.2hm8pfd.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connect db"))
  .catch((e) => console.log("Error", e));
