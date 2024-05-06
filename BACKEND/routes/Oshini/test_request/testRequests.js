const express = require('express');
const router = express.Router();
const TestRequest = require('../../../models/Oshini/test_requests/testRequest');

// Route for adding test requests
router.post('/addTestRequest', async (req, res) => {
  try {
    const { farmerID, labID, testType, date, startTime } = req.body;
    
    // Create the test request with uploaded file initialized
    const testRequest = new TestRequest({
      farmerID,
      labID,
      testType,
      date,
      startTime,
      status: "pending"
    });
    
    // Save the test request to the database
    await testRequest.save();

    res.status(201).json({ message: 'Test request added successfully' });
  } catch (error) {
    console.error('Error adding test request:', error);
    res.status(500).json({ message: 'Failed to add test request. Please try again later.' });
  }
});


router.put('/updateTestRequestStatus/:requestID', async (req, res) => {
  try {
    const { requestID } = req.params;
    const { status } = req.body;

    
    await TestRequest.findByIdAndUpdate(requestID, { status: status });

    res.status(200).json({ message: 'Test request status updated successfully' });
  } catch (error) {
    console.error('Error updating test request status:', error);
    res.status(500).json({ message: 'Failed to update test request status. Please try again later.' });
  }
});


router.delete('/deleteTestRequest/:requestID', async (req, res) => {
  try {
    const { requestID } = req.params;

    
    await TestRequest.findByIdAndDelete(requestID);

    res.status(200).json({ message: 'Test request deleted successfully' });
  } catch (error) {
    console.error('Error deleting test request:', error);
    res.status(500).json({ message: 'Failed to delete test request. Please try again later.' });
  }
});


router.get('/retrievePendingTestRequests/:labID/:date', async (req, res) => {
    try {
      const { labID, date } = req.params;
  
      
      const testRequests = await TestRequest.find({ labID: labID, date: date, status: 'pending' });
  
      res.status(200).json({ testRequests: testRequests });
    } catch (error) {
      console.error('Error retrieving test requests:', error);
      res.status(500).json({ message: 'Failed to retrieve test requests. Please try again later.' });
    }
  });

  router.get('/retrieveAcceptedTestRequests/:labID', async (req, res) => {
    try {
      const labID = req.params.labID; 
      
      
      const testRequests = await TestRequest.find({ labID: labID, status: 'accepted' });
  
      res.status(200).json({ testRequests: testRequests });
    } catch (error) {
      console.error('Error retrieving test requests:', error);
      res.status(500).json({ message: 'Failed to retrieve test requests. Please try again later.' });
    }
  });

  router.get('/retrieveCompletedTestRequests/:labID', async (req, res) => {
    try {
      const labID = req.params.labID; 
      
      
      const testRequests = await TestRequest.find({ labID: labID, status: 'completed' });
  
      res.status(200).json({ testRequests: testRequests });
    } catch (error) {
      console.error('Error retrieving test requests:', error);
      res.status(500).json({ message: 'Failed to retrieve test requests. Please try again later.' });
    }
  });

  router.get('/retrievePendingTestRequests/:labID', async (req, res) => {
    try {
      const labID = req.params.labID; 
      
      
      const testRequests = await TestRequest.find({ labID: labID, status: 'pending' });
  
      res.status(200).json({ testRequests: testRequests });
    } catch (error) {
      console.error('Error retrieving test requests:', error);
      res.status(500).json({ message: 'Failed to retrieve test requests. Please try again later.' });
    }
});


router.put('/updateStatus/:requestId', async (req, res) => {
    try {
      const { requestId } = req.params;
      const { status } = req.body;
       
      const updatedRequest = await TestRequest.findByIdAndUpdate(
        requestId,
        { status: status },
        { new: true }
      );
  
      res.status(200).json({ message: 'Test request status updated successfully', updatedRequest });
    } catch (error) {
      console.error('Error updating test request status:', error);
      res.status(500).json({ message: 'Failed to update test request status. Please try again later.' });
    }
  });
  

  
module.exports = router;
