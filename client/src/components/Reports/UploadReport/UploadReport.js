import React, { useContext, useState } from "react";
import { ReportContext } from "../../../context/ReportContext/ReportContext"
import { newReport } from "../../../services/utils";
import commonStyles from "../../../styles/ReportForms.module.css";
import styles from "./UploadReport.module.css";

const UploadReport = () => {
    const { addNewReport } = useContext(ReportContext);
    const [title, setTitle ] = useState("")
    const [mainImage, setMainImage] = useState("");   
    const [content, setContent] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [category, setCategory] = useState("חדשות")
    const [writer, setWriter] = useState("");
    const [images, setImages] = useState([]);   
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);


    const handleRemoveNewImage = (name) => {
        console.log("removing image with name: ", name);
        setImages(prev => prev.filter((image) => image.name !== name));
        console.log("images after remove: ", images);
    };
    
    const handleReset = () => {
        setTitle("");
        setMainImage("");
        setContent("");
        setShortDescription("");
        setCategory("חדשות")
        setWriter("");
        setImages([]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        // Append text fields
        formData.append("title", title);
        formData.append("content", content);
        formData.append("shortDescription", shortDescription);
        formData.append("category", category);
        formData.append("writer", writer);
        formData.append("mainImage", mainImage);
        formData.append("comments", []);

        // Append each additional content image
        images.forEach((imgFile) => {
            formData.append('images', imgFile);
        });
        // console.log("images in upload: ", images);
        
        try {
            const report = await newReport(formData); 
            addNewReport(report);
            handleReset();
            setError(null);
            setSuccessMessage("המודעה הועלתה בהצלחה!");
        } catch (error) {
            console.error("שגיאה ביצירת המודעה", error);
            setError("שגיאה ביצירת המודעה");
        }
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
        
        // Add images
        images.forEach((file, id) => {
            const url = URL.createObjectURL(file);
            html = html.replaceAll(`[${id}]`, `<img src="${url}" style="max-width: 100%; margin: 10px 0;" />`);
        });
        
        // Clean up any unused image URLs
        return html.replace(/<img[^>]*>\s*\[\d+\]\s*<\/img>/g, '');
    };
    
    return (
        <div className={`${commonStyles.container} ${styles.uploadContainer}`}>
            <h2 className={commonStyles.title}>העלאת כתבה חדשה</h2>
            {successMessage && <p className={`${commonStyles.message} ${commonStyles.success}`}>{successMessage}</p>}
            {error && <p className={`${commonStyles.message} ${commonStyles.error}`}>{error}</p>}
            
            <form onSubmit={handleSubmit} className={commonStyles.form}>
                <label className={commonStyles.label}>
                    כותרת:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className={commonStyles.input} />
                </label>

                <label className={commonStyles.label}>
                    תמונה ראשית:
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setMainImage(e.target.files[0])} 
                        className={commonStyles.input} 
                    />
                </label>
                <div className={commonStyles.imagePreviewContainer}>
                    {/* New images preview */}
                    {images.map((image) => (
                        <div key={image.name} className={commonStyles.imagePreview}>
                            <img 
                                src={URL.createObjectURL(image)} 
                                alt={`new-${image.name}`}
                                className={commonStyles.previewImage}
                            />
                            <button 
                                onClick={() => handleRemoveNewImage(image.name)}
                                className={commonStyles.deleteButton}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <label className={commonStyles.label}>
                    העלאת תמונות לתוכן:
                    <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={(e) => {
                            const files = Array.from(e.target.files);
                            setImages(prev => [...prev, ...files]);
                            // setImages(Array.from(e.target.files))
                        }} 
                        className={commonStyles.input} 
                    />
                </label>

                <label className={commonStyles.label}>
                    תוכן הכתבה:
                    <p style={{ fontSize: '12px', color: '#666' }}>הוסף [0], [1] וכו' היכן שברצונך להכניס תמונה</p>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className={commonStyles.textarea}
                        placeholder="כתוב את התוכן כאן, והוסף [0], [1] וכו' היכן שברצונך להכניס תמונה"
                    />
                </label>

                <label className={commonStyles.label}>
                    תיאור קצר:
                    <input type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required className={commonStyles.input} />
                </label>
                <label className={commonStyles.label}>
                    קטגוריה:
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className={commonStyles.select}>
                        <option value="חדשות">חדשות</option>
                        <option value="מלונות">מלונות</option>
                        <option value="נקודות">נקודות</option>
                        <option value="כרטיסי אשראי">כרטיסי אשראי</option>
                    </select>
                </label>
                <label className={commonStyles.label}>
                    שם הכתב:
                    <input type="text" value={writer} onChange={(e) => setWriter(e.target.value)} required className={commonStyles.input} />
                </label>
                <button type="submit" className={`${commonStyles.button} ${commonStyles.submitButton}`}>העלה כתבה</button>
                <button type="button" onClick={handleReset} className={`${commonStyles.button} ${commonStyles.resetButton}`}>איפוס</button>
            </form>
            <div className={styles.uploadContainer}>
                <h3>תצוגה מקדימה של הכתבה:</h3>
                <div dangerouslySetInnerHTML={{ __html: getContentWithImages() }} />
            </div>
        </div>
    );
};
    

export default UploadReport;