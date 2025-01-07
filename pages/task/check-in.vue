<template>
	<view>
		<view class="m-3">
			<view>你已经连续签到 <text class="text-primary">{{data.count}}</text> 天，再接再厉！</view>
			<view class="my-3">签到时间: {{data.created_at}}</view>
			<view class="hstack gap-2">
				<text>查看</text>
				<navigator animation-type="pop-in" animation-duration="300" url="/pages/user/score"><text class="text-primary">我的积分</text> </navigator>
				<text>日志记录</text>
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
				data: {}
			}
		},
		onLoad() {
			this.onCheckIn()
		},
		onUnload() {
			console.log("返回上一级")
		},
		methods: {
			...mapActions(taskStore, ['checkIn']),
			onCheckIn() {
				this.checkIn().then(resp => {
					this.data = resp.data
				})
			},
		}
	}
</script>

<style>

</style>
