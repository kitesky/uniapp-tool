"use strict";
const common_vendor = require("../common/vendor.js");
const success = (title) => {
  common_vendor.index.showToast({
    title,
    icon: "none",
    duration: 2e3
  });
};
const error = (title) => {
  common_vendor.index.showToast({
    title,
    icon: "none",
    duration: 2e3
  });
};
const warning = (title) => {
  common_vendor.index.showToast({
    title,
    icon: "none",
    duration: 2e3
  });
};
const loading = (title) => {
  common_vendor.index.showLoading({
    title
  });
};
const hideLoading = () => {
  common_vendor.index.hideLoading();
};
const toast = {
  success,
  error,
  warning,
  loading,
  hideLoading
};
exports.toast = toast;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/toast.js.map
