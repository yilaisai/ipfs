<template>
	<div class="ticket-page">
		<HeaderBar title="购买奖池入场券"></HeaderBar>
		<div class="main scroll-y">
			<div class="summary">
				<h2>奖池入场券</h2>
				<div class="content">
					<h3>{{userInfo.boatTicket}} <sub>张</sub></h3>
					<p>用于奖池抽奖使用</p>
				</div>
			</div>
			<div class="buy">
				<h2>购买</h2>
				<ul>
					<li :class="{'active' : num == item}" v-for="(item, key) in 4" :key="key" @click="num = item">
						<span>{{item}}张</span>
						<label>{{userInfo.boatTicketPrice * item}} USDT</label>
					</li>
				</ul>
				<input type="number" v-model="num" placeholder="自定义数量">
				<p>购买后一律不进行退换哦~</p>
				<van-button type="primary" size="large" @click="showPayPopup">支付</van-button>
			</div>
		</div>

		<van-popup v-model="show" closeable position="bottom" @close="password = ''">
			<h3>奖池入场券</h3>
			<h2>{{num * userInfo.boatTicketPrice}} <sub>USDT</sub></h2>
			<div class="info">
				<label>奖券数量</label>
				<span>{{num}}张</span>
			</div>
			<input v-model="password" type="password" placeholder="请输入您的资金密码">
			<van-button type="primary" size="large" @click="pay">确认支付</van-button>
		</van-popup>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { buyBoatTicket } from '@/api/request'
import Md5 from 'js-md5'
export default {
	data() { 
		return {
			active: '',
			show: false,
			password: '',
			num: ''
		}
	},
	methods: {
		showPayPopup() {
			if(!/(^[1-9]\d*$)/.test(this.num)) {
				this.$toast('购买数量必须为正整数！')
				return
			}
			this.show = true
		},
		pay() {
			buyBoatTicket({
				num: this.num,
				fundPwd: Md5(this.password)
			}).then(res => {
				this.$toast.success(res.msg)
				this.$store.dispatch('getUserInfo')
			})
		}
	},
	computed: {
		...mapState(['userInfo'])
	}
}
</script>

<style lang="less" scoped>
.ticket-page{
	display: flex;
	flex-direction: column;
	.main {
		flex: 1;
		.summary {
			background-color: #fff;
			overflow: hidden;
			h2 {
				padding: .3rem;
				font-size: .34rem;
			}
			.content {
				background: url(../../../../public/img/ticket_bg.png) no-repeat center;
				background-size: 100% 100%;
				margin: 0 .2rem .4rem;
				color: #fff;
				padding: .6rem 0 .2rem;
				text-align: center;
				color: #56853c;
				h3 {
					font-size: .8rem;
					font-weight: 400;
					sub {
						font-size: .36rem;
						vertical-align: baseline;
						font-weight: 400;
					}
				}
				p {
					font-size: .28rem;
					margin-top: .2rem;
					i {
						font-style: normal;
						margin: 0 .2rem;
					}
				}
			}
		}
		.buy {
			padding: 0 .3rem .3rem;
			background-color: #fff;
			overflow: hidden;
			margin-top: .3rem;
			h2 {
				position: relative;
				margin: .3rem 0 .1rem;
				padding-left: .15rem;
				font-size: .34rem;
				&::before {
					content: '';
					position: absolute;
					left: 0;
					top: 0.06rem;
					width: .04rem;
					height: .3rem;
					background-color: #00D984;
					vertical-align: middle;
					border-radius: .02rem;
				}
			}
			ul {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				li {
					width: 48%;
					margin-top: .3rem;
					background-color: #F3F5F6;
					text-align: center;
					border-radius: .08rem;
					padding: .4rem 0;
					border: 1px solid #F3F5F6;
					&.active {
						border: 1px solid #00D984;
						background-color: #fff;
					}
					span {
						display: block;
						font-size: .36rem;
						font-weight: 600;
					}
					label {
						font-size: .28rem;
						color: #999999;
					}
				}
			}
			input {
				height: 1.4rem;
				display: block;
				width: 100%;
				background-color: #F3F5F6;
				margin-top: .3rem;
				color: #333333;
				font-size: .32rem;
				text-align: center;
				border-radius: .08rem;
				&::-webkit-input-placeholder {
					color: #333333 !important;
				}
			}
			p {
				color: #999999;
				margin: .2rem 0 .35rem;
			}
		}
	}

	// 支付弹框
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
		}
		input {
			display: block;
			width: 100%;
			height: 1rem;
			text-align: center;
			border-radius: .08rem;
			background-color: #EEEEEE;
			font-size: .25rem;
			font-weight: 600;
		}
		.van-button {
			margin-top: .7rem;
		}
	}
}
</style>