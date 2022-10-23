import React, { Component } from "react";
import { Form, Input, Button, Row, Col, Select, Collapse, Spin } from "antd";
import _ from "lodash";
import { connect } from "react-redux";
import actions from "../../../../redux/actions";
import { isEmpty, openNotification } from "../../../../utils/common";
import LocationMap from "../../../Components/LocationMap";

const selectAddressLabels = ["home", "office", "other"];

const { Panel } = Collapse;

const layout = {
  labelCol: { lg: 6, xs: 24 },
  wrapperCol: { lg: 18, xs: 24 },
};
const tailLayout = {
  wrapperCol: { span: 16 },
};

class AddressForm extends Component {
  formRef = React.createRef();
  state = {
    addressId: "",
    fullname: "",
    label: "",
    phoneno: "",
    long: 0,
    lat: 0,
    isActive: "false",
    province: null,
    ward: null,
    district: null,
    addressDetail: "",
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.user.editAddressResp !== prevProps.user.editAddressResp &&
      this.props.user.editAddressResp
    ) {
      openNotification("Success", "Address Updated Successfully");
      this.props.changeShow("table", this.props.user.editAddressResp.user);
    }
    if (
      this.props.user.addAddressResp !== prevProps.user.addAddressResp &&
      this.props.user.addAddressResp
    ) {
      openNotification("Success", "Address added Successfully");
      this.props.changeShow("table", this.props.user.editAddressResp.user);
    }
    if (this.props.location && this.props.location.hasError) {
      openNotification("Error", "Get API address failed");
    }
  }

  componentDidMount() {
    let { editAddressData } = this.props;

    if (!_.isEmpty(editAddressData)) {
      this.setState({
        addressId: editAddressData.key,
        fullname: editAddressData.fullname,
        label: editAddressData.label,
        phoneno: editAddressData.phoneno,
        long: editAddressData.geolocation.coordinates[0],
        lat: editAddressData.geolocation.coordinates[1],
        province: editAddressData.province,
        ward: editAddressData.ward,
        district: editAddressData.district,
        isActive: editAddressData.isActive ? "true" : "false",
        addressDetail: editAddressData.addressDetail,
      });

      this.formRef.current.setFieldsValue({
        addressId: editAddressData.key,
        fullname: editAddressData.fullname,
        label: editAddressData.label,
        phoneno: editAddressData.phoneno,
        long: editAddressData.geolocation.coordinates[0],
        lat: editAddressData.geolocation.coordinates[1],
        province: editAddressData.province?.ProvinceName,
        ward: editAddressData.ward?.WardName,
        district: editAddressData.district?.DistrictName,
        isActive: editAddressData.isActive ? "true" : "false",
        addressDetail: editAddressData.addressDetail,
      });
    }
  }

  onFinish = (values) => {
    let body = values;
    const { long, lat, province, ward, district, addressDetail } = this.state;
    const {
      province: provinceEdit,
      ward: wardEdit,
      district: districtEdit,
      addressDetail: addressDetailEdit,
      geolocation,
    } = this.props.editAddressData;

    if (!isEmpty(long) && !isEmpty(lat)) {
      body = {
        ...body,
        long,
        lat,
        province,
        ward,
        district,
      };
    }

    if (!_.isEmpty(this.props.editAddressData)) {
      const isValidateGeoMap =
        province.ProvinceID === provinceEdit.ProvinceID ||
        ward.WardCode === wardEdit.WardCode ||
        district.DistrictID === districtEdit.DistrictID ||
        (addressDetail === addressDetailEdit &&
          long === geolocation.coordinates[0]);

      isValidateGeoMap
        ? openNotification(
            "Warning",
            "you should update your google map address!"
          )
        : this.props.editAddress(this.state.addressId, body);
    } else {
      this.props.addAddress(body);
    }
  };

  onFinishFailed = (errorInfo) => {
    openNotification("Error", "create new address failed!");
  };

  showPosition = (position) => {
    this.setState({
      long: position.coords.longitude,
      lat: position.coords.latitude,
    });
  };

  dispatchGetProvince = () => {
    this.props.getProvince();
  };

  dispatchGetDistrict = () => {
    if (this.state.province) {
      const body = {
        province_id: this.state.province.ProvinceID,
      };
      this.props.getDistrict(body);
    }
  };

  dispatchGetWard = () => {
    if (this.state.district) {
      const body = {
        district_id: this.state.district.DistrictID,
      };
      this.props.getWard(body);
    }
  };

  handleSetState = ({ long, lat }) => {
    this.setState({
      long,
      lat,
    });
  };

  render() {
    const {
      province,
      ward,
      district,
      long,
      lat,
      addressDetail,
      phoneno,
      label,
    } = this.state;
    const { location } = this.props;
    
    return (
      <div className="edit-address">
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          ref={this.formRef}
        >
          <Row gutter={15}>
            {_.isEmpty(this.props.editAddressData) && (
              <Col lg={12} xs={24}>
                <Form.Item
                  label="Label"
                  name="label"
                  rules={[
                    { required: true, message: "Please input your label!" },
                  ]}
                >
                  <Select>
                    {selectAddressLabels?.map((label) => (
                      <Option key={label} value={label}>
                        {label}
                      </Option>
                    ))}
                    <Spin />
                  </Select>
                </Form.Item>
              </Col>
            )}
            <Col lg={12} xs={24}>
              <Form.Item
                label="Phone Number"
                name="phoneno"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone Number!",
                  },
                ]}
                initialValue={phoneno}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                label="Province"
                name="province"
                rules={[
                  {
                    required: true,
                    message: "Please select your province!",
                  },
                ]}
              >
                <Select
                  value={province ? province.ProvinceName : "Province"}
                  onClick={this.dispatchGetProvince}
                  loading={location.loading}
                  onChange={(data) =>
                    this.setState({ province: location.dataProvince[data] })
                  }
                >
                  {location.dataProvince?.map((province, index) => (
                    <Option key={index}>{province.ProvinceName}</Option>
                  ))}
                  <Spin />
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                label="District"
                name="district"
                rules={[
                  { required: true, message: "Please select your district!" },
                ]}
              >
                <Select
                  value={district ? district.DistrictName : "District"}
                  onClick={this.dispatchGetDistrict}
                  disabled={!province}
                  loading={location.loading}
                  onChange={(data) =>
                    this.setState({ district: location.dataDistrict[data] })
                  }
                >
                  {location.dataDistrict?.map((district, index) => (
                    <Option key={index}>{district.DistrictName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                label="Ward"
                name="ward"
                rules={[
                  { required: true, message: "Please select your ward!" },
                ]}
              >
                <Select
                  value={ward ? ward.WardName : "Ward"}
                  onClick={this.dispatchGetWard}
                  disabled={!district}
                  loading={location.loading}
                  onChange={(data) =>
                    this.setState({ ward: location.dataWard[data] })
                  }
                >
                  {location.dataWard?.map((ward, index) => (
                    <Option key={index}>{ward.WardName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                label="Address detail"
                name="addressDetail"
                rules={[
                  { required: true, message: "Please input your description!" },
                ]}
                initialValue={addressDetail}
              >
                <Input disabled={!ward} />
              </Form.Item>
            </Col>
            <Col lg={20} xs={24}>
              <Form.Item label="Map Location">
                <Collapse defaultActiveKey={[addressDetail ? "1" : ""]}>
                  <Panel header="Map Location" key="1" showArrow>
                    <LocationMap
                      handleSetState={this.handleSetState}
                      lngLat={{ long, lat }}
                    />
                  </Panel>
                </Collapse>
              </Form.Item>
            </Col>
            <Col lg={24} xs={24}>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button
                  type="secondary"
                  onClick={() => {
                    this.props.changeShow("table");
                  }}
                  style={{ marginLeft: 10 }}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {/* )} */}
      </div>
    );
  }
}

export default connect((state) => state, actions)(AddressForm);
