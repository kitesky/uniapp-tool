<template>
	<view class="m-3">
		<uni-forms ref="customForm" label-width="120" label-position="top" :rules="customRules" :modelValue="customFormData">
			<uni-forms-item label="收款人姓名" required name="name">
				<uni-easyinput v-model="customFormData.name" placeholder="请输入姓名" />
			</uni-forms-item>
			<uni-forms-item label="支付宝账号" required name="account">
				<uni-easyinput v-model="customFormData.account" placeholder="请输入支付宝账号" />
			</uni-forms-item>
		</uni-forms>
		
		<button class="bg-danger" type="primary" @click="submit('customForm')">提交</button>
	</view>
</template>

<script>
	import {mapActions} from 'pinia'
	import {userStore} from '@/stores/user'
	import request from '@/utils/request'
	export default {
		data() {
			return {
				pay_type: 'alipay',
				customFormData: {
					name: '',
					account: '',
				},
				// 自定义表单校验规则
				customRules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					account: {
						rules: [{
							required: true,
							errorMessage: '支付宝账号不能为空'
						}]
					},
				},
			}
		},
		beforeCreate() {
			this.auth.check()
		},
		onLoad(option) {
			this.pay_type = option.pay_type
			this.fetch()
		},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			this.$refs.customForm.setRules(this.customRules)
		},
		onPullDownRefresh() {
			this.fetch()
		},
		methods: {
			...mapActions(userStore, ['paymentAccount', 'setPaymentAccount']),
			fetch() {
				this.paymentAccount(this.pay_type).then(resp => {
					this.customFormData = resp.data
					uni.stopPullDownRefresh()
				})
			},
			submit(ref) {
				var that = this
				this.$refs[ref].validate().then(res => {
					res.pay_type = that.pay_type
					that.setPaymentAccount(res).then(resp => {
						that.toast.success('设置成功')
					})
				}).catch(err => {
					console.log('err', err);
				})
			},
		}
	}
</script>

<style>
</style>