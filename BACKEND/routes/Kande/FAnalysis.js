const router = require("express").Router();
const FAnalysis = require("../../models/FAnalysis/FAnalysis");

router.route("/add").post((req, res) => {
    const { name, gmail, age, address } = req.body;

    const addUser = new FAnalysis({
        name,
        gmail,
        age,
        address
    });

    addUser.save()
        .then(() => {
            res.status(200).json("User Added");
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

router.route("/").get((req, res) => {
    FAnalysis.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

router.route("/update/:id").put(async (req, res) => {
    const userId = req.params.id;
    const { name, gmail, age, address } = req.body;

    const updateUser = {
        name,
        gmail,
        age,
        address
    };

    try {
        await FAnalysis.findByIdAndUpdate(userId, updateUser);
        res.status(200).json({ status: "User Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error with updating data", error: err.message });
    }
});

router.route("/delete/:id").delete(async (req, res) => {
    const userId = req.params.id;

    try {
        await FAnalysis.findByIdAndDelete(userId);
        res.status(200).json({ status: "User Deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error with delete user", error: err.message });
    }
});

router.route("/get/:id").get(async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await FAnalysis.findById(userId);
        res.status(200).json({ status: "User fetched", user });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error with get user", error: err.message });
    }
});

module.exports = router;
