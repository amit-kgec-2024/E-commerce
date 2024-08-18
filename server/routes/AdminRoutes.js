const express = require("express");
const moment = require("moment");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../modules/Admin");
const State = require("../modules/State");
const District = require("../modules/District");

router.post("/admin/register", async (req, res) => {
  try {
    const { email, mobile, panNumber, aadharNumber } = req.body;

    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    var prefix = `MART${year}${month}${day}`;
    var suffix = "AD";

    const existingAdmin = await Admin.findOne({
      $or: [
        { email: email },
        { mobile: mobile },
        { panNumber: panNumber },
        { aadharNumber: aadharNumber },
      ],
    });

    if (existingAdmin) {
      if (existingAdmin.email === email) {
        return res.status(409).json({ message: "Email already registered" });
      }
      if (existingAdmin.mobile === mobile) {
        return res
          .status(409)
          .json({ message: "Mobile number already registered" });
      }
      if (existingAdmin.panNumber === panNumber) {
        return res
          .status(409)
          .json({ message: "PAN number already registered" });
      }
      if (existingAdmin.aadharNumber === aadharNumber) {
        return res
          .status(409)
          .json({ message: "Aadhar number already registered" });
      }
    }

    const lastAdmin = await Admin.findOne().sort({ serialNo: -1 });

    let serialNo = 1;
    if (lastAdmin && lastAdmin.serialNo) {
      serialNo = lastAdmin.serialNo + 1;
    }

    const newAdmin = new Admin({
      email,
      mobile,
      serialNo,
      regNo: `${prefix}${serialNo}${suffix}`,
      panNumber,
      aadharNumber,
    });

    await newAdmin.save();

    return res.status(200).json(newAdmin.regNo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
//Admin Register..............
router.put("/admin/register/:regNo", async (req, res) => {
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
      bankImage,
      bankNumber,
      gender,
      state_id,
      district_id,
    } = req.body;

    const hashPassword = await bcryptjs.hash(password, 15);
    const formattedDate = moment(dob, "DD.MM.YYYY").format("YYYY-MM-DD");

    const existingAdmin = await Admin.findOne({
      regNo: regNo,
    });

    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    existingAdmin.firstname = firstname;
    existingAdmin.lastname = lastname;
    existingAdmin.password = hashPassword;
    existingAdmin.passwords = password;
    existingAdmin.dob = formattedDate;
    existingAdmin.profImage = profImage;
    existingAdmin.fatherName = fatherName;
    existingAdmin.husbandName = husbandName;
    existingAdmin.briefDescription = briefDescription;
    existingAdmin.qulification = qulification;
    existingAdmin.community = community;
    existingAdmin.pin = pin;
    existingAdmin.permamentAddress = permamentAddress;
    existingAdmin.temporaryAddress = temporaryAddress;
    existingAdmin.panImage = panImage;
    existingAdmin.aadharImage = aadharImage;
    existingAdmin.bankImage = bankImage;
    existingAdmin.bankNumber = bankNumber;
    existingAdmin.gender = gender;
    existingAdmin.state_id = state_id;
    existingAdmin.district_id = district_id;

    await existingAdmin.save();

    return res.status(200).json(existingAdmin);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
// login...............
router.post("/admin/login", async (req, res) => {
  try {
    const { regNo, password } = req.body;
    if (!regNo || !password) {
      res.status(400).send("Plese all require files");
    } else {
      const user = await Admin.findOne({ regNo });
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
              await Admin.updateOne({ _id: user._id }, { $set: { token } });
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
router.get("/admin/users", async (req, res) => {
  try {
    const users = await Admin.find();

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

// update Admins..........................................
router.put("/admin/update/:id", async (req, res) => {
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
      bankImage,
      bankNumber,
      state_id,
      district_id,
    } = req.body;

    const formattedDate = moment(dob, "DD.MM.YYYY").format("YYYY-MM-DD");

    const updateData = {
      firstname,
      lastname,
      email,
      mobile,
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
      bankImage,
      bankNumber,
      state_id,
      district_id,
    };

    const existingAdmin = await Admin.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );

    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json(existingAdmin);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
// Delete Admins..................
router.delete("/admin/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const existingAdmin = await Admin.findOneAndDelete({ _id: id });
    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.status(200).json({ message: "Delete SuccesFully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
// Only One Admin show..............
router.get("/admin/boy/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const existingAdmin = await Admin.findOne({ _id: id });
    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
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
router.put("/admin/change/password", async (req, res) => {
  try {
    const { email, mobile, newPassword } = req.body;

    if (!email || !mobile || !newPassword) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const user = await Admin.findOne({ email, mobile });
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
