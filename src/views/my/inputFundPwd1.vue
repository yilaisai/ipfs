<template>
	<div class="inputFundPwd1-page">
		<HeaderBar title="设置资金密码"></HeaderBar>
		<div class="main">
			<!-- 密码输入框 -->
			<van-password-input
				:value="newFundPwd"
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
import Md5 from 'js-md5'
export default {
	data() { 
		return {
			newFundPwd: '',
      		showKeyboard: true
		}
	},
	methods: {
		onInput(key) {
			this.newFundPwd = (this.newFundPwd + key).slice(0, 6);
			if(this.newFundPwd.length >= 6) {
				this.$router.push({
					path: 'inputFundPwd2',
					query: {
						code: this.$route.query.code,
						newFundPwd: Md5(this.newFundPwd)
					}
				})
			}
		},
		onDelete() {
			this.newFundPwd = this.newFundPwd.slice(0, this.newFundPwd.length - 1);
		}
	},
}
</script>

<style lang="less" scoped>
.inputFundPwd1-page{
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