import React from 'react';
import { Button } from '@mui/material';
import { jsPDF } from 'jspdf';

// Import your company logo
import companyLogo from '../../images/Rahul/pdf3.jpg'; // Replace this with the actual path to your logo

const LabPDFGenerator = ({ lab }) => {
  const handleExportPDF = () => {
    // Create a new PDF document
    const doc = new jsPDF();

    // Set up font styles for the header
    doc.setFont('helvetica', 'bold'); // Use bold font for "Agronest" header
    doc.setFontSize(24); // Set font size for "Agronest" header

    // Add "Agronest" header at the top middle
    const xPosition = 80; // X position for the header
    const yPosition = 30; // Y position for the header
    doc.text('Agronest', xPosition, yPosition);

    // Add company logo to the top left corner
    const logoWidth = 20; // Adjust the width of your logo as needed
    const logoHeight = 20; // Adjust the height of your logo as needed
    const logoX = 10; // X position for the logo
    const logoY = 10; // Y position for the logo
    doc.addImage(companyLogo, 'PNG', logoX, logoY, logoWidth, logoHeight);

    // Set up font styles for the content
    doc.setFont('helvetica', 'normal'); // Reset font to normal
    doc.setFontSize(16); // Set font size for content

    // Add content to the PDF
    const lineHeight = 15; // Line height for the text
    const startY = (doc.internal.pageSize.getHeight() / 3) - (lineHeight * 2.5); // Start Y position
    const xPos = 50; // X position for the text
    doc.text(`Lab Name: ${lab.name}`, xPos, startY);
    doc.text(`Address: ${lab.address}`, xPos, startY + lineHeight);
    doc.text(`Phone: ${lab.phone}`, xPos, startY + (lineHeight * 2));
    doc.text(`District: ${lab.district}`, xPos, startY + (lineHeight * 3));
    doc.text(`City: ${lab.city}`, xPos, startY + (lineHeight * 4));

    // Add creation time in the bottom right corner
    const creationTime = new Date().toLocaleString();
    const creationTimeText = `Created: ${creationTime}`;
    const textWidthBottom = doc.getStringUnitWidth(creationTimeText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const pageWidth = doc.internal.pageSize.getWidth();
    const xPositionBottom = pageWidth - textWidthBottom - 10; // Adjust 10 for margin
    const yPositionBottom = doc.internal.pageSize.getHeight() - 10; // Adjust 10 for margin
    doc.text(creationTimeText, xPositionBottom, yPositionBottom);

    // Save the PDF
    doc.save(`${lab.name}_details.pdf`);
  };

  return (
    <Button variant="contained" size="small" onClick={handleExportPDF} sx={{ backgroundColor: 'green', color: 'white', marginTop: '10px' }}>
      Export as PDF
    </Button>
  );
};

export default LabPDFGenerator;
