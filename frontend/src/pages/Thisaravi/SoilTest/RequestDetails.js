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

  const generatePDF = () => (
    <Document>
      <Page size="A4">
        <View style={styles.section}>
          <Text style={{ color: 'red' }}>Soil Test Request Details</Text>
          <Text><strong>Soil Test Type:</strong> {soilTest?.soilTestType}</Text>
          <Text><strong>Crop Type:</strong> {soilTest?.cropType}</Text>
          <Text><strong>Date:</strong> {soilTest?.date}</Text>
          <Text><strong>District:</strong> {soilTest?.district}</Text>
          <Text><strong>City:</strong> {soilTest?.city}</Text>
          <Text><strong>Status:</strong> {soilTest?.status}</Text>
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
            <p><strong>Date:</strong> {soilTest.date}</p>
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
