const router = require("express").Router();
const TopFertlizer = require("../../models/Kande/TopFertilizer");

router.route("/add").post((req, res) => {
    const { fertilizername,noofsales} = req.body;

    const addtopfertilizer = new TopFertlizer({
        fertilizername,
        noofsales
        
    });

    addtopfertilizer.save()
        .then(() => {
            res.status(200).json("Top Fertilizer Added");
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

router.route("/").get((req, res) => {
    TopFertlizer.find()
        .then(topfertilizer => {
            res.status(200).json(topfertilizer);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

router.route("/update/:id").put(async (req, res) => {
    const fId = req.params.id;
    const { fertilizername,noofsales } = req.body;

    const updateTopFertlizer = {
        fertilizername,
        noofsales
    };

    try {
        await TopFertlizer.findByIdAndUpdate(fId, updateTopFertlizer);
        res.status(200).json({ status: "Fertilizer Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error with updating data", error: err.message });
    }
});

router.route("/delete/:id").delete(async (req, res) => {
    const fid = req.params.id;

    try {
        await TopFertlizer.findByIdAndDelete(fid);
        res.status(200).json({ status: "Fertilizer Deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error with delete user", error: err.message });
    }
});

router.route("/get/:id").get(async (req, res) => {
    const fId = req.params.id;

    try {
        const user = await TopFertlizer.findById(fId);
        res.status(200).json({ status: "User fetched", user });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error with get user", error: err.message });
    }
});

module.exports = router;
