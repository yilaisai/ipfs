<template>
	<div class="recharge-components">
		<div class="QR">
			<div class="btn-wrap">
				<button :class="{'active' : active == 'addrErc20'}" @click="active = 'addrErc20'">ERC20</button>
				<button :class="{'active' : active == 'addr'}" @click="active = 'addr'">OMNI</button>
			</div>
			<div class="qrImg">
				<vue-qr :text="userInfo[active]" :margin="0"></vue-qr>
			</div>
			<p class="code" v-clipboard:copy="userInfo[active]" v-clipboard:success="onCopy" v-clipboard:error="onError">{{userInfo[active]}} <img src="../../../../public/img/copy-icon02.png" alt=""> </p>
		</div>
		<div class="tips">
			<span>注意</span>
			禁止向USDT地址充值除{{active == 'addr' ? 'OMNI' : 'ERC20'}}-USDT之外的资产，任何充USDT地址的非USDT资产将不可找回！               
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import vueQr from 'vue-qr'
export default {
	components:{
		vueQr
	},
	data(){
		return {
			active: 'addrErc20'
		}
	},
	mounted(){
		
	},
	methods:{
		onCopy(){
			this.$toast('复制成功')
		},
		onError(err){
			this.$toast('复制失败，请手动复制')
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
.recharge-components{
	.QR{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: .8rem .3rem;
		margin-bottom: 0;
		box-sizing: border-box;
		padding: .3rem 0 .5rem;
		border-radius: .12rem;
		.btn-wrap {
			margin-bottom: .5rem;
			button {
				width: 1.6rem;
				height: .74rem;
				color: #999999;
				font-size: .32rem;
				background:rgba(255,255,255,1);
				box-shadow: 0px 2px .2rem 0px rgba(0,76,46,0.08);
				border-radius: .12rem;
				margin-right: .2rem;
				&.active {
					color: #00D984;
				}
			}
		}
		.qrImg{
			width: 2.8rem;
			height: 2.8rem;
			background: #fff;
			box-sizing: border-box;
			border-radius: .08rem;
			padding: .05rem;
			font-size: 0;
			line-height: 0;
			&>img{
				width: 2.7rem;
				height: 2.7rem;
			}
		}
		.tip1{
			font-size: .24rem;
			line-height: .28rem;
			margin-bottom:.4rem ;
		}
		.code{
			font-size: .24rem;
			color: #222222;
			line-height: .5rem;
			background-color: #EEEEEE;
			padding: 0 .2rem;
			margin-top: .3rem;
			border-radius: .25rem;
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
		box-sizing: border-box;
		padding: .2rem;
		border-radius: .12rem;
		color: #999999;
		font-size: .25rem;
		span {
			display: block;
			font-size: .28rem;
			color: #222222;
			font-weight: 600;
			margin-bottom: .2rem;
		}
	}
}
</style>