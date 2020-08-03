<template>
	<div class="team_earnings_extract-page">
		<HeaderBar title="资金划转"></HeaderBar>
		<div class="main">
			<div class="summary">
				<div class="content">
					<h3>{{userInfo.teamInviteReward}} <sub>USDT</sub></h3>
					<p><span>舰队收益</span><i>|</i><span>最多可用：{{userInfo.withdrawTicket}}张</span></p>
				</div>
			</div>
			<div class="extract">
				<h2>提取</h2>
				<ul>
					<li :class="{'active' : active == item}" v-for="(item, key) in 4" :key="key" @click="active = item">
						<span>{{item}}张</span>
						<label>{{userInfo.withdrawAmount * item}} USDT</label>
					</li>
				</ul>
				<input type="number" v-model.trim.number="active" placeholder="自定义数量">
				<p>舰队收益不满{{userInfo.withdrawAmount}}USDT不可以使用收益提现券哦！</p>
				<van-button type="primary" size="large" @click="clickHandler">提取</van-button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { withdrawTicket } from '@/api/request'
export default {
	data() { 
		return {
			active: '',
		}
	},
	methods: {
		clickHandler() {
			if(this.active == '') {
				this.$toast('请输入提取数量')
				return
			}
			this.$dialog.confirm({
				title: '确认提取？',
				message: `提取数量：${this.userInfo.withdrawAmount * this.active}USDT <br/>收益提取券: ${this.active}张`
			}).then(() => {
				this.$bus.$emit('loading', true)
				withdrawTicket({
					num: this.active
				}).then(res => {
					this.$bus.$emit('loading', false)
					this.$toast.success(res.msg)
					this.$router.goBack(-1)
				}).catch(err => {
					this.$bus.$emit('loading', false)
				})
			}).catch(() => {})
		}
	},
	computed: {
		...mapState(['userInfo'])
	}
}
</script>

<style lang="less" scoped>
.team_earnings_extract-page{
	display: flex;
	flex-direction: column;
	.main {
		flex: 1;
		background-color: #fff;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}
	.summary {
		background-color: #F6F6F6;
		overflow: hidden;
		.content {
			background: linear-gradient(-29deg,rgba(0,217,132,1) 0%,rgba(14,216,171,1) 100%);
			border-radius: .26rem;
			margin: .4rem .3rem;
			color: #fff;
			padding: .8rem .3rem;
			h3 {
				font-size: .6rem;
				sub {
					font-size: .36rem;
					vertical-align: baseline;
					font-weight: 400;
				}
			}
			p {
				font-size: .28rem;
				margin-top: .3rem;
				i {
					font-style: normal;
					margin: 0 .2rem;
				}
			}
		}
	}
	.extract {
		padding: 0 .3rem .3rem;
		h2 {
			position: relative;
			margin: .3rem 0 .1rem;
			padding-left: .15rem;
			font-size: .34rem;
			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 0.06rem;
				width: .04rem;
				height: .3rem;
				background-color: #00D984;
				vertical-align: middle;
				border-radius: .02rem;
			}
		}
		ul {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			li {
				width: 48%;
				margin-top: .3rem;
				background-color: #F3F5F6;
				text-align: center;
				border-radius: .08rem;
				padding: .4rem 0;
				border: 1px solid #F3F5F6;
				&.active {
					border: 1px solid #00D984;
					background-color: #fff;
				}
				span {
					display: block;
					font-size: .36rem;
					font-weight: 600;
				}
				label {
					font-size: .28rem;
					color: #999999;
				}
			}
		}
		input {
			height: 1.4rem;
			display: block;
			width: 100%;
			background-color: #F3F5F6;
			margin-top: .3rem;
			color: #333333;
			font-size: .32rem;
			text-align: center;
			border-radius: .08rem;
			&::-webkit-input-placeholder {
				color: #333333 !important;
			}
		}
		p {
			color: #999999;
			margin: .2rem 0 .35rem;
		}
	}
}
</style>