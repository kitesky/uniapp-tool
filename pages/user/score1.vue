<template>
	<view>
		<view class="border-bottom">
			<view class="py-3">
				<uni-segmented-control 
					:current="current" 
					:values="orderTypes" 
					style-type="text"
					active-color="#FF4136" 
					@clickItem="onClickItem" 
				/>
			</view>
		</view>
		
		<view>
			<view v-if="current === 0">
				<view class="d-flex justify-content-between align-items-baseline px-3 py-3 border-bottom">
					<view>
						<view class="mb-1">视频特效生成</view>
						<view class="f12">
							<text class="text-secondary">消费支出</text> 
						</view>
						<view class="f12 text-secondary mb-1">12-16 10:10</view>
					</view>
					<view>
						<text class="f16 fw-bold text-danger">+ 0.07</text>
					</view>
				</view>
			</view>
			<view v-if="current === 1"><text class="content-text">选项卡2的内容</text></view>
			<view v-if="current === 2"><text class="content-text">选项卡3的内容</text></view>
		</view>
	</view>
</template>

<script>
import {mapActions} from 'pinia'
import {userStore} from '@/stores/user'
export default {
	data() {
		return {
			orderTypes: ['全部', '支出', '充值', '提现', '收入', '退款'],
			current: 0,
		}
	},
	beforeCreate() {
		// this.auth.check()
	},
	onLoad() {
		// this.fetch()
		// uni.reLaunch({ url: '/pages/auth/login' })
	},
	onPullDownRefresh() {
		// 刷新用户信息
		// this.fetch()
		uni.stopPullDownRefresh()
	},
	methods: {
		...mapActions(userStore, ['userInfo', 'setProfile']),
		fetch() {
			this.userInfo().then(resp => {
				this.user = resp.data
				uni.stopPullDownRefresh()
			})
		},
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex
			}
		}
	}
}
</script>

<style>
</style>