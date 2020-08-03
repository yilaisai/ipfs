<template>
	<div class="BattlefieldEarnings-page">
		<HeaderBar title="奖励" color="white"></HeaderBar>
		<div class="main">
			<div class="top-info">
				<div class="userInfo">
					<div class="info">
						<img src="../../../../public/img/user_logo.png" alt="">
						<div>
							<p>本人军衔 : {{userInfo.roleName}}</p>
							<p>投资奖励 : {{$fmtNumber('%2', userInfo.rate)}}%</p>
						</div>
					</div>
					<!-- <img :src="'./img/grade/icon0'+userInfo.roleId+'-active.png'" alt=""> -->
				</div>
				<div class="total">
					<div>
						<h4 class="primary-color">{{userInfo.joinAmount}}</h4>
						<p>投资本金 (ETH)</p>
					</div>
					<div>
						<h4 class="primary-color">{{userInfo.joinReward}}</h4>
						<p>投资总收益 (ETH)</p>
					</div>
				</div>
			</div>
			<div class="record">
				<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
					<div class="orderItem" v-for="(item,index) in list"  :key="index" >
						<p class="title">
							<span>编号: {{ item.recdId }}</span>
							<span>本轮状态: {{ item.statusStr }}</span>
						</p>
						<div>
							<p class="amount">
								<span>投资装备: {{ item.gunName }}</span>
								<span>投资本金: {{ item.amount }}</span>
							</p>
							<p>投资时间: {{ item.createTime }}</p>
							<p >
								<span>战场收益: {{ item.reward }}</span>
								<!-- <span>入账商户: {{ item.merchantName }}</span> -->
							</p>
							<p>入账时间: {{ item.reCreateTime }}</p>
						</div>
					</div>
				</van-list>
			</div>
		</div>
	</div>
</template>
<script>
import {getUserGameRewards} from '@/api/request'
import { mapState } from 'vuex'
export default {
	components:{

	},
	data(){
		return {
			finished:false,
			loading:false,
			list:[],
			pageNum:1,
			pageSize:20,
			total: 0
		}
	},
	mounted(){

	},
	methods:{
		onLoad(){
			this.loading = true
			this.getUserGameRewards()
		},
		getUserGameRewards(){
			getUserGameRewards({pageNum:this.pageNum,pageSize:this.pageSize}).then(res=>{
				this.loading = false
				if(res.code == 200){
					if(this.pageNum == 1) {
						this.list = res.result.list
					}else {
						this.list = this.list.concat(res.result.list)
					}
					this.pageNum++
					if(res.result.isLastPage){
						this.finished = true
					}
					this.total = res.result.total
				}else{
					this.$toast(res.msg)
				}
			}).catch(err=>{
				this.loading = false
				this.finished = true
			})
		}
	},
	watch:{

	},
	computed:{
		...mapState(['userInfo'])
	}
}
</script>
<style lang="less" scoped>
.BattlefieldEarnings-page{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.main{
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		.top-info {
			// background: #f74b48;
		}
		.userInfo{
			height: 1.8rem;
			padding: .38rem;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			&>img{
				width: .6rem;
			}
			&>div{
				display: flex;
				flex-direction: row;
				align-items: center;
				img{
					width: 1.04rem;
					height: 1.04rem;
					margin-right: .18rem;
				}
				div{
					p{
						color: #FFEB1D;
						font-size: .24rem;
						line-height: .24rem;
						font-weight: 500;
						&:last-of-type{
							font-size: .2rem;
							line-height: .2rem;
							color: #DFE5F2;
							margin-top: .16rem;
						}
					}
				}
			}
		}
		.total{
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: .1rem .38rem .3rem;
			border-radius: .08rem;
			div {
				width: 48%;
				padding: .24rem .3rem;
				box-sizing: border-box;
				&:nth-child(1) {
					background: url(../../../../public/img/reward_bg2.png) no-repeat center;
					background-size: 100% 100%;
					text-align: right;
					h4 {
						padding-left: .1rem;
					}
				}
				&:nth-child(2) {
					background: url(../../../../public/img/reward_bg1.png) no-repeat center;
					background-size: 100% 100%;
					h4 {
						padding-right: .1rem;
					}
				}
				h4 {
					display: inline-block;
					font-size: .32rem;
					font-weight: 400;
					border-bottom: 1px solid #C5CDDF;
					padding-bottom: .1rem;
				}
				p {
					color: #C5CDDF;
					margin-top: .1rem;
					font-size: .22rem;
				}
			}
		}
		.record{
			padding: .3rem .3rem 0;
			box-sizing: border-box;
			flex: 1;
			overflow: hidden;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			background-color: #DA2F1A;
			.orderItem{
				background: #FFF1D4;
				border-radius: .08rem;
				margin-bottom: .15rem;
				padding: 0 .2rem;
				&>.title{
					height: .8rem;
					box-sizing: border-box;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #C79F22;
					span{
						font-size: .28rem;
						font-weight: 500;
						color: #DA2F1A;
						display: flex;
						flex-direction: row;
						align-items: center;
						&:last-of-type{
							color: #641E18;
						}
						img{
							width: .48rem;
							height: .48rem;
							margin-right: .2rem;
						}
					}
				}
				&>div{
					padding: .2rem 0;
					box-sizing: border-box;
					p{
						font-size: .24rem;
						line-height: .24rem;
						margin-bottom: .2rem;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-content: center;
						&:last-of-type{
							margin: 0;
						}
					}
				}
				&:last-of-type{
					margin: 0;
				}
			}
		}
	}
}
</style>