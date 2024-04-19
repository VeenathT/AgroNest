const express = require('express');
let Order = require('../../models/Lasindu/Order');

const router = express.Router();

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const itemcode = Number(req.body.itemcode);
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity);

    const newItem = new Order({
        name,
        itemcode,
        price,
        quantity,
    });

    newItem.save().then(() => {
        res.json("Order Placed");
    }).catch((err) => {
        console.log(err);
    });
});

router.route('/displayAll').get((req, res) => {
    Order.find().then((orders) => {
        res.json(orders);
    }).catch((err) => {
        console.log(err);
    });
});

router.route('/update/:id').put(async (req, res) => {
    let id = req.params.id;
    const price = req.body.price;
    const quantity = req.body.quantity;

    const updatedItem = {
        price,
        quantity,
    };

    const update = await Item.findByIdAndUpdate(id, updatedItem)
    .then(() => {
        res.status(200).send({ status: "Item Updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    });
    
});

router.route('/delete/:id').delete(async (req, res) => {
    let id = req.params.id;
    Item.findByIdAndDelete(id).then(() => {
        res.status(200).send({ status: "Order Deleted" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with deleting data", error: err.message });
    });
});

router.route('/get/:id').get(async (req, res) => {
    let id = req.params.id;
    await Item.findById(id).then((item) => {
        res.status(200).send({ status: "Item Fetched", item });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with fetching data", error: err.message });
    });
});

module.exports = router;