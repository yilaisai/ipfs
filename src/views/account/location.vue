<template>
	<div class="location-page">
		<HeaderBar title="手机号码归属地"></HeaderBar>
		<van-index-bar>
		<van-index-anchor index="常用" />
			<van-cell title="中国" @click="selected('86')">86</van-cell>
			<van-cell title="中国香港"  @click="selected('852')">852</van-cell>
			<van-cell title="中国台湾"  @click="selected('886')">886</van-cell>
			<van-cell title="中国澳门"  @click="selected('853')">853</van-cell>
			<van-cell title="美国"  @click="selected('001')">001</van-cell>
		</van-index-bar>
	</div>
</template>

<script>
export default {
	data() { 
		return {

		}
	},
	methods: {
		selected(prefix) {
			if(this.$route.query.type == 'register') {
				let storageData = JSON.parse(sessionStorage.getItem('REGISTER_DATA'))
				storageData.prefix = '+' + prefix
				sessionStorage.setItem('REGISTER_DATA', JSON.stringify(storageData))
			} else if(this.$route.query.type == 'forgotPwd'){
				let storageData = JSON.parse(sessionStorage.getItem('FORGOTPWD_DATA'))
				storageData.prefix = '+' + prefix
				sessionStorage.setItem('FORGOTPWD_DATA', JSON.stringify(storageData))
			} else if(this.$route.query.type == 'login'){
				let storageData = JSON.parse(sessionStorage.getItem('LOGIN_DATA'))
				storageData.prefix = '+' + prefix
				sessionStorage.setItem('LOGIN_DATA', JSON.stringify(storageData))
			} else {
				this.$toast('选择失败')
			}
			
			this.$router.goBack(-1)
		}
	}
}
</script>

<style lang="less" scoped>
.location-page{
	.van-index-bar {
		/deep/.van-index-anchor {
			color: #333;
			padding: 0 .3rem;
		}
		.van-cell {
			background-color: #fff;
			color: #333;
			padding: .2rem .6rem .2rem .3rem;
			&::after {
				left: 0;
				border-bottom: 0.02rem solid #F6F6F6;
			}
			.van-cell__value {
				color: #333;
			}
		}
	}
}
</style>