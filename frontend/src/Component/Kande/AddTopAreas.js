import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import FertilizerForm from "./FormCntainer/FertilizerForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from '../../images/common/background.avif'; 
import axios from "axios"; 
import TopareasInput from "../../pages/Kande/DataInsertGraphs/TopareasInput";





const AddTopAreas = () => {
    const [area, setArea] = useState('');
    const [noofRegistrations, setnoofRegistrations] = useState('');

    const handleaddClick = () => {
       
        navigate("");
    };

    const handleviewClick = () => {
       
        navigate("/ViewTopRegisterdArea");
    };


    const navigate = useNavigate();


    const submitHandler = async (e) => {
        e.preventDefault();                                 //area validation
        if (!isNaN(parseInt(area.trim()))) {    
            alert('Name cannot be a number.');
        } else {
            try {
                
                const response = await axios.post('http://localhost:8070/toparea/add', {
                 
                    area: area,
                    noofRegistrations: noofRegistrations

                });

                
                if (response.status === 200){
                    alert(' Highest registration area added Successfully');
                   
                    setArea('');
                    setnoofRegistrations('');
                } else {
                    alert('Failed to add Highest registration area. Please try again.');
                }
            } catch (error) {
                console.error('Error adding top registration area:', error);
                alert('Failed to add  top registration area. Please try again.');
            }
        }
    }




    return (
        <>
      <div className="profile-page-container" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh'}}>

            {/* page switch */}
            <div className="d-flex justify-content-center" style={{marginTop:"100px"}}>
                <div className="btn-group mt-5" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked />
                    <label className="btn btn-outline-primary btn-lg" htmlFor="btnradio1" onClick={handleaddClick}>Add </label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                    <label className="btn btn-outline-primary btn-lg" htmlFor="btnradio2" onClick={handleviewClick} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }} >View</label>
                </div>
                
            </div>
            <div style={{ display: 'flex', justifyContent: 'center',marginTop:"50px"}}>
      <TopareasInput />
    </div>

            {/* form  */}
            <FertilizerForm >
                <h1>Areas with highest dealer Registrations</h1>
                <Form onSubmit={submitHandler}>

                

                    <Form.Group className="my-2" controlId="name">
                        <Form.Label>Area:</Form.Label>
                        <Form.Control
                            type='text'
                            required={true}
                            placeholder="Area"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            style={{ padding: "10px" }}
                        />
                    </Form.Group>

                    <Form.Group className="my-2" controlId="sales">
                        <Form.Label>Number Of Registrations:</Form.Label>
                        <Form.Control
                            type='Number'
                            required={true}
                            placeholder="Enter No of registrations"
                            value={ noofRegistrations}
                            onChange={(e) => setnoofRegistrations(e.target.value)}
                            style={{ padding: "10px" }}
                        />
                    </Form.Group>


                    <Button type='submit' variant="primary" style={{ maxWidth: "100%", height: "50px" }}>
                        Submit
                    </Button>
                </Form>
            </FertilizerForm>
            <br />
            </div>
        </>
    )
}

export default AddTopAreas;