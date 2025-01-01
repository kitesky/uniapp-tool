"use strict";
const common_vendor = require("../../common/vendor.js");
const MPWexinLogin = () => "../../components/login/mp-weixin.js";
const _sfc_main = {
  components: {
    MPWexinLogin
  },
  data() {
    return {};
  },
  methods: {
    onClickAgree() {
      common_vendor.index.navigateTo({ url: "/pages/agreement/policy" });
    },
    onGridChange(e) {
    }
  }
};
if (!Array) {
  const _component_MPWexinLogin = common_vendor.resolveComponent("MPWexinLogin");
  _component_MPWexinLogin();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/auth/login.js.map
