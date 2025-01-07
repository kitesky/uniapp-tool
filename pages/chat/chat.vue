<template>
	<view>
		<!-- <view class="mx-3">
			<view class="mt-3">我是DeepSeek, 很高兴见到你！</view>
			<view class="text-secondary mt-2">
				我可以帮你写代码，写作各种创意内容，请把你的任务交给我吧...
			</view>
		</view> -->

		<!-- 聊天内容列表 -->
		<scroll-view scroll-y="true" class="vh100">
			<view class="d-flex flex-column gap-3 mx-3 my-3" :style="{height: scrollHeight + 'px'}">
				<template v-for="(item,index) in 5" :key="'chat-item-' + index">

					<!-- 系统用户 -->
					<view class="d-flex gap-2" style="margin-right: 60px;">
						<view>
							<image class="rounded-circle border shadow" style="width: 40px; height: 40px;"
								mode="heightFix" :src="icons.avatarSystem"></image>
						</view>
						<view class="bg-body-tertiary rounded-3 p-2">
							我可以帮你写代码，写作各种创意内容，请把你的任务交给我吧...
							<ChatMessage content="2342334234....fdsa...342..2@#$@#" :speed="50"></ChatMessage>
						</view>
					</view>

					<!-- 用户 -->
					<view class="d-flex flex-row-reverse gap-2" style="margin-left: 60px;">
						<view>
							<image class="rounded-circle border shadow" style="width: 40px; height: 40px;"
								mode="heightFix" :src="icons.avatarGirl"></image>
						</view>
						<view class="bg-primary text-white rounded-3 p-2">我可以帮你写代码，写作各种创意内容，请把你的任务交给我吧...</view>
					</view>

				</template>
			</view>
		</scroll-view>

		<!-- 聊天输入框 -->
		<view class="chat-input fixed-bottom mt-5">
			<ChatInput @custom-event="onSendEvent"></ChatInput>
		</view>
	</view>
</template>

<script>
	import config from '@/utils/config'
	import CustomNavbar from '@/components/custom-navbar'
	import ChatInput from '@/components/chat/chat-input'
	import ChatMessage from '@/components/chat/chat-message'
	export default {
		components: {
			ChatMessage,
			CustomNavbar,
			ChatInput
		},
		data() {
			return {
				icons: config.icons,
				scrollHeight: 0,
				val: `塘中的月色并不均匀；但光与影有着和谐的旋律，如梵婀玲上奏着的名曲。`,
				list: [], // 对话列表
			}
		},
		mounted() {
			this.getScrollHeight()
			console.log(this.scrollHeight)
		},
		onLoad() {
		},
		methods: {
			onSendEvent(args) {
				// 接收对话框内输入的内容
				console.log(111, args)
			},
			getScrollHeight() {
				var that = this
				const query = uni.createSelectorQuery().in(this);
				query.select('.chat-input').boundingClientRect(data => {
					if (data) {
						// data.height 就是元素的高度
						console.log('元素高度:', data.height);
						this.scrollHeight = uni.getSystemInfoSync()['windowHeight'] - data.height
						console.log(this.scrollHeight)
						return this.scrollHeight
					}
				}).exec();
			},
		}
	}
</script>

<style>

</style>