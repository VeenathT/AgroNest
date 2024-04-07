const router = require('express').Router();
let Fertilizer = require('../../../models/Sudarshan/inventory_mgmt/fertilizer');

router.route('/addFertilizer').post((req, res) => {
    const name = req.body.name;
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity);

    const newFertilizer = new Fertilizer({
        name,
        price,
        quantity
    })

    newFertilizer.save().then(() => {
        res.json("Fertilizer added!");
    }).catch((err) => {
        console.log(err);
    })
}) 
module.exports = router;

router.route('/displayAllFertilizers').get((req, res) => {
    Fertilizer.find().then((fertilizers) => {
        res.json(fertilizers);
    }).catch((err) => {
        console.log(err);
    })
})
module.exports = router;

router.route('/updateFertilizer/:id').put(async (req, res) => {
    let fertilizerId = req.params.id;
    const {name, price, quantity} = req.body;

    const updateFertilizer = {
        name,
        price,
        quantity
    }

    const update = await Fertilizer.findByIdAndUpdate(fertilizerId, updateFertilizer).then(() => {
        res.status(200).send({status: "Fertilizer updated!"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data!", error: err.message});
    })
})
module.exports = router;

router.route('/deleteFertilizer/:id').delete(async (req, res) => {
    let fertilizerId = req.params.id;

    await Fertilizer.findByIdAndDelete(fertilizerId).then(() => {
        res.status(200).send({status: "Fertilizer deleted!"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with deleting data!", error: err.message});
    })
})
module.exports = router;

router.route('/getFertilizer/:id').get(async (req, res) => {
    let fertilizerId = req.params.id;

    const fertilizer = await Fertilizer.findById(fertilizerId).then((fertilizer) => {
        res.status(200).send({status: "Fertilizer fetched!",fertilizer});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with fetching data!", error: err.message});
    })
})
module.exports = router;
