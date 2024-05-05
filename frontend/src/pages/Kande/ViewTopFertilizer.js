import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import { PDFDocument} from '@react-pdf/renderer';
import { AiOutlineSearch } from "react-icons/ai";
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet , Image} from "@react-pdf/renderer";
import Swal from 'sweetalert2';
import agronestLogo from '../../images/common/agronestlogo.jpg';



const MyDocument = ({ data }) => (

    
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
      <Image style={styles.logo} src={agronestLogo} />
        <Text style={styles.title}>Top Fertilizers</Text>
        
        <View style={styles.tableContainer}>
          <Table style={styles.table} fixed>
            <View style={styles.tableHeader}>
              <Text style={styles.headerCell}></Text>
              <Text style={styles.headerCell}>xxxx Name</Text>
              <Text style={styles.headerCell}>yyyyy</Text>
            </View>
            <View style={styles.tableBody}>
              {data.map((fertilizer, index) => (
                <View key={fertilizer._id} style={styles.row}>
                  <Text style={styles.cell}>{index + 1}</Text>
                  <Text style={styles.cell}>{fertilizer.fertilizername}</Text>
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
  

const ViewTopFertilizer = () => {
  const [topFertilizers, setTopFertilizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8070/topfertilizercategory/");
        setTopFertilizers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top fertilizers:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (id) => {
    const selectedFertilizer = topFertilizers.find(fertilizer => fertilizer._id === id);
    setUpdateFormData(selectedFertilizer);
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
      await axios.put(`http://localhost:8070/topfertilizercategory/update/${updateFormData._id}`, updateFormData);
      // Update the state with the updated fertilizer
      setTopFertilizers(topFertilizers.map(fertilizer => {
        if (fertilizer._id === updateFormData._id) {
          return updateFormData;
        }
        return fertilizer;
      }));
      setShowUpdateForm(false);
      console.log("Fertilizer updated successfully:", updateFormData._id);
    } catch (error) {
      console.error("Error updating fertilizer:", error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this fertilizer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8070/topfertilizercategory/delete/${id}`);
          // Remove the deleted fertilizer from the state
          setTopFertilizers(topFertilizers.filter(fertilizer => fertilizer._id !== id));
          console.log("Fertilizer deleted successfully:", id);
          // Show success message with OK button
          Swal.fire({
            title: "Deleted!",
            text: "Your fertilizer has been deleted successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
        } catch (error) {
          console.error("Error deleting fertilizer:", error);
        }
      }
    });
  };
  
  // Generate PDF report
  const generateReport = () => {
    const fileName = "Top_Fertilizers_Report.pdf";
    const pdfData = (
      <MyDocument data={topFertilizers} />
    );

    return (
      <PDFDownloadLink document={pdfData} fileName={fileName}>
        {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : 'Download PDF')}
      </PDFDownloadLink>
    );
  };

  // Search function
  const filteredFertilizers = topFertilizers.filter(fertilizer =>
    fertilizer.fertilizername.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1 style={{ color: "white" }}>Top Fertilizer List</h1>
      <Button variant="primary" onClick={() => window.history.back()} style={{marginLeft:"-90%"}}>
        Go Back
      </Button>
      <FormControl
        type="text"
        placeholder="Search by fertilizer name"
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
                <th>Fertilizer Name</th>
                <th>Number of Sales</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFertilizers.map((fertilizer, index) => (
                <tr key={fertilizer._id}>
                  <td>{index + 1}</td>
                  <td>{fertilizer.fertilizername}</td>
                  <td>{fertilizer.noofsales}</td>
                  <td>
                    <Button variant="success" onClick={() => handleUpdate(fertilizer._id)}>Update</Button>{' '}
                    <Button variant="danger" onClick={() => handleDelete(fertilizer._id)}>Delete</Button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Fertilizer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleUpdateSubmit}>
                <Form.Group controlId="formFertilizerName">
                  <Form.Label>Fertilizer Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter fertilizer name" name="fertilizername" value={updateFormData.fertilizername || ""} onChange={handleUpdateFormChange} />
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

export default ViewTopFertilizer;
