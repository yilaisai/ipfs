<template>
	<div class="invite-page">
		<HeaderBar color="transparent"></HeaderBar>
		<div class="top">
			<h3>买币不如挖矿</h3>
			<p>明星可能不能拥有<br />但明星产品 Filecoin 可以</p>
		</div>
		<div class="main">
			<div class="content">
				<h2>邀请好友</h2>
				<p>团队云储力越高，奖励越丰厚</p>
				<div class="data">
					<div>
						<span>{{userInfo.teamNum}}</span>
						<label>集群NT</label>
					</div>
					<!-- <div @click="$router.push('/inviteList')">
						<span>{{userInfo.teamTAmount}} <sub>T</sub></span>
						<label>集群云储力<img src="../../assets/img/icon/arrow3.png" alt=""></label>
					</div> -->
					<div>
						<span>{{userInfo.teamTAmount}} <sub>T</sub></span>
						<label>集群云储力</label>
					</div>
					<div>
						<span>{{userInfo.bigAmount}} <sub>T</sub></span>
						<label>最大矿池</label>
					</div>
					<div>
						<span>{{userInfo.monB}} <sub>T</sub></span>
						<label>上月新增业绩</label>
					</div>
				</div>
				<div class="invitecode" v-clipboard:copy="userInfo.inviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">
					<label>我的邀请码</label>
					<span>{{userInfo.inviteCode}}</span>
					<img src="../../assets/img/icon/copy2.png">
				</div>
			</div>
			<div class="btn" @click="$router.push('/inviteShare')">现在去邀请</div>
		</div>
		<van-dialog
			v-model="dialogShow"
			title="已复制到粘贴板"
			:showConfirmButton="false">
			<p>由于微信分享限制，请到微信上粘贴注册链接来分享</p>
			<a href="javascript:;" class="close" @click="dialogShow = false"></a>
			<a href="weixin://" class="gowx"><img src="../../../public/img/weixin_icon.png" alt="">去微信粘贴给好友</a>
		</van-dialog>
	</div>
</template>
<script>
// import vueQr from 'vue-qr'
import { mapState } from 'vuex'
export default {
	// components:{
	// 	vueQr
	// },
	data(){
		return {
			code: localStorage.getItem('inviteCode'),
			registerPagePath: 'https://web.supercards.io/#/register?code=' + localStorage.getItem('inviteCode'),
			isInApp: false,
			dialogShow: false
		}
	},
	mounted(){
		this.isInApp = window.isInAPP()
	},
	methods:{
		share() {
			window.app.shareCapture(JSON.stringify({
				webUrl: location.href + 'Share?code=' + this.code,
				code: this.registerPagePath
			}))
		},
		onCopy(){
			this.$toast('复制成功')
		},
		onError(err){
			this.$toast('复制失败，请手动复制')
		},
		onCopy2(){
			this.dialogShow = true
		},
		onError2(err){
			this.$toast('复制失败，请手动复制')
		}
	},
	computed: {
		...mapState(['userInfo'])
	}
}
</script>
<style lang="less" scoped>
.invite-page{
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background: rgb(22,213,228); /* Old browsers */
	background: -moz-linear-gradient(top,  rgba(22,213,228,1) 0%, rgba(66,193,202,1) 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(top,  rgba(22,213,228,1) 0%,rgba(66,193,202,1) 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(to bottom,  rgba(22,213,228,1) 0%,rgba(66,193,202,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#16d5e4', endColorstr='#42c1ca',GradientType=0 ); /* IE6-9 */
	.top {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 6rem;
		background: url(../../assets/img/bg/bg8.png) no-repeat center;
		background-size: 100% 100%;
		h3 {
			font-size: .56rem;
			color: #FFDE78;
			margin: 1rem 0 0 .4rem;
		}
		p {
			color: #E5F4FF;
			font-size: .4rem;
			margin: .2rem .4rem;
			font-weight: 500;
		}
	}
	.main{
		position: absolute;
		left: 0;
		bottom: .9rem;
		width: 100%;
		flex: 1;
		overflow: hidden;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		box-sizing: border-box;
		.content {
			background: url(../../assets/img/bg/bg9.png) no-repeat center;
			background-size: 100% 100%;
			width: 86%;
			margin: 0 auto;
			text-align: center;
			overflow: hidden;
			padding: 0 .4rem .6rem;
			p {
				font-size: .28rem;
				color: #646464;
			}
			h2 {
				font-size: .32rem;
				line-height: .32rem;
				margin: .4rem 0 .3rem;
				&::before {
					display: inline-block;
					content: '';
					width: .62rem;
					height: .32rem;
					background: url(../../assets/img/img1.png) no-repeat center;
					background-size: 100% 100%;
					vertical-align: middle;
					margin-right: .2rem;
				}
				&::after {
					display: inline-block;
					content: '';
					width: .62rem;
					height: .32rem;
					background: url(../../assets/img/img1.png) no-repeat center;
					background-size: 100% 100%;
					vertical-align: middle;
					transform: rotateY(180deg);
					margin-left: .2rem;
				}
			}
			.data {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				margin-top: .3rem;
				div {
					width:48%;
					background-color: #F6F9FC;
					// flex:1;
					padding: .3rem 0;
					margin-right:2%;
					margin-bottom:.2rem;
					border-radius: .16rem;
					&:nth-of-type(2n) {
						margin-right:0;
					}
					span {
						display: block;
						color: #000000;
						font-size: .36rem;
						font-weight: bold;
						sub {
							vertical-align: baseline;
							font-size:0.24rem;
						}
					}
					label {
						font-size:0.24rem;
						font-family:PingFang-SC-Medium,PingFang-SC;
						font-weight:500;
						color:rgba(150,150,150,1);
						line-height:0.24rem;
						img {
							width:.1rem;
							height:.16rem;
							margin-left:.08rem;
						}
					}
				}
			}
			.invitecode {
				display: flex;
				align-items: center;
				background:rgba(246,249,252,1);
				border-radius:0.12rem;
				// margin-top: .2rem;
				height:0.96rem;
				font-size:0.32rem;
				label {
					margin: 0 .6rem 0 .3rem;
				}
				span {
					flex: 1;
					font-weight:600;
					color: #000;
					border-right: 1px solid #D1DBE5;
					text-align: left;
				}
				img {
					width: .32rem;
					height: .32rem;
					margin: 0 .3rem;
				}
			}
		}
		&>p{
			display: block;
			width: 2rem;
			height: .48rem;
			margin: 0 auto;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			color: #FFF200;
			font-size: .2rem;
			border-radius: .04rem;
			img{
				width: .2rem;
				height: .2rem;
				margin-left: .1rem;
			}
		}
		&>.btn{
			width: 6.7rem;
			height: .96rem;
			line-height: .96rem;
			text-align: center;
			color: #8A6C1F;
			font-size: .3rem;
			font-weight: 500;
			background: #FFDE78;
			margin: 0 auto;
			margin-top: .6rem;
			border-radius: .12rem;
			font-weight: 700;
		}
	}
	.van-dialog {
		background-color: #FFFFFF;
		/deep/.van-dialog__header {
			color: #323232;
		}
		.van-dialog__content {
			p {
				background-color: #F0F0F0;
				margin-bottom: .3rem;
				font-size: .3rem;
				padding: .4rem .46rem;
				color: #323232;
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
			.gowx {
				display: block;
				line-height: .8rem;
				width: 100%;
				color: #fff;
				text-align: center;
				margin-bottom: .3rem;
				background: linear-gradient(90deg,rgba(95,223,63,1) 0%,rgba(55,195,33,1) 100%);
				border-radius: .08rem;
				img {
					display: inline-block;
					vertical-align: sub;
					margin-right: .2rem;
					height: .38rem;
				}
			}
		}
	}
}
</style>