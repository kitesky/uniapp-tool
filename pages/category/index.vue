<template>
	<view>
		<Search></Search>

		<view class="bg-body-secondary">
			<uni-row>
				<uni-col :span="6">
					<view class="bg-body-tertiary text-center vh100">
						<view
							v-for="(item, index) in items" 
							:key="'taxonomy' + index" 
							:class="['p-3', selectIndex == index ? 'bg-body-secondary text-danger fw-bold' : '']"
							@click="onTabClick(index)"
						>
							{{item.name}}
						</view>
					</view>
				</uni-col>
				<uni-col :span="18">
					<scroll-view scroll-y="true" class="vh100">
						<view 
							v-for="(item, index) in list" 
							:key="'tool' + index" 
							class="px-3 mb-3"
							@click="onToolClick(item)"
						>
							<view class="d-flex justify-content-start align-items-center bg-body-tertiary rounded-2 p-2 mt-2">
								<image style="width: 50px; height: 50px;" mode="heightFix" :src="item.icon"></image>
								<view class="ms-2">
									<view class="fw-bold f16">{{item.name}}</view>
									<view class="text-body-secondary mt-1 f12">{{item.description}}</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</uni-col>
			</uni-row>
		</view>
	</view>
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
		onShow() {
			var selectIndex = uni.getStorageSync('selectIndex')
			if (typeof selectIndex === 'number') {
				this.selectIndex = selectIndex
				this.onTabClick(selectIndex)
			}
		},
		methods: {
			...mapActions(taxonomyStore, ['taxonomy']),
			fetch() {
				this.taxonomy().then(resp => {
					this.items = resp.data
					if (typeof(resp.data[this.selectIndex]) == 'object') {
						this.list = resp.data[this.selectIndex].items
					}
				})
			},
			onTabClick(index) {
				this.selectIndex = index
				uni.setStorageSync('selectIndex', index);
				
				if (typeof(this.items[index]) == 'object') {
					this.list = this.items[index].items
				}
			},
			onToolClick(item) {
				uni.navigateTo({
					url: item.url
				});
			}
		},
		watch: {},
	}
</script>

<style>
	.vh100 {
		height: calc(100vh - 56px);
		overflow: auto;
	}
	.scroll-Y {
		overflow: auto;
	}
</style>