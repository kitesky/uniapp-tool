<template>
	<view class="bg-body-secondary bg-opacity-75" @click="onSearchFocus">
		<uni-search-bar radius="100" maxlength="100" :focus="false" readonly
			placeholder="搜索关键词..." clearButton="none" cancelButton="none">
		</uni-search-bar>
	</view>
</template>

<script>
	export default {
		name:"Search",
		data() {
			return {
				
			};
		},
		methods: {
			onSearchFocus() {
				console.log(1111)
				uni.navigateTo({
					url: '/pages/search/search'
				});
			},
		}
	}
</script>

<style>

</style>