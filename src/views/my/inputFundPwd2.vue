<template>
	<div class="inputFundPwd2-page">
		<HeaderBar title="设置资金密码"></HeaderBar>
		<div class="main">
			<!-- 密码输入框 -->
			<van-password-input
				:value="newFundPwd2"
				:focused="showKeyboard"
				@focus="showKeyboard = true"
			/>
			<!-- 数字键盘 -->
			<van-number-keyboard
				:show="showKeyboard"
				@input="onInput"
				@delete="onDelete"
				@blur="showKeyboard = false"
			/>
		</div>
	</div>
</template>

<script>
import { updateFundPwd } from '@/api/request'
import Md5 from 'js-md5'
export default {
	data() { 
		return {
			newFundPwd2: '',
      		showKeyboard: true
		}
	},
	methods: {
		onInput(key) {
			this.newFundPwd2 = (this.newFundPwd2 + key).slice(0, 6);
			if(this.newFundPwd2.length >= 6) {
				if(Md5(this.newFundPwd2) !== this.$route.query.newFundPwd) {
					this.$toast('两次密码输入不一致')
				}else {
					this.updateFundPwd()
				}
			}
		},
		onDelete() {
			this.newFundPwd2 = this.newFundPwd2.slice(0, this.newFundPwd2.length - 1);
		},
		updateFundPwd() {
			updateFundPwd({
				code: this.$route.query.code,
				newFundPwd: this.$route.query.newFundPwd
			}).then(res => {
				this.$store.dispatch('getUserInfo')
				this.$toast.success(res.msg)
				this.$router.goBack(-3)
			}).catch(err => {
				this.$router.goBack(-2)
			})
		}
	},
}
</script>

<style lang="less" scoped>
.inputFundPwd2-page{
	.van-password-input {
		margin-top: .8rem;
		ul {
			li {
				background-color: #fff;
				margin: 0 .09rem;
				border-radius: .08rem;
				i {
					background-color: #000;
				}
				&::after {
					display: none;
				}
			}
			&::after {
				display: none;
			}
		}
	}
	.van-number-keyboard {
		color: #000;
	}
}
</style>