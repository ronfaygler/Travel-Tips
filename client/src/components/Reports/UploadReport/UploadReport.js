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
            console.log('Uploading image:', imgFile.name);
            formData.append('images', imgFile);
        });
        
        try {
            const report = await newReport(formData); // Assuming this function handles FormData
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
        let html = content;
        images.forEach((file, index) => {
            const url = URL.createObjectURL(file);
            html = html.replaceAll(`[${index}]`, `<img src="${url}" style="max-width: 100%; margin: 10px 0;" />`);
        });
        return html;
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

                <label className={styles.label}>
                    העלאת תמונות לתוכן:
                    <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={(e) => setImages(Array.from(e.target.files))} 
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