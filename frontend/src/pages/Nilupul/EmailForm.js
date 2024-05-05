import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import emailjs from 'emailjs-com';

const EmailForm = () => {
  const [toEmails, setToEmails] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace these values with your own EmailJS configuration
    const serviceId = 'your_service_id';
    const templateId = 'your_template_id';
    const userId = 'your_user_id';

    // Construct email parameters
    const emailParams = {
      to_email: toEmails,
      subject: subject,
      message: message,
    };

    // Send email using EmailJS
    emailjs.send(serviceId, templateId, emailParams, userId)
      .then((response) => {
        console.log('Email sent!', response);
        // Reset form fields after successful submission
        setToEmails('');
        setSubject('');
        setMessage('');
      }, (error) => {
        console.error('Error sending email:', error);
      });
  };

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom>
        Send Email
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="To (separate emails with commas)"
          fullWidth
          value={toEmails}
          onChange={(e) => setToEmails(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Subject"
          fullWidth
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Send Email
        </Button>
      </form>
    </Box>
  );
};

export default EmailForm;
