/* eslint-disable no-useless-escape */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  forgotPasswordCall,
} from "../../../Store/Reducer/authReducer";
import { setLoadingAction } from "../../../Store/Reducer/loadingReducer";
import { Button, Form, Input } from "antd";

ForgotPassword.propTypes = {
  onSubmit: PropTypes.func,
};
ForgotPassword.defaultProps = {
  onSubmit: null,
};

function ForgotPassword(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const auth = useSelector(authSelector);

  const handleSubmit = (val) => {
    dispatch(forgotPasswordCall(val.email));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (auth.isForgetPassword) {
      history.push("/verify-email");
      setTimeout(() => {
        dispatch(setLoadingAction(false));
      }, 500);
    }
  }, [dispatch, history, auth.isForgetPassword]);

  return (
    <div className="form">
      <div className="form__forgot-password">
        <div className="form__container">
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
          >
            <h1 className="form__title">Xác nhận tài khoản</h1>
            <div className="form__social-container"></div>
            <span>vui lòng nhập email của bạn vào để tìm tài khoản</span>
            <Form.Item
              label="Nhập Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập Email của bạn!" },
                {
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "Email không hợp lệ!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Link to="/buyer/signin">
              <Button type="button" className="btn-outline-light">
                Cancel
              </Button>
            </Link>
            <Form.Item className="btn-action">
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

ForgotPassword.propTypes = {};

export default ForgotPassword;
