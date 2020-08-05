<template>
	<div class="swiper-container banner-swiper-cpt" ref="bannerSwiper">
		<div class="swiper-wrapper">
			<div class="swiper-slide">
				<a href="javascript:;">
					<img src="../../assets/img/banner.png" alt="">
				</a>
			</div>
			<div class="swiper-slide">
				<a href="javascript:;">
					<img src="../../assets/img/banner.png" alt="">
				</a>
			</div>
			<div class="swiper-slide">
				<a href="javascript:;">
					<img src="../../assets/img/banner.png" alt="">
				</a>
			</div>
		</div>
		<!-- 分页器 -->
		<div class="swiper-pagination"></div>
	</div>
</template>

<script>
export default {
	data() { 
		return {
			mySwiper: null
		}
	},
	mounted() {
		this.mySwiper = new Swiper (this.$refs.bannerSwiper, {
			slidesPerView: 1.1,
			spaceBetween: 10,
			centeredSlides: true,
			loop: true, // 循环模式选项
			// 分页器
			pagination: {
				el: '.swiper-pagination',
			}
		})        
	}
}
</script>

<style lang="less" scoped>
.banner-swiper-cpt{
	.swiper-wrapper {
		height: 2.4rem;
		.swiper-slide {
			display: -webkit-box;
			display: -ms-flexbox;
			display: -webkit-flex;
			display: flex;
			-webkit-box-pack: center;
			-ms-flex-pack: center;
			-webkit-justify-content: center;
			justify-content: center;
			-webkit-box-align: center;
			-ms-flex-align: center;
			-webkit-align-items: center;
			align-items: center;
			transition: all 300ms;
			height: 2rem;
			margin-top: .2rem;
			a {
				display: block;
				height: 100%;
				width: 100%;
				img {
					display: block;
					height: 100%;
					width: 100%;
				}
			}
			&.swiper-slide-active,&.swiper-slide-duplicate-active{
				height: 2.4rem;
				margin-top: 0;
			}
		}
	}
	/deep/.swiper-pagination {
		bottom: .05rem;
		.swiper-pagination-bullet {
			background-color: #C8C8C8;
			opacity: .8;
			width: .1rem;
			height: .1rem;
			&.swiper-pagination-bullet-active {
				background-color: #fff;
				opacity: 1;
			}
		}
		
	}
}
</style>