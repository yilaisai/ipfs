<template>
	<div class="withdrawRecord-page">
		<HeaderBar title="提现记录"></HeaderBar>
		<div class="main">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData" >
				<div class="orderItem" v-for="(item,index) in list" :key="index" >
					<p class="title">
						<span>提现</span>
						<span :class="'status'+item.status " >{{ $config.transStatusMap[item.status] }}</span>
					</p>
					<div>
						<p class="amount">
							<span>充值金额:{{ item.amount }}</span>
							<span>到账金额:{{ item.amount }}</span>
						</p>
						<p class="amount">
							<span>充值时间 : {{item.createTime}}</span>
							<span>手续费：{{item.fee}} {{item.coinName}}</span>
						</p>
						<p class="copy">充值地址 : <span>(点击下面地址复制)</span></p>
						<p class="address" v-clipboard:copy="item.fromAddr" v-clipboard:success="onCopy" v-clipboard:error="onError">{{item.toAddr}}</p>
						<div class="btn" @click="cancel" v-if="item.status == 3">{{ '取消提现' }}</div>
						<div class="btn" @click="$router.push('/withdraw?addr=' + item.toAddr)" v-else>{{ '再转一笔' }}</div>
					</div>
				</div>
			</van-list>
		</div>
	</div>
</template>
<script>
import { transferList } from "@/api/request";
export default {
	components:{

	},
	data(){
		return {
			finished:false,
			loading:false,
			list:[],
			pageNum:1,
			pageSize:20
		}
	},
	mounted(){

	},
	methods:{
		getData(){
			transferList({
				coinId:9,
				transType:1,
				pageSize:this.pageSize,
				pageNum:this.pageNum
			}).then(res=>{
				this.loading = false
				this.list = this.list.concat(res.result.list)
				if(!res.result.hasNextPage) {
					this.finished = true
				}
				this.pageNum++
			}).catch(err=>{
				this.loading = false
			})
		},
		cancel(){
			this.$dialog.confirm({
				message: '提现申请已经在审核中，确定取消吗？',
				// confirmButtonText:'去充值'
			}).then(() => {
				// this.$router.push('/earnestMoney')
			}).catch(() => {
				// on cancel
			});
		},
		onCopy(){
			this.$toast('复制成功')
		},
		onError(){
			this.$toast('复制失败，请手动复制')
		}
	},
	watch:{

	},
	computed:{

	}
	}
</script>
<style lang="less" scoped>
.withdrawRecord-page{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
		.main{
			flex: 1;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			/deep/.van-list{
					box-sizing: border-box;
					padding: .3rem;
			}
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
						
						&.status1{
							color: #641E18;
						}
						&.status2{
							color: #DA1D1D;
						}
					}
				}
				&>div{
					padding: .2rem 0;
					padding-bottom: .3rem;
					box-sizing: border-box;
					&>p{
						font-size: .24rem;
						line-height: .24rem;
						margin-bottom: .2rem;
						&.amount{
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							align-content: center;
						}
						&.copy>span{
							color: #798297;
						}
						&.address{
							color: #AE1705;
							margin-bottom: .3rem;
						}
						&.des{
							display: flex;
							flex-direction: row;
							align-items: flex-start;
							margin-bottom: 0;
							span{
								flex: 1;
								line-height: .3rem;
								margin-top: -0.03rem;
							}
						}
					}
					&>.btn{
						width: 4.9rem;
						height: .48rem;
						line-height: .48rem;
						text-align: center;
						color: #5A2708;
						box-sizing: border-box;
						border-radius: .24rem;
						margin: 0 auto;
						background-color: #EACA95;

					}
				}
				&:last-of-type{
					margin: 0;
				}
			}
		}
}
</style>