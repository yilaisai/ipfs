<template>
	<div class="war-page">
		<div class="header">商品列表</div>
		<van-tabs 
			v-model="active" 
			sticky 
			color="#2C353F" 
			@change="changeTable">
			<van-tab title="合约商品">
				<ul class="left">
					<li v-for="(item, index) in list" :key="index">
						<div class="name">
							<img src="../../assets/img/icon/goods_logo.png" alt="">
							<div>
								<h3><span>{{item.name}}</span> <i>限量发售</i></h3>
								<a href="javascript:;" @click="$router.push({path: '/goodsDetails', query: {goods: item}})">查看合约详情<img src="../../assets/img/home/right2.png" alt=""></a>
							</div>
						</div>
						<div class="details">
							<div class="flex-wrap">
								<div>
									<label>发售云储力</label>
									<img src="../../assets/img/icon/fscl_icon.png" alt="">
								</div>
								<span>{{item.tAmount}} <sub>T</sub></span>
							</div>
							<div class="flex-wrap">
								<div>
									<label>托管机房</label>
									<img src="../../assets/img/icon/tgjf_icon.png" alt="">
								</div>
								<p>{{item.address}}</p>
							</div>
							<div class="flex-wrap">
								<div>
									<label>剩余云储力</label>
									<img src="../../assets/img/icon/sycl_icon.png" alt="">
								</div>
								<span>{{item.remainAmount}} <sub>T</sub></span>
							</div>
							<div class="flex-wrap">
								<div>
									<label>合约期限</label>
									<img src="../../assets/img/icon/fscl_icon.png" alt="">
								</div>
								<span>{{Math.floor(item.proTime / 30)}} <sub>个月</sub></span>
							</div>
							<div class="flex-wrap">
								<div>
									<label>质押</label>
									<img src="../../assets/img/icon/zy_icon.png" alt="">
								</div>
								<span>{{Math.floor(item.pledge)}} <sub>FIL/T</sub></span>
							</div>
						</div>
						<div class="buybar">
							<div class="price">
								<div class="price-left">
									<h4>现价 : {{item.price}}RMB/T</h4>
									<s>原价 : {{item.orgPrice}}RMB/T</s>
								</div>
								<div class="price-right">
									<span>数量</span>
									<van-stepper v-model="item.buyAmount" integer min="1" :max="item.remainAmount" />
								</div>
							</div>
							<van-button type="primary" size="large" :disabled="item.remainAmount <= 0" @click="showPop = true;activeItem = item">{{item.remainAmount <= 0 ? '已售罄' : '立即购买'}}</van-button>
							<!-- <van-button type="primary" size="large" :disabled="item.remainAmount <= 0" @click="$router.push({path: '/confirmOrder', query: {goods: item}})">{{item.remainAmount <= 0 ? '已售罄' : '立即购买'}}</van-button> -->
						</div>
					</li>
				</ul>
			</van-tab>
			<van-tab title="理财产品">
				<ul class="right">
					<li v-for="(item,index) in financeList" :key="index">
						<div class="title">
							<p>
								<span>{{item.name}}</span>
								<span>热销必选</span>
							</p>
							<p>查看《产品购买协议》</p>
						</div>
						<div class="detail">
							<p>
								<span>{{item.rates.split(',')[0]}}%起</span>
								<span>年化利率</span>
							</p>
							<p>
								<span>{{item.days.split(',')[0]}}天起</span>
								<span>稳健收益 低风险</span>
							</p>
						</div>
						<van-button type="primary" @click="$router.push({path:'/financeDetails',query: {goods:JSON.stringify(item)}})">立即购买</van-button>
					</li>
				</ul>
			</van-tab>
		</van-tabs>
		<!-- <div class="main scroll-y">
			<ul>
				<li v-for="(item, index) in list" :key="index">
					<div class="name">
						<img src="../../assets/img/icon/goods_logo.png" alt="">
						<div>
							<h3><span>{{item.name}}</span> <i>限量发售</i></h3>
							<a href="javascript:;" @click="$router.push({path: '/goodsDetails', query: {goods: item}})">查看合约详情<img src="../../assets/img/home/right2.png" alt=""></a>
						</div>
					</div>
					<div class="details">
						<div class="flex-wrap">
							<div>
								<label>发售云储力</label>
								<img src="../../assets/img/icon/fscl_icon.png" alt="">
							</div>
							<span>{{item.tAmount}} <sub>T</sub></span>
						</div>
						<div class="flex-wrap">
							<div>
								<label>托管机房</label>
								<img src="../../assets/img/icon/tgjf_icon.png" alt="">
							</div>
							<p>{{item.address}}</p>
						</div>
						<div class="flex-wrap">
							<div>
								<label>剩余云储力</label>
								<img src="../../assets/img/icon/sycl_icon.png" alt="">
							</div>
							<span>{{item.remainAmount}} <sub>T</sub></span>
						</div>
						<div class="flex-wrap">
							<div>
								<label>合约期限</label>
								<img src="../../assets/img/icon/fscl_icon.png" alt="">
							</div>
							<span>{{Math.floor(item.proTime / 30)}} <sub>个月</sub></span>
						</div>
						<div class="flex-wrap">
							<div>
								<label>质押</label>
								<img src="../../assets/img/icon/zy_icon.png" alt="">
							</div>
							<span>{{Math.floor(item.pledge)}} <sub>FIL/T</sub></span>
						</div>
					</div>
					<div class="buybar">
						<div class="price">
							<div class="price-left">
								<h4>现价 : {{item.price}}RMB/T</h4>
								<s>原价 : {{item.orgPrice}}RMB/T</s>
							</div>
							<div class="price-right">
								<span>数量</span>
								<van-stepper v-model="item.buyAmount" integer min="1" :max="item.remainAmount" />
							</div>
						</div>
						<van-button type="primary" size="large" :disabled="item.remainAmount <= 0" @click="$router.push({path: '/confirmOrder', query: {goods: item}})">{{item.remainAmount <= 0 ? '已售罄' : '立即购买'}}</van-button>
					</div>
				</li>
			</ul>
		</div> -->
		<PayPop :showDialog="showPop" @toggleShow="toggleShow" @getData="getData" :item="activeItem" />
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { getMinePros, getFinancePros } from '@/api/request'
import PayPop from './components/payPop'
export default {
	data() { 
		return {
			active:0,
			value: 1,
			list: [],
			financeList:[],
			showPop:false,
			activeItem:''
		}
	},
	activated() {
		this.getData()
		this.getFinanceList()
	},
	methods: {
		getData() {
			getMinePros().then(res => {
				res.result.list.map(val => {
					val.buyAmount = 1
				})
				this.list = res.result.list
			})
		},
		getFinanceList(){
			getFinancePros({pageNum:1,pageSize:1000}).then(res => {
				this.financeList = res.result.list
			})
		},
		buyFinance(item){

		},
		changeTable(){
			if(this.active == 0) {
				this.getData()
			} else {
				this.getFinanceList()
			}
		},
		toggleShow(val) {
			this.showPop = val
		}
	},
	computed: {
		...mapState(['userInfo'])
	},
	components:{
		PayPop
	}
}
</script>

