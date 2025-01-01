"use strict";
const common_vendor = require("../common/vendor.js");
const utils_config = require("./config.js");
const utils_toast = require("./toast.js");
const buildHeader = (method, data) => {
  common_vendor.index.__f__("log", "at utils/request.js:6", "buildHeader params ->", method, typeof data);
  var version = "1.0";
  var clientID = "9f823d76-5a8f-4ca3-94bc-c80febdd6501";
  var clientSecret = "96a9c3b06d93402a743605eedfbe72106fe1e967f1ec5f5bed7e8da90a033f1a";
  var nonce = common_vendor.CryptoJS.MD5(parseInt(Math.random() * 32769 + 32768, 10).toString()).toString();
  var timestamp = (Date.parse(/* @__PURE__ */ new Date()) / 1e3).toString();
  var body = "";
  if (method == "POST") {
    if (typeof data == "object") {
      data = JSON.stringify(data);
    }
    body = common_vendor.CryptoJS.enc.Base64.stringify(common_vendor.CryptoJS.enc.Utf8.parse(data));
  }
  var plainText = clientID + nonce + timestamp + version + body;
  var sign = common_vendor.CryptoJS.HmacSHA256(plainText, clientSecret).toString();
  common_vendor.index.__f__("log", "at utils/request.js:23", "plainText:" + plainText, "sign:" + sign);
  var headers = {
    "Client-ID": clientID,
    "Nonce": nonce,
    "Timestamp": timestamp,
    "Signature": sign,
    "Version": version
  };
  var token = common_vendor.index.getStorageSync("token");
  if (token) {
    headers["Token"] = token;
  }
  return headers;
};
const access = (response) => {
  switch (response.statusCode) {
    case 200:
      if (typeof response.data == "object" && response.data.code != 200) {
        utils_toast.toast.error(response.data.message);
        if (response.data.code == 401) {
          common_vendor.index.navigateTo({ url: "/pages/auth/login" });
        }
      }
      break;
    case 400:
      utils_toast.toast.error("400 Bad Request");
      break;
    case 401:
      utils_toast.toast.error("401 Unauthorized");
      break;
    case 404:
      utils_toast.toast.error("404 Not Found");
      break;
    case 500:
      utils_toast.toast.error("500 Internal Server Error");
      break;
  }
};
common_vendor.index.addInterceptor("request", {
  invoke(args) {
    args.url = utils_config.config.API_URL + args.url;
    args.timeout = 15e4;
    args.header = buildHeader(args.method, args.data);
  },
  success(response) {
    common_vendor.index.__f__("log", "at utils/request.js:85", "interceptor-success", response);
    access(response);
  },
  fail(err) {
    common_vendor.index.__f__("log", "at utils/request.js:89", "interceptor-fail", err);
    access(err);
  },
  complete(response) {
  }
});
const request = {
  send(options) {
    return common_vendor.index.request(options);
  }
};
exports.request = request;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
