<template>
	<div class="result_tips-page">
		<HeaderBar :title="pageInfo[$route.query.type].title"></HeaderBar>
		<div class="main">
			<img src="../../../public/img/success_icon1.png" alt="">
			<h2>{{pageInfo[$route.query.type].h2}}</h2>
			<p>{{pageInfo[$route.query.type].p}}</p>
			<van-button type="primary" size="large" @click="$router.replace(pageInfo[$route.query.type].path)">{{pageInfo[$route.query.type].button}}</van-button>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() { 
		return {
			pageInfo: {
				activateAccount: {
					title: '激活账户',
					h2: '恭喜勇士激活成功',
					p: '快去购买船只吧~',
					path: '/buyShip',
					button: '购买船只'
				},
				buyShip: {
					title: '购买船只',
					h2: '',
					p: '快去招募船员吧~',
					path: '/task',
					button: '招募船员'
				}
			}
		}
	},
	mounted() {
		this.pageInfo.buyShip.h2 = `恭喜您成为LV${this.$route.query.lv || ''}航海家！`
	},
	computed: {
		...mapState(['userInfo'])
	}
}
</script>

<style lang="less" scoped>
.result_tips-page{
	background-color: #fff;
	.main {
		text-align: center;
		img {
			display: block;
			width: 2.3rem;
			margin: .64rem auto 0;
		}
		h2 {
			font-size: .36rem;
			margin: .2rem 0 .3rem;
		}
		p {
			color: #999999;
			font-size: .3rem;
		}
		.van-button {
			display: block;
			width: 5rem;
			margin: .96rem auto 0;
		}
	}
}
</style>