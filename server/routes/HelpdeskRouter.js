const express = require("express");
const router = express.Router();
const moment = require("moment");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HelpDesk = require("../modules/HelpDesk");

// Admin register.....................
router.post("/helpdesk/register", async (req, res, next) => {
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
    } = req.body;

    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    var prefix = `MART${year}${month}${day}`;
    var suffix = "H";
    const hashPassword = await bcryptjs.hash(password, 15);
    const formattedDate = moment(dob, "DD.MM.YYYY").format("YYYY-MM-DD");

    const existingHelpDesk = await HelpDesk.findOne({
      $or: [
        { email: email },
        { mobile: mobile },
        { panNumber: panNumber },
        { aadharNumber: aadharNumber },
      ],
    });

    if (existingHelpDesk) {
      if (existingHelpDesk.email === email) {
        return res.status(409).json({ message: "Email already registered" });
      }
      if (existingHelpDesk.mobile === mobile) {
        return res
          .status(409)
          .json({ message: "Mobile number already registered" });
      }
      if (existingHelpDesk.panNumber === panNumber) {
        return res
          .status(409)
          .json({ message: "PAN number already registered" });
      }
      if (existingHelpDesk.aadharNumber === aadharNumber) {
        return res
          .status(409)
          .json({ message: "Aadhar number already registered" });
      }
    }

    const lastHelpDesk = await HelpDesk.findOne().sort({ serialNo: -1 });

    let serialNo = 1;
    if (lastHelpDesk && lastHelpDesk.serialNo) {
      serialNo = lastHelpDesk.serialNo + 1;
    }

    const newHelpDesk = new HelpDesk({
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
    });

    await newHelpDesk.save();

    return res.status(200).json(newHelpDesk);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
// login...............
router.post("/helpdesk/login", async (req, res, next) => {
  try {
    const { regNo, password } = req.body;
    if (!regNo || !password) {
      res.status(400).send("Plese all require files");
    } else {
      const user = await HelpDesk.findOne({ regNo });
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
              await HelpDesk.updateOne({ _id: user._id }, { $set: { token } });
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

// GET request to retrieve all HelpDesk users
router.get("/helpdesk/users", async (req, res) => {
  try {
    const users = await HelpDesk.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

// Update HelpDesk Boy...................
router.put("/helpdesk/update/:id", async (req, res, next) => {
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
    };

    const existingHelpDesk = await HelpDesk.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );

    if (!existingHelpDesk) {
      return res.status(404).json({ message: "HelpDesk not found" });
    }

    return res.status(200).json(existingHelpDesk);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
// Delete delevery.................
router.delete("/helpdesk/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const existingHelpDesk = await HelpDesk.findOneAndDelete({ _id: id });
    if (!existingHelpDesk) {
      return res.status(404).json({ message: "HelpDesk not found" });
    }

    return res.status(200).json({ message: "Delete SuccesFully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
// Only one User....................
router.get("/helpdesk/boy/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const existingHelpDesk = await HelpDesk.findOne({ _id: id });
    if (!existingHelpDesk) {
      return res.status(404).json({ message: "HelpDesk not found" });
    }

    return res.status(200).json(existingHelpDesk);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;