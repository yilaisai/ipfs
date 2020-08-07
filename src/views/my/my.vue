<template>
	<div class="my-page">
		<div class="user-info">
			<div class="info-l">
				<img :src="userInfo.iconUrl" alt="">
				<div class="text">
					<h3>{{userInfo.nickName || '--'}} </h3>
					<!-- <span>{{userInfo.phone}}</span> -->
					<span class="userid">ID : {{userInfo.inviteCode}}</span>
				</div>
			</div>
			<div class="activate" @click="clickHandler">
				<img src="../../assets/img/asic-miner.png" alt="">
				<h4>我总存力</h4>
				<span>{{userInfo.tamount}} <sub>T</sub></span>
			</div>
		</div>
		<div class="menu-list">
			<ul>
				<li @click="$router.push('/invite')">
					<img src="../../assets/img/icon/friend_icon.png" alt="">
					<span>邀请好友</span>
					<label
						v-clipboard:copy="userInfo.inviteCode"
						v-clipboard:success="onCopy"
						v-clipboard:error="onError" >
						{{userInfo.inviteCode}}
					</label>
					<i></i>
				</li>
				<!-- <li @click="goToWallet">
					<img src="../../../public/img/assets_icon.png" alt="">
					<span>我的钱包</span>
					<label class="red">{{userInfo.amount}} <sub>{{userInfo.coinName}}</sub></label>
					<i></i>
				</li> -->
				<li @click="$router.push('/transferRecord')">
					<img src="../../assets/img/icon/zyjl_icon.png" alt="">
					<span>存力转移记录</span>
					<i></i>
				</li>
				<li @click="$router.push('/billList')">
					<img src="../../assets/img/icon/jhjl_icon.png" alt="">
					<span>存力激活记录</span>
					<i></i>
				</li>
				<!-- <li @click="$router.push('/orderList')">
					<img src="../../assets/img/icon/order_icon.png" alt="">
					<span>我的订单</span>
					<i></i>
				</li> -->
				<!-- <li @click="$router.push('/notice')">
					<img src="../../../public/img/message_icon.png" alt="">
					<span :class="{'dot' : totalNotice > totalReadNotice}">消息中心</span>
					<i></i>
				</li> -->
				<li @click="$router.push('/setting')">
					<img src="../../assets/img/icon/setting_icon.png" alt="">
					<span>设置</span>
					<i></i>
				</li>
			</ul>
			<!-- <ul>
				<li @click="$router.push('/helpCenter')">
					<img src="../../../public/img/help_icon.png" alt="">
					<span>帮助中心</span>
					<i></i>
				</li>
			</ul> -->
		</div>
	</div>
</template>

<script>
import { getNoticeList } from '@/api/request'
import { mapState } from 'vuex'
export default {
	data() { 
		return {
			totalNotice: 0,
			totalReadNotice: 0
		}
	},
	activated() {
		let readNoticeArr = JSON.parse(localStorage.getItem('readNoticeArr')) || []
		this.totalReadNotice = readNoticeArr.length
		// getNoticeList({
		// 	pageNum: 1,
		// 	pageSize: 1
		// }, {noLoading: true}).then(res => {
		// 	this.totalNotice = res.result.total
		// })

		this.$store.dispatch('getUserInfo')
	},
	mounted() {
		if(this.userInfo.isSetFundPwd == 0){
			if(sessionStorage.getItem('TIPS_FUNDPASSWORD_SET') == 1) return
			sessionStorage.setItem('TIPS_FUNDPASSWORD_SET', 1)
			this.$dialog.confirm({
				message: '您还未设置资金密码，为保证资金安全请先设置资金密码！',
					confirmButtonText:'去设置'
				}).then(() => {
					this.$router.push('/updateFundsPwd')
				}).catch(() => {
				// on cancel
			});
		}
	},
	methods: {
		logout() {
			this.$dialog.confirm({
				title: '提示',
				message: '确定要退出登录？'
			}).then(() => {
				// on confirm
				localStorage.removeItem('token')
				this.$router.replace('/login')
			}).catch(() => {
				// on cancel
			})
		},
		goToWallet() {
			if(this.userInfo.isSetFundPwd == 0){
				this.$dialog.confirm({
					message: '请先设置资金密码！',
						confirmButtonText:'去设置'
					}).then(() => {
						this.$router.push('/updateFundsPwd')
					}).catch(() => {
					// on cancel
				});
			}else {
				this.$router.push('/wallet')
			}
		},
		clickHandler() {
			this.$router.push('/hashrate')
		},
		onCopy(){
			this.$toast('复制成功')
		},
		onError(err){
			this.$toast('复制失败，请手动复制')
		},
	},
	computed: {
		...mapState(['userInfo','assetInfo'])
	}
}
</script>

<style lang="less" scoped>
.my-page{
	display: flex;
	flex-direction: column;
	.user-info {
		position: relative;
		padding: 1.2rem .38rem 1.4rem;
		color: #fff;
		background: #4FD3DC url(../../assets/img/bg/bg4.png) no-repeat center;
		background-size: 100% 100%;
		.info-l {
			position: relative;
			z-index: 12;
			display: flex;
			align-items: center;
			img {
				width: 1.28rem;
				height: 1.28rem;
				border-radius: 50%;
			}
			.text {
				margin-left: .2rem;
				.userid {
					display: block;
					font-size: .28rem;
				}
				h3 {
					color: #fff;
					font-size: .48rem;
					font-weight: 400;
					span {
						display: inline-block;
						vertical-align: middle;
						font-size: .28rem;
						border: .02rem solid #fff;
						line-height: .4rem;
						border-radius: .2rem;
						padding: 0 .25rem;
						margin-left: .1rem;
					}
				}
			}
		}
		.activate {
			display: flex;
			align-items: center;
			position: absolute;
			left: 3%;
			bottom: -0.7rem;
			width: 94%;
			height: 1.4rem;
			color: #000;
			background-color: #fff;
			border-radius: .12rem;
			padding: 0 .2rem;
			img {
				height: 1rem;
			}
			h4 {
				flex: 1;
				font-size: .32rem;
				margin: 0 .2rem;
			}
			span {
				color: #FA6400;
				font-size: .48rem;
				font-weight: bold;
				sub {
					font-size: .28rem;
					vertical-align: baseline;
					font-weight: 400;
				}
			}
		}
	}
	.menu-list {
		padding: 1.2rem .2rem .2rem;
	}
	ul {
		flex: 1;
		border-radius: .12rem;
		overflow: hidden;
		margin-bottom: .24rem;
		li {
			display: flex;
			align-items: center;
			background:#FFFFFF;
			padding: .3rem;
			color: #333333;
			border-bottom: 1px solid #EEEEEE;
			&:last-child {
				border-bottom: none;
			}
			img {
				width: .32rem;
			}
			span {
				flex: 1;
				font-size: .32rem;
				margin: 0 .2rem;
				&.dot {
					&::after {
						content: '';
						display: inline-block;
						width: .16rem;
						height: .16rem;
						border-radius: 50%;
						background-color: #F42E14;
						margin-left: .2rem;
						margin-bottom: .01rem;
						vertical-align: middle;
					}
				}
			}
			i {
				width: .14rem;
				height: .24rem;
				background: url(../../../public/img/arrow_right.png) no-repeat center;
				background-size: 100% auto;
				margin-left: .2rem;
			}
			label {
				font-size: .28rem;
				&.red {
					color: #F42E14;
					font-size: .3rem;
					font-weight: 600;
				}
				sub {
					font-size: .2rem;
					vertical-align: baseline;
				}
			}
		}
	}
}
</style>