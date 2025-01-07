<template>
  <!-- 自定义导航栏的外层容器 -->
  <view class="custom-navbar" :style="{ paddingTop: `${statusBarHeight}px`, height: `${navBarHeight}px` }">
    <!-- 左侧返回按钮 -->
    <view class="left" @click="goBack">
      <text class="iconfont icon-back"></text>
    </view>
    <!-- 中间标题 -->
    <view class="title">{{ title }}</view>
    <!-- 右侧可以添加其他按钮或图标 -->
    <view class="right">
      <!-- 预留区域 -->
    </view>
  </view>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'CustomNavbar', // 组件名称
  props: {
    title: {
      type: String,
      default: '标题' // 默认标题
    }
  },
  setup() {
    // 定义状态栏高度和导航栏高度的响应式变量
    const statusBarHeight = ref(0);
    const navBarHeight = ref(0);

    // 返回上一个页面的方法
    const goBack = () => {
      uni.navigateBack();
    };

    // 组件挂载时获取系统信息并计算导航栏高度
    onMounted(() => {
      const systemInfo = uni.getSystemInfoSync();
      statusBarHeight.value = systemInfo.statusBarHeight; // 获取状态栏高度
      // 根据平台计算导航栏高度
      navBarHeight.value = systemInfo.platform === 'android' 
        ? statusBarHeight.value + 48 // Android 导航栏高度
        : statusBarHeight.value + 44; // iOS 导航栏高度
    });

    // 返回响应式变量和方法供模板使用
    return {
      statusBarHeight,
      navBarHeight,
      goBack
    };
  }
});
</script>

<style scoped>
/* 导航栏样式 */
.custom-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  padding: 0 10px;
  box-sizing: border-box;
}

/* 左右两侧按钮区域样式 */
.left, .right {
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 中间标题样式 */
.title {
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

/* 图标字体样式 */
.iconfont {
  font-size: 20px;
}
</style>