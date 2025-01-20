<template>
	<uni-card class="text-center">
		<view class="my-3">
			<image mode="heightFix" style="height: 80px;" src="/static/logo.png"></image>
		</view>

		<view class="p-3">
			<button @click="login" type="default">微信一键登录</button>
			<!-- <view style="font-size:14px;color: #999;margin-top: 10px;">
				<checkbox-group @change="onChangeCheckbox">
					<label>
						<checkbox :checked="checked" value="1" color="#00c800"
							style="transform:scale(0.7);border-radius: 50px;" />已阅读并同意
					</label>
					<text @click="onClickAgree" style="color:#00c800">《服务协议声明》</text>
				</checkbox-group>
			</view> -->
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
		onLoad() {
			this.login()
		},
		methods: {
			...mapActions(userStore, ['wxLogin']),
			...mapState(userStore, ['getInviteID']),
			onChangeCheckbox(e) {
				if (e.detail.value) {
					this.checkedValue = parseInt(e.detail.value[0])
				}
			},
			login() {
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
							avatar_url: '',
							nick_name: '',
							invite_id: that.getInviteID()
						}).then(res => {
							uni.navigateBack({ delta: 1 });
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