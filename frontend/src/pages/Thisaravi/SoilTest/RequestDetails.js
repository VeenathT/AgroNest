import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const RequestDetails = () => {
  const { requestId } = useParams();
  const [soilTest, setSoilTest] = useState(null);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/SoilTest/get/${requestId}`);
        setSoilTest(response.data);
      } catch (error) {
        console.error('Error fetching soil test details:', error);
      }
    };

    fetchRequestDetails();
  }, [requestId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  //pdf generation
  const generatePDF = () => (
    <Document>
      <Page size="A4">
        <View style={styles.section}>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>Soil Test Request Details</Text>
          <Text>{`Soil Test Type: ${soilTest?.soilTestType}`}</Text>
          <Text>{`Crop Type: ${soilTest?.cropType}`}</Text>
          <Text>{`Date: ${formatDate(soilTest?.date)}`}</Text>
          <Text>{`District: ${soilTest?.district}`}</Text>
          <Text>{`City: ${soilTest?.city}`}</Text>
          <Text>{`Status: ${soilTest?.status}`}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {soilTest ? (
          <div>
            <h2>Soil Test Request Details</h2>
            <p><strong>Soil Test Type:</strong> {soilTest.soilTestType}</p>
            <p><strong>Crop Type:</strong> {soilTest.cropType}</p>
            <p><strong>Date:</strong> {formatDate(soilTest.date)}</p>
            <p><strong>District:</strong> {soilTest.district}</p>
            <p><strong>City:</strong> {soilTest.city}</p>
            <p><strong>Status:</strong> {soilTest.status}</p>
            <PDFDownloadLink document={generatePDF()} fileName="soil_test_report.pdf">
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Download PDF'
              }
            </PDFDownloadLink>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  content: {
    maxWidth: '600px',
    padding: '20px',
    border: '2px solid black',
    backgroundColor: 'white',
    textAlign: 'center',
  },
  section: {
    margin: 10,
    padding: 10,
  },
};

export default RequestDetails;
