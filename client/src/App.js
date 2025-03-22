import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react' 

import { ReportProvider } from "./context/ReportContext/ReportContext";
import styles from "./styles/App.module.css";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
// import CreditCardPage from "./pages/CreditCardPage/CreditCardPage";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import ReportPage from "./pages/ReportPage/ReportPage";
import ReportsByCategoryPage from "./pages/ReportsByCategoryPage/ReportsByCategoryPage";

import CountryPage from "./pages/CountryPage/CountryPage";
import DatesPage from "./pages/DatesPage/DatesPage";
import IsNewClientPage from "./pages/IsNewClientPage/IsNewClientPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import WhoTravelPage from "./pages/WhoTravelPage/WhoTravelPage";
import SportPage from "./pages/SportPage/SportPage";
import PricePage from "./pages/PricePage/PricePage";

import Header from "./components/Header";

import UploadReport from "./components/Reports/UploadReport/UploadReport";


function App() {
  return (
    <ReportProvider>
      <div className={styles.App}>
        <Router>
          <Header />
          <div style={{ paddingTop: '20px' }}> {/* Adjust the value based on the height of your header */}
            <main className={styles.main}>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" exact Component={AboutPage} />
                  <Route path="/contact-us" exact Component={ContactUsPage} />
                  
                  <Route path="/report/:title" exact Component={ReportPage} />
                  <Route path="/:category" exact Component={ReportsByCategoryPage} />
                  
                  <Route path="/כתבה-חדשה" exact Component={UploadReport} />

                  <Route path="/getinsurance" exact Component={CountryPage} />
                  <Route path="/getinsurance/dates" exact Component={DatesPage} />
                  <Route path="/getinsurance/do_we_know_you?" exact Component={IsNewClientPage} />
                  <Route path="/getinsurance/login" exact Component={LoginPage} />
                  <Route path="/getinsurance/who_travel" exact Component={WhoTravelPage} />
                  <Route path="/getinsurance/sport" exact Component={SportPage} />
                  <Route path="/getinsurance/price" exact Component={PricePage} />
              </Routes>
            </main>
          </div>
        </Router>
      </div>
    </ReportProvider>
  )
}

export default App