const router = require('express').Router();
let Lab = require("../../../models/Oshini/lab_account/labAccount");

router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const address = req.body.address;
    const phone = Number(req.body.phone);
    const district = req.body.district;
    const city = req.body.city;
    const userName = req.body.userName;
    const password = req.body.password;

    const newLab = new Lab({ 
        name,
        address,
        phone,
        district,
        city,
        userName,
        password
    })

    newLab.save().then(()=>{
        res.json("Laboratory Added")
    }).catch((err)=>{
        console.log(err);
    })

})


router.route("/").get((req,res)=>{

    Lab.find().then((labAccounts)=>{
        res.json(labAccounts)
    }).catch((err)=>{
        console.log(err)
    })
})



router.route("/update/:labID").put(async(req,res)=>{
    let userId = req.params.labID;
    const{name, address, phone, district, city, userName, password} = req.body;

    const updateLab ={
        name,
        address,
        phone,
        district,
        city,
        userName,
        password
    }

    const update = await Lab.findByIdAndUpdate(userId,updateLab).then(()=>{
        res.status(200).send({status: "User Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.message});
    })

})


router.route("/delete/:labID").delete(async(req,res)=>{
    let userId = req.params.labID;
    
    await newLab.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status: "User Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error in deleting user",error: err.message});
    })
})

router.route("/get/:labID").get(async(req,res)=>{
    let userId = req.params.labID;
    const user = await Lab.findById(userId)
    .then((labAccount)=>{
        res.status(200).send({status: "User fetched", labAccount})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user",error: err.message});
    })
})


router.route("/checkUserName").get(async (req, res) => {
    try {
      // Extract the username from the request parameters
      const { userName } = req.body;
  
      // Query the database to find if any user exists with that username
      const existingUser = await Lab.findOne({ userName });
  
      // If a user with the given username is found, return status true
      // Otherwise, return status false
      const status = !!existingUser;
  
      res.status(200).json({ status });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error checking username existence" });
    }
  });


  
  router.route('/login')
  .post(async (req, res) => {
    const { userName, password } = req.body;

    try {
      // Check if the username exists in the database
      const user = await Lab.findOne({ userName });

      if (!user) {
        return res.json({ success: false, message: 'Invalid username or password' });
      } else if (user.password !== password) {
        // Compare the provided password with the password stored in the database
        return res.json({ success: false, message: 'Invalid username or password' });
      } else {
        // If both username and password are correct, set up a session and store userName in it
        //req.session.userName = userName;

        // Return success response
        res.json({ success: true, message: 'Login successful' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Login failed. Please try again later.' });
    }
  });



module.exports = router;


