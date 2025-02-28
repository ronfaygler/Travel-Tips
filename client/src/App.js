import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React from 'react' 
import HomePage from "./pages/HomePage/HomePage";
import CountryPage from "./pages/CountryPage/CountryPage";
import DatesPage from "./pages/DatesPage/DatesPage";
import IsNewClientPage from "./pages/IsNewClientPage/IsNewClientPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import WhoTravelPage from "./pages/WhoTravelPage/WhoTravelPage";
import SportPage from "./pages/SportPage/SportPage";
import PricePage from "./pages/PricePage/PricePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import CreditCardPage from "./pages/CreditCardPage/CreditCardPage";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";

import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        {/* <Link to={"/"}> Home page</Link> */}
        <div style={{ paddingTop: '60px' }}> {/* Adjust the value based on the height of your header */}

        <Routes>
          {/* <Route path="/" element={<Header />}>  Layout wraps all pages */}
            <Route path="/" element={<HomePage />} />
            {/* <Route path="getinsurance" element={<CountryPage />} /> */}
            <Route path="/about" exact Component={AboutPage} />
            <Route path="/creditcards" exact Component={CreditCardPage} />
            <Route path="/contactus" exact Component={ContactUsPage} />

            <Route path="/getinsurance" exact Component={CountryPage} />
            <Route path="/getinsurance/dates" exact Component={DatesPage} />
            <Route path="/getinsurance/do_we_know_you?" exact Component={IsNewClientPage} />
            <Route path="/getinsurance/login" exact Component={LoginPage} />
            <Route path="/getinsurance/who_travel" exact Component={WhoTravelPage} />
            <Route path="/getinsurance/sport" exact Component={SportPage} />
            <Route path="/getinsurance/price" exact Component={PricePage} />
          {/* </Route> */}

        </Routes>
        </div>
      </Router>
      
     
    </div>
  )
}

export default App