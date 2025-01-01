"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_taxonomy = require("../../stores/taxonomy.js");
const Search = () => "../../components/search.js";
const _sfc_main = {
  components: {
    Search
  },
  data() {
    return {
      items: [],
      selectIndex: 0,
      list: []
    };
  },
  onLoad() {
    this.fetch();
  },
  onPullDownRefresh() {
    this.fetch();
  },
  methods: {
    ...common_vendor.mapActions(stores_taxonomy.taxonomyStore, ["taxonomy"]),
    fetch() {
      this.taxonomy().then((resp) => {
        this.items = resp.data;
        this.list = resp.data[this.selectIndex].items;
        common_vendor.index.__f__("log", "at pages/category/index.vue:69", "items", this.items);
        common_vendor.index.stopPullDownRefresh();
      });
    },
    onTabClick(index) {
      this.selectIndex = index;
      this.list = this.items[index].items;
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
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  (_component_Search + _easycom_uni_col2 + _easycom_uni_row2)();
}
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
if (!Math) {
  (_easycom_uni_col + _easycom_uni_row)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.items, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: "taxonomy" + index,
        c: common_vendor.n($data.selectIndex == index ? "bg-body-secondary fw-bold" : ""),
        d: common_vendor.o(($event) => $options.onTabClick(index), "taxonomy" + index)
      };
    }),
    b: common_vendor.p({
      span: 6
    }),
    c: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.description),
        d: "tool" + index,
        e: common_vendor.o(($event) => $options.onToolClick(item), "tool" + index)
      };
    }),
    d: common_vendor.p({
      span: 18
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/category/index.js.map
