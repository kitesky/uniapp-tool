"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "UniGrid",
  emits: ["change"],
  props: {
    // 每列显示个数
    column: {
      type: Number,
      default: 3
    },
    // 是否显示边框
    showBorder: {
      type: Boolean,
      default: true
    },
    // 边框颜色
    borderColor: {
      type: String,
      default: "#D2D2D2"
    },
    // 是否正方形显示,默认为 true
    square: {
      type: Boolean,
      default: true
    },
    highlight: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      grid: this
    };
  },
  data() {
    const elId = `Uni_${Math.ceil(Math.random() * 1e6).toString(36)}`;
    return {
      elId,
      width: 0
    };
  },
  created() {
    this.children = [];
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      setTimeout(() => {
        this._getSize((width) => {
          this.children.forEach((item, index) => {
            item.width = width;
          });
        });
      }, 50);
    },
    change(e) {
      this.$emit("change", e);
    },
    _getSize(fn) {
      common_vendor.index.createSelectorQuery().in(this).select(`#${this.elId}`).boundingClientRect().exec((ret) => {
        this.width = parseInt((ret[0].width - 1) / this.column) + "px";
        fn(this.width);
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.elId,
    b: $props.showBorder ? 1 : "",
    c: $props.borderColor
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-07acefee"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-grid/components/uni-grid/uni-grid.js.map
