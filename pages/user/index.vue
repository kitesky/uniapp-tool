<template>
	<view>
		<view class="bg-info-subtle p-3">
			<view class="d-flex justify-content-between align-items-center">
				<view>
					<view class="d-flex justify-content-start align-items-center">
						<image style="width: 50px; height: 50px;" src="/static/images/avatar/avatar_boy.png"></image>
						<view class="ms-2">
							<view>{{user.name}}</view>
							<view class="text-secondary">xxx</view>
						</view>
					</view>
				</view>
				
				<view>
					<uni-icons color="#6c757d" type="right" size="24"></uni-icons>
				</view>
			</view>
			
			<view style="height: 50px;"></view>
		</view>

		<view class="bg-body-tertiary rounded-3 mx-3" style="margin-top: -50px;">
			<uni-grid :column="3" :highlight="false" :show-border="false" :square="false" @change="onGridChange">
				<uni-grid-item :index="0">
					<view class="grid-item-content">
						<view>
							<text class="text-secondary">￥</text>
							<text class="grid-item-number">{{ user.balance }}</text>
						</view>
						<text class="grid-item-text">余额</text>
					</view>
				</uni-grid-item>
				
				<uni-grid-item :index="1">
					<view class="grid-item-content">
						<text class="grid-item-number">{{ user.score }}</text>
						<text class="grid-item-text">积分</text>
					</view>
				</uni-grid-item>
				
				<uni-grid-item :index="2">
					<view class="grid-item-content">
						<button size="mini" type="primary" plain="true">签到</button>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>

		<view class="mt-5">
			<uni-list>
				<uni-list-item 
					title="订单列表" 
					:rightText="user.balance"
					:show-extra-icon="true" showArrow is-link
					:extra-icon="{size: '22', type: 'cart' }"
				>
				</uni-list-item>
				<uni-list-item
					title="账号管理" 
					:rightText="user.balance"
					:show-extra-icon="true" showArrow is-link
					:extra-icon="{size: '22', type: 'gear' }"
				>
				</uni-list-item>
				<uni-list-item
					title="日志记录" 
					:rightText="user.balance"
					:show-extra-icon="true" showArrow is-link
					:extra-icon="{size: '22', type: 'list' }"
				>
				</uni-list-item>
				<uni-list-item
					title="版本号" 
					rightText="V24.12.31"
					:show-extra-icon="true"
					:extra-icon="{size: '22', type: 'info' }"
				>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import {mapActions} from 'pinia'
	import {userStore} from '@/stores/user'
	export default {
		data() {
			return {
				title: '个人中心',
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
			onGridChange() {
				
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
    .grid-item-text {
        margin: 8px 0 0; 
    }
    .grid-item-price { 
        color: #3b4144;
        font-weight: bold;
        margin-bottom: 3px;
    }
    .grid-item-number {
		font-size: 1.75rem;
    }
    .grid-item-dot {
        position: absolute !important;
        top: 5px;
        right: 15px;
    }
</style>