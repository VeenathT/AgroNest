import React from 'react';
import { Button, Grid } from "@mui/material"; // Import Grid and Button from @mui/material
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Signup = () => {
    return (
        <Grid
            container
            spacing={2}
            sx={{
                backgroundColor: '#ffffff',
                marginBottom: '30px',
            }}
        >
            <Button 
                sx={{
                    margin: 'auto',
                    marginBottom: '20px',
                    backgroundColor: '#2DA771',
                    color: '#000000',
                    marginLeft: '15px',
                    marginTop: '20px',
                    '&:hover':{
                        opacity: '0.7',
                        backgroundColor: '#2DA771'
                    }
                }} 
                component={Link} to="/RegForm">
                Sign up
            </Button>
        </Grid>
    );
}

export default Signup;
