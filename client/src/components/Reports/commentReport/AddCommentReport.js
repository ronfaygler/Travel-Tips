const AddCommentReport = () => {
    return (
        <div>
            <h1>הוסף תגובה</h1>
            <textarea placeholder="התגובה שלך"></textarea>
            <input type="text" placeholder="שם" />
            <input type="email" placeholder="אימייל" />
            <button>שלח</button>
        </div>
    );
};

export default AddCommentReport;