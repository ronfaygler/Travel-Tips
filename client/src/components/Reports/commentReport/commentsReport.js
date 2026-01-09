import styles from './commentReport.module.css';

const CommentsReport = ({ comments }) => {
    return (
        <div className={styles.comments}>
            <h1>תגובות ({comments?.length || 0})</h1>
            {comments?.map((comment, index) => (
                <div key={comment._id || comment.id || `comment-${index}`}>
                    <div className={styles.commentMeta}>
                        <span className={styles.author}>{comment.author}</span>
                        {comment.createdAt && (
                            <span className={styles.timestamp}>
                                {new Date(comment.createdAt).toLocaleDateString('he-IL')}
                            </span>
                        )}
                    </div>
                    <p>{comment.text}</p>
                </div>
            ))}
        </div>
    );
};

export default CommentsReport;