<template>
	<div class="team-page">
		<HeaderBar title="团队" color="red">
			<span class="other" @click="$router.push('/teamEarnings')">团队奖励</span>
		</HeaderBar>
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
						<!-- <img :src="'./img/grade/i	con0'+userInfo.roleId+'-active.png'" alt=""> -->
						<p>{{userInfo.roleName}}</p>
						<span>V{{ $fmtNumber('%2', userInfo.rate) }}%</span>
					</div>
				</div>
				<div class="total">
					<p>我的团队 : 直推 <span>{{teamData.inviteNum}}</span>，团队 <span>{{teamData.teamNum}}</span>，激活 <span>{{teamData.teamActiveNum}}</span>，有效 <span>{{teamData.realTeamNum}}</span>人</p>
					<p>团队正在投资额度 : <span>{{teamData.teamAmount}}</span>{{teamData.coinName}}</p>
					<p>团队累计投资额度 : <span>{{teamData.totalTeamAmount}}</span>{{teamData.coinName}}</p>
				</div>
			</div>
			
			<div class="record">
				<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
					<div class="orderItem" v-for="(item,index) in list"  :key="index" >
						<div class="title">
							<p><img src="../../../../public/img/user_logo.png" alt=""><span>{{ item.nickName }}</span> <span>{{ item.phone }}</span> </p>
							<span>{{ item.status }}</span>
						</div>
						<div>
							<div class="data">
								<p>直推人数 : {{ item.inviteNum }} 　　激活 : {{ item.teamActiveNum }}</p>
								<p>团队人数 : {{ item.teamNum }} 　　有效激活 : {{ item.realTeamNum }}</p>
								<p>团队正在投资额度 : {{ item.teamAmount }}</p>
								<p>团队累积投资额度 : {{ item.totalTeamAmount }}</p>
							</div>
							<div class="grade">
								
								<div >
									<!-- <img :src="'./img/grade/icon0'+item.roleId+'-active.png'" alt=""> -->
									<p>{{item.roleName}}</p>
									<span>V{{Math.floor(item.rate*10000)/100}}%</span>
								</div>
								<p v-show="userInfo.roleId>4&&(userInfo.roleId-item.roleId)>1" class="btn" @click="$router.push({path: '/setGrade', query: item})">分配等级</p>
							</div>
						</div>
					</div>
				</van-list>
			</div>
		</div>
	</div>
</template>
<script>
import {myTeam,myIndexInfo} from '@/api/request'
import {mapState} from 'vuex'
export default {
	components:{

	},
	data(){
		return {
			finished:false,
			loading:false,
			list:[],
			teamData:{},
			pageNum:1,
			pageSize:20
		}
	},
	mounted(){
		this.myIndexInfo()
	},
	methods:{
		onLoad(){
			this.loading = true
			this.myTeam()
		},
		myTeam(){
			myTeam({pageNum:this.pageNum,pageSize:this.pageSize}).then(res=>{
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
				this.finished = true
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
.team-page{
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
			height: 3.52rem;
			padding: .24rem .4rem;
			padding-top:.35rem ;
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
				box-sizing: border-box;
				padding: .26rem .2rem;
				border-radius: .08rem;
				background:rgba(100,30,24,.5);
				p{
					color: #fff;
					font-size: .24rem;
					line-height: .24rem;
					margin-bottom: .12rem;
					&:last-of-type{
						margin-bottom: 0;
					}
					span{
						color: #FFEB1D;
						margin-right: .1rem;
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
					&>p{
						
						display: flex;
						flex-direction: row;
						align-items: center;
						
						span{
							font-size: .28rem;
							font-weight: 500;
							line-height: .28rem;
							color: #DA2F1A;
							&:last-of-type{
								color: #641E18;
								margin-left: .1rem;
							}
						}
						img{
							width: .48rem;
							height: .48rem;
							margin-right: .2rem;
						}
					}
					&>span{
						font-size: .28rem;
						font-weight: 500;
						color: #FFEB1D;
					}
				}
				&>div{
					padding: .4rem 0;
					box-sizing: border-box;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: flex-start;
					&>.data{
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
					&>.grade{
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: flex-end;
						div{
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							padding-right: .12rem;
							&>img{
								height: .48rem;
							}
							p{
								font-size: .18rem;
								line-height: .18rem;
								margin: .1rem 0;
								color: #DA2F1A;
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
						.btn{
							width: 1.6rem;
							height: .48rem;
							line-height: .48rem;
							border-radius: .24rem;
							text-align: center;
							background:linear-gradient(270deg,rgba(255,131,53,1) 0%,rgba(243,202,65,1) 100%);
							color: #fff;
							font-style: .24rem;
							font-weight: 500;
							margin-top: .3rem;
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