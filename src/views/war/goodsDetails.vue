<template>
	<div class="goods-detaild-page">
		<HeaderBar title="F3 Filecoin 云存力(限量发售)" :shadow="true"></HeaderBar>
		<div class="main scroll-y">
			<div class="goods">
				<div class="details">
					<div class="flex-wrap">
						<div>
							<label>发售存力</label>
							<img src="../../assets/img/icon/fscl_icon.png" alt="">
						</div>
						<span>2,200 <sub>T</sub></span>
					</div>
					<div class="flex-wrap">
						<div>
							<label>托管机房</label>
							<img src="../../assets/img/icon/tgjf_icon.png" alt="">
						</div>
						<p>T3+级别 IDC机房</p>
					</div>
					<div class="flex-wrap">
						<div>
							<label>剩余存力</label>
							<img src="../../assets/img/icon/sycl_icon.png" alt="">
						</div>
						<span>2,200 <sub>T</sub></span>
					</div>
					<div class="flex-wrap">
						<div>
							<label>合约期限</label>
							<img src="../../assets/img/icon/fscl_icon.png" alt="">
						</div>
						<span>16 <sub>个月</sub></span>
					</div>
				</div>
				<div class="buybar">
					<div class="price">
						<h4>现价 : 1750RMB/T</h4>
						<s>原价 : 1889RMB/T</s>
						<div>
							<span>数量</span>
							<van-stepper v-model="value" integer min="1" max="8" />
						</div>
					</div>
					<van-button type="primary" size="large" @click="pay">立即购买</van-button>
				</div>
			</div>
			<div class="text-details">
				<h3>合约详情</h3>
				<h4>技术服务费</h4>
				<p>收取挖矿产出 Filecoin 数量的 20% 作为技术服务费。技术服务费包括：矿场维护、矿机部署、矿机维修、人力资源支出等费用。</p>
				<h4>托管服务费</h4>
				<p>用户购买星际云矿池的存储空间租赁服务即 IPFS·Filecoin 云存力服务已包含第一年托管费，托管费包括第一年服务期限内的 IP 地址费、电费、带宽费、网络安全、星际云矿池系统使用费等费用。</p>
				<h4>存力收益结算</h4>
				<p>根据星际云矿池的每日实际挖矿收益及用户购买星际云合约的份额比例计算用户每日挖矿收益，扣除矿池收取的技术服务费后即为用户实际获得的挖矿收益。<br />Filecoin 云存力合约从 Filecoin 主网上线第八天开始计算收益，挖矿收益以 Filecoin 结算，挖矿产出收益 T+1 进入用户账户。<br />所有的规则及收益都是公开透明的，星际云矿池节点的地址也是公开透明且不可篡改的。星际云矿池也将按照 IPFS·Filecoin官方既定规则给予存力持有用户分配收益。</p>
				<h4>合约期限及终止</h4>
				<p>1、存力合约有效期自 Filecoin 主网上线第八天开始计算（前七天为接入主网的调试时间）。<br />2、因 Filecoin 挖矿难度调整或币价发生剧烈波动，可能导致挖矿收益无法支付电费和托管费的情况，如果合约收入不足以支付托管费，服务器将停止运行，则合约自动终止。<br />3、如发生不可抗力事件，星际云矿池有权终止合约而不视为违约。不可抗力包括但不限于地震、台风、水灾、火灾等自然原因和战争、动乱、政府禁令等社会原因。</p>
				<h4>风险保障</h4>
				<p>1、为保障客户的收益，降低客户挖矿产出风险，星际云矿池将会为租赁存力合约的用户配置 1:1 备用矿机，为其提供存力挖矿产出保障。即当矿机出现故障、损坏等情况，导致客户收益受损时，该部分损失由备用服务器的挖矿收益进行补充。备用服务器的有效期与存力合约的期限相同。<br />2、收益到账可能会遇到网络延迟或堵塞现象，星际云矿池会准备每天收益的两倍作为风险保证金，优先使用保证金垫付用户收益，最大程度避免发生到账延迟情况。</p>
				<h4>风险提示</h4>
				<p>1 、Filecoin 通证有可能发生价格剧烈波动的情况，且挖矿难度会不定期调整。币价波动或挖矿难度调整都可能导致IPFS·Filecoin 云存力合约的收益变动。无论从数字货币还是法币角度，本合约不作退款承诺。用户须仔细评估自己的风险承受能力，在可接受的风控范围内投资数字货币挖矿。<br />2 、本合约不涉及数字资产交易，若用户自行参与第三方的数字资产交易，应当自行承担责任和风险。<br />3 、用户了解并接受，如因相关国家法律、法规和规范性文件的制定或者修改等客观情况发生变化，导致 Filecoin 挖矿行为被叫停或者禁止的，本协议自动终止，双方不得相互追究责任，由此造成的损失需自行承担。<br />合约发行方对本合约条款保留所有解释权。</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() { 
		return {

		}
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
						margin-right: .2rem;
						label {
							display: block;
							white-space: nowrap;
							font-size: .22rem;
							color: #6D7278;
						}
						img {
							display: block;
							width: .4rem;
							height: .4rem;
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
				display: flex;
				align-items: flex-end;
				.price {
					margin-right: .5rem;
					white-space: nowrap;
					h4 {
						font-size: .28rem;
						color: #FA6400;
					}
					s {
						font-size: .24rem;
						color: #B4B4B4;
					}
					div {
						display: flex;
						align-items: center;
						margin-top: .1rem;
						span {
							color: #969696;
							margin-right: .1rem;
						}
					}
				}
				.van-button {
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