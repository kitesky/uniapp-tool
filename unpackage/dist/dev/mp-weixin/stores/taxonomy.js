"use strict";
const common_vendor = require("../common/vendor.js");
const utils_request = require("../utils/request.js");
const taxonomyStore = common_vendor.defineStore("taxonomy", {
  state: () => {
    return {};
  },
  getters: {},
  actions: {
    taxonomy(params) {
      return new Promise((resolve, reject) => {
        utils_request.request.send({
          url: "/taxonomy",
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
exports.taxonomyStore = taxonomyStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/taxonomy.js.map
