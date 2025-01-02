"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_task = require("../../stores/task.js");
const _sfc_main = {
  data() {
    return {
      items: []
    };
  },
  onLoad() {
    this.fetch();
  },
  onPullDownRefresh() {
    this.fetch();
  },
  methods: {
    ...common_vendor.mapActions(stores_task.taskStore, ["task"]),
    onGridChange() {
    },
    onLaunch(item) {
      if (item.launch_url) {
        common_vendor.index.reLaunch({ url: item.launch_url });
        return;
      }
      this.toast.error("任务启动失败");
    },
    fetch() {
      this.task().then((resp) => {
        this.items = resp.data;
        common_vendor.index.stopPullDownRefresh();
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  (_easycom_uni_grid_item2 + _easycom_uni_grid2)();
}
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
if (!Math) {
  (_easycom_uni_grid_item + _easycom_uni_grid)();
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
    f: common_vendor.f($data.items, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.title),
        c: item.reward_icon,
        d: common_vendor.t(item.reward_amount),
        e: common_vendor.t(item.description),
        f: common_vendor.t(item.launch_title),
        g: common_vendor.o(($event) => $options.onLaunch(item), index),
        h: item.completed == "Y",
        i: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/task/index.js.map
