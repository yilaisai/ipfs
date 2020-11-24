<template>
	<div class="transfer-record-page">
		<HeaderBar title="云储力转移记录"></HeaderBar>
		<van-tabs
			v-model="active"
			swipeable
			:border="false"
			@change="getData"
			color="#000000"
			title-active-color="#000000"
			title-inactive-color="#969696">
			<van-tab title="全部">
				<ul>
					<li v-for="(item,key) in list0" :key="key">
						<div>
							<h3 :class="{'red' : item.subOrAdd != 1}">{{item.subOrAdd == 1 ? '+' : '-'}}{{item.tamount}} <sub>T</sub></h3>
							<span>来自 {{item.fromPhone}}</span>
						</div>
						<div>
							<span>{{item.name}}</span>
							<span>{{item.proId}}</span>
						</div>
						<div>
							<span>{{item.isActive == 0 ? '未激活' : '已激活'}}</span>
							<p>时间 : {{$fmtDate(item.createTimeStamp, 'full')}}</p>
						</div>
					</li>
					<van-empty v-if="list0.length == 0" description="暂无记录" />
				</ul>
			</van-tab>
			<van-tab title="转入">
				<ul>
					<li v-for="(item,key) in list1" :key="key">
						<div>
							<h3 :class="{'red' : item.subOrAdd != 1}">{{item.subOrAdd == 1 ? '+' : '-'}}{{item.tamount}} <sub>T</sub></h3>
							<span>来自 {{item.fromPhone}}</span>
						</div>
						<div>
							<span>{{item.name}}</span>
							<span>{{item.proId}}</span>
						</div>
						<div>
							<span>{{item.isActive == 0 ? '未激活' : '已激活'}}</span>
							<p>时间 : {{$fmtDate(item.createTimeStamp, 'full')}}</p>
						</div>
					</li>
					<van-empty v-if="list1.length == 0" description="暂无记录" />
				</ul>
			</van-tab>
			<van-tab title="转出">
				<ul>
					<li v-for="(item,key) in list2" :key="key">
						<div>
							<h3 :class="{'red' : item.subOrAdd != 1}">{{item.subOrAdd == 1 ? '+' : '-'}}{{item.tamount}} <sub>T</sub></h3>
							<span>来自 {{item.fromPhone}}</span>
						</div>
						<div>
							<span>{{item.name}}</span>
							<span>{{item.proId}}</span>
						</div>
						<div>
							<span>{{item.isActive == 0 ? '未激活' : '已激活'}}</span>
							<p>时间 : {{$fmtDate(item.createTimeStamp, 'full')}}</p>
						</div>
					</li>
					<van-empty v-if="list2.length == 0" description="暂无记录" />
				</ul>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
import { getMineRecdList } from '@/api/request'
export default {
	data() { 
		return {
			active: 0,
			list0: [],
			list1: [],
			list2: [],
			pageNum: 1,
			pageSize: 1000
		}
	},
	mounted() {
		this.getData(0)
	},
	methods: {
		getData(type) {
			getMineRecdList({
				type,
				pageNum: this.pageNum,
				pageSize: this.pageSize
			}).then(res => {
				this['list' + type] = res.result.list
			}) 
		}
	}
}
</script>

<style lang="less" scoped>
.transfer-record-page{
	display: flex;
	flex-direction: column;
	overflow: hidden;
	.van-tabs {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		/deep/.van-tabs__wrap {
			position: relative;
			z-index: 2;
			box-shadow:0px 0px 12px 0px rgba(236,236,236,1);
		}
		/deep/.van-tabs__content {
			position: relative;
			z-index: 1;
			flex: 1;
			overflow: hidden;
			.van-tab__pane {
				position: relative;
				height: 100%;
				overflow: hidden;
				ul {
					position: relative;
					height: 100%;
					background-color: #fff;
					padding: 0 .4rem;
					overflow-y: auto;
					-webkit-overflow-scrolling: touch;
					li {
						position: relative;
						z-index: 10;
						background-color: #fff;
						border-bottom: 1px solid rgba(0,0,0,.12);
						padding: .1rem 0;
						color: #000;
						div {
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: .05rem 0;
							font-size: .24rem;
							h3 {
								font-size: .36rem;
								font-weight: 600;
								color: #42C1CA;
								sub {
									vertical-align: baseline;
								}
								&.red {
									color: #FF0400;
								}
							}
							p {
								color: #999999;
								
							}
							&:nth-child(2) {
								justify-content: flex-start;
								span {
									margin-right: .2rem;
								}
							}
						}
					}
				}
				.tips {
					position: absolute;
					width: 100%;
					text-align: center;
					bottom: .7rem;
					left: 0;
					font-size: .28rem;
					span {
						color: #F42E14;
					}
				}
			}
		}
	}
}
</style>