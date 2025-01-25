<template>
	<view>
		<!-- 菜单列表 -->
		<view>
			<view v-for="(item, index) in navList" :key="'nav' + index">
				<navigator animation-type="pop-in" animation-duration="300" :url="item.link">
					<view class="d-flex justify-content-between align-items-center p-3">
						<view class="d-flex justify-content-center align-items-center">
							<image style="width: 22px; height: 22px;" mode="heightFix" :src="item.icon"></image>
							<view class="ms-2">{{item.title}}</view>
						</view>
						<view>
							<text v-if="item.text" class="text-secondary f14">{{item.text}}</text>
							<uni-icons v-else  color="#6c757d" type="right" size="16"></uni-icons>
						</view>
					</view>
				</navigator>
			</view>
		</view>
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
				navList: [
					{title: "支付宝设置", icon: config.icons.activity, link: "/pages/user/payment-account?pay_type=alipay", text: ""},
				],
			}
		},
		onShow() {	
			this.auth.check()
			this.fetch()
		},
		onLoad() {},
		methods: {
			...mapActions(userStore, ['userInfo']),
			fetch() {
				this.userInfo().then(resp => {
					if (resp.data) {
						this.user = resp.data
					}
					uni.stopPullDownRefresh()
				})
			},
		}
	}
</script>

<style>
</style>