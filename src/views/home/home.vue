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
						<van-swipe-item v-for="(item,index) in noticeList" :key="index" @click="$router.push('/noticeDetails?id=' + item.id)">{{item.title}}</van-swipe-item>
					</van-swipe>
				</van-notice-bar>
			</div>
			<ul class="info">
				<li @click="$router.push('/overView')">
					<span>{{height}}</span>
					<span>区块高度 <img src="../../assets/img/home/right.png" alt=""></span>
				</li>
				<li @click="$router.push('/overView')">
					<span>{{$changeToPiB(overview.totalQualityAdjPower) || 0}} PiB</span>
					<span>全网有效算力 <img src="../../assets/img/home/right.png" alt=""></span>
				</li>
				<li @click="$router.push('/overView')">
					<span>{{overview.activeMiners || 0}}</span>
					<span>活跃矿工数 <img src="../../assets/img/home/right.png" alt=""></span>
				</li>
			</ul>
			<ul class="list">
				<li v-for="(item,index) in list" :key="index" :class="{'ysq' : item.remainAmount <= 0}">
					<h2>{{item.name}}</h2>
					<p>
						<!-- <span>总云储力：{{$BigNumber(item.remainAmount).plus(item.saleAmount)}}T</span> -->
						<span v-if="item.remainAmount<=20">剩余云储力：{{item.remainAmount}}T</span>
						<span>合约期限：{{Math.floor(item.proTime / 30)}}个月</span>
					</p>
					<s>原价：{{item.orgPrice}} RMB/T</s>
					<h3>现价：{{item.price}} RMB/T</h3>
					<van-button type="primary" size="large" @click="clickHandler(item)">立即购买</van-button>
				</li>
			</ul>
			<Products />
			<PayPop :showDialog="showPop" @toggleShow="toggleShow" @getData="$router.go(-1)" :item="goods" />
		</div>
	</div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import { getBannersAndNotices, getMinePros } from '@/api/request'
import BannerSwiper from '@/components/common/bannerSwiper'
import Products from './components/products'
import PayPop from '../war/components/payPop'
import { $http } from '@/axios'
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
			bannerList: [],
			timer:null,
			showPop:false,
			goods:'',
		}
	},
	activated() {
		this.$store.dispatch('getUserInfo')
		this.getData()
		this.toggleShow(false)
		getBannersAndNotices().then(res => {
			this.bannerList = res.result.banners
			if(res.result.noticeInfos.length > 0) {
				this.noticeText = res.result.noticeInfos[0].content
				this.noticeList = res.result.noticeInfos
			}
		})
	},
	methods: {
		clickHandler(item) {
			if(item.remainAmount <= 0) {
				this.$toast('已售罄')
				return
			}
			this.goods = item
			this.showPop = true
			// this.$router.push({path: '/confirmOrder', query: {goods: item}})
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
		},
		toggleShow(val){
			this.showPop = val
		}
	},
	computed: {
		...mapState(['userInfo','overview','height'])
	},
	components: {
		BannerSwiper,
		Products,
		PayPop
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
		.info {
			width: 100%;
			background: #FFF;
			border-top:.01rem solid #E6E6E6;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: .1rem 0.15rem 0;
			box-sizing: border-box;
			li {
				flex:1;
				height:1.56rem;
				padding-top:.3rem;
				background: url(../../assets/img/bg/bg14.png) no-repeat top center;
				background-size: 100% 1.56rem;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				span {
					color:#FFF;
					&:first-of-type {
						margin-bottom:.2rem;
					}
					img {
						width:.08rem;
					}
				}
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
					min-height:1rem;
					background:rgba(241,244,247,1);
					border-radius:8px;
					padding: .2rem;
					margin: .2rem 0;
					color: #787878;
					font-size: .22rem;
					display: flex;
					flex-direction: column;
					justify-content: center;
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