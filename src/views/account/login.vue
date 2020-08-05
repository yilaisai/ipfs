<template>
	<div class="login">
		<div class="logo-wrap">
			<img src="../../../public/img/login_logo.png" alt="">
		</div>
		<van-cell-group>
			<van-field v-model.trim="phone" placeholder="请输入手机号" clearable />
			<van-field type="password" v-model.trim="loginPwd" placeholder="请输入登录密码" clearable />
		</van-cell-group>
		<p><a href="javascript:;" @click="$router.push('/forgotPwd')">忘记密码</a>|<a href="javascript:;" class="primary-color" @click="$router.push('register')">用户注册</a></p>
		<div class="btn-wrap">
			<button class="full scale" @click="login"><img src="../../../public/img/arrow_right2.png" alt=""></button>
		</div>
	</div>
</template>

<script>
import { phoneLogin } from '@/api/request'
import Md5 from 'js-md5'
export default {
	data() { 
		return {
			phone: '',
			loginPwd: ''
		}
	},
	methods: {
		login() {
			if(this.phone == '') {
				this.$toast('请输入手机号')
				return
			}
			if(this.loginPwd == '') {
				this.$toast('请输入密码')
				return
			}
			phoneLogin({
				phone: this.phone,
				loginPwd: Md5(this.loginPwd),
				onLoading:true
			}).then(res => {
				localStorage.setItem('token', res.result.token)
				this.$store.dispatch('getUserInfo')
				this.$router.replace('/home')
			})
		}
	}
}
</script>

<style lang="less" scoped>
.login{
	padding: 0 .4rem;
	background-color: #fff;
	.logo-wrap {
		img {
			display: block;
			height: 1.7rem;
			margin: 1rem auto .5rem;
		}
	}
	.van-cell-group {
		position: relative;
		z-index: 12;
		background-color: #fff;
		&::after {
			display: none;
		}
	}
	.van-cell {
		background-color: #F6F9FC;
		overflow: hidden;
		padding: 0 16px;
		border: 1px solid #F6F6F6;
		margin-top: .24rem;
		border-radius:.12rem;
		&::after {
			left: 0;
			border-bottom: 0;
		}
		/deep/.van-field__control {
			color: #000;
			font-size: .3rem;
			height: 1rem;
			text-align: center;
		}
	}
	p {
		display: flex;
		position: absolute;
		z-index: 1;
		bottom: 1.2rem;
		left: 50%;
		transform: translateX(-50%);
		justify-content: space-between;
		margin-top: .2rem;
		font-size: .28rem;
		white-space: nowrap;
		a {
			color: #333333;
			margin: 0 .6rem;
		}
		
	}
	.btn-wrap {
		position: relative;
		z-index: 12;
		background-color: #fff;
		overflow: hidden;
	}
	button {
		display: block;
		margin: .8rem auto .4rem;
		width: 1.46rem;
		height: 1.46rem;
		background: #42C1CA;
		border-radius:50%;
		img {
			width: .8rem;
		}
	}
}
</style>