const express = require("express");
const router = express.Router();
const State = require("../modules/State");
const District = require("../modules/District");

router.post("/register", async (req, res, next) => {
  try {
    const { state_name } = req.body;

    const lastState = await State.findOne().sort({ state_id: -1 });

    let state_id = 1;
    if (lastState && lastState.state_id) {
      state_id = lastState.state_id + 1;
    }

    const newState = new State({
      state_id,
      state_name,
    });

    await newState.save();

    return res.status(200).json(newState);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/district/register", async (req, res, next) => {
  try {
    const { state_id, district_name } = req.body;

    const lastDistrict = await District.findOne().sort({ district_id: -1 });

    let district_id = 1;
    if (lastDistrict && lastDistrict.district_id) {
      district_id = lastDistrict.district_id + 1;
    }

    const newDistrict = new District({
        state_id,
      district_id,
      district_name,
    });

    await newDistrict.save();

    return res.status(200).json(newDistrict);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/district/:id", async (req, res)=>{
    try {
        const state = req.params.id;
        const findDistrict = await District.find({state_id: state});
        return res.status(200).json(findDistrict);
        
    } catch (error) {
       console.error(error);
       return res.status(500).json({ message: "Internal server error" }); 
    }
})

router.get("/list", async (req, res)=> {
    try {
        const states = await State.find();
        return res.status(200).json(states);
    } catch (error) {
       console.error(error);
       return res.status(500).json({ message: "Internal server error" }); 
    }
})
router.get("/district/list", async (req, res)=> {
    try {
        const districts = await District.find();
        return res.status(200).json(districts);
    } catch (error) {
       console.error(error);
       return res.status(500).json({ message: "Internal server error" }); 
    }
})

module.exports = router;
