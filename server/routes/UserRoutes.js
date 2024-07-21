const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const Users = require("../modules/Users");
const UserAddress = require("../modules/UserAddress");

// register............
router.post("/users/register", async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, mobile } = req.body;
    if (!firstname || !lastname || !email || !password || !mobile) {
      res.status(200).send("Plese all require files");
    } else {
      const isAlreadyExist = await Users.findOne({ email, mobile });
      if (isAlreadyExist) {
        res.status(400).send("User alredy Exist");
      } else {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        var prefix = `USR${year}${month}${day}`;
        var suffix = "I";
        const lastUser = await Users.findOne().sort({ serialNo: -1 });

        let serialNo = 1;
        if (lastUser && lastUser.serialNo) {
          serialNo = lastUser.serialNo + 1;
        }
        const newUser = new Users({
          firstname,
          lastname,
          email,
          mobile,
          serialNo,
          regNo: `${prefix}${serialNo}${suffix}`,
          passwords: password,
        });
        bcryptjs.hash(password, 10, (err, hashedPassword) => {
          newUser.set("password", hashedPassword);
          newUser.save();
          next();
        });
        return res.status(200).json(newUser);
      }
    }
  } catch (error) {
    console.log(error, "Error");
  }
});

// login...............
router.post("/users/login", async (req, res, next) => {
  try {
    const { email, mobile, password } = req.body;

    if ((!email && !mobile) || !password) {
      return res.status(400).send("Please provide all required fields");
    }

    // Find user by email or mobile
    const query = email ? { email } : { mobile };
    const user = await Users.findOne(query);

    if (!user) {
      return res
        .status(400)
        .send("User email/mobile and password are incorrect");
    }

    // Validate the password
    const validateUser = await bcryptjs.compare(password, user.password);
    if (!validateUser) {
      console.log("Invalid password");
      return res
        .status(400)
        .send("User email/mobile and password are incorrect");
    }

    // Create JWT payload
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
        if (err) {
          console.log("Error signing token:", err);
          return res.status(500).send("Error signing token");
        }

        await Users.updateOne({ _id: user._id }, { $set: { token } });
        user.save();

        res.status(200).json({
          user: {
            id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
          },
          token: token,
        });
      }
    );
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});


// user lists..................
router.get("/users/list", async (req, res) => {
  try {
    const usersList = await Users.find();
    return res.status(200).json(usersList);
  } catch (error) {
    console.log(error, "Error");
    res.status(500).send("Internal Server Error");
  }
});
// User name update....................
router.put("/usernamd/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, gender } = req.body;

    const trimmedId = id.trim();

    if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
      return res.status(400).send("Invalid user ID");
    }

    let user = await Users.findById(trimmedId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.firstname = firstname;
    user.lastname = lastname;
    user.gender = gender;

    await user.save();

    res.status(200).send("User updated successfully");
  } catch (error) {
    console.error(error, "Error");
    return res.status(500).send("Server error");
  }
});
// User email update....................
router.put("/email/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const trimmedId = id.trim();

    if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
      return res.status(400).send("Invalid user ID");
    }

    let user = await Users.findById(trimmedId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.email = email;

    await user.save();

    res.status(200).send("User updated successfully");
  } catch (error) {
    console.error(error, "Error");
    return res.status(500).send("Server error");
  }
});
// User mobile update....................
router.put("/mobile/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { mobile } = req.body;

    const trimmedId = id.trim();

    if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
      return res.status(400).send("Invalid user ID");
    }

    let user = await Users.findById(trimmedId);

    if (!user) {
      return res.status(404).send("User not found");
    }
    // Update user details
    user.mobile = mobile;

    await user.save();

    res.status(200).send("User updated successfully");
  } catch (error) {
    console.error(error, "Error");
    return res.status(500).send("Server error");
  }
});
// User....................
router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const trimmedId = id.trim();

    if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
      return res.status(400).send("Invalid user ID");
    }
    let user = await Users.findById(trimmedId);

    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error, "Error");
    return res.status(500).send("Server error");
  }
});
// User Addresss POST details...
router.post("/address", async (req, res) => {
  try {
    const { userId, mobil, place, post, police, pin, state_id, district_id } = req.body;

    if (
      !userId ||
      !mobil ||
      !place ||
      !post ||
      !police ||
      !pin ||
      !state_id ||
      !district_id
    ) {
      return res.status(400).send("Please provide all required fields");
    }
    const newUser = new UserAddress({
      userId,
      mobil,
      place,
      post,
      police,
      pin,
      state_id,
      district_id
    });
    const address = await newUser.save();
    return res.status(201).json(address);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

// userAddress GET Request.......
router.get("/address/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await Users.findById(userId);
    const userAddresses = await UserAddress.find({ userId });

    if (!userAddresses.length) {
      return res.status(404).send("User addresses not found");
    }

    return res.status(200).json({ userAddresses, users });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error 400");
  }
});
// user address modified........................
router.put("/address/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { mobil, place, post, police, pin, state_id, district_id } = req.body;

    const updatedUserAddress = await UserAddress.findByIdAndUpdate(
      id,
      { mobil, place, post, police, pin, state_id, district_id },
      { new: true, runValidators: true }
    );

    if (!updatedUserAddress) {
      return res.status(404).send("User address not found");
    }

    return res.status(200).json(updatedUserAddress);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});
// user address Delete........................
router.delete("/address/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAddress = await UserAddress.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res.status(404).json({ error: "Address not found" });
    }

    return res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

// Orderaddress.... GET Request.......
router.get("/order/address/:id?", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      const firstAddress = await UserAddress.findOne(); 
      if (!firstAddress) {
        return res.status(404).send("No addresses available");
      }
      return res.status(200).json(firstAddress);
    }

    const trimmedId = id.trim();
    const orderAddress = await UserAddress.findById(trimmedId);

    if (!orderAddress) {
      return res.status(404).send("Address not found");
    }

    return res.status(200).json(orderAddress);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error 500");
  }
});

module.exports = router;
