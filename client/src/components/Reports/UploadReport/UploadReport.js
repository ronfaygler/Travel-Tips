import React, { useContext, useState } from "react";
import { ReportContext } from "../../../context/ReportContext/ReportContext"
import { newReport } from "../../../services/utils";
import styles from "./UploadReport.module.css"

const UploadReport = () => {
    const { addNewReport } = useContext(ReportContext);
    const [title, setTitle ] = useState("")
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [category, setCategory] = useState("חדשות")
    const [writer, setWriter] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

  const handleReset = () => {
    setTitle("");
    setImage("");
    setContent("");
    setShortDescription("");
    setWriter("");
    setCategory("חדשות")
  };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const reportDetails = {
            title,
            image,
            content,
            shortDescription,
            writer,
            category,
        }
        try {
            const report = await newReport(reportDetails)
            addNewReport(report);
            handleReset();
            setError(null);
            setSuccessMessage("המודעה הועלתה בהצלחה!");
        }
        catch (error){
            console.error("שגיאה ביצירת המודעה", error)
            setError("שגיאה ביצירת המודעה")
        }
    }

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
                    תמונה (קישור):
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required className={styles.input} />
                </label>
                <label className={styles.label}>
                    תוכן הכתבה:
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required className={styles.textarea} />
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
        </div>
    );
};
    

export default UploadReport;