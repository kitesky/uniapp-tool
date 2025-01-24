<template>
	<view>
		<view>
			<view
				v-for="(item, index) in items" :key="'point-' + index"
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
	</view>
</template>

<script>
import {mapActions} from 'pinia'
import {pointStore} from '@/stores/point'
export default {
	data() {
		return {
			items: [],
			params: {'page': 1,'page_size': 10},
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
		...mapActions(pointStore, ['getPointList']),
		fetch() {
			this.getPointList(this.params).then(resp => {
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