"use strict";
const common_vendor = require("../common/vendor.js");
const isLogin = () => {
  if (common_vendor.index.getStorageSync("token")) {
    return true;
  }
  return false;
};
const check = () => {
  common_vendor.index.__f__("log", "at utils/auth.js:18", "auth check!");
  if (!isLogin()) {
    common_vendor.index.reLaunch({ url: "/pages/auth/login" });
  }
};
const auth = {
  isLogin,
  check
};
exports.auth = auth;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/auth.js.map
