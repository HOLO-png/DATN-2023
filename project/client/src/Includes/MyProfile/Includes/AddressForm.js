import React, { Component } from "react";
import { Form, Input, Button, Row, Col, Select } from "antd";
import _ from "lodash";
import { connect } from "react-redux";
import actions from "../../../../redux/actions";
import { openNotification } from "../../../../utils/common";
import LocationMap from "../../../Components/LocationMap";

const layout = {
  labelCol: { lg: 6, xs: 24 },
  wrapperCol: { lg: 18, xs: 24 },
};
const tailLayout = {
  wrapperCol: { span: 16 },
};

// const form = Form.useForm();

class AddressForm extends Component {
  formRef = React.createRef();
  state = {
    addressId: "",
    fullname: "",
    label: "",
    phoneno: "",
    long: "",
    lat: "",
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
        phoneno: editAddressData.phoneNo,
        long: editAddressData.geoLocation[0],
        lat: editAddressData.geoLocation[1],
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
        phoneno: editAddressData.phoneNo,
        long: editAddressData.geoLocation[0],
        lat: editAddressData.geoLocation[1],
        province: editAddressData.province,
        ward: editAddressData.ward,
        district: editAddressData.district,
        isActive: editAddressData.isActive ? "true" : "false",
        addressDetail: editAddressData.addressDetail,
      });
    }
  }

  onFinish = (values) => {
    let body = values;
    if (this.state.long && this.state.lat) {
      body = {
        ...body,
        long: this.state.long,
        lat: this.state.lat,
      };
    }
    console.log(body);
    // if (!_.isEmpty(this.props.editAddressData)) {
    //   this.props.editAddress(this.state.addressId, body);
    // } else {
    //   this.props.addAddress(body);
    // }
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
        provinceId: this.state.province.ProvinceID,
      };
      this.props.getDistrict(body);
    }
  };

  dispatchGetWard = () => {
    if (this.state.district) {
      console.log(this.state.district);
      const body = {
        district_id: this.state.district.DistrictID,
      };
      this.props.getWard(body);
    }
  };

  render() {
    const { province, ward, district } = this.state;
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
                  initialValue={this.state.label}
                >
                  <Input />
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
                initialValue={this.state.phoneno}
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
                initialValue={this.state.province}
              >
                <Select
                  value={province ? province.ProvinceName : "Province"}
                  onClick={this.dispatchGetProvince}
                  onChange={(data) =>
                    this.setState({ province: location.dataProvince[data] })
                  }
                >
                  {location.dataProvince?.map((province, index) => (
                    <Option key={index}>{province.ProvinceName}</Option>
                  ))}
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
                  onChange={(data) => this.setState({ ward: data })}
                >
                  {location.dataWard?.map((ward, index) => (
                    <Option key={index}>{ward.WardName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input your description!" },
                ]}
                initialValue={this.state.city}
              >
                <Input disabled={!ward} />
              </Form.Item>
            </Col>

            <Col lg={20} xs={24}>
              <Form.Item label="Map Location">
                <LocationMap setState={() => this.setState} />
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
