const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let Dealer = require('../../../models/Sudarshan/dealer_acc_mgmt/dealer');

router.post('/registerDealer', async (req, res) => {
    try {
        const name = req.body.name;
        const address = req.body.address;
        const email = req.body.email;
        const phone = req.body.phone;
        const storeLocation = req.body.storeLocation;
        const username = req.body.username;
        const password = req.body.password;
        const reEnteredPassword = req.body.reEnteredPassword;
      
      if (password !== reEnteredPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
  
      const existingEmail = await Dealer.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already registered' });
      }
  
      const existingUsername = await Dealer.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ error: 'Username already taken' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      
      const newDealer = new Dealer({
        name,
        address,
        email,
        phone,
        storeLocation,
        username,
        password: hashedPassword,
        reEnteredPassword, 
      });
  
      await newDealer.save();
  
      res.status(201).json({ message: 'Dealer registered successfully', dealer: newDealer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  module.exports = router;

  router.post('/loginDealer', async (req, res) => {
    const secretKey = '16811';
    try {
        const { username, password } = req.body;

        // Validate username and password presence
        if (!username || !password) {
            return res.status(400).json({ error: 'Please provide both username and password' });
        }

        // Find the dealer by username
        const dealer = await Dealer.findOne({ username });

        // If dealer doesn't exist
        if (!dealer) {
            return res.status(404).json({ error: 'Dealer not found' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, dealer.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Create and send JWT token
        const token = jwt.sign({ id: dealer._id }, process.env.JWT_SECRET || secretKey, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;