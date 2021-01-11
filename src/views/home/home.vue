<template>
	<div class="home-page">
		<div class="main">
			<div class="banner">
				<img class="logo" src="../../assets/img/logo.png" alt="">
				<BannerSwiper :list="bannerList" />
				<!-- 滚动公告 -->
				<van-notice-bar :scrollable="false">
					<img slot="left-icon" src="../../../public/img/home/broadcast_icon.png" alt="">
					<van-swipe
						vertical
						class="notice-swipe"
						:autoplay="3000"
						:show-indicators="false"
					>
						<van-swipe-item v-for="(item,index) in noticeList" :key="index" @click="$router.push('/noticeDetails?id=' + item.id)">{{item.title}}</van-swipe-item>
					</van-swipe>
				</van-notice-bar>
			</div>
			<ul class="info">
				<li @click="$router.push('/overView')">
					<span>{{height}}</span>
					<span>区块高度 <img src="../../assets/img/home/right.png" alt=""></span>
				</li>
				<li @click="$router.push('/overView')">
					<span>{{$changeToPiB(overview.totalQualityAdjPower) || 0}} PiB</span>
					<span>全网有效算力 <img src="../../assets/img/home/right.png" alt=""></span>
				</li>
				<li @click="$router.push('/overView')">
					<span>{{overview.activeMiners || 0}}</span>
					<span>活跃矿工数 <img src="../../assets/img/home/right.png" alt=""></span>
				</li>
			</ul>
			<div class="financeBox" v-if="financeList.length">
				<div class="title">
					<span>理财产品</span>
					<span @click="$router.push({path:'/war',query:{type:0}})"><em>查看更多</em><img src="../../assets/img/icon/arrow4.png" alt=""></span>
				</div>
				<ul class="finance-list">
					<li v-for="(item,index) in financeList" :key="index">
						<div class="item-top">
							<p>{{item.name}}</p>
							<span class="tag" v-if="item.remark">{{item.remark}}</span>
						</div>
						<div class="item-btm">
							<div class="finance-rate">
								<span>{{item.rates.split(',')[0]}}%起</span>
								<span>年化利率</span>
							</div>
							<div class="finance-days">
								<span>{{item.days.split(',')[0]}}天起</span>
								<span>稳健收益 低风险</span>
							</div>
							<div>
								<van-button type="primary" @click="$router.push({path:'/financeDetails',query: {goods:JSON.stringify(item)}})">立即购买</van-button>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="productBox" v-if="list.length">
				<div class="title">
					<span>合约产品</span>
					<span @click="$router.push({path:'/war',query:{type:1}})"><em>查看更多</em><img src="../../assets/img/icon/arrow4.png" alt=""></span>
				</div>
				<ul class="list">
					<li v-for="(item,index) in list" :key="index" :class="{'ysq' : item.remainAmount <= 0}">
						<h2>{{item.name}}</h2>
						<p>
							<!-- <span>总云储力：{{$BigNumber(item.remainAmount).plus(item.saleAmount)}}T</span> -->
							<span v-if="item.remainAmount<=20">剩余云储力：{{item.remainAmount}}T</span>
							<span>合约期限：{{Math.floor(item.proTime / 30)}}个月</span>
						</p>
						<s>原价：{{item.orgPrice}} RMB/T</s>
						<h3>现价：{{item.price}} RMB/T</h3>
						<van-button type="primary" size="large" @click="clickHandler(item)">立即购买</van-button>
					</li>
				</ul>
			</div>
			
			<Products />
			<PayPop :showDialog="showPop" @toggleShow="toggleShow" @getData="$router.go(-1)" :item="goods" />
		</div>
	</div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import { getBannersAndNotices, getMinePros, getFinancePros } from '@/api/request'
