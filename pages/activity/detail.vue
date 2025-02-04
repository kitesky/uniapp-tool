<template>
	<view class="bg-color vh-100">
		<view class="p-3">
			<view class="bg-body-tertiary rounded-3 p-3">
				<view class="my-2" v-for="(item, index) in data.form_schemas" :key="'field-' + index">
					<text>{{item.title}}:</text>
					<text class="ms-2 text-secondary">{{item.value}}</text>
				</view>
				<button size="default" type="default"
					open-type="share"
					style="color:#ffffff;backgroundColor:#1AAD19;borderColor:#1AAD19"
					hover-class="is-hover">分享给好友</button>
			</view>
			
			<view class="mt-3 bg-body-tertiary rounded-3 p-3">
				<view class="d-flex justify-content-between align-items-center">
					<text class="fw-bold">内容信息</text>
					<text @click="copyContent(data.content)" class="f14 rounded-5 border border-danger text-danger px-2 py-1">复制全文</text>
				</view>
				<view class="mt-3 text-secondary">
					<uni-easyinput maxlength="-1" type="textarea" autoHeight v-model="data.content"></uni-easyinput>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapActions} from 'pinia'
	import {activityStore} from '@/stores/activity'
	export default {
		data() {
			return {
				uuid: "",
				data: {
					form_schemas: [],
					content_type: "",
					content:""
				}
			}
		},
		onLoad(option) {
			this.uuid = option.uuid
			this.fetch()
		},
		methods: {
			...mapActions(activityStore, ['getActivity']),
			fetch() {
				this.getActivity(this.uuid).then(resp => {
					if (resp.data) {
						this.data = resp.data
						// 解析json
						this.data.form_schemas = JSON.parse(this.data.form_schemas)
					}
					uni.stopPullDownRefresh()
				})
			},
			copyContent(text) {
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
			}
		}
	}
</script>

<style>
	.bg-color {
		background: linear-gradient(to bottom, #d8ebf9 0%, #fff 100%);
	}
</style>
