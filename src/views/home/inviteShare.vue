<template>
	<div class="invite-page" ref="page">
		<div class="main">
			<!-- <img :src="dataURL" alt=""> -->
			<div class="swiper-container" id="share-swiper">
				<div class="swiper-wrapper">
					<div class="swiper-slide" ref="shareImg0">
						<img class="bg" src="../../../public/img/share/shareimg1.png" alt="">
						<div class="rank">
							<div>
								<p>第二名</p>
								<h4>286,348 <sub>T</sub></h4>
								<p>集群存力</p>
							</div>
							<div>
								<p>第一名</p>
								<h4>968,889 <sub>T</sub></h4>
								<p>集群存力</p>
							</div>
							<div>
								<p>第三名</p>
								<h4>198,893 <sub>T</sub></h4>
								<p>集群存力</p>
							</div>
						</div>
						<div class="content">
							<div class="flex-wrap">
								<div class="nickname">
									<h3><img class="avatar" :src="userInfo.iconUrl" alt=""> 一起挖矿  机会多多</h3>
									<p>邀请码 <a href="javascript:;">{{userInfo.inviteCode}}</a></p>
								</div>
								<vue-qr class="qrcode" :text="registerPagePath + userInfo.inviteCode" :margin="0"></vue-qr>
							</div>
						</div>
					</div>
					<!-- <div class="swiper-slide" ref="shareImg1">
						<img class="bg" src="../../../public/img/share/shareimg2.png" alt="">
						<div class="content">
							<div class="flex-wrap">
								<img class="avatar" :src="userInfo.iconUrl" alt="">
								<div class="nickname">
									<h3>HI~我是{{userInfo.nickName}}</h3>
									<p>跟我走吧</p>
									<p>我带你去浪漫的土耳其~</p>
								</div>
								<vue-qr class="qrcode" :text="registerPagePath + userInfo.inviteCode" :margin="0"></vue-qr>
							</div>
							<div class="invite_code">我的邀请码：{{userInfo.inviteCode}}</div>
						</div>
					</div> -->
				</div>
			</div>
		</div>
		<van-popup v-model="show" position="bottom" :closeable="true" :overlay="false">
			<ul v-show="!isLoading">
				<li @click="toImage('SHARE')">
					<img src="../../../public/img/share/share_icon.png" alt="">
					<span>分享</span>
				</li>
				<li @click="toImage('SAVE')">
					<img src="../../../public/img/share/save_icon.png" alt="">
					<span>保存</span>
				</li>
			</ul>
			<h3 v-show="isLoading">图片处理中，请稍等...</h3>
		</van-popup>
	</div>
