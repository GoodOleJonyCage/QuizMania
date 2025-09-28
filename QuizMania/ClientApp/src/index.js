import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
/*import { Button } from "@material-ui/core";*/
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
//ReactDOM.render(
//    <BrowserRouter basename={baseUrl}>
//        <App />
//    </BrowserRouter>,
//    rootElement);
root.render(
        <BrowserRouter basename={baseUrl}>
            <App />
         </BrowserRouter>
);


//ReactDOM.render(
//    <MaterialUI.Button variant="contained" color="primary">
//        Thanks hotpink
//    </MaterialUI.Button>,
//    document.getElementById('root')
//);

// Uncomment the line above that imports the registerServiceWorker function
// and the line below to register the generated service worker.
// By default create-react-app includes a service worker to improve the
// performance of the application by caching static assets. This service
// worker can interfere with the Identity UI, so it is
// disabled by default when Identity is being used.
//
//registerServiceWorker();

