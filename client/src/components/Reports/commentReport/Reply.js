import styles from './commentReport.module.css';

const Reply = ({ onClick }) => {
    return (
        <div className={styles.reply}>
            <button type="button" onClick={onClick}>הגב</button>
        </div>
    );
};

export default Reply;