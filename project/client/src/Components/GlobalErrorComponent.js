import React, { Component } from "react";
import { message, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import actions from "../../redux/actions";

class GlobalErrorComponent extends Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.store.getState().globalError !== prevProps.store.getState().globalError &&
      this.props.store.getState().globalError.hasError
    ) {
      this.props.store.getState().globalError.hasError &&
        this.openNotification(this.props.store.getState().globalError);
    }
  }

  openNotification = (globalError) => {
    notification.open({
      message: "Notification Title",
      description: globalError.errorMessage,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
    message.error(globalError.errorMessage);
  };

  render() {
    return <></>;
  }
}

export default connect((state) => state, actions)(GlobalErrorComponent);
