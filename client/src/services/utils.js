import { httpService as api } from "./api";
import axios from "axios";

export const fetchReports = async () => {
    try {
        const response = await api.get(`/reports`);
        return response.data;
      } catch (error) {
        console.error("שגיאה במציאת הכתבות:", error);
        throw error;
      }
};

export const newReport = async (formData) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/reports/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  }
  catch (error) {
    console.error("שגיאה ביצירת המודעה:", error);
    throw error;
  }
}

export const updateReportUtil = async (id, formData) => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/reports/update-report/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    }
    catch (error) {
        console.error("שגיאה בעדכון המודעה:", error);
        throw error;
    }
}

// export const filterReports = async () => {
//   try {
//     const response = await api.get(`/reports/:category`);
//     return response.data;
//   } catch(err) {
//     console.error("שגיאה במציאת הכתבות המתאימות:", err);
//     throw err;
//   }
// }