const router=require("express").Router();
const SoilTest = require("../../models/Thisaravi/SoilTest");
const Laboratory = require("../../models/Oshini/lab_account/labAccount");

//add
router.post("/add", async (req, res) => {
    try {
        const { soilTestType, cropType, areaOfCultivation, district, city } = req.body;

        const laboratories = await Laboratory.find({ district, city });

        if (laboratories.length === 0) {
            return res.status(400).json({ error: "No laboratories found in the specified district and city." });
        }

        const newSoilTest = new SoilTest({
            soilTestType,
            cropType,
            areaOfCultivation,
            district,
            city,
            laboratory: laboratories[0]._id,
            status: "pending"
        });

        await newSoilTest.save();

        res.json("Soil Testing Request Added");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/cities/:district", async (req, res) => {
    try {
        const { district } = req.params;
        const cities = await Laboratory.distinct("city", { district });
        res.json(cities);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/laboratories/:district/:city", async (req, res) => {
    try {
        const { district, city } = req.params;
        const laboratories = await Laboratory.find({ district, city });
        res.json(laboratories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

//update
router.put("/update/:requestID", async (req, res) => {
    try {
        const { requestID } = req.params;
        const { soilTestType, cropType, areaOfCultivation } = req.body;

        const updatedRequest = await SoilTest.findByIdAndUpdate(requestID, {
            soilTestType,
            cropType,
            areaOfCultivation
        });

        res.json("Soil Testing Request Updated");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

//delete
router.delete("/delete/:requestID", async (req, res) => {
    try {
        const { requestID } = req.params;

        await SoilTest.findByIdAndDelete(requestID);

        res.json("Soil Testing Request Deleted");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

//Get
router.get("/get/:requestID", async (req, res) => {
    try {
        const { requestID } = req.params;
        const soilTest = await SoilTest.findById(requestID);
        res.json(soilTest);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports= router;
