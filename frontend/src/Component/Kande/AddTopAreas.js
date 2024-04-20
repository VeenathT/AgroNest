import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import FertilizerForm from "./FormCntainer/FertilizerForm";
import 'bootstrap/dist/css/bootstrap.min.css';




const AddTopAreas = () => {
    const [name, setName] = useState('');
    const [sales, setSales] = useState('');
    const [area, setArea] = useState('');

    const handleaddClick = () => {
        // Navigate to the Add Service Record screen
        navigate("");
    };

    const handleviewClick = () => {
        // Navigate to the Service Record List screen
        navigate("");
    };


    const navigate = useNavigate();


    const submitHandler = async (e) => {
        e.preventDefault();
        if (!isNaN(parseInt(name.trim()))) {
            toast.error('Name cannot be a number.');
        } else {
            // try {
            //     const res = await insertfertlizer({ 
            //         name,
            //         sales
            //     }).unwrap();
            //     if (res) {
            //         toast.success('Fertilizer added successfully!');
                    
            //         setName('');
            //         setSales('');
            //     }
            // } catch (err) {
            //     console.error(err);
            //     toast.error(err?.data?.message || err.message || 'An error occurred');
            // }
        }
    }


    return (
        <>
            {/* page switch */}
            <div className="d-flex justify-content-center mt-5">
                <div className="btn-group mt-5" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked />
                    <label className="btn btn-outline-primary btn-lg" htmlFor="btnradio1" onClick={handleaddClick}>Add </label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                    <label className="btn btn-outline-primary btn-lg" htmlFor="btnradio2" onClick={handleviewClick} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }} >View</label>
                </div>
            </div>

            {/* form  */}
            <FertilizerForm >
                <h1>Add Fertilizer Top Selling Areas</h1>
                <Form onSubmit={submitHandler}>

                    <Form.Group className="my-2" controlId="name">
                        <Form.Label>Fertilizer Name:</Form.Label>
                        <Form.Control
                            type='text'
                            required={true}
                            placeholder="Fertilizer Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ padding: "10px" }}
                        />
                    </Form.Group>

                    <Form.Group className="my-2" controlId="name">
                        <Form.Label>Area:</Form.Label>
                        <Form.Control
                            type='text'
                            required={true}
                            placeholder="Area"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ padding: "10px" }}
                        />
                    </Form.Group>

                    <Form.Group className="my-2" controlId="sales">
                        <Form.Label>Number Of Sales:</Form.Label>
                        <Form.Control
                            type='Number'
                            required={true}
                            placeholder="Enter No of Sales"
                            value={sales}
                            onChange={(e) => setSales(e.target.value)}
                            style={{ padding: "10px" }}
                        />
                    </Form.Group>


                    <Button type='submit' variant="primary" style={{ maxWidth: "100%", height: "50px" }}>
                        Submit
                    </Button>
                </Form>
            </FertilizerForm>
            <br />
        </>
    )
}

export default AddTopAreas;