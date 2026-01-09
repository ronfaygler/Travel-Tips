import styles from "./commentReport.module.css";
import { useState } from "react";
import { addCommentToReportUtil } from "../../../services/utils";

const AddCommentReport = ({ report, onCommentAdded }) => {
    const [successMessage, setSuccessMessage] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const newComment = {
                text: formData.get('comment'),
                author: formData.get('name'),
                email: formData.get('email')
            };
            
            if (!report || !report._id) {
                console.error("Report or report ID is undefined");
                setSuccessMessage("שגיאה: לא נמצא מזהה כתבה");
                return;
            }
            
            // Call API to add comment
            const response = await addCommentToReportUtil(report._id, newComment);
            
            // Notify parent component
            if (onCommentAdded) {
                onCommentAdded(response.comments);
            }
            
            setSuccessMessage("תגובה נוספה בהצלחה");
            
            // Clear form
            e.target.reset();
            
        } catch (error) {
            console.error(error);
            setSuccessMessage("שגיאה בהוספת התגובה");
        }
    };

    return (
        <div className={styles.addComment}>
            <h1>הוסף תגובה</h1>
            <form onSubmit={handleSubmit}>
                <textarea name="comment" placeholder="התגובה שלך"></textarea>
                <div className={styles.inputContainer}>
                    <input type="text" name="name" placeholder="שם" />
                    <input type="email" name="email" placeholder="אימייל" />
                </div>
                <button type="submit">שלח</button>
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
};

export default AddCommentReport;