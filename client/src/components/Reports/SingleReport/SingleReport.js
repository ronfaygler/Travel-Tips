import { Link } from "react-router-dom";
import { deleteReportUtil } from '../../../services/utils';
import styles from './SingleReport.module.css'; // Make sure this file exists for styling

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

    const handleDelete = async (e) => {
        e.stopPropagation(); // Prevent Link navigation
        e.preventDefault();
        try {
            await deleteReportUtil(report._id);
            // Refresh the page to show updated reports list
            window.location.reload();
        } catch (error) {
            console.error("שגיאה במחיקת המודעה:", error);
        }
    };
  
    return (
        <div className={styles.reportCard}>
            <Link
                to={`/report/${report._id}`} 
                state={{ report }}
                className={styles.report_link}
            >
                <img 
                    src={report.mainImage ? `${process.env.REACT_APP_API_URL}/${report.mainImage.replace(/\\/g, "/")}` : ''} 
                    alt={report.title}
                    className={styles.reportImage}
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        console.error(`Failed to load main image ${report.mainImage}`);
                    }}
                    loading="lazy"
                />
                <div className={styles.content}>
                    <div className={styles.metaContainer}>
                        <span className={styles.meta}>{timeAgo(report.updatedAt)}</span>
                        <span className={styles.writer}>{report.writer}</span>
                    </div>
                    <h3 className={styles.title}>{report.title}</h3>
                    <p className={styles.description}>{report.shortDescription}</p>
                    <Link to={`/update-report/${report._id}`}>
                        <span className={styles.updateReport}>עריכה</span>
                    </Link>
                
                    <button onClick={handleDelete} className={styles.deleteReport}>מחק</button>
                </div>
            </Link>
        </div>
    )
}

export default SingleReport;
