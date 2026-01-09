import { deleteReportUtil } from '../../../services/utils';

const DeleteReport = (id) => {
    return (
        <div>
            {async () => {
                try {
                    await deleteReportUtil(id);
                } catch (error) {
                    console.error("שגיאה במחיקת המודעה:", error);
                }
            }}
        </div>
    );
};

export default DeleteReport;