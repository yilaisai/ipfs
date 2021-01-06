<template>
	<div class="earnings-list">
		<HeaderBar title="收益记录" :back="false" :shadow="true" color="white"></HeaderBar>
		<div class="main">
			<ul>
				<li class="head"><span>币种</span><span>挖矿云储力 (T)</span><span>24小时收益</span><span>账户余额</span></li>
				<li v-for="(item,index) in coinList" :key="index" @click="$router.push('/earningsDetails?coin=' + item)">
					<span>
						<img :src="'./img/coin/' + item + '.png'" alt="">
						<i>{{item}}</i>
					</span>
					<span>{{item == "FIL"?userInfo.activeTAmount:0}}</span>
					<span>{{item == "FIL"?userInfo.baseReward:0}}</span>
					<span>{{item == "FIL"?userInfo.amount:0}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() { 
		return {
			coinList: ['FIL', 'BTC', 'BHD', 'EOS', 'ETH', 'ZEC'],
		}
	},
	computed: {
		...mapState(['userInfo'])
	}
}
</script>

<style lang="less" scoped>
.earnings-list{
	background-color: #fff;
	.main {
		ul {
			li {
				display: flex;
				padding: .4rem .2rem;
				border-bottom: 1px solid #E6E6E6;
				span {
					flex: 1;
					font-size: .28rem;
					font-weight: bold;
					color: #000000;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					img {
						width: .4rem;
						height: .4rem;
						vertical-align: middle;
						margin-right: .1rem;
					}
					i {
						font-style: normal;
						vertical-align: middle;
					}
					&:last-child {
						width: 1.8rem;
						text-align: right;
						flex: none;
						
					}
					&:nth-child(1) {
						width: 1.2rem;
						flex: none;
					}
					&:nth-child(2) {
						text-align: center;
					}
					&:nth-child(3) {
						text-align: center;
					}
				}
				&.head {
					background-color: #F1F4F7;
					padding: .2rem .2rem;
					border-bottom: none;
					span {
						font-size:0.24rem;
						font-weight: 400;
						color: #969696;
					}
				}
			}
		}
	}
}
</style>