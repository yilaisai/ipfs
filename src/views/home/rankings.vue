<template>
	<div class="rankings-page">
		<HeaderBar title="排行榜"></HeaderBar>
		<div class="main">
			<img class="rankings-icon" src="../../../public/img/rankings.png" alt="">
			<van-tabs v-model="active" line-height="0" title-active-color="#4DBA72" title-inactive-color="#999999" :border="false">
				<van-tab title="舰队排行榜">
					<ul>
						<li v-for="(item, key) in navalRankList" :key="key">
							<div class="index">{{key + 1}}</div>
							<img :src="item.iconUrl" alt="">
							<div class="username">
								<span>{{item.nickName}}</span>
								<label>{{item.roleName}}</label>
							</div>
							<div class="num">{{item.teamNum}}人</div>
						</li>
					</ul>
				</van-tab>
				<van-tab title="收益排行榜">
					<ul>
						<li v-for="(item, key) in earningRankList" :key="key">
							<div class="index">{{key + 1}}</div>
							<img :src="item.iconUrl" alt="">
							<div class="username">
								<span>{{item.nickName}}</span>
								<label>{{item.roleName}}</label>
							</div>
							<div class="num">{{item.totalTeamInviteReward || 0}} USDT</div>
						</li>
					</ul>
				</van-tab>
			</van-tabs>
		</div>
	</div>
</template>

<script>
import { findHomeNavalRankings, findHomeEarningsRankings } from '@/api/request'
export default {
	data() { 
		return {
			active: 0,
			pageNum1: 1,
			pageNum2: 1,
			navalRankList: [],
			earningRankList: []
		}
	},
	mounted() {
		this.getNavalRankimgs()
		this.getEarningsRankings()
	},
	methods: {
		getNavalRankimgs() {
			findHomeNavalRankings({
				pageNum: this.pageNum1,
				pageSize: 1000
			}).then(res => {
				this.navalRankList = res.result.list
			})
		},
		getEarningsRankings() {
			findHomeEarningsRankings({
				pageNum: this.pageNum2,
				pageSize: 1000
			}).then(res => {
				this.earningRankList = res.result.list
			})
		}
	}
}
</script>

<style lang="less" scoped>
.rankings-page{
	display: flex;
	flex-direction: column;
	background-color: #7EE380;
	.com-header-bar {
		background-color: transparent;
		color: #fff;
		/deep/.go-back {
			background: url('../../../public/img/arrow_left_white.png') no-repeat center;
			background-size: 50%;  
		}
	}
	.main {
		flex: 1;
		overflow: hidden;
		position: relative;
		.rankings-icon {
			position: absolute;
			z-index: 12;
			left: 50%;
			top: 0.2rem;
			transform: translateX(-50%);
			width: 1.55rem;
			height: 1.55rem;
		}
		.van-tabs {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			margin-top: 1.1rem;
			height: 100%;
			padding: 1rem 0 1.1rem 0;
			border-radius: .26rem .26rem 0 0;
			border-bottom: 1px solid #c33;
			overflow: hidden;
			/deep/.van-tabs__wrap {
				overflow: hidden;
				.van-tab {
					font-size: .32rem;
					font-weight: 600;
				}
			}
			/deep/.van-tabs__content {
				flex: 1;
				overflow: hidden;
				.van-tab__pane {
					height: 100%;
					overflow-y: auto;
					-webkit-overflow-scrolling: touch;
				}
			}
			ul {
				padding: 0 .6rem;
				li {
					display: flex;
					align-items: center;
					border-bottom: 1px solid rgba(0, 0, 0, .1);
					padding: .38rem 0;
					.index {
						font-size: .3rem;
						color: #000;
						font-weight: 600;
						min-width: .6rem;
						height: .6rem;
						line-height: .6rem;
						padding: .1rem 0 0 .1rem;
					}
					&:nth-child(1) {
						.index {
							background: url(../../../public/img/grade/rankings1.png) no-repeat center;
							background-size: .6rem .6rem;
							color: #fff;
						}
					}
					&:nth-child(2) {
						.index {
							background: url(../../../public/img/grade/rankings2.png) no-repeat center;
							background-size: .6rem .6rem;
							color: #fff;
						}
					}
					&:nth-child(3) {
						.index {
							background: url(../../../public/img/grade/rankings3.png) no-repeat center;
							background-size: .6rem .6rem;
							color: #fff;
						}
					}
					img {
						width: .74rem;
						height: .74rem;
						border-radius: 50%;
						margin: 0 .1rem 0  .2rem;
					}
					.username {
						flex: 1;
						span {
							display: block;
							font-size: .32rem;
						}
						label {
							font-size: .28rem;
							color: #999999;
						}
					}
				}
			}
		}
	}
}
</style>