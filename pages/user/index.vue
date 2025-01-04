<template>
	<view>
		<view class="bg-user">
			<view class="d-flex justify-content-between align-items-center px-3 py-4">
				<view>
					<view class="d-flex justify-content-start align-items-center">
						<navigator animation-type="pop-in" animation-duration="300" url="/pages/user/profile">
							<image style="width: 50px; height: 50px;" src="/static/images/avatar/avatar_boy.png"></image>
						</navigator>
						<view class="ms-2">
							<view>{{user.name}}</view>
							<view class="d-flex justify-content-start text-secondary mt-1 f12">
								<text>ID:{{user.mmid}} </text>
								<image @click="copyMMID(user.mmid)" style="width: 16px; height: 16px;" :src="icons.copy"></image>
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
			
			<view style="height: 50px;"></view>
		</view>

		<view class="bg-body-tertiary rounded-3 mx-3" style="margin-top: -50px;">
			<uni-grid :column="3" :highlight="false" :show-border="false" :square="false">
				<uni-grid-item :index="0">
					<view class="grid-item-content">
						<view>
							<text class="text-secondary">￥</text>
							<text class="grid-item-number fw-bold">{{ user.balance }}</text>
						</view>
						<text class="grid-item-text">余额</text>
					</view>
				</uni-grid-item>
				
				<uni-grid-item :index="1">
					<view class="grid-item-content">
						<text class="grid-item-number fw-bold">{{ user.score }}</text>
						<text class="grid-item-text">积分</text>
					</view>
				</uni-grid-item>
				
				<uni-grid-item :index="2">
					<view class="grid-item-content">
						<navigator animation-type="pop-in" animation-duration="300" url="/pages/user/recharge">
							<button size="mini" type="default" class="bg-danger border-0 text-white" plain="false">充值</button>
						</navigator>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>

		<view class="mt-5 border-top">
			<view v-for="(item, index) in navList" :key="'nav' + index">
				<navigator animation-type="pop-in" animation-duration="300" :url="item.link">
					<view class="d-flex justify-content-between align-items-center border-bottom p-3">
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
				user: {},
				navList: [
					{title: "订单列表", icon: config.icons.cart, link: "/pages/user/order", text: ""},
					{title: "账单明细", icon: config.icons.balance, link: "/pages/user/balance", text: ""},
					{title: "积分记录", icon: config.icons.score, link: "/pages/user/score", text: ""},
					{title: "账号管理", icon: config.icons.setting, link: "/pages/user/setting", text: ""},
					{title: "当前版本", icon: config.icons.version, link: "/pages/user/index", text: "V24.12.31"},
				],
			}
		},
		beforeCreate() {
			this.auth.check()
		},
		onLoad() {
			this.fetch()
			// uni.reLaunch({ url: '/pages/auth/login' })
		},
		onPullDownRefresh() {
			// 刷新用户信息
			this.fetch()
		},
		methods: {
			...mapActions(userStore, ['userInfo']),
			fetch() {
				this.userInfo().then(resp => {
					this.user = resp.data
					uni.stopPullDownRefresh()
				})
			},
			onclickItem(url) {
				this.toast.error("1221312")
				// uni.navigateTo({url:url})
			},
			copyMMID(text) {
				var that = this
				uni.setClipboardData({
					data: text,
					success: function () {
						that.toast.success('复制成功')
					}
				})
			}
		}
	}
</script>

<style>
	.bg-user {
		background-image: url(https://api.idcd.com/assets/images/bg/10.jpg);
		background-repeat: no-repeat;
		background-size: cover;
	}
    .grid-item-content {
        flex: 1;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 16px 8px;
    }
    .grid-item-text {
        margin: 8px 0 0; 
    }

    .grid-item-number {
		color: #FF4136;
		font-size: 1.75rem;
    }
    .grid-item-dot {
        position: absolute !important;
        top: 5px;
        right: 15px;
    }
</style>