const express = require("express");
const moment = require("moment");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../modules/Admin");

router.post("/admin/register", async (req, res) => {
  try {
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
      panNumber,
      panImage,
      aadharNumber,
      aadharImage,
      gender,
      state_id,
      district_id,
    } = req.body;

    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    var prefix = `MART${year}${month}${day}`;
    var suffix = "AD";
    const hashPassword = await bcryptjs.hash(password, 15);
    const formattedDate = moment(dob, "DD.MM.YYYY").format("YYYY-MM-DD");

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
      firstname,
      lastname,
      email,
      mobile,
      password: hashPassword,
      passwords: password,
      serialNo,
      regNo: `${prefix}${serialNo}${suffix}`,
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
      panNumber,
      panImage,
      aadharNumber,
      aadharImage,
      gender,
      state_id,
      district_id,
    });

    await newAdmin.save();

    return res.status(200).json(newAdmin);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// login...............
router.post("/admin/login", async (req, res, next) => {
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
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});
// update Admins..........................................
router.put("/admin/update/:id", async (req, res, next) => {
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
router.delete("/admin/delete/:id", async (req, res, next) => {
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
router.get("/admin/boy/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const existingAdmin = await Admin.findOne({ _id: id });
    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json(existingAdmin);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