import BannerSwiper from '@/components/common/bannerSwiper'
import Products from './components/products'
import PayPop from '../war/components/payPop'
import { $http } from '@/axios'
export default {
	data() { 
		return {
			dialogShow: false,
			pageNum: 1,
			list: [],
			loading: false, //是否在加载中
			finished: false, //是否加载完所有数据
			noticeText: '',
			noticeList: [],
			noticeId: '',
			totalReadNotice: 0,
			totalNotice: 0,
			bannerList: [],
			timer:null,
			showPop:false,
			goods:'',
			financeList:[]
		}
	},
	activated() {
		this.$store.dispatch('getUserInfo')
		this.getData()
		this.getFinanceList()
		this.toggleShow(false)
		getBannersAndNotices().then(res => {
			this.bannerList = res.result.banners
			if(res.result.noticeInfos.length > 0) {
				this.noticeText = res.result.noticeInfos[0].content
				this.noticeList = res.result.noticeInfos
			}
		})
	},
	methods: {
		clickHandler(item) {
			if(item.remainAmount <= 0) {
				this.$toast('已售罄')
				return
			}
			this.goods = item
			this.showPop = true
			// this.$router.push({path: '/confirmOrder', query: {goods: item}})
		},
		pay() {
			this.$router.push('/confirmOrder')
		},
		getData() {
			getMinePros({pageNum:1,pageSize:2}).then(res => {
				res.result.list.map(val => {
					val.buyAmount = 1
				})
				this.list = res.result.list
			})
		},
		getFinanceList(){
			getFinancePros({pageNum:1,pageSize:2}).then(res => {
				this.financeList = res.result.list
			})
		},
		toggleShow(val){
			this.showPop = val
		}
	},
	computed: {
		...mapState(['userInfo','overview','height'])
	},
	components: {
		BannerSwiper,
		Products,
		PayPop
	}
}
</script>

