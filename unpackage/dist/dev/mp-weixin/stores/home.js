"use strict";
const common_vendor = require("../common/vendor.js");
const utils_request = require("../utils/request.js");
const homeStore = common_vendor.defineStore("home", {
  state: () => {
    return {};
  },
  getters: {},
  actions: {
    increment() {
      this.count++;
    },
    // 更新用户信息
    homeData(params) {
      return new Promise((resolve, reject) => {
        utils_request.request.send({
          url: "/home",
          method: "GET",
          success: (res) => {
            resolve(res.data);
          },
          fail: (error) => {
            reject(error);
          }
        });
      });
    }
  }
});
exports.homeStore = homeStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/home.js.map
