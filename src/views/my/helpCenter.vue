<template>
	<div class="helpcenter-page">
		<HeaderBar title="帮助中心"></HeaderBar>
		<div class="main scroll-y">
			<van-collapse v-model="activeNames" accordion>
				<van-collapse-item title="什么是有效好友?" name="1">有效好友是指：好友激活账户并且购买基础船只。</van-collapse-item>
				<van-collapse-item title="可以补填有效码吗？" name="2">不可以。</van-collapse-item>
				<van-collapse-item title="奖池入场券如何获取？" name="3">1.邀请一位有效好友可以获得一张奖池入场券。<br />2.可以通过购买获得奖池入场券。</van-collapse-item>
				<van-collapse-item title="船只如何升级？" name="4">当您完成当前等级任务后，缴纳升级费用即可升级船只。</van-collapse-item>
				<van-collapse-item title="如何下载APP？" name="5">
					打开官网进行下载<br /><a href="javascript:;" @click="openUrl('https://www.travel-around.world')">https://www.travel-around.world</a><br />
					想要了解更多资料及教程？<br />
					关注下方微信公众号<br />
					<img class="wxgzh" ref="wxgzh" src="../../../public/img/wxgzh.png" alt=""><br />
					<button v-if="isPlus" class="saveimg" @click="saveimg">保存二维码</button>
				</van-collapse-item>
				<van-collapse-item title="如何使用火币APP买卖虚拟货币？" name="6">
					下载火币APP<br /><a href="javascript:;" @click="openUrl('https://m.huobi.me/zh-cn/download')">https://m.huobi.me/zh-cn/download</a><br /><br />
					视频教程1：<br />
					<video src="https://web.travel-around.world/video/IMG_3463.mp4" width="100%" controls="controls">Your browser does not support the video tag.</video>
					视频教程2：<br />
					<video src="https://web.travel-around.world/video/IMG_3464.mp4" width="100%" controls="controls">Your browser does not support the video tag.</video>
					视频教程3：<br />
					<video src="https://web.travel-around.world/video/IMG_3465.mp4" width="100%" controls="controls">Your browser does not support the video tag.</video>
				</van-collapse-item>
			</van-collapse>
		</div>
	</div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
	data() { 
		return {
			activeNames: "",
			isPlus: false
		}
	},
	mounted() {
		if(window.plus) {
			this.isPlus = true
		}
	},
	methods: {
		openUrl(url) {
			this.$h5Plus.openURL(url)
		},
		saveimg() {
			html2canvas(this.$refs.wxgzh,{
				backgroundColor: null,
				allowTaint: false,  // 不允许跨域图片污染画布
				useCORS: true    //允许加载
			}).then((canvas) => {
				let dataURL = canvas.toDataURL("image/png");
				this.dataURL = dataURL
				var that = this
				var bitmap = new plus.nativeObj.Bitmap("shareImg");  
				bitmap.loadBase64Data(dataURL, function(e) {  
					console.log("加载Base64图片数据成功");  
					that.isLoading = false
					let fileName = 'wxgzh' + new Date().getTime() + ".png"
					bitmap.save("_doc/img/" + fileName, {}, function(i) {  
						console.log('保存图片成功：' + JSON.stringify(i));  
						plus.gallery.save( i.target, function () {
							that.$toast.success('图片已保存到相册')
						});
					}, function(e) {  
						that.isLoading = false
						console.log('保存图片失败：' + JSON.stringify(e));  
					});  
				}, function(e) {  
					that.isLoading = false
					console.log('加载Base64图片数据失败：' + JSON.stringify(e));  
				});  
			}).catch(err => {
				console.log(err)
			})
		}
	}
}
</script>

<style lang="less" scoped>
.helpcenter-page{
	display: flex;
	flex-direction: column;
	.main {
		flex: 1;
		padding: .2rem;
		.van-collapse {
			border-radius: .08rem;
			overflow: hidden;
			/deep/.van-collapse-item__content {
				word-break: break-all;
				a {
					text-decoration: underline;
				}
				.wxgzh {
					width: 3rem;
				}
				.saveimg {
					margin-left: .2rem;
				}
			}
		}
	}
}
</style>