const express = require('express');
const router = express.Router();
const TestRequest = require('../../../models/Oshini/test_requests/testRequest');

// Add Test Request
router.post('/addTestRequest', async (req, res) => {
  try {
    const { farmerID, labID, testType, date, startTime } = req.body;

    // Create a new TestRequest document
    const testRequest = new TestRequest({
      farmerID: farmerID,
      labID: labID,
      testType: testType,
      date: date,
      startTime: startTime,
      status: "pending"
    });

    // Save the TestRequest document to the database
    await testRequest.save();

    res.status(201).json({ message: 'Test request added successfully' });
  } catch (error) {
    console.error('Error adding test request:', error);
    res.status(500).json({ message: 'Failed to add test request. Please try again later.' });
  }
});

// Update Test Request Status
router.put('/updateTestRequestStatus/:requestID', async (req, res) => {
  try {
    const { requestID } = req.params;
    const { status } = req.body;

    // Find the TestRequest document by requestID and update the status
    await TestRequest.findByIdAndUpdate(requestID, { status: status });

    res.status(200).json({ message: 'Test request status updated successfully' });
  } catch (error) {
    console.error('Error updating test request status:', error);
    res.status(500).json({ message: 'Failed to update test request status. Please try again later.' });
  }
});

// Delete Test Request
router.delete('/deleteTestRequest/:requestID', async (req, res) => {
  try {
    const { requestID } = req.params;

    // Find and delete the TestRequest document by requestID
    await TestRequest.findByIdAndDelete(requestID);

    res.status(200).json({ message: 'Test request deleted successfully' });
  } catch (error) {
    console.error('Error deleting test request:', error);
    res.status(500).json({ message: 'Failed to delete test request. Please try again later.' });
  }
});

// Retrieve Test Requests by LabID and Date with Pending Status
router.get('/retrievePendingTestRequests/:labID/:date', async (req, res) => {
    try {
      const { labID, date } = req.params;
  
      // Find test requests by labID, date, and pending status
      const testRequests = await TestRequest.find({ labID: labID, date: date, status: 'pending' });
  
      res.status(200).json({ testRequests: testRequests });
    } catch (error) {
      console.error('Error retrieving test requests:', error);
      res.status(500).json({ message: 'Failed to retrieve test requests. Please try again later.' });
    }
  });

  router.get('/retrieveAcceptedTestRequests/:labID', async (req, res) => {
    try {
      const labID = req.params.labID; // Access the labID parameter
      
      // Find test requests by labID, date, and pending status
      const testRequests = await TestRequest.find({ labID: labID, status: 'accepted' });
  
      res.status(200).json({ testRequests: testRequests });
    } catch (error) {
      console.error('Error retrieving test requests:', error);
      res.status(500).json({ message: 'Failed to retrieve test requests. Please try again later.' });
    }
  });

  router.get('/retrievePendingTestRequests/:labID', async (req, res) => {
    try {
      const labID = req.params.labID; // Access the labID parameter
      
      // Find test requests by labID, date, and pending status
      const testRequests = await TestRequest.find({ labID: labID, status: 'pending' });
  
      res.status(200).json({ testRequests: testRequests });
    } catch (error) {
      console.error('Error retrieving test requests:', error);
      res.status(500).json({ message: 'Failed to retrieve test requests. Please try again later.' });
    }
});

// Backend route to update the status of a test request
router.put('/updateStatus/:requestId', async (req, res) => {
    try {
      const { requestId } = req.params;
      const { status } = req.body;
  
      // Find the test request by ID and update its status
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
