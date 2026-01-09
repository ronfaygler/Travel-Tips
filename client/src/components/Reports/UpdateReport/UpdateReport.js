import { useState, useEffect } from 'react';
import commonStyles from "../../../styles/ReportForms.module.css";
import styles from "./UpdateReport.module.css";
import { useContext } from 'react';
import { ReportContext } from "../../../context/ReportContext/ReportContext";
import { useParams } from 'react-router-dom';
import { updateReportUtil } from "../../../services/utils";
import { useNavigate } from 'react-router-dom';

const UpdateReport = () => {
    const navigate = useNavigate();
    const {reports, updateReport} = useContext(ReportContext);
    const [updatedReport, setUpdatedReport] = useState(null);
    const {id} = useParams();
    const report = reports.find(report => report._id === id);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [writer, setWriter] = useState("");
    const [category, setCategory] = useState("");
    const [mainImage, setMainImage] = useState(null);
    const [existingImages, setExistingImages] = useState([]); // For existing images
    const [newImages, setNewImages] = useState([]); // For new images being added
    const [shortDescription, setShortDescription] = useState("");

    useEffect(() => {
        if (report && !updatedReport) {
          setTitle(report.title || "");
          setContent(report.content || "");
          setWriter(report.writer || "");
          setCategory(report.category || "");
          setMainImage(report.mainImage || null);
          console.log("mainImage: ", mainImage);
          setExistingImages(report.images || []);
          console.log("existingImages: ", existingImages);
          setShortDescription(report.shortDescription || "");
        }
      }, [report]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setNewImages(prev => [...prev, ...files]);
        console.log("newImages after upload: ", newImages);
    };

    useEffect(() => {
        console.log("existingImages: ", existingImages);
        console.log("newImages: ", newImages);
      }, [existingImages, newImages]);


    const handleDeleteImage = (image) => {
        console.log("removing image with name: ", image.name);
        setExistingImages(prev => prev.filter((img) => img._id !== image._id));
        console.log("existingImages after remove: ", existingImages);
    };

    const handleRemoveNewImage = (image) => {
        console.log("removing new image with name: ", image.name);
        setNewImages(prev => prev.filter((img) => img.name !== image.name));
        console.log("newImages after remove: ", newImages);
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

        // Handle existing images
        if (existingImages && existingImages.length > 0) {
            console.log("existingImages length: ", existingImages.length);
            // existingImages.forEach((image, index) => {
            //     formData.append('images', image);
            // });
            existingImages.forEach(image => {
                formData.append('existingImageNames', image.name); // or ._id if you're using _id
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
            console.log('images:', formData.getAll('images').length);
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

    const getContentWithImages = () => {
        // Create the main image HTML
        let html = `<h2>${title}</h2>`;
        if (mainImage) {
            const mainImageUrl = mainImage instanceof File 
                ? URL.createObjectURL(mainImage)
                : `${process.env.REACT_APP_API_URL}/${mainImage}`;
            html += `<div style="max-width: 50%; margin: 10px 0;">
                        <img src="${mainImageUrl}" alt="Main Image" style="max-width: 100%; height: auto;" />
                    </div>`;
        }

        // Add content with proper line breaks
        const contentWithBreaks = content.split('\n').map((line, lineIndex) => (
            line + (lineIndex < content.split('\n').length - 1 ? '<br />' : '')
        )).join('');
        
        html += `<div>${contentWithBreaks}</div>`;

        // Add existing images
        existingImages.forEach((image, id) => {
            const url = `${process.env.REACT_APP_API_URL}/${image.name}`;
            html = html.replaceAll(`[${id}]`, `<img src="${url}" style="max-width: 100%; margin: 10px 0;" />`);
        });
        
        // Add new images
        newImages.forEach((image, id) => {
            const url = URL.createObjectURL(image);
            html = html.replaceAll(`[${id + existingImages.length}]`, `<img src="${url}" style="max-width: 100%; margin: 10px 0;" />`);
        });
        
        // Clean up any unused image URLs
        return html.replace(/<img[^>]*>\s*\[\d+\]\s*<\/img>/g, '');
    };
    
    return (
        <div className={`${commonStyles.container} ${styles.updateContainer}`}>
            <h2 className={commonStyles.title}>עריכת כתבה: {title} </h2>
            <form className={commonStyles.form} onSubmit={handleSubmit}>
                <label>
                    כותרת:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={commonStyles.input} />
                </label>
                <label>
                    תוכן:
                    <p style={{ fontSize: '12px', color: '#666' }}>הוסף [0], [1] וכו' היכן שברצונך להכניס תמונה</p>
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        className={commonStyles.textarea} 
                        placeholder="כתוב את התוכן כאן, והוסף [0], [1] וכו' היכן שברצונך להכניס תמונה"
                    />
                </label>
                <label>
                קטגוריה:
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className={commonStyles.select}>
                        <option value="חדשות">חדשות</option>
                        <option value="מלונות">מלונות</option>
                        <option value="נקודות">נקודות</option>
                        <option value="כרטיסי אשראי">כרטיסי אשראי</option>
                    </select>
                </label>
                <label>
                    תיאור קצר:
                    <input type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} className={commonStyles.input} />
                </label>
                <label>
                    שם הכתב:
                    <input type="text" value={writer} onChange={(e) => setWriter(e.target.value)} className={commonStyles.input} />
                </label>
                <label>
                    תמונה ראשית:
                    <div className={commonStyles.imagePreviewContainer}>
                        {mainImage && (
                            <div className={commonStyles.imagePreview}>
                                <img 
                                    src={`${process.env.REACT_APP_API_URL}/${mainImage}`}
                                    alt="Main preview"
                                    className={commonStyles.previewImage}
                                />
                            </div>
                        )}
                    </div>
                    <input 
                        type="file"
                        onChange={(e) => setMainImage(e.target.files[0])}
                        accept="image/*"
                        className={commonStyles.input}
                    />  
                </label>
                <label>
                    תמונות נוספות:
                    <div className={commonStyles.imagePreviewContainer}>
                        {/* Existing images */}
                        {existingImages.map((image) => (
                            <div key={`existing-${image.name}`} className={commonStyles.imagePreview}>
                                <img 
                                    src={`${process.env.REACT_APP_API_URL}/${image.name}`}
                                    alt={`existing-${image.name}`}
                                    className={commonStyles.previewImage}
                                />
                                <button 
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        handleDeleteImage(image);
                                    }}
                                    className={commonStyles.deleteButton}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        {/* New images preview */}
                        {newImages.map((image) => (
                            <div key={`new-${image.name}`} className={commonStyles.imagePreview}>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`new-${image.name}`}
                                    className={commonStyles.previewImage}
                                />
                                <button 
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        handleRemoveNewImage(image);
                                    }}
                                    className={commonStyles.deleteButton}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                    <input 
                        type="file" 
                        multiple 
                        onChange={handleImageUpload}
                        className={commonStyles.input}
                        accept="image/*"
                    />
                </label>
                <button type="submit" className={`${commonStyles.button} ${commonStyles.submitButton}`}>סיום</button>
            </form>
            
            {successMessage && <p className={`${commonStyles.message} ${commonStyles.success}`}>{successMessage}</p>}
            {error && <p className={`${commonStyles.message} ${commonStyles.error}`}>{error}</p>}
            <div className={styles.mainImagePreview}>
                <h3>תצוגה מקדימה של הכתבה:</h3>
                <div dangerouslySetInnerHTML={{ __html: getContentWithImages() }} />
            </div>
        </div>
    );
}

export default UpdateReport;
