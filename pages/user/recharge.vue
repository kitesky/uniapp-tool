<template>
	<view>
		<view class="bg-body-secondary p-3">
			<view class="mb-1">
				<text class="text-secondary">当前余额:</text>
				<text class="text-danger fw-bold mx-1">{{user.balance}}</text>元
			</view>
			<view>
				<text class="text-secondary">充值账户:</text>
				<text class="mx-1">{{user.mmid}}</text>
			</view>
		</view>

		<view class="mx-3 mt-3">
			<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData" label-position="top">
				<uni-forms-item label="充值金额" required name="amount">
					<uni-easyinput type="digit" prefixIcon="compose" trim="all" v-model="customFormData.amount" placeholder="请输入充值金额"></uni-easyinput>
				</uni-forms-item>
				<!-- <uni-forms-item label="快捷选择" name="option">
					<uni-data-checkbox v-model="customFormData.option" :localdata="options" />
				</uni-forms-item> -->
			</uni-forms>

			<button class="bg-danger mt-3" type="primary" @click="submit('customForm')">立即支付</button>
		</view>
	</view>
</template>

<script>
	import {
		mapActions
	} from 'pinia'
	import {
		userStore
	} from '@/stores/user'
	import {
		orderStore
	} from '@/stores/order'
	export default {
		data() {
			return {
				customFormData: {
					amount: 5,
					option: 5
				},
				options: [{
						text: '5元',
						value: 5
					},
					{
						text: '20元',
						value: 20
					},
					{
						text: '50元',
						value: 50
					},
					{
						text: '100元',
						value: 100
					}
				],
				user: {},
				// 自定义表单校验规则
				customRules: {
					amount: {
						rules: [{
							required: true,
							errorMessage: '充值金额不能为空'
						}, {
							validateFunction: function(rule, value, data, callback) {
								if (value < 0.1) {
									callback('充值最低金额为0.1元')
								}
								return true
							}
						}]
					},
				},
			}
		},
		beforeCreate() {
			this.auth.check()
		},
		onLoad() {
			this.fetch()
			// uni.reLaunch({ url: '/pages/auth/login' })
		},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			this.$refs.customForm.setRules(this.customRules)
		},
		onPullDownRefresh() {
			// 刷新用户信息
			this.fetch()
		},
		methods: {
			...mapActions(userStore, ['userInfo']),
			...mapActions(orderStore, ['createOrder']),
			fetch() {
				this.userInfo().then(resp => {
					this.user = resp.data
					uni.stopPullDownRefresh()
				})
			},
			submit(ref) {
				var that = this
				that.$refs[ref].validate().then(res => {
					var params = {
						"order_type": "recharge",
						"amount": parseFloat(that.customFormData.amount)
					}
					that.createOrder(params).then(resp => {
						// data = resp.data
						console.log(resp.code, resp.data)
						if (resp.code != 200) {
							that.toast.error(resp.message)
							return
						}

						uni.requestPayment({
						    provider: 'wxpay',
						    ...resp.data,
						    success: function (res) {
								that.toast.success('充值成功')
						        that.fetch()
						    },
						    fail: function (err) {
						        console.log('fail:' + JSON.stringify(err))
								that.toast.info('取消支付')
						    }
						});
					})
				}).catch(err => {
					console.log('err', err);
				})
			},
		},
		watch: {
			"customFormData.option": {
				handler(newVal, oldVal) {
					this.customFormData.amount = parseFloat(newVal)
				},
				immediate: true,
				deep: true
			}
		}
	}
</script>

<style>
</style>