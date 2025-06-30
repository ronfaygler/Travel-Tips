import React, { useContext, useState } from "react";
import { ReportContext } from "../../../context/ReportContext/ReportContext"
import { newReport } from "../../../services/utils";
import styles from "./UploadReport.module.css"

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

        // Add content
        html += `<div>${content}</div>`;
        
        // Add images
        images.forEach((file, id) => {
            const url = URL.createObjectURL(file);
            html = html.replaceAll(`[${id}]`, `<img src="${url}" style="max-width: 100%; margin: 10px 0;" />`);
        });
        
        // Clean up any unused image URLs
        return html.replace(/<img[^>]*>\s*\[\d+\]\s*<\/img>/g, '');
    };
    
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>העלאת כתבה חדשה</h2>
            {successMessage && <p className={`${styles.message} ${styles.success}`}>{successMessage}</p>}
            {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
            
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    כותרת:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className={styles.input} />
                </label>

                <label className={styles.label}>
                    תמונה ראשית:
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setMainImage(e.target.files[0])} 
                        className={styles.input} 
                    />
                </label>
                <div className={styles.imagePreviewContainer}>
                    {/* New images preview */}
                    {images.map((image) => (
                        <div key={image.name} className={styles.imagePreview}>
                            <img 
                                src={URL.createObjectURL(image)} 
                                alt={`new-${image.name}`}
                                className={styles.previewImage}
                            />
                            <button 
                                onClick={() => handleRemoveNewImage(image.name)}
                                className={styles.deleteButton}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <label className={styles.label}>
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
                        className={styles.input} 
                    />
                </label>

                <label className={styles.label}>
                    תוכן הכתבה:
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className={styles.textarea}
                        placeholder="כתוב את התוכן כאן, והוסף [0], [1] וכו' היכן שברצונך להכניס תמונה"
                    />
                </label>

                <label className={styles.label}>
                    תיאור קצר:
                    <input type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required className={styles.input} />
                </label>
                <label className={styles.label}>
                    קטגוריה:
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className={styles.select}>
                        <option value="חדשות">חדשות</option>
                        <option value="מלונות">מלונות</option>
                        <option value="נקודות">נקודות</option>
                        <option value="כרטיסי אשראי">כרטיסי אשראי</option>
                    </select>
                </label>
                <label className={styles.label}>
                    שם הכתב:
                    <input type="text" value={writer} onChange={(e) => setWriter(e.target.value)} required className={styles.input} />
                </label>
                <button type="submit" className={`${styles.button} ${styles.submitButton}`}>העלה כתבה</button>
                <button type="button" onClick={handleReset} className={`${styles.button} ${styles.resetButton}`}>איפוס</button>
            </form>
            <div className={styles.preview}>
                <h3>תצוגה מקדימה של הכתבה:</h3>
                <div dangerouslySetInnerHTML={{ __html: getContentWithImages() }} />
            </div>
        </div>
    );
};
    

export default UploadReport;