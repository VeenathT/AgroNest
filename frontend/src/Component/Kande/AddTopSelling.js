import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import FertilizerForm from "./FormCntainer/FertilizerForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"; 
import TopFertilizerInputData from "../../pages/Kande/DataInsertGraphs/TopSellerInputGraphs";




const AddTopSelling = () => {
    const [name, setName] = useState('');
    const [sales, setSales] = useState('');
  

    const handleaddClick = () => {
        // Navigate to the Add Service Record screen
        navigate("");
    };

    const handleviewClick = () => {
        // Navigate to the Service Record List screen
        navigate("/TopSellers");
    };


    const navigate = useNavigate();


    const submitHandler = async (e) => {
        e.preventDefault();                       //validation
        if (!isNaN(parseInt(name.trim()))) {
            alert('Name cannot be a number.');
        } else {
            try {
                // Make a POST request to the backend API endpoint
                const response = await axios.post('http://localhost:8070/topdealer/add', {
                    dealername: name,
                    noofsales: sales
                });

                // Check if the request was successful
                if (response.status === 200){
                    alert('Top Fertilizer Added Successfully');
                    // Clear the form fields after successful submission
                    setName('');
                    setSales('');
                } else {
                    alert('Failed to add top fertilizer. Please try again.');
                }
            } catch (error) {
                console.error('Error adding top fertilizer:', error);
                alert('Failed to add top fertilizer. Please try again.');
            }
        }
    }



    return (
        
        <>
        <div style={{ marginTop: '5%' }}></div>
            {/* page switch */}
            <div className="d-flex justify-content-center mt-5" style={{marginTop:"50px"}}>
                <div className="btn-group mt-5" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked />
                    <label className="btn btn-outline-primary btn-lg" htmlFor="btnradio1" onClick={handleaddClick}>Add </label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                    <label className="btn btn-outline-primary btn-lg" htmlFor="btnradio2" onClick={handleviewClick} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }} >View</label>
                </div>
            </div>
            <div style={{ margin: '0 auto', width: 'fit-content',marginTop:"3%" }}>
      <TopFertilizerInputData />
    </div>
        
            {/* form  */}
            <FertilizerForm style={{marginTop:"50px"}}>
                <h1>Add Top Rated Dealers</h1>
                <Form onSubmit={submitHandler}>

                    <Form.Group className="my-2" controlId="name">
                        <Form.Label>Dealer Name:</Form.Label>
                        <Form.Control
                            type='text'
                            required={true}
                            placeholder="Dealer Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ padding: "10px" }}
                        />
                    </Form.Group>

                    <Form.Group className="my-2" controlId="sales">
                        <Form.Label>Rating:</Form.Label>
                        <Form.Control
                            type='Number'
                            required={true}
                            placeholder="Rating"
                            value={sales}
                            onChange={(e) => setSales(e.target.value)}
                            style={{ padding: "10px" }}
                        />
                    </Form.Group>


                    <Button type='submit' value='submit' variant="primary" style={{ maxWidth: "100%", height: "50px" }}>
                        Submit
                    </Button>
                </Form>
            </FertilizerForm>
            <br />
        </>
    )
}

export default AddTopSelling;