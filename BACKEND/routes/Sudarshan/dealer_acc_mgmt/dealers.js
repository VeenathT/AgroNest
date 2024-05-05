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

      if (!name || !address || !email || !phone || !storeLocation || !username || !password || !reEnteredPassword) {
          return res.status(400).json({ error: 'All fields are required' });
      }  
      
      if (password !== reEnteredPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }

      if (phone.length !== 10 || !(/^\d+$/.test(phone))) {
        return res.status(400).json({ error: 'Phone number should contain exactly 10 digits' });
    }

    const firstTwoDigits = phone.substring(0, 2);
    if (firstTwoDigits !== '07') {
        return res.status(400).json({ error: 'Phone number should contain 07XXXXXXXX' });
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
            return res.status(404).json({ error: 'Dealer not found! Invalid username' });
        }

        
        const isPasswordValid = await bcrypt.compare(password, dealer.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Password Incorrect' });
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

router.get('/alldealers', async (req, res) => {
  try {
    // Fetch all dealers from the database
    const dealers = await Dealer.find();

    if (!dealers || dealers.length === 0) {
      console.log('No dealers found');
      return res.status(404).json({ error: 'No dealers found' });
    }

    console.log('Dealers data:', dealers);
    
    res.status(200).json(dealers);
  } catch (error) {
    console.error('Error fetching dealers data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;



router.put('/updateDealer/:id', async (req, res) => {
  try {
    const dealerId = req.params.id;
    const { username, name, email, phone, storeLocation, address, password, reEnteredPassword} = req.body;

    console.log('Received Update Request for Dealer:', req.params.id);
    console.log('Request Body:', req.body);

    // Check if the dealer exists
    const dealer = await Dealer.findById(dealerId);
    if (!dealer) {
      return res.status(404).json({ error: 'Dealer not found' });
    }

    const existingUsername = await Dealer.findOne({ username });
    if (existingUsername && existingUsername._id.toString() !== dealerId) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Check if the email is already registered
    const existingEmail = await Dealer.findOne({ email });
    if (existingEmail && existingEmail._id.toString() !== dealerId) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Check if the phone number has exactly 10 digits and starts with '07'
    if (phone.length !== 10 || !(/^\d+$/.test(phone)) || !phone.startsWith('07')) {
      return res.status(400).json({ error: 'Phone number should contain exactly 10 digits and start with 07' });
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
    console.log('Dealer ID:', dealerId);
    const { name, price, quantity, itemcode } = req.body;
    console.log('Product details:', { name, price, quantity, itemcode });

    const existingFertilizer = await Fertilizer.findOne({ name });
    if (existingFertilizer) {
      // If fertilizer with the same name exists, send an error response
      return res.status(400).json({ error: 'Fertilizer with this name already exists' });
    }

    
    const newFertilizer = new Fertilizer({
      name,
      price,
      quantity,
      itemcode
    });

    
    const savedFertilizer = await newFertilizer.save();
    console.log('New fertilizer saved:', savedFertilizer);

    
    const updatedDealer = await Dealer.findByIdAndUpdate(dealerId, { $push: { fertilizers: savedFertilizer._id } }, { new: true });
    console.log('Dealer updated:', updatedDealer);

    res.status(201).json({ message: 'Product added successfully', dealer: updatedDealer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

router.get('/:dealerId/fertilizers', async (req, res) => {
  try {
    const { dealerId } = req.params;
    const dealer = await Dealer.findById(dealerId).populate('fertilizers');
    if (!dealer) {
      return res.status(404).json({ message: 'Dealer not found' });
    }
    console.log('Fetching fertilizers for dealer:', dealerId);
    
    const fertilizers = dealer.fertilizers;
    console.log('Fetched fertilizers:', fertilizers);
    res.json(fertilizers);
  } catch (error) {
    console.error('Error fetching fertilizers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

router.put('/updatefertilizers/:fertilizerId', async (req, res) => {
  const { fertilizerId } = req.params;
  const { price, quantity } = req.body;

  try {
    
    const updatedFertilizer = await Fertilizer.findByIdAndUpdate(fertilizerId, { price, quantity }, { new: true });

    if (!updatedFertilizer) {
      return res.status(404).json({ message: 'Fertilizer not found' });
    }

    res.json(updatedFertilizer);
  } catch (error) {
    console.error('Error updating fertilizer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

router.delete('/deletefertilizer/:fertilizerId', async (req, res) => {
  const { fertilizerId } = req.params;
  console.log('Fertilizer ID to delete:', fertilizerId);

  try {
    console.log('Finding fertilizer to delete...');
    
    const deletedFertilizer = await Fertilizer.findByIdAndDelete(fertilizerId);
    console.log('Deleted fertilizer:', deletedFertilizer);
    if (!deletedFertilizer) {
      console.log('Fertilizer not found');
      return res.status(404).json({ message: 'Fertilizer not found' });
    }
    console.log('Fertilizer deleted successfully');
    res.json({ message: 'Fertilizer deleted successfully', deletedFertilizer });
  } catch (error) {
    console.error('Error deleting fertilizer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

router.get('/fertilizers/search', async (req, res) => {
  try {
    const dealerId = req.query.dealerId; 
    const searchTerm = req.query.term;

    console.log('Searching for fertilizers with term:', searchTerm, 'for dealer ID:', dealerId);

    
    const dealer = await Dealer.findById(dealerId);
    console.log('Dealer found');
    if (!dealer) {
      console.log('Dealer not found');
      return res.status(404).json({ error: 'Dealer not found' });
    }

    const itemcodeSearch = parseInt(searchTerm);

    // Search for fertilizers based on the searchTerm and the associated dealer
    let fertilizers;
    if (!isNaN(searchTerm)) {
      // If the searchTerm is a number, search by itemcode directly
      fertilizers = await Fertilizer.find({
        _id: { $in: dealer.fertilizers }, // Filter fertilizers associated with the dealer
        itemcode: searchTerm // Search for itemcode as a number
      });
    } else {
      
      fertilizers = await Fertilizer.find({
        _id: { $in: dealer.fertilizers }, 
        name: { $regex: searchTerm, $options: 'i' } // Case-insensitive search by name
      });
    }

    console.log('Fertilizers found:', fertilizers);

    res.status(200).json(fertilizers);
  } catch (error) {
    console.error('Error searching fertilizers:', error);
    res.status(500).json({ error: 'Fertilizer not found' });
  }
});
module.exports = router;