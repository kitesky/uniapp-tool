<template>
	<view class="mx-3">
		<view class="bg-danger bg-opacity-100 rounded-4 p-4">
			<uni-grid :column="3" :highlight="false" :show-border="false" :square="false" @change="onGridChange">
				<uni-grid-item :index="0">
					<view class="text-white">
						<view class="f14">积分收益</view>
						<view class="fs-3">0</view>
					</view>
				</uni-grid-item>
				
				<uni-grid-item :index="1">
					<view class="text-white">
						<view class="f14">积分收益</view>
						<view class="fs-3">0</view>
					</view>
				</uni-grid-item>
				
				<uni-grid-item :index="2">
					<view class="d-flex justify-content-center align-items-center">
						<button size="mini" type="default" class="bg-white text-black border-0" plain="true">去提现</button>
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
						<button @click="onLaunch(item)" class="rounded-5 btn-launch" :disabled="item.completed == 'Y'" size="mini" type="warn">{{item.launch_title}}</button>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapActions} from 'pinia'
	import {taskStore} from '@/stores/task'
	export default {
		data() {
			return {
				items: [],
			}
		},
		onLoad() {
			this.fetch()
		},
		onPullDownRefresh() {
			this.fetch()
		},
		methods: {
			...mapActions(taskStore, ['task']),
			onGridChange() {
				
			},
			onLaunch(item) {
				if (item.launch_url) {
					uni.reLaunch({url: item.launch_url});
					return
				}
				
				this.toast.error("任务启动失败")
			},
			fetch() {
				this.task().then(resp => {
					this.items = resp.data
					uni.stopPullDownRefresh()
				})
			},
		}
	}
</script>

<style>
	.bg-task {
		background-image: url(https://api.idcd.com/assets/images/bg/20.jpg);
		background-repeat: no-repeat;
		background-size: cover;
	}
	.btn-launch {
		min-width: 74px;
	}
</style>
