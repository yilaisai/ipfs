<template>
	<div class="login-register-page">
		<div class="main scroll-y">
			<div class="banner">
				<img src="../../assets/img/logo.png" alt="">
			</div>
			<div class="tab">
				<a href="javascript:;" :class="{'active' : type == 'login'}" @click="type = 'login'">登录</a>
				<i></i>
				<a href="javascript:;" :class="{'active' : type == 'register'}" @click="type = 'register'">注册</a>
			</div>
			<!-- 登录 -->
			<div class="login-form" v-show="type == 'login'">
				<van-cell-group>
					<van-field v-model.trim="phone" placeholder="请输入手机号" clearable />
					<van-field type="password" v-model.trim="loginPwd" placeholder="请输入登录密码" clearable />
				</van-cell-group>
				<div class="other">
					<a href="javascript:;"></a>
					<a href="javascript:;" @click="$router.push('/forgotPwd')">忘记密码?</a>
				</div>
				<van-button type="primary" size="large" @click="login">登录</van-button>
			</div>
			<!-- 注册 -->
			<div class="register-form" v-show="type == 'register'">
				<div class="input-item">
					<div class="flex-wrap">
						<span class="prefix" @click="selectPrefix">{{formData.prefix}} <i class="icon"></i></span>
						<input type="text" v-model.trim="formData.phone" placeholder="请输入手机号码">
					</div>
				</div>
				<div class="input-item suffix">
					<div class="flex-wrap">
						<input type="text" v-model.trim="formData.code" placeholder="请输入验证码">
						<CountDownBtn v-model="btnDisabled" @click.native="getCaptchaPhone"></CountDownBtn>
					</div>
				</div>
				<div class="input-item">
					<div class="flex-wrap">
						<input type="password" v-model.trim="formData.loginPwd1" placeholder="请输入密码">
					</div>
					<p class="tips">密码为6～18位，数字及大小写字母</p>
				</div>
				<div class="input-item">
					<div class="flex-wrap">
						<input type="password" v-model.trim="formData.loginPwd2" placeholder="再次输入密码">
					</div>
				</div>
				<div class="input-item">
					<div class="flex-wrap">
						<input type="text" v-model.trim="formData.inviteCode" :disabled="$route.query.code" placeholder="请输入邀请码">
					</div>
				</div>
				<van-button type="primary" size="large" @click="registerDo">注册</van-button>
			</div>
		</div>
		
		<div class="download" v-show="isShowDownload">
			<span>现在下载 APP，更多精彩等着你！</span>
			<a href="/download.html">下载APP</a>
		</div>
	</div>	
</template>

<script>
import { phoneLogin, getNewNickName, checkUserRegister, phoneRegister, getCaptchaPhone } from '@/api/request'
import CountDownBtn from '@/components/common/countDownBtn.vue'
import Md5 from 'js-md5'
export default {
	name: 'login',
	data() { 
		return {
			phone: '',
			loginPwd: '',
			type: 'login',
			isShowDownload: false,
			formData: {
				"code": "",
				"inviteCode": this.$route.query.code || "",
				"nickName": "",
				"phone": "",
				"ip": "",
				"loginPwd": "",
				"loginPwd1": "",
				"loginPwd2": "",
				"prefix": "+86"
			},
			btnDisabled: false,
			isiOS: false
		}
	},
	mounted() {
		setTimeout(() => {
			if(!window.plus) {
				this.isShowDownload = true
			}
		}, 1000)
		if(this.$route.query.type) {
			this.type = this.$route.query.type
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
				areaCode: '+86',
				phone: this.phone,
				loginPwd: Md5(this.loginPwd),
				onLoading:true
			}).then(res => {
				localStorage.setItem('token', res.result.token)
				this.$store.dispatch('getUserInfo')
				this.$router.replace('/home')
			})
		},
		selectPrefix() {
			sessionStorage.setItem('REGISTER_DATA', JSON.stringify(this.formData))
			this.$router.push('/location?type=register')
		},
		registerDo() {
			if(this.formData.nickName.length > 8) {
				this.$toast('昵称太长啦~')
				return
			}
			if(this.formData.phone == '') {
				this.$toast('请输入手机号')
				return
			}
			if(this.formData.code == '') {
				this.$toast('请输入验证码')
				return
			}
			if(this.formData.loginPwd1 !== this.formData.loginPwd2) {
				this.$toast('两次密码输入不一致')
				return
			}
			if(!/^[a-zA-Z0-9]{6,18}$/.test(this.formData.loginPwd1)) {
				this.$toast('密码格式有误')
				return
			}
			this.formData.loginPwd = Md5(this.formData.loginPwd1)
			phoneRegister(this.formData).then(res => {
				this.$toast.success(res.msg)
				sessionStorage.removeItem('REGISTER_DATA')
				if(!window.plus) {
					this.$router.replace('/registerSuccess')
				}else {
					this.type = 'login'
				}
			})
		},
		getNewNickName() {
			getNewNickName({onLoading:true}).then(res => {
				this.formData.nickName = res.result
			})
		},
		getCaptchaPhone() {
			if(this.btnDisabled == true) return
			if(this.formData.phone == '') {
				this.$toast('请输入手机号')
				return
			}
			this.btnDisabled = true
			getCaptchaPhone({
				areaCode: this.formData.prefix,
				phone: this.formData.phone,
				type: 'REGISTER',
				onLoading:true
			}).then(res => {
				this.$toast.success(res.msg)
			}).catch(err => {
				this.btnDisabled = false
			})
		}
	},
	beforeRouteEnter (to, from, next) {
		next( vm => {
			if(from.name == 'location' && sessionStorage.getItem('REGISTER_DATA')) {
				vm.type = 'register'
				vm.formData = JSON.parse(sessionStorage.getItem('REGISTER_DATA'))
			}
			if(from.name == 'registerSuccess') {
				vm.type = 'login'
			}
		})
	},
	components: {
		CountDownBtn
	}
}
</script>

