<template>
	<div class="aef-countdownbtn">
		<button :disabled="disabled" :class="{'disabled' : disabled}" @click="btnClickHanlder"><i v-show="disabled">{{btnText}}</i><i v-show="!disabled">获取验证码</i></button>
	</div>
</template>

<script>
/**
 * 获取短信码倒计时组件
 * @param {Boolean} model 按钮是否可点击
 * @author shanks
 * @date 2018-10-2
 */
export default {
	props: {
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			btnText: '获取验证码',
			s: 61,
			timer: null
		}
	},
	model: {
		prop: "disabled",
		event: "change"
	},
	watch: {
		disabled(newVal) {
			if(newVal) {
				this.start()
			}else {
				window.clearTimeout(this.timer)
				this.s = 61
				this.btnText = '获取验证码'
			}
		}
	},
	methods: {
		start() {
			window.clearTimeout(this.timer)
			if(this.s > 1) {
				this.s--
				this.btnText = this.s + "s"
				this.timer = window.setTimeout(this.start, 1000)
			}else {
				this.$emit("change", false)
				this.s = 61
				this.btnText = '获取验证码'
			}
		},
		btnClickHanlder() {
			this.$emit('click')
		}
	}
}
</script>

<style lang="less">
.aef-countdownbtn {
	button {
		background-color: transparent;
		line-height: .4rem;
		margin-left: 10px;
		min-width: 90px;
		text-align: center;
		font-size: .28rem;
		color: #6BC40D;
		border-radius: 4px;
		font-weight: 600;
		cursor: pointer;
		border: none;
		outline: none;
		&.disabled {
			color: #A7AFDC;
			cursor: not-allowed;
		}
		i {
			font-style: normal;
		}
	}
}
</style>
