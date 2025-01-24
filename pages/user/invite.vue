<template>
	<view class="vh-100 bg-color">
		<view class="mx-3">
			<view class="hstack py-3">
				<view class="vstack gap-2">
					<view class="f16">
						邀请好友
					</view>
					<view class="fs-5">
						领取<text class="text-danger fw-bold">积分和现金奖励</text>
					</view>
					<view class="f12 text-secondary">
						积分兑换现金，现金可以提现
					</view>
				</view>
				<view><image src="https://api.idcd.com/assets/images/bg/invite-bg.png" mode="widthFix" style="width: 200rpx;"></image></view>
			</view>

			<view>
				<view class="d-flex flex-column text-center gap-3 border py-3">
					<view @click="showDrawer('showLeft')">
						<view class="fw-bold mb-2">
							已邀请人数
						</view>
						<view class="fs-3 fw-bolder text-danger">
							<text class="text-decoration-underline">{{ invite.count }}</text>
						</view>
					</view>

					<view>
						<image :show-menu-by-longpress="true" :src="invite.invite_qrcode" mode="widthFix" style="width: 300rpx;"></image>
						<view class="f12 text-muted">长按图片可保存或发送</view>
						<view class="d-flex justify-content-center align-items-center gap-2 mt-3">
							<text>邀请码:</text>
							<text class="text-danger"> {{invite.invite_id}} </text>
							<image @click="copyMMID(invite.invite_id.toString())" style="width: 14px; height: 14px;" :src="icons.copy"></image>
						</view>
					</view>
				</view>

				<view class="border mt-3 p-3">
					<view class="flex justify-between align-center">
						<text class="fw-bold">邀请奖励：</text>
					</view>
					<view class="mt-3 vstack gap-2">
						<view v-for="(item,index) in invite.reward_list" :key="'reward-' + index" class="text-secondary f14">
							<text>{{ index + 1 }}</text> 
							<text class="ms-2">{{ item }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 左侧抽屉 -->
		<uni-drawer ref="showLeft" mode="left">
			<view class="close">
				<text @click="closeDrawer('showLeft')" class="d-block text-center py-2">关闭</text>
			</view>
			
			<view>
				<uni-list>
					<uni-list-item 
						v-for="(item,index) in invite.user_list" :key="'invite-' + index" 
						:title="item.name" 
						:note="item.mmid"
						:thumb="item.avatar"
						thumb-size="lg"
					/>
				</uni-list>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import {mapActions} from 'pinia'
	import {userStore} from '@/stores/user'
	import config from '@/utils/config'
	export default {
		data() {
			return {
				icons: config.icons,
				invite: {
					count: 0,
					invite_id: 0,
					invite_qrcode: '',
					user_list: [],
					reward_list: [],
				},
				left: false,
			};
		},
		onLoad() {
			this.fetch()
		},
		methods: {
			...mapActions(userStore, ['userInvite']),
			fetch() {
				this.userInvite().then(resp => {
					if (resp.data) {
						this.invite = resp.data
					}
				})
			},
			copyMMID(text) {
				var that = this
				uni.setClipboardData({
					data: text,
					success: function () {
						that.toast.success('复制成功')
					},
					fail(err) {
						that.toast.error(err.errMsg)
					}
				})
			},
			// 打开窗口
			showDrawer(e) {
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
		},
	}
</script>

<style lang="scss" scoped>
	.bg-color {
		background: linear-gradient(to bottom, #d8ebf9 0%, #fff 100%);
	}
</style>