<style lang="less" scoped>
.login-register-page{
	background-color: #FFFFFF;
	overflow: hidden;
	.main {
		height: 100%;
	}
	.banner {
		background: url(../../assets/img/bg/bg10.png) no-repeat center;
		background-size: 100% 100%;
		overflow: hidden;
		img {
			display: block;
			height: 1.2rem;
			margin: .6rem auto;
		}
	}
	.tab {
		display: flex;
		align-items: center;
		background-color: #F6F9FC;
		a {
			flex: 1;
			position: relative;
			text-align: center;
			color: #969696;
			font-size: .32rem;
			line-height: .96rem;
			font-weight: bold;
			&.active {
				color: #34A1A9;
				&:after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					width: .64rem;
					height: 2px;
					background-color: #34A1A9;
				}
			}
		}
		i {
			width: 1px;
			height:0.36rem;
			background:rgba(226,229,238,1);
		}
	}
	.login-form {
		padding: 1.2rem .5rem 1.4rem;
		/deep/.van-cell-group {
			background-color: #F6F9FC;
			border-radius:0.12rem;
			overflow: hidden;
			.van-cell {
				background-color: transparent;
				padding: 0 16px;
				.van-field__control {
					height: .88rem;
				}
			}
		}
		.other {
			display: flex;
			justify-content: space-between;
			margin: .2rem 0 .6rem;
			a {
				font-size: .24rem;
				color: #000000;
			}
		}
		.van-button {
			height: .88rem;
			line-height: .88rem;
		}
	}
	.register-form {
		padding: .5rem .5rem 1.4rem;
		.input-item {
			margin-bottom: .2rem;
			.flex-wrap {
				background-color: #F6F9FC;
				display: flex;
				align-items: center;
				height: .88rem;
				border-radius:.12rem;
				overflow: hidden;
				border: 1px solid #F6F6F6;
				.prefix {
					font-size: .3rem;
					padding: 0 .3rem;
					border-right: 0.02rem solid #798297;
					i {
						display: inline-block;
						width: .36rem;
						height: .36rem;
						background: url(../../../public/img/caret_icon.png) no-repeat center;
						background-size: 100% 100%;
						vertical-align: sub;
					}
				}
				input {
					flex: 1;
					height: 100%;
					background-color: transparent;
					color: #000000;
					padding: 0 .3rem;
					font-size: .3rem;
				}
				a {
					color: #6BC40D;
					border: 1px solid #6BC40D;
					line-height: .36rem;
					border-radius: .18rem;
					padding: 0 .1rem;
					margin-right: .3rem;
				}
			}
			.tips {
				font-size: .24rem;
				color: #999999;
				padding: .05rem .1rem;
			}
			&.suffix {
				.flex-wrap {
					background-color: transparent;
					border: none;
					border-radius: 0;
					input {
						background-color: #F6F9FC;
						margin-right: .2rem;
						border: 1px solid #F6F6F6;
						border-radius:.12rem;
					}
					/deep/.aef-countdownbtn {
						height: 100%;
						background-color: #6BC40D;
						border-radius:.12rem;
						width: 2rem;
						button {
							height: 100%;
							width: 100%;
							color: #fff;
							margin: 0;
						}
					}
				}
			}
		}
		.van-button {
			height: .88rem;
			line-height: .88rem;
		}
	}
	.download {
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 1.2rem;
		background-color: #EFF7F8;
		padding: 0 .5rem;
		span {
			font-size: .28rem;
			color: #009B60;
			font-weight: bold;
		}
		a {
			font-size: .26rem;
			color: #fff;
			padding: 0 .38rem;
			line-height:0.72rem;
			background:linear-gradient(135deg,rgba(4,174,103,1) 0%,rgba(34,204,226,1) 100%);
			box-shadow:0rem 0.03rem 0.12rem 0rem rgba(8,178,116,0.5);
			border-radius:0.36rem;
		}
		&::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height:0.05rem;
			background:linear-gradient(135deg,rgba(4,174,103,1) 0%,rgba(34,204,226,1) 100%);
		}
	}
}
</style>