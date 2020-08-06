<template>
	<div class="transfer-select-page">
		<HeaderBar title="存力转移" :shadow="true"></HeaderBar>
		<div class="main">
			<h2>选择需要转移的合约</h2>
			<div class="select-wrap">
				<select v-model="selected">
					<option v-for="(item,index) in list" :key="index" :value="item">{{item.name}}</option>
				</select>
			</div>
			<div class="flex-wrap" v-if="selected">
				<div>
					<span>{{selected.isActive == 0 ? selected.tamount : 0}} T</span>
					<label>未激活</label>
				</div>
				<div>
					<span>{{selected.isActive == 1 ? selected.tamount : 0}} T</span>
					<label>已激活</label>
				</div>
			</div>
			<van-button type="primary" size="large" @click="clickHandler">下一步</van-button>
		</div>
	</div>
</template>

<script>
import { getMyMinePro } from '@/api/request'
export default {
	data() { 
		return {
			list: [],
			selected: null
		}
	},
	mounted() {
		getMyMinePro().then(res => {
			this.list = res.result.list
			this.selected = this.list[0]
		})
	},
	methods: {
		clickHandler() {
			this.$router.push({
				path: '/hashrateTransfer',
				query: this.selected
			})
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