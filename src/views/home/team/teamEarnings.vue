<template>
	<div class="corpsEarnings-page">
		<HeaderBar title="团队奖励"></HeaderBar>
		<div class="main">
			<div class="top">
				<div class="userInfo">
					<div class="info">
						<img src="../../../../public/img/user_logo.png" alt="">
						<div>
							<p>{{userInfo.nickName}}</p>
							<p>{{userInfo.phone}}</p>
						</div>
					</div>
					<div class="grade">
						<!-- <img :src="'./img/grade/icon0'+userInfo.roleId+'-active.png'" alt=""> -->
						<p>{{userInfo.roleName}}</p>
						<span>V{{ $fmtNumber('%2', userInfo.rate) }}%</span>
					</div>
				</div>
				<div class="total">
					<div>
						<h4 class="primary-color">{{userInfo.totalTeamAmount}}</h4>
						<p>团队总投资额度 (ETH)</p>
					</div>
					<div>
						<h4 class="primary-color">{{userInfo.teamInviteReward}}</h4>
						<p>团队总奖励 (ETH)</p>
					</div>
				</div>
			</div>
			
			<div class="record">
				<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
					<div class="orderItem" v-for="(item,index) in list"  :key="index" >
						<p >
							<span>战友军衔 : {{item.roleName}} <i>V{{Math.floor(item.rate*10000)/100}}%</i></span>
							<span>投资本金 : {{item.amount}} {{item.coinName}}</span>
						</p>
						<p class="time">投资时间 : {{item.createTime}}</p>
						<p >
							<span>战争获利 : {{item.reward}} {{item.coinName}}</span>
							<!-- <span>入账商户 : {{item.merchantName}}</span> -->
						</p>
						<p>获利时间 : {{item.reCreateTime}}</p>
					</div>
				</van-list>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex'
import {getUserInviteRewards,myIndexInfo} from '@/api/request'
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
			teamData:{}
		}
	},
	mounted(){
		this.myIndexInfo()
	},
	methods:{
		onLoad(){
			this.loading = true
			this.getUserInviteRewards()
		},
		getUserInviteRewards(){
			getUserInviteRewards({pageNum:this.pageNum,pageSize:this.pageSize}).then(res=>{
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
				}else{
					this.$toast(res.msg)
				}
			}).catch(err=>{
				this.loading = false
			})
		},
		myIndexInfo(){
			myIndexInfo().then(res=>{
				if(res.code == 200){
					this.teamData = res.result
				}else{
					this.$toast(res.msg)
				}
			}).catch(err=>{
				console.log(err)
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
.corpsEarnings-page{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.main{
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		.top{
			padding: .35rem .3rem ;
			padding-bottom: 0;
			box-sizing: border-box;
			.userInfo{
				margin-bottom: .35rem;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				&>.info{
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
				&>.grade{
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					&>img{
						// width: .64rem;
						height: .48rem;
					}
					p{
						font-size: .18rem;
						line-height: .18rem;
						margin: .1rem 0;
						color: #FFEB1D;
					}
					span{
						padding: 0 .1rem;
						background: #FFEB1D;
						font-size: .18rem;
						color: #5A2708;
						line-height: .24rem;
						border-radius: 0.02rem;
					}
				}
			}
			.total{
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: .26rem 0;
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
		}
		.record{
			padding: .3rem;
			box-sizing: border-box;
			flex: 1;
			overflow: hidden;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			background-color: #DA2F1A;
			.orderItem{
				padding: .4rem .2rem;
				box-sizing: border-box;
				background: #FFF1D4;
				border-radius: .08rem;
				margin-bottom: .15rem;
				p{
					font-size: .24rem;
					line-height: .24rem;
					margin-bottom: .2rem;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-content: center;
					&.time{
						margin-bottom: .4rem;
					}
					&:last-of-type{
						margin: 0;
					}
					i{
						display: inline-block;
						font-style: normal;
						font-style: .18rem;
						line-height: .24rem;
						height: .24rem;
						padding: 0 .1rem;
						background: #F7702D;
						color: #FFF200;
						border-radius: .02rem;
					}
				}
			}
			&:last-of-type{
				margin: 0;
			}
		}
	}
}
</style>