<template>
	<div class="activate_account-page">
		<HeaderBar title="激活账户"></HeaderBar>
		<div class="main scroll-y">
			<div class="banner">
				<div class="bubble">Hi~可爱的勇士，<br />准备好出海航行了吗？ </div>
			</div>
			<h2>规则说明</h2>
			<div class="rule">
				<p>1.激活账户需花费{{userInfo.activeAmount}}USDT投资奖池，奖池累计达到一定额度会进行抽奖，航海家可通过持有的奖池入场券参与抽奖。</p>
				<p>2.激活账户后可进行购买船只，通过作任务升级船只，任务完成度越高，则有更多机会参与抽奖提升大奖率。</p>
				<p>3.舰队船员购买船只，您将得到分成，分成比例将随着等级增长。</p>
				<p>4.舰队分成将根据您当前的等级，可提现，等级越高，提现额度越高。</p>
			</div>
		</div>
		<footer>
			<van-button type="primary" size="large" @click="showPopup">投资{{userInfo.activeAmount}}USDT激活</van-button>
		</footer>

		<van-popup v-model="show" closeable position="bottom" @close="password = ''">
			<h3>确认激活</h3>
			<h2>{{userInfo.activeAmount}} <sub>USDT</sub></h2>
			<div class="info">
				<label>支付方式</label>
				<span v-if="userInfo.amount < userInfo.activeAmount" class="red">钱包余额不足</span>
				<span v-else>钱包</span>
			</div>
			<input v-model="password" type="password" placeholder="请输入您的资金密码">
			<van-button type="primary" size="large" @click="pay">确认支付</van-button>
		</van-popup>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { userActive } from '@/api/request'
import Md5 from 'js-md5'
export default {
	data() { 
		return {
			show: false,
			password: ""
		}
	},
	methods: {
		showPopup() {
			if(this.userInfo.isSetFund == 0){
				this.$dialog.confirm({
					message: '请先设置资金密码！',
					confirmButtonText:'去设置'
				}).then(() => {
					this.$router.push('/updateFundsPwd')
				}).catch(() => {
					// on cancel
				});
				return
			}
			this.show = true
		},
		pay() {
			userActive({
				fundPwd: Md5(this.password)
			}).then(res => {
				this.show = false
				this.$toast.success(res.msg)
				this.$router.replace('/resultTipsPage?type=activateAccount')
			})
		}
	},
	computed: {
		...mapState(['userInfo'])
	}
}
</script>

<style lang="less" scoped>
.activate_account-page{
	display: flex;
	flex-direction: column;
	.main {
		flex: 1;
		padding: .4rem .3rem;
		.banner {
			height: 5.25rem;
			background: url(../../../public/img/banner_bg1.png) no-repeat center;
			background-size: 100% 100%;
			overflow: hidden;
			.bubble {
				width: 3.3rem;
				height: 1.6rem;
				background: url(../../../public/img/dhk_bg1.png) no-repeat center;
				background-size: 100% 100%;
				margin: .5rem 0 0 .8rem;
				font-size: .25rem;
				color: #fff;
				padding: .28rem .22rem;
				text-align: center;
			}
		}
		h2 {
			position: relative;
			font-size: .35rem;
			padding-left: .34rem;
			margin: .4rem 0;
			&::before {
				content: '';
				display: inline-block;
				position: absolute;
				left: 0;
				top: .1rem;
				width: .04rem;
				height: .3rem;
				background-color: #00D984;
			}
		}
		.rule {
			position: relative;
			p {
				position: relative;
				background: url(../../../public/img/dhk_bg2.png) no-repeat center;
				background-size: 100% 100%;
				width: 6.5rem;
				height: 1.5rem;
				margin-left: .4rem;
				margin-bottom: .4rem;
				padding: .2rem .4rem;
				font-size: .26rem;
				&::before {
					content: "";
					position: absolute;
					top: 0;
					left: -.4rem;
					width: .24rem;
					height: .21rem;
					background: url(../../../public/img/polygon_icon.png) no-repeat center;
					background-size: 100% 100%;
				}
			}
			&::before {
				content: "";
				position: absolute;
				top: 0;
				left: .1rem;
				width: 2px;
				height: 5.8rem;
				background-color: #00D984;
			}
		}
	}
	footer {
		padding: .3rem 0;
		.van-button {
			display: block;
			width: 70%;
			margin: 0 auto;
		}
	}

	// 弹框
	.van-popup {
		border-radius: .26rem .26rem 0px 0px;
		padding: .4rem;
		h3 {
			font-size: .25rem;
			text-align: center;
		}
		h2 {
			font-size: .62rem;
			text-align: center;
			margin: .6rem 0;
			sub {
				font-size: .3rem;
				vertical-align: baseline;
				font-weight: 400;
			}
		}
		.info {
			display: flex;
			justify-content: space-between;
			font-size: .28rem;
			margin-bottom: .6rem;
			label {
				color: #999999;
			}
			span {
				&.red {
					color: #F42E14;
				}
			}
		}
		input {
			display: block;
			width: 100%;
			height: 1rem;
			text-align: center;
			border-radius: .08rem;
			background-color: #EEEEEE;
			font-size: .25rem;
			font-weight: 600;
		}
		.van-button {
			margin-top: .7rem;
		}
	}
}
</style>