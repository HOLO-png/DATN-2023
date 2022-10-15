export const HOUSEWIFE_BASE_URL = "http://157.245.106.101";
export const BASE_URL =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? "http://157.245.106.101:3001"
    : process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const USER_AUTH_BASE_URL = `${BASE_URL}/api/user-auth`;
export const SUPER_AUTH_BASE_URL = `${BASE_URL}/api/superadmin`;
export const USER_BASE_URL = `${BASE_URL}/api/user`;
export const CART_BASE_URL = `${BASE_URL}/api/cart-wishlist`;
export const ORDER_BASE_URL = `${BASE_URL}/api/order`;
export const PRODUCT_BASE_URL = `${BASE_URL}/api/product`;
export const REVIEW_BASE_URL = `${BASE_URL}/api/review-qna`;
export const WISHLIST_BASE_URL = `${BASE_URL}/api/cart-wishlist`;
export const IMAGE_BASE_URL = `${BASE_URL}/uploads`;

export const PROVINCE_API =
  "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province";

export const WARD_API =
  "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward";

export const DISTRICT_API =
  "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district";

export const SERVICE_PACKAGE_API =
  "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services";

export const SERVICE_CHARGE_API =
  "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";

export const LEAD_TIME_API =
  "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime";

export const PHONE_NUMBER_REGEX = /^(0)([0-9]{9})$/;

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const metaMaskLink =
  "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";
