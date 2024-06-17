const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const Users = require("../modules/Users");
const UserDetails = require("../modules/UserDetails");
const UserProfiles = require("../modules/UserProfiles");

// register............
router.post("/register", async (req, res, next) => {
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
router.post("/login", async (req, res, next) => {
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
router.post("/userdetails", async (req, res) => {
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
router.get("/userdetails/:userId", async (req, res) => {
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
router.post("/userprofile", async (req, res) => {
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
router.get("/userprofileget/:userId", async (req, res) => {
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


module.exports = router;