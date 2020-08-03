<template>
	<div class="assets-page">
		<HeaderBar title="资产管理"></HeaderBar>
		<div class="immobile">
			<div class="banlance">
				<div>
					<label>钱包余额 ({{assetInfo.coinName}})</label>
					<h3 class="primary-color">{{assetInfo.totalAmount}}</h3>
				</div>
				<span>可用 : {{assetInfo.amount}}</span>
				<span>冻结 : {{assetInfo.frozenAmount}}</span>
			</div>
			<div class="btn-wrap">
				<a href="javascript:;" @click="$router.push('/recharge')"><img src="../../../public/img/rechange_icon.png" alt="">充值</a>
				<a href="javascript:;" @click="withdraw"><img src="../../../public/img/extract_icon.png" alt="">提现</a>
			</div>
			<div class="list-search">
				<h4>资金流水</h4>
				<div class="menu">
					<label>类型：</label>
					<DropdownMenu v-model="optType" :options="optTypeMap"></DropdownMenu>
				</div>
			</div>
		</div>
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="getData"
			>
			<div v-for="(item, index) in list" :key="index" class="item">
				<p><span class="primary-color" :class="{'green' : item.subOrAdd == 0}">{{item.subOrAdd == 1 ? '+' : '-'}}{{item.amount}} {{item.coinName}}</span><span>{{item.createTime}}</span></p>
				<p><span>动账前金额 : {{item.beforeBalance}} {{item.coinName}}</span><span>出账类型 : {{item.typeStr}}</span></p>
				<p><span>动账后金额 : {{item.afterBalance}} {{item.coinName}}</span></p>
			</div>
		</van-list>
	</div>
</template>

<script>
import { myAccount, userCoinChange } from '@/api/request'
import { mapState } from 'vuex'
import DropdownMenu from '@/components/common/dropdownMenu.vue'
export default {
	data() { 
		return {
			value: 0,
			optTypeMap: [
				{ text: '全部', value: '' },
				{ text: '充币', value: '0' },
				{ text: '提币', value: '1' },
				{ text: '投资本金', value: '2' },
				{ text: '投资收益', value: '3' },
				{ text: '激活', value: '4' },
				{ text: '团队奖励', value: '5' },
			],
			list: [],
			loading: false,
			finished: false,
			optType: '',
			pageNum: 1
		}
	},
	mounted() {
		this.getData()
		this.$store.dispatch('getUserAssetInfo')
	},
	methods: {
		getData() {
			this.loading = true
			userCoinChange({
				optType: this.optType,
				pageNum: this.pageNum,
				pageSize: 20
			}).then(res => {
				this.loading = false
				this.list = this.list.concat(res.result.list)
				if(!res.result.hasNextPage) {
					this.finished = true
				}
				this.pageNum++
			})
		},
		withdraw(){
			if(this.userInfo.isSetFund){
				this.$router.push('/withdraw')
			}else{
				this.$dialog.confirm({
					message: '该操作需要先设置资金密码！',
						confirmButtonText:'去设置'
					}).then(() => {
						this.$router.push('/updateFundsPwd')
					}).catch(() => {
				});
			}
			
		} 
	},
	watch: {
		optType(newVal, oldVal) {
			console.log(newVal)
			this.pageNum = 1
			this.list = []
			this.finished = false
			this.getData()
		}
	},
	computed: {
		...mapState(['assetInfo','userInfo'])
	},
	components: {
		DropdownMenu
	}
}
</script>

<style lang="less" scoped>
.assets-page{
	display: flex;
	flex-direction: column;
	.immobile {
		.banlance {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			padding: .2rem .3rem;
			color: #fff;
			div {
				h3 {
					font-size: .48rem;
					margin-top: .1rem;
					color: #FFF200;
				}
			}
			span {
				margin-bottom: .1rem;
			}
		}
		.btn-wrap {
			display: flex;
			padding: .16rem 0;
			border-top: 0.01rem solid rgba(196,37,17,1);
			
			a {
				flex: 1;
				text-align: center;
				font-size: .28rem;
				padding: .1rem 0;
				color: #fff;
				&:first-child {
					border-right: 0.01rem solid rgba(196,37,17,1);
				}
				img {
					width: .28rem;
					vertical-align: middle;
					margin-right: .15rem;
				}
			}
		}
		.list-search {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: .28rem .3rem;
			font-size: .28rem;
			background-color: #DA2F1A;
			label {
				font-size: .2rem;
				color: #fff;
			}
			h4 {
				color: #FFFFFF;
				font-size: .28rem;
			}
			.van-dropdown-menu {
				background-color: transparent;
				&::after {
					display: none;
				}
				/deep/.van-dropdown-menu__title {
					color: #C7D1E7;
					.van-ellipsis {
						font-size: .28rem;
					}
				}
			}
		}
	}
	.van-list {
		flex: 1;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		padding: 0 .3rem;
		background-color: #DA2F1A;
		.item {
			background-color: #FFF1D4;
			border-radius: .08rem;
			margin-bottom: .15rem;
			padding: .2rem;
			font-size: .2rem;
			p {
				display: flex;
				justify-content: space-between;
				.primary-color {
					font-size: .28rem;
					color: #DA2F1A;
				}
				.green {
					color: #3CC5A4 !important;
				}
				&:first-child {
					margin-bottom: .1rem;
				}
			}
		}
	}
}
</style>