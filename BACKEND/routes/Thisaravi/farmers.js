const router = require("express").Router();
let Farmer = require("../../models/Thisaravi/Farmer");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//signup
router.route("/add").post(async (req, res)=>{

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const phone = Number(req.body.phone);
    const district = req.body.district;
    const city = req.body.city;
    const userName = req.body.userName;
    const password = req.body.password;

    const existingUser = await Farmer.findOne({ userName });
    if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
    }

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

// Login route
router.route("/login").post(async (req, res) => {
    const { username, password } = req.body;
    // Check if the username exists
    const user = await Farmer.findOne({ userName: username, password: password });
    if (!user) {
        return res.status(400).json({ error: "Invalid username or password" });
    }

    res.json({ user });
    
});


//Oshini
router.route("/getName/:farmerID").get(async (req, res) => {
    try {
      const userId = req.params.farmerID;
      const farmer = await Farmer.findById(userId);
      if (!farmer) {
        return res.status(404).json({ message: "Farmer not found" });
      }
      const fullName = `${farmer.first_name} ${farmer.last_name}`;
      res.status(200).json({ fullName });
    } catch (error) {
      console.error("Error fetching farmer name:", error);
      res.status(500).json({ message: "Failed to fetch farmer name. Please try again later." });
    }
  });
  

module.exports = router;