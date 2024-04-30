import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    appBar: {
        height: '34px', // Set the height of the app bar
        backgroundColor: '#000', // Set the background color to black
        position: 'fixed', // Fix the top bar to the top of the viewport
        top: 0, // Ensure the top bar starts at the top of the viewport
        zIndex: theme.zIndex.drawer + 1, // Ensure the top bar is above other elements
      },
      text: {
        color: '#FFF', // Set the text color to white
        lineHeight: '30px', // Match the lineHeight with the height of the app bar
        marginRight: theme.spacing(2), // Add some spacing between the text and the edge of the app bar
        animation: '$slideLeft 8s linear infinite',
        margin: 0, // Remove any default margins
        padding: 0, // Remove any default padding
        display: 'inline-block', // Set display to inline-block
        verticalAlign: 'middle',
        marginTop: '-31px', // Align text vertically to middle
      },
      '@keyframes slideLeft': {
        '0%': { transform: 'translateX(100vw)' }, // Start position (off-screen right)
        '100%': { transform: 'translateX(-100%)' }, // Move off-screen left
      },
}));

const TopBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.text}>
        Agronest: Leading the Way in Fertilizer Management
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
