<template>
	<div class="home-products-cpt">
		<a href="javascript:;" class="btn" @click="show = !show">{{show ? '收起' : '展开'}} <i :class="{'top' : show}"></i></a>
		<div class="logo-title">
			<img src="../../../assets/img/home/logo1.png" alt="">
			<div>
				<h4>IPFS</h4>
				<span>星际文件系统（InterPlanetary File System）</span>
			</div>
		</div>
		<p :class="{'ellipsis3' : !show}">星际文件系统（InterPlanetary File System）是一个面向全球的、点对点的分布式版本文件系统，目标是为了补充目前互联网的超文本传输协议（HTTP），将所有具有相同文件系统的计算设备连接在一起，是下一代互联网底层通信协议。</p>
		<div v-show="show">
			<div class="logo-title">
				<img src="../../../assets/img/home/logo2.png" alt="">
				<div>
					<!-- <h4>星际云</h4>
					<span>坚定的 IPFS 生态建设者</span> -->
				</div>
			</div>
			<p>星际云是坚定的 IPFS 生态建设者，秉承着专业到极致，真诚到永远的理念！Filecoin 测试网稳步进行，主网上线在即，诚邀您一起参与 Filecoin 头矿红利！共筑 Filecoin 网络！</p>
			<h2>Filecoin 发行总量 20 亿枚</h2>
			<img class="chart" src="../../../assets/img/home/img.png" alt="">
			<div class="bg-title">
				<img src="../../../assets/img/home/bg1.png" alt="">
				<div>
					<h3>买币不如挖矿</h3>
				</div>
			</div>
			<ul class="content1">
				<li>
					<img src="../../../assets/img/home/icon1.png" alt="">
					<span>一键挖矿</span>
					<span>省心省力</span>
				</li>
				<li>
					<img src="../../../assets/img/home/icon2.png" alt="">
					<span>智能抢单</span>
					<span>收益更高</span>
				</li>
				<li>
					<img src="../../../assets/img/home/icon3.png" alt="">
					<span>收益透明</span>
					<span>随时提取</span>
				</li>
				<li>
					<img src="../../../assets/img/home/icon4.png" alt="">
					<span>安全保障</span>
					<span>稳定高效</span>
				</li>
				<li>
					<img src="../../../assets/img/home/icon5.png" alt="">
					<span>规模运营</span>
					<span>低耗高效</span>
				</li>
				<li>
					<img src="../../../assets/img/home/icon6.png" alt="">
					<span>专业运维</span>
					<span>规范管理</span>
				</li>
				<li>
					<img src="../../../assets/img/home/icon7.png" alt="">
					<span>邀请奖励</span>
					<span>合作共赢</span>
				</li>
				<li>
					<img src="../../../assets/img/home/icon8.png" alt="">
					<span>社区生态</span>
					<span>持续发展</span>
				</li>
			</ul>
			<div class="text-title">
				<div>
					<h3>星际云机房</h3>
				</div>
			</div>

			<ul class="content2">
				<img src="../../../assets/img/home/img2.png" alt="">
				<li>
					<h3>全球IDC机房节点布局</h3>
					<p>共享全球挖矿收益</p>
				</li>
				<li>
					<h3>企业级光纤宽带专线</h3>
					<p>快速稳定</p>
				</li>
				<img src="../../../assets/img/home/img3.png" alt="">
				<li>
					<h3>UPS不间断电源系统</h3>
					<p>保证7*24小时供电</p>
				</li>
				<li>
					<h3>专业运维团队</h3>
					<p>全方位运维服务</p>
				</li>
				<img src="../../../assets/img/home/img4.png" alt="">
				<li>
					<h3>企业级安全防护</h3>
					<p>保障服务器安全及用户资产</p>
				</li>
				<li>
					<h3>硬件软件及时升级</h3>
					<p>先人一步抢占挖矿先机</p>
				</li>
				<li>
					<h3>智能报价系统，自动调整参数</h3>
					<p>挖矿效率更高</p>
				</li>
			</ul>
			<div class="bg-title">
				<img src="../../../assets/img/home/bg2.png" alt="">
				<div>
					<h3>七彩矿池</h3>
					<h4>云储力优势</h4>
				</div>
			</div>
			<ul class="content3">
				<li>
					<img src="../../../assets/img/home/decentralized.png" alt="">
					<h3>技术实力强</h3>
					<p>技术实力强/七彩矿池是由星际云强大的技术团队独立研发创立，并获得多项技术专利。其技术团队有着超过十年的分布式存储经验，在 Fliecoin 挖矿领域被证实有着巨大的技术优势。</p>
				</li>
				<li>
					<img src="../../../assets/img/home/cpu-mining.png" alt="">
					<h3>安全稳定</h3>
					<p>安全稳定/七彩矿池采用的七彩矿机由星际云独家研发，稳定可靠。其技术团队长期服务于华为等头部用户，将保证七彩矿池拥有一流的安全及稳定性。</p>
				</li>
				<li>
					<img src="../../../assets/img/home/gpu-mining.png" alt="">
					<h3>回报有保障</h3>
					<p>回报有保障/七彩矿池采用星际云技术研发团队独家开发的挖矿稀土，高效稳定，同样的硬件配置可提供 2 倍以上的挖矿效率，使得星际云能够提供更加丰富的回报。</p>
				</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
export default {
	data() { 
		return {
			show: false
		}
	}
}
</script>

<style lang="less" scoped>
.home-products-cpt{
	position: relative;
	background-color: #fff;
	margin: .3rem;
	padding: 0 .3rem .3rem;
	overflow: hidden;
	.btn {
		position: absolute;
		top: .3rem;
		right: .3rem;
		border: 1px solid #979797;
		padding: 0 .35rem 0 .16rem;;
		line-height: .34rem;
		border-radius: .17rem;
		font-size: .22rem;
		i {
			position: absolute;
			top: .1rem;
			right: .15rem;
			width: .14rem;
			height: .14rem;
			background: url(../../../assets/img/home/arrow.png) no-repeat center;
			background-size: 100% 100%;
			&.top {
				transform: rotate(180deg);
			}
		}
	}
	.logo-title {
		display: flex;
		align-items: center;
		margin: .3rem 0;
		img {
			height: .9rem;
			margin-right: .3rem;
		}
		div {
			h4 {
				font-size:0.4rem;
				color:rgba(0,0,0,1);
				line-height:0.4rem;
			}
			span {
				font-size:0.24rem;
				color:rgba(50,50,50,1);
				line-height:0.24rem;
			}
		}
	}
	.text-title {
		border-top: 2px solid #000000;
		border-bottom: 2px solid #000000;
		h3 {
			font-size:0.4rem;
			text-align: center;
			padding: .3rem 0;
			color: #000000;
		}
	}
	p {
		font-size:0.24rem;
		color:rgba(100,100,100,1);
		line-height:0.4rem;
		&.ellipsis3 {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
			overflow: hidden;
		}
	}
	h2 {
		background-color: #42C1CA;
		font-size:0.4rem;
		color:rgba(255,255,255,1);
		line-height:0.4rem;
		padding: .2rem 0;
		text-align: center;
		margin-top: .3rem;
	}
	.chart {
		display: block;
		width: 100%;
		margin: .6rem 0 .8rem;
	}
	.bg-title {
		position: relative;
		height: 1.8rem;
		width: 100%;
		margin-bottom: .48rem;
		img {
			display: block;
			width: 100%;
			height: 100%;
		}
		div {
			position: absolute;
			width: 100%;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			text-align: center;
			color:rgba(255,255,255,1);
			font-size:0.4rem;
			line-height:0.4rem;
			h4 {
				font-size: .28rem;
				color: #DCDCDC;
				margin-top: .1rem;
			}
		}
	}
	.content1 {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: .48rem;
		li {
			text-align: center;
			width: 25%;
			margin-bottom: .24rem;
			img {
				width: .72rem;
				height: .72rem;
			}
			span {
				display: block;
				font-size:0.24rem;
				color:rgba(150,150,150,1);
				line-height:0.36rem;
			}
		}
	}
	.content2 {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: .1rem;
		margin-top: .4rem;
		img {
			width: 100%;
			margin: 0 0 .3rem 0;
		}
		li {
			width: 50%;
			margin-bottom: .24rem;
			h3 {
				font-size:0.24rem;
				vertical-align: middle;
				&::before {
					content: '';
					display: inline-block;
					width:0.12rem;
					height:0.12rem;
					background:rgba(66,193,202,1);
					border-radius: 50%;
					vertical-align: middle;
					margin-right: .1rem;
					margin-bottom: .05rem;
				}
			}
			p {
				color: #969696;
				font-size:0.24rem;
			}
		}
	}
	.content3 {
		li {
			margin-bottom: .48rem;
			img {
				display: block;
				width: 1.6rem;
				height: 1.6rem;
				margin: 0 auto;
			}
			h3 {
				font-size:0.28rem;
				color: #000000;
				margin: .2rem 0 .1rem;
				text-align: center;
			}
		}
	}
}
</style>