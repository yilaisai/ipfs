<template>
	<div class="lottery_rule-page">
		<HeaderBar title="幸运大转盘" color="black"></HeaderBar>
		<div class="main scroll-y">
			<h2>幸运大转盘玩法介绍</h2>
			<div class="board">
				<p>1.每张奖池入场券可以参与一次抽奖。</p>
				<p>2.抽奖的奖金为奖池内的随机奖金。</p>
				<p>3.奖池入场券获得方式： <br /><span>（1）每邀请一个有效船员可获得一张；</span><br /><span>（2）可通过购买获得。</span></p>
			</div>
			<img class="redpacket" src="../../../../public/img/lottery/redpacket.png" alt="">
			<img class="balloon" src="../../../../public/img/lottery/balloon.png" alt="">
		</div>
	</div>
</template>

<script>
export default {
	data() { 
		return {

		}
	}
}
</script>

<style lang="less" scoped>
.lottery_rule-page{
	display: flex;
	flex-direction: column;
	background: url(../../../../public/img/lottery/page_bg2.png) no-repeat center;
	background-size: 100% 100%;
	overflow: hidden;
	.com-header-bar {
		color: #333333;
		background-color: transparent;
	}
	.main {
		flex: 1;
		position: relative;
		h2 {
			color: #fff;
			font-size: .38rem;
			text-align: center;
			background-color: #A4D583;
			line-height: .7rem;
			border-radius: .35rem;
			width: 4.8rem;
			margin: .6rem auto .38rem;
			font-weight: 400;
		}
		.board {
			width: 6.7rem;
			height: 7.8rem;
			background: url(../../../../public/img/lottery/board.png) no-repeat center;
			background-size: 100% 100%;
			margin: 0 auto;
			padding: 1rem 1rem 0 1rem;
			p {
				font-size: .32rem;
				color: #fff;
				margin-bottom: .5rem;
				span {
					font-size: .26rem;
				}
			}
		}
		.redpacket {
			position: absolute;
			top: .05rem;
			right: .23rem;
			width: 1.75rem;
		}
		.balloon {
			position: absolute;
			top: 8rem;
			left: .5rem;
			width: 1.72rem;
		}
	}
}
</style>