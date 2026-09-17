import { getDashboardData } from "../../services/dashboard.service";
import {
  getDashboardStart,
  getDashboardSuccess,
  getDashboardFailure,
} from "../slices/dashboardSlice";

export const fetchDashboardDataThunk = () => async (dispatch) => {
  try {
    dispatch(getDashboardStart());
    const response = await getDashboardData();

    const dashData = response?.dashboard || response;
    dispatch(getDashboardSuccess(dashData));
  } catch (error) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch(getDashboardFailure(errMsg));
    console.error("Dashboard Redux Extraction Error:", errMsg);
  }
};
