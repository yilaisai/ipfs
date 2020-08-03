<template>
	<div class="buy_ship-page">
		<HeaderBar title="购买船只" color="transparent"></HeaderBar>
		<div class="swiper-container" id="ship-swiper">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item,key) in list" :key="key" v-if="item.roleId != 0">
					<h2>{{item.roleName}}</h2>
					<div class="img-wrap">
						<img :src="'./img/ship/ship' + item.roleId + '.png'" alt="">
					</div>
					<ul>
						<li><label>星级：</label><span><van-icon v-for="(star,key) in item.roleId" name="star" :key="key" /></span></li>
						<li><label>可载船员：</label><span>{{item.inviteNum}}人</span></li>
						<li><label>金额：</label><span class="red">{{item.fee}} USDT</span></li>
					</ul>
					<van-button type="primary" size="large" @click="buy(item)" :disabled="(userInfo.roleId + 1) != item.roleId">
						{{item.roleId <= userInfo.roleId ? '已购买' : '购买'}}
					</van-button>
				</div>
			</div>
		</div>

		<van-popup v-model="show" closeable position="bottom" @close="password = ''">
			<h3>确认购买</h3>
			<h2>{{payInfo.fee}} <sub>USDT</sub></h2>
			<div class="info">
				<label>支付方式</label>
				<span v-if="userInfo.amount >= Number(payInfo.fee)">钱包</span>
				<span v-else class="red">钱包余额不足</span>
			</div>
			<input v-model="password" type="password" placeholder="请输入您的资金密码">
			<van-button type="primary" size="large" @click="pay">确认支付</van-button>
		</van-popup>
	</div>
</template>

<script>
import { boatInfo, userBuyBoat } from '@/api/request'
import { mapState } from 'vuex'
import Md5 from 'js-md5'
export default {
	name: 'buyShip',
	data() { 
		return {
			show: false,
			password: "",
			list: [],
			mySwiper: null,
			payInfo: {}
		}
	},
	mounted() {
		this.mySwiper = new Swiper('#ship-swiper', {
			slidesPerView : 1,
			spaceBetween : 20,
		});
		this.getData()
	},
	methods: {
		getData() {
			this.$bus.$emit('loading', true)
			boatInfo().then(res => {
				this.list = res.result
				setTimeout(() => {
					this.mySwiper.update()
					this.mySwiper.slideTo(this.userInfo.roleId)
					this.$bus.$emit('loading', false)
				}, 500)
			}).catch(err => {
				this.$bus.$emit('loading', false)
			})
		},
		buy(item) {
			this.payInfo = item
			this.show = true
		},
		pay() {
			this.$bus.$emit('loading', true)
			userBuyBoat({
				roleId: this.payInfo.roleId,
				fundPwd: Md5(this.password)
			}).then(res => {
				this.$bus.$emit('loading', false)
				this.$store.dispatch('getUserInfo')
				this.$router.replace('/resultTipsPage?type=buyShip&lv=' + this.payInfo.roleId)
			}).catch(err => {
				this.$bus.$emit('loading', false)
			})
		}
	},
	computed: {
		...mapState(['userInfo'])
	}
}
</script>

<style lang="less" scoped>
.buy_ship-page{
	background-color: #00D984;
	.swiper-container {
		padding: 0 .8rem;
		margin-top: 1.4rem;
		.swiper-wrapper {
			.swiper-slide {
				background-color: #fff;
				width: 5.9rem;
				border-radius: .26rem;
				padding: .7rem .4rem;
				.img-wrap {
					height: 3rem;
					position: relative;
					img {
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
						display: block;
						width: 70%;
						max-height: 3rem;
					}
				}
				ul {
					li {
						font-size: .38rem;
						margin-top: .28rem;
						&:first-child {
							margin-top: 0;
						}
						.van-icon {
							color: #ffd124;
						}
						span {
							&.red {
								color: #F42E14;
								font-weight: 600;
							}
						}
					}
				}
				.van-button {
					margin-top: .45rem;
					height: 1rem;
					border-radius: .5rem;
					box-shadow: 0px .19rem .32rem 0px rgba(0,217,132,0.4);
				}
			}
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