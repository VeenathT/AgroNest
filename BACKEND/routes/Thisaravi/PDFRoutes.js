const fs = require('fs');
const path = require('path');
const router = require("express").Router();

router.get('/get-pdf/:filename', (req, res) => {
  const { filename } = req.params;
  console.log('Requested PDF filename:', filename);

  // Define the path to the folder containing your PDF files
  const pdfFolderPath = path.join(__dirname, 'pdfs');
  const filePath = path.join(pdfFolderPath, filename);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('Error accessing PDF file:', err);
      return res.status(404).send('PDF file not found');
    }

    // Stream the file to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    console.log('PDF sent successfully');
  });
});

module.exports = router;
