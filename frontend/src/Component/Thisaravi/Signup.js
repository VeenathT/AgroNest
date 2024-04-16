import React from 'react';
import { Button, Grid } from "@mui/material"; // Import Grid and Button from @mui/material
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Signup = () => {
    return (
        <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={12} sm={6} md={4}>
                <Button 
                    fullWidth
                    sx={{
                        backgroundColor: '#2DA771',
                        color: '#000000',
                        '&:hover':{
                            opacity: '0.7',
                            backgroundColor: '#2DA771'
                        }
                    }}  
                component={Link} to="/RegForm">
                Sign up
            </Button>
            </Grid>
        </Grid>
    );
}

export default Signup;
