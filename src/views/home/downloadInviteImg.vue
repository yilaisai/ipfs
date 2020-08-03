<template>
	<div class="page-wrap">
		<div class="invite-page" ref="page">
			<div class="main">
				<div class="qrImg">
					<vue-qr :text="registerPagePath" :margin="0"></vue-qr>
				</div>
				<p>扫码立即下载</p>
				<img class="share-text" src="../../../public/img/share_text.png" alt="">
			</div>
		</div>
		<canvas ref="canvas"></canvas>
		<img class="real_pic" :src="dataURL" alt="" ref="downloadImg" @load="saveImg">
		<a href="javascript:;" class="back" @click="$router.goBack(-1)"></a>
	</div>
	
</template>
<script>
import vueQr from 'vue-qr'
import html2canvas from 'html2canvas'
export default {
	components:{
		vueQr
	},
	data(){
		return {
			code: localStorage.getItem('inviteCode'),
			registerPagePath: 'https://web.supercards.io/#/register?code=' + this.$route.query.code,
			dataURL: ''
		}
	},
	mounted(){
		setTimeout(() => {
			this.toImage()
		}, 500)
	},
	methods:{
		share() {
			window.app.shareCapture(JSON.stringify({
				webUrl: ''
			}))
		},
		saveImg() {
			return
			var canvas = this.$refs.canvas
			var img = this.$refs.downloadImg
			var ctx = canvas.getContext('2d');
			var width = img.width
			var height = img.height
			let that = this
			
			canvas.width = width;
			canvas.height = height;
		
			ctx.drawImage(img, 0, 0, width, height);  // 将img中的数据绘制到canvas里
			saveImage(canvas, 'screen_' + new Date().getTime() + '.png');  // 存储图片到本地

			function saveImage (canvas, filename) {
				var image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
				that.saveFile(image, filename || 'file_' + new Date().getTime() + '.png');
			}
		},
		toImage() {
			html2canvas(this.$refs.page,{
				backgroundColor: null
			}).then((canvas) => {
				let dataURL = canvas.toDataURL("image/png");
				this.downLoadBase64(dataURL, 'shareimg')
				return
				this.dataURL = dataURL
			});
		},
		saveFile(data, filename) {
			const save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
			save_link.href = data;
			save_link.download = filename;
		
			const event = document.createEvent('MouseEvents');
			event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			save_link.dispatchEvent(event);
			this.$router.goBack(-1)
		},
		downLoadBase64(data, fileName) {  
			//创建后为空Bitmap对象,并定义id为 appQRCode  
			var that = this
			that.$toast(123)
			var bitmap = new plus.nativeObj.Bitmap("appQRCode");  
			bitmap.loadBase64Data(data, function(e) {  
				console.log("加载Base64图片数据成功");  
				that.$toast(111)
			}, function(e) {  
				that.$toast(222)
				console.log('加载Base64图片数据失败：' + JSON.stringify(e));  
			});  

			//如果传入文件名称为空，则直接设置APP名称为文件名称  
			if (fileName == undefined) {  
				fileName = plus.runtime.name;  
			}  

			fileName = fileName + ".png";  

			bitmap.save("_doc/img/" + fileName, {}, function(i) {  
				console.log('保存图片成功：' + JSON.stringify(i));  
				that.$toast(i.target)
				plus.share.sendWithSystem({type:'image',pictures: [i.target]}, function(){
					console.log('分享成功');

				}, function(e){
					that.$toast(555)
					console.log('分享失败：'+JSON.stringify(e));
				});
			}, function(e) {  
				that.$toast(444)
				console.log('保存图片失败：' + JSON.stringify(e));  
			});  
		}
	},
	watch:{

	},
	computed:{

	}
}
</script>
<style lang="less" scoped>
.page-wrap {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	.back {
		position: absolute;
		z-index: 201212;
		top: .4rem;
		left: .4rem;
		width: .6rem;
		height: .6rem;
		background: url(../../../public/img/close_icon.png) no-repeat center;
		background-size: 100% 100%;
	}
}
.real_pic {
	position: absolute;
	z-index: 1212;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}
.invite-page{
	position: relative;
	z-index: 1;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	// background: #0D0D0D url(../../../public/img/invite-bg.jpg) no-repeat center top;
	background-size: 100% 100%;
		.main{
			flex: 1;
			overflow: hidden;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			padding-top: 7.79rem;
			box-sizing: border-box;
			.qrImg{
				width: 2.2rem;
				height: 2.2rem;
				background: #fff;
				border-radius: .04rem;
				padding: .08rem;
				margin: 0 auto;
				img{
					width: 100%;
				}
			}
			&>p{
				color: #FFEB1D;
				text-align: center;
				font-size: .28rem;
				margin-top: .3rem;
			}
			&>.btn{
				width: 6.7rem;
				height: .96rem;
				line-height: .96rem;
				text-align: center;
				color: #fff;
				font-size: .3rem;
				font-weight: 500;
				background: #FF7F31;
				margin: 0 auto;
				margin-top: 1.17rem;
			}
			.share-text {
				display: block;
				margin: .9rem auto 0;
				width: 80%;
			}
		}
}
</style>