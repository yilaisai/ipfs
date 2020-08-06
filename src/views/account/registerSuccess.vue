<template>
	<div class="register-success scroll-y">
		<img class="logo" src="../../../public/img/login_logo.png" alt="">
		<h3>恭喜您，注册成功啦！</h3>
		<h4>现在下载 APP，更多精彩等着你！</h4>
		<van-button type="primary" size="large" @click="download">立即下载 </van-button>
		<p @click="$router.replace('/login')">继续体验web版</p>
		<!-- <h5>扫码关注微信公众号</h5>
		<img class="qrcode" src="../../../public/img/wxgzh.png" alt="">
		<p>你想要的教程，这里都有</p> -->
	</div>
</template>

<script>
export default {
	data() { 
		return {

		}
	},
	methods: {
		download() {
			window.location.href = '/download.html'
		}
	}
}
</script>

<style lang="less" scoped>
.register-success{
	padding: 1rem 0 .5rem;
	background-color: #fff;
	.logo {
		display: block;
		margin: 0 auto .7rem;
		width: 1.5rem;
		box-shadow: 0px .2rem .6rem 0px rgba(0, 0, 0, 0.1);
	}
	h3 {
		font-size: .34rem;
		text-align: center;
	}
	h4 {
		color: #666666;
		font-size: .26rem;
		margin: 1rem auto 0;
		text-align: center;
	}
	.van-button {
		display: block;
		width: 3.5rem;
		height: .84rem;
		margin: .38rem auto .3rem;
	}
	h5 {
		text-align: center;
		margin-top: 1rem;
	}
	p {
		font-size: .22rem;
		text-align: center;
		color: #00D984;
	}
	.qrcode {
		display: block;
		margin: .2rem auto;
		width: 2.65rem;
		height: 2.65rem;
	}
}
</style>