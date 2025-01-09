<template>
	<view>
		<view class="bg-body-secondary bg-opacity-75 px-3">
			<view>
				<uni-grid :column="2" :highlight="false" :show-border="false" :square="false">
					<uni-grid-item :index="0">
						<view class="vstack gap-3 py-3">
							<view class="f14">我的积分</view>
							<view class="hstack gap-2">
								<view class="fs-3 fw-bold">
								{{ user.score }}
								</view>
								<view @click="onExchange('score')">
									<text class="f12 border border-danger text-danger rounded-5 px-2 py-1">立即兑换</text>
								</view>
							</view>
						</view>
					</uni-grid-item>
					
					<uni-grid-item :index="1">
						<view class="vstack gap-3 py-3">
							<view class="f14">我的现金</view>
							<view class="hstack gap-2">
								<view>
									<text class="text-secondary">￥</text>
									<text class="fs-3 fw-bold">{{ user.reward }}</text>
								</view>
								<view>
									<text @click="onExchange('reward')" class="f12 border bg-danger text-white rounded-5 px-2 py-1">立即提现</text>
								</view>
							</view>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
			
			<view class="pb-3">
				<text class="text-secondary f12">兑换比率: 10000积分=1元现金</text>
			</view>
		</view>
		
		<view class="border-top">
			<!-- tab选项卡 -->
			<view class="hstack gap-3 px-3 bg-body-tertiary">
				<view 
					v-for="(item, index) in tabs" 
					:key="'tab-' + index" 
					:class="selectIndex == index ? 'bg-danger text-white' : ''"
					@click="onTabClick(index)"
				>
					<view class="p-2">{{item}}</view>
				</view>
			</view>
			
			<!-- 数据列表 -->
			<view
				v-for="(item, index) in items" :key="'order-' + index"
				class="d-flex justify-content-between align-items-baseline px-3 py-3 border-bottom"
			>
				<view>
					<view>{{item.title}}</view>
					<view class="f12 my-1">
						<text class="text-secondary">{{item.description}}</text> 
					</view>
					<view class="f12 text-secondary mb-1">{{item.created_at}}</view>
				</view>
				<view>
					<text :style="{color: item.type_color}" class="f16 fw-bold">{{item.type_text}}{{item.amount}}</text>
				</view>
			</view>
		</view>
		
        <view class="load-more">
            <uni-load-more :status="status" :content-text="contentText" />
        </view>
		
		<!-- 兑换现金弹框 -->
		<uni-popup ref="scoreExchange" type="dialog">
			<uni-popup-dialog type="bottom" cancelText="取消" confirmText="确认" title="提示" :content="popup.content" @confirm="onExchangeConfirm"
					@close="onExchangeClose" :duration="2000"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
import {mapActions} from 'pinia'
import {scoreStore} from '@/stores/score'
import {rewardStore} from '@/stores/reward'
import {userStore} from '@/stores/user'
export default {
	data() {
		return {
			user: {
				score: 0,
				reward: 0,
			},
			items: [],
			params: {'page': 1,'page_size': 10},
			status: 'loading',
			contentText: {
				contentdown: '上拉查看更多',
				contentrefresh: '正在加载中',
				contentnomore: '已经到底了'
			},
			tabs: ['积分明细', '现金明细'],
			selectIndex: 0,
			popup: {
				type: '',
				content: ''
			}
		}
	},
	beforeCreate() {
		this.auth.check()
	},
	onLoad() {
		this.fetch()
		this.fetchUser()
	},
	onReachBottom() {
		// 没有数据 停止加载
		if (this.status == 'noMore' || this.status == 'loading') {
			return false
		}

		this.status = 'loading'
		this.params.page++

		this.fetch()
	},
	onPullDownRefresh() {
		this.params.page = 1
		this.status = 'more'
		this.items = []
		this.fetch()
		this.fetchUser()
	},
	methods: {
		...mapActions(scoreStore, ['getScoreList', 'scoreExchange']),
		...mapActions(rewardStore, ['getRewardList', 'rewardExchange']),
		...mapActions(userStore, ['userInfo']),
		onTabClick(index) {
			this.selectIndex = index
			this.params.page = 1
			this.items = []
			this.status = 'more'
			this.fetch()
		},
		onExchange(type) {
			this.popup.type = type
			switch (type) {
				case 'score':
					this.popup.content = '确定要将积分兑换为现金吗?'
					break;
				case 'reward':
					this.popup.content = '确定要提现操作吗?'
					break;
			}
			
			this.$refs.scoreExchange.open()
		},
		onExchangeConfirm() {
			var that = this
			switch (that.popup.type) {
				case 'score':
					that.scoreExchange({amount: that.user.score}).then(resp => {
						if (resp.code == 200) {
							that.toast.info('提交成功')
							that.fetchUser()
						} else {
							that.toast.error(resp.message)
						}
					})
					break;
				case 'reward':
					that.rewardExchange({amount: that.user.reward}).then(resp => {
						if (resp.code == 200) {
							that.toast.info('提交成功')
							that.fetchUser()
						} else {
							that.toast.error(resp.message)
						}
					})
					break;
			}
		},
		onExchangeClose() {
			this.toast.info('已取消操作')
		},
		fetch() {
			switch (this.selectIndex) {
				case 0:
					this.fetchScore()
					break
				case 1:
					this.fetchReward()
					break
			}
		},
		fetchUser() {
			// 查询用户
			this.userInfo().then(resp => {
				if (resp.data) {
					this.user = resp.data
				}
				uni.stopPullDownRefresh()
			})
		},
		fetchScore() {
			this.getScoreList(this.params).then(resp => {
				// 追加数据
				resp.data.items.forEach(item => {
					this.items.push(item)
				})

				// 修改状态
				if (this.items.length < resp.data.total) {
					this.status = 'more'
				}

				if (this.items.length == resp.data.total) {
					this.status = 'noMore'
				}
				
				uni.stopPullDownRefresh()
			})
		},
		fetchReward() {
			this.getRewardList(this.params).then(resp => {
				// 追加数据
				resp.data.items.forEach(item => {
					this.items.push(item)
				})

				// 修改状态
				if (this.items.length < resp.data.total) {
					this.status = 'more'
				}

				if (this.items.length == resp.data.total) {
					this.status = 'noMore'
				}
				
				uni.stopPullDownRefresh()
			})
		}
	}
}
</script>

<style>
</style>