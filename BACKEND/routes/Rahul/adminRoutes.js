const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let Admin = require('../../models/Rahul/Admin'); 

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Please provide both username and password' });
    }

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Create JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || '16811', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// fetch admin's name
router.get('/admins', async (req, res) => {
  try {
  
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || '16811');
    const adminId = decodedToken.id;

   
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json({ username: admin.username });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
