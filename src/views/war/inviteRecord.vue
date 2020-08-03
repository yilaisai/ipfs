<template>
	<div class="invite-record-page">
		<HeaderBar title="邀请记录"></HeaderBar>
		<van-tabs v-model="active" swipeable :border="false" @change="getData" color="#00D984" title-active-color="#00D984" title-inactive-color="#333333">
			<van-tab title="直邀船员">
				<ul>
					<li v-for="(item,key) in list0" :key="key">
						<img :src="item.iconUrl" alt="">
						<div>
							<h3>{{item.nickName}} <i>Lv{{item.roleId}}</i></h3>
							<p>{{item.createTime}}</p>
						</div>
					</li>
				</ul>
				<p class="tips" v-if="list0.length < 5">*只有<span @click="showHelp">有效成员</span>才可以助您完成舰队任务</p>
			</van-tab>
			<van-tab title="扩散船员">
				<ul>
					<li v-for="(item,key) in list1" :key="key">
						<img :src="item.iconUrl" alt="">
						<div>
							<h3>{{item.nickName}} <i>Lv{{item.roleId}}</i></h3>
							<p>{{item.createTime}}</p>
						</div>
					</li>
				</ul>
				<p class="tips" v-if="list1.length < 5">*只有<span @click="showHelp">有效成员</span>才可以助您完成舰队任务</p>
			</van-tab>
			<van-tab title="实习船员">
				<ul>
					<li v-for="(item,key) in list2" :key="key">
						<img :src="item.iconUrl" alt="">
						<div>
							<h3>{{item.nickName}} <i>Lv{{item.roleId}}</i></h3>
							<p>{{item.createTime}}</p>
						</div>
					</li>
				</ul>
				<p class="tips" v-if="list2.length < 5">*只有<span @click="showHelp">有效成员</span>才可以助您完成舰队任务</p>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
import { findCrews } from '@/api/request'
export default {
	data() { 
		return {
			active: 0,
			list0: [],
			list1: [],
			list2: []
		}
	},
	mounted() {
		this.getData(0)
	},
	methods: {
		showHelp() {
			this.$dialog.alert({
				message: '有效船员是指<br/>等级达到Lv1及以上的船员',
				confirmButtonText: '我知道了'
			}).then(() => {
			});
		},
		getData(type) {
			findCrews({type}).then(res => {
				this['list' + type] = res.result
			}) 
		}
	}
}
</script>

<style lang="less" scoped>
.invite-record-page{
	display: flex;
	flex-direction: column;
	overflow: hidden;
	.van-tabs {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		/deep/.van-tabs__content {
			flex: 1;
			overflow: hidden;
			.van-tab__pane {
				position: relative;
				padding: .4rem .2rem 0;
				height: 100%;
				overflow: hidden;
				ul {
					position: relative;
					height: 100%;
					background-color: #fff;
					padding: 0 .2rem;
					border-radius: .22rem .22rem 0px 0px;
					overflow-y: auto;
					-webkit-overflow-scrolling: touch;
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
								font-size: .28rem;
								font-weight: 500;
								color: #000;
								i {
									display: inline-block;
									font-size: .3rem;
									color: #00D984;
									font-style: normal;
									margin-left: .1rem;
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