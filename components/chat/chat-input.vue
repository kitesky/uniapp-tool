<template>
	<view class="rounded-3 p-3 bg-body-tertiary">
		<view class="flex-grow-1">
			<!-- <uni-easyinput type="input" focus :clearable="false" :inputBorder="false" v-model="value" placeholder="你有什么想知道的,快来问问我"></uni-easyinput> -->
			<input v-model="value" class="py-2 text-secondary" focus placeholder="你有什么想知道的,快来问问我" />
		</view>
		<view class="hstack gap-3 mt-2">
			<view class="f14 me-auto">
				<view class="rounded-3 border px-2 py-1 text-primary">开启新对话</view>
			</view>
			
			<view class="d-flex justify-content-end align-content-center text-center">
				<image @click="onSendMessage" style="width: 30px; height: 30px;" mode="widthFix" :src="sendIcon"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/utils/config'
	export default {
		name:"ChatInput",
		data() {
			return {
				icons: config.icons,
				value: '',
				sendIcon: config.icons.send
			};
		},
		methods: {
			onSendMessage() {
				if (this.value == '') {
					return
				}
				
				this.$emit('custom-event', {content: this.value})

				// 处理完事件后，清空输入框
				this.value = ''
			},
		},
		watch: {
			value: {
				handler(newValue, oldValue) {
					console.log('chat input message', newValue, oldValue)
					this.value = newValue.trim()
					if (this.value != '') {
						this.sendIcon = this.icons.sendFill
					} else {
						this.sendIcon = this.icons.send
					}
				},
				deep: true,
				immediate:true
			}
		},
	}
</script>

<style>
.uni-easyinput__content-textarea {
	height: 24px !important;
}
</style>