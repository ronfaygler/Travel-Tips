import React from 'react';
import styles from './SingleReport.module.css'; // Make sure this file exists for styling
import { Link } from "react-router-dom";

const SingleReport = ({ report }) => {
    if (!report) return null;

    // Function to calculate the time passed
  const timeAgo = (date) => {
    const now = new Date();
    const updatedAt = new Date(date);
    const seconds = Math.floor((now - updatedAt) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
        return days === 1 ? "לפני יום" : `לפני ${days} ימים`;
      }
      if (hours > 0) {
        return hours === 1 ? "לפני שעה" : `לפני ${hours} שעות`;
      }
      if (minutes > 0) {
        return minutes === 1 ? "לפני דקה" : `לפני ${minutes} דקות`;
      }
      return seconds === 1 ? "לפני שנייה" : `לפני ${seconds} שניות`;
    };
  
    return (
        <div className={styles.reportCard}>
            <Link
            to={`/report/${report.title}`} 
            state={{ report }}
            className={styles.report_link}
            >
            <img src={report.image} alt={report.title} className={styles.reportImage} />
            <p1>{timeAgo(report.updatedAt)} </p1> | <p2> {report.writer} </p2>
            <h3>{report.title}</h3>
            <p>{report.shortDescription}</p>
            </Link>
        </div>
    )
}

export default SingleReport;
