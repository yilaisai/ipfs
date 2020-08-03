<template>
	<div class="setloginpwd-page">
		<HeaderBar title="设置登录密码"></HeaderBar>
		<div class="main">
			<div class="input-item">
				<div class="flex-wrap">
					<input type="password" v-model.trim="password1" placeholder="请输入 6～18 位密码">
				</div>
				<p class="tips">密码由数字、字母组成，长度在6～18位</p>
			</div>
			<div class="input-item">
				<div class="flex-wrap">
					<input type="password" v-model.trim="password2" placeholder="请再次输入密码">
				</div>
			</div>
			<button class="enter full scale" @click="phoneRegister" :disabled="password1 == '' || password2 == ''">确认</button>
		</div>
	</div>
</template>

<script>
import CountDownBtn from '@/components/common/countDownBtn.vue'
import { phoneRegister } from '@/api/request'
import Md5 from 'js-md5'
export default {
	data() { 
		return {
			registerData: {},
			password1: '',
			password2: ''
		}
	},
	created() {
		this.registerData = JSON.parse(sessionStorage.getItem('REGISTER_DATA'))
	},
	methods: {
		phoneRegister() {
			if(this.password1 !== this.password2) {
				this.$toast('两次密码输入不一致')
				return
			}
			if(!/^[a-zA-Z0-9]{6,18}$/.test(this.password2)) {
				this.$toast('密码格式有误')
				return
			}
			this.registerData.loginPwd = Md5(this.password2)
			this.registerData.ip = ''
			phoneRegister(this.registerData).then(res => {
				this.$toast.success(res.msg)
				sessionStorage.removeItem('REGISTER_DATA')
				if(!window.plus) {
					this.$router.replace('/registerSuccess')
				}else {
					this.$router.replace('/login')
				}
			})
		}
	},
	components: {
		CountDownBtn
	}
}
</script>

<style lang="less" scoped>
.setloginpwd-page{
	background-color: #FFFFFF;
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