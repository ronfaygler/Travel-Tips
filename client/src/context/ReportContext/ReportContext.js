import React, { createContext, useState, useEffect } from "react";
import { fetchReports } from "../../services/utils";
const ReportContext = createContext();

const ReportProvider = ({ children }) => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchAllReports = async () => {
            try {
                const data = await fetchReports();
                setReports(data);
            }
            catch (err) {
                setError(err.message);
                console.log("error fetching reports on context:", err.message);
            } finally {
                setLoading(false);  // Ensure loading is set to false in both success and failure
            }
        }
        fetchAllReports();
    },[]);

    const addNewReport = (report) => {
        setReports([...reports, report]);
    }

    return (
        <ReportContext.Provider value={{ reports, loading, error, addNewReport}}>
            {children}
        </ReportContext.Provider>
    )
}

export { ReportContext, ReportProvider };