<template>
	<div class="transfer-page">
		<div class="header">
			<div class="tab">
				<a href="javascript:;" :class="{'active' : !isActive}" @click="isActive = false">未激活</a>
				<a href="javascript:;" :class="{'active' : isActive}" @click="isActive = true">已激活</a>
			</div>
			<a href="javascript:;" class="back" @click="$router.goBack(-1)"></a>
		</div>
		<div class="main scroll-y">
			<div class="form-wrap">
				<div class="total">
					<label v-show="!isActive">未激活存力</label>
					<label v-show="isActive">已激活存力</label>
					<span>{{total}} <sub>T</sub></span>
				</div>
				<div class="form">
					<div class="input-wrap">
						<label>转移数量</label>
						<van-field v-model.trim.number="amount" type="number" placeholder="请输入转移数量" clearable></van-field>
						<div class="other">
							<p>可转移: <span>{{total}}</span> T</p>
						</div>
					</div>
					<div class="input-wrap">
						<label>转移账号</label>
						<van-field v-model.trim="phone" type="text" placeholder="请输入转移账号" clearable></van-field>
					</div>
					<div class="input-wrap">
						<label>资金密码</label>
						<van-field v-model.trim="fundPwd" type="password" placeholder="请输入资金密码" clearable></van-field>
					</div>
					<div class="input-wrap">
						<van-field v-model.trim="code" type="text" placeholder="请输入短信验证码" clearable>
							<CountDownBtn slot="button" @click="getCaptcha" v-model="btnDisabled"></CountDownBtn>
						</van-field>
					</div>
					<van-button type="primary" size="large" @click="clickHandler">存力转移</van-button>
				</div>
			</div>
		</div>

		<van-popup v-model="show" position="bottom">
			<h3>确认转移存力</h3>
			<div class="content">
				<ul>
					<li>
						<label>合约名称</label><span>{{$route.query.name}}</span>
					</li>
					<li>
						<label>存力状态</label><span>{{$route.query.isActive == 0 ? '未激活' : '已激活'}}</span>
					</li>
					<li>
						<label>转移数量</label><span>{{amount}} T</span>
					</li>
					<li>
						<label>转移帐号</label><span>{{phone}}</span>
					</li>
				</ul>
				<p>存力转移后立即生效，确认转移存力吗？</p>
				<div class="btn-wrap">
					<van-button type="text" size="small" @click="show = false">取消</van-button>
					<van-button type="primary" size="small" @click="pay">确认</van-button>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
import CountDownBtn from '@/components/common/countDownBtn'
import { getCaptchaPhone2, transMine } from '@/api/request'
import { mapState } from 'vuex'
import Md5 from 'js-md5'
export default {
	data() { 
		return {
			code: '',
			fundPwd: '',
			phone: '',
			amount: '',
			btnDisabled: false,
			show: false,
			isActive: false,
		}
	},
	methods: {
		getCaptcha() {
			this.btnDisabled = true
			getCaptchaPhone2({
				phone: this.userInfo.phone,
				areaCode: this.userInfo.phoneArea,
				type: 'TRADE_AMOUNT'
			}).then(res => {
				this.$toast.success(res.msg)
			}).catch(err => {
				this.btnDisabled = false
			})
		},
		clickHandler() {
			if(this.amount == '') {
				this.$toast('请输入转移数量')
				return
			}
			if(Number(this.amount) > Number(this.total)) {
				this.$toast('存力不足')
				return
			}
			if(this.phone == '') {
				this.$toast('请输入转移帐号')
				return
			}
			if(this.fundPwd == '') {
				this.$toast('请输入资金密码')
				return
			}
			if(this.code == '') {
				this.$toast('请输入短信验证码')
				return
			}
			this.show = true
		},
		pay() {
			transMine({
				code: this.code,
				phone: this.phone,
				fundPwd: Md5(this.fundPwd),
				proId: this.$route.query.id,
				tamount: this.amount
			}).then(res => {
				this.$toast.success(res.msg)
				this.$store.dispatch('getUserInfo')
				this.$router.goBack(-2)
			})
		}
	},
	computed: {
		total() {
			if(this.isActive) {
				if(this.$route.query.isActive == 1) {
					return this.$route.query.tamount
				}else {
					return 0
				}
			}else {
				if(this.$route.query.isActive == 0) {
					return this.$route.query.tamount
				}else {
					return 0
				}
			}
		},
		...mapState(['userInfo'])
	},
	components: {
		CountDownBtn
	}
}
</script>

<style lang="less" scoped>
.transfer-page{
	display: flex;
	flex-direction: column;
	background-color: #FFFFFF;
	.header {
		position: relative;
		background-color: #42C1CA;
		padding: .2rem 0;
		.tab {
			display: flex;
			width: 3rem;
			height: .6rem;
			background-color: #2198A1;
			line-height: .6rem;
			border-radius: .12rem;
			overflow: hidden;
			margin: 0 auto;
			a {
				flex: 1;
				color: #fff;
				text-align: center;
				font-size: .28rem;
				&.active {
					background-color: #fff;
					color: #42C1CA;
				}
			}
		}
		.back {
			position: absolute;
			top: .2rem;
			left: .1rem;
			width: .6rem;
			height: .6rem;
			background: url(../../../../public/img/arrow_left_white.png) no-repeat center;
			background-size: 60%;
		}
	}
	.main {
		.form-wrap {
			position: relative;
			background-color: #42C1CA;
			padding-top: 1.3rem;
			.total {
				position: absolute;
				left: 7%;
				top: .2rem;
				color: #fff;
				width: 86%;
				background: url('../../../assets/img/bg/bg1.png') no-repeat center;
				background-size: 100% 100%;  
				padding: .5rem;
				label {
					display: block;
					font-size: .32rem;
				}
				span {
					display: block;
					text-align: center;
					font-size: .64rem;
					margin-bottom: .3rem;
					sub {
						vertical-align: baseline;
						font-size: .32rem;
					}
				}
			}
			.form {
				background-color: #fff;
				border-radius:.32rem .32rem 0px 0px;
				padding: 1.5rem .5rem .5rem;
				.input-wrap {
					margin-top: .3rem;
					label {
						font-size: .24rem;
						color: #000;
					}
					.van-cell {
						background:rgba(246,249,252,1);
						border-radius: .12rem;
						margin: .1rem 0;
					}
					.other {
						color: #B4B4B4;
						font-size: .24rem;
						span {
							color: #42C1CA;
						}
					}
				}
				.van-button {
					margin-top: .8rem;
				}
			}
		}
	}
	.van-popup {
		border-radius:.32rem .32rem 0px 0px;
		h3 {
			color: #000;
			padding: .5rem 0;
			font-size: .32rem;
			text-align: center;
			border-bottom: 1px solid #DCDCDC;
		}
		.content {
			padding: .5rem;
			ul {
				background:rgba(246,249,252,1);
				border-radius: .12rem;
				padding: .3rem .4rem;
				li {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: .32rem;
					margin: .1rem 0;
					label {
						color: #6D7278;
					}
					span {
						color: #000;
						font-weight: 600;
					}
				}
			}
			p {
				color: #FF0400;
				font-size: .28rem;
				margin: .3rem 0 .8rem;
			}
			.btn-wrap {
				display: flex;
				justify-content: space-between;
				.van-button {
					width: 3rem;
					height: .96rem;
					font-size: .34rem;
					&.van-button--text {
						background-color: #fff;
						border: 1px solid #B4B4B4;
						color: #000;
					}
				}
			}
		}
	}
}
</style>