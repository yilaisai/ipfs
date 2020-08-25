<template>
	<van-tabbar v-model="active" active-color="#42C1CA" route>
		<van-tabbar-item to="/home">
			<span>首页</span>
			<img
				slot="icon"
				v-if="props.active"
				slot-scope="props"
				src="../../../../public/img/footerbar/home_active.png"
			>
			<img
				slot="icon"
				v-else
				slot-scope="props"
				src="../../../../public/img/footerbar/home.png"
			>
		</van-tabbar-item>
		<van-tabbar-item to="/war">
			<span>橱窗</span>
			<img
				slot="icon"
				v-if="props.active"
				slot-scope="props"
				src="../../../../public/img/footerbar/zhanchang_active.png"
			>
			<img
				slot="icon"
				v-else
				slot-scope="props"
				src="../../../../public/img/footerbar/zhanchang.png"
			>
		</van-tabbar-item>
		<van-tabbar-item to="/earnings">
			<span>挖矿收益</span>
			<img
				slot="icon"
				v-if="props.active"
				slot-scope="props"
				src="../../../../public/img/footerbar/earnings_active.png"
			>
			<img
				slot="icon"
				v-else
				slot-scope="props"
				src="../../../../public/img/footerbar/earnings.png"
			>
		</van-tabbar-item>
		<van-tabbar-item to="/my">
			<span>我的</span>
			<img
				slot="icon"
				v-if="props.active"
				slot-scope="props"
				src="../../../../public/img/footerbar/my_active.png"
			>
			<img
				slot="icon"
				v-else
				slot-scope="props"
				src="../../../../public/img/footerbar/my.png"
			>
		</van-tabbar-item>
	</van-tabbar>
</template>

<script>
export default {
	data() { 
		return {
			active: 0
		}
	}
}
</script>

<style lang="less" scoped>
.van-tabbar {
	background-color: #fff;
	box-shadow:0px -2px 7px 0px rgba(126,151,168,0.2);
	.van-tabbar-item {
		color: #C8C8C8;
	}
	img {
		height: .5rem;
	}
	&:after {
		display: none;
	}
}
</style>