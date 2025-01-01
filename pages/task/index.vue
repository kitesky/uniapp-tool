<template>
	<view class="mx-3">
		<view class="bg-danger rounded-3 p-4">
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
						<button size="mini" type="primary" plain="true">去提现</button>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		
		<view>
			<view class="my-3 fw-bold">集金福</view>
			<view class="border-bottom py-3" v-for="(item, index) in 10" :key="index">
				<view class="d-flex justify-content-between align-items-center">
					<view class="d-flex justify-content-start align-baseline">
						<view><uni-icons color="#dc3545" type="gift-filled" size="24"></uni-icons></view>
						<view class="ms-2">
							<view class="fw-bold">预约领取音符</view>
							<view class="text-secondary fw-light f12 mt-2">今日预约，明日一键领音符</view>
						</view>
					</view>
					<view>
						<button size="mini" type="warn">去领取</button>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			onGridChange() {
				
			}
		}
	}
</script>

<style>

</style>
