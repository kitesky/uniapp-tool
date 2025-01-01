<template>
    <view class="sticky-top">
        <view class="bg-body-secondary bg-opacity-75">
            <uni-search-bar
                v-model="keywords"
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

    <view v-if="search == false">
        <uni-section v-if="history.length > 0" title="历史搜索" titleFontSize="15px" type="square">
            <template v-slot:right>
                <uni-icons @click="clearHistoryData" type="trash" size="22"></uni-icons>
            </template>
            
            <view class="search-content">
                <template v-for="(item, index) in history" :key="index">
                    <text @click="onClickKeywords(item)" class="title">{{ item }}</text>
                </template>
            </view>
        </uni-section>

        <uni-section title="热门搜索" titleFontSize="15px" type="square">
            <view class="search-content">
                <template v-for="(item, index) in hot" :key="index">
                    <text @click="onClickKeywords(item)" class="title">{{ item }}</text>
                </template>
            </view>
        </uni-section>
    </view>
</template>

<script>
    import { mapActions } from 'pinia'
    export default {
        components: {
        },
        data() {
            return {
                search: false, // 0 搜索面板 1 结果面板
                keywords: '',
                params: { keywords: '' },
                isFetch: false,
                history: [],
                hot: []
            }
        },
        onPullDownRefresh() {

        },
        onShareAppMessage() {},
        mounted() {
            // 获取搜索历史
            this.getHistoryData()
            this.fetchHotSearch()
        },
        methods: {
            fetchHotSearch() {
                var that = this
            },
            onSearch() {
                this.search = true
                this.isFetch = true
                // 设置搜索历史
                this.params.keywords = this.keywords
                this.setHistoryData(this.keywords)
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
            setHistoryData(keywords) {
                var data = this.history

                // 是否在数组中 删除
                var index = data.indexOf(keywords)
                if (index > -1) {
                    data.splice(index, 1)
                }
                data.push(keywords)
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
            onClickKeywords(keywords) {
                this.keywords = keywords
                this.onSearch()
            }
        }
    }
</script>

<style>
.search-content {
    padding: 0 10px 10px 10px;
    display: flex;
    flex-wrap: wrap;
}
.title {
    padding: 3px 15px;
    margin: 3px 5px;
    background-color: #f2f2f2;
    border-radius: 20px;
    color:#3b4144;
    font-size: 14px;
}
</style>