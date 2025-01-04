<template>
	<view>
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="false" :autoplay="true" interval="2000" duration="300">
				<swiper-item v-for="(item,index) in items.swiper" :key="'swiper-' + index">
					<image mode="widthFix" class="w-100" :src="item.image"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<Search></Search>

		<!-- 推荐 -->
		<view>
			<view class="d-flex justify-content-between align-items-center p-3">
				<view class="fs-5 fw-bold">精选推荐</view>
				<view class="fs-6">
					<view class="d-flex justify-content-start align-items-center">
						<image style="width: 24px; height: 24px;" src="/static/icons/gift.svg"></image>
						<text class="ms-1 fw-bold text-secondary">分享有礼</text>
					</view>
				</view>
			</view>
			<view>
				<uni-grid :column="2" :showBorder="false" :square="false">
					<uni-grid-item v-for="(item,index) in items.recommend" :key="'recommend-' + index">
						<view @click="onToolClick(item)" class="bg-body-secondary bg-opacity-75 rounded-3 m-2 p-3">
							<view class="d-flex justify-content-start align-items-center">
								<image style="width: 24px; height: 24px;" mode="heightFix" :src="item.icon"></image>
								<text class="fw-bold ms-2">快捷写作</text>
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
				<view class="fs-5 fw-bold lable">{{v.name}}</view>
				<view class="text-secondary">查看更多<uni-icons color="6c757d" type="right" size="16"></uni-icons></view>
			</view>
			<uni-grid :column="2" :showBorder="false" :square="false">
				<uni-grid-item v-for="(vv,ii) in v.items" :key="'tool-' + ii">
					<view @click="onToolClick(item)" class="bg-light rounded-3 m-2 p-2">
						<view class="d-flex justify-content-between align-items-center">
							<text class="fw-bold ms-2">{{vv.name}}</text>
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
	export default {
		components: {
			Search
		},
		data() {
			return {
				items: {}
			}
		},
		onLoad() {
			this.fetch()
		},
		onPullDownRefresh() {
			this.fetch()
		},
		methods: {
			...mapActions(homeStore, ['homeData']),
			fetch() {
				this.homeData().then(resp => {
					this.items = resp.data
					console.log('items', this.items)
					uni.stopPullDownRefresh()
				})
			},
			onToolClick(item) {
				uni.reLaunch({
					url: item.url
				});
			}
		}
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
