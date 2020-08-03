<template>
	<div class="team-earnings-page">
		<HeaderBar title="舰队收益"></HeaderBar>
		<div class="summary">
			<h3>{{userInfo.teamInviteReward}} <sub>USDT</sub></h3>
			<p>持有收益提取券{{userInfo.withdrawTicket}}张</p>
			<button @click="$router.push('/teamEarningsExtract')">提取</button>
		</div>
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad">
			<ul>
				<li v-for="(item,key) in list" :key="key">
					<img :src="item.iconUrl" alt="">
					<div>
						<h3>{{item.nickName}} <i>Lv{{item.roleId}}</i> <span>+{{item.reward}} USDT</span></h3>
						<p>{{item.createTime}}</p>
					</div>
				</li>
			</ul>
		</van-list>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { getBoatRewardList } from '@/api/request'
export default {
	data() { 
		return {
			list: [],
			loading: false,
			finished: false,
			pageNum: 1
		}
	},
	methods: {
		onLoad() {
			// 异步更新数据
			this.getData()
		},
		getData() {
			getBoatRewardList({
				pageNum: this.pageNum,
				pageSize: 30,
				type: 1  //舰队收益
			}).then(res => {
				// 加载状态结束
				this.loading = false;
				this.pageNum++
				if(res.result.pageNum == 1) {
					this.list = res.result.list
				}else {
					this.list = this.list.concat(res.result.list)
				}
				// 数据全部加载完成
				if (!res.result.hasNextPage) {
					this.finished = true
				}
			})
		}
	},
	computed: {
		...mapState(['userInfo'])
	}
}
</script>

<style lang="less" scoped>
.team-earnings-page{
	display: flex;
	flex-direction: column;
	.summary {
		background: linear-gradient(-29deg,rgba(0,217,132,1) 0%,rgba(14,216,171,1) 100%);
		border-radius: .26rem;
		color: #fff;
		margin: .4rem .2rem 0;
		text-align: center;
		padding: .4rem  0 .45rem;
		h3 {
			font-size: .52rem;
			sub {
				font-size: .36rem;
				vertical-align: baseline;
				font-weight: 400;
			}
		}
		p {
			font-size: .28rem;
			margin: .2rem auto;
		}
		button {
			color: #00D984;
			background-color: #fff;
			font-size: .3rem;
			height: .58rem;
			width: 2.44rem;
			border-radius: .08rem;
		}
	}
	.van-list {
		flex: 1;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		margin: .4rem .2rem 0;
		background-color: #fff;
		border-radius: .22rem .22rem 0px 0px;
		ul {
			padding: 0 .2rem;
			li {
				position: relative;
				z-index: 10;
				display: flex;
				align-items: center;
				background-color: #fff;
				img {
					height: .8rem;
					width: .8rem;
					border-radius: 50%;
					margin-right: .2rem;
				}
				div {
					flex: 1;
					padding: .38rem 0;
					border-bottom: 1px solid rgba(0,0,0,.12);
					h3 {
						display: flex;
						font-size: .28rem;
						font-weight: 500;
						color: #000;
						i {
							flex: 1;
							display: inline-block;
							font-size: .3rem;
							color: #00D984;
							font-style: normal;
							margin-left: .1rem;
						}
						span {
							color: #00D984;
							font-size: .3rem;
							font-weight: 600;
						}
					}
					p {
						color: #999999;
						font-size: .24rem;
						margin-top: .1rem;
					}
				}
			}
		}
	}
}
</style>