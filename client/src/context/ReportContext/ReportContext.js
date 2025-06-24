import React, { createContext, useState, useEffect } from "react";
import { fetchReports } from "../../services/utils";
const ReportContext = createContext();

const ReportProvider = ({ children }) => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    
    // useEffect(() => {
    //     console.log("✅ Updated reports:", reports);
    //   }, [reports]);

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
    
    const updateReport = (id, updatedReport) => {
        setReports(reports.map(report => report._id === id ? updatedReport : report));
    }

    return (
        <ReportContext.Provider value={{ reports, loading, error, addNewReport, updateReport}}>
            {children}
        </ReportContext.Provider>
    )
}

export { ReportContext, ReportProvider };