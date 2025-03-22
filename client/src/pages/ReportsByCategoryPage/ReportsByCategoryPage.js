import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReportContext } from "../../context/ReportContext/ReportContext";
import ShowReports from "../../components/Reports/ShowReports/ShowReports";

const ReportsByCategoryPage = () => {
    const { category } = useParams();
    const { reports, loading, error } = useContext(ReportContext);
    const [filteredReports, setFilteredReports] = useState([]);

    useEffect(() => {
        const filtered = reports.filter((report) => report.category === category);
        setFilteredReports(filtered);
    }, [category, reports]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {filteredReports.length === 0 ? (
                <p>לא נמצאו כתבות בנושא.</p>
            ) : (
                <ShowReports reports={filteredReports} loading={loading} error={error}/>
            )}
        </div>
    )
}



export default ReportsByCategoryPage;