<template>
	<view>
		<view class="bg-body-secondary p-3">
			<view class="mb-1">
				<text class="text-secondary">当前点数:</text>
				<text class="text-danger fw-bold mx-1">{{user.point}}</text>点
			</view>
			<view>
				<text class="text-secondary">充值账户:</text>
				<text class="mx-1">{{user.mmid}}</text>
			</view>
		</view>

		<view class="mx-3 mt-3">
			<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData" label-position="top">
				<uni-forms-item label="快捷选择" name="selectIndex">
					<uni-data-checkbox mode="list" selectedColor="red" v-model="customFormData.selectIndex" :localdata="options" />
				</uni-forms-item>
			</uni-forms>

			<button class="bg-danger mt-3" type="primary" @click="submit('customForm')">立即支付</button>
		</view>
	</view>
</template>

<script>
	import {mapActions} from 'pinia'
	import {userStore} from '@/stores/user'
	import {orderStore} from '@/stores/order'
	import {productStore} from '@/stores/product'
	export default {
		data() {
			return {
				customFormData: {
					selectIndex: 0
				},
				options: [],
				goods: [],
				user: {},
				// 自定义表单校验规则
				customRules: {
					selectIndex: {
						rules: [{
							required: true,
							errorMessage: '充值金额不能为空'
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
			...mapActions(productStore, ['getProductList']),
			fetch() {
				this.userInfo().then(resp => {
					this.user = resp.data
					uni.stopPullDownRefresh()
				})
				this.getProductList({type: 'point'}).then(resp => {
					if (resp.data) {
						this.goods = resp.data
						var options = [];
						resp.data.forEach((item, index) => {
							options.push({ text: item.title + ' - ' + item.price + '元', value: index })
						})
						this.options = options
					}
				})
			},
			submit(ref) {
				var that = this
				that.$refs[ref].validate().then(res => {
					var params = {
						"order_type": "point",
						"product_id":that.goods[that.customFormData.selectIndex].id,
						"amount": parseFloat(that.goods[that.customFormData.selectIndex].price)
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