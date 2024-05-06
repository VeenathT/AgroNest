import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FertilizerForm from "./FormCntainer/FertilizerForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import TopFertilizerInputData from "../../pages/Kande/DataInsertGraphs/TopFertilizerInputData"
import axios from "axios";




const AddTopfertilizer = () => {

  
    const [name, setName] = useState('');
    const [sales, setSales] = useState('');

    const handleaddClick = () => {
        // Navigate to the Add Service Record screen
        navigate("/addtopfertilizers");
    };

    const handleviewClick = () => {
        navigate("/viewtopfertilizers")
    };


    const navigate = useNavigate();


    const submitHandler = async (e) => {
        e.preventDefault();                                                              //validation
        if (!isNaN(parseInt(name.trim()))) {
            alert('Name cannot be a number.');       
        } else {
            try {
                // Make a POST request to the backend API endpoint
                const response = await axios.post('http://localhost:8070/topfertilizercategory/add', {
                    fertilizername: name,
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
        < div style={{marginTop:"5%"}}>
         
            {/* page switch */}
            <div  className="d-flex justify-content-center mt-5">
                <div className="btn-group mt-5" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked />
                    <label className="btn btn-outline-primary btn-lg" htmlFor="btnradio1" onClick={handleaddClick}>Add </label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                    <label className="btn btn-outline-primary btn-lg" htmlFor="btnradio2" onClick={handleviewClick} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }} >View</label>
                </div>
                
            </div>
            <div style={{  backgroundColor: "rgba(224, 224, 224, 0.5)", backdropFilter: "blur(10px)", padding: "20px", marginTop: "20px", marginLeft: "25%",width:"706px",marginBottom:"-8%" }}>
            <TopFertilizerInputData/>
          </div>
            

           

            {/* form  */}
            <FertilizerForm >
              
                <h1>Add Top Fertlizer</h1>
               
                <Form onSubmit={submitHandler} >
                <div style={{width:"1000px"}}>

                    <Form.Group className="my-2" controlId="name2">
                        <Form.Label>Fertilizer NAme:</Form.Label>
                        <Form.Control
                            type='text'
                            required={true}
                            placeholder="Fertilizer Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ padding: "10px", width:"300px" }}
                        />
                    </Form.Group>

                    <Form.Group className="my-2" controlId="sales">
                        <Form.Label>Number Of Sales:</Form.Label>
                        <Form.Control
                            type='Number'
                            required={true}
                            placeholder="Enter No of Sales"
                            value={sales}
                            min={1}                                         //validation
                            onChange={(e) => setSales(e.target.value)}
                            style={{ padding: "10px",  width:"300px" }}
                        />
                    </Form.Group>


                    <Button type='submit' variant="primary" style={{ maxWidth: "100%", height: "50px" }}>
                        Submit
                    </Button>
                    </div>
                </Form>
              
            </FertilizerForm>
            
            <br />
        </div>
    )
}

export default AddTopfertilizer;