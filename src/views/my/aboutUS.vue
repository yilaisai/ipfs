<template>
	<div class="aboutus-page">
		<HeaderBar title="联系我们"></HeaderBar>
		<ul>
			<li>
				<span>Telegram</span>
				<i></i>
			</li>
			<li>
				<span>Twitter</span>
				<i></i>
			</li>
			<li>
				<span>微博</span>
				<i></i>
			</li>
			<li>
				<span>微信</span>
				<i></i>
			</li>
		</ul>
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
.aboutus-page{
	ul {
		padding: .4rem .2rem;
		li {
			display: flex;
			align-items: center;
			background-color: #FFF1D4;
			padding: .3rem;
			color: #641E18;
			border-radius: .08rem;
			margin-bottom: .1rem;
			img {
				width: .32rem;
			}
			span {
				flex: 1;
				font-size: .3rem;
			}
			i {
				width: .14rem;
				height: .24rem;
				background: url(../../../public/img/arrow_right.png) no-repeat center;
				background-size: 100% auto;
			}
		}
	}
}
</style>