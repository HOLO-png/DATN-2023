import {
  GET_DISTRICT_FINISH,
  GET_LOCATION_ERROR,
  GET_LOCATION_START,
  GET_PROVINCE_FINISH,
  GET_WARD_FINISH,
} from "../types";

const initialState = {
  dataProvince: [],
  dataWard: [],
  dataDistrict: [],
  // servicePackage: null,
  // leadTime: null,
  // feeServiceChange: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION_START:
      return { ...state, hasError: false, loading: true };
    case GET_PROVINCE_FINISH:
      return {
        ...state,
        dataProvince: action.payload,
        hasError: false,
        loading: false,
      };
    case GET_WARD_FINISH:
      return {
        ...state,
        dataWard: action.payload,
        hasError: false,
        loading: false,
      };
    case GET_DISTRICT_FINISH:
      return {
        ...state,
        dataDistrict: action.payload,
        hasError: false,
        loading: false,
      };
    case GET_LOCATION_ERROR:
      return { ...state, hasError: true, loading: false, messageError: action.payload };
    default:
      return state;
  }
};
