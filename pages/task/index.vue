<template>
	<view class="mx-3 mt-1">
		<view class="bg-danger bg-opacity-100 rounded-4">
			<uni-grid :column="3" :highlight="false" :show-border="false" :square="false" @change="onGridChange">
				<uni-grid-item :index="0">
					<view class="grid-item-content gap-2 py-4 text-white">
						<view class="f14">积分收益</view>
						<view class="fs-3 fw-bold">0</view>
					</view>
				</uni-grid-item>
				
				<uni-grid-item :index="1">
					<view class="grid-item-content gap-2 py-4 text-white">
						<view class="f14">现金收益</view>
						<view>
							<text class="text-light">￥</text>
							<text class="fs-3 fw-bold">0</text>
						</view>
					</view>
				</uni-grid-item>
				
				<uni-grid-item :index="2">
					<view class="grid-item-content gap-2 py-4">
						<button size="mini" type="default" class="bg-white text-black border-0" plain="true">兑换</button>
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
		onShow() {
			this.fetch()
		},
		onLoad() {},
		onPullDownRefresh() {
			this.fetch()
		},
		methods: {
			...mapActions(taskStore, ['task']),
			onGridChange() {
				
			},
			onLaunch(item) {
				if (item.launch_url) {
					uni.navigateTo({url: item.launch_url});
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
	.btn-launch {
		min-width: 74px;
	}
</style>
