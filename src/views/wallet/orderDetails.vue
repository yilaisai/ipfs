<template>
	<div class="order_details-page">
		<HeaderBar title="流水详情"></HeaderBar>
		<div class="main">
			<h3>{{pageInfo.transType == 1 ? '提币' : '充值'}}({{pageInfo.coinName}})</h3>
			<h2>{{pageInfo.subOrAdd == 0 ? '-' : '+'}}{{pageInfo.transType == 2 ? $BigNumber(pageInfo.amount).minus(pageInfo.fee) : pageInfo.amount}}</h2>
			<ul>
				<li>
					<label>类型</label>
					<span>{{pageInfo.transType == 1 ? '提币' : '充值'}}</span>
				</li>
				<li>
					<label>状态</label>
					<span>{{pageInfo.status == 1 ? '成功' : '失败'}}</span>
				</li>
				<li>
					<label>主网</label>
					<span>{{pageInfo.coinId == 9 ? 'OMNI' : 'ERC20'}}</span>
				</li>
				<li v-if="pageInfo.transType == 1">
					<label>提币地址</label>
					<span>{{pageInfo.toAddr}}</span>
				</li>
				<li v-else>
					<label>充币地址</label>
					<span>{{pageInfo.fromAddr}}</span>
				</li>
				<li v-if="pageInfo.optType == 0 || pageInfo.optType == 1">
					<label>TXID</label>
					<span>{{pageInfo.txId}}</span>
				</li>
				<li>
					<label>手续费</label>
					<span>{{pageInfo.fee}} USDT</span>
				</li>
				<!-- <li v-if="pageInfo.optType == 19">
					<label>收益提取券</label>
					<span>{{pageInfo.fee}} USDT</span>
				</li> -->
				<li>
					<label>时间</label>
					<span>{{pageInfo.createTime}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() { 
		return {
			pageInfo: this.$route.query.data
		}
	},
	mounted() {
		console.log(this.$route.query.data)

	}
}
</script>

<style lang="less" scoped>
.order_details-page{
	.main {
		background-color: #ffffff;
		padding: 0 .4rem;
		ul {
			border-top: 2px solid #EEEEEE;
			margin-top: .6rem;
			padding: .4rem 0;
			li {
				display: flex;
				align-items: center;
				font-size: .26rem;
				margin-top: .3rem;
				&:first-child {
					margin-top: 0;
				}
				label {
					color: #999999;
					min-width: 1.6rem;
				}
				span {
					flex: 1;
					word-break: break-all;
				}
			}
		}
	}
	h3 {
		padding: .6rem 0 .4rem;
		text-align: center;
		font-size: .32rem;
		font-weight: 500;
	}
	h2 {
		text-align: center;
		font-size: .52rem;
	}
}
</style>