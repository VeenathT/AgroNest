const router = require("express").Router();
const topsellingSchema = require("../../models/Kande/Topselling");

router.route("/add").post((req, res) => {
    const { dealername,noofsales } = req.body;

    const adddealer = new topsellingSchema({
        dealername,noofsales

    });

    adddealer.save()
        .then(() => {
            res.status(200).json("dealer Added");
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

router.route("/").get((req, res) => {
    topsellingSchema.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

router.route("/update/:id").put(async (req, res) => {
    const dId = req.params.id;
    const { dealername, noofsales } = req.body;

    const updateDealer = {
        dealername,
        noofsales
    };

    try {
        await topsellingSchema.findByIdAndUpdate(dId, updateDealer);
        res.status(200).json({ status: "Dealer Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error with updating data", error: err.message });
    }
});

router.route("/delete/:id").delete(async (req, res) => {
    const userId = req.params.id;

    try {
        await topsellingSchema.findByIdAndDelete(userId);
        res.status(200).json({ status: "User Deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error with delete user", error: err.message });
    }
});

router.route("/get/:id").get(async (req, res) => {
    const dId = req.params.id;

    try {
        const user = await topsellingSchema.findById(dId);
        res.status(200).json({ status: "Dealer fetched", user });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error with get Dealer", error: err.message });
    }
});

module.exports = router;
