import styles from './commentReport.module.css';
import React, { useState } from 'react';
import Reply from './Reply';
import AddCommentReport from './AddCommentReport';

const CommentsReport = ({ comments, report, onCommentAdded }) => {
    const [replyToCommentId, setReplyToCommentId] = useState(null);

    const toggleReply = (commentId) => {
        setReplyToCommentId((prev) => (prev === commentId ? null : commentId));
    };

    const handleReplyCommentAdded = (newComments) => {
        if (onCommentAdded) {
            onCommentAdded(newComments);
        }
        setReplyToCommentId(null);
    };

    const getItemId = (item, fallback) => item?._id || item?.id || fallback;

    const renderCommentItem = (item, fallbackId, depth = 0) => {
        const itemId = getItemId(item, fallbackId);
        const isReply = depth > 0;

        return (
            <div
                key={itemId}
                className={`${styles.threadItem} ${isReply ? styles.replyItem : ''}`}
                style={{ '--depth': depth }}
            >
                <div className={styles.commentHeaderRow}>
                    <Reply onClick={() => toggleReply(itemId)} />
                    <div className={isReply ? styles.replyMeta : styles.commentMeta}>
                        <span className={styles.author}>{item.author}</span>
                        {item.createdAt && (
                            <span className={styles.timestamp}>
                                {new Date(item.createdAt).toLocaleDateString('he-IL')} {new Date(item.createdAt).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        )}
                    </div>
                </div>

                <p className={isReply ? styles.replyText : undefined}>{item.text}</p>

                {replyToCommentId === itemId && (
                    <AddCommentReport
                        report={report}
                        onCommentAdded={handleReplyCommentAdded}
                        parentCommentId={item._id}
                    />
                )}

                {item?.replies?.length > 0 && (
                    <div className={styles.replies}>
                        {item.replies.map((child, childIndex) =>
                            renderCommentItem(child, `${itemId}-reply-${childIndex}`, depth + 1)
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={styles.comments}>
            <h1>תגובות ({comments?.length || 0})</h1>
            {comments?.map((comment, index) => renderCommentItem(comment, `comment-${index}`, 0))}
        </div>
    );
};

export default CommentsReport;