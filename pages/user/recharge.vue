<template>
	<view>
		<view class="bg-primary text-white p-3">
			<view class="mb-1">当前余额: ￥{{user.balance}}</view>
			<view>充值账户: {{user.mmid}}</view>
		</view>
		
		<view class="mx-3 mt-3">
			<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData" label-position="top">
				<uni-forms-item label="充值金额" required name="amount">
					<uni-easyinput type="digit" prefixIcon="search" v-model="customFormData.amount" placeholder="请输入充值金额" />
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
	import {mapActions} from 'pinia'
	import {userStore} from '@/stores/user'
	export default {
		data() {
			return {
				customFormData: {
					amount: 5,
					option: 5
				},
				options: [
					{ text: '5元', value: 5 },
					{ text: '20元', value: 20 },
					{ text: '50元', value: 50 },
					{ text: '100元', value: 100 }
				],
				user: {},
				// 自定义表单校验规则
				customRules: {
					amount: {
						rules: [{
							required: true,
							errorMessage: '充值金额不能为空'
						},{
							validateFunction:function(rule,value,data,callback){
								if (value < 1) {
									callback('充值最低金额为1元')
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
			...mapActions(userStore, ['userInfo', 'setProfile']),
			fetch() {
				this.userInfo().then(resp => {
					this.user = resp.data
					uni.stopPullDownRefresh()
				})
			},
			submit(ref) {
				var that = this
				this.$refs[ref].validate().then(res => {
					that.setProfile(res).then(resp => {
						that.toast.success('资料设置成功')
					})
				}).catch(err => {
					console.log('err', err);
				})
			},
		},
		watch: {
			"customFormData.option": {
				handler(newVal, oldVal) {
					this.customFormData.amount = newVal
					console.log(newVal)
				},
				immediate: true,
				deep: true
			}
		}
	}
</script>

<style>
</style>