// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { IsNewProvider } from './IsNewContext';



import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { IsNewProvider } from './context/IsNewContext';
import { StartTravelProvider } from './context/TravelDatesContext'; // Make sure this path is correct


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


// ReactDOM.render(
//   <React.StrictMode>
//       <IsNewProvider>
//           <App />
//       </IsNewProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );




// ReactDOM.render(
//     <IsNewProvider>
//         <App />
//     </IsNewProvider>,
//     document.getElementById('root')
// );
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
