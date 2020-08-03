<template>
	<div class="index-page" :class="$route.name">
		<keep-alive>
			<router-view class="index-router-view"></router-view>
		</keep-alive>
		<FooterBar></FooterBar>
	</div>
</template>

<script>
import FooterBar from './components/footerbar'
export default {
	name: 'index',
	data() { 
		return {
			active: 0
		}
	},
	components: {
		FooterBar
	}
}
</script>

<style lang="less" scoped>
.index-page{
	.index-router-view {
		height: 100%;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		padding-bottom: 50px;
	}
	&.home {
		
	}
	&.war {
		
	}
	&.my {
		
	}
}
</style>