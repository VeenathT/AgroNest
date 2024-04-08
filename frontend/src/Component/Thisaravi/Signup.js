import React from 'react';
import { Button, Grid } from "@mui/material";

const Signup = () => {
    return (
        <Grid
            container
            spacing={2}
            sx={{
                backgroundColor: '#ffffff',
                marginBottom: '30px',
                display: 'block',
            }}
        >

            <Button variant="contained" color="primary">
                Sign up
            </Button>
        </Grid>
    );
}

export default Signup;