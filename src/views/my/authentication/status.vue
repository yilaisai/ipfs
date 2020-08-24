<template>
	<div class="status-page">
		<HeaderBar title="实名认证"></HeaderBar>
		<div class="main">
			<div class="status">
				<label>实名认证</label>
				<span class="success" v-if="userInfo.auditStatus == 1">认证成功 <img src="../../../assets/img/my/status1.png" alt=""></span>
				<span class="failed" v-if="userInfo.auditStatus == 0">认证未通过 <img src="../../../assets/img/my/status2.png" alt=""></span>
			</div>
			<ul class="info" v-if="userInfo.auditStatus == 1">
				<li>
					<label>姓名</label>
					<span>{{userInfo.realName}}</span>
				</li>
				<li>
					<label>身份证号</label>
					<span>{{userInfo.cardNo}}</span>
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
				font-size: .24rem;
				img {
					width: .24rem;
					height: .24rem;
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
			padding: .4rem .4rem;
			background-color: #fff;
			li {
				display: flex;
				justify-content: space-between;
				margin-bottom: .4rem;
				label {
					color: #969696;
				}
				span {
					color: #323232;
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