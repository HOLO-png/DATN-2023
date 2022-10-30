import React, { Component } from "react";
import { Button, Input } from "antd";
import {
  PhoneOutlined,
  EnvironmentOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { getDiscountedPrice, openNotification } from "../../../utils/common";
import Link from "next/link";
import { STORE_CHECKOUT_ITEMS } from "../../../redux/types";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import { withRouter } from "next/router";
import initialize from "../../../utils/initialize";
import EditAddressModal from "../../Components/EditAddressModal";
import { isEmpty } from "lodash";

const shortid = require("shortid");

class OrderSummary extends Component {
  state = {
    userResp: [],
    activeLocation: {},
    showEditAddressModal: false,
    loading: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps.userResp !== prevState.userResp && nextProps.userResp.location);

    if (nextProps.userResp !== prevState.userResp && nextProps.userResp) {
      let activeLocation = {};
      nextProps.userResp.location.map((loc) => {
        if (loc.isActive) {
          activeLocation = loc;
        }
      });
      return {
        userResp: nextProps.userResp,
        activeLocation,
      };
    }
    return null;
  }

  handleCancel = (e) => {
    this.setState({
      showEditAddressModal: false,
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.orderResp !== prevProps.orderResp && this.props.orderResp) {
      this.setState({
        loading: false,
      });
    }
  }

  placeOrderItems = () => {
    let { checkoutItems, userResp } = this.props;

    let products = checkoutItems.carts.map((item) => {
      return {
        p_slug: item.product.slug,
        quantity: checkoutItems.totalQty || item.quantity,
      };
    });

    let activeAddress = {};
    userResp.location.map((loc) => {
      if (loc.isActive) {
        activeAddress = loc;
      }
    });

    let body = {
      products,
      shipto: {
        province: activeAddress.province.ProvinceName,
        ward: activeAddress.ward.WardName,
        district: activeAddress.district.DistrictName,
        addressDetail: activeAddress.addressDetail,
        lat: activeAddress.geolocation.coordinates[0],
        long: activeAddress.geolocation.coordinates[1],
        phoneno: activeAddress.phoneno,
      },
      shippingCharge: this.props.shippingCharge ? this.props.shippingCharge : 0,
      orderID: shortid.generate(),
      method: "Cash on Delivery",
    };
    this.setState(
      {
        loading: true,
      },
      () => {
        this.props.placeOrder(body);
      }
    );
  };

  render() {
    let { activeLocation, userResp } = this.state;

    let totalCheckoutItems = 0;
    if (!this.props.checkoutItems?.totalAmount) {
      this.props.checkoutItems?.map((items) => {
        totalCheckoutItems +=
          items.quantity *
          getDiscountedPrice(
            items.product.price.$numberDecimal,
            items.product.discountRate
          );
      });
    } else {
      totalCheckoutItems = this.props.checkoutItems.totalAmount;
    }

    let deliveryCharges =
      this.props.showShippingAddress === "showDisplay"
        ? this.props.shippingCharge
        : this.props.shippingCharge && this.props.checkoutItems.length
        ? this.props.shippingCharge
        : 0;

    return (
      <div className="order-shipping">
        <EditAddressModal
          title="Quick View Product"
          visible={this.state.showEditAddressModal}
          onCancel={this.handleCancel}
          data={userResp}
        />
        <div className={"shipping-details " + this.props.showShippingAddress}>
          <div className="os-title">Shipping & Billing</div>
          <div className="ti-pr">
            <div className="ti">
              <div className="name-add">
                <EnvironmentOutlined />
                <div className="name">
                  <div>{userResp?.name}</div>
                  <div className="address">
                    {activeLocation?.province.ProvinceName}
                    {activeLocation?.province.ProvinceName ? "," : ""}{" "}
                    {activeLocation?.addressDetail}
                    {activeLocation?.addressDetail ? "," : ""} <br />
                    {activeLocation?.district.DistrictName}
                    {activeLocation?.district.DistrictName ? "," : ""}{" "}
                    {activeLocation?.ward.WardName}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="pr edit"
              onClick={() => this.setState({ showEditAddressModal: true })}
            >
              EDIT
            </div>
          </div>
          <div className="ti-pr">
            <div className="ti">
              {activeLocation?.phoneno && (
                <div className="name-add">
                  <PhoneOutlined />
                  <div className="name">{activeLocation?.phoneno}</div>
                </div>
              )}
            </div>
            {/* <div className="pr edit">EDIT</div> */}
          </div>
          <div className="ti-pr">
            <div className="ti">
              <div className="name-add">
                <MailOutlined />
                <div className="name">{userResp?.email}</div>
              </div>
            </div>
            {/* <div className="pr edit">EDIT</div> */}
          </div>
        </div>
        <div className="order-summary">
          <div className="os-title">Order Summary</div>
          <div className="price-details">
            <div className="price-title">PRICE DETAILS</div>
            <div className="price-cover">
              <div className="ti-pr">
                <div className="ti">Cart Total</div>
                <div className="pr">Rs {totalCheckoutItems.toFixed(2)}</div>
              </div>
              {/* <div className="ti-pr">
                <div className="ti">Cart Discount</div>
                <div className="pr">- 0</div>
              </div> */}
              {/* <div className="ti-pr">
                <div className="ti">Tax</div>
                <div className="pr">$4</div>
              </div> */}
              <div className="ti-pr">
                <div className="ti">Delivery Charges</div>
                <div className="pr">Rs {deliveryCharges}</div>
              </div>
            </div>
            {/* <div className="cupon-voucher">
              <Input placeholder="Enter Voucher Code" />
              <Button className="btn">APPLY</Button>
            </div> */}
            <div className="total-price">
              <div className="ti-pr">
                <div className="ti">Total</div>
                <div className="pr">
                  Rs {(totalCheckoutItems + deliveryCharges).toFixed(2)}
                </div>
              </div>
            </div>

            {this.props.orderTxt === "PLACE ORDER" ? (
              <div className="order-procced">
                <Button
                  className={"btn " + this.props.diableOrderBtn}
                  onClick={this.placeOrderItems}
                  disabled={this.state.loading}
                >
                  {this.props.orderTxt}
                </Button>
              </div>
            ) : (
              <div
                className="order-procced"
                onClick={() =>
                  this.props.saveCheckoutItems({
                    carts: this.props.checkoutItems,
                    totalCount: this.props.checkoutItems.length,
                    totalAmount: totalCheckoutItems,
                  })
                }
              >
                <Link href="/checkout">
                  <a>
                    <Button
                      className={"btn " + this.props.diableOrderBtn}
                      disabled={
                        this.props.diableOrderBtn === "disableBtn" ||
                        isEmpty(this.props.userResp?.location)
                          ? true
                          : false
                      }
                    >
                      {this.props.orderTxt}
                    </Button>
                  </a>
                </Link>

                {isEmpty(this.props.userResp?.location) && (
                  <div className="checkout-note">
                    Note: Please add address in your profile before proceeding
                    further.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = (state) => ({
  shippingCharge: state.order.getShippingChargeResp,
  orderResp: state.order.placeOrderResp,
  userResp: state.user.userProfile,
});

const mapDispatchToProps = (dispatch) => ({
  saveCheckoutItems: (checkoutItems) => {
    dispatch({ type: STORE_CHECKOUT_ITEMS, payload: checkoutItems });
  },
  placeOrder: (body) => {
    dispatch(actions.placeOrder(body));
  },
});

export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(withRouter(OrderSummary));
