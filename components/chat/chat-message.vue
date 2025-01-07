<template>
	<view class="text">{{ curText }}</view>
</template>

<script>
	export default {
		name:"ChatMessage",
		props: {
			content: { // 文本内容
				type: String,
				required: true
			},
			speed: { // 打字的速度
				type: Number,
				default: 100
			},
			startIndex: { // 默认从哪个索引开始
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				curIndex: -1, // 当前展示文字下标
				isPause: false, // 是否暂停打字
				timer: null, // 打字定时器
			}
		},
		computed: {
			curText() {
				return this.content.substring(0, this.curIndex)
			}
		},
		watch: {
			content(v) {
				v && this.reset()
			}
		},
		created() {
			this.start()
		},
		methods: {
			// 开始打字
			start(){
				this.curIndex = this.startIndex - 1
				this.writeText()
			},
			// 暂停打字
			pause() {
				this.isPause = true
				clearTimeout(this.timer)
				this.$emit('pause')
			},
			// 继续打字
			continue(){
				this.isPause = false
				this.writeText()
			},
			// 重新打字
			reset(){
				this.isPause = false
				clearTimeout(this.timer)
				this.start()
			},
			// 打字效果实现
			writeText() {
				this.curIndex++
				if (this.curIndex > this.content.length) {
					this.isPause = true
					this.$emit('finish')
				}
			
				if (!this.isPause) {
					this.timer = setTimeout(this.writeText, this.speed)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text {
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #3A4354;
		line-height: 42rpx;
		text-align: justify;
	}
</style>
