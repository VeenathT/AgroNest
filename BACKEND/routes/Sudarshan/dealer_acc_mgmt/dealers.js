const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let Dealer = require('../../../models/Sudarshan/dealer_acc_mgmt/dealer');
let Fertilizer = require('../../../models/Sudarshan/inventory_mgmt/fertilizer');

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

        
        if (!username || !password) {
            return res.status(400).json({ error: 'Please provide both username and password' });
        }

        
        const dealer = await Dealer.findOne({ username });

        
        if (!dealer) {
            return res.status(404).json({ error: 'Dealer not found' });
        }

        
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

router.get('/dealers', async (req, res) => {
  try {
    // Extract user ID from JWT token
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || '16811');
    const dealerId = decodedToken.id;

    console.log('Dealer ID from JWT:', dealerId);

    // Fetch dealer data from the database
    const dealer = await Dealer.findById(dealerId);

    if (!dealer) {
      console.log('Dealer not found');
      return res.status(404).json({ error: 'Dealer not found' });
    }

    console.log('Dealer data:', dealer);

    res.status(200).json(dealer);
  } catch (error) {
    console.error('Error fetching dealer data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;



router.put('/updateDealer/:id', async (req, res) => {
  try {
    const dealerId = req.params.id;
    const { username, name, email, phone, storeLocation, address, password, reEnteredPassword, image } = req.body;

    console.log('Received Update Request for Dealer:', req.params.id);
    console.log('Request Body:', req.body);
    console.log('Image Data:', image);

    // Check if the dealer exists
    const dealer = await Dealer.findById(dealerId);
    if (!dealer) {
      return res.status(404).json({ error: 'Dealer not found' });
    }

    // Check if the password matches the re-entered password
    if (password !== reEnteredPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update dealer details
    dealer.username = username;
    dealer.name = name;
    dealer.email = email;
    dealer.phone = phone;
    dealer.storeLocation = storeLocation;
    dealer.address = address;
    if (image) {
      console.log('Updating Image...');
      console.log('Image Data:', image);
      dealer.image.data = image.data;
      dealer.image.contentType = image.contentType;
      console.log('Dealer Image Data:', dealer.image);
    }
    dealer.password = hashedPassword; // Store hashed password in the database
    dealer.reEnteredPassword = reEnteredPassword;

    // Save updated dealer details
    await dealer.save();
    console.log('Dealer Details Updated Successfully:', dealer);
    res.status(200).json({ message: 'Dealer details updated successfully', dealer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

router.delete('/delete/:id', async (req, res) => {
  try {
    const dealerId = req.params.id;

    // Check if the dealer exists
    const dealer = await Dealer.findById(dealerId);
    if (!dealer) {
      return res.status(404).json({ error: 'Dealer not found' });
    }

    // Delete the dealer profile
    await Dealer.findByIdAndDelete(dealerId);

    // Optionally, you can also revoke any existing JWT tokens associated with this dealer
    // This prevents the deleted dealer from accessing protected routes with previously issued tokens

    res.status(200).json({ message: 'Dealer profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;

router.post('/addProduct', async (req, res) => {
  try {

    console.log('Request received to add product:', req.body);
    const dealerId = req.body.id; 
    console.log('Dealer ID:', dealerId);// Assuming you have the dealer ID available
    const { name, price, quantity, itemcode } = req.body;
    console.log('Product details:', { name, price, quantity, itemcode });

    // Create a new fertilizer document
    const newFertilizer = new Fertilizer({
      name,
      price,
      quantity,
      itemcode
    });

    // Save the new fertilizer document to the database
    const savedFertilizer = await newFertilizer.save();
    console.log('New fertilizer saved:', savedFertilizer);

    // Find the dealer by ID and update the fertilizers array
    const updatedDealer = await Dealer.findByIdAndUpdate(dealerId, { $push: { fertilizers: savedFertilizer._id } }, { new: true });
    console.log('Dealer updated:', updatedDealer);

    res.status(201).json({ message: 'Product added successfully', dealer: updatedDealer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;