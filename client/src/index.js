import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/global.css";
import App from './App';
import { IsNewProvider } from './context/InsuranceContext/IsNewContext';
import { StartTravelProvider } from './context/InsuranceContext/TravelDatesContext'; // Make sure this path is correct


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <IsNewProvider>
      <StartTravelProvider>
        <App />
      </StartTravelProvider>
    </IsNewProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
