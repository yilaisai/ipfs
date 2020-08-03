<template>
	<van-tabbar v-model="active" active-color="#333333" route>
		<van-tabbar-item to="/home">
			<span>航海</span>
			<img
				slot="icon"
				slot-scope="props"
				:src="props.active ? './img/footerbar/home_active.png' : './img/footerbar/home.png'"
			>
		</van-tabbar-item>
		<van-tabbar-item to="/war">
			<span>舰队</span>
			<img
				slot="icon"
				slot-scope="props"
				:src="props.active ? './img/footerbar/zhanchang_active.png' : './img/footerbar/zhanchang.png'"
			>
		</van-tabbar-item>
		<van-tabbar-item to="/my">
			<span>我的</span>
			<img
				slot="icon"
				slot-scope="props"
				:src="props.active ? './img/footerbar/my_active.png' : './img/footerbar/my.png'"
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