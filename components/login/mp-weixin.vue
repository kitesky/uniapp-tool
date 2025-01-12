<template>
	<uni-card class="text-center">
		<view class="mb-3">
			<image mode="heightFix" style="height: 100px;" src="/static/logo.png"></image>
		</view>

		<view class="p-3">
			<button @click="getUserProfile" type="default">微信一键登录</button>
			<view style="font-size:14px;color: #999;margin-top: 10px;">
				<checkbox-group @change="onChangeCheckbox">
					<label>
						<checkbox :checked="checked" value="1" color="#00c800"
							style="transform:scale(0.7);border-radius: 50px;" />已阅读并同意
					</label>
					<text @click="onClickAgree" style="color:#00c800">《服务协议声明》</text>
				</checkbox-group>
			</view>
		</view>
	</uni-card>
</template>

<script>
	import {mapActions, mapState} from 'pinia'
	import {userStore} from '@/stores/user'
	export default {
		name: 'MPWexinLogin',
		data() {
			return {

			}
		},
		methods: {
			...mapActions(userStore, ['wxLogin']),
			...mapState(userStore, ['getUserMMID']),
			onChangeCheckbox(e) {
				if (e.detail.value) {
					this.checkedValue = parseInt(e.detail.value[0])
				}
			},
			getUserProfile() {
				var that = this

				if (that.checkedValue != 1) {
					that.toast.error('请同意服务协议')
					return false
				}

				uni.getUserProfile({
					desc: '用于完善会员资料',
					success: function(weixinRes) {
						that.login(weixinRes.userInfo)
					}
				})
			},
			login(userInfo) {
				var that = this
				// 开启加载loading
				uni.showLoading({
					mask: true
				})
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log('loginRes', loginRes)
						that.wxLogin({
							code: loginRes.code,
							avatar_url: userInfo.avatarUrl,
							nick_name: userInfo.nickName,
							invite_id: that.getUserMMID()
						}).then(res => {
							uni.reLaunch({
								url: '/pages/user/index'
							});
						})
					},
					fail(err) {
						console.log('err', err)
					},
					complete: function() {
						// 关闭loading
						uni.hideLoading()
					}
				});
			}
		}
	}
</script>

<style>

</style>