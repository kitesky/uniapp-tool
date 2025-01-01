"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      search: false,
      // 0 搜索面板 1 结果面板
      keywords: "",
      params: { keywords: "" },
      isFetch: false,
      history: [],
      hot: []
    };
  },
  onPullDownRefresh() {
  },
  onShareAppMessage() {
  },
  mounted() {
    this.getHistoryData();
    this.fetchHotSearch();
  },
  methods: {
    fetchHotSearch() {
    },
    onSearch() {
      this.search = true;
      this.isFetch = true;
      this.params.keywords = this.keywords;
      this.setHistoryData(this.keywords);
    },
    onCancel() {
      this.search = false;
      this.isFetch = false;
    },
    getHistoryData() {
      var history = common_vendor.index.getStorageSync("searchHistoryKeywords");
      if (history.length > 20) {
        this.history = history.slice(-20);
      } else {
        this.history = history ? history : [];
      }
    },
    setHistoryData(keywords) {
      var data = this.history;
      var index = data.indexOf(keywords);
      if (index > -1) {
        data.splice(index, 1);
      }
      data.push(keywords);
      common_vendor.index.setStorageSync("searchHistoryKeywords", data);
    },
    clearHistoryData() {
      var that = this;
      common_vendor.index.showModal({
        title: "确认提示",
        content: "确定要删除搜索记录?",
        success: function(res) {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("searchHistoryKeywords");
            that.history = [];
          }
        }
      });
    },
    onClickKeywords(keywords) {
      this.keywords = keywords;
      this.onSearch();
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2 + _easycom_uni_section2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.onSearch),
    b: common_vendor.o($options.onCancel),
    c: common_vendor.o($options.onCancel),
    d: common_vendor.o(($event) => $data.keywords = $event),
    e: common_vendor.p({
      focus: true,
      placeholder: "搜索关键词...",
      radius: "100",
      maxlength: "100",
      modelValue: $data.keywords
    }),
    f: $data.search == false
  }, $data.search == false ? common_vendor.e({
    g: $data.history.length > 0
  }, $data.history.length > 0 ? {
    h: common_vendor.o($options.clearHistoryData),
    i: common_vendor.p({
      type: "trash",
      size: "22"
    }),
    j: common_vendor.f($data.history, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.o(($event) => $options.onClickKeywords(item), index),
        c: index
      };
    }),
    k: common_vendor.p({
      title: "历史搜索",
      titleFontSize: "15px",
      type: "square"
    })
  } : {}, {
    l: common_vendor.f($data.hot, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.o(($event) => $options.onClickKeywords(item), index),
        c: index
      };
    }),
    m: common_vendor.p({
      title: "热门搜索",
      titleFontSize: "15px",
      type: "square"
    })
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/search/search.js.map
