import { openNotification } from "../../utils/common";
import { LocationService } from "../services/locationService";
import {
  GET_DISTRICT_FINISH,
  GET_LOCATION_ERROR,
  GET_LOCATION_START,
  GET_PROVINCE_FINISH,
  GET_WARD_FINISH,
} from "../types";

const getProvince = (body) => {
  return async (dispatch) => {
    await dispatch({ type: GET_LOCATION_START });
    const locationService = new LocationService();
    const response = await locationService.getProvince(body);
    if (response.isSuccess) {
      await dispatch({ type: GET_PROVINCE_FINISH, payload: response.data.data });
    } else if (!response.isSuccess) {
      openNotification("Error", response.errorMessage);
      dispatch({ type: GET_LOCATION_ERROR, payload: response.errorMessage });
    }
  };
};

const getWard = (body) => {
  return async (dispatch) => {
    await dispatch({ type: GET_LOCATION_START });
    const locationService = new LocationService();
    const response = await locationService.getWard(body);
    if (response.isSuccess) {
      await dispatch({ type: GET_WARD_FINISH, payload: response.data.data });
    } else if (!response.isSuccess) {
      openNotification("Error", response.errorMessage);
      dispatch({ type: GET_LOCATION_ERROR, payload: response.errorMessage });
    }
  };
};

const getDistrict = (body) => {
  return async (dispatch) => {
    await dispatch({ type: GET_LOCATION_START });
    const locationService = new LocationService();
    const response = await locationService.getDistrict(body);
    if (response.isSuccess) {
      await dispatch({ type: GET_DISTRICT_FINISH, payload: response.data.data });
    } else if (!response.isSuccess) {
      openNotification("Error", response.errorMessage);
      dispatch({ type: GET_LOCATION_ERROR, payload: response.errorMessage });
    }
  };
};

export default {
  getProvince,
  getWard,
  getDistrict
};
