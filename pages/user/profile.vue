<template>
	<view class="m-3">
		<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData">
			<uni-forms-item label="头像">
				<uni-file-picker @select="onImageSelect" fileMediatype="image" :image-styles="imageStyles" v-model="avatar" :del-icon="false" disable-preview limit="1"></uni-file-picker>
			</uni-forms-item>
			<uni-forms-item label="昵称" required name="name">
				<uni-easyinput v-model="customFormData.name" placeholder="请输入姓名" />
			</uni-forms-item>
			<uni-forms-item label="性别" name="gender" required>
				<uni-data-checkbox v-model="customFormData.gender" :localdata="genders" />
			</uni-forms-item>
			<uni-forms-item label="自我介绍" name="bio">
				<uni-easyinput type="textarea" v-model="customFormData.bio" maxlength="64" placeholder="请输入自我介绍" />
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
				avatar: {
					name:"avatar.png",
					extname:"png",
					url:"",
				},
				imageStyles: {
					width: 100,
					height: 100,
					border: {
						radius: '50%'
					}
				},
				customFormData: {
					name: '',
					sex: 'female',
					bio: '',
				},
				genders: [
					{ text: '男', value: 'male' },
					{ text: '女', value: 'female' },
				],
				// 自定义表单校验规则
				customRules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '昵称不能为空'
						}]
					},
					sex: {
						rules: [{
							required: true,
							errorMessage: '性别不能为空'
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
			onImageSelect(e) {
				console.log('upload',e)
				request.uploadFile('/upload/avatar', e.tempFilePaths[0], (res) => {
					console.log(res)
				})
			},
			fetch() {
				this.userInfo().then(resp => {
					this.customFormData = resp.data
					this.avatar.url = resp.data.avatar
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
		}
	}
</script>

<style>
</style>