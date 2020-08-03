<template>
	<div class="withdraw-page">
		<HeaderBar title="提现" color="red">
			<span class="other" @click="$router.push('/withdrawRecord')">提现记录</span>
		</HeaderBar>
		<div class="main">
			<div class="amount">
				<p>钱包余额 (ETH)</p>
				<span>{{assetInfo.amount}}</span>
			</div>
			<div class="frombox">
				<div class="group">
					<p>请输入提现 ETH 数量</p>
					<div>
						<input type="text" v-model="value" @input="valInput" placeholder="请输入提现数量">
						<span>ALL</span>
					</div>
					<p class="tip" v-show="min">{{inSite==0?'站内':'站外'}}最小提现数量为{{min}}，且只能为整数</p>
				</div>
				<div class="group">
					<p>收币地址</p>
					<div>
						<input type="text" v-model="address"  placeholder="请输入收币地址">
					</div>
				</div>
				<div class="btn" @click="witgdrawStart">提现</div>
			</div>
			<div class="tips">
				温馨提示：<br />收币地址请输入ETH地址，否则资产将不可找回。
			</div>
		</div>
		<van-dialog v-model="witgdrawInfoShow" title="确认提币" show-cancel-button @confirm = "confirmInfo" >
			<div class="witgdrawInfo">
				<p>收币地址：</p>
				<p>{{address}}</p>
				<p v-show="phone" class="account">(账号：******{{phone.substring(phone.length-4,phone.length)}})</p>
				<p>提现数额 : {{value}} ETH  </p>
				<p>手 续 费 : {{ calcFee(value, fee) }} ETH</p>
				<p>实际支付 : {{ Number(value) + calcFee(value, fee) }} ETH</p>
			</div>
		</van-dialog>
		<van-dialog v-model="passwordShow" title="确认提币" show-cancel-button @confirm = 'withdraw' >
			<div class="passwordInput">
				<p>资金密码 ：</p>
				<input type="password" maxlength="6" v-model="password" @input="passwordInput" placeholder="纯6位数字" >
			</div>
		</van-dialog>
	</div>
</template>
<script>
import {mapState} from 'vuex'
import {withdraw,getCoinFeeInfo} from '@/api/request'
import Md5 from 'js-md5'
export default {
	name:'withdraw',
	components:{

	},
	data(){
		return {
			value:'',
			password:'',
			address:'',
			witgdrawInfoShow:false,//显示提币信息
			passwordShow:false,
			fee:0,
			inSite:0,
			min:'',
			phone:''
		}
	},
	mounted(){
		this.address = this.$route.query.addr || ""
		this.$store.dispatch('getUserAssetInfo')
	},
	methods:{
		valInput(){  
			this.value = this.value.replace(/[^\d]/g,"")  //清除“数字”以外的字符   
		},
		// POST /chicken/user/getCoinFeeInfo
		passwordInput(){
			this.password = this.password.replace(/[^\d]/g,"")  //清除“数字”以外的字符 
		},
		witgdrawStart(){
			if( !this.value>0 ){
				this.$toast('请输入提现数量')
				return
			}else if(this.address.length<1){
				this.$toast('请输入收币地址')
				return
			}else{
				getCoinFeeInfo({addr:this.address}).then(res=>{
					if(res.code == 200){
						console.log(res.result)
						this.fee = res.result.fee
						this.inSite = res.result.inSite
						this.min = res.result.min
						this.phone = res.result.phone
						if(this.value<this.min ){
							let text = this.inSite==0?'站内':'站外'
							this.$toast(text+'最小提现数量为'+this.min)
							return
						}else if(this.value>this.assetInfo.amount){
							this.$toast('余额不足')
							return
						}
						this.witgdrawInfoShow = true
					}else{
						this.$toast(res.msg)
					}
				}).catch(err=>{
					console.log(err)
				})
			}
			
		},
		confirmInfo(){
			// let amount = Math.floor((this.value*1 + Math.floor(this.value*this.fee)/100)*10000)/10000
			let amount = this.value*1 + this.calcFee(this.value, this.fee)
			if( amount > this.assetInfo.amount ){
				this.$toast('余额不足')
				return
			}
			this.passwordShow = true
		} ,
		withdraw(){
			withdraw({
				coinId:9,
				amount:this.value,
				funPwdMd5:Md5(this.password),
				toAddr:this.address,
				memo:'',
				captcha:''
			}).then(res=>{
				this.$store.dispatch('getUserAssetInfo')
				this.$toast.success(res.msg)
			}).catch(err=>{
				console.log(err)
			})
		},
		calcFee(val, fee) {
			if(/\%/.test(fee)) {
				let f = fee.replace(/\%/, '') * 1
				f = f / 100
				return Math.ceil(val * f * 10000) / 10000
			}else {
				return Number(val) + Number(fee)
			}
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
.withdraw-page{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
		.main{
			flex: 1;
			overflow: hidden;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
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
			.frombox{
				padding: .8rem .4rem .3rem;
				.group{
					margin-bottom: .4rem;
					&:last-of-type{
						margin-bottom: 0;
					}
					p{
						color: #fff;
						font-size: .24rem;
						line-height: .24rem;
					}
					&>div{
						height: .96rem;
						background: #fff;
						border-radius: .08rem;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;
						padding: 0 .3rem;
						box-sizing: border-box;
						margin: .12rem 0;
						input{
							width: 5.4rem;
							font-size: .28rem;
							border: none;
							background: transparent;
							color: #000;
							&::placeholder{
								color: #798297;
							}
						}
						span{
							color: #FFEB1D;
							font-size: .28rem;
							font-weight: 500;
						}
					}
				}
			}
			.tips {
				padding: .4rem;
			}
			.btn{
				width: 100%;
				margin-top: .8rem;
				height: .96rem;
				line-height: .96rem;
				color: #5A2708;
				text-align: center;
				font-size: .3rem;
				font-weight: 700;
				background:#FFF200;
				border-radius:.08rem;
			}
		}
		.passwordInput{
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			padding-bottom: .3rem;
			p{
				font-size: .3rem;
				line-height: .4rem;
				color: #323232;
				font-weight: 500;
			}
			input{
				width: 3.1rem;
				line-height: .44rem;
				height: .44rem;
				border: none;
				background: #FBE2B9;
				border-radius: 0.04rem;
				font-size: .24rem;
				padding: 0 .1rem;
				&::placeholder{
					color: #000000;
				}
			}
		}
		.witgdrawInfo{
			padding-bottom: .3rem;
			p{
				font-size: .3rem;
				line-height: .4rem;
				color: #323232;
				font-weight: 500;
				word-wrap:break-word;
				&.account{
					color: #641E18;
					margin: 0.12rem 0;
				}
			}
		}
}
</style>