<template>
	<div class="war-page">
		<div class="header">商品列表</div>
		<div class="main scroll-y">
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
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { getMinePros } from '@/api/request'
export default {
	data() { 
		return {
			value: 1,
			list: []
		}
	},
	activated() {
		this.getData()
	},
	methods: {
		showHelp() {
			this.$dialog.alert({
				title: '关于收益提现券',
				message: `1.每邀请10个有效船员，可获得一张收益提现券。</br></br>2.每张提现券面值为${this.userInfo.withdrawAmount}USDT,每张可提现${this.userInfo.withdrawAmount} USDT。</br></br>3.舰队收益不满${this.userInfo.withdrawAmount}USDT不可进行提现。`,
			}).then(() => {
			});
		},
		getData() {
			getMinePros().then(res => {
				res.result.list.map(val => {
					val.buyAmount = 1
				})
				this.list = res.result.list
			})
		}
	},
	computed: {
		...mapState(['userInfo'])
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
		box-shadow:0px 0px 12px 0px rgba(236,236,236,1);
		line-height: .88rem;
		font-weight: 600;
	}
	.main {
		flex: 1;
		position: relative;
		z-index: 1;
		ul {
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
	}
}
</style>