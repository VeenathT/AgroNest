import React, { useState } from 'react';
import { TextField, Button, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formContainer: {
    marginTop: '50px', // Adjust as needed
  },
}));

const Form = ({ onSubmit }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, district });
    setName('');
    setEmail('');
    setDistrict('');
  };

  return (
    <div className={classes.formContainer} style ={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '300px' }}>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              required
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              label="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Form;
