<template>
	<div class="my-page">
		<div class="user-info">
			<div class="info-l">
				<img :src="userInfo.iconUrl" alt="">
				<div class="text">
					<h3>{{userInfo.nickName || '--'}} <span>LV{{userInfo.roleId}}</span></h3>
					<!-- <span>{{userInfo.phone}}</span> -->
					<span class="userid" v-if="userInfo.roleId > 0">ID : {{userInfo.userId}}</span>
				</div>
			</div>
			<div class="activate" @click="clickHandler">
				<h4 v-if="userInfo.isActive == 1">邀请船员做任务</h4>
				<h4 v-else>激活账户开启冒险</h4>
				<van-icon name="arrow" />
			</div>
		</div>
		<div class="menu-list">
			<ul>
				<li @click="goToWallet">
					<img src="../../../public/img/assets_icon.png" alt="">
					<span>我的钱包</span>
					<label class="red">{{userInfo.amount}} <sub>{{userInfo.coinName}}</sub></label>
					<i></i>
				</li>
				<li @click="$router.push('/billList')">
					<img src="../../../public/img/bill_icon.png" alt="">
					<span>我的账单</span>
					<i></i>
				</li>
				<li @click="$router.push('/notice')">
					<img src="../../../public/img/message_icon.png" alt="">
					<span :class="{'dot' : totalNotice > totalReadNotice}">消息中心</span>
					<i></i>
				</li>
			</ul>
			<ul>
				<li v-if="userInfo.roleId > 0">
					<img src="../../../public/img/friend_icon.png" alt="">
					<span>我的邀请码</span>
					<label
						v-clipboard:copy="userInfo.inviteCode"
						v-clipboard:success="onCopy"
						v-clipboard:error="onError" >
						{{userInfo.inviteCode}}
					</label>
				</li>
				<li @click="$router.push('/helpCenter')">
					<img src="../../../public/img/help_icon.png" alt="">
					<span>帮助中心</span>
					<i></i>
				</li>
				<li @click="$router.push('/setting')">
					<img src="../../../public/img/setting_icon.png" alt="">
					<span>设置</span>
					<i></i>
				</li>
			</ul>
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
		getNoticeList({
			pageNum: 1,
			pageSize: 1
		}, {noLoading: true}).then(res => {
			this.totalNotice = res.result.total
		})

		this.$store.dispatch('getUserInfo')
	},
	mounted() {
		if(this.userInfo.isSetFund == 0){
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
			if(this.userInfo.isSetFund == 0){
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
			if(this.userInfo.isActive == 0) {
				this.$router.push('/activateAccount')
			}else {
				if(this.userInfo.roleId <= 0) {
					this.$dialog.confirm({
						message: '您还未购买船只，是否前去购买？',
							confirmButtonText:'去购买'
						}).then(() => {
							this.$router.push('/buyShip')
						}).catch(() => {
						// on cancel
					});
				}else {
					this.$router.push('/task')
				}
			}
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
		background-color: #00D984;
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
			justify-content: flex-end;
			position: absolute;
			left: 0;
			bottom: -1.3rem;
			width: 100%;
			height: 2.56rem;
			color: #fff;
			background: url(../../../public/img/bg1.png) no-repeat center;
			background-size: 100% 100%;
			h4 {
				font-size: .48rem;
			}
			.van-icon {
				margin: 0 .4rem 0 .6rem;
				font-size: .3rem;
			}
		}
		&:after {
			content: '';
			position: absolute;
			width: 1.16rem;
			height: 1.16rem;
			background: linear-gradient(-81deg,rgba(0,217,132,1) 0%,rgba(23,237,174,1) 100%);
			border-radius: 50%;
			right: 1.4rem;
			top: .7rem;
		}
		&:before {
			content: '';
			position: absolute;
			width: .63rem;
			height: .63rem;
			background: linear-gradient(-81deg,rgba(0,217,132,1) 0%,rgba(23,237,174,1) 100%);
			opacity: 0.68;
			border-radius:50%;
			right: .9rem;
			top: 1.7rem;
		}
	}
	.menu-list {
		padding: 1.4rem .2rem .2rem;
	}
	ul {
		flex: 1;
		border-radius: .26rem;
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