import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { jsPDF } from 'jspdf';
import PopupMessage from '../../pages/common/PopUp';
import companyLogo from '../../images/Rahul/pdf3.jpg'; 

const PDFGenerator = ({ fertilizers }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleClosePopup = () => {
        
        setErrorMessage('');
        setSuccessMessage('');
      };

  const handleExportPDF = () => {
    // Create pdf
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const borderWidth = 5;
    

    doc.setFont('helvetica', 'bold'); 
    doc.setFontSize(24); 

    // Add border around the entire page
    doc.setLineWidth(2);
    doc.rect(borderWidth, borderWidth, pageWidth - 2 * borderWidth, pageHeight - 2 * borderWidth); // Adjusted coordinates

    
    const logoWidth = 40;
    const logoHeight = 40;
    const logoX = (pageWidth - logoWidth) / 2;
    const logoY = 15; 
    doc.addImage(companyLogo, 'PNG', logoX, logoY, logoWidth, logoHeight);

    
    const companyName = 'Agronest- Fertilizer Stock Report';
    const companyNameWidth = doc.getStringUnitWidth(companyName) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const companyNameX = (pageWidth - companyNameWidth) / 2;
    const companyNameY = logoY + logoHeight + 15;
    doc.text(companyName, companyNameX, companyNameY);

   
    doc.setFont('helvetica', 'normal'); 
    doc.setFontSize(16); 

    
    const columnWidth = 46; 
    const headers = ['Item Code', 'Name', 'Quantity', 'Price']; 
    const body = fertilizers.map(({ itemcode, name, quantity, price }) => [itemcode, name, quantity, price]); 

    
    const tableWidth = columnWidth * headers.length;
    const startX = (pageWidth - tableWidth) / 2; 
    const startY = companyNameY + 15; 
    doc.autoTable({
      startX,
      startY,
      head: [headers],
      body,
      theme: 'grid', 
      margin: { top: startY },
      styles: { font: 'helvetica', fontSize: 12, cellPadding: 5 },
      columnStyles: { 0: { cellWidth: columnWidth }, 1: { cellWidth: columnWidth }, 2: { cellWidth: columnWidth }, 3: { cellWidth: columnWidth } }
    });

     
    const creationTime = new Date().toLocaleString();
    const creationTimeText = `Created: ${creationTime}`;
    const textWidthBottom = doc.getStringUnitWidth(creationTimeText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const xPositionBottom = pageWidth - textWidthBottom - 10; 
    const yPositionBottom = pageHeight - 10; 
    doc.text(creationTimeText, xPositionBottom, yPositionBottom);

    // Save PDF
    try {
        doc.save('fertilizer_details.pdf');
        setSuccessMessage('PDF exported successfully.');
    } catch (error) {
        setErrorMessage('Failed to export PDF.');
    }
  };

  return (
    <>
        <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={handleExportPDF}
            sx={{
                color: 'white',
                marginTop: '10px',
                borderRadius: '20px',
                '&:hover': {
                    backgroundColor: 'darkblue',
                },
            }}
        >
            Export as PDF
        </Button>
        {successMessage && <PopupMessage message={successMessage} type="success" onClose={handleClosePopup} />}
        {errorMessage && <PopupMessage message={errorMessage} type="error" onClose={handleClosePopup} />}
    </>
);
};

export default PDFGenerator;
