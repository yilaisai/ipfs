<template>
	<div class="task_rule-page">
		<HeaderBar title="航海任务" color="transparent"></HeaderBar>
		<div class="main scroll-y">
			<p>星际云航海开放给所有用户，目的是让用户在航海的过程中通过招募船员获取收入，航海过程中不断升级解锁新船只，娱乐赚钱两不误：<br /><br />
				1、你的舰队成员包括：直邀好友、扩散好友（好友邀请的好友）。<br /><br />
				2、直邀好友购买船只：您将获得基础船只价格50%的奖励收入，等级越高，奖励收入比例越高，此收入会直接存入您的钱包，随时提现。<br /><br />
				3、扩散好友购买船只：您可以分得2%的奖励，此收入会直接存入您的钱包，随时提现。<br /><br />
				4、关于舰队收入：<br />
				（1）9级扩散好友购买船只：您最高将拿到基础船只价格30%的收入，若您的9级扩散好友的上级好友等级较高，则您的获得的比例会相应减少。<br />
				（2）该收入属于舰队收入，需要使用收益提取券才可以提现。<br /><br />
				5、关于升级<br />
				（1）升级船只（等级）需达到目标任务（有效直邀NT）<br />
				（2）每次升级需缴纳建材费，建材费为50USDT。<br /><br />
				等级说明：<br />
            </p>
			<table>
				<thead>
					<tr>
						<td>等级</td>
						<td>目标任务</td>
						<td>邀请收益</td>
						<td>舰队奖励</td>
						<td>团队奖励</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,key) in shipInfo" :key="key" v-if="item.roleId > 0">
						<td>Lv{{item.roleId}}</td>
						<td>{{item.inviteActiveNum}}</td>
						<td>{{$BigNumber(item.rate).times(100)}}%</td>
						<td>{{$BigNumber(item.teamRate).times(100)}}%</td>
						<td>20%</td>
					</tr>
				</tbody>
			</table>
			<p>6、若发现用户有恶意作弊行为，一律封禁账号并扣 除账户所有余额。<br /><br />
				7、收益下降的原因：一台手机开多个小号，使用多个手机开多个小号，使用按键精灵、外挂等作弊工具。<br /><br />
				名词解释：<br />
				1.基础船只价格：购买木筏的100USDT<br />
				2.9级扩散好友：您的直邀好友为1级好友，1级好友的直邀好友为您的2级扩散好友，以此类推。<br /><br />
				官方保留最终解释权，如有疑问请联系客服。<br /><br />
			</p>
		</div>
	</div>
</template>

<script>
import { boatInfo } from '@/api/request'
export default {
	data() { 
		return {
			shipInfo: []
		}
	},
	mounted() {
		boatInfo().then(res => {
			this.shipInfo = res.result
		})
	}
}
</script>

<style lang="less" scoped>
.task_rule-page{
	display: flex;
	flex-direction: column;
	background-color: #86CE60;
	color: #fff;
	.main {
		flex: 1;
		padding: .3rem;
		p {
			font-size: .32rem;
		}
		table {
			background-color: #ffffff;
			border-radius: .1rem;
			width: 100%;
			color: #333333;
			text-align: center;
			margin: .2rem 0 .7rem;
			font-size: .3rem;
			font-weight: 600;
			border-collapse: collapse;
			tr {
				height: .66rem;
				border: 1px solid #CCCCCC;
			}
		}
	}
}
</style>