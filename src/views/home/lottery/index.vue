<template>
	<div class="lottery_index-page">
		<HeaderBar title="幸运大转盘" color="black"></HeaderBar>
		<div class="main scroll-y">
			<img class="title" src="../../../../public/img/lottery/title.png" alt="">
			<div class="total"><label>奖池已累计</label> <span>{{userInfo.rewardPool}}</span> <sub>USDT</sub></div>
			<div class="machine">
				<div class="machine-bg"></div>
				<div class="balloon-bg"></div>
				<p>你有{{userInfo.boatTicket}}张入场券，可抽奖<span>{{userInfo.boatTicket}}</span>次</p>
				<div class="start" @click="start"></div>
				<div class="prize-wrap" ref="prizeWrap">
					<div class="roll-bar" :style="{'left' : rollDist + 'px'}">
						<ul ref="list1">
							<li v-for="(item, key) in 10" :key="key"><img src="../../../../public/img/lottery/prize0.png" alt=""></li>
						</ul>
						<ul ref="list2">
							<li v-for="(item, key) in 10" :key="key"><img src="../../../../public/img/lottery/prize0.png" alt=""></li>
						</ul>
					</div>
				</div>
			</div>
			<img class="rule" src="../../../../public/img/lottery/rule.png" alt="" @click="$router.push('/lotteryRule')">
			<div class="record">
				<h2>中奖名单</h2>
				<!-- <ul>
					<li v-for="(item,key) in 3" :key="key">一条酸菜鱼又酸又菜又多余 抽中 100USDT</li>
				</ul> -->
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() { 
		return {
			rollDist: 0,  //滚动数值
			cycles: 0,   //圈数
			resetDist: 0,  //复位位置
			resetTrigger: 0,  //复位触发点
			prizeDomWidth: 0,  //单个奖品的宽度
			prizeWrapWidth: 0,  //奖品窗口宽度
			isRolling: false,
			speed: 20,
			timer: null,
			prize: 6  //中奖位
		}
	},
	mounted() {
		const listWidth = this.$refs.list1.getBoundingClientRect().width
		this.prizeDomWidth = listWidth / 10
		this.rollDist = listWidth / 10 * -0.3
		this.resetTrigger = (listWidth + (listWidth / 2)) * -1
		this.resetDist = listWidth / 2 * -1
		this.prizeWrapWidth = this.$refs.prizeWrap.getBoundingClientRect().width
	},
	methods: {
		startRoll() {
			if(this.cycles > 2) {
				this.speed = 10
			}
			if(this.cycles > 3) {
				this.speed = 5
			}
			if(this.cycles > 4) {
				this.speed = 2
				if(this.rollDist <= this.prizeLocation) {
					clearTimeout(this.timer)
					this.rollDist = this.prizeLocation
					this.isRolling = false
					this.speed = 20
					this.cycles = 0
					return
				}
			}
			if(this.rollDist <= this.resetTrigger) {
				this.rollDist = this.resetDist
				this.cycles++
			}
			this.rollDist -= this.speed
			this.timer = setTimeout(() => {
				this.startRoll()
			}, 13)
		},
		start() {
			this.$toast('敬请期待！')
			return
			if(this.userInfo.boatTicket <= 0) {
				this.$router.push('/ticket')
				return 
			}
			if(this.isRolling) return
			this.rollDist = 0
			this.isRolling = true
			this.startRoll()
		}
	},
	computed: {
		...mapState(['userInfo']),
		prizeLocation() {
			// 中奖位置
			return this.prizeDomWidth * (this.prize - 1) * -1 + (this.prizeWrapWidth / 2) - (this.prizeDomWidth / 2)
		}
	}
}
</script>

<style lang="less" scoped>
.lottery_index-page{
	display: flex;
	flex-direction: column;
	background: url(../../../../public/img/lottery/page_bg.png) no-repeat center;
	background-size: 100% 100%;
	overflow: hidden;
	.com-header-bar {
		color: #333333;
		background-color: transparent;
	}
	.main {
		flex: 1;
		.title {
			display: block;
			height: .94rem;
			margin: .6rem auto .35rem;
		}
		.total {
			background: url(../../../../public/img/lottery/balance_bg.png) no-repeat center;
			background-size: 100% 100%;
			height: 1rem;
			width: 65%;
			max-width: 90%;
			line-height: .9rem;
			color: #fff;
			font-size: .28rem;
			margin: 0 auto;
			text-align: center;
			text-shadow: rgb(34, 146, 85) 1px 2px 2px;
			label {
				vertical-align: top;
			}
			span {
				font-size: .48rem;
				color: #F4F36B;
				margin: 0 .1rem;
			}
			sub {
				font-size: .22rem;
				vertical-align: baseline;
			}
		}
		.machine {
			position: relative;
			width: 6.8rem;
			height: 6.7rem;
			margin: .28rem 0 0 .6rem;
			.machine-bg {
				position: absolute;
				z-index: 12;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: url(../../../../public/img/lottery/machine.png) no-repeat center;
				background-size: 100% 100%;
			}
			.balloon-bg {
				position: absolute;
				top: -0.8rem;
    			left: -0.6rem;
				width: 1.55rem;
				height: 1.77rem;
				background: url(../../../../public/img/lottery/balloon.png) no-repeat center;
				background-size: 100% 100%;
			}
			p {
				position: absolute;
				z-index: 13;
				top: 3.7rem;
				left: 1.2rem;
				background-color: #85B95B;
				font-size: .28rem;
				color: #fff;
				height: .4rem;
				border-radius: .2rem;
				width: 4rem;
				max-width: 80%;
				text-align: center;
			}
			.start {
				position: absolute;
				z-index: 13;
				top: 4.5rem;
				left: 1.4rem;
				height: 1rem;
				width: 3.6rem;
				background: url(../../../../public/img/lottery/start.png) no-repeat center;
				background-size: 100% 100%;
			}
			.prize-wrap {
				position: absolute;
				z-index: 11;
				left: 0.6rem;
				top: 0.4rem;
				width: 5.3rem;
				height: 2.7rem;
				overflow: hidden;
				background: url(../../../../public/img/lottery/machine_bg.png) no-repeat center;
				background-size: 100% 100%;
				.roll-bar {
					position: absolute;
					left: -0.6rem;
					top: 0.7rem;
					white-space: nowrap;
					ul {
						display: inline-block;
						white-space: nowrap;
						li {
							display: inline-block;
							width: 1.6rem;
							height: 1.6rem;
							line-height: 1.3rem;
							text-align: center;
							font-weight: 600;
							background-color: #fff;
							border-radius: .35rem;
							border: .1rem solid yellow;
							margin: 0 .3rem;
							img {
								width: 100%;
								height: 100%;
							}
						}
					}
				}
				
			}
		}
		.rule {
			position: absolute;
			top: 7.4rem;
    		left: -0.45rem;
			height: 1.72rem;
			pointer-events: initial;
		}
		.record {
			position: relative;
			z-index: 16;
			left: .05rem;
			color: #999999;
			width: 5.3rem;
			background: url(../../../../public/img/lottery/record_bg.png) no-repeat center;
			background-size: 100% 100%;
			text-align: center;
			margin: -.32rem auto 0;
			h2 {
				font-size: .28rem;
				padding: .15rem;
				border-bottom: 1px dashed #999999;
			}
			ul {
				padding-bottom: .48rem;
				li {
					font-size: .24rem;
					margin-top: .16rem;
				}
			}
		}
	}
}
</style>