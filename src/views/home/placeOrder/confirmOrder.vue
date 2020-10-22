<template>
	<div class="confirm-order-page">
		<HeaderBar title="确认订单" :shadow="true"></HeaderBar>
		<div class="main">
			<div class="goods">
				<h3>{{goods.name}}</h3>
				<div class="content">
					<img src="../../../assets/img/goods1.png" alt="">
					<div class="ctn-right">
						<h4>{{goods.name}}</h4>
						<div>
							<span>¥ {{goods.price}}</span>
							<label>数量</label>
							<van-stepper v-model="goods.buyAmount" integer min="1" :max="goods.remainAmount" />
						</div>
					</div>
				</div>
				<p><label>购买帐号</label><span>{{userInfo.phone}}</span></p>
				<h5><p><label>商品小计</label><span>¥ {{$BigNumber(goods.price).times(goods.buyAmount)}}</span></p></h5>
			</div>
			<van-button type="primary" size="large" @click="pay">立即支付</van-button>
		</div>
		<van-dialog v-model="show" title="标题" :show-confirm-button="false" @confirm="pay">
			<div class="content">
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
				<p>凡事都很垃圾打</p>
			</div>
			<van-checkbox v-model="checked">我已阅读并同意</van-checkbox>
			<div class="btns">
				<van-button type="default" class="cancel" @click="show = false">取消</van-button>
				<van-button type="primary" class="confirm" @click="pay">确定</van-button>
			</div>
		</van-dialog>
	</div>
	
</template>
<script>
import { mapState } from 'vuex'
export default {
	data() { 
		return {
			value: 1,
			goods: {},
			show:false,
			checked:false
		}
	},
	created() {
		this.goods = this.$route.query.goods
		console.log(this.goods)
	},
	methods: {
		pay() {
			// if(!this.checked) {
			// 	this.$toast('请阅读并同意合约！')
			// 	return
			// }
			this.$router.replace('/checkstand?price=' + this.$BigNumber(this.goods.price).times(this.goods.buyAmount))
		}
	},
	computed: {
		...mapState(['userInfo','assetInfo'])
	}
}
</script>

<style lang="less" scoped>
.confirm-order-page{
	.main {
		.goods {
			position: relative;
			background: #fff;
			border-top: 1px solid #fff;
			h3 {
				width: 90%;
				margin: .3rem auto .2rem;
				font-size: .34rem;
			}
			.content {
				display: flex;
				align-items: center;
				width: 90%;
				margin: 0 auto;
				background-color: #F1F4F7;
				img {
					width: 1.8rem;
					height: 1.8rem;
				}
				.ctn-right {
					flex: 1;
					margin: 0 .3rem 0 .2rem;
					h4 {
						font-size: .34rem;
						font-weight: 400;
					}
					&>div {
						display: flex;
						align-items: center;
						margin-top: .2rem;
						label {
							font-size: .24rem;
							color: #969696;
							margin-right: .1rem;
						}
						span {
							flex: 1;
							font-size: .28rem;
							color: #FA6400;
							font-weight: bold;
						}
						/deep/.van-stepper {
							button {
								background-color: #fff !important;
							}
							.van-stepper__input {
								background-color: #fff;
							}
						}
					}
				}
			}
			p {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 90%;
				margin: 0 auto;
				font-size: .3rem;
				padding: .3rem 0;
				label {
					color: #6D7278;
					font-weight: 400;
				}
			}
			h5 {
				border-top: 1px solid #E6E6E6;
				p {
					span {
						color: #FA6400;
					}
				}
			}
			&::after {
				content: '';
				position: absolute;
				z-index: -1;
				bottom: -.13rem;
				left: 0;
				width: 100%;
				height: .25rem;
				background: url(../../../assets/img/bg/bg7.png) no-repeat center;
				background-size: 100% 100%;
			}
		}
		.van-button {
			display: block;
			background-color: #FA6400;
			width: 86%;
			height: .96rem;
			font-size: .34rem;
			border: 1px solid #FA6400;
			margin: 1.2rem auto 0;
		}
	}
}
/deep/ .van-dialog {
	.van-dialog__header {
		padding:.3rem 0 ;
	}
	.van-dialog__content {
		padding:0 .3rem .3rem .4rem;
		.content {
			margin-bottom:.3rem;
			max-height:5rem;
			overflow-y:auto;
			font-size:.24rem;
		}
		.van-checkbox {
			font-size:.24rem;
			.van-checkbox__icon {
				font-size:.28rem;
			}
		}
		.btns {
			padding:0 .2rem;
			margin-top:.2rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.van-button {
				flex:1;
				margin-right:.5rem;
				&:last-of-type {
					margin-right:0;
				}
			}
			.cancel {
				color:#232323;
			}
			.confirm {
				background: #FA6400;
				border:1px solid #FA6400;
			}
		}
	}
}
</style>