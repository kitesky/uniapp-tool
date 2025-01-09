/**
 * 检查是否登录
 * return boolean
 */
const isLogin = () => {
    if (uni.getStorageSync('token')) {
        return true
    }

    return false
}

/**
 * 检查登录 并跳转
 * return reLaunch
 */
const check = () => {
	console.log('auth check!')
    if (! isLogin()) {
        uni.reLaunch({ url: '/pages/auth/login' })
		return false
    }
	
	return true
}

const auth = {
    isLogin: isLogin,
    check: check,  
}

export default auth