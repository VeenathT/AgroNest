const router = require('express').Router();
let Lab = require("../../../models/Oshini/lab_account/labAccount");

//add new lab acount
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
      password,
      completed: 0,
      rejected: 0,
      level: 0
  })

  newLab.save().then(()=>{
      res.json("Laboratory Added")
  }).catch((err)=>{
      console.log(err);
  })

})


//get all lab account details
router.route("/").get((req,res)=>{

    Lab.find().then((labAccounts)=>{
        res.json(labAccounts)
    }).catch((err)=>{
        console.log(err)
    })
})


//update lab account by fetching by userName
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


//delete lab account by username
router.route("/delete/:userName").delete(async (req, res) => {
    let userName = req.params.userName;

    await Lab.findOneAndDelete({ userName: userName })
        .then((deletedUser) => {
            if (!deletedUser) {
                
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
    const { userName } = req.query; 
  
    const existingUser = await Lab.findOne({ userName });

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

      const user = await Lab.findOne({ userName });

      if (!user) {
        return res.json({ success: false, message: 'Invalid username or password' });
      } else if (user.password !== password) {

        return res.json({ success: false, message: 'Invalid username or password' });
      } else {
    
        res.json({ success: true, message: 'Login successful' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Login failed. Please try again later.' });
    }
  });




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
 
      const lab = await Lab.findOne({ userName });
      if (!lab) {
        return res.status(404).json({ message: 'Lab not found' });
      }
   
      res.status(200).json({ labId: lab._id });
    } catch (error) {
      console.error('Error retrieving labID by username:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.route("/incrementCompleted/").put(async (req, res) => {
    try {
        const userName = req.body.userName;
        

        await Lab.findOneAndUpdate(
            { userName: userName }, 
            { $inc: { completed: 1 } } 
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


    await Lab.findOneAndUpdate({ userName: userName }, { $inc: { rejected: 1 } });

    res.status(200).json({ message: 'Rejected value incremented successfully' });
  } catch (error) {
    console.error('Error incrementing rejected value:', error);
    res.status(500).json({ error: 'Failed to increment rejected value' });
  }
});



module.exports = router;


