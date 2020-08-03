<template>
	<div class="withdraw-component">
		<div class="main">
			<h2>选择主网</h2>
			<div class="btn-wrap">
				<button :class="{'active' : active == 5}" @click="active = 5">ERC20</button>
				<button :class="{'active' : active == 9}" @click="active = 9">OMNI</button>
			</div>
			<h2>提现地址</h2>
			<van-field v-model.trim="addr" clearable @blur="addrOnblur" />
			<h2>提现数量</h2>
			<van-field type="number" v-model.trim.number="amount" clearable>
				<template #extra >
					<van-button size="small" type="primary" @click="amount = userInfo.amount">全部</van-button>
				</template>
			</van-field>
			<p class="fee">当前可提<span> {{userInfo.amount}}</span> USDT，手续费：<span>{{fee}}</span> USDT</p>
			<van-button type="primary" size="large" @click="showPopup">提现</van-button>
			<h2>提现需知</h2>
			<p class="tips">1，最小提现额度为 {{min}} USDT。<br />
				2，提现预计在T+1个工作日内到账。<br />
				3，发起提现请耐心等待客服提现哦！
			</p>
		</div>
		
		<van-popup v-model="show" closeable position="bottom" @close="password = ''">
			<h3>确认提币</h3>
			<h2>{{amount}} <sub>USDT</sub></h2>
			<div class="info">
				<label>支付方式</label>
				<span v-if="userInfo.amount < amount" class="red">钱包余额不足</span>
				<span v-else>钱包</span>
			</div>
			<input class="password-input" v-model.trim="password" type="password" placeholder="请输入您的资金密码">
			<van-field
				v-model.trim="captcha"
				center
				clearable
				label="短信验证码"
				placeholder="请输入短信验证码">
				<CountDownBtn slot="button" @click="getCaptcha" v-model="btnDisabled"></CountDownBtn>
			</van-field>
			<van-button type="primary" size="large" @click="pay">确认支付</van-button>
		</van-popup>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { getCoinFeeInfo, withdraw, getCaptcha } from '@/api/request'
import CountDownBtn from '@/components/common/countDownBtn'
import Md5 from 'js-md5'
export default {
	data() { 
		return {
			active: 5,
			value: '',
			addr: '',
			fee: 0,
			amount: "",
			min: 0,
			show: false,
			password: "",
			captcha: '',
			btnDisabled: false
		}
	},
	methods: {
		addrOnblur() {
			getCoinFeeInfo({addr: this.addr}).then(res => {
				this.fee = res.result.fee
				this.min = res.result.min
			})
		},
		showPopup() {
			if(this.addr == '') {
				this.$toast('地址不能为空')
				return
			}
			if(this.amount == '') {
				this.$toast('提币数量不能为空')
				return
			}
			if(this.amount < this.min) {
				this.$toast(`提币数量不能小于${this.min}`)
				return
			}
			this.show = true
		},
		pay() {
			if(this.password == '') {
				this.$toast('请输入资金密码')
				return
			}
			if(this.captcha == '') {
				this.$toast('请输入短信验证码')
				return
			}
			this.$bus.$emit('loading', true)
			withdraw({
				coinId: this.active,
				amount: this.amount,
				funPwdMd5: Md5(this.password),
				toAddr: this.addr,
				memo: '',
				captcha: this.captcha
			}).then(res => {
				this.show = false
				this.$toast.success(res.msg)
				this.$store.dispatch('getUserInfo')
				this.$bus.$emit('loading', false)
			}).catch(err => {
				this.$bus.$emit('loading', false)
			})
		},
		getCaptcha() {
			this.btnDisabled = true
			getCaptcha({type: 6}).then(res => {
				this.$toast.success(res.msg)
			}).catch(err => {
				this.btnDisabled = false
			})
		},
	},
	computed:{
		...mapState(['userInfo'])
	},
	components: {
		CountDownBtn
	}
}
</script>

<style lang="less" scoped>
.withdraw-component{
	padding: .6rem .3rem .4rem;
	.main {
		h2 {
			margin: .45rem 0 .28rem;
		}
		.btn-wrap {
			button {
				width: 1.6rem;
				height: .74rem;
				color: #999999;
				font-size: .32rem;
				background:rgba(255,255,255,1);
				box-shadow: 0px 2px .2rem 0px rgba(0,76,46,0.08);
				border-radius: .12rem;
				margin-right: .2rem;
				&.active {
					color: #00D984;
				}
			}
		}
		.fee {
			font-size: .24rem;
			margin-top: .28rem;
			color: #999999;
			span {
				color: #F42E14;
			}
		}
		.van-cell {
			padding: 0 0 0 .1rem;
			border-radius: .12rem;
			line-height: .58rem;
			.van-button {
				width: 1.6rem;
				margin-left: .1rem;
				border-radius: 0;
			}
		}
		.van-button--large {
			display: block;
			margin: .44rem auto 0;
			height: .74rem;
			width: 3.24rem;
			border-radius: .37rem;
			box-shadow: 0px .12rem .24rem 0px rgba(0,157,95,0.3);
		}
		.tips {
			font-size: .24rem;
			color: #999999;
		}
	}
	

	// 弹框
	.van-popup {
		border-radius: .26rem .26rem 0px 0px;
		padding: .4rem;
		h3 {
			font-size: .25rem;
			text-align: center;
		}
		h2 {
			font-size: .62rem;
			text-align: center;
			margin: .6rem 0;
			sub {
				font-size: .3rem;
				vertical-align: baseline;
				font-weight: 400;
			}
		}
		.info {
			display: flex;
			justify-content: space-between;
			font-size: .28rem;
			margin-bottom: .6rem;
			label {
				color: #999999;
			}
			span {
				&.red {
					color: #F42E14;
				}
			}
		}
		.password-input {
			display: block;
			width: 100%;
			height: 1rem;
			text-align: center;
			border-radius: .08rem;
			background-color: #EEEEEE;
			font-size: .25rem;
			font-weight: 600;
		}
		.van-cell {
			padding: 0 .1rem;
			background-color: #EEEEEE;
			margin: .2rem 0 0 0;
			height: 1rem;
			border-radius: .08rem;
			font-weight: 600;
			/deep/.van-field__label {
				width: 2.1rem;
			}
			/deep/.van-field__control {
				text-align: center;
			}
			/deep/.aef-countdownbtn {
				button {
					color: #00D983;
				}
			}
		}
		.van-button--large {
			margin-top: .7rem;
		}
	}
}
</style>