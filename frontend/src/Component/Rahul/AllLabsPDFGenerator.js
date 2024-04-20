import React from 'react';
import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import jspdf-autotable plugin

// Import your company logo
import companyLogo from '../../images/Rahul/pdf3.jpg'; // Replace this with the actual path to your logo

const AllLabsPDFGenerator = ({ labs }) => {
  const handleExportPDF = () => {
    // Create a new PDF document
    const doc = new jsPDF();

    // Define columns for the table
    const columns = ['Name', 'Address', 'Phone', 'District', 'City'];

    // Define rows for the table
    const rows = labs.map(lab => [lab.name, lab.address, lab.phone, lab.district, lab.city]);

    // Set font size and style for the table
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');

    // Add "Agronest" header at the top middle
    const xPosition = 80; // X position for the header
    const yPosition = 20; // Y position for the header
    doc.setFont('helvetica', 'bold'); // Use bold font for "Agronest" header
    doc.setFontSize(24); // Set font size for "Agronest" header
    doc.text('Agronest', xPosition, yPosition);

    // Add company logo to the top left corner
    const logoWidth = 20; // Adjust the width of your logo as needed
    const logoHeight = 20; // Adjust the height of your logo as needed
    const logoX = 10; // X position for the logo
    const logoY = 10; // Y position for the logo
    doc.addImage(companyLogo, 'PNG', logoX, logoY, logoWidth, logoHeight);

    // Move the table down along the Y-axis
    const tableYPosition = 40; // Adjust the Y position for the table
    doc.autoTable({ head: [columns], body: rows, startY: tableYPosition });

    // Add creation time in the bottom right corner
    const creationTime = new Date().toLocaleString();
    const creationTimeText = `Created: ${creationTime}`;
    const textWidthBottom = doc.getStringUnitWidth(creationTimeText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const pageWidth = doc.internal.pageSize.getWidth();
    const xPositionBottom = pageWidth - textWidthBottom - 10; // Adjust 10 for margin
    const yPositionBottom = doc.internal.pageSize.getHeight() - 10; // Adjust 10 for margin
    doc.text(creationTimeText, xPositionBottom, yPositionBottom);

    // Save the PDF
    doc.save('all_labs_details.pdf');
  };

  return (
    <div style={{ position: 'absolute', left: '77%', top: '26.5%' }}>
      <Button  size="small" onClick={handleExportPDF} sx={{  color: 'green', marginTop: '10px' }}>
        Generate PDF
      </Button>
    </div>
  );
};

export default AllLabsPDFGenerator;
