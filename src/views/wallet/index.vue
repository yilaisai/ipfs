<template>
	<div class="wallet-page">
		<div class="summary">
			<HeaderBar title="钱包" color="transparent">
				<van-icon name="description" @click="$router.push('/orderList')" />
			</HeaderBar>
			<div class="balance">
				<h2>当前可用余额</h2>
				<h1>{{userInfo.amount}}</h1>
				<h3>冻结：{{userInfo.frozenAmount}} USDT</h3>
			</div>
			<div class="tab">
				<span :class="{'active' : active == 1}" @click="active = 1">充值</span>
				<span :class="{'active' : active == 2}" @click="active = 2">提现</span>
			</div>
		</div>
		<div class="main scroll-y">
			<Recharge v-show="active == 1"></Recharge>
			<Withdraw v-show="active == 2"></Withdraw>
		</div>
	</div>
</template>

<script>
import Recharge from './components/recharge'
import Withdraw from './components/withdraw'
import { mapState } from 'vuex'
export default {
	data() { 
		return {
			active: 1
		}
	},
	computed: {
		...mapState(['userInfo'])
	},
	components: {
		Recharge,
		Withdraw
	}
}
</script>

<style lang="less" scoped>
.wallet-page{
	display: flex;
	flex-direction: column;
	.summary {
		position: relative;
		background: linear-gradient(-27deg,rgba(0,217,132,1) 0%,rgba(14,216,171,1) 100%);
		color: #fff;
		.com-header-bar {
			.van-icon {
				font-size: .4rem;
				vertical-align: sub;
			}
		}
		.balance {
			text-align: center;
			padding: .26rem 0 1.2rem;
			h2 {
				font-weight: 400;
				font-size: .25rem;
			}
			h1 {
				font-size: .6rem;
				margin: .22rem 0;
			}
			h3 {
				font-weight: 400;
				font-size: .25rem;
			}
		}
		.tab {
			display: flex;
			align-items: center;
			position: absolute;
			z-index: 1012;
			left: 10%;
			bottom: -.6rem;
			background-color: #fff;
			border-radius: .26rem;
			height: 1.2rem;
			width: 80%;
			font-size: .36rem;
			box-shadow: 0px 2px .2rem 0px rgba(0,76,46,0.08);
			span {
				flex: 1;
				color: #999999;
				text-align: center;
				font-weight: 500;
				&:first-child {
					border-right: 2px solid #EEEEEE;
				}
				&.active {
					color: #00D984;
				}
			}
		}
	}
	.main {
		flex: 1;
		
	}
}
</style>