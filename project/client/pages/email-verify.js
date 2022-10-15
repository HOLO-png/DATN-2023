import { withRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../src/Components/Layout";
import { Button, Image, Typography } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";
import PropTypes from "prop-types";

const verifySuccess = (
  <div className="email-verify-wrapper">
    <Image
      width={500}
      preview={false}
      src="https://img.freepik.com/premium-vector/new-message-3d-icon-purple-open-mail-envelope-paper-with-tick-3d-realistic-vector-design-element_363543-612.jpg?w=740"
      placeholder={
        <Image
          preview={false}
          src="https://img.freepik.com/premium-vector/new-message-3d-icon-purple-open-mail-envelope-paper-with-tick-3d-realistic-vector-design-element_363543-612.jpg?w=740"
          width={200}
          wrapperStyle={{ filter: "blur(8px)" }}
        />
      }
    />
    <Typography.Title level={2}>Welcome to HouseWife</Typography.Title>
    <Typography.Title level={5}>
      Please logout and login with the correct email address and retry
    </Typography.Title>
  </div>
);

const verifyError = (
  <div className="email-verify-wrapper">
    <Image
      width={500}
      preview={false}
      src="https://img.freepik.com/premium-vector/new-message-3d-icon-purple-mail-envelope-paper-red-button-with-cross-mark-vector-element_363543-611.jpg?w=740"
      placeholder={
        <Image
          preview={false}
          src="https://img.freepik.com/premium-vector/new-message-3d-icon-purple-mail-envelope-paper-red-button-with-cross-mark-vector-element_363543-611.jpg?w=740"
          width={200}
          wrapperStyle={{ filter: "blur(8px)" }}
        />
      }
    />
    <Typography.Title level={2}>Verify email failed!</Typography.Title>
    <Typography.Title level={5}>
      Looks like your email address already exists or has expired, please check
      again
    </Typography.Title>
    <Button>
      <Link href="/register">Please to register</Link>
    </Button>
  </div>
);

function emailVerify(props) {
  const dispatch = useDispatch();
  let { token } = props.router.query;
  const auth = useSelector((state) => state.authentication);

  useEffect(() => {
      dispatch(actions.activateEmail(token));
  }, [token, dispatch]);

  if (auth.loading) return <></>;

  return <Layout>{auth.hasError ? verifyError : verifySuccess}</Layout>;
}

emailVerify.propTypes = {
  router: PropTypes.any,
};

export default withRouter(emailVerify);
