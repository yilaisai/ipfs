<template>
	<div class="hashrate-page">
		<HeaderBar title="我的存力"></HeaderBar>
		<div class="main scroll-y">
			<div class="summary">
				<div class="balance">
					<h3>总算力</h3>
					<h2>2,200 <sub>T</sub></h2>
					<div class="flex-wrap">
						<div>
							<span>1,000 <sub>T</sub></span>
							<label>未激活</label>
						</div>
						<div>
							<span>1,000 <sub>T</sub></span>
							<label>已激活</label>
						</div>
					</div>
				</div>
				<div class="btn-wrap">
					<van-button type="primary" size="large" @click="clickHandler">转移</van-button>
				</div>
			</div>
			<div class="list">
				<h2>我的合约</h2>
				<ul>
					<li class="head">
						<span>合约名称</span>
						<span>合约编号</span>
						<span>持有算力 (T)</span>
						<span>已激活算力(T)</span>
						<span>未激活算力(T)</span>
					</li>
					<li v-for="(item,index) in 5" :key="index">
						<span>F3+</span>
						<span>1000</span>
						<span>1000</span>
						<span>1000</span>
						<span>1000</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() { 
		return {

		}
	},
	methods: {
		clickHandler() {
			this.$router.push('/transferSelect')
		}
	}
}
</script>

<style lang="less" scoped>
.hashrate-page{
	display: flex;
	flex-direction: column;
	.com-header-bar {
		background-color: #42C1CA;
		color: #fff;
		/deep/.go-back {
			background: url('../../../../public/img/arrow_left_white.png') no-repeat center;
			background-size: 50%;  
		}
	}
	.main {
		flex: 1;
	}
	.summary {
		position: relative;
		background-color: #42C1CA;
		padding: 1.4rem 0 0;
		.balance {
			position: absolute;
			background: url('../../../assets/img/bg/bg1.png') no-repeat center;
			background-size: 100% 100%;  
			width: 86%;
			left: 7%;
			top: .4rem;
			color: #fff;
			padding: .5rem;
			h3 {
				font-size: .32rem;
				font-weight: 400;
			}
			h2 {
				font-size: .64rem;
				text-align: center;
				sub {
					vertical-align: baseline;
					font-size: .32rem;
				}
			}
			.flex-wrap {
				display: flex;
				margin-top: .4rem;
				div {
					flex: 1;
					text-align: center;
					&:first-child {
						border-right: 2px solid rgba(255,239,234,.6);
					}
					span {
						display: block;
						font-weight: bold;
						font-size: .48rem;
						sub {
							vertical-align: baseline;
							font-size: .24rem;
							font-weight: 400;
						}
					}
					label {
						font-size: .24rem;
					}
				}
			}
		}
		.btn-wrap {
			background:rgba(255,255,255,1);
			border-radius:.32rem .32rem 0px 0px;
			padding: 3rem .5rem .6rem;
		}
	}
	.list {
		background-color: #fff;
		margin: .2rem 0 0;
		padding: 0 .2rem .4rem;
		h2 {
			color: #000;
			font-size: .36rem;
			padding: .4rem 0;
			text-align: center;
			line-height: .36rem;
		}
		ul {
			background-color: #F6F9FC;
			border-radius: .12rem;
			li {
				display: flex;
				border-bottom: 1px solid #D4E2F5;
				font-size: .2rem;
				&:last-child {
					border: none;
				}
				&.head {
					font-size: .2rem;
					color: #323232;
					font-weight: 600;
					span {
						padding: .28rem 0;
					}
				}
				span {
					flex: 1;
					text-align: center;
					padding: .25rem 0;
					border-right: 1px solid #D4E2F5;
					&:nth-child(1) {
						width: 1.1rem;
						flex: none;
					}
					&:nth-child(2) {
						width: 1.1rem;
						flex: none;
					}
					&:last-child {
						border-right: none;
					}
				}
			}
		}
	}
}
</style>