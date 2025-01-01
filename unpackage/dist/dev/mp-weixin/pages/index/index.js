"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_home = require("../../stores/home.js");
const common_assets = require("../../common/assets.js");
const Search = () => "../../components/search.js";
const _sfc_main = {
  components: {
    Search
  },
  data() {
    return {
      items: {}
    };
  },
  onLoad() {
    this.fetch();
  },
  onPullDownRefresh() {
    this.fetch();
  },
  methods: {
    ...common_vendor.mapActions(stores_home.homeStore, ["homeData"]),
    fetch() {
      this.homeData().then((resp) => {
        this.items = resp.data;
        common_vendor.index.__f__("log", "at pages/index/index.vue:86", "items", this.items);
        common_vendor.index.stopPullDownRefresh();
      });
    },
    onToolClick(item) {
      common_vendor.index.reLaunch({
        url: item.url
      });
    }
  }
};
if (!Array) {
  const _component_Search = common_vendor.resolveComponent("Search");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_Search + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_icons2)();
}
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.items.swiper, (item, index, i0) => {
      return {
        a: item.image,
        b: "swiper-" + index
      };
    }),
    b: common_assets._imports_0,
    c: common_vendor.f($data.items.recommend, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.description),
        c: common_vendor.o(($event) => $options.onToolClick(item), "recommend-" + index),
        d: "recommend-" + index,
        e: "45be9383-2-" + i0 + ",45be9383-1"
      };
    }),
    d: common_vendor.p({
      column: 2,
      showBorder: false,
      square: false
    }),
    e: common_vendor.f($data.items.taxonomy, (v, i, i0) => {
      return {
        a: common_vendor.t(v.name),
        b: "45be9383-3-" + i0,
        c: common_vendor.f(v.items, (vv, ii, i1) => {
          return {
            a: common_vendor.t(vv.name),
            b: vv.icon,
            c: common_vendor.t(vv.description),
            d: common_vendor.o(($event) => $options.onToolClick(_ctx.item), "tool-" + ii),
            e: "tool-" + ii,
            f: "45be9383-5-" + i0 + "-" + i1 + "," + ("45be9383-4-" + i0)
          };
        }),
        d: "45be9383-4-" + i0,
        e: "taxonomy-" + i,
        f: v.meta.bg_color
      };
    }),
    f: common_vendor.p({
      color: "6c757d",
      type: "right",
      size: "16"
    }),
    g: common_vendor.p({
      column: 2,
      showBorder: false,
      square: false
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
