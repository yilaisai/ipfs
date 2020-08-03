<template>
	<div class="invite-page">
		<HeaderBar title="邀请"></HeaderBar>
		<div class="main">
			<div class="qrImg">
				<vue-qr :text="registerPagePath" :margin="0"></vue-qr>
			</div>
			<p v-clipboard:copy="code" v-clipboard:success="onCopy" v-clipboard:error="onError">邀请码:{{code}}  <img src="../../../public/img/copy-icon02.png"></p>
			<div class="btn" @click="share" v-if="isInApp">分享二维码</div>
			<div
				class="btn"
				v-clipboard:copy="registerPagePath"
				v-clipboard:success="onCopy2"
				v-clipboard:error="onError2" 
				v-else>
				点击分享到微信
			</div>
			<!-- <div class="btn" v-else @click="$router.push('downloadInviteImg?save=1&code=' + code)">保存图片</div> -->
		</div>
		<van-dialog
			v-model="dialogShow"
			title="已复制到粘贴板"
			:showConfirmButton="false">
			<p>由于微信分享限制，请到微信上粘贴注册链接来分享</p>
			<a href="javascript:;" class="close" @click="dialogShow = false"></a>
			<a href="weixin://" class="gowx"><img src="../../../public/img/weixin_icon.png" alt="">去微信粘贴给好友</a>
		</van-dialog>
	</div>
</template>
<script>
import vueQr from 'vue-qr'
export default {
	components:{
		vueQr
	},
	data(){
		return {
			code: localStorage.getItem('inviteCode'),
			registerPagePath: 'https://web.supercards.io/#/register?code=' + localStorage.getItem('inviteCode'),
			isInApp: false,
			dialogShow: false
		}
	},
	mounted(){
		this.isInApp = window.isInAPP()
	},
	methods:{
		share() {
			window.app.shareCapture(JSON.stringify({
				webUrl: location.href + 'Share?code=' + this.code,
				code: this.registerPagePath
			}))
		},
		onCopy(){
			this.$toast('复制成功')
		},
		onError(err){
			this.$toast('复制失败，请手动复制')
		},
		onCopy2(){
			this.dialogShow = true
		},
		onError2(err){
			this.$toast('复制失败，请手动复制')
		}
	},
}
</script>
<style lang="less" scoped>
.invite-page{
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	// background: #0D0D0D url(../../../public/img/invite-bg.jpg) no-repeat center top;
	background-size: 100% 100%;
	.main{
		position: absolute;
		left: 0;
		bottom: 1rem;
		width: 100%;
		flex: 1;
		overflow: hidden;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		// padding-top: 6.89rem;
		box-sizing: border-box;
		.qrImg{
			width: 2rem;
			height: 2rem;
			background: #fff;
			border-radius: .04rem;
			padding: .08rem;
			margin: 0 auto;
			img{
				width: 100%;
			}
		}
		&>p{
			display: block;
			width: 2rem;
			height: .48rem;
			margin: 0 auto;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			color: #FFF200;
			font-size: .2rem;
			border-radius: .04rem;
			img{
				width: .2rem;
				height: .2rem;
				margin-left: .1rem;
			}
		}
		&>.btn{
			width: 6.7rem;
			height: .96rem;
			line-height: .96rem;
			text-align: center;
			color: #5A2708;
			font-size: .3rem;
			font-weight: 500;
			background: #FFF200;
			margin: 0 auto;
			margin-top: 3.17rem;
			border-radius: .48rem;
			font-weight: 700;
		}
	}
	.van-dialog {
		background-color: #FFFFFF;
		/deep/.van-dialog__header {
			color: #323232;
		}
		.van-dialog__content {
			p {
				background-color: #F0F0F0;
				margin-bottom: .3rem;
				font-size: .3rem;
				padding: .4rem .46rem;
				color: #323232;
			}
			.close {
				position: absolute;
				top: .15rem;
				right: .15rem;
				z-index: 1212;
				width: .5rem;
				height: .5rem;
				background: url(../../../public/img/close_icon.png) no-repeat center;
				background-size: 100% 100%;
			}
			.gowx {
				display: block;
				line-height: .8rem;
				width: 100%;
				color: #fff;
				text-align: center;
				margin-bottom: .3rem;
				background: linear-gradient(90deg,rgba(95,223,63,1) 0%,rgba(55,195,33,1) 100%);
				border-radius: .08rem;
				img {
					display: inline-block;
					vertical-align: sub;
					margin-right: .2rem;
					height: .38rem;
				}
			}
		}
	}
}
</style>