<template>
	<view>test</view>
</template>

<script>
	import {mapActions} from 'pinia'
	import {taxonomyStore} from '@/stores/taxonomy'
	import Search from '@/components/search';
	export default {
		components: {
			Search
		},
		data() {
			return {
				items: [],
				selectIndex: 0,
				list: [],
			}
		},
		onLoad() {
			this.fetch()
		},
		onPullDownRefresh() {
			this.fetch()
		},
		methods: {
			...mapActions(taxonomyStore, ['taxonomy']),
			fetch() {
				this.taxonomy().then(resp => {
					this.items = resp.data
					this.list = resp.data[this.selectIndex].items
					console.log('items', this.items)
					uni.stopPullDownRefresh()
				})
			},
			onTabClick(index) {
				this.selectIndex = index
				this.list = this.items[index].items
			},
			onToolClick(item) {
				uni.navigateTo({
					url: item.url
				});
			}
		}
	}
</script>

<style>
</style>