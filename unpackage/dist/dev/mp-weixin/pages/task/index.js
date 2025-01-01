"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad() {
  },
  methods: {
    onGridChange() {
    }
  }
};
if (!Array) {
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_icons2)();
}
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      index: 0
    }),
    b: common_vendor.p({
      index: 1
    }),
    c: common_vendor.p({
      index: 2
    }),
    d: common_vendor.o($options.onGridChange),
    e: common_vendor.p({
      column: 3,
      highlight: false,
      ["show-border"]: false,
      square: false
    }),
    f: common_vendor.f(10, (item, index, i0) => {
      return {
        a: "40f03d8a-4-" + i0,
        b: index
      };
    }),
    g: common_vendor.p({
      color: "#dc3545",
      type: "gift-filled",
      size: "24"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/task/index.js.map
