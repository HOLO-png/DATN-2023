import React, { useCallback, useRef, useState } from "react";
import { EMAIL_PATTERN } from "constants/AppConstant";
import {
  BaseFormInputs,
  FormInputEnum,
  FormProvider,
  UseFormProvider,
  PrimaryButton,
  PopupBase,
} from "sdk";
import styles from "styles/Login.module.scss";
import { Box } from "@mui/material";
import HouseLogo from "public/images/logo/houseWife.png";
import Social from "components/Login/Social";
import { useForm } from "react-hook-form";
interface SignInInputs extends BaseFormInputs {
  email: string;
  password: string;
}

interface SignUpInputs extends BaseFormInputs {
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
}

const signInInputs = [
  {
    name: "email",
    type: FormInputEnum.INPUT,
    label: "Email",
    required: { value: true, message: "Email là bắc buộc" },
    pattern: { value: EMAIL_PATTERN, message: "Email không phù hợp" },
    placeholder: "Nhập tên đăng nhập",
    className: styles.signin__input,
  },
  {
    name: "password",
    type: FormInputEnum.PASSWORD,
    label: "Mật khẩu",
    required: { value: true, message: "Mật khẩu là bắc buộc" },
    placeholder: "Nhập mật khẩu",
    isShowPassword: true,
    className: styles.signin__input,
  },
];

function Login() {
  const [openRegisterPopup, setOpenRegisterPopup] = useState(false);
  const [signUpInputs, setSignUpInputs] = useState([]);
  const signInFormRef = useRef<UseFormProvider<SignInInputs>>(null);
  const signUpFormRef = useRef<UseFormProvider<SignUpInputs>>(null);

  const onSignInClick = () => {
    signInFormRef.current?.handleSubmit((data: SignInInputs) => {
      console.log(data);
    })();
  };

  const onSignUpClick = () => {
    signUpFormRef.current?.handleSubmit((data: SignUpInputs) => {
      console.log(data);
    })();
  };

  const handleWatchPassword = (form) => {
    setSignUpInputs([
      {
        name: "username",
        type: FormInputEnum.INPUT,
        required: { value: true, message: "Tên của bạn là bắc buộc" },
        placeholder: "Họ và tên",
        className: styles.signup__input,
      },
      {
        name: "phoneNumber",
        type: FormInputEnum.NUMBER,
        required: { value: true, message: "Số điện thoại là bắc buộc" },
        placeholder: "Số điện thoại",
        className: styles.signup__input,
      },
      {
        name: "email",
        type: FormInputEnum.INPUT,
        required: { value: true, message: "Email là bắc buộc" },
        pattern: { value: EMAIL_PATTERN, message: "Email không phù hợp" },
        placeholder: "Nhập tên Email",
        className: styles.signup__input,
      },
      {
        name: "password",
        type: FormInputEnum.PASSWORD,
        required: { value: true, message: "Mật khẩu là bắc buộc" },
        placeholder: "Nhập mật khẩu",
        isShowPassword: true,
        className: styles.signup__input,
      },
      {
        name: "confirmPassword",
        type: FormInputEnum.PASSWORD,
        required: { value: true, message: "Xác nhận lại mật khẩu của bạn" },
        validate: (val: string) => {
          if (form.watch("password") != val) {
            return "Mật khẩu của bạn không giống nhau";
          }
        },
        placeholder: "Xác nhận mật khẩu",
        isShowPassword: false,
        className: styles.signup__input,
      },
    ])
  }

  return (
    <div className={styles.login__container}>
      <div className={styles.login__welcome}>
        <img src={HouseLogo} />
        <p className="mt-18">Housewife helps you connect and share</p>
        <p>with everyone in your life</p>
      </div>
      <div className={styles.login__formContainer}>
        <div className={styles.login__form}>
          <Box className="login-form">
            <FormProvider
              ref={signInFormRef}
              mode="onTouched"
              inputs={signInInputs}
            />
            <PrimaryButton
              className={styles.login__submitBtn}
              onClick={onSignInClick}
            >
              Login
            </PrimaryButton>
          </Box>
          <span className={styles.login__forgotPassword}>Forgot password?</span>
          <PrimaryButton
            className={styles.login__signup}
            onClick={() => setOpenRegisterPopup(true)}
          >
            Create new account
          </PrimaryButton>
          <PopupBase
            open={openRegisterPopup}
            onClose={(bool) => setOpenRegisterPopup(bool)}
            classes={{ paper: styles.signup__box }}
            onClick={onSignUpClick}
          >
            <div className={styles.signup__container}>
              <div className={styles.signup__title}>Sign Up</div>
            </div>
            <FormProvider
              ref={signUpFormRef}
              mode="onTouched"
              inputs={signUpInputs}
              className={styles.signup__form}
              formProvider={handleWatchPassword}
            />
          </PopupBase>
        </div>
        <div className={styles.login__social}>
          <Social />
        </div>
      </div>
    </div>
  );
}

export default Login;
