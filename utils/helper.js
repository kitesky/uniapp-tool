// 获取状态栏高度
geStatusBarHeight() {
	return uni.getSystemInfoSync()['statusBarHeight']
},
// 获取导航栏高度
getNavBarHeight() {
	// #ifdef MP-WEIXIN
	let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
	// 导航栏高度 = 胶囊高度 + 上间距 + 下间距 + 微调	（menuButtonInfo.top - uni.getSystemInfoSync()['statusBarHeight'] = 上间距）	        
	let navbarHeight = menuButtonInfo.height + (menuButtonInfo.top - uni.getSystemInfoSync()[
		'statusBarHeight']) * 2 + 2
	// #endif
	// #ifdef APP-PLUS || H5
	let navbarHeight = 44
	// #endif
	return navbarHeight
}