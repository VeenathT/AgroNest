import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import { PDFDocument} from '@react-pdf/renderer';
import { AiOutlineSearch } from "react-icons/ai";
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet , Image} from "@react-pdf/renderer";
import Swal from 'sweetalert2';
import agronestLogo from '../../images/common/agronestlogo.jpg';
//import Dealer from "../../../../BACKEND/models/Sudarshan/dealer_acc_mgmt/dealer";



const MyDocument = ({ data }) => (

    
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
      <Image style={styles.logo} src={agronestLogo} />
        <Text style={styles.title}>Top Selling Dealers</Text>
        
        <View style={styles.tableContainer}>
          <Table style={styles.table} fixed>
            <View style={styles.tableHeader}>
              <Text style={styles.headerCell}></Text>
              <Text style={styles.headerCell}>dealername</Text>
              <Text style={styles.headerCell}>Number of Sales</Text>
            </View>
            <View style={styles.tableBody}>
              {data.map((fertilizer, index) => (
                <View key={fertilizer._id} style={styles.row}>
                  <Text style={styles.cell}>{index + 1}</Text>
                  <Text style={styles.cell}>{fertilizer.dealername}</Text>
                  <Text style={styles.cell}>{fertilizer.noofsales}</Text>

                </View>
              ))}
            </View>
          </Table>
          <Text>   </Text>
          <Text style={styles.companyAddress}>AGRONEST,Yaya4,Anuradhapura</Text> {/* Add company address */}
          <Text style={styles.dateTime}>{currentDate} {currentTime}</Text> {/* Add current date and time */}
        </View>
      </View>
    </Page>
  </Document>
);

    const currentDate = new Date().toLocaleDateString()
    const currentTime = new Date().toLocaleTimeString();

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  tableContainer: {
    marginTop: 20,
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableHeader: {
    flexDirection: "row",
  },
  headerCell: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    fontWeight: "bold",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    flex: 1,
  },
  tableBody: {
    marginTop: 2,
  },
  row: {
    flexDirection: "row",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  cell: {
    padding: 5,
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignSelf: 'center',
  },
});
  

const ViewTopSellers = () => {
  const [topTopSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8070/topdealer/");
        setTopSellers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top fertilizers:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (id) => {
    const selectedDealer = topTopSellers.find(dealer => dealer._id === id);
    setUpdateFormData(selectedDealer);
    setShowUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
  };

  const handleUpdateFormChange = (e) => {
    setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8070/topdealer/update/${updateFormData._id}`, updateFormData);
      // Update the state with the updated fertilizer
      setTopSellers(topTopSellers.map(dealer => {
        if (dealer._id === updateFormData._id) {
          return updateFormData;
        }
        return dealer;
      }));
      setShowUpdateForm(false);
      console.log("Dealer updated successfully:", updateFormData._id);
    } catch (error) {
      console.error("Error updating Dealer:", error);
    }
  };
  

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Dealer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8070/topdealer/delete/${id}`);
          // Remove the deleted fertilizer from the state
          setTopSellers(topTopSellers.filter(dealer => dealer._id !== id));
          console.log("Dealer deleted successfully:", id);
          // Show success message with OK button
          Swal.fire({
            title: "Deleted!",
            text: "Your Dealer has been deleted successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
        } catch (error) {
          console.error("Error deleting Dealer:", error);
        }
      }
    });
  };
  
  // Generate PDF report
  const generateReport = () => {
    const fileName = "Top_Fertilizers_Report.pdf";
    const pdfData = (
      <MyDocument data={topTopSellers} />
    );

    return (
      <PDFDownloadLink document={pdfData} fileName={fileName}>
        {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : 'Download PDF')}
      </PDFDownloadLink>
    );
  };

  // Search function
  const filteredSellers = topTopSellers.filter(dealer =>
    dealer.dealername.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1 style={{ color: "white" }}>Top Dealer List</h1>
      <Button variant="primary" onClick={() => window.history.back()} style={{marginLeft:"-90%"}}>
        Go Back
      </Button>
      <FormControl
        type="text"
        placeholder="Search by Dealer name"
        className="mt-3 mb-3"
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ maxWidth: "300px", backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      />
     <Button variant="warning">{generateReport()}</Button> 
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table striped bordered hover style={{ marginTop: "10px" }}>
            <thead>
              <tr>
                <th></th>
                <th>Dealer Name</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSellers.map((dealer, index) => (
                <tr key={dealer._id}>
                  <td>{index + 1}</td>
                  <td>{dealer.dealername}</td>
                  <td>{dealer.noofsales}</td>
                  <td>
                    <Button variant="success" onClick={() => handleUpdate(dealer._id)}>Update</Button>{' '}
                    <Button variant="danger" onClick={() => handleDelete(dealer._id)}>Delete</Button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Dealer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleUpdateSubmit}>
                <Form.Group controlId="formFertilizerName">
                  <Form.Label>Seller Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter dealer name" name="dealername" value={updateFormData.dealername || ""} onChange={handleUpdateFormChange} />
                </Form.Group>
                <Form.Group controlId="formNumberOfSales">
                  <Form.Label>Number of Sales</Form.Label>
                  <Form.Control type="text" placeholder="Enter number of sales" name="noofsales" value={updateFormData.noofsales || ""} onChange={handleUpdateFormChange} />
                </Form.Group><br />
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ViewTopSellers;
