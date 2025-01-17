<script>
	import {mapActions, mapState} from 'pinia'
	import {userStore} from '@/stores/user'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.autuLogin()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapActions(userStore, ['wxLogin']),
			...mapState(userStore, ['getUserMMID']),
			autuLogin(){
				var that = this
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log('loginRes', loginRes)
						that.wxLogin({
							code: loginRes.code,
							avatar_url: '',
							nick_name: '',
							invite_id: that.getUserMMID()
						})
					},
					fail(err) {
						console.log('err', err)
					},
					complete: function() {
						// 关闭loading
						uni.hideLoading()
					}
				});
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "@/static/css/bootstrap-utilities.css";
	@import "@/static/css/style.scss";
</style>
