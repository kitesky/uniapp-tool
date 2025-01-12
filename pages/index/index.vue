<template>
	<view>
		<view class="uni-margin-wrap">
			<swiper :current="currIndex" @change="changeSwiper" :style="{ height: swiperHeight + 'px' }" class="swiper" circular :indicator-dots="false" :autoplay="true" interval="2000" duration="300">
				<swiper-item v-for="(item,index) in items.swiper" :key="'swiper-' + index">
					<image :id="'wrap' + index" mode="widthFix" class="w-100" :src="item.image"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<Search></Search>

		<!-- 推荐 -->
		<view>
			<view class="d-flex justify-content-between align-items-center p-3">
				<view class="fs-5 fw-bold">精选推荐</view>
				<view class="fs-6">
					<navigator animation-type="pop-in" animation-duration="300" url="/pages/user/invite">
					<view class="d-flex justify-content-start align-items-center">
						<image style="width: 24px; height: 24px;" :src="icons.gift"></image>
						<text class="ms-1 fw-bold text-secondary">分享有礼</text>
					</view>
					</navigator>
				</view>
			</view>
			<view>
				<uni-grid :column="2" :showBorder="false" :square="false">
					<uni-grid-item v-for="(item,index) in items.recommend" :key="'recommend-' + index">
						<view @click="onToolClick(item)" class="bg-body-secondary bg-opacity-75 rounded-3 m-2 p-3">
							<view class="d-flex justify-content-start align-items-center">
								<image style="width: 24px; height: 24px;" mode="heightFix" :src="item.icon"></image>
								<text class="fw-bold ms-2">{{item.title}}</text>
							</view>
							<view class="gray mt-2 f12">{{item.description}}</view>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
		</view>

		<!-- 分类循环列表 -->
		<view class="rounded-3 mx-2 my-4 p-2" v-for="(v,i) in items.taxonomy" :key="'taxonomy-' + i" :style="{backgroundColor: v.meta.bg_color}">
			<view class="d-flex justify-content-between align-items-center p-2">
				<view class="fs-5 fw-bold lable">{{v.title}}</view>
				<view @click="onViewMoreClick(i)" class="text-secondary">
					查看更多<uni-icons color="6c757d" type="right" size="16"></uni-icons>
				</view>
			</view>
			<uni-grid :column="2" :showBorder="false" :square="false">
				<uni-grid-item v-for="(vv,ii) in v.items" :key="'tool-' + ii">
					<view @click="onToolClick(vv)" class="bg-light rounded-3 m-2 p-2">
						<view class="d-flex justify-content-between align-items-center">
							<text class="fw-bold">{{vv.title}}</text>
							<image style="width: 24px; height: 24px;" mode="heightFix" :src="vv.icon"></image>
						</view>
						<view class="gray mt-2 f12">{{vv.description}}</view>
					</view>
				</uni-grid-item>
			</uni-grid>	
		</view>
		
		<!-- <view class="bottom-margin"></view> -->
	</view>
</template>

<script>
	import {mapActions} from 'pinia'
	import {homeStore} from '@/stores/home'
	import Search from '@/components/search'
	import config from '@/utils/config'
	export default {
		components: {
			Search
		},
		data() {
			return {
				currIndex: 0, // 当前索引
				swiperHeight: 0, // 滑块的高度(单位px)
				icons: config.icons,
				items: {}
			}
		},
		onLoad(params) {
			this.$nextTick(() => {
				this.setSwiperHeight(); // 动态设置 swiper 的高度
			});
			
			console.log('query params', params)
			this.fetch()
		},
		onPullDownRefresh() {
			this.fetch()
		},
		onShareAppMessage() {
			return {
				title: '分享测试',
				query: 'inviteid=11111',
			}
		},
		onShareTimeline() {
			return {
				title: '分享测试',
				query: 'inviteid=11111',
			}
		},
		methods: {
			...mapActions(homeStore, ['homeData']),
			fetch() {
				this.homeData().then(resp => {
					this.items = resp.data
					uni.stopPullDownRefresh()
				})
			},
			onToolClick(item) {
				uni.navigateTo({
					url: item.url + '?id=' + item.id
				});
			},
			onViewMoreClick(index) {
				uni.setStorageSync('selectIndex', index);
				uni.switchTab({
					url: '/pages/category/index'
				});
			},
			/* 切换 swiper 滑块 */
			changeSwiper(e) {
				this.currIndex = e.detail.current;
				this.$nextTick(() => {
					this.setSwiperHeight(); // 动态设置 swiper 的高度
				});
			},
			/* 动态设置 swiper 的高度 */
			setSwiperHeight() {
				const element = "#wrap" + this.currIndex;
				const query = uni.createSelectorQuery().in(this);
				query.select(element).boundingClientRect();
				query.exec(res => {
					if (res && res[0]) this.swiperHeight = res[0].height;
				});
			}
		},
	}
</script>

<style>
	.uni-card__header {
		border-bottom: 0 !important;
	}
	.bottom-margin {
		height: 30px;
	}
	.lable::before {
		display: inline-block;
		width: 6px;
		height: 14px;
		border-radius: 6px;
		background: #FF4136;
		content: "";
		vertical-align: 1px;
		margin-right: 10px;
	}
</style>
