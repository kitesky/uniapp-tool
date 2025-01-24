<template>
	<view class="m-3">
		<view class="bg-danger bg-opacity-100 rounded-4">
			<uni-grid :column="3" :highlight="false" :show-border="false" :square="false">
				<uni-grid-item :index="0">
					<navigator animation-type="pop-in" animation-duration="300" url="/pages/user/score">
					<view class="grid-item-content gap-2 py-3 text-white">
						<view class="f14">
							积分收益
							<uni-icons color="#FFFFFF" type="right" size="14"></uni-icons>
						</view>
						<view class="fs-3 fw-bold">
							{{ user.score }}
						</view>
						<!-- <view @click="onScoreExchange" class="f12 border rounded-5 px-2">立即兑换</view> -->
					</view>
					</navigator>
				</uni-grid-item>
				
				<uni-grid-item :index="1">
					<navigator animation-type="pop-in" animation-duration="300" url="/pages/user/score">
					<view class="grid-item-content gap-2 py-3 text-white">
						<view class="f14">
							奖励金(元)
							<uni-icons color="#FFFFFF" type="right" size="14"></uni-icons>
						</view>
						<view>
							<text class="text-light">￥</text>
							<text class="fs-3 fw-bold">{{ user.reward }}</text>
						</view>
						<!-- <view class="f12 border rounded-5 px-2">去提现</view> -->
					</view>
					</navigator>
				</uni-grid-item>
				
				<uni-grid-item :index="2">
					<view class="grid-item-content gap-2 py-4">
						<navigator animation-type="pop-in" animation-duration="300" url="/pages/user/score">
						<view class="f12 fw-bold bg-light text-dark border rounded-5 px-2 py-1">去提现</view>
						</navigator>
						<!-- <view class="text-light f12">10000积分=1元</view> -->
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		
		<view>
			<view class="my-3 fw-bold">日常任务</view>
			<view class="border-bottom py-3" v-for="(item, index) in items" :key="index">
				<view class="d-flex justify-content-between align-items-center">
					<view class="d-flex justify-content-start align-baseline">
						<view><image style="width: 32px; height: 32px;" mode="heightFix" :src="item.icon"></image></view>
						<view class="ms-2">
							<view class="d-flex justify-content-start align-items-center">
								<view class="fw-bold">{{item.title}}</view>
								<image class="mx-1" style="width: 20px; height: 20px;" :src="item.reward_icon"></image>
								<view class="fw-bold text-warning">{{item.reward_amount}}</view>
							</view>
							<view class="text-secondary fw-light f12 mt-2">{{item.description}}</view>
						</view>
					</view>
					<view>
						<button @click="onLaunch(item)" class="rounded-5 btn-launch" :disabled="item.completed == 'Y'" size="mini" type="warn">
						{{item.completed == 'Y' ? item.completed_title : item.launch_title}}
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapActions} from 'pinia'
	import {taskStore} from '@/stores/task'
	import {userStore} from '@/stores/user'
	export default {
		data() {
			return {
				user: {
					score: 0,
					balance: 0,
				},
				items: [],
			}
		},
		onShow() {
			this.auth.check()
			this.fetch()
		},
		onLoad() {},
		onPullDownRefresh() {
			this.fetch()
		},
		methods: {
			...mapActions(taskStore, ['task', 'taskHandler']),
			...mapActions(userStore, ['userInfo']),
			onLaunch(item) {
				if (item.launch_url) {
					switch (item.launch_type) {
						case 'navigateTo':
							uni.navigateTo({url: item.launch_url});
							break;
						case 'redirectTo':
							uni.redirectTo({url: item.launch_url});
							break;
						case 'reLaunch':
							uni.reLaunch({url: item.launch_url});
							break;
						case 'switchTab':
							uni.switchTab({url: item.launch_url});
							break;
						case 'request':
							this.taskHandler(item.launch_url, {'code': item.code}).then(resp => {
								this.toast.info(resp.message)
								this.fetch()
							})
							break;
					}
				}
			},
			fetch() {
				// 查询任务
				this.task().then(resp => {
					this.items = resp.data
					uni.stopPullDownRefresh()
				})
				
				// 查询用户
				this.userInfo().then(resp => {
					if (resp.data) {
						this.user = resp.data
					}
					uni.stopPullDownRefresh()
				})
			},
		}
	}
</script>

<style>
	.btn-launch {
		min-width: 74px;
	}
</style>
