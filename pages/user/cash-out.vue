<template>
	<view>
		<view class="bg-body-secondary p-3">
			<view class="mb-1">
				<text>可兑换</text>
			</view>
			<view>
				<text class="text-danger fs-3 fw-bold">{{user.reward}}</text>
				<text class="f12 text-secondary">元</text>
			</view>
		</view>

		<view class="mx-3 mt-3">
			<view class="mb-3">
				<view class="mb-1 text-secondary">兑换类型</view>
				<uni-data-checkbox mode="button" selectedColor="red" v-model="type" :localdata="typeOptions" />
			</view>
			
			<view v-if="type == 'cash'" class="mb-3">
				<view>
					<view class="d-flex justify-content-between align-items-center mb-1">
						<view class="text-secondary">收款人信息</view>
						<view>
							<navigator animation-type="pop-in" animation-duration="300" url="/pages/user/payment-account?pay_type=alipay">
								<text class="px-2 py-1 rounded-5 text-bg-danger text-white">去设置</text>
							</navigator>
						</view>
					</view>
					<uni-data-checkbox mode="tag" selectedColor="red" v-model="paymentID" :localdata="paymentOptions" />
				</view>
				<view class="mt-3">
					<view class="mb-1 text-secondary">兑换现金</view>
					<uni-data-checkbox mode="tag" selectedColor="red" v-model="amount" :localdata="cashOptions" />
				</view>
			</view>
			
			<view v-if="type == 'point'" class="mb-3">
				<view class="mb-1 text-secondary">兑换点数</view>
				<uni-data-checkbox mode="list" selectedColor="red" v-model="productID" :localdata="productOptions" />
			</view>

			<button class="bg-danger mt-4" type="primary" @click="submit()">立即兑换</button>
		</view>
	</view>
</template>

<script>
	import {mapActions} from 'pinia'
	import {userStore} from '@/stores/user'
	import {rewardStore} from '@/stores/reward'
	import {productStore} from '@/stores/product'
	export default {
		data() {
			return {
				type: 'cash',
				productID: 0,
				paymentID: 0,
				amount: 0,
				productOptions: [],
				typeOptions: [{ text: '现金', value: 'cash'}, { text: '点数', value: 'point' }],
				cashOptions: [
					{ text: '0.3元', value: 0.3},
					{ text: '15元', value: 15 },
					{ text: '30元', value: 30 },
					{ text: '100元', value: 100 },
				],
				paymentOptions: [],
				user: {},
			}
		},
		beforeCreate() {
			this.auth.check()
		},
		onLoad() {
			this.fetch()
		},
		onReady() {},
		onPullDownRefresh() {
			// 刷新用户信息
			this.fetch()
		},
		methods: {
			...mapActions(userStore, ['userInfo', 'paymentAccountList']),
			...mapActions(rewardStore, ['rewardExchange']),
			...mapActions(productStore, ['getProductList']),
			fetch() {
				this.userInfo().then(resp => {
					this.user = resp.data
				})
				this.getProductList({type: 'point'}).then(resp => {
					if (resp.data) {
						var productOptions = [];
						resp.data.forEach((item, index) => {
							productOptions.push({ text: item.title + ' - ' + item.price + '元', value: item.id })
						})
						this.productOptions = productOptions
					}
				})
				this.paymentAccountList().then(resp => {
					if (resp.data) {
						var paymentOptions = [];
						resp.data.forEach((item, index) => {
							paymentOptions.push({ text: item.name, value: item.id })
						})
						this.paymentOptions = paymentOptions
					}
				})
				
				uni.stopPullDownRefresh()
			},
			submit() {
				var that = this
				var params = {
					"cash_type": that.type,
					"product_id": that.productID,
					"payment_id": that.paymentID,
					"amount": that.amount,
				}
				
				that.rewardExchange(params).then(resp => {
					if (resp.code == 200) {
						that.toast.info('提交成功')
						that.fetch()
					} else {
						that.toast.error(resp.message)
					}
				})
				console.log(params)
			},
		}
	}
</script>

<style>
</style>