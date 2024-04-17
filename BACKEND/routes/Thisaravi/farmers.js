const router = require("express").Router();
let Farmer = require("../../models/Thisaravi/Farmer");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//signup
router.route("/add").post((req,res)=>{

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const phone = Number(req.body.phone);
    const district = req.body.district;
    const city = req.body.city;
    const userName = req.body.userName;
    const password = req.body.password;

    const newFarmer = new Farmer({

        first_name,
        last_name,
        email,
        phone,
        district,
        city,
        userName,
        password
    })

    newFarmer.save().then((farmer)=>{
        res.json({ status: "Farmer Added", farmerID: farmer._id });
    }).catch((err)=>{
        console.log(err);
        res.status(400).json({ error: err.message });
    })

})

router.route("/").get((req,res)=>{

    Farmer.find().then((farmers)=>{
        res.json(farmers)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:farmerID").put(async(req,res)=>{
    let userId = req.params.farmerID;
    const{first_name, last_name, email, phone, district, city, userName,password} = req.body;

    const updateFarmer ={
        first_name,
        last_name,
        email,
        phone,
        district,
        city,
        userName,
        password
    }

    const update = await Farmer.findByIdAndUpdate(userId,updateFarmer).then(()=>{
        res.status(200).send({status: "User Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.message});
    })

})

router.route("/delete/:farmerID").delete(async(req,res)=>{
    let userId = req.params.farmerID;
    
    await Farmer.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status: "User Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user",error: err.message});
    })
})

router.route("/get/:farmerID").get(async(req,res)=>{
    let userId = req.params.farmerID;
    const user = await Farmer.findById(userId)
    .then((farmer)=>{
        res.status(200).send({status: "User fetched", farmer})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user",error: err.message});
    })
})

module.exports = router;