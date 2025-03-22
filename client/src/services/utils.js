import { httpService as api } from "./api";

export const fetchReports = async () => {
    try {
        const response = await api.get(`/reports`);
        return response.data;
      } catch (error) {
        console.error("שגיאה במציאת הכתבות:", error);
        throw error;
      }
};

export const newReport = async (report) => {
  try {
    const res = await api.post(`/reports/create`, report);
    return res.data;
  }
  catch (error) {
    console.error("שגיאה ביצירת המודעה:", error);
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