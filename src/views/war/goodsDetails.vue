<template>
	<div class="goods-detaild-page">
		<HeaderBar :title="goods.name" :shadow="true"></HeaderBar>
		<div class="main scroll-y">
			<div class="goods">
				<div class="details">
					<div class="flex-wrap">
						<div>
							<label>发售云储力</label>
							<img src="../../assets/img/icon/fscl_icon.png" alt="">
						</div>
						<span>{{goods.tAmount}} <sub>T</sub></span>
					</div>
					<div class="flex-wrap">
						<div>
							<label>托管机房</label>
							<img src="../../assets/img/icon/tgjf_icon.png" alt="">
						</div>
						<p>{{goods.address}}</p>
					</div>
					<div class="flex-wrap">
						<div>
							<label>剩余云储力</label>
							<img src="../../assets/img/icon/sycl_icon.png" alt="">
						</div>
						<span>{{goods.remainAmount}} <sub>T</sub></span>
					</div>
					<div class="flex-wrap">
						<div>
							<label>合约期限</label>
							<img src="../../assets/img/icon/fscl_icon.png" alt="">
						</div>
						<span>{{Math.floor(goods.proTime / 30)}} <sub>个月</sub></span>
					</div>
					<div class="flex-wrap">
						<div>
							<label>质押</label>
							<img src="../../assets/img/icon/zy_icon.png" alt="">
						</div>
						<span>{{Math.floor(goods.pledge)}} <sub>FIL/T</sub></span>
					</div>
				</div>
				<div class="buybar">
					<div class="price">
						<div class="price-left">
							<h4>现价 : {{goods.price}}RMB/T</h4>
							<s>原价 : {{goods.orgPrice}}RMB/T</s>
						</div>
						<div class="price-right">
							<span>数量</span>
							<van-stepper v-model="goods.buyAmount" integer min="1" :max="goods.remainAmount" />
						</div>
					</div>
					<van-button type="primary" size="large" :disabled="goods.remainAmount <= 0" @click="showPop =true">{{goods.remainAmount <= 0 ? '已售罄' : '立即购买'}}</van-button>
				</div>
			</div>
			<div class="text-details">
				<h3>合约详情</h3>
				<h4>技术服务费</h4>
				<p>收取挖矿产出 Filecoin 数量的 25% 作为技术服务费。技术服务费包括：矿场维护、矿机部署、矿机维修、人力资源支出等费用。</p>
				<h4>托管服务费</h4>
				<p>用户购买七彩矿池的存储空间租赁服务即 IPFS·Filecoin 云储力服务已包含第一年托管费，托管费包括第一年服务期限内的 IP 地址费、电费、带宽费、网络安全、七彩矿池系统使用费等费用。</p>
				<h4>云储力收益结算</h4>
				<p>根据七彩矿池的每日实际挖矿收益及用户购买星际云合约的份额比例计算用户每日挖矿收益，扣除矿池收取的技术服务费后即为用户实际获得的挖矿收益。<br />Filecoin 云储力合约从 Filecoin 主网上线第15天开始计算收益，挖矿收益以 Filecoin 结算，挖矿产出收益 T+1 进入用户账户。<br />所有的规则及收益都是公开透明的，七彩矿池节点的地址也是公开透明且不可篡改的。七彩矿池也将按照 IPFS·Filecoin官方既定规则给予云储力持有用户分配收益。</p>
				<h4>合约期限及终止</h4>
				<p>1、云储力合约有效期自 Filecoin 主网上线第15天开始计算（前七天为接入主网的调试时间）。<br />2、因 Filecoin 挖矿难度调整或币价发生剧烈波动，可能导致挖矿收益无法支付电费和托管费的情况，如果合约收入不足以支付托管费，服务器将停止运行，则合约自动终止。<br />3、如发生不可抗力事件，七彩矿池有权终止合约而不视为违约。不可抗力包括但不限于地震、台风、水灾、火灾等自然原因和战争、动乱、政府禁令等社会原因。</p>
				<h4>风险保障</h4>
				<p>1、为保障客户的收益，降低客户挖矿产出风险，七彩矿池将会为租赁云储力合约的用户配置 1:1 备用矿机，为其提供云储力挖矿产出保障。即当矿机出现故障、损坏等情况，导致客户收益受损时，该部分损失由备用服务器的挖矿收益进行补充。备用服务器的有效期与云储力合约的期限相同。<br />2、收益到账可能会遇到网络延迟或堵塞现象，七彩矿池会准备每天收益的两倍作为风险保证金，优先使用保证金垫付用户收益，最大程度避免发生到账延迟情况。</p>
				<h4>风险提示</h4>
				<p>1 、Filecoin 通证有可能发生价格剧烈波动的情况，且挖矿难度会不定期调整。币价波动或挖矿难度调整都可能导致IPFS·Filecoin 云储力合约的收益变动。无论从数字货币还是法币角度，本合约不作退款承诺。用户须仔细评估自己的风险承受能力，在可接受的风控范围内投资数字货币挖矿。<br />2 、本合约不涉及数字资产交易，若用户自行参与第三方的数字资产交易，应当自行承担责任和风险。<br />3 、用户了解并接受，如因相关国家法律、法规和规范性文件的制定或者修改等客观情况发生变化，导致 Filecoin 挖矿行为被叫停或者禁止的，本协议自动终止，双方不得相互追究责任，由此造成的损失需自行承担。<br />合约发行方对本合约条款保留所有解释权。</p>
			</div>
		</div>
		<PayPop :showDialog="showPop" @toggleShow="toggleShow" @getData="$router.go(-1)" :item="goods" />
	</div>
</template>

<script>
import PayPop from './components/payPop'
export default {
	name: 'goodsDetails',
	data() { 
		return {
			goods: {},
			showPop:false,

		}
	},
	activated() {
		if(typeof this.$route.query.goods == 'object') {
			this.goods = this.$route.query.goods
		}
	},
	methods:{
		toggleShow(val){
			this.showPop = val
		}
	},
	components:{
		PayPop
	}
}
</script>

<style lang="less" scoped>
.goods-detaild-page{
	display: flex;
	flex-direction: column;
	.main {
		flex: 1;
		position: relative;
		z-index: 1;
		.goods {
			background-color: #fff;
			padding: .3rem .4rem;
			.details {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
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
							// width: .4rem;
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
		.text-details {
			padding: .4rem;
			h3 {
				font-size: .32rem;
				color: #fff;
				padding: .14rem .2rem;
				background: url(../../assets/img/bg/bg5.png) no-repeat center;
				background-size: 100% 100%;
			}
			h4 {
				color: #323232;
				font-size: .24rem;
				margin-top: .2rem;
			}
			p {
				font-size: .24rem;
				color: #646464;
				line-height: .36rem;
			}
		}
	}
}
</style>