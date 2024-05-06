import React from 'react';
import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 


import companyLogo from '../../images/Rahul/pdf3.jpg'; 

const AllLabsPDFGenerator = ({ labs }) => {
  const handleExportPDF = () => {
    
    const doc = new jsPDF();

    
    const columns = ['Name', 'Address', 'Phone', 'District', 'City'];

    // rows for the table
    const rows = labs.map(lab => [lab.name, lab.address, lab.phone, lab.district, lab.city]);

    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');

    const xPosition = 80; 
    const yPosition = 20; 
    doc.setFont('helvetica', 'bold'); 
    doc.setFontSize(24); 
    doc.text('Agronest', xPosition, yPosition);

    
    const logoWidth = 20; // Adjust th width of logo
    const logoHeight = 20; 
    const logoX = 10; 
    const logoY = 10; 
    doc.addImage(companyLogo, 'PNG', logoX, logoY, logoWidth, logoHeight);

    
    const tableYPosition = 40; 
    doc.autoTable({ head: [columns], body: rows, startY: tableYPosition });

    // Add creation time
    const creationTime = new Date().toLocaleString();
    const creationTimeText = `Created: ${creationTime}`;
    const textWidthBottom = doc.getStringUnitWidth(creationTimeText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const pageWidth = doc.internal.pageSize.getWidth();
    const xPositionBottom = pageWidth - textWidthBottom - 10; 
    const yPositionBottom = doc.internal.pageSize.getHeight() - 10; // Adjust 10 for margin
    doc.text(creationTimeText, xPositionBottom, yPositionBottom);

    // Save PDF
    doc.save('all_labs_details.pdf');
  };

  return (
    <div style={{ position: 'absolute', left: '77%', top: '30.5%' }}>
      <Button  size="small" onClick={handleExportPDF} sx={{  color: 'green', marginTop: '10px' }}>
        Generate PDF
      </Button>
    </div>
  );
};

export default AllLabsPDFGenerator;
