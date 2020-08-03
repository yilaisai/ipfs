<template>
	<div class="ship_info-page">
		<HeaderBar title="船舶信息"></HeaderBar>
		<div class="main scroll-y">
			<div class="banner">
				<h2>当前等级：木筏</h2>
				<h3>可承载船员：{{myShipInfo.inviteNum}}人</h3>
				<img :src="'./img/ship/ship'+ userInfo.roleId +'.png'" alt="">
			</div>
			<ul>
				<li>
					<div>
						<label>我的船员</label>
						<p>船员人数（单位：人）</p>
					</div>
					<span>{{userInfo.inviteNum}}</span>
				</li>
				<li>
					<div>
						<label>实习船员</label>
						<p>船员人数（单位：人）</p>
					</div>
					<span>{{userInfo.inviteNum - userInfo.realInviteNum}}</span>
				</li>
				<li>
					<div>
						<label>下一等级：帆船</label>
						<p>可承载人数（单位：人）</p>
					</div>
					<span>{{nextShipInfo.inviteNum}}</span>
				</li>
			</ul>
		</div>
		<footer><van-button type="primary" size="large" @click="$router.push('/buyShip')">去升级</van-button></footer>
	</div>
</template>

<script>
import { boatInfo } from '@/api/request'
import { mapState } from 'vuex'
export default {
	name: 'shipInfo',
	data() { 
		return {
			myShipInfo: {},
			nextShipInfo: {}
		}
	},
	mounted() {
		this.getData()
	},
	methods: {
		getData() {
			boatInfo().then(res => {
				res.result.forEach(val => {
					if(val.roleId == this.userInfo.roleId) {
						this.myShipInfo = val
					}
					if(val.roleId == (this.userInfo.roleId + 1)) {
						this.nextShipInfo = val
					}
				})
			})
		}
	},
	computed: {
		...mapState(['userInfo'])
	}
}
</script>

<style lang="less" scoped>
.ship_info-page{
	display: flex;
	flex-direction: column;
	background-color: #fff;
	.main {
		flex: 1;
		.banner {
			height: 7.4rem;
			background: url(../../../../public/img/ship/bg1.png) no-repeat center;
			background-size: 100% 100%;
			overflow: hidden;
			text-align: center;
			h2 {
				font-size: .32rem;
				margin: 1.2rem 0 .2rem;
			}
			h3 {
				font-size: .28rem;
				font-weight: 400;
			}
			img {
				display: block;
				width: 3.5rem;
				margin: 1.4rem auto 0;
			}
		}
		ul {
			padding: 0 1rem;
			li {
				display: flex;
				align-items: center;
				font-size: .3rem;
				border-bottom: 1px solid #DDDDDD;
				padding: .4rem 0;
				&:last-child {
					border-bottom: none;
				}
				div {
					flex: 1;
					p {
						font-size: .24rem;
						color: #999999;
					}
				}
				span {
					color: #F42E14;
					margin-right: .2rem;
				}
			}
		}
	}
	footer {
		padding: .6rem 0;
		.van-button {
			display: block;
			width: 43%;
			box-shadow: 0px .1rem .32rem 0px rgba(0,174,106,0.4);
			height: .74rem;
			border-radius: .37rem;
			margin: 0 auto;
		}
	}
}
</style>