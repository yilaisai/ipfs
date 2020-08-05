<template>
	<div class="transfer-select-page">
		<HeaderBar title="存力转移" :shadow="true"></HeaderBar>
		<div class="main">
			<h2>选择需要转移的合约</h2>
			<div class="select-wrap">
				<select>
					<option value="F3">F3</option>
				</select>
			</div>
			<div class="flex-wrap">
				<div>
					<span>1000 T</span>
					<label>未激活</label>
				</div>
				<div>
					<span>1000 T</span>
					<label>已激活</label>
				</div>
			</div>
			<van-button type="primary" size="large" @click="clickHandler">下一步</van-button>
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
			this.$router.push('/hashrateTransfer')
		}
	}
}
</script>

<style lang="less" scoped>
.transfer-select-page{
	background-color: #fff;
	.main {
		padding: 0 .5rem;
		h2 {
			font-size: .28rem;
			font-weight: 400;
			margin-top: .5rem;
		}
		.select-wrap {
			background-color: #F6F9FC;
			height: .96rem;
			margin: .2rem 0 .4rem;
			border-radius: .12rem;
			padding: 0 .2rem;
			select {
				width: 100%;
				height: 100%;
				background-color: transparent;
				font-size: .32rem;
				font-weight: 600;
			}
		}
		.flex-wrap {
			display: flex;
			margin: 0 0 .8rem 0;
			div {
				flex: 1;
				background: url(../../../assets/img/bg/bg2.png) no-repeat center;
				background-size: 100% 100%;
				padding: .32rem;
				border-radius: .12rem;
				color: #fff;
				span {
					display: block;
					font-size: .32rem;
					font-weight: 600;
				}
				label {
					display: block;
					margin: 0 0 .4rem 0;
					font-size: .24rem;
				}
				&:first-child {
					margin-right: .2rem;
					background: url(../../../assets/img/bg/bg3.png) no-repeat center;
					background-size: 100% 100%;
				}
			}
		}
	}
}
</style>