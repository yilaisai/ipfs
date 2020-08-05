<template>
	<div class="updateloginpwd-page">
		<HeaderBar title="登录密码"></HeaderBar>
		<div class="main">
			<p>账号 : {{userInfo.phone}}</p>
			<div class="input-wrap">
				<!-- <label>请输入旧密码</label> -->
				<van-field v-model.trim="oldLoginPwd" type="password" placeholder="旧密码登录" clearable />
				<div class="other">
					<span></span>
					<a href="javascript:;" @click="$router.push('/forgotPwd')">忘记密码？</a>
				</div>
			</div>
			<div class="input-wrap">
				<!-- <label>请设置登录密码</label> -->
				<van-field v-model.trim="newLoginPwd" type="password" placeholder="新登录密码" clearable />
				<div class="other">
					<span>密码由数字、字母组成，长度在 6～18 位</span>
				</div>
			</div>
			<div class="input-wrap">
				<!-- <label>请确认登录密码</label> -->
				<van-field v-model.trim="newLoginPwd2" type="password" placeholder="确认新密码" clearable />
			</div>
			<button class="full scale" @click="updateLoginPwd" :disabled="oldLoginPwd == '' || newLoginPwd == '' || newLoginPwd2 == ''">确认修改</button>
		</div>
	</div>
</template>

<script>
import { updateLoginPwd } from '@/api/request'
import Md5 from 'js-md5'
import { mapState } from 'vuex'
export default {
	data() { 
		return {
			oldLoginPwd: '',
			newLoginPwd: '',
			newLoginPwd2: ''
		}
	},
	methods: {
		updateLoginPwd() {
			if(this.newLoginPwd !== this.newLoginPwd2) {
				this.$toast('两次新密码输入不一致')
				return
			}
			if(!/^[a-zA-Z0-9]{6,18}$/.test(this.newLoginPwd)) {
				this.$toast('新密码格式有误')
				return
			}
			updateLoginPwd({
				oldLoginPwd: Md5(this.oldLoginPwd),
				newLoginPwd: Md5(this.newLoginPwd)
			}).then(res => {
				this.$toast.success(res.msg)
				this.$router.goBack(-1)
			})
		}
	},
	computed: {
		...mapState(['userInfo'])
	}
}
</script>

<style lang="less" scoped>
.updateloginpwd-page{
	background-color: #fff;
	.main {
		padding: .3rem;
		color: #999999;
		font-size: .28rem;
		.input-wrap {
			margin-top: .4rem;
			.van-cell {
				background-color: #F6F9FC;
				border-radius:.12rem;
				margin: .1rem 0;
				border: 1px solid #F6F6F6;
				line-height: 30px;
				&::after {
					display: none;
				}
				/deep/.van-field__control {
					color: #000;
				}
			}
			.other {
				display: flex;
				justify-content: space-between;
				font-size: .2rem;
				padding: .05rem .1rem;
				a {
					color: #00D984;
				}
			}
		}
		button {
			margin-top: .8rem;
		}
	}
}
</style>