<template>
	<view class="bg-page-color vh-100">	
		<view class="mx-3 py-3">
			<view class="p-3 rounded-3 bg-body-tertiary">
				<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData" label-position="top">
					<template v-for="(item,index) in data.form_schemas" :key="'input-' + index">
						<uni-forms-item label-width="100%" :label="item.title" :required="item.required" :name="item.name">
							<uni-easyinput v-if="item.field_type == 'input'" type="text" trim="all" v-model="customFormData[item.name]" :placeholder="item.placeholder"></uni-easyinput>
							<uni-number-box  v-if="item.field_type == 'number'" v-model="customFormData[item.name]" :min="100" :max="5000" :step="100"></uni-number-box>
							<uni-easyinput v-if="item.field_type == 'textarea'" type="textarea" autoHeight trim="all" v-model="customFormData[item.name]" :placeholder="item.placeholder"></uni-easyinput>
							<uni-data-select v-if="item.field_type == 'select'" v-model="customFormData[item.name]" :localdata="item.options" :label="item.title"></uni-data-select>
						</uni-forms-item>
					</template>
				</uni-forms>
				
				<button class="bg-danger mt-3" type="primary" @click="submit('customForm')">立即提交</button>
				
				<view class="mt-3 f14 text-secondary">
					本次生成<text class="text-primary">会员免费</text>，<text class="fw-bold">非会员</text>按次扣费，请确保余额充足。费用: <text class="text-danger">{{data.price}}元/次</text>
				</view>
			</view>
			
			<view class="mt-3">
				<view class="p-3 rounded-3 bg-body-tertiary">
					<view class="f16 fw-bold text-danger">温馨提示</view>
					<view class="mt-3 f14 text-secondary" v-html="data.content"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapActions, mapState} from 'pinia'
	import {userStore} from '@/stores/user'
	import {toolStore} from '@/stores/tool'
	export default {
		components: {},
		data() {
			return {
				id: 0,
				title: '',
				data: [],
				// 自定义表单数据
				customFormData: {

				},
				// 自定义表单校验规则
				customRules: {
					// amount: {
					// 	rules: [{
					// 		required: true,
					// 		errorMessage: '充值金额不能为空'
					// 	}]
					// },
				},
				mmid: null,
			}
		},
		onLoad(option) {
			// 自己的mmidd
			this.mmid = this.getUserMMID()
			// 别人分享的mmid
			this.setInviteID(option.invite_id)
			
			this.id = option.id
			this.fetch()
			console.log('query option', option, 'mmid', this.mmid)
		},
		onShareAppMessage() {
			return {
				title: this.title,
				path: '/pages/tool/text?id=' + this.id + '&invite_id=' + this.mmid,
			}
		},
		onShareTimeline() {
			return {
				title:  this.title,
				query: 'id=' + this.id + '&invite_id=' + this.mmid ,
			}
		},
		methods: {
			...mapActions(toolStore, ['getTool', 'toolHandler']),
			...mapActions(userStore, ['setInviteID']),
			...mapState(userStore, ['getUserMMID']),
			fetch() {
				this.getTool(this.id).then(resp => {
					this.data = resp.data
					this.title = resp.data.title
					uni.setNavigationBarTitle({ title: this.title })
					this.setCustomData(resp.data.form_schemas)
					uni.stopPullDownRefresh()
				})
			},
			setCustomData(form_schemas) {
				if (form_schemas.length > 0) {
					var customRules = {}
					var customFormData = {}
					form_schemas.forEach(function(item) {
						if (item.required) {
							var rules = [{
								required: item.required,
								errorMessage: item.error_message
							}]
							var obj = { rules: rules }
							customRules[item.name] = obj
						}
						
						customFormData[item.name] = item.value
					});
					this.customRules = customRules
					this.customFormData = customFormData
				}
			},
			submit(ref) {
				var that = this
				that.$refs[ref].validate().then(res => {
					that.toast.loading('请求中···')
					console.log(res)
					var formData = {
						code: this.data.code,
						data: JSON.stringify(that.customFormData)
					}
					
					that.toolHandler(formData).then(resp => {
						that.toast.hideLoading()
						// data = resp.data
						console.log(resp.code, resp.data)
						if (resp.code != 200) {
							that.toast.error(resp.message)
							return
						}
						
						// 跳转到结果页面
						uni.navigateTo({url: '/pages/activity/detail?uuid=' + resp.data.uuid});
					})
				}).catch(err => {
					that.toast.hideLoading()
					console.log('err', err);
				})
			}
		}
	}
</script>

<style>
	.bg-page-color {
		background: linear-gradient(to bottom, #d8ebf9 0%, #fff 100%);
	}
</style>