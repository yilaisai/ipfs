<template>
	<div class="recharge-page">
		<HeaderBar title="充值" color="red">
			<span class="other" @click="$router.push('/rechargeRecord')">充值记录</span>
		</HeaderBar>
		<div class="main">
			<div class="amount">
				<p>钱包余额 (ETH)</p>
				<span>{{assetInfo.amount}}</span>
			</div>
			<div class="QR">
				<p class="tip1">扫描下方二维码可获得充币地址</p>
				<div class="qrImg">
					<vue-qr :text="qr" :margin="0"></vue-qr>
				</div>
				<div class="tip2"></div>
				<p class="code" v-clipboard:copy="qr" v-clipboard:success="onCopy" v-clipboard:error="onError">{{qr}} <img src="../../../../public/img/copy-icon02.png" alt=""> </p>
			</div>
			<!-- <div class="tips">
				温馨提示：<br />
				1、请勿向上述地址充值任何非ETH资产，否则资产将不可找回。<br />
				2、最小充值金额：1ETH,小于最小金额的充值将不会上账且无法退回
			</div> -->
		</div>
	</div>
</template>
<script>
import {getUserCoinList} from '@/api/request'
import { mapState } from 'vuex'
import { Toast } from 'vant'
import vueQr from 'vue-qr'
export default {
	components:{
		vueQr
	},
	data(){
		return {
			qr:''
		}
	},
	mounted(){
		getUserCoinList({pageNum:1,pageSize:20,onLoading:true}).then(res=>{
			if(res.code == 200){
				res.result.list.forEach(element => {
					if(element.coinName == "ETH"){
						this.qr = element.addr
					}
				});
				
			}else{
				this.$toast(res.msg)
			}
		}).catch(err=>{
			console.log(err)
		})
		this.$store.dispatch('getUserAssetInfo')
	},
	methods:{
		onCopy(){
			this.$toast('复制成功')
		},
		onError(err){
			console.log(err)
			this.$toast('复制失败，请手动复制')
		}
	},
	watch:{

	},
	computed:{
		...mapState(['assetInfo'])
	}
}
</script>
<style lang="less" scoped>
.recharge-page{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
		.main{
			flex: 1;
			overflow: hidden;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			
		}
		.amount{
			display: flex;
			flex-direction: column;
			align-items: center;
			background: rgba(181,43,20,.4);
			padding-top: .2rem;
			padding-bottom: .4rem;
			p{
				color: #fff;
				font-size: .24rem;
				line-height: .24rem;
				margin-bottom: .2rem;
			}
			span{
				font-size: .48rem;
				color: #FFEB1D;
				line-height: .48rem;
				font-weight: 500;
			}
		}
		.QR{
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: .8rem .3rem;
			margin-bottom: 0;
			background: #FFF1D4;
			box-sizing: border-box;
			padding: 0.8rem 0;
			border-radius: .12rem;
			box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);
			.qrImg{
				width: 2rem;
				height: 2rem;
				background: #fff;
				box-sizing: border-box;
				border-radius: .08rem;
				padding: .05rem;
				font-size: 0;
				line-height: 0;
				&>img{
					width: 1.9rem;
					height: 1.9rem;
				}
			}
			.tip1{
				font-size: .24rem;
				line-height: .28rem;
				margin-bottom:.4rem ;
			}
			.tip2{
				font-size: .24rem;
				color: #FFEB1D;
				line-height: .28rem;
				margin-bottom:.4rem ;
				margin-top: .4rem;
			}
			.code{
				font-size: .22rem;
				color: #641E18;
				line-height: .26rem;
				-moz-user-select: all;/*火狐*/
				-webkit-user-select:all;/*webkit浏览器*/
				-ms-user-select:all;/*IE10*/
				-khtml-user-select:all;/*早期浏览器*/
				user-select:all;
				img{
					width: .2rem;
					height: .2rem;
				}
			}
		}
		.tips {
			margin: .2rem .3rem;
			margin-bottom: 0;
			background: #FFF1D4;
			box-sizing: border-box;
			padding: .2rem;
			border-radius: .12rem;
		}
}
</style>