const success = (title) => {
	uni.showToast({
	    title: title,
	    icon: 'none',
	    duration: 2000
	})
}

const error = (title) => {
	uni.showToast({
	    title: title,
	    icon: 'none',
	    duration: 2000
	})
}

const info = (title) => {
	uni.showToast({
	    title: title,
	    icon: 'none',
	    duration: 2000
	})
}

const warning = (title) => {
	uni.showToast({
	    title: title,
	    icon: 'none',
	    duration: 2000
	})
}

const loading = (title) => {
	uni.showLoading({
	    title: title,
	})
}

const hideLoading = () => {
	uni.hideLoading()
}

const toast = {
	success: success,
	info: info,
	error: error,
	warning: warning,
	loading: loading,
	hideLoading: hideLoading,
}

export default toast