<style lang="less" scoped>
.home-page{
	.main {
		position: relative;
		overflow: hidden;
		.banner {
			background: #fff url(../../assets/img/bg/bg4.png) no-repeat top center;
			background-size: 100% 2.77rem;
			overflow: hidden;
			.logo {
				display: block;
				height: .6rem;
				margin: .2rem auto;
			}
		}
		.info {
			width: 100%;
			background: #FFF;
			border-top:.01rem solid #E6E6E6;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: .1rem 0.15rem 0;
			box-sizing: border-box;
			li {
				flex:1;
				height:1.56rem;
				padding-top:.3rem;
				background: url(../../assets/img/bg/bg14.png) no-repeat top center;
				background-size: 100% 1.56rem;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				span {
					color:#FFF;
					&:first-of-type {
						margin-bottom:.2rem;
					}
					img {
						width:.08rem;
					}
				}
			}
		}
		.van-notice-bar {
			position: relative;
			z-index: 12;
			width: 88%;
			background: #fff;
			margin: .2rem auto;
			height: .6rem;
			padding: 0;
			color: #000000;
			img {
				width: .3rem;
				height: .3rem;
				margin-right: .1rem;
			}
			.notice-swipe {
				height: .6rem;
				line-height: .6rem;
				/deep/.van-swipe-item {
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}
		.financeBox {
			background: #FFF;
			margin:.2rem 0;
			.title {
				height:.92rem;
				padding:0 .3rem;
				border-bottom:.01rem solid #D8D8D8;
				display: flex;
				justify-content: space-between;
				align-items: center;
				span {
					&:first-of-type {
						font-weight: bold;
						font-size:.32rem;
						color:#000;
					}
					&:last-of-type {
						height:100%;
						display: flex;
						align-items: center;
						em {
							font-style: normal;
							font-size:.24rem;
							color:#969696;
						}
						img {
							width:.12rem;
							height:.2rem;
							margin-left:.05rem;
						}
					}
				}
			}
			.finance-list {
				padding:0 .3rem;
				li {
					padding:.4rem 0;
					border-bottom:.01rem solid #D8D8D8;
					display: flex;
					flex-direction: column;
					&:last-of-type {
						border-bottom:none;
					}
					.item-top {
						display: flex;
						align-items: center;
						margin-bottom:.24rem;
						p {
							font-size:.28rem;
							color:#000;
							margin-right:.1rem;
						}
						span {
							padding:.04rem .15rem;
							border:.01rem solid #969696;
							border-radius: .14rem;
							color:#969696;
							font-size:.2rem;
							box-sizing: border-box;
							line-height: 1em;
						}
					}
					.item-btm {
						display: flex;
						>div {
							flex:1;
							display: flex;
							flex-direction: column;
							justify-content: flex-end;
							&.finance-rate {
								span {
									&:first-of-type {
										margin-bottom:.1rem;
										line-height: 1em;
										color:#FF6E1F;
										font-size:.42rem;
										font-weight: bold;
									}
									&:last-of-type {
										line-height: 1em;
										color:#969696;
										font-size:.2rem;
									}
								}
							}
							&.finance-days {
								span {
									&:first-of-type {
										margin-bottom:.15rem;
										line-height: 1em;
										color:#323232;
										font-size:.32rem;
										font-weight: bold;
									}
									&:last-of-type {
										line-height: 1em;
										color:#969696;
										font-size:.2rem;
									}
									
								}
							}
							&:last-of-type {
								align-items: flex-end;
								/deep/ .van-button {
									flex:1;
									width:1.6rem;
									height:.72rem;
									background-color: #FA6400;
									border: 1px solid #FA6400;
									font-size:.26rem;
									font-weight: bold;
									padding:0;
								}
							}
							
						}
					}
				}
			}
		}
		.productBox {
			background: #FFF;
			padding:.3rem;
			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				span {
					&:first-of-type {
						font-weight: bold;
						font-size:.32rem;
						color:#000;
					}
					&:last-of-type {
						height:100%;
						display: flex;
						align-items: center;
						em {
							font-style: normal;
							font-size:.24rem;
							color:#969696;
						}
						img {
							width:.12rem;
							height:.2rem;
							margin-left:.05rem;
						}
					}
				}
			}
			.list {
				display: flex;
				justify-content: space-between;
				li {
					position: relative;
					width: 3.35rem;
					background: url(../../assets/img/bg/bg6.png) no-repeat top right;
					background-size: 1rem 1rem;
					margin-top: .3rem;
					// box-shadow: 4px 12px 30px -12px rgba(220,220,220,0.8);
					border:.01rem solid #DCDCDC;
					padding: .4rem;
					box-sizing: border-box;
					p {
						min-height:1rem;
						background:rgba(241,244,247,1);
						border-radius:8px;
						padding: .2rem;
						margin: .2rem 0;
						color: #787878;
						font-size: .22rem;
						display: flex;
						flex-direction: column;
						justify-content: center;
						span {
							display: block;
						}
					}
					s {
						font-size: .2rem;
						color: #AAAAAA;
					}
					h2 {
						width: 2rem;
						word-break: break-all;
					}
					h3 {
						color: #FA6400;
						font-size: .24rem;
					}
					.van-button {
						height: .66rem;
						background-color: #FA6400;
						border: 1px solid #FA6400;
						font-size: .26rem;
						margin-top: .2rem;
					}
					&.ysq {
						&::after {
							content: '';
							position: absolute;
							top: 1.4rem;
							right: .1rem;
							width: 1.2rem;
							height: 1rem;
							background: url(../../assets/img/ysq.png) no-repeat center;
							background-size: 100% 100%;
						}
					}
				}
			}
		}
	}
	
	.van-dialog {
		.van-dialog__content {
			p {
				margin-bottom: .3rem;
				font-size: .3rem;
			}
			.close {
				position: absolute;
				top: .15rem;
				right: .15rem;
				z-index: 1212;
				width: .5rem;
				height: .5rem;
				background: url(../../../public/img/close_icon.png) no-repeat center;
				background-size: 100% 100%;
			}
		}
	}
}
</style>