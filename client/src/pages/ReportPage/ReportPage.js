import { useParams, useLocation } from 'react-router-dom';
import styles from "./ReportPage.module.css";

const ReportPage = () => {
    const location = useLocation();
    const { report } = location.state;
  if (!report) {
    return <h1>הכתבה לא נמצאה</h1>;
  }

  const renderContentWithImages = () => {
    if (!report?.content) return null;
    const parts = report.content.split(/\[(\d+)\]/);
    return parts.map((part, index) => {
        if (index % 2 === 1) {
            const imgIndex = parseInt(part, 10);
            // Get the image path from the database
            const imagePath = report.images?.[imgIndex];
            console.log('Image path:', imagePath);
            
            // Construct the full URL
            const imgSrc = imagePath 
                ? `${process.env.REACT_APP_API_URL}/${imagePath.replace(/\\/g, "/")}`
                : null;
            
            if (imgSrc) {
                return (
                    <img 
                        key={index} 
                        src={imgSrc} 
                        alt={`image-${imgIndex}`} 
                        className={styles.inlineImage}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            console.error(`Failed to load image ${imgSrc}`);
                        }}
                    />
                );
            }
            if (imgSrc) {
                return <img key={index} src={imgSrc} alt={`image-${imgIndex}`} className={styles.inlineImage} />;
            }
        }
        return <span key={index}>{part}</span>;
    });
};
  return (
    <div className={styles.layoutContainer}>
        <h1 className={styles.title}>{report.title}</h1>
        <img src={report?.mainImage ? `${process.env.REACT_APP_API_URL}/${report.mainImage.replace(/\\/g, "/")}` : ''} 
            alt={report?.title} 
            className={styles.img}
            onError={(e) => {
                e.currentTarget.style.display = 'none';
                console.error(`Failed to load main image ${report.mainImage}`);
            }}
        />
        <p className={styles.content}>
            {renderContentWithImages()}
        </p>
    </div>
    );
};

export default ReportPage;