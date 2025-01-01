"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_user = require("../../stores/user.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  name: "MPWexinLogin",
  data() {
    return {};
  },
  methods: {
    ...common_vendor.mapActions(stores_user.userStore, ["wxLogin"]),
    onChangeCheckbox(e) {
      if (e.detail.value) {
        this.checkedValue = parseInt(e.detail.value[0]);
      }
    },
    getUserProfile() {
      var that = this;
      if (that.checkedValue != 1) {
        that.toast.error("请同意服务协议");
        return false;
      }
      common_vendor.index.getUserProfile({
        desc: "用于完善会员资料",
        success: function(weixinRes) {
          that.login(weixinRes.userInfo);
        }
      });
    },
    login(userInfo) {
      var that = this;
      common_vendor.index.showLoading({
        mask: true
      });
      common_vendor.index.login({
        provider: "weixin",
        success: function(loginRes) {
          common_vendor.index.__f__("log", "at components/login/mp-weixin.vue:63", "loginRes", loginRes);
          that.wxLogin({
            code: loginRes.code,
            userInfo
          }).then((res) => {
            common_vendor.index.switchTab({
              url: "/pages/user/index"
            });
          });
        },
        complete: function() {
          common_vendor.index.hideLoading();
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$2,
    b: common_vendor.o((...args) => $options.getUserProfile && $options.getUserProfile(...args)),
    c: _ctx.checked,
    d: common_vendor.o((...args) => _ctx.onClickAgree && _ctx.onClickAgree(...args)),
    e: common_vendor.o((...args) => $options.onChangeCheckbox && $options.onChangeCheckbox(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/login/mp-weixin.js.map
