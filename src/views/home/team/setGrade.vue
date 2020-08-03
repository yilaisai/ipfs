<template>
	<div class="setGrade-page">
		<HeaderBar title="分配等级" color="white"></HeaderBar>
		<div class="main">
			<div class="userInfo">
				<div class="info">
					<img src="../../../../public/img/user_logo.png" alt="">
					<div>
						<p>{{$route.query.nickName}}</p>
						<p>{{$route.query.phone}}</p>
					</div>
				</div>
				<div class="grade">
						<!-- <img :src="'./img/grade/icon0'+$route.query.roleId+'-active.png'" alt=""> -->
						<p>{{$route.query.roleName}}</p>
						<span>V{{Math.floor($route.query.rate*10000)/100}}%</span>
					</div>
			</div>
			<div class="content">
				<p> <span></span> 给下级分配新等级 <span></span></p>
				<ul>
					<li
						v-for=" (item,index) in list "
						:key="index"
						:class="activeRanks == item.roleId?'active':''"
						@click="activeRanks = item.roleId"
						v-if="item.roleId < userInfo.roleId">
						<!-- <img :src=" './img/grade/icon0'+ item.roleId +'.png'" alt=""> -->
						<!-- <img class="active" :src=" './img/grade/icon0'+ item.roleId +'-active.png'" alt=""> -->
						<p>{{item.roleName}}</p>
						<span>V{{ item.rate*100 }}%</span>
					</li>
				</ul>
				<div class="btn" @click="setRanks">确定分配</div>
			</div>
			
		</div>
	</div>
</template>
<script>
import { getInviteRole, newUpdateInviteRole } from '@/api/request'
import {mapState} from 'vuex'
export default {
	data(){
		return {
			list:[],
			activeRanks: ""
		}
	},
	created() {
		this.$store.dispatch('getUserInfo')
		this.activeRanks = this.$route.query.roleId
	},
	mounted(){
		getInviteRole().then(res => {
			this.list = res.result
		})	
	},
	methods:{
		setRanks() {
			newUpdateInviteRole({
				userId: this.$route.query.userId,
				roleId: this.activeRanks
			}).then(res => {
				this.$toast.success(res.msg)
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
.setGrade-page{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.main{
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		.userInfo{
			height: 1.8rem;
			padding: .38rem;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			background: #f74b48;
			&>.grade{
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					&>img{
						height: .6rem;
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
		}
		.content{
			flex: 1;
			box-sizing: border-box;
			padding: 0 .3rem;
			background-color: #DA2F1A;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			&>p{
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				height: 1.08rem;
				font-size: .28rem;
				color: #FFF1D4;
				&::before,&::after{
					content: "";
					flex: 1;
					height: .02rem;
					background: #FFF1D4;
					display: inline-block
				}
				span{
					display: inline-block;
					width: .12rem;
					height: .12rem;
					border-radius: .06rem;
					background: #FFF1D4;
					margin-right: .12rem;
					// transform: translateY(0.01rem);
					&:last-of-type{
						margin-left: .12rem;
						margin-right: 0;
					}
				}
				
			}
			&>ul{
				li{
					height: .96rem;
					display: flex;
					align-items: center;
					background: #FFF1D4;
					box-shadow:0px 0px 20px 0px rgba(0,0,0,0.2);
					border-radius:.08rem;
					margin-bottom: .15rem;
					cursor: pointer;
					position: relative;
					padding: 0 .3rem;
					&::after{
						content: "";
						position: absolute;
						width: .32rem;
						height: .32rem;
						background: url(../../../../public/img/grade/option.png) no-repeat center center;
						background-size: 100% 100%;
						right: .3rem;
						top: 0.3rem;
					}
					&>img{
						height: .96rem;
						&.active{
							display: none;
						}
					}
					p{
						color: #56150F;
						font-size: .32rem;
						line-height: .2rem;
					}
					span{
						display: inline-block;
						border-radius: .02rem;
						text-align: center;
						font-size: .24rem;
						margin-left: .2rem;
					}
					&.active{
						&::after{
							background: url(../../../../public/img/grade/option-active.png) no-repeat center center;
							background-size: 100% 100%;
						}
						img{
							display: none;
							&.active{
								display: block;
							}
						}
					}
				}
			}
			&>.btn{
				height: .96rem;
				line-height: .96rem;
				text-align: center;
				background:#FFF200;
				border-radius:.08rem;
				font-size: .3rem;
				font-weight: 700;
				margin: .45rem 0;
			}
		}
	}
}
</style>