</template>
<script>
import vueQr from 'vue-qr'
import html2canvas from 'html2canvas'
import { mapState } from 'vuex'
export default {
	components:{
		vueQr
	},
	data(){
		return {
			code: localStorage.getItem('inviteCode'),
			registerPagePath: window.INVITE_URL + '/#/login?type=register&code=',
			dataURL: '',
			active: 0,
			show: true,
			isLoading: false
		}
	},
	mounted(){
		var that = this
		var swiper1 = new Swiper('#share-swiper', {
			slidesPerView : 1.4,
			centeredSlides : true,
			spaceBetween : 10,
			on:{
				slideChange: function(){
					that.active =  this.activeIndex
				},
			},
		});
	},
	methods:{
		share(type) {
			window.app.shareCapture(JSON.stringify({
				webUrl: ''
			}))
		},
		toImage(type) {
			this.isLoading = true
			html2canvas(this.$refs['shareImg' + this.active],{
				backgroundColor: null,
				allowTaint: false,  // 不允许跨域图片污染画布
				useCORS: true    //允许加载
			}).then((canvas) => {
				let dataURL = canvas.toDataURL("image/png");
				this.dataURL = dataURL
				if(type == 'SHARE') {
					this.downLoadBase64(dataURL, 'shareimg' + new Date().getTime())
				}else {
					this.saveImg(dataURL, 'shareimg' + new Date().getTime())
				}
			}).catch(err => {
				console.log(err)
				this.isLoading = false
			});
		},
		downLoadBase64(data, fileName) {  
			//创建后为空Bitmap对象,并定义id为 shareImg  
			var that = this
			var bitmap = new plus.nativeObj.Bitmap("shareImg");  
			bitmap.loadBase64Data(data, function(e) {  
				console.log("加载Base64图片数据成功");  
			}, function(e) {  
				console.log('加载Base64图片数据失败：' + JSON.stringify(e));  
			});  
			//如果传入文件名称为空，则直接设置APP名称为文件名称  
			if (fileName == undefined) {  
				fileName = plus.runtime.name;  
			}  

			fileName = fileName + ".png";  

			bitmap.save("_doc/img/" + fileName, {}, function(i) {  
				console.log('保存图片成功：' + JSON.stringify(i));
				that.isLoading = false
				plus.share.sendWithSystem({type:'image',pictures: [i.target]}, function(){
					console.log('分享成功');
				}, function(e){
					console.log('分享失败：'+JSON.stringify(e));
				});
			}, function(e) {  
				console.log('保存图片失败：' + JSON.stringify(e));  
			});  
		},
		saveImg(data, fileName) {
			//创建后为空Bitmap对象,并定义id为 shareImg  
			var that = this
			var bitmap = new plus.nativeObj.Bitmap("shareImg");  
			bitmap.loadBase64Data(data, function(e) {  
				console.log("加载Base64图片数据成功");  
				that.isLoading = false
				fileName = fileName + ".png";  
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
		}
	},
	watch:{
		show(newVal, oldVal) {
			if(!newVal) {
				this.$router.goBack(-1)
			}
		}
	},
	computed:{
		...mapState(['userInfo'])
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			if(!window.plus) {
				vm.$dialog.confirm({
					message: '分享邀请好友功能需要下载APP进行操作？',
						confirmButtonText:'立即下载'
					}).then(() => {
						window.open('https://www.travel-around.world')
						vm.$router.goBack(-1)
					}).catch(() => {
						vm.$router.goBack(-1)
				})
			}
		})
	}
}
</script>
<style lang="less" scoped>
.invite-page{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background:rgba(0,0,0,.7);
	.main{
		flex: 1;
		overflow: hidden;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		box-sizing: border-box;
		.swiper-container {
			margin-top: .5rem;
			.swiper-wrapper {
				.swiper-slide {
					position: relative;
					width: 5.2rem;
					height: 9.2rem;
					.bg {
						display: block;
						width: 100%;
						height: 100%;
					}
					.content {
						position: absolute;
						bottom: .08rem;
						left: 3%;
						width: 94%;
						height: 1.7rem;
						.flex-wrap {
							display: flex;
							align-items: center;
							position: absolute;
							width: 100%;
							height: 100%;
							left: 0;
							bottom: 0;
							border-radius: 0px .18rem .18rem .18rem;
							padding: 0 .18rem;
							.avatar {
								width: .6rem;
								height: .6rem;
								border-radius: 50%;
							}
							.nickname {
								flex: 1;
								margin: 0 .4rem 0 0;
								font-size: .16rem;
								h3 {
									display: flex;
									align-items: center;
									img {
										margin-right: .1rem;
									}
								}
								p {
									font-size: .22rem;
									background-color: #F2F6FA;
									color: #000;
									font-size: .24rem;
									font-weight: bold;
									padding: .15rem;
									margin-top: .1rem;
									text-align: center;
									a {
										color: #000;
										margin-left: .2rem;
									}
								}
							}
							.qrcode {
								width: 1.2rem;
								height: 1.2rem;
							}
						}
						.invite_code {
							position: absolute;
							height: .45rem;
							left: 0;
							top: -.44rem;
							background:rgba(255,255,255,.9);
							border-radius: .18rem .18rem 0px 0px;
							font-weight: 600;
							padding: 0 .18rem;
							line-height: 0.65rem;
							font-size: .22rem;
						}
					}
					.rank {
						position: absolute;
						display: flex;
						align-items: flex-end;
						bottom: 1.8rem;
						left: 0;
						padding: 0 .2rem;
						width: 100%;
						div {
							display: inline-block;
							text-align: center;
							p {
								color: #007663;
								font-size: .18rem;
							}
							h4 {
								color: #fff;
								font-size: .2rem;
								margin: .1rem 0;
								sub {
									font-size: .12rem;
									vertical-align: baseline;
								}
							}
							&:nth-child(1) {
								width: 30%;
								padding-bottom: .3rem;
							}
							&:nth-child(2) {
								width: 40%;
								padding-bottom: .7rem;
							}
							&:nth-child(3) {
								width: 30%;
								padding-bottom: .2rem;
							}
						}
					}
				}
			}
		}
	}

	.van-popup {
		border-radius: .26rem .26rem 0px 0px;
		min-height: 2.8rem;
		ul {
			display: flex;
			justify-content: center;
			padding: .8rem 0 .4rem;
			li {
				text-align: center;
				margin: 0 .4rem;
				img {
					width: .96rem;
					height: .96rem;
					display: block;
				}
				span {
					display: block;
					font-size: .28rem;
					font-weight: 600;
					margin-top: .2rem;
				}
			}
		}
		h3 {
			text-align: center;
			font-size: .3rem;
			margin-top: 1rem;
		}
		/deep/.van-icon-cross {
			top: .1rem;
			right: .1rem;
			padding: .1rem;
		}
	}
}
</style>