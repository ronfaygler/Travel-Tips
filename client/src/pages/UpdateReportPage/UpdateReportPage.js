import { useState, useEffect } from 'react';
import styles from './UpdateReportPage.module.css'; // Make sure this file exists for styling
import { useContext } from 'react';
import { ReportContext } from '../../context/ReportContext/ReportContext';
import { useParams } from 'react-router-dom';
import { updateReportUtil } from '../../services/utils';
import { useNavigate } from 'react-router-dom';

const UpdateReportPage = () => {
    const navigate = useNavigate();
    const {reports, updateReport} = useContext(ReportContext);
    const [updatedReport, setUpdatedReport] = useState(null);
    const {id} = useParams();
    console.log("reportId: ", id);
    const report = reports.find(report => report._id === id);
    console.log("report: ", report);
    // if (!report) {
    //     return <h1>הכתבה לא נמצאה</h1>;
    // }
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [writer, setWriter] = useState("");
    const [category, setCategory] = useState("");
    const [mainImage, setMainImage] = useState(null);
    const [existingImages, setExistingImages] = useState([]); // For existing images
    const [newImages, setNewImages] = useState([]); // For new images being added
    // const [updatedImages, setUpdatedImages] = useState([]);
    // const [deletedImages, setDeletedImages] = useState([]); // For images marked for deletion
    const [shortDescription, setShortDescription] = useState("");
    useEffect(() => {
        if (report && !updatedReport) {
          setTitle(report.title || "");
          setContent(report.content || "");
          setWriter(report.writer || "");
          setCategory(report.category || "");
          setMainImage(report.mainImage || null);
          setExistingImages(report.images || []);
          setShortDescription(report.shortDescription || "");
        }
      }, [report]);
    // const [title, setTitle] = useState(report.title);
    // const [content, setContent] = useState(report.content);
    // const [writer, setWriter] = useState(report.writer);
    // const [category, setCategory] = useState(report.category);    
    // const [mainImage, setMainImage] = useState(report.mainImage);
    // const [images, setImages] = useState(report.images);
    // const [shortDescription, setShortDescription] = useState(report.shortDescription);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setNewImages(prev => [...prev, ...files]);
        console.log("newImages after upload: ", newImages);
        // setExistingImages(prev => [...prev, ...files]);
    };

    useEffect(() => {
        console.log("existingImages: ", existingImages);
        console.log("newImages: ", newImages);
      }, [existingImages, newImages]);

    const handleDeleteImage = (imageToDelete) => {
        setExistingImages(prev => prev.filter(image => image !== imageToDelete));
    };

    const handleRemoveNewImage = (index) => {
        setNewImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('writer', writer);
        formData.append('category', category);
        formData.append('shortDescription', shortDescription);

        // Handle main image
        if (mainImage) {
            formData.append('mainImage', mainImage);
        }

        if (existingImages && existingImages.length > 0) {
            console.log("existingImages length: ", existingImages.length);
            existingImages.forEach((image, index) => {
                formData.append('images', image);
            });
        }

        // Handle new images
        if (newImages && newImages.length > 0) {
            console.log("newImages length: ", newImages.length);
            newImages.forEach((image, index) => {
                formData.append('images', image);
            });
        }

        if (existingImages.length === 0 && newImages.length === 0) {
            console.log("no images");
            formData.append('images', []);
        }

        setLoading(true);
        try {
            console.log("Form data :", formData);
            const updated = await updateReportUtil(id, formData);
            console.log("updated: ", updated);
            updateReport(id, updated);
            setUpdatedReport(updated);
            setError(null);
            setSuccessMessage("המודעה עודכנה בהצלחה!");
            setTimeout(() => {
                navigate(`/report/${updated._id}`, { state: { report: updated } });
              }, 500);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleReset = () => {
        setTitle(report.title);
        setContent(report.content);
        setWriter(report.writer);
        setCategory(report.category);
        setMainImage(report.mainImage);
        setExistingImages(report.images);
        setShortDescription(report.shortDescription);
    };
    
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>עריכת כתבה: {title} </h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    כותרת:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    תוכן:
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </label>
                <label>
                קטגוריה:
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="חדשות">חדשות</option>
                        <option value="מלונות">מלונות</option>
                        <option value="נקודות">נקודות</option>
                        <option value="כרטיסי אשראי">כרטיסי אשראי</option>
                    </select>
                </label>
                <label>
                    תיאור קצר:
                    <input type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
                </label>
                <label>
                    שם הכתב:
                    <input type="text" value={writer} onChange={(e) => setWriter(e.target.value)} />
                </label>
                <label>
                    תמונה ראשית:
                    <input 
                        type="file"
                        onChange={(e) => setMainImage(e.target.files[0])}
                        accept="image/*"
                    />  
                </label>
                <label>
                    תמונות נוספות:
                    <div className={styles.imagePreviewContainer}>
                        {/* Existing images */}
                        {existingImages.map((image, index) => (
                            <div key={index} className={styles.imagePreview}>
                                <img 
                                    src={`${process.env.REACT_APP_API_URL}/${image}`}
                                    alt={`existing-${index}`}
                                    className={styles.previewImage}
                                />
                                <button 
                                    onClick={() => handleDeleteImage(image)}
                                    className={styles.deleteButton}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        {/* New images preview */}
                        {newImages.map((image, index) => (
                            <div key={index} className={styles.imagePreview}>
                                <img 
                                    src={URL.createObjectURL(image)} 
                                    alt={`new-${index}`}
                                    className={styles.previewImage}
                                />
                                <button 
                                    onClick={() => handleRemoveNewImage(index)}
                                    className={styles.deleteButton}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                    {/* <input 
                        type="file" 
                        multiple 
                        onChange={handleImageUpload}
                        accept="image/*"
                    /> */}
                </label>
                <button type="submit" className={styles.button}>סיום</button>
            </form>
            {successMessage && <p className={`${styles.message} ${styles.success}`}>{successMessage}</p>}
            {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
        </div>
    );
}

export default UpdateReportPage;