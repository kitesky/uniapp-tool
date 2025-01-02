"use strict";
const common_vendor = require("../common/vendor.js");
const utils_request = require("../utils/request.js");
const taskStore = common_vendor.defineStore("task", {
  state: () => {
    return {};
  },
  getters: {},
  actions: {
    task(params) {
      return new Promise((resolve, reject) => {
        utils_request.request.send({
          url: "/task",
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
exports.taskStore = taskStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/task.js.map
