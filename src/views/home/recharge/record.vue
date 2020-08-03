<template>
	<div class="rechargeRecord-page">
		<HeaderBar title="充值记录"></HeaderBar>
		<div class="main">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData" >
				<div class="orderItem" v-for="(item,index) in list"  :key="index" >
					<p class="title">
						<span>充值</span>
						<span>{{ $config.transStatusMap[item.status] }}</span>
					</p>
					<div>
						<p class="amount">
							<span>充值金额: {{ item.amount }} {{item.coinName}}</span><span>手续费: {{ item.fee }} {{item.coinName}}</span>
						</p>
						<p>充值时间 : {{item.createTime}}</p>
						<p class="copy">充值地址 : <span>(点击下面地址复制)</span></p>
						<p class="address" v-clipboard:copy="item.fromAddr" v-clipboard:success="onCopy" v-clipboard:error="onError">{{item.fromAddr}}</p>
						<p class="des">备注：<span>{{item.memo}}</span></p>
					</div>
				</div>
			</van-list>
		</div>
	</div>
</template>
<script>
import { transferList } from "@/api/request"
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
				transType: 0,
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
		transferList(){
			transferList({
				coinId:9,
				transType:1,
				pageSize:this.pageSize,
				pageNum:this.pageNum
			}).then(res=>{
				if(res.code == 200){
					console.log(res.result)
				}else{
					this.$toast(res.msg)
				}
			}).catch(err=>{
				console.log(err)
			})
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
.rechargeRecord-page{
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
						font-weight: 600;
						color: #641E18;
						&:last-of-type{
							// color: #FFEB1D;
							font-size: .24rem;
							font-weight: 500;
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
				}
				&:last-of-type{
					margin: 0;
				}
			}
		}
}
</style>