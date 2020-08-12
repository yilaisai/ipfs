<template>
	<div class="home-page">
		<div class="main">
			<div class="banner">
				<img class="logo" src="../../assets/img/logo.png" alt="">
				<BannerSwiper :list="bannerList" />
				<!-- 滚动公告 -->
				<van-notice-bar :scrollable="false">
					<img slot="left-icon" src="../../../public/img/home/broadcast_icon.png" alt="">
					<van-swipe
						vertical
						class="notice-swipe"
						:autoplay="3000"
						:show-indicators="false"
					>
						<van-swipe-item v-for="(item,index) in noticeList" :key="index">{{item.content}}</van-swipe-item>
					</van-swipe>
				</van-notice-bar>
			</div>
			<ul class="list">
				<li v-for="(item,index) in list" :key="index">
					<h2>{{item.name}}</h2>
					<p>
						<span>总云储力：{{$BigNumber(item.remainAmount).plus(item.saleAmount)}}T</span>
						<span>剩余云储力：{{item.remainAmount}}T</span>
						<span>合约期限：{{item.proTime}}个月</span>
					</p>
					<s>原价：{{item.orgPrice}} RMB/T</s>
					<h3>现价：{{item.price}} RMB/T</h3>
					<van-button type="primary" size="large" @click="$router.push({path: '/confirmOrder', query: {goods: item}})">立即购买</van-button>
				</li>
			</ul>
			<Products />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { getBannersAndNotices, getMinePros } from '@/api/request'
import BannerSwiper from '@/components/common/bannerSwiper'
import Products from './components/products'
export default {
	data() { 
		return {
			dialogShow: false,
			pageNum: 1,
			list: [],
			loading: false, //是否在加载中
			finished: false, //是否加载完所有数据
			noticeText: '',
			noticeList: [],
			noticeId: '',
			totalReadNotice: 0,
			totalNotice: 0,
			bannerList: []
		}
	},
	activated() {
		this.$store.dispatch('getUserInfo')
		this.getData()
		getBannersAndNotices().then(res => {
			console.log(res)
			this.bannerList = res.result.banners
			if(res.result.noticeInfos.length > 0) {
				this.noticeText = res.result.noticeInfos[0].content
				this.noticeList = res.result.noticeInfos
			}
		})
	},
	methods: {
		clickHandler() {
			if(this.userInfo.isActive == 0) {
				this.$dialog.confirm({
					message: '您的账户还未激活，是否立即激活？',
						confirmButtonText:'去激活'
					}).then(() => {
						this.$router.push('/activateAccount')
					}).catch(() => {
				})
			}else {
				if(this.userInfo.roleId <= 0) {
					this.$dialog.confirm({
						message: '您还未购买船只，是否前去购买？',
							confirmButtonText:'去购买'
						}).then(() => {
							this.$router.push('/buyShip')
						}).catch(() => {
						// on cancel
					});
				}else {
					this.$router.push('/inviteShare')
				}
			}
		},
		pay() {
			this.$router.push('/confirmOrder')
		},
		getData() {
			getMinePros().then(res => {
				res.result.list.map(val => {
					val.buyAmount = 1
				})
				this.list = res.result.list
			})
		}
	},
	computed: {
		...mapState(['userInfo'])
	},
	components: {
		BannerSwiper,
		Products
	}
}
</script>

<style lang="less" scoped>
.home-page{
	.main {
		position: relative;
		overflow: hidden;
		.banner {
			background: #fff url(../../assets/img/bg/bg4.png) no-repeat top center;
			background-size: 100% 2.77rem;
			overflow: hidden;
			.logo {
				display: block;
				height: .6rem;
				margin: .2rem auto;
			}
		}
		.van-notice-bar {
			position: relative;
			z-index: 12;
			width: 88%;
			background: #fff;
			margin: .2rem auto;
			height: .6rem;
			padding: 0;
			color: #000000;
			img {
				width: .3rem;
				height: .3rem;
				margin-right: .1rem;
			}
			.notice-swipe {
				height: .6rem;
				line-height: .6rem;
				/deep/.van-swipe-item {
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}
		.list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0 .3rem;
			li {
				position: relative;
				width: 3.35rem;
				background: #fff url(../../assets/img/bg/bg6.png) no-repeat top right;
				background-size: 1rem 1rem;
				margin-top: .3rem;
				box-shadow: 4px 12px 30px -12px rgba(220,220,220,0.8);
				padding: .4rem;
				p {
					background:rgba(241,244,247,1);
					border-radius:8px;
					padding: .2rem;
					margin: .2rem 0;
					color: #787878;
					font-size: .22rem;
					span {
						display: block;
					}
				}
				s {
					font-size: .2rem;
					color: #AAAAAA;
				}
				h2 {
					width: 2rem;
					word-break: break-all;
				}
				h3 {
					color: #FA6400;
					font-size: .24rem;
				}
				.van-button {
					height: .66rem;
					background-color: #FA6400;
					border: 1px solid #FA6400;
					font-size: .26rem;
					margin-top: .2rem;
				}
				&.ysq {
					&::after {
						content: '';
						position: absolute;
						top: 1.4rem;
						right: .1rem;
						width: 1.2rem;
						height: 1rem;
						background: url(../../assets/img/ysq.png) no-repeat center;
						background-size: 100% 100%;
					}
				}
			}
		}
	}
	
	.van-dialog {
		.van-dialog__content {
			p {
				margin-bottom: .3rem;
				font-size: .3rem;
			}
			.close {
				position: absolute;
				top: .15rem;
				right: .15rem;
				z-index: 1212;
				width: .5rem;
				height: .5rem;
				background: url(../../../public/img/close_icon.png) no-repeat center;
				background-size: 100% 100%;
			}
		}
	}
}
</style>