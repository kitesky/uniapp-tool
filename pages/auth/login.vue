<template>
	<view class="login-card">
		<!-- #ifdef MP-WEIXIN -->
		<MPWexinLogin></MPWexinLogin>
		<!-- #endif  -->
	</view>
</template>

<script>
	/* #ifdef MP-WEIXIN */
	import MPWexinLogin from '@/components/login/mp-weixin'
	/* #endif */
	export default {
		components: {
			/* #ifdef MP-WEIXIN */
			MPWexinLogin,
			/* #endif */
		},
		data() {
			return {

			}
		},
		methods: {
            onClickAgree() {
                uni.navigateTo({ url: '/pages/agreement/policy' });
            },
            onGridChange(e) {

            },
		}
	}
</script>

<style>

</style>