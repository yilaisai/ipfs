<template>
	<div class="earnings-page">
		<div class="banner">
			<HeaderBar :title="coin + '收益记录'" color="transparent"></HeaderBar>
			<div class="content">
				<div class="flex-wrap">
					<div>
						<img :src="'./img/coin/' + coin + '.png'" alt="">
						<h3>0</h3>
						<span>累计收益({{coin}})</span>
					</div>
					<div>
						<img :src="'./img/coin/' + coin + '.png'" alt="">
						<h3>0</h3>
						<span>账户余额({{coin}})</span>
					</div>
				</div>
				<van-button type="primary" size="large" @click="withdraw">提现</van-button>
			</div>
			<!-- <div class="coin-select">
				<div class="selected" @click="selectShow = !selectShow">
					<img :src="'./img/coin/' + coin + '.png'" alt="">
					<span>{{coin}}</span>
					<i :class="{'off' : !selectShow}"></i>
				</div>
				<ul v-show="selectShow">
					<li v-for="(item,index) in coinList" :key="index" @click="coin = item; selectShow = false">
						<img :src="'./img/coin/' + item + '.png'" alt="">
						<span>{{item}}</span>
					</li>
				</ul>
			</div> -->
		</div>
		<div class="table">
			<ul>
				<li class="head">
					<span>挖矿云储力 (T)</span>
					<span>24小时收益 ({{coin}})</span>
					<span>收益类型</span>
					<span>时间 </span>
				</li>
			</ul>
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="list">
				<van-empty class="empty-image" :image="'./img/empty.png'" description="暂时还没有收益信息哦" v-if="!list.length"/>
				<van-list
					v-model="loading"
					:finished="finished"
					finished-text="没有更多了"
					@load="onLoad"
					v-else
				>
					<van-cell v-for="item in list" :key="item">
						<span>98,998,859</span>
						<span>988,867</span>
						<span>基础收益</span>
						<span>2020.02.05</span>
					</van-cell>
				</van-list>
			</van-pull-refresh>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { getMineRewardList } from '@/api/request'
export default {
	data() { 
		return {
			coin: 'FIL',
			coinList: ['BTC', 'ETH', 'EOS', 'XMR', 'FIL'],
			selectShow: false,
			list:[],
			loading: false,
			finished: false,
			refreshing:false,
			formData:{
				pageNum:1,
				pageSize:10,
			},
			total:0,
		}
	},
	mounted() {
		this.coin = this.$route.query.coin
		this.getList()
	},
	methods: {
		getList(){
				getMineRewardList({
					pageNum : this.formData.pageNum,
					pageSize : this.formData.pageSize
				}, {noLoading: true}).then(res => {
					if (this.refreshing) {
						this.list = []
						this.refreshing = false
					}
					let list = res.result.list
					this.total = res.result.total
					for (let i = 0 ; i <list.length ; i++) {
						this.list.push(list[i])
					}
					this.loading = false
					if (this.list.length>this.total) {
						this.finished = true;
					}
				})
		},
		getMoreList(){
			getMineRewardList({
				pageNum : this.formData.pageNum,
				pageSize : this.formData.pageSize
			}, {noLoading: true}).then(res => {
				if (this.refreshing) {
					this.list = []
					this.refreshing = false
					this.formData.pageNum = 1
				}
				let list = res.result.list
				this.total = res.result.total
				for (let i = 0 ; i <list.length ; i++) {
					this.list.push(list[i])
				}
				this.loading = false
				if (this.list.length>this.total) {
					this.finished = true;
				}
			})
		},
		withdraw() {
			this.$router.push({path:'/withdraw',query:{'coin':this.coin}})
		},
		onLoad(){
			this.formData.pageNum++
			this.getList()
		},
		onRefresh(){
			this.formData.pageNum = 1
			this.finished = false;
			this.loading = true;
			this.getList()
			this.$toast('刷新列表')
		}
	},
	computed: {
		...mapState(['userInfo'])
	}
}
</script>

<style lang="less" scoped>
.earnings-page{
	background-color: #fff;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	.banner {
		background: #F1F4F7 url(../../../assets/img/bg/bg11.png) no-repeat top center;
		background-size: 100% auto;
		// overflow: hidden;
		.content {
			width: 92%;
			margin: 0.54rem auto .3rem;
			background:rgba(255,255,255,1);
			box-shadow:0rem 0.04rem 0.16rem 0rem rgba(12,81,86,0.2);
			border-radius:0.18rem;
			padding: .3rem;
			.flex-wrap {
				display: flex;
				background-color: #F0F3F6;
				border-radius:0.12rem;
				padding: .34rem;
				div {
					flex: 1;
					text-align: center;
					&:first-child {
						border-right: 2px solid #E0E3E6;
					}
					img {
						display: block;
						width: .6rem;
						height: .6rem;
						margin: 0 auto .1rem;
					}
					h3 {
						font-size:0.36rem;
						color: #FA6400;
					}
					span {
						font-size:0.2rem;
						color: #000;
					}
				}
			}
			.van-button {
				margin-top: .2rem;
				height: .72rem;
				line-height: .72rem;
				font-size: 0.28rem;
			}
		}
		.coin-select {
			position: absolute;
			top: .2rem;
			right: .3rem;
			.selected {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height:0.64rem;
				width: 1.8rem;
				background:rgba(0,0,0,0.6);
				border-radius:0.32rem;
				border:0.02rem solid rgba(116,246,255,1);
				padding: 0 .2rem 0 .1rem;
				img {
					height: .4rem;
					width: .4rem;
				}
				span {
					font-size:0.28rem;
					font-weight: bold;
					color: #fff;
				}
				i {
					width: .16rem;
					height: .1rem;
					background: url(../../../assets/img/icon/arrow1.png) no-repeat center;
					background-size: 100% 100%;
					&.off {
						transform: rotate(180deg);
					}
				}
			}
			ul {
				width: 1.8rem;
				background:rgba(0,0,0,0.6);
				border-radius:0.18rem;
				border:0.02rem solid rgba(116,246,255,1);
				margin-top: .05rem;
				li {
					display: flex;
					align-items: center;
					padding: .1rem 0;
					img {
						height: .4rem;
						width: .4rem;
						margin: 0 .2rem 0 .1rem;
					}
					span {
						font-size:0.28rem;
						font-weight: bold;
						color: #fff;
					}
				}
			}
		}
	}
	.table {
		flex:1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		ul {
			li {
				display: flex;
				align-items: center;
				padding: 0 .4rem;
				span {
					flex: 1;
					text-align: center;
					&:first-of-type {
						width:28%;
						flex:none;
						text-align: left;
					}
					&:nth-of-type(2) {
						width:30%;
						flex:none;
					}
					&:last-of-type {
						text-align: right;
					}
				}
				&.head {
					border-bottom: 1px solid #E6E6E6;
					height: .64rem;
					span {
						font-size: .24rem;
						color: #969696;
					}
				}
			}
		}
		.list {
			flex:1;
			overflow-y: auto;
		}
		/deep/ .van-list {
			.van-cell {
				height:.8rem;
				padding:0 .4rem;
				background: rgba(216,216,216,.2);
				&:nth-of-type(2n){
					background: #FFF;
				}
				.van-cell__value {
					display: flex;
					align-items: center;
					span {
						flex:1;
						text-align: center;
						font-size:.22rem;
						color:#000;
						&:first-of-type {
							width:28%;
							flex:none;
							text-align: left;
						}
						&:nth-of-type(2) {
							width:30%;
							flex:none;
						}
						&:last-of-type {
							text-align: right;
						}
					}
				}
				&::after{
					border-bottom:0;
				}
			}
		}
		/deep/.empty-image {

			.van-empty__image {
				height: auto;
				img {
					display: block;
					width: 1.2rem;
					height: 1.2rem;
					margin: 1rem auto 0;
				}
			}
			.van-empty__description {
				font-size: .28rem;
				color: #BAC9DC;
			}
		}
	}
}
</style>