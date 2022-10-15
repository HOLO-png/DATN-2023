const express = require("express");

const {
  signup,
  signin,
  emailverify,
  socialLogin,
  resetPassword,
  forgotPassword,
  refreshToken,
  logout,
  walletLogin,
} = require("../controllers/user_auth");

const {
  validateSignUp,
  passwordResetValidator,
  validateSocialLogin,
  validateWalletLogin,
} = require("../middleware/validator");

const router = express.Router();

router.post("/signup", validateSignUp, signup);
router.post("/signin", signin);
router.post("/email-verify", emailverify);
router.post("/social-login", validateSocialLogin, socialLogin);
router.post("/wallet-login", validateWalletLogin, walletLogin);
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);
router.post("/refresh-token", refreshToken);

module.exports = router;
