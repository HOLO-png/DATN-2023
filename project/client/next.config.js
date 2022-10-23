// const withSass = require("@zeit/next-sass");
// const sassConfig = withSass({
//   /* config options here */
// });

const dotenv = require("dotenv-webpack");

module.exports = {
  webpack: (config) => {
    config.plugins.push(new dotenv({ silent: true }));
    return config;
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_SERVER_BASE_URL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
    NEXT_PUBLIC_GHN_TOKEN: process.env.NEXT_PUBLIC_GHN_TOKEN,
    NEXT_PUBLIC_SHOP_ID: process.env.NEXT_PUBLIC_SHOP_ID,
    NEXT_PUBLIC_FACEBOOK_LOGIN_ID: process.env.NEXT_PUBLIC_FACEBOOK_LOGIN_ID,
    NEXT_PUBLIC_FACEBOOK_LOGIN_KEY: process.env.NEXT_PUBLIC_FACEBOOK_LOGIN_KEY,
    NEXT_PUBLIC_IMAGE_BASE_URL: process.env.NEXT_PUBLIC_IMAGE_BASE_URL,
    NEXT_PUBLIC_JWT_SIGNIN_KEY: process.env.NEXT_PUBLIC_JWT_SIGNIN_KEY,
    NEXT_PUBLIC_JWT_EMAIL_VERIFICATION_KEY: process.env.NEXT_PUBLIC_JWT_EMAIL_VERIFICATION_KEY,
    NEXT_PUBLIC_GOOGLE_MAP_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
  },
  serverless: true,
	reactStrictMode: true,
};
