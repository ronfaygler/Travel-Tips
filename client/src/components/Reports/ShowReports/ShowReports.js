import React from 'react';
import styles from './ShowReports.module.css'; // Make sure this file exists for styling
import SingleReport from '../SingleReport/SingleReport';

const ShowReports = ({ reports, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.reportsGrid}>
            {reports.length === 0 ? (
                <p>No reports available.</p> // Optional message when no reports exist
            ) : (
                reports.map((report) => (
                <SingleReport report={report}/>
                ))
            )}
        </div>
    );
};

export default ShowReports;
