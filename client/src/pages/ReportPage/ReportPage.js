import { useParams, useLocation, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./ReportPage.module.css";
import AddCommentReport from '../../components/Reports/commentReport/AddCommentReport';
import CommentsReport from '../../components/Reports/commentReport/commentsReport';

const ReportPage = () => {
    const params = useParams();
    const [comments, setComments] = useState([]);
    const [currentReport, setCurrentReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/reports/${params.id}`);
                const freshReport = response.data;
                setCurrentReport(freshReport);
                setComments(freshReport.comments || []);
            } catch (error) {
                console.error('Error fetching report:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [params.id]);

    const handleCommentAdded = (newComments) => {
        setComments(newComments);
        // Also update the report state to keep everything in sync
        if (currentReport) {
            setCurrentReport({
                ...currentReport,
                comments: newComments
            });
        }
    };

    if (loading) {
        return <h1>טוען...</h1>;
    }

    if (!currentReport) {
        return <h1>הכתבה לא נמצאה</h1>;
    }

    const renderContentWithImages = () => {
        if (!currentReport?.content) return null;
        const parts = currentReport.content.split(/\[(\d+)\]/);
        console.log("currentReport.images: ", currentReport.images);
        console.log("currentReport.comments: ", currentReport.comments);
        console.log("Split parts:", parts);

        return parts.map((part, index) => {
            if (index % 2 === 1) {
                const imgIndex = parseInt(part, 10);
                // Get the image path from the database
                const imageObj = currentReport.images?.[imgIndex];
                const imagePath = imageObj?.name || null;
                console.log('Image path:', imagePath);
                
                // Construct the full URL
                const imgSrc = imagePath 
                    ? `${process.env.REACT_APP_API_URL}/${imagePath.replace(/\\/g, "/")}`
                    : null;
                
                if (imgSrc) {
                    return (
                        <React.Fragment key={index}>
                            <br />
                            <img 
                                src={imgSrc} 
                                alt={`image-${imgIndex}`} 
                                className={styles.inlineImage}
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    console.error(`Failed to load image ${imgSrc}`);
                                }}
                            />
                            <br />
                        </React.Fragment>
                    );
                }
            }
            return <span key={index}>{part.split('\n').map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                    {line}
                    {lineIndex < part.split('\n').length - 1 && <br />}
                </React.Fragment>
            ))}</span>;
        });
    };
  return (
    <div className={styles.layoutContainer}>
        <div className={styles.topRightLink}>
            <Link to={`/update-report/${currentReport._id}`}>
                <span className={styles.updateReport}>עריכה</span>
            </Link>
        </div>
        <div className='report-content'>
            <h1 className={styles.title}>{currentReport.title}</h1>
            <img src={currentReport?.mainImage ? `${process.env.REACT_APP_API_URL}/${currentReport.mainImage.replace(/\\/g, "/")}` : ''} 
                alt={currentReport?.title} 
                className={styles.img}
                onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    console.error(`Failed to load main image ${currentReport.mainImage}`);
                }}
            />
            <p className={styles.content}>
                {renderContentWithImages()}
            </p>
        </div>
        <div className='report-comments'>
            <CommentsReport comments={comments} report={currentReport} onCommentAdded={handleCommentAdded} />
            <AddCommentReport report={currentReport} onCommentAdded={handleCommentAdded} />
        </div>
        <div className='report-footer'>
            <p> 2025 Insurance Company. All rights reserved.</p>
        </div>
    </div>
    );

};

export default ReportPage;