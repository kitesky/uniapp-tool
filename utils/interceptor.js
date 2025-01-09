// src/composables/interceptor.js

// 页面白名单，不受拦截
const whiteList = [
    '/pages/login/login'
]
function hasPermission (url) {
    // 获取本地缓存的登录信息
	let member = uni.getStorageSync('member');
    // 在白名单中或有登录判断条件可以直接跳转
    if(whiteList.includes(url.split('?')[0]) || member) {
		console.log('跳转的页面在白名单内或是已登录')
        return true
    }
	console.log('跳转的页面不在白名单内且未登录')
    return false
}

// 遍历给路由方法添加拦截器
let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
list.forEach(item => {
       // 页面跳转拦截器
       uni.addInterceptor(item, {
        // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
        invoke (e) {
            console.log(11111, e)
            return true
        },
        fail(err) { // 失败回调拦截 
            console.log(err);
        },
    })

})
