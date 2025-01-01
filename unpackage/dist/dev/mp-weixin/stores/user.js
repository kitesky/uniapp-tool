"use strict";
const common_vendor = require("../common/vendor.js");
const utils_request = require("../utils/request.js");
const userStore = common_vendor.defineStore("user", {
  state: () => {
    return {
      count: 11,
      token: ""
    };
  },
  getters: {
    getToken() {
      return common_vendor.index.getStorageSync("token");
    },
    user() {
      return common_vendor.index.getStorageSync("user");
    }
  },
  actions: {
    increment() {
      this.count++;
    },
    // 更新用户信息
    userSetting(params) {
      return new Promise((resolve, reject) => {
        utils_request.request.send({
          url: "/user/setting",
          method: "POST",
          data: params,
          success: (res) => {
            resolve(res.data);
          },
          fail: (error) => {
            reject(error);
          }
        });
      });
    },
    // 微信小程序登录
    wxLogin(params) {
      return new Promise((resolve, reject) => {
        utils_request.request.send({
          url: "/wechat/login",
          method: "POST",
          data: params,
          success: (res) => {
            common_vendor.index.setStorageSync("token", res.data.data.access_token);
            resolve(res.data);
          },
          fail: (error) => {
            reject(error);
          }
        });
      });
    },
    // 获取用户信息
    userInfo(params) {
      return new Promise((resolve, reject) => {
        utils_request.request.send({
          url: "/user/info",
          method: "GET",
          data: params,
          success: (res) => {
            common_vendor.index.setStorageSync("user", res.data.data);
            resolve(res.data);
          },
          fail: (error) => {
            reject(error);
          }
        });
      });
    },
    // 退出登录
    logout() {
      try {
        common_vendor.index.removeStorageSync("token");
        common_vendor.index.removeStorageSync("user");
        common_vendor.index.removeStorageSync("searchHistoryKeywords");
        common_vendor.index.clearStorageSync();
        common_vendor.index.reLaunch({
          url: "/pages/auth/login"
        });
      } catch (e) {
        common_vendor.index.__f__("log", "at stores/user.js:84", e);
      }
    }
  }
});
exports.userStore = userStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/user.js.map
