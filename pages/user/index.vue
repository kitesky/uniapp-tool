<template>
	<view>
		<!-- 用户卡片 -->
		<view class="bg-user">
			<view class="d-flex justify-content-between align-items-center px-3 py-3">
				<view>
					<view class="d-flex justify-content-start align-items-center">
						<navigator animation-type="pop-in" animation-duration="300" url="/pages/user/profile">
							<image class="rounded-circle" style="width: 60px; height: 60px;" mode="scaleToFill" :src="user.avatar"></image>
						</navigator>
						<view class="ms-2">
							<view class="f16 fw-bold">{{user.name}}</view>
							<view class="d-flex justify-content-start text-secondary mt-2 gap-2 f12">
								<text>ID:{{user.mmid}} </text>
								<image @click="copyMMID(user.mmid.toString())" style="width: 14px; height: 14px;" :src="icons.copy"></image>
							</view>
						</view>
					</view>
				</view>
				
				<view>
					<navigator animation-type="pop-in" animation-duration="300" url="/pages/user/profile">
						<uni-icons color="#6c757d" type="right" size="24"></uni-icons>
					</navigator>
				</view>
			</view>
			
			<view style="height: 110px;"></view>
		</view>

		<!-- 会员卡片 -->
		<view class="bg-body-tertiary rounded-3 mx-3" style="margin-top: -110px;">
			<view class="bg-danger-subtle rounded-top-3" style="height: 110px;">
				<view>
					<view class="hstack justify-content-between bg-danger rounded-top-3 py-2 px-3">
						<view>
							<view class="d-flex justify-content-center align-items-center">
								<image style="width: auto; height: 18px;" mode="heightFix" src="https://api.idcd.com/assets/icons/vip2.svg"></image>
								<view v-show="user.vip.expire_time" class="ms-2 f12 text-light text-opacity-75">
									<uni-dateformat :date="user.vip.expire_time" format="yyyy年MM月dd日到期"></uni-dateformat>
								</view>
							</view>
							<!-- <view class="f12 text-light text-opacity-75 mt-1">2025年12月到期</view> -->
						</view>
						<view class="text-white f14">
							<navigator animation-type="pop-in" animation-duration="300" url="/pages/user/vip">
							{{user.vip.active == 'Y' ? '会员续期' : '开通会员'}}
							</navigator>
						</view>
					</view>
				
					<view class="f12 text-secondary">
						<uni-grid :column="user.vip.benefits.length ?? 4" :highlight="false" :show-border="false" :square="false">
							<uni-grid-item :index="index" v-for="(item,index) in user.vip.benefits" :key="'v-' + index">
								<view class="p-2 text-center">
									<image style="width: 30px; height: 30px;" mode="heightFix" :src="item.icon"></image>
									<view class="mt-1">{{item.title}}</view>
								</view>
							</uni-grid-item>
						</uni-grid>
					</view>
				</view>
			</view>
			
			<!-- 余额和积分 -->
			<view class="mt-1">
				<uni-grid :column="3" :highlight="false" :show-border="false" :square="false">
					<uni-grid-item :index="0">
						<navigator animation-type="pop-in" animation-duration="300" url="/pages/user/point">
						<view class="grid-item-content">
							<view>
								<!-- <text class="text-secondary">￥</text> -->
								<text class="grid-item-number fw-bold">{{ user.point }}</text>
							</view>
							<text>点数</text>
						</view>
						</navigator>
					</uni-grid-item>
					
					<!-- <uni-grid-item :index="0">
						<navigator animation-type="pop-in" animation-duration="300" url="/pages/user/balance">
						<view class="grid-item-content">
							<view>
								<text class="text-secondary">￥</text>
								<text class="grid-item-number fw-bold">{{ user.balance }}</text>
							</view>
							<text>充值</text>
						</view>
						</navigator>
					</uni-grid-item> -->
					
					<uni-grid-item :index="1">
						<navigator animation-type="pop-in" animation-duration="300" url="/pages/user/score">
						<view class="grid-item-content">
							<text class="grid-item-number fw-bold">{{ user.score }}</text>
							<text>积分</text>
						</view>
						</navigator>
					</uni-grid-item>
					
					<uni-grid-item :index="2">
						<view class="grid-item-content">
							<navigator animation-type="pop-in" animation-duration="300" url="/pages/user/recharge-point">
								<button size="mini" type="default" class="bg-danger border-0 text-white" plain="false">充值</button>
							</navigator>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
		</view>

		<!-- 分享有礼 -->
		<view class="mx-3 my-4 rounded">
			<navigator animation-type="pop-in" animation-duration="300" url="/pages/user/invite">
			<view class="d-flex justify-content-between align-items-center rounded p-3" style="background-color: #e8f7ce;">
				<view class="fs-6">
					<view class="d-flex justify-content-start align-items-center">
						<image style="width: 24px; height: 24px;" :src="icons.gift"></image>
						<text class="ms-1 fw-bold text-secondary">推广有礼</text>
					</view>
				</view>
				<view class="border border-danger text-danger rounded-5 px-2 py-1 f14">立即分享</view>
			</view>
			</navigator>
		</view>

		<!-- 菜单列表 -->
		<view class="mx-3">
			<view v-for="(item, index) in navList" :key="'nav' + index">
				<navigator animation-type="pop-in" animation-duration="300" :url="item.link">
					<view class="d-flex justify-content-between align-items-center p-3">
						<view class="d-flex justify-content-center align-items-center">
							<image style="width: 22px; height: 22px;" mode="heightFix" :src="item.icon"></image>
							<view class="ms-2">{{item.title}}</view>
						</view>
						<view>
							<text v-if="item.text" class="text-secondary f14">{{item.text}}</text>
							<uni-icons v-else  color="#6c757d" type="right" size="16"></uni-icons>
						</view>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapActions} from 'pinia'
	import {userStore} from '@/stores/user'
	import config from '@/utils/config'
	export default {
		data() {
			return {
				icons: config.icons,
				user: {
					avatar: '',
					name: '',
					score: 0,
					balance: 0,
					vip: {
						expire_time: null,
						active: 'N',
						benefits: [],
					}
				},
				navList: [
					{title: "创作记录", icon: config.icons.activity, link: "/pages/activity/activity", text: ""},
					{title: "订单列表", icon: config.icons.cart, link: "/pages/user/order", text: ""},
					// {title: "账单明细", icon: config.icons.balance, link: "/pages/user/balance", text: ""},
					{title: "点数明细", icon: config.icons.balance, link: "/pages/user/point", text: ""},
					{title: "积分记录", icon: config.icons.score, link: "/pages/user/score", text: ""},
					// {title: "账号管理", icon: config.icons.setting, link: "/pages/user/setting", text: ""},
					{title: "当前版本", icon: config.icons.version, link: "/pages/user/index", text: "V1.0.1"},
				],
			}
		},
		onShow() {	
			this.auth.check()
			this.fetch()
		},
		onLoad() {},
		onPullDownRefresh() {
			// 刷新用户信息
			this.fetch()
		},
		methods: {
			...mapActions(userStore, ['userInfo']),
			fetch() {
				this.userInfo().then(resp => {
					if (resp.data) {
						this.user = resp.data
					}
					uni.stopPullDownRefresh()
				})
			},
			copyMMID(text) {
				var that = this
				uni.setClipboardData({
					data: text,
					success: function () {
						that.toast.success('复制成功')
					},
					fail(err) {
						that.toast.error(err.errMsg)
					}
				})
			}
		}
	}
</script>

<style>
    .grid-item-content {
        flex: 1;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 16px 8px;
    }

    .grid-item-number {
		color: #FF4136;
		font-size: 1.5rem;
    }
</style>