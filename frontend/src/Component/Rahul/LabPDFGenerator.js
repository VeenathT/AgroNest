import React from 'react';
import { Button } from '@mui/material';
import { jsPDF } from 'jspdf';


import companyLogo from '../../images/Rahul/pdf3.jpg'; 

const LabPDFGenerator = ({ lab }) => {
  const handleExportPDF = () => {
    // Create pdf
    const doc = new jsPDF();

    
    doc.setFont('helvetica', 'bold'); 
    doc.setFontSize(24); 

 
    const xPosition = 80; 
    const yPosition = 30; 
    doc.text('Agronest', xPosition, yPosition);

    // Add company logo to the top left corner
    const logoWidth = 20; 
    const logoHeight = 20; 
    const logoX = 10; 
    const logoY = 10; 
    doc.addImage(companyLogo, 'PNG', logoX, logoY, logoWidth, logoHeight);

    // Set up font styles for the content
    doc.setFont('helvetica', 'normal'); 
    doc.setFontSize(16); 

    // Add content to the PDF
    const lineHeight = 15; 
    const startY = (doc.internal.pageSize.getHeight() / 3) - (lineHeight * 2.5); // Start Y position
    const xPos = 50; 
    doc.text(`Lab Name: ${lab.name}`, xPos, startY);
    doc.text(`Address: ${lab.address}`, xPos, startY + lineHeight);
    doc.text(`Phone: ${lab.phone}`, xPos, startY + (lineHeight * 2));
    doc.text(`District: ${lab.district}`, xPos, startY + (lineHeight * 3));
    doc.text(`City: ${lab.city}`, xPos, startY + (lineHeight * 4));

    // Add creation time 
    const creationTime = new Date().toLocaleString();
    const creationTimeText = `Created: ${creationTime}`;
    const textWidthBottom = doc.getStringUnitWidth(creationTimeText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const pageWidth = doc.internal.pageSize.getWidth();
    const xPositionBottom = pageWidth - textWidthBottom - 10; // Adjust 10 for margin
    const yPositionBottom = doc.internal.pageSize.getHeight() - 10; // Adjust 10 for margin
    doc.text(creationTimeText, xPositionBottom, yPositionBottom);

    // Save PDF
    doc.save(`${lab.name}_details.pdf`);
  };

  return (
    <Button variant="contained" size="small" onClick={handleExportPDF} sx={{ backgroundColor: 'green', color: 'white', marginTop: '10px' }}>
      Export as PDF
    </Button>
  );
};

export default LabPDFGenerator;
