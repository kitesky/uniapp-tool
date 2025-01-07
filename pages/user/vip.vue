<template>
	<view>
		<view class="bg-body-tertiary p-3">
			<view class="d-flex justify-content-start align-items-center">
				<image class="rounded-circle" style="width: 60px; height: 60px;" mode="scaleToFill" :src="user.avatar"></image>
				<view class="ms-2">
					<view class="f16 fw-bold">{{user.name}}</view>
					<view class="d-flex justify-content-start text-secondary mt-2 gap-2 f12">
						<view v-show="user.vip.expire_time" class="f12">
							<uni-dateformat :date="user.vip.expire_time" format="yyyy年MM月dd日到期"></uni-dateformat>
						</view>
					</view>
				</view>
			</view>
		</view>
	
		<!-- 产品 -->
		<view class="mt-3 mx-3">
			<view class="fs-6 fw-bold mb-3">会员开通方案</view>
			<uni-grid :column="goods.length" :highlight="true" :show-border="true" borderColor="#AAAAAA" :square="false" @change="onChange">
				<uni-grid-item v-if="goods.length > 0" :index="index" v-for="(item,index) in goods" :key="'good-' + index">
					<view :class="selectIndex == index ? 'bg-danger-subtle p-3 text-center' : 'p-3 text-center' ">
						<view>{{item.title}}</view>
						<view class="mt-3">
							<text class="text-secondary">￥</text>
							<text class="fs-3">{{item.price}}</text>
						</view>
					</view>
				</uni-grid-item>
			</uni-grid>
			
			<view class="mt-3">
				<button @click="submit" type="warn">支付<text class="fw-bold">{{goods[selectIndex].price}}</text>元开通</button>
			</view>
		</view>
		
		<!-- 会员权益 -->
		<view class="mt-3 mx-3">
			<view class="fs-6 fw-bold mb-3">会员权益</view>
			<uni-grid :column="2" :highlight="false" :show-border="false" :square="false">
				<uni-grid-item :index="index" v-for="(item,index) in user.vip.benefits" :key="'v-' + index">
					<view class="hstack mb-3">
						<image style="width: 30px; height: 30px;" mode="heightFix" :src="item.icon"></image>
						<view class="ms-2">
							<view class="mb-1 fw-bold text-danger">{{item.title}}</view>
							<view class="f14 text-secondary">{{item.description}}</view>
						</view>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script>
	import {mapActions} from 'pinia'
	import {userStore} from '@/stores/user'
	import {orderStore} from '@/stores/order'
	import {productStore} from '@/stores/product'
	import config from '@/utils/config'
	export default {
		data() {
			return {
				icons: config.icons,
				selectIndex: 0,
				user: {
					name: '',
					score: 0,
					balance: 0,
					vip: {
						expire_time: null,
						active: 'N',
						benefits: [],
					}
				},
				goods: [
					{price: 19, title: '1个月', code: 'vip:month:1'},
					{price: 50, title: '3个月', code: 'vip:month:3'},
					{price: 99, title: '6个月', code: 'vip:month:99'},
					{price: 159, title: '12个月', code: 'vip:month:12'},
				]
			}
		},
		onLoad() {
			this.fetch()
		},
		onPullDownRefresh() {
			// 刷新用户信息
			this.fetch()
		},
		methods: {
			...mapActions(userStore, ['userInfo']),
			...mapActions(orderStore, ['createOrder']),
			...mapActions(productStore, ['getProductList']),
			fetch() {
				this.userInfo().then(resp => {
					this.user = resp.data
				})
				
				this.getProductList({type: 'vip'}).then(resp => {
					this.goods = resp.data
				})
				
				uni.stopPullDownRefresh()
			},
			onChange(e) {
				this.selectIndex = e.detail.index
			},
			submit(ref) {
				var that = this
				var params = {
					"order_type": "product",
					"product_id":that.goods[that.selectIndex].id,
					"amount": parseFloat(that.goods[that.selectIndex].price)
				}
				that.createOrder(params).then(resp => {
					// data = resp.data
					console.log(resp.code, resp.data)
					if (resp.code != 200) {
						that.toast.error(resp.message)
						return
					}
		
					uni.requestPayment({
						provider: 'wxpay',
						...resp.data,
						success: function (res) {
							that.toast.success('充值成功')
							that.fetch()
						},
						fail: function (err) {
							console.log('fail:' + JSON.stringify(err))
							that.toast.info('取消支付')
						}
					});
				})
			},
		}
	}
</script>

<style>

</style>
