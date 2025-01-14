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
					<navigator animation-type="pop-in" animation-duration="300" url="/pages/user/invite">
					<view class="d-flex justify-content-start align-items-center gap-1 px-1">
						<image style="width: 24px; height: 24px;" :src="icons.gift"></image>
						<text class="fw-bold text-secondary">分享有礼</text>
					</view>
					</navigator>
				</view>
			</view>
			<view>
				<uni-grid :column="2" :showBorder="false" :square="false">
					<uni-grid-item v-for="(item,index) in items.recommend" :key="'recommend-' + index">
						<view @click="onToolClick(item)" class="bg-body-secondary bg-opacity-75 rounded-3 m-2 p-3">
							<view class="d-flex justify-content-start align-items-center">
								<image style="width: 24px; height: 24px;" :src="item.icon"></image>
								<text class="fw-bold ms-2">{{item.title}}</text>
							</view>
							<view class="mt-2 f12 text-secondary">{{item.description}}</view>
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
							<image style="width: 24px; height: 24px;" :src="vv.icon"></image>
						</view>
						<view class="mt-2 f12 text-secondary">{{vv.description}}</view>
					</view>
				</uni-grid-item>
			</uni-grid>	
		</view>
		
		<view class="bottom-margin"></view>
	</view>
</template>

<script>
	import {mapActions, mapState} from 'pinia'
	import {homeStore} from '@/stores/home'
	import {userStore} from '@/stores/user'
	import Search from '@/components/search'
	import config from '@/utils/config'
	export default {
		components: {
			Search
		},
		data() {
			return {
				icons: config.icons,
				items: {},
				mmid : null,
			}
		},
		onLoad(option) {
			// 微信场景二维码
			this.getQueryParams(option.scene)

			// 自己的mmidd
			this.mmid = this.getUserMMID()
			// 别人分享的mmid
			this.setInviteID(option.invite_id)
			this.fetch()
			console.log('query option', option, 'mmid', this.mmid)
		},
		onPullDownRefresh() {
			this.fetch()
		},
		onShareAppMessage() {
			return {
				title: '美智合AI',
				path: '/pages/index/index?invite_id=' + this.mmid,
			}
		},
		onShareTimeline() {
			return {
				title: '美智合AI',
				query: 'invite_id=' + this.mmid ,
			}
		},
		methods: {
			...mapActions(homeStore, ['homeData']),
			...mapActions(userStore, ['setInviteID']),
			...mapState(userStore, ['getUserMMID']),
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
			getQueryParams(scene) {
			    let params = {
					invite_id: ""
				};
				if (scene) {
					scene = decodeURIComponent(scene)
					// 分割查询字符串并解析
					scene.split('&').forEach(function(pair) {
						let [key, value] = pair.split('=');
						params[decodeURIComponent(key)] = decodeURIComponent(value || '');
					});
				}
				
				if (params.invite_id) {
					this.setInviteID(params.invite_id)
				}
			    return params;
			}
		},
	}
</script>

<style>
	.uni-card__header {
		border-bottom: 0 !important;
	}
	.bottom-margin {
		height: 10px;
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
