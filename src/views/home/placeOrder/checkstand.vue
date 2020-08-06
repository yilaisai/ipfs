<template>
	<div class="checkstand-page">
		<HeaderBar title="收银台" :shadow="true"></HeaderBar>
		<div class="main scroll-y">
			<ul>
				<li><label>订单金额</label><span class="highlight">¥ {{$route.query.price}}</span></li>
				<li><label>订单编号</label><span>{{orderId}}</span></li>
				<li><label>下单时间</label><span>{{payTime}}</span></li>
			</ul>
			<h2 v-show="payType == 0">选择支付方式</h2>
			<div class="payment" v-show="payType == 0">
				<div class="item" @click="payType = 1">
					<img src="../../../assets/img/icon/usdt_icon.png" alt="">
					<span>USDT (ERC20) 支付</span>
					<van-icon name="arrow" />
				</div>
				<div class="item" @click="payType = 2">
					<img src="../../../assets/img/icon/alipay.png" alt="">
					<span>支付宝支付</span>
					<van-icon name="arrow" />
				</div>
				<div class="item" @click="payType = 2">
					<img src="../../../assets/img/icon/wx.png" alt="">
					<span>微信支付</span>
					<van-icon name="arrow" />
				</div>
				<div class="item" @click="payType = 2">
					<img src="../../../assets/img/icon/bankcard.png" alt="">
					<span>银行卡支付</span>
					<van-icon name="arrow" />
				</div>
			</div>

			<h2 v-show="payType == 2">请联系客服确认支付款项，谢谢！</h2>
			<div class="form" v-show="payType == 2">
				<div class="form-item">
					<label><img src="../../../assets/img/icon/email.png" alt="">邮箱</label>
					<div class="input-wrap">
						<p>{{userInfo.connectEmail}}</p>
						<a
							href="javascript:;"
							v-clipboard:copy="userInfo.connectEmail"
							v-clipboard:success="onCopy"
							v-clipboard:error="onError">
						</a>
					</div>
				</div>
			</div>

			<h2 v-show="payType == 1"><img src="../../../assets/img/icon/usdt_icon.png" alt=""> USDT (ERC20)</h2>
			<div class="form" v-show="payType == 1">
				<div class="qr-img">
					<vue-qr :text="userInfo.address" :margin="0"></vue-qr>
				</div>
				<div class="form-item">
					<label>收款地址</label>
					<div class="input-wrap">
						<p>{{userInfo.address}}</p>
						<a
							href="javascript:;"
							v-clipboard:copy="userInfo.address"
							v-clipboard:success="onCopy"
							v-clipboard:error="onError">
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<van-button v-show="payType == 0" type="primary" size="large" @click="$router.goBack(-1)">返回</van-button>
			<van-button v-show="payType != 0" type="primary" size="large" @click="payType = 0">选择其他支付方式</van-button>
		</div>
	</div>
</template>

<script>
import vueQr from 'vue-qr'
import { mapState } from 'vuex'
export default {
	data() { 
		return {
			payType: 0,
			orderId: new Date().getTime(),
			payTime: this.$fmtDate(new Date(), 'full')
		}
	},
	methods: {
		pay() {},
		onCopy(){
			this.$toast('复制成功')
		},
		onError(err){
			this.$toast('复制失败，请手动复制')
		},
	},
	components: {
		vueQr
	},
	computed: {
		...mapState(['userInfo'])
	}
}
</script>

<style lang="less" scoped>
.checkstand-page{
	display: flex;
	flex-direction: column;
	.main {
		flex: 1;
		background-color: #fff;
		ul {
			background-color: #fff;
			padding: .4rem;
			li {
				display: flex;
				justify-content: space-between;
				margin-top: .2rem;
				font-size: .3rem;
				label {
					color: #6D7278;
				}
				span {
					color: #000;
					&.highlight {
						color: #FA6400;
						font-weight: 600;
					}
				}
				&:first-child {
					margin-top: 0;
				}
			}
		}
		h2 {
			background-color: #fff;
			border-bottom: 1px solid #E6E6E6;
			padding: .4rem;
			border-top: .2rem solid #F1F4F7;
			img {
				width: .6rem;
				height: .6rem;
				vertical-align: middle;
				margin-right: .2rem;
			}
		}
		.payment {
			background-color: #fff;
			padding: .4rem;
			.item {
				display: flex;
				align-items: center;
				border-radius: .12rem;
				border:1px solid rgba(230,230,230,1);
				padding: .3rem .4rem;
				font-weight: bold;
				font-size: .3rem;
				margin-bottom: .2rem;
				&:last-child {
					margin-bottom: 0;
				}
				img {
					width: .6rem;
					height: .6rem;
				}
				span {
					margin: 0 .2rem;
					flex: 1;
					color: #323232;
				}
			}
		}
		.form {
			padding: .4rem;
			background-color: #fff;
			.qr-img {
				text-align: center;
				margin: .2rem 0 .6rem;
				img {
					width: 2.4rem;
					height: 2.4rem;
				}
			}
			.form-item {
				label {
					font-size: .28rem;
					color: #000;
					img {
						height: .28rem;
						margin-right: .1rem;
						vertical-align: middle;
					}
				}
				.input-wrap {
					display: flex;
					align-items: center;
					background:rgba(246,249,252,1);
					border-radius: .12rem;
					margin-top: .1rem;
					padding: .2rem 0;
					p {
						flex: 1;
						word-break: break-all;
						font-size: .32rem;
						color: #FA6400;
						font-weight: bold;
						padding: 0 .4rem;
						border-right: 1px solid #D1DBE5;
					}
					a {
						height: .56rem;
						width: .56rem;
						background: url(../../../assets/img/icon/copy.png) no-repeat center;
						background-size: 56% 56%;
						margin: 0 .2rem;
					}
				}
			}
		}
	}
	.footer {
		position: relative;
		z-index: 2;
		padding: .5rem;
		background-color: #fff;
		box-shadow:0px 0px 10px 0px rgba(126,151,168,0.2);
		.van-button {
			background-color: #FA6400;
			border: 1px solid #FA6400;
		}
	}
}
</style>