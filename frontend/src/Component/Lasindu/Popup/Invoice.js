import React from 'react';
import { Button } from '@mui/material';
import { jsPDF } from 'jspdf';

import companyLogo from '../../../images/Rahul/pdf3.jpg';

const Invoice = ({ order }) => {
  const handleExportPDF = () => {
    // Create pdf
    const doc = new jsPDF();

    // Set up font styles for the content
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);

    // Add company logo to the top left corner
    const logoWidth = 40;
    const logoHeight = 40;
    const logoX = 10;
    const logoY = 10;
    doc.addImage(companyLogo, 'PNG', logoX, logoY, logoWidth, logoHeight);

    doc.text('AgroNest', 80, 30); // Title position

    // Add content to the PDF in a table layout
    const table = [
      ['Order ID: ', order.item._id.toString()],
      ['Item Code: ', order.item.itemcode.toString()],
      ['Fertilizer Name: ', order.item.name.toString()],
      ['Quantity: ', order.item.quantity.toString()]
    ];

    const tableWidth = 200;
    const startX = (doc.internal.pageSize.getWidth() - tableWidth) / 2; // Center the table
    const startY = 70; // Start Y position for the table
    const lineHeight = 15;
    const xPos = startX; // X position for the table

    // Set border style
    doc.setLineWidth(0.5);

    // Draw middle line
    const middleY = startY + lineHeight * (table.length / 2);
    doc.line(startX, middleY, startX + tableWidth, middleY);

    table.forEach((row, rowIndex) => {
      const yPos = startY + rowIndex * lineHeight;
      doc.rect(xPos, yPos, tableWidth, lineHeight, 'S'); // Draw border for each row
      doc.text(row[0], xPos + 5, yPos + lineHeight / 2); // Adjust text position
      doc.text(row[1], xPos + 105, yPos + lineHeight / 2); // Adjust text position for value
    });

    // Add total price
    const totalPrice = order.item.price; // Get total price
    const totalPriceText = `Total Price: ${totalPrice}`;
    const totalPriceWidth = doc.getStringUnitWidth(totalPriceText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const totalPriceXPos = startX + tableWidth - totalPriceWidth - 5; // Position to align with right of table
    const totalPriceYPos = startY + table.length * lineHeight + 10; // Position below the table
    doc.text(totalPriceText, totalPriceXPos, totalPriceYPos);

    // Add creation time
    const creationTime = new Date().toLocaleString();
    const creationTimeText = `Created: ${creationTime}`;
    const textWidthBottom = doc.getStringUnitWidth(creationTimeText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const pageWidth = doc.internal.pageSize.getWidth();
    const xPositionBottom = pageWidth - textWidthBottom - 10; // Adjust 10 for margin
    const yPositionBottom = doc.internal.pageSize.getHeight() - 10; // Adjust 10 for margin
    doc.text(creationTimeText, xPositionBottom, yPositionBottom);

    // Save PDF
    doc.save(`${order.item.name}_Invoice.pdf`);
  };

  return (
    <Button variant="contained" size="small" onClick={handleExportPDF} sx={{ backgroundColor: 'green', color: 'white' }}>
      Download Invoice
    </Button>
  );
};

export default Invoice;
