<template>
	<div class="register-page">
		<div class="download" v-if="$route.query.code">
			<img src="../../../public/img/login_logo.png" alt="">
			<div>
				<h4>彼岸</h4>
				<p>彼岸就在眼前</p>
			</div>
			<a href="/download.html">点击下载</a>
		</div>
		<HeaderBar title="注册" :back="!$route.query.code"></HeaderBar>
		<div class="main">
			<div class="input-item">
				<div class="flex-wrap">
					<span class="prefix" @click="selectPrefix">{{formData.prefix}} <i class="icon"></i></span>
					<input type="text" v-model.trim="formData.phone" placeholder="请输入手机号码">
				</div>
			</div>
			<div class="input-item">
				<div class="flex-wrap">
					<input type="text" v-model.trim="formData.nickName" placeholder="请输入昵称">
					<a href="javascript:;" @click="getNewNickName">随机生成</a>
				</div>
				<p class="tips">昵称可由数字、字母、汉字组合，长度不超过12位</p>
			</div>
			<div class="input-item">
				<div class="flex-wrap">
					<input type="text" v-model.trim="formData.code" placeholder="请输入验证码">
					<CountDownBtn v-model="btnDisabled" @click.native="getCaptchaPhone"></CountDownBtn>
				</div>
			</div>
			<div class="input-item">
				<div class="flex-wrap">
					<input type="text" v-model.trim="formData.inviteCode" :disabled="$route.query.code" placeholder="请输入邀请码">
				</div>
			</div>
			<button class="enter full scale" @click="registerDo">下一步</button>
		</div>
	</div>
</template>

<script>
import { getNewNickName, checkUserRegister, phoneRegister, getCaptchaPhone } from '@/api/request'
import CountDownBtn from '@/components/common/countDownBtn.vue'
import Md5 from 'js-md5'
export default {
	data() { 
		return {
			formData: {
				"code": "",
				"inviteCode": this.$route.query.code || "",
				"nickName": "",
				"phone": "",
				"prefix": "+86"
			},
			btnDisabled: false,
			isiOS: false
		}
	},
	mounted() {
		const u = navigator.userAgent
		this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	},
	methods: {
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
			checkUserRegister(this.formData).then(res => {
				sessionStorage.setItem('REGISTER_DATA', JSON.stringify(this.formData))
				this.$router.push('/setLoginPwd')
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
				area: this.formData.prefix,
				phone: this.formData.phone,
				type: 0,
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
				vm.formData = JSON.parse(sessionStorage.getItem('REGISTER_DATA'))
			}
		})
	},
	components: {
		CountDownBtn
	}
}
</script>

<style lang="less" scoped>
.register-page{
	background-color: #fff;
	.main {
		padding: .4rem;
		.input-item {
			margin-bottom: .4rem;
			.flex-wrap {
				background-color: #FCFDFF;
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
					color: #00D984;
					border: 1px solid #00D984;
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
	.download {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 1rem;
		padding: 0 .4rem;
		background: url(../../../public/img/ticket_bg.png) no-repeat center;
		background-size: 100% 100%;
		img {
			width: .7rem;
		}
		div {
			flex: 1;
			margin: 0 .2rem;
			h4 {
				font-size: .32rem;
			}
			p {
				font-size: .24rem;
			}
		}
		a {
			display: inline-block;
			background-color: #00D984;
			line-height: .5rem;
			border-radius: .04rem;
			color: #5A2708;
			font-weight: 700;
			padding: 0 .3rem;
		}
	}
}
</style>