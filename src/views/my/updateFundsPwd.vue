<template>
	<div class="updatafundspwd-page">
		<HeaderBar :title="userInfo.isSetFund == 0 ? '设置资金密码' : '修改资金密码'"></HeaderBar>
		<div class="main">
			<div class="input-wrap">
				<!-- <label>账号</label> -->
				<van-field :value="userInfo.phone" type="text" placeholder="请输入手机号" clearable disabled />
			</div>
			<div class="input-wrap">
				<!-- <label>验证码</label> -->
				<van-field v-model.trim="code" type="text" placeholder="请输入验证码" clearable>
					<CountDownBtn slot="button" @click="getCaptcha" v-model="btnDisabled"></CountDownBtn>
				</van-field>
			</div>
			<!-- <p class="tips" v-if="userInfo.isSetFund == 1">修改后24小时内禁止任何交易相关操作（提币）</p> -->
			<button class="full scale" @click="nextStep">下一步</button>
		</div>
	</div>
</template>

<script>
import CountDownBtn from '@/components/common/countDownBtn'
import { mapState } from 'vuex'
import { getCaptcha } from '@/api/request'
export default {
	data() { 
		return {
			code: '',
			btnDisabled: false
		}
	},
	methods: {
		getCaptcha() {
			this.btnDisabled = true
			getCaptcha({type: 3}).then(res => {
				this.$toast.success(res.msg)
			}).catch(err => {
				this.btnDisabled = false
			})
		},
		nextStep() {
			if(this.code == '') {
				this.$toast('请输入验证码')
				return
			}
			this.$router.push('/inputFundPwd1?code=' + this.code)
		}
	},
	computed: {
		...mapState(['userInfo'])
	},
	components: {
		CountDownBtn
	}
}
</script>

<style lang="less" scoped>
.updatafundspwd-page{
	background-color: #fff;
	.main {
		padding: .3rem;
		color: #333;
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
				a {
					color: rgba(60, 197, 164, 1);
				}
			}
		}
		button {
			margin-top: .8rem;
		}
		.tips {
			font-size: .24rem;
			color: #F42E14;
			padding: .05rem .1rem;
		}
	}
}
</style>