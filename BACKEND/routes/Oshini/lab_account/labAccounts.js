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

  // Assign default values of 0 to the new fields
  const newLab = new Lab({ 
      name,
      address,
      phone,
      district,
      city,
      userName,
      password,
      completed: 0,
      rejected: 0
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



router.route("/update/:userName").put(async (req, res) => {
    try {
        const userName = req.params.userName;
        const { name, address, phone, district, city, password } = req.body;

        const updateLab = {
            name,
            address,
            phone,
            district,
            city,
            password
        };

        // Assuming Lab is your Mongoose model
        const updatedLab = await Lab.findOneAndUpdate({ userName }, updateLab, { new: true });

        if (!updatedLab) {
            return res.status(404).send({ status: "Lab not found" });
        }

        res.status(200).send({ status: "User Updated", data: updatedLab });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});



router.route("/delete/:userName").delete(async (req, res) => {
    let userName = req.params.userName;

    await Lab.findOneAndDelete({ userName: userName })
        .then((deletedUser) => {
            if (!deletedUser) {
                // If no user was found with the specified userName
                return res.status(404).send({ status: "User not found" });
            }
            res.status(200).send({ status: "User Deleted" });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error in deleting user", error: err.message });
        });
});


router.route("/get/:userName").get(async (req, res) => {
  try {
    const userName = req.params.userName;
    const labAccount = await Lab.findOne({ userName: userName });
    
    if (labAccount) {
      res.status(200).send({ status: "User fetched", labAccount });
    } else {
      res.status(404).send({ status: "User not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with get user", error: err.message });
  }
});


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
        // Return success response
        res.json({ success: true, message: 'Login successful' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Login failed. Please try again later.' });
    }
  });



// Route to retrieve lab details based on userName
router.route('/retrieve').get(async (req, res) => {
    const { userName } = req.query;
    try {
      const labDetails = await Lab.findOne({ userName });
      if (!labDetails) {
        return res.status(404).json({ message: 'Lab not found' });
      }
      res.status(200).json(labDetails);
    } catch (error) {
      console.error('Error retrieving lab details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/getLabIdByUsername/:userName', async (req, res) => {
    try {
      const { userName } = req.params;
      // Find the lab by userName
      const lab = await Lab.findOne({ userName });
      if (!lab) {
        return res.status(404).json({ message: 'Lab not found' });
      }
      // Return the labID
      res.status(200).json({ labId: lab._id });
    } catch (error) {
      console.error('Error retrieving labID by username:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.route("/incrementCompleted/").put(async (req, res) => {
    try {
        const userName = req.body.userName;
        
        // Find the laboratory by userName and update the completed field
        await Lab.findOneAndUpdate(
            { userName: userName }, 
            { $inc: { completed: 1 } } // Increment the completed field by 1
        );

        res.status(200).json({ status: "Completed value incremented" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error incrementing completed value", error: err.message });
    }
});

router.route('/incrementRejected').put(async (req, res) => {
  try {
    const userName = req.body.userName;

    // Find the laboratory by userName and update the rejected value
    await Lab.findOneAndUpdate({ userName: userName }, { $inc: { rejected: 1 } });

    res.status(200).json({ message: 'Rejected value incremented successfully' });
  } catch (error) {
    console.error('Error incrementing rejected value:', error);
    res.status(500).json({ error: 'Failed to increment rejected value' });
  }
});



module.exports = router;


