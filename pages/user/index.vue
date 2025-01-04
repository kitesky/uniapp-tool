<template>
	<view>
		<view class="bg-user">
			<view class="d-flex justify-content-between align-items-center px-3 py-4">
				<view>
					<view class="d-flex justify-content-start align-items-center">
						<image style="width: 50px; height: 50px;" src="/static/images/avatar/avatar_boy.png"></image>
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

		<view class="mt-5">
			<uni-list>
				<uni-list-item 
					title="订单列表" 
					:show-extra-icon="true" 
					:thumb="icons.cart" thumb-size="sm"
					link to="/pages/user/order"
				>
				</uni-list-item>
				
				<uni-list-item
					title="账单明细" 
					:show-extra-icon="true" 
					:thumb="icons.balance" thumb-size="sm"
					link to="/pages/user/balance"
				>
				</uni-list-item>
				
				<uni-list-item
					title="积分记录" 
					:show-extra-icon="true" 
					:thumb="icons.score" thumb-size="sm"
					link to="/pages/user/score"
				>
				</uni-list-item>
				
				<uni-list-item
					title="账号管理" 
					:show-extra-icon="true" 
					:thumb="icons.setting" thumb-size="sm"
					link to="/pages/user/setting"
				>
				</uni-list-item>
				
				<uni-list-item
					title="当前版本" 
					:show-extra-icon="true" 
					:thumb="icons.version" thumb-size="sm"
					rightText="V24.12.31"
				>
				</uni-list-item>
			</uni-list>
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
				user: {}
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