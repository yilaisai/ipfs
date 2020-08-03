<template>
	<div class="teammate-earnings-page">
		<HeaderBar title="船员累计给我赚钱"></HeaderBar>
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
				type: 0  //直接收益
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
.teammate-earnings-page{
	display: flex;
	flex-direction: column;
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