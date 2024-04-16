import React from 'react';

import './index.css';
import App from './App';
import ReactDOM from 'react-dom';


import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import AppRouter from '../src/router/Router';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>

//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>

// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


const theme = createTheme();

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);

reportWebVitals();
