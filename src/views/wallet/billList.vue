<template>
	<div class="order_list-page">
		<HeaderBar title="存力激活记录">
			<!-- <a href="javascript:;" class="filter" @click="isShowFilter = !isShowFilter"></a> -->
		</HeaderBar>
		<div class="thead">
			<span>存力</span>
			<span>合约名称</span>
			<span>合约详情</span>
			<span>状态</span>
		</div>
		<van-list
			v-model="loading"
			:finished="finished"
			:finished-text="list.length > 0 ? '没有更多了' : ''"
			@load="onLoad"
			class="scroll-y"
			ref="vanList">
			<ul class="list">
				<li v-for="(item,key) in list" :key="key" @click="$router.push({path: '/billDetails', query: {data: item}})">
					<div>
						<span>+1000 T</span>
						<span>F3+</span>
						<span>000001</span>
						<span>已激活</span>
					</div>
					<p>时间 : 2020-08-03 14:29:43</p>
				</li>
			</ul>
			<van-empty v-if="list.length == 0 && finished" description="暂无记录" />
		</van-list>

		<!-- 筛选 -->
		<!-- <div class="filter-control" v-show="isShowFilter">
			<div class="content">
				<ul>
					<li :class="{'active': active === ''}" @click="active = ''">全部</li>
					<li :class="{'active': active === 0}" @click="active = 0">充币</li>
					<li :class="{'active': active === 1}" @click="active = 1">提币</li>
					<li :class="{'active': active === 2}" @click="active = 2">购买</li>
					<li :class="{'active': active === 3}" @click="active = 3">提取</li>
					<li :class="{'active': active === 4}" @click="active = 4">激活</li>
				</ul>
				<van-button type="primary" size="large" @click="search">确定</van-button>
			</div>
		</div> -->
	</div>
</template>

<script>
import DropdownMenu from '@/components/common/dropdownMenu.vue'
import { userCoinChange } from '@/api/request'
export default {
	data() {
		return {
			list: [],
			loading: false,
			finished: false,
			optTypeMap: [
				{ text: '全部', value: '' },
				{ text: '充币', value: '0' },
				{ text: '提币', value: '1' },
				{ text: '购买', value: '2' },
				{ text: '投资收益', value: '3' },
				{ text: '激活', value: '4' },
				{ text: '团队奖励', value: '5' },
			],
			active: '',
			optType: '',  // 0-充币 1-提币 2-购买 3-提取 4-激活
			isShowFilter: false,
			pageNum: 1,
		};
	},
	methods: {
		onLoad() {
			// 异步更新数据
			userCoinChange({
				optType: this.optType,
				pageNum: this.pageNum,
				pageSize: 30
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
			}).catch(err => {
				this.loading = false
				this.finished = true
			})
		},
		search() {
			this.optType = this.active
			this.isShowFilter = false
			this.pageNum = 1
			this.list = []
			this.finished = false
			this.$refs.vanList.check()
		}
	},
	components: {
		DropdownMenu
	}
}
</script>

<style lang="less" scoped>
.order_list-page{
	display: flex;
	flex-direction: column;
	.com-header-bar {
		/deep/.other {
			padding: 0;
		}
		.filter {
			display: inline-block;
			height: 100%;
			width: .9rem;
			background: url(../../../public/img/shaixuan_icon.png) no-repeat center;
			background-size: 45%;
		}
	}
	.thead {
		display: flex;
		background-color: #F6F6F6;
		font-size: .26rem;
		color: #999999;
		padding: .2rem;
		span {
			flex: 1;
			&:nth-child(2) {
				text-align: left;
			}
			&:nth-child(3) {
				text-align: center;
			}
			&:nth-child(4) {
				text-align: right;
			}
		}
	}
	.van-list {
		flex: 1;
		background-color: #fff;
		.list {
			padding: 0 .2rem;
			li {
				padding: .24rem 0;
				border-bottom: 1px solid #EEEEEE;
				font-size: .24rem;
				div {
					display: flex;
					align-items: center;
				}
				p {
					color: #969696;
					margin-top: .1rem;
				}
				span {
					flex: 1;
					&:nth-child(1) {
						font-weight: 600;
						color: #42C1CA;
						font-size: .36rem;
					}
					&:nth-child(2) {
						text-align: left;
					}
					&:nth-child(3) {
						text-align: center;
					}
					&:nth-child(4) {
						text-align: right;
						&.red {
							color: #F42E14;
						}
					}
				}
			}
		}
	}
	.filter-control {
		position: fixed;
		z-index: 201212;
		top: .9rem;
		right: 0;
		width: 100%;
		height: 100%;
		.content {
			position: absolute;
			right: .2rem;
			top: 0;
			background-color: #fff;
			width: 2.8rem;
			padding: .2rem;
			box-shadow:0px 0px .2rem 0px rgba(0, 0, 0, 0.11);
			border-radius: .06rem;
			ul {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				li {
					width: 1.1rem;
					background-color: #F6F6F6;
					line-height: .54rem;
					color: #999999;
					text-align: center;
					margin-bottom: .2rem;
					border-radius: .04rem;
					overflow: hidden;
					&.active {
						background: #EBFFF1 url(../../../public/img/jiaobiao_icon.png) no-repeat top right;
						background-size: .18rem .18rem;
						color: #00D783;
					}
				}
			}
			.van-button--large {
				height: .54rem;
				font-size: .26rem;
			}
			&:before {
				content: "";
				position: absolute;
				top: -.235rem;
				right: .12rem;
				border: .12rem solid transparent;
				border-bottom-color: #fff;
			}
		}
	}
}
</style>