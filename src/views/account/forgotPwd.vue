<template>
	<div class="forgotpwd-page">
		<HeaderBar title="忘记密码"></HeaderBar>
		<div class="main">
			<div class="input-item">
				<div class="flex-wrap">
					<span class="prefix" @click="selectPrefix">{{formData.prefix}} <i class="icon"></i></span>
					<input type="text" v-model.trim="formData.phone" placeholder="请输入手机号码">
				</div>
			</div>
			<div class="input-item">
				<div class="flex-wrap">
					<input type="text" v-model.trim="formData.captcha" placeholder="请输入验证码">
					<CountDownBtn v-model="btnDisabled" @click.native="getCaptchaPhone"></CountDownBtn>
				</div>
			</div>
			<div class="input-item">
				<div class="flex-wrap">
					<input type="password" v-model.trim="formData.password" placeholder="设置登录密码">
				</div>
				<p class="tips">密码由数字、字母组成，长度在 6～18 位</p>
			</div>
			<div class="input-item">
				<div class="flex-wrap">
					<input type="password" v-model.trim="formData.password2" placeholder="确认登录密码">
				</div>
			</div>
			<button class="enter full scale" @click="forgetLoginPwd" :disabled="formData.phone == '' || formData.captcha == '' || formData.password == '' || formData.password2 == ''">确认</button>
		</div>
	</div>
</template>

<script>
import { forgetLoginPwd, getCaptchaPhone } from '@/api/request'
import CountDownBtn from '@/components/common/countDownBtn.vue'
import Md5 from 'js-md5'
export default {
	data() { 
		return {
			formData: {
				"prefix": "+86",
				"phone": "",
				"captcha": "",
				"password": "",
				"password2": ""
			},
			btnDisabled: false
		}
	},
	methods: {
		selectPrefix() {
			sessionStorage.setItem('FORGOTPWD_DATA', JSON.stringify(this.formData))
			this.$router.push('/location?type=forgotPwd')
		},
		forgetLoginPwd() {
			if(this.formData.password !== this.formData.password2) {
				this.$toast('两次密码输入不一致')
				return
			}
			if(!/^[a-zA-Z0-9]{6,18}$/.test(this.formData.password2)) {
				this.$toast('密码格式有误')
				return
			}
			forgetLoginPwd({
				"account": this.formData.phone,
				"captcha": this.formData.captcha,
				"pwdMd5": Md5(this.formData.password)
			}).then(res => {
				this.$toast.success(res.msg)
				this.$router.goBack(-1)
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
				area: this.formData.prefix,
				phone: this.formData.phone,
				type: 1
			}).then(res => {
				this.$toast.success(res.msg)
			}).catch(err => {
				this.btnDisabled = false
			})
		}
	},
	beforeRouteEnter (to, from, next) {
		next( vm => {
			if(from.name == 'location' && sessionStorage.getItem('FORGOTPWD_DATA')) {
				vm.formData = JSON.parse(sessionStorage.getItem('FORGOTPWD_DATA'))
			}
		})
	},
	components: {
		CountDownBtn
	}
}
</script>

<style lang="less" scoped>
.forgotpwd-page{
	background-color: #fff;
	.main {
		padding: .4rem;
		.input-item {
			margin-bottom: .4rem;
			.flex-wrap {
				background-color: #FCFDFF;
				border-radius: .08rem;
				display: flex;
				align-items: center;
				height: 1rem;
				border-radius: .5rem;
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
					background-color: transparent;
					color: #000000;
					padding: 0 .3rem;
					font-size: .3rem;
				}
				a {
					color: #FFEB1D;
					border: 0.01rem solid #FFEB1D;
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
		}
		.enter {
			border-radius: .45rem;
		}
	}
}
</style>