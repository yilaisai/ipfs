<template>
	<div class="status-page">
		<HeaderBar title="身份认证" :shadow="true"></HeaderBar>
		<div class="main">
			<div class="status">
				<label>身份认证</label>
				<span class="success" v-if="userInfo.auditStatus == 1"><img src="../../../assets/img/my/status1.svg" alt=""><i>认证成功</i></span>
				<span class="failed" v-else><img src="../../../assets/img/my/status2.svg" alt=""> <i>认证未通过</i></span>
			</div>
			<ul class="info" v-if="userInfo.auditStatus == 1">
				<li>
					<label>姓名</label>
					<span>{{userInfo.realName || '天天'}}</span>
				</li>
				<li>
					<label>身份证号</label>
					<span>{{userInfo.cardNo || "360681199900317012"}}</span>
				</li>
			</ul>
			<p v-if="userInfo.auditStatus == 0" class="reason">原因：{{userInfo.reason.split("|")[0]}} <br />{{userInfo.reason.split("|")[1]}}<br />{{userInfo.reason.split("|")[2]}}</p>
			<button v-if="userInfo.auditStatus == 0" class="full scale" @click="$router.push('/auth1')">重新认证</button>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
	data() { 
		return {

		}
	},
	computed: {
		...mapState(['userInfo'])
	}
}
</script>

<style lang="less" scoped>
.status-page{
	background-color: #F6F9FC;
	.main {
		
		.status {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #E6E6E6;
			padding: .45rem .4rem;
			background-color: #fff;
			label {
				color: #323232;
				font-size: .3rem;
				font-weight: 600;
			}
			span {
				font-size: .28rem;
				line-height: 1em;
				display: flex;
				align-items: center;
				img {
					width: .28rem;
					height: .28rem;
					margin-right:.1rem;
				}
				i {
					font-style: normal;
				}
				&.success {
					color: #09BB07;
				}
				&.failed {
					color: #C83C3C;
				}
			}
		}
		.info {
			font-size: .28rem;
			padding: .6rem .4rem;
			background-color: #fff;
			li {
				display: flex;
				justify-content: space-between;
				margin-bottom: .6rem;
				label {
					color: #646464;
				}
				span {
					color: #000;
				}
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
		.reason {
			padding: .7rem .4rem;
			color: #C83C3C;
			font-size: .28rem;
			background-color: #fff;
		}
		button {
			display: block;
			width: 90%;
			margin: 1rem auto 0;
		}
	}
}
</style>