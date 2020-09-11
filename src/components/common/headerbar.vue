<template>
    <div class="com-header-bar" :class="[color, {'shadow':shadow}]">
        <a href="javascript:;" class="go-back" @click="goBack" v-if="back"></a>
        <h2>{{title}}</h2>
		<div class="other">
			<slot ></slot>
		</div>
    </div>
</template>

<script>
export default {
	props: {
		color: {
			default: '',
			type: String
		},
		title: {
			default: '',
			type: String
		},
		back: {
			default: true,
			type: Boolean
		},
		shadow: {
			default: false,
			type: Boolean
		},
	},
	data() {
		return {

		}
	},
	mounted() {
	},
	methods:{
		goBack(){
			this.$router.goBack(-1)
			this.$emit('goBack')
		}
	}
}
</script>

<style lang="less" scoped>
.com-header-bar {
	position: relative;
	z-index: 12;
	height: .9rem;
	line-height: .9rem;
	background-color: #FFFFFF;
	color: #333333;
	&.shadow {
		box-shadow:0px 0px 12px 0px rgba(236,236,236,1);
		&.black {
			box-shadow: 0 0 .1rem #000;
		}
	}
	.go-back {
		position: absolute;
		width: .9rem;
		height: .9rem;     
		top: 0;
		left: 0;
		background: url('../../../public/img/arrow_left.png') no-repeat center;
		background-size: 50%;   
	}
	.other {
		position: absolute;
		right: 0;
		top: 0;
		font-size: .24rem;
		height: .9rem;
		line-height: .9rem;
		padding: 0 .2rem;
		white-space: nowrap;
		img {
			display: inline-block;
			vertical-align: sub;
			height: .4rem;
			padding: 0 .1rem;
		}
	}
	h2 {
		font-size: .32rem;
		text-align: center;
		font-weight: 600;
		padding: 0 1rem;
		height: .9rem;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		text-overflow : ellipsis,;
	}
	&.black {
		background-color: #2E3742;
		color: #fff;
		.go-back {
			background-image: url('../../../public/img/arrow_left.png');
		}
	}
	&.transparent {
		background-color: transparent;
		color: #fff;
		.go-back {
			background-image: url('../../../public/img/arrow_left_white.png');
		}
	}
	&.red {
		background-color: rgba(181,43,20,.4);
		color: #fff;
		.other{
			color: #fff;
		}
	}
	&.key {
		background-color: #0A0927;
		color: #fff;
		.go-back {
			background-image: url('../../../public/img/arrow_left.png');
			background-size: .23rem .36rem;
		}
		.other{
			color: #fff;
		}
	}
	&.green {
		background-color:#2B9FA7;
		color:#FFF;
		.go-back {
			background-image: url('../../../public/img/arrow_left_white.png');
		}
	}
}
</style>
