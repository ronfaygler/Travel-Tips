import { useParams, useLocation } from 'react-router-dom';
import styles from "./ReportPage.module.css";

const ReportPage = () => {
    const { title } = useParams(); // Get the title from the URL
    const location = useLocation();
    const { report } = location.state;
  if (!report) {
    return <h1>הכתבה לא נמצאה</h1>;
  }

  return (
    <div className={styles.layoutContainer}>
        <h1 className={styles.title}>{title}</h1>
        <img src={report?.image} 
            alt={report?.title} 
            className={styles.img}
        />
        <p className={styles.content}>
            {report?.content}
        </p>
    </div>
    );
};

export default ReportPage;