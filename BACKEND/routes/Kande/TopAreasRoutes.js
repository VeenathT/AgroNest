const express = require("express");
const router = express.Router();
const TopAreas = require("../../models/Kande/TopAreas.js");

router.use(express.json()); // Middleware to parse JSON data

router.route("/add").post((req, res) => {
    const { fertilizername, area, noofsales } = req.body;

    const addTopAreas = new TopAreas({
        fertilizername,
        area,
        noofsales
    });

    addTopAreas.save()
        .then(() => {
            res.status(200).json("Top selling area Added");
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
    const { fertilizername,area, noofsales } = req.body;

    const updateTopAreas = {
        fertilizername,
        area,
        noofsales
    };

    try {
        await TopAreas.findByIdAndUpdate(fId, updateTopAreas);
        res.status(200).json({ status: "Fertilizer Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error with updating data", error: err.message });
    }
});

router.route("/delete/:id").delete(async (req, res) => {
    const fId = req.params.id;

    try {
        await TopAreas.findByIdAndDelete(fId);
        res.status(200).json({ status: "Fertilizer Deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error with delete user", error: err.message });
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
