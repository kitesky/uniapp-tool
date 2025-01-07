<template>
	<view>
		<v-tabs v-model="current" bgColor="#DDDDDD" lineColor="#FF4136" padding="8px" activeColor="#FF4136" field="name" :fixed="true" :tabs="tabs" @change="onChangeTab"></v-tabs>
		
		<view>
			<view
				v-for="(item, index) in items" :key="'order-' + index"
				class="d-flex justify-content-between align-items-baseline px-3 py-3 border-bottom"
			>
				<view>
					<view class="mb-2">{{item.title}}</view>
					<view class="f12 text-secondary mb-1">{{item.created_at}}</view>
					<view class="hstack gap-1">
						<text class="text-secondary f12">{{item.order_no}}</text>
						<image @click="copyOrderNo(item.order_no)" style="width: 12px; height: 12px;" :src="icons.copy"></image>
					</view>
					<view class="mt-2">
						<text class="text-secondary f12">{{item.order_type_text}}</text> 
						<text class="f14 ms-3">￥{{item.pay_amount}}</text>
					</view>
				</view>
				<view>
					<text :style="{color: item.status_color}" class="f11 px-2 py-1 border rounded-5">{{item.status_text}}</text>
				</view>
			</view>
		</view>
		
        <view class="load-more">
            <uni-load-more :status="status" :content-text="contentText" />
        </view>
	</view>
</template>

<script>
import {mapActions} from 'pinia'
import {orderStore} from '@/stores/order'
import config from '@/utils/config'
export default {
	data() {
		return {
			icons: config.icons,
			tabs: [
				{ id: 0, name: '全部', disabled: false },
				{ id: 1, name: '待支付', disabled: false },
				{ id: 2, name: '已付款', disabled: false },
				{ id: 3, name: '交易成功', disabled: false },
				{ id: 4, name: '订单关闭', disabled: false },
				{ id: 5, name: '订单取消', disabled: false },
				{ id: 6, name: '已退款', disabled: false }
			],
			statusOptions : ['all', 'pending', 'paid', 'completed', 'closed', 'canceled', 'refunded'],
			current: 0,
			items: [],
			params: {'order_status': 'all','page': 1,'page_size': 10},
			status: 'loading',
			contentText: {
				contentdown: '上拉查看更多',
				contentrefresh: '正在加载中',
				contentnomore: '已经到底了'
			},
		}
	},
	beforeCreate() {
		this.auth.check()
	},
	onLoad() {
		this.fetch()
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
	},
	methods: {
		...mapActions(orderStore, ['getOrderList']),
		fetch() {
			this.getOrderList(this.params).then(resp => {
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
		onChangeTab(index) {
			this.current = index
			this.params.order_status = this.statusOptions[index]
			this.params.page = 1
			this.items = []
			this.status = 'more'
			this.fetch()
		},
		copyOrderNo(text) {
			var that = this
			uni.setClipboardData({
				data: text,
				success: function () {
					that.toast.success('复制成功')
				}
			})
		}
	}
}
</script>

<style>
</style>