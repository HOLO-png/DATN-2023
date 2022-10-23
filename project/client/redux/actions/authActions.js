import Router from "next/router";
import {
  AUTHENTICATE,
  DEAUTHENTICATE,
  AUTHENTICATE_START,
  GLOBAL_ERROR,
  REGISTER_FINISH,
  REGISTER_START,
  RESET_PASSWORD,
  AUTHENTICATE_FINISH,
  VERiFY_EMAIL_FINISH,
  VERiFY_EMAIL_ERROR,
  VERiFY_EMAIL_START,
  AUTHENTICATE_ERROR,
} from "../types";
import { setCookie, removeCookie } from "../../utils/cookie";
import { isTokenExpired, openNotification } from "../../utils/common";
import { AuthService } from "../services/authService";
import { message } from "antd";
import { redirectURL } from "../../utils/redirectURL";

//register the user
const register = (body) => {
  return async (dispatch) => {
    await dispatch({ type: REGISTER_START });
    const authService = new AuthService();
    const response = await authService.registerUser(body);
    await dispatch({ type: REGISTER_FINISH });
    if (response.isSuccess) {
      openNotification(
        "Success",
        "Thank for signing up! We just need you to verify your email address to complete"
      );
    } else if (!response.isSuccess) {
      openNotification("Error", response.errorMessage);
      dispatch({ type: GLOBAL_ERROR, payload: response.errorMessage });
    }
  };
};

// reset password
const sendResendPasswordLink = (body, data, setData) => {
  return async (dispatch) => {
    setData({ ...data, loading: true, success: false });

    const authService = new AuthService();
    const response = await authService.sendResendPasswordLink(body);

    if (response.isSuccess) {
      setData({ ...data, loading: false, success: true, data: response.data });
    } else if (!response.isSuccess) {
      setData({ ...data, loading: false, success: false });
      dispatch({ type: GLOBAL_ERROR, payload: response.errorMessage });
    }
  };
};

// reset password
const resetMyPassword = (body, data, setData) => {
  return async (dispatch) => {
    setData({ ...data, loading: true, success: false });

    const authService = new AuthService();
    const response = await authService.resetMyPassword(body);

    if (response.isSuccess) {
      setData({ ...data, loading: true, success: true, data: response.data });
      openNotification("Success", "Password reset successfully");

      Router.push("/login");
    } else if (!response.isSuccess) {
      setData({ ...data, loading: false, success: false });
      dispatch({ type: GLOBAL_ERROR, payload: response.errorMessage });
    }
  };
};

// gets token from the api and stores it in the redux store and in cookie
const authenticate = (body, type, redirectUrl) => {
  return async (dispatch) => {
    await dispatch({ type: AUTHENTICATE_START });

    const authService = new AuthService();
    const response = await authService.loginUser(body);

    await dispatch({ type: AUTHENTICATE_FINISH });
    if (response.isSuccess) {
      setCookie("token", response.data.accessToken);
      setCookie("refresh-token", response.data.refreshToken);
      dispatch({ type: AUTHENTICATE, payload: response.data.accessToken });

      const redirectUrl = redirectURL();
      Router.push(redirectUrl);
    } else if (!response.isSuccess) {
      openNotification("Error", response.errorMessage);
      dispatch({ type: AUTHENTICATE_ERROR, payload: response.errorMessage });
    }
  };
};

// gets token from the api and stores it in the redux store and in cookie
const authenticate3rdSoftLogin = (body) => {
  return async (dispatch) => {
    await dispatch({ type: AUTHENTICATE_START });
    const authService = new AuthService();
    let response = null;

    if (body.loginDomain === "cryptoWallet") {
      response = await authService.loginUserWalletLogin(body);
    } else {
      response = await authService.loginUserSocialLogin(body);
    }
    await dispatch({ type: AUTHENTICATE_FINISH });

    if (response.isSuccess) {
      setCookie("token", response.data.accessToken);
      setCookie("refresh-token", response.data.refreshToken);
      dispatch({ type: AUTHENTICATE, payload: response.data.accessToken });

      const redirectUrl = redirectURL();
      Router.push(redirectUrl);
    } else if (!response.isSuccess) {
      message.error("Login with social network failed!");
      dispatch({ type: AUTHENTICATE_ERROR, payload: response.errorMessage });
    }
  };
};

// gets the token from the cookie and saves it in the store
const reauthenticate = (token, refreshToken, ctx) => {
  if (!token || !refreshToken) {
    return (dispatch) => {
      dispatch(deauthenticate("/", ctx));
      removeCookie("token");
      dispatch({ type: DEAUTHENTICATE });
    };
  }
  // if (isTokenExpired(token)) {
  //   return async (dispatch) => {
  //     if (!refreshToken) {
  //       removeCookie("token");
  //       dispatch({ type: DEAUTHENTICATE });
  //     } else {
  //       const body = JSON.stringify({
  //         refreshToken,
  //       });
  //       const resp = await fetch(
  //         `http://localhost:3001/api/user-auth/refresh-token`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "content-type": "application/json",
  //             "x-auth-token": token,
  //           },
  //           body,
  //         }
  //       ).catch((err) => {
  //         console.log("eta-----")
  //         removeCookie("token");
  //         dispatch({ type: DEAUTHENTICATE });
  //       });
  //       if (resp.status === 200) {
  //         const data = await resp.json();
  //         setCookie("token", data.accessToken);
  //         setCookie("refresh-token", data.refreshToken);
  //         dispatch({ type: AUTHENTICATE, payload: data.accessToken });
  //         ctx?.store.dispatch({
  //           type: AUTHENTICATE,
  //           payload: data.accessToken,
  //         });
  //       }
  //     }
  //   };
  // }
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, payload: token });
  };
};

// removing the token
export const deauthenticate = (route = "/login", ctx) => {
  return (dispatch) => {
    removeCookie("token");
    removeCookie("refresh-token");
    if (ctx?.res) {
      ctx.res.writeHead(302, {
        Location: route,
      });
      ctx.res.end();
    } else {
      Router.push(route);
    }
    dispatch({ type: DEAUTHENTICATE });
  };
};

// verify email to login
export const activateEmail = (token) => {
  return async (dispatch) => {
    dispatch({ type: VERiFY_EMAIL_START });
    if (!token) {
      dispatch({ type: VERiFY_EMAIL_ERROR });
    } else {
      const authService = new AuthService();
      const response = await authService.activateEmail(token);
      if (response.isSuccess) {
        dispatch({ type: VERiFY_EMAIL_FINISH });
        Router.push("/login");
      } else if (response.errorMessage) {
        dispatch({ type: VERiFY_EMAIL_ERROR });
      }
    }
  };
};

export default {
  authenticate,
  reauthenticate,
  deauthenticate,
  register,
  authenticate3rdSoftLogin,
  sendResendPasswordLink,
  resetMyPassword,
  activateEmail,
};