<style lang="less" scoped>
.war-page{
	display: flex;
	flex-direction: column;
	.header {
		position: relative;
		z-index: 2;
		font-size: .32rem;
		color: #323232;
		text-align: center;
		background:rgba(255,255,255,1);
		// box-shadow:0px 0px 12px 0px rgba(236,236,236,1);
		line-height: .88rem;
		font-weight: 600;
	}
	/deep/ .van-tabs {
		flex:1;
		display: flex;
		flex-direction: column;
		overflow-y: hidden;
		.van-sticky {
			position: relative;
			box-shadow: 0 .02rem .12rem #ECECEC;
		}
		.van-tabs__wrap {
			height:.8rem;
			background: #FFF;
			box-shadow: 0px 2px 12px #ECECEC;
		}
		.van-tabs__content {
			overflow: auto;
		}
		ul.left {
			li {
				background-color: #fff;
				padding: .3rem .4rem;
				margin-bottom: .2rem;
				&:last-child {
					margin-bottom: 0;
				}
				.name {
					display: flex;
					align-items: center;
					img {
						width: 1.2rem;
						height: 1.2rem;
						margin-right: .2rem;
					}
					div {
						flex: 1;
						h3 {
							display: flex;
							align-items: center;
							font-size: .34rem;
							span {
								line-height: .34rem;
								margin-right: .1rem;
							}
							i {
								display: inline-block;
								color: #FA6400;
								font-size: .2rem;
								font-weight: 400;
								line-height: .32rem;
								border-radius: .16rem;
								padding: 0 .1rem;
								font-style: normal;
								border: 1px solid #FA6400;
							}
						}
						a {
							font-size: .28rem;
							color: #FA6400;
							img {
								width:.1rem;
								height:.18rem;
								margin-left:.06rem;
							}
						}
					}
				}
				.details {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					margin-top: .2rem;
					.flex-wrap {
						display: flex;
						align-items: center;
						margin-bottom: .1rem;
						width: 3.3rem;
						background:rgba(241,244,247,1);
						border-radius: .12rem;
						padding: .2rem;
						div {
							min-width:1rem;
							margin-right: .2rem;
							label {
								display: block;
								white-space: nowrap;
								font-size: .2rem;
								color: #6D7278;
							}
							img {
								display: block;
								height: .36rem;
								margin: .1rem auto 0;
							}
						}
						p {
							font-size: .3rem;
							color: #0D959F;
							font-weight: bold;
						}
						span {
							font-size: .4rem;
							color: #0D959F;
							font-weight: bold;
							sub {
								vertical-align: baseline;
								font-size: .24rem;
							}
						}
					}
				}
				.buybar {
					margin-top:.3rem;
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					.price {
						width:100%;
						margin-bottom:.2rem;
						white-space: nowrap;
						display: flex;
						justify-content: space-between;
						.price-left {
							h4 {
								font-size: .26rem;
								color: #FA6400;
							}
							s {
								font-size: .2rem;
								color: #B4B4B4;
							}
						}
						.price-right {
							display: flex;
							align-items: center;
							margin-top: .1rem;
							span {
								color: #969696;
								margin-right: .1rem;
								font-size:.24rem;
							}
						}
					}
					.van-button {
						height:.88rem;
						font-size:.32rem;
						background-color: #FA6400;
						border: 1px solid #FA6400;
					}
				}
			}
		}
		ul.right {
			li {
				margin-bottom:.2rem;
				padding:.3rem .4rem .4rem;
				background: #FFF;
				.title {
					display: flex;
					flex-direction: column;
					border-bottom:.01rem solid #DCDCDC;
					p {
						&:first-of-type {
							margin-bottom:.1rem;
							display: flex;
							align-items: center;
							span {
								&:first-of-type {
									line-height: 1em;
									margin-right:.1rem;
									font-size:.34rem;
									font-weight: 500;
									color:#000;
								}
								&:last-of-type {
									padding:.07rem .1rem;
									border:.01rem solid #D9930B;
									border-radius: .17rem;
									line-height: 1em;
									color:#D9930B;
									font-size:.2rem;
								}
							}
						}
						&:last-of-type {
							margin-bottom:.3rem;
							color:#D9930B;
							font-size:.24rem;
						}
					}
				}
				.detail {
					display: flex;
					padding:.4rem 0 ;
					p {
						flex:1;
						display: flex;
						flex-direction: column;
						span {
							&:first-of-type {
								line-height: 1em;
								font-size:.4rem;
								margin-bottom:.06rem;
							}
							&:last-of-type {
								color:#969696;
								font-size:.24rem;
							}
						
						}
						&:first-of-type {
							span {
								&:first-of-type {
									color:#D9930B;
								}
							}
						}
						&:last-of-type {
							span {
								&:first-of-type {
									color:#000;
								}
							}
						}
					}
				}
				.van-button {
					width:100%;
					height:.88rem;
					font-size:.32rem;
					background-color: #FA6400;
					border: 1px solid #FA6400;
				}
			}
		}
	}
}
</style>