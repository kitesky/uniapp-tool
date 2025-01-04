<template>
    <view class="sticky-top">
        <view class="bg-body-secondary bg-opacity-75">
            <uni-search-bar
                v-model="keyword"
                :focus="true"
                placeholder="搜索关键词..."
                radius="100"
                maxlength="100"
                @confirm="onSearch"
                @cancel="onCancel"
                @clear="onCancel"
            />
        </view>
    </view>

    <view v-if="search == false" class="p-3">
		<view class="mb-3">
			<view class="d-flex justify-content-start align-items-center">
				<view class="fw-bold lable">历史搜索</view>
				<uni-icons @click="clearHistoryData" type="trash" size="22"></uni-icons>
			</view>
			
			<view class="search-content gap-3 mt-3">
			    <template v-for="(item, index) in history" :key="index">
			        <text @click="onClickKeywords(item)" class="bg-body-secondary rounded-3 py-2 px-3">{{ item }}</text>
			    </template>
			</view>
		</view>
		
		<view class="mb-3">
			<view class="d-flex justify-content-start align-items-center">
				<view class="fw-bold lable">热门搜索</view>
			</view>
			
            <view class="search-content gap-3 mt-3">
                <template v-for="(item, index) in hot" :key="index">
                    <text @click="onClickKeywords(item)" class="bg-body-secondary rounded-3 py-2 px-3 me-2">{{ item }}</text>
                </template>
            </view>
		</view>
    </view>
	
	<view v-else>
		<view 
			v-for="(item, index) in items" 
			:key="'tool' + index" 
			class="px-3 mb-3"
			@click="onToolClick(item)"
		>
			<view class="d-flex justify-content-start align-items-center bg-body-tertiary rounded-2 p-2 mt-2">
				<image style="width: 40px; height: 40px;" mode="heightFix" :src="item.icon"></image>
				<view class="ms-2">
					<view class="fw-bold f16">{{item.name}}</view>
					<view class="text-body-secondary mt-1 f12">{{item.description}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    import { mapActions } from 'pinia'
	import {toolStore} from '@/stores/tool'
    export default {
        components: {
        },
        data() {
            return {
                search: false, // 0 搜索面板 1 结果面板
                keyword: '',
                params: { keyword: '' },
                isFetch: false,
                history: [],
                hot: [],
				items: []
            }
        },
        onShareAppMessage() {},
        mounted() {
            // 获取搜索历史
            this.getHistoryData()
            this.fetchHotSearch()
        },
        methods: {
			...mapActions(toolStore, ['getToolList']),
			fetch() {
				this.getToolList(this.params).then(resp => {
					this.items = resp.data.items
				})
			},
            fetchHotSearch() {
                var that = this
            },
            onSearch() {
                this.search = true
                this.isFetch = true
                // 设置搜索历史
                this.params.keyword = this.keyword
                this.setHistoryData(this.keyword)
				this.fetch()
            },
            onCancel() {
                this.search = false
                this.isFetch = false
            },
            getHistoryData() {
                var history = uni.getStorageSync('searchHistoryKeywords')
                // 位置有限，后20个
                if (history.length > 20) {
                    this.history = history.slice(-20)
                } else {
                    this.history = history ? history : []
                }
            },
            setHistoryData(keyword) {
				if (keyword.trim() == '') {
					return
				}
				console.log(111,keyword.trim())
				
                var data = this.history

                // 是否在数组中 删除
                var index = data.indexOf(keyword)
                if (index > -1) {
                    data.splice(index, 1)
                }
                data.push(keyword)
                uni.setStorageSync('searchHistoryKeywords', data)
            },
            clearHistoryData() {
                var that = this
                uni.showModal({
                    title: '确认提示',
                    content: '确定要删除搜索记录?',
                    success: function (res) {
                        if (res.confirm) {
                            uni.removeStorageSync('searchHistoryKeywords')
                            that.history = []
                        }
                    }
                });
            },
            onClickKeywords(keyword) {
                this.keyword = keyword
                this.onSearch()
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
.lable::before {
	display: inline-block;
	width: 6px;
	height:14px;
	border-radius: 6px;
	background: #FF4136;
	content: "";
	vertical-align: 1px;
	margin-right: 10px;
}
.search-content {
    padding: 0 10px 10px 10px;
    display: flex;
    flex-wrap: wrap;
}
</style>