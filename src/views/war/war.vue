<template>
	<div class="war-page">
		<div class="topbar">
			<h3>人脉大比拼</h3>
			<h2>好友越多，收入越高</h2>
			<div class="my-fleet" @click="$router.push('/inviteRecord')">
				<h4>我的舰队: {{userInfo.realTeamNum}}</h4>
				<i></i>
			</div>
			<img class="chest" src="../../../public/img/chest.png" alt="">
		</div>
		<div class="main">
			<section @click="$router.push('/teammateEarnings')">
				<h5><span>船员累计给我赚钱</span></h5>
				<div class="flex-wrap">
					<div>
						<span class="red">{{userInfo.inviteReward}}<sub>USDT</sub></span>
						<label>当前等级总收入</label>
					</div>
					<div>
						<span>{{$BigNumber(userInfo.rate).times(100)}}%</span>
						<label>lv.{{userInfo.roleId}} 收益比例</label>
					</div>
				</div>
			</section>
			<section @click="$router.push('/teamEarnings')">
				<h5><span>舰队收益</span><a href="javascript:;" @click.stop="showHelp"><img src="../../../public/img/help_icon.png" alt=""></a></h5>
				<div class="flex-wrap">
					<div>
						<span class="red">{{userInfo.teamInviteReward}}<sub>USDT</sub></span>
						<label>使用收益提现券进行提现</label>
					</div>
					<div>
						<span>{{userInfo.withdrawTicket}}</span>
						<label>收益提取券(张）</label>
					</div>
				</div>
			</section>
			<section>
				<h5><span>我的邀请人</span></h5>
				<div class="centent">
					<img :src="userInfo.inviterIconUrl" alt="">
					<span>{{userInfo.inviterNickName}}</span>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() { 
		return {
		}
	},
	mounted() {
	},
	methods: {
		showHelp() {
			this.$dialog.alert({
				title: '关于收益提现券',
				message: `1.每邀请10个有效船员，可获得一张收益提现券。</br></br>2.每张提现券面值为${this.userInfo.withdrawAmount}USDT,每张可提现${this.userInfo.withdrawAmount} USDT。</br></br>3.舰队收益不满${this.userInfo.withdrawAmount}USDT不可进行提现。`,
			}).then(() => {
			});
		}
	},
	computed: {
		...mapState(['userInfo'])
	}
}
</script>

<style lang="less" scoped>
.war-page{
	.topbar {
		position: relative;
		padding: .42rem 0 1.36rem;
		background-color: #00D984;
		color: #fff;
		h3 {
			font-size: .32rem;
			padding: 0 .6rem;
		}
		h2 {
			font-size: .48rem;
			padding: 0 .6rem;
			margin-top: .3rem;
		}
		.my-fleet {
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: absolute;
			left: 2.5%;
			bottom: -.9rem;
			width: 95%;
			height: 1.68rem;
			padding: 0 .2rem 0 .6rem;
			background-color: #fff;
			color: #333333;
			border-radius: .26rem;
			font-size: .36rem;
			box-shadow:0px 0px 32px 0px rgba(0,74,47,0.2);
			i {
				width: .13rem;
				height: .22rem;
				background: url(../../../public/img/arrow_right.png) no-repeat center;
				background-size: 100% 100%;
			}
		}
		.chest {
			position: absolute;
			top: .2rem;
			right: .38rem;
			width: 2.2rem;
		}
	}
	.main {
		padding: 0.95rem .2rem .2rem;
		section {
			background-color: #fff;
			border-radius: .26rem;
			margin-top: .24rem;
			h5 {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: .4rem;
				font-size: .34rem;
				img {
					width: .33rem;
					height: .33rem;
				}
			}
			.flex-wrap {
				display: flex;
				padding: 0 0 .4rem 0;
				div {
					flex: 1;
					text-align: center;
					&:first-child {
						border-right: 2px solid #EEEEEE;
					}
					span {
						font-size: .52rem;
						font-weight: 600;
						sub {
							font-size: .26rem;
							font-weight: 400;
							vertical-align: baseline;
						}
						&.red {
							color: #F42E14;
						}
					}
					label {
						display: block;
						font-size: .24rem;
						color: #999999;
					}
				}
			}
			.centent {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 0 .4rem 0;
				img {
					width: .86rem;
					height: .86rem;
					border-radius: 50%;
					margin-right: .2rem;
				}
				span {
					font-size: .32rem;
				}
			}
		}
	}
}
</style>