const express = require("express");
const router = express.Router();
const TopAreas = require("../../models/Kande/TopAreas.js");

router.use(express.json()); // Middleware to parse JSON data

router.route("/add").post((req, res) => {
    const {  area,  noofRegistrations } = req.body;

    const addTopAreas = new TopAreas({
        area,
        noofRegistrations
    });

    addTopAreas.save()
        .then(() => {
            res.status(200).json("Top registerd area Added");
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

router.route("/").get((req, res) => {
    TopAreas.find()
        .then(topAreas => {
            res.status(200).json(topAreas);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

router.route("/update/:id").put(async (req, res) => {
    const fId = req.params.id;
    const { area, noofRegistrations } = req.body;

    const updateTopAreas = {
        
        area,
        noofRegistrations
    };

    try {
        await TopAreas.findByIdAndUpdate(fId, updateTopAreas);
        res.status(200).json({ status: "Top registerd area Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error with updating data", error: err.message });
    }
});

router.route("/delete/:id").delete(async (req, res) => {
    const fId = req.params.id;

    try {
        await TopAreas.findByIdAndDelete(fId);
        res.status(200).json({ status: "top registerd area Deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error with delete area", error: err.message });
    }
});

router.route("/get/:id").get(async (req, res) => {
    const fId = req.params.id;

    try {
        const user = await TopAreas.findById(fId);
        res.status(200).json({ status: "User fetched", user });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error with get user", error: err.message });
    }
});

module.exports = router;
