import { getLocationService } from "../../utils/commonService";
import { DISTRICT_API, PROVINCE_API, WARD_API } from "../../utils/constants";

export class LocationService {
  async getProvince(body) {
    let data = getLocationService(PROVINCE_API, 'GET', body);
    return data;
  }

  async getWard(body) {
    let data = getLocationService(WARD_API, 'POST', body);
    return data;
  }

  async getDistrict(body) {
    let data = getLocationService(DISTRICT_API, 'POST', body);
    return data;
  }
}
