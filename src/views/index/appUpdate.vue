<template>
	<div class="app_update-page">
		<img src="../../../public/img/coffee.svg" alt="">
		<van-progress :percentage="percentage" color="#00D983" />
		<p>{{tipsText}}</p>
		<p>{{kToM(downloadedSize)}}M/{{kToM(totalSize)}}M</p>
	</div>
</template>

<script>
export default {
	data() { 
		return {
			downloadedSize: 0,
			totalSize: 0,
			tipsText: '下载更新中,请勿退出程序...'
		}
	},
	mounted() {
		if(this.$route.query.type == 'apk') {
			this.createDownload(this.$route.query.downloadUrl)	
		}else if(this.$route.query.type == 'wgt') {
			this.createDownload(this.$route.query.downloadUrl)
		}else {
			this.$toast('处理失败')
		}
	},
	methods: {
		createDownload(url) {
			let dtask = plus.downloader.createDownload(url, {}, (d, status) => {
				// 下载完成
				if(status == 200){ 
					console.log("Download success: " + d.filename)
				} else {
					//下载失败
					this.$dialog.alert({
						title: '提示',
						message: '更新失败，请退出应用稍后再试！'
					}).then(() => {
						plus.runtime.quit()
					})
				}  
			});
			// 监听下载任务状态 
			dtask.addEventListener("statechanged", (download, status) => {
				this.downloadedSize = parseInt(download.downloadedSize / 1024)
				if(this.totalSize == 0) {								
					this.totalSize = parseInt(download.totalSize / 1024)
				}
				if(download.state == 4 && status == 200) {
					if(this.$route.query.type == 'apk') {
						// 安装应用
						plus.runtime.install(download.filename)
						plus.runtime.quit()
					}else {
						this.installWgt(download.filename)
					}
					
				}
			}, false)
			// 开始下载
			dtask.start()
		},
		kToM(val) {
			return this.$decimalNumber((val / 1024), 2)
		},
		installWgt(path){  
			let that = this
			// plus.nativeUI.showWaiting("安装wgt文件..."); 
			this.tipsText = "资源包解压安装中..."
			plus.runtime.install(path,{},function(){  
				// plus.nativeUI.closeWaiting();  
				that.tipsText = "应用资源更新完成"
				plus.nativeUI.alert("应用资源更新完成！",function(){  
					plus.runtime.restart();  
				});  
			},function(e){ 
				// plus.nativeUI.closeWaiting();  
				that.tipsText = "安装wgt文件失败["+e.code+"]："+e.message + '【' + path + '】'
				plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message); 
			})
		}
	},
	computed: {
		percentage() {
			if(this.downloadedSize <= 0 || this.totalSize <= 0) {
				return 0
			}
			return parseInt(this.downloadedSize / this.totalSize * 100)
		}
	}
}
</script>

<style lang="less" scoped>
.app_update-page{
	background-color: #fff;
	padding: .4rem 1rem;
	img {
		display: block;
		width: 2rem;
		margin: 2rem auto 0;
	}
	.van-progress {
		margin: .3rem 0;
	}
	p {
		text-align: center;
		font-size: .3rem;
		word-break: break-word;
	}
}
</style>