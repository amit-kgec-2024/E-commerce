const express = require("express");
const router = express.Router();
const moment = require("moment");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Delivery = require("../modules/Delivery");
const State = require("../modules/State");
const District = require("../modules/District");

// Delivery register.....................
router.post("/delivery/register", async (req, res) => {
  try {
    const { email, mobile, panNumber, aadharNumber } = req.body;

    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    var prefix = `MART${year}${month}${day}`;
    var suffix = "DP";

    const existingDelivery = await Delivery.findOne({
      $or: [
        { email: email },
        { mobile: mobile },
        { panNumber: panNumber },
        { aadharNumber: aadharNumber },
      ],
    });

    if (existingDelivery) {
      if (existingDelivery.email === email) {
        return res.status(409).json({ message: "Email already registered" });
      }
      if (existingDelivery.mobile === mobile) {
        return res
          .status(409)
          .json({ message: "Mobile number already registered" });
      }
      if (existingDelivery.panNumber === panNumber) {
        return res
          .status(409)
          .json({ message: "PAN number already registered" });
      }
      if (existingDelivery.aadharNumber === aadharNumber) {
        return res
          .status(409)
          .json({ message: "Aadhar number already registered" });
      }
    }

    const lastDelivery = await Delivery.findOne().sort({ serialNo: -1 });

    let serialNo = 1;
    if (lastDelivery && lastDelivery.serialNo) {
      serialNo = lastDelivery.serialNo + 1;
    }

    const newDelivery = new Delivery({
      email,
      mobile,
      serialNo,
      regNo: `${prefix}${serialNo}${suffix}`,
      panNumber,
      aadharNumber,
    });

    await newDelivery.save();

    return res.status(200).json(newDelivery.regNo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
//Delivery Register..............
router.put("/delivery/register/:regNo", async (req, res) => {
  try {
    const regNo = req.params.regNo;
    const {
      firstname,
      lastname,
      password,
      dob,
      profImage,
      fatherName,
      husbandName,
      briefDescription,
      qulification,
      community,
      pin,
      permamentAddress,
      temporaryAddress,
      panImage,
      aadharImage,
      gender,
      state_id,
      district_id,
    } = req.body;

    const hashPassword = await bcryptjs.hash(password, 15);
    const formattedDate = moment(dob, "DD.MM.YYYY").format("YYYY-MM-DD");

    const existingDelivery = await Delivery.findOne({
      regNo: regNo,
    });

    if (!existingDelivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    existingDelivery.firstname = firstname;
    existingDelivery.lastname = lastname;
    existingDelivery.password = hashPassword;
    existingDelivery.passwords = password;
    existingDelivery.dob = formattedDate;
    existingDelivery.profImage = profImage;
    existingDelivery.fatherName = fatherName;
    existingDelivery.husbandName = husbandName;
    existingDelivery.briefDescription = briefDescription;
    existingDelivery.qulification = qulification;
    existingDelivery.community = community;
    existingDelivery.pin = pin;
    existingDelivery.permamentAddress = permamentAddress;
    existingDelivery.temporaryAddress = temporaryAddress;
    existingDelivery.panImage = panImage;
    existingDelivery.aadharImage = aadharImage;
    existingDelivery.gender = gender;
    existingDelivery.state_id = state_id;
    existingDelivery.district_id = district_id;

    await existingDelivery.save();

    return res.status(200).json(existingDelivery);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// login...............
router.post("/delivery/login", async (req, res) => {
  try {
    const { regNo, password } = req.body;
    if (!regNo || !password) {
      res.status(400).send("Plese all require files");
    } else {
      const user = await Delivery.findOne({ regNo });
      if (!user) {
        res.status(400).send("User regNo & Password is Incorrect");
      } else {
        const valideteUser = await bcryptjs.compare(password, user.password);
        if (!valideteUser) {
          res.status(400).send("User regNo & Password is Incorrect");
        } else {
          const payload = {
            userId: user._id,
            regNo: user.regNo,
          };
          const JWT_SECRET_KEY =
            process.env.JWT_SECRET_KEY || "THIS_IS_A_JWT_SECRET_KEY";
          jwt.sign(
            payload,
            JWT_SECRET_KEY,
            { expiresIn: 86400 },
            async (err, token) => {
              await Delivery.updateOne({ _id: user._id }, { $set: { token } });
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
        }
      }
    }
  } catch (error) {
    console.log(error, "Error");
  }
});

// GET request to retrieve all delivery users
router.get("/delivery/users", async (req, res) => {
  try {
    const users = await Delivery.find();
    const stateIds = users.map((user) => user.state_id);
    const districtIds = users.map((user) => user.district_id);

    const states = await State.find({ state_id: { $in: stateIds } });
    const districts = await District.find({
      district_id: { $in: districtIds },
    });

    const usersWithDetails = users.map((user) => {
      const userState = states.find(
        (state) => state.state_id === user.state_id
      );
      const userDistrict = districts.find(
        (district) => district.district_id === user.district_id
      );

      return {
        ...user._doc,
        state_name: userState ? userState.state_name : "State not found",
        district_name: userDistrict
          ? userDistrict.district_name
          : "District not found",
      };
    });

    return res.status(200).json(usersWithDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

// Update Delivery Boy...................
router.put("/delivery/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {
      firstname,
      lastname,
      email,
      mobile,
      password,
      dob,
      profImage,
      fatherName,
      husbandName,
      briefDescription,
      qulification,
      community,
      pin,
      permamentAddress,
      temporaryAddress,
      state_id,
      district_id,
    } = req.body;

    const formattedDate = moment(dob, "DD.MM.YYYY").format("YYYY-MM-DD");

    const updateData = {
      firstname,
      lastname,
      email,
      mobile,
      password,
      dob: formattedDate,
      profImage,
      fatherName,
      husbandName,
      briefDescription,
      qulification,
      community,
      pin,
      permamentAddress,
      temporaryAddress,
      state_id,
      district_id,
    };

    const existingDelivery = await Delivery.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );

    if (!existingDelivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    return res.status(200).json(existingDelivery);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
// Delete delevery.................
router.delete("/delivery/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const existingDelivery = await Delivery.findOneAndDelete({ _id: id });
    if (!existingDelivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    return res.status(200).json({ message: "Delete SuccesFully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
// Only one User....................
router.get("/delivery/boy/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const existingDelivery = await Delivery.findOne({ _id: id });
    if (!existingDelivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    const state = await State.findOne({ state_id: existingAdmin.state_id });
    const district = await District.findOne({
      district_id: existingAdmin.district_id,
    });

    const response = {
      ...existingAdmin._doc,
      state_name: state ? state.state_name : "State not found",
      district_name: district ? district.district_name : "District not found",
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Forget password..........
router.put("/delivery/change/password", async (req, res) => {
  try {
    const { email, mobile, newPassword } = req.body;

    if (!email || !mobile || !newPassword) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const user = await Delivery.findOne({ email, mobile });
    if (!user) {
      return res.status(400).json({
        message: "User with provided email and mobile number not found",
      });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 15);
    user.password = hashedPassword;
    user.passwords = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
