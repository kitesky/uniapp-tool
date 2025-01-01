"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "Search",
  data() {
    return {};
  },
  methods: {
    onSearchFocus() {
      common_vendor.index.__f__("log", "at components/search.vue:19", 1111);
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  _easycom_uni_search_bar2();
}
const _easycom_uni_search_bar = () => "../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  _easycom_uni_search_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      radius: "100",
      maxlength: "100",
      focus: false,
      readonly: true,
      placeholder: "搜索关键词...",
      clearButton: "none",
      cancelButton: "none"
    }),
    b: common_vendor.o((...args) => $options.onSearchFocus && $options.onSearchFocus(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/search.js.map
