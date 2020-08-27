<template>
	<div class="setting-page">
		<HeaderBar title="设置"></HeaderBar>
		<div class="main">
			<van-cell-group>
				<van-cell title="头像" is-link to="/editAvatar">
					<template #right-icon>
						<img class="user-logo" :src="userInfo.iconUrl" alt="">
					</template>
				</van-cell>
				<van-cell title="昵称" is-link :value="userInfo.nickName" to="/userinfo" />
				<van-cell title="手机号" :value="userInfo.phone + '（已绑定）'" />
				<!-- <van-cell title="身份认证" is-link value="未认证" /> -->
				<van-cell title="登录密码" is-link value="修改" to="/updateLoginPwd" />
				<van-cell title="资金密码" is-link :value="userInfo.isSetFundPwd == 0 ? '未设置' : '修改'" to="/updateFundsPwd" />
				<!-- <van-cell title="开启音效" is-link>
					<template #right-icon>
						<van-switch v-model="checked" active-color="#00D984" size="24px" />
					</template>
				</van-cell> -->
				<van-cell title="版本号" v-if="version" :value="version" />
			</van-cell-group>
			<button class="logout" @click="logout">退出登录</button>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() { 
		return {
			checked: true,
			version: false
		}
	},
	mounted() {
		this.$h5Plus.getAppVersion().then(res => {
			this.version = res
		}).catch(err => {
			this.version = window.H5_VERSION + '(H5)'
		})
	},
	methods: {
		logout() {
			this.$dialog.confirm({
				title: '提示',
				message: '确定要退出登录？'
			}).then(() => {
				// on confirm
				localStorage.clear()
				this.$router.replace('/login')
			}).catch(() => {
				// on cancel
			})
		}
	},
	computed: {
		...mapState(['userInfo'])
	}
}
</script>

<style lang="less" scoped>
.setting-page{
	.main {
		padding: .4rem .2rem;
		.van-cell-group {
			border-radius: .2rem;
			overflow: hidden;
			.van-cell {
				line-height: .8rem;
				align-items: center;
				.user-logo {
					width: .6rem;
					height: .6rem;
					border-radius: 50%;
				}
			}
		}
		.logout {
			display: block;
			color: #F42E14;
			font-size: .32rem;
			width: 100%;
			height: 1.2rem;
			background:rgba(255,255,255,1);
			border-radius: .26rem;
			margin-top: .4rem;
		}
	}
}
</style>