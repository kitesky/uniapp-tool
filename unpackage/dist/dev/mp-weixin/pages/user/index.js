"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_user = require("../../stores/user.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      title: "个人中心",
      user: {}
    };
  },
  beforeCreate() {
    this.auth.check();
  },
  onLoad() {
    this.fetch();
  },
  onPullDownRefresh() {
    this.fetch();
  },
  methods: {
    ...common_vendor.mapActions(stores_user.userStore, ["userInfo"]),
    fetch() {
      this.userInfo().then((resp) => {
        this.user = resp.data;
        common_vendor.index.stopPullDownRefresh();
      });
    },
    onGridChange() {
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_icons2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$1,
    b: common_vendor.t($data.user.name),
    c: common_vendor.p({
      color: "#6c757d",
      type: "right",
      size: "24"
    }),
    d: common_vendor.t($data.user.balance),
    e: common_vendor.p({
      index: 0
    }),
    f: common_vendor.t($data.user.score),
    g: common_vendor.p({
      index: 1
    }),
    h: common_vendor.p({
      index: 2
    }),
    i: common_vendor.o($options.onGridChange),
    j: common_vendor.p({
      column: 3,
      highlight: false,
      ["show-border"]: false,
      square: false
    }),
    k: common_vendor.p({
      title: "订单列表",
      ["show-extra-icon"]: true,
      showArrow: true,
      ["is-link"]: true,
      ["extra-icon"]: {
        size: "22",
        type: "cart"
      }
    }),
    l: common_vendor.p({
      title: "账号管理",
      ["show-extra-icon"]: true,
      showArrow: true,
      ["is-link"]: true,
      ["extra-icon"]: {
        size: "22",
        type: "gear"
      }
    }),
    m: common_vendor.p({
      title: "日志记录",
      ["show-extra-icon"]: true,
      showArrow: true,
      ["is-link"]: true,
      ["extra-icon"]: {
        size: "22",
        type: "list"
      }
    }),
    n: common_vendor.p({
      title: "版本号",
      rightText: "V24.12.31",
      ["show-extra-icon"]: true,
      ["extra-icon"]: {
        size: "22",
        type: "info"
      }
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/index.js.map
