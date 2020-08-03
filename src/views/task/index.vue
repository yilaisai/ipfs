<template>
	<div class="task-page">
		<HeaderBar title="航海任务" color="transparent"></HeaderBar>
		<div class="main">
			<h3>我的船只</h3>
			<h3>当前船员：{{userInfo.realInviteNum}}人</h3>
			<img class="myship" :src="'./img/ship/ship'+ userInfo.roleId +'.png'" alt="">
			<h3>{{userInfo.roleName}}</h3>
			<h4 @click="$router.push('/taskRule')"><span>游戏规则</span><van-icon name="question-o" /></h4>
			<div class="next_level" v-if="userInfo.roleId < 9">
				<h2>距离下一等级还差：{{nextShipInfo.upgradeNum - userInfo.realInviteNum < 0 ? 0 : nextShipInfo.upgradeNum - userInfo.realInviteNum}}人</h2>
				<img class="next_ship" :src="'./img/ship/ship'+ (userInfo.roleId + 1) +'.png'" alt="">
				<h5>Lv2 渔船</h5>
				<van-button type="primary" size="large" @click="clickHandler">
					{{nextShipInfo.upgradeNum <= userInfo.realInviteNum ? '去升级' : '招募船员'}}
				</van-button>
				<div class="btm-info">
					<p>温馨提示：<br />当前有{{userInfo.inviteNum - userInfo.realInviteNum}}个好友还是实习船员哦~</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { boatInfo } from '@/api/request'
export default {
	data() { 
		return {
			nextShipInfo: {}
		}
	},
	mounted() {
		boatInfo().then(res => {
			res.result.forEach(val => {
				if(val.roleId == (this.userInfo.roleId + 1)) {
					this.nextShipInfo = val
				}
			})
		})
	},
	methods: {
		clickHandler() {
			if(this.nextShipInfo.upgradeNum <= this.userInfo.realInviteNum) {
				this.$router.push('/buyShip')
			}else {
				this.$router.push('/inviteShare')
			}
		}
	},
	computed: {
		...mapState(['userInfo'])
	}
}
</script>

<style lang="less" scoped>
.task-page{
	display: flex;
	flex-direction: column;
	background: #86CE60 url(../../../public/img/ship/bg2.png) no-repeat top center;
	background-size: 100% auto;
	.main {
		position: relative;
		flex: 1;
		background: url(../../../public/img/ship/bg3.png) no-repeat bottom center;
		background-size: 100% auto;
		padding: .5rem 0 0 0;
		h3 {
			text-align: center;
			color: #fff;
			font-size: .32rem;
			margin: .2rem 0 0 0;
		}
		h4 {
			text-align: center;
			color: #fff;
			font-size: .24rem;
			margin-top: .2rem;
			span {
				vertical-align: middle;
			}
			.van-icon {
				margin-left: .1rem;
				vertical-align: middle;
			}
		}
		.myship {
			display: block;
			width: 3.5rem;
			margin: .3rem auto;
		}
		.next_level {
			position: absolute;
			width: 100%;
			bottom: 0;
			left: 0;
			padding: .3rem;
			h2 {
				font-size: .34rem;
			}
			.next_ship {
				display: block;
				width: 3.3rem;
				margin: .4rem auto;
			}
			h5 {
				font-size: .28rem;
				color: #999999;
				text-align: center;
			}
			.van-button--large {
				display: block;
				width: 40%;
				margin: .9rem auto .4rem;
				height: .74rem;
				border-radius: .37rem;
				font-size: .32rem;
				font-weight: 600;
			}
			.btm-info {
				p {
					color: #999999;
					font-size: .24rem;
				}
			}
		}
	}
}
</style>