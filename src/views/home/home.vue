<template>
	<div class="home-page">
		<div class="main">

			<!-- 奖池 -->
			<div class="pond">
				<img src="../../../public/img/home/lottery_menu.png" alt="">
				<p>奖池金币已经累计<span>{{userInfo.rewardPool}}USDT</span></p>
			</div>
			<!-- 滚动公告 -->
			<van-notice-bar
				v-if="noticeText"
				:text="noticeText"
				color="#333"
				scrollable 
				@click.native="$router.push('/noticeDetails?id=' + noticeId)">
				<img slot="left-icon" src="../../../public/img/home/broadcast_icon.png" alt="">
			</van-notice-bar>

			<div class="site-bg" :class="bgName"></div>

			<div class="ship-wrap" v-if="userInfo.roleId > 0">
				<img class="tips" v-if="userInfo.realInviteNum >= activeShipInfo.inviteNum" src="../../../public/img/home/tips.png" @click.stop="$router.push('/buyShip')" alt="">
				<img class="ship" @click="$router.push('/shipInfo')" :src="'./img/ship/ship'+ userInfo.roleId +'.png'" alt="">
			</div>
			<!-- 底部操作区 -->
			<div class="btm-menu">
				<ul>
					<li @click="$router.push('/lottery')">
						<img src="../../../public/img/home/lottery_menu.png" alt="">
						<span>幸运抽奖</span>
					</li>
					<li @click="$router.push('/rankings')">
						<img src="../../../public/img/home/rankings_menu.png" alt="">
						<span>收益排行</span>
					</li>
					<li @click="clickHandler">
						<img src="../../../public/img/home/invite_menu.png" alt="">
						<span>邀请船员</span>
					</li>
				</ul>
				<div class="earnings">
					<div class="btn">
						<label>累计收益</label>
						<span><img src="../../../public/img/home/gold.png" alt="">{{$BigNumber(userInfo.inviteReward).plus(userInfo.teamInviteReward)}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserTeamSumGun, userActive, getNoticeList, boatInfo } from '@/api/request'
export default {
	data() { 
		return {
			dialogShow: false,
			pageNum: 1,
			list: [],
			loading: false, //是否在加载中
			finished: false, //是否加载完所有数据
			noticeText: '',
			noticeId: '',
			totalReadNotice: 0,
			totalNotice: 0,
			shipInfo: [],
			activeTimeHours: 0
		}
	},
	created() {
		this.activeTimeHours = new Date().getHours()
	},
	mounted() {
		getNoticeList({
			pageNum: 1,
			pageSize: 1
		}).then(res => {
			this.totalNotice = res.result.total
			if(res.result.list.length <= 0) return
			this.noticeText = res.result.list[0].title
			this.noticeId = res.result.list[0].id
		})
		boatInfo().then(res => {
			this.shipInfo = res.result
		})
	},
	activated() {
		this.$store.dispatch('getUserInfo')
		this.activeTimeHours = new Date().getHours()
	},
	methods: {
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
					// on cancel
				});
			}
			
		},
		clickHandler() {
			if(this.userInfo.isActive == 0) {
				this.$dialog.confirm({
					message: '您的账户还未激活，是否立即激活？',
						confirmButtonText:'去激活'
					}).then(() => {
						this.$router.push('/activateAccount')
					}).catch(() => {
				})
			}else {
				if(this.userInfo.roleId <= 0) {
					this.$dialog.confirm({
						message: '您还未购买船只，是否前去购买？',
							confirmButtonText:'去购买'
						}).then(() => {
							this.$router.push('/buyShip')
						}).catch(() => {
						// on cancel
					});
				}else {
					this.$router.push('/inviteShare')
				}
			}
		},
	},
	computed: {
		...mapState(['userInfo']),
		activeShipInfo() {
			return this.shipInfo[this.userInfo.roleId] || {inviteNum: 100}
		},
		bgName() {
			if(this.activeTimeHours >= 0 && this.activeTimeHours < 6) return 'bg5'
			if(this.activeTimeHours >= 6 && this.activeTimeHours < 8) return 'bg1'
			if(this.activeTimeHours >= 8 && this.activeTimeHours < 12) return 'bg2'
			if(this.activeTimeHours >= 12 && this.activeTimeHours < 17) return 'bg3'
			if(this.activeTimeHours >= 17 && this.activeTimeHours < 20) return 'bg4'
			if(this.activeTimeHours >= 20 && this.activeTimeHours <= 24) return 'bg5'
		}
	}
}
</script>

<style lang="less" scoped>
.home-page{
	.main {
		position: relative;
		height: 100%;
		width: 100%;
		overflow: hidden;
		.site-bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: calc(100% - 1rem);
			background: #5ad7dd url(../../../public/img/home/bg1.png) no-repeat top center;
			background-size: cover;
			&.bg1 {
				background: #5ad7dd url(../../../public/img/home/bg1.png) no-repeat top center;
				background-size: cover;
			}
			&.bg2 {
				background: #5ad7dd url(../../../public/img/home/bg2.png) no-repeat top center;
				background-size: cover;
			}
			&.bg3 {
				background: #5ad7dd url(../../../public/img/home/bg3.png) no-repeat top center;
				background-size: cover;
			}
			&.bg4 {
				background: #5ad7dd url(../../../public/img/home/bg4.png) no-repeat top center;
				background-size: cover;
			}
			&.bg5 {
				background: #5ad7dd url(../../../public/img/home/bg5.png) no-repeat top center;
				background-size: cover;
			}
		}
		.ship-wrap {
			position: absolute;
			bottom: 2.5rem;
			left: 50%;
			transform: translateX(-50%);
			.ship {
				position: relative;
				width: 3.8rem;
				pointer-events: initial;
				animation: float 5s infinite alternate;
			}
			.tips {
				position: absolute;
				z-index: 12;
				width: 3rem;
				pointer-events: initial;
			}
		}
		.pond {
			position: relative;
			z-index: 12;
			width: 65%;
			margin: .2rem auto 0;
			line-height: .6rem;
			background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.7) 28%, #ecebe8 53%, rgba(244, 244, 244, 0.7) 77%, rgba(255, 255, 255, 0) 100%);
			img {
				position: absolute;
				left: 0;
				top: -.1rem;
				width: .8rem;
			}
			p {
				font-size: .26rem;
				padding-left: .9rem;
				span {
					color: #F33D1A;
				}
			}
		}
		.van-notice-bar {
			position: relative;
			z-index: 12;
			width: 65%;
			background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.7) 28%, #ecebe8 53%, rgba(244, 244, 244, 0.7) 77%, rgba(255, 255, 255, 0) 100%);
			margin: .13rem auto 0;
			height: .6rem;
			img {
				width: .4rem;
				height: .4rem;
				margin-right: .2rem;
			}
		}
	}
	.btm-menu {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2rem;
		ul {
			position: absolute;
			right: 0;
			top: 0;
			z-index: 12;
			display: flex;
			li {
				text-align: center;
				margin-right: .05rem;
				img {
					display: block;
					width: 1.3rem;
					height: 1.3rem;
				}
				span {
					font-size: .22rem;
				}
			}
		}
		&:after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 1.35rem;
			background-color: #fff;
		}
		.earnings {
			position: absolute;
			left: -0.1rem;
    		top: 0.18rem;
			z-index: 12;
			background-color: #fff;
			width: 3rem;
			height: 1.3rem;
			border-radius: .67rem;
			.btn {
				background-color: #00D984;
				width: 2.45rem;
				height: 1rem;
				color: #fff;
				box-shadow: 0px .19rem .32rem 0px rgba(0,217,132,0.4);
				border-radius:50px;
				margin: .34rem auto 0;
				text-align: center;
				overflow: hidden;
				label {
					display: block;
					margin: .13rem 0 0;
				}
				span {
					font-size: .34rem;
					font-weight: 600;
					img {
						width: .38rem;
						height: .38rem;
						vertical-align: bottom;
						margin-right: .14rem;
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

	@keyframes float {
		0%   {top: 0; right: 0;}
		25%  {top: .07rem; right: .1rem;}
		50%  {top: 0; right: .2rem;}
		75%   {top: .07rem; right: .1rem;}
		100% {top: 0; right: 0;}
	}
}
</style>