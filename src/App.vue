<template>
	<div id="app">
		<transition :name="$store.state.transitionName">
			<keep-alive :include="keepAlive">
				<router-view class="child-view" />
			</keep-alive>
		</transition>
		<div class="loading" v-show="isShowLoading">
			<van-loading color="#178FE4"></van-loading>
		</div>
	</div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import { getVersionInfo } from '@/api/request' 
export default {
	data() {
		return {
			isQuit: false,
			isShowLoading: false,
			keepAlive: ['buyShip','index', 'login', 'goodsDetails'],
			websock:'',
			timer:null
		}
	},
	computed: {
		...mapState({
			dialogs: state => state.dialogs,
		})
	},
	mounted() {
		var that = this
		this.$store.dispatch('getUserInfo')

		this.$h5Plus.addBackbutton(() => {
			if(this.$route.meta.isRoot) {
				if(this.isQuit) {
					this.$h5Plus.quit()
				}else {
					this.$h5Plus.toast('再次点击退出应用')
					this.isQuit = true
					setTimeout(() => {
						this.isQuit = false
					}, 2000)
				}
			}else {
				this.$router.goBack(-1)
			}
		})
		if(window.plus) {
			that.getVersionInfo()
			plus.push.addEventListener('click', function(msg){
				// 分析msg.payload处理业务逻辑 
				alert( 'You clicked: ' + msg.content );
			}, false );
		} else {
			document.addEventListener('plusready', () => {
				that.getVersionInfo()
				plus.push.addEventListener('click', function(msg){
					// 分析msg.payload处理业务逻辑 
					alert( 'You clicked: ' + msg.content );
				}, false );
			}, false);
		}

		// this.getVersionInfo()

		this.$bus.$on('loading', (isShow) => {
			this.isShowLoading = isShow
		})

		this.intWebSocket()
	},
	methods: {
		...mapMutations(['setOverview','setHeight']),
		getVersionInfo() {
			try {
				var loading = plus.nativeUI.showWaiting("版本检测中...")
			} catch (error) {
				
			}
			getVersionInfo().then(res => {
				plus.nativeUI.closeWaiting()
				this.$h5Plus.appUpdataHandler(res.result, (type, url) => {
					switch(type) {
						case 'url':
							plus.runtime.openURL(url, () => {
								this.$taost.fail('开打链接失败！')
							})
							plus.nativeUI.showWaiting("请更新版本", {
								modal: true
							})
						break;
						case 'apk':
							this.$router.push('/appUpdate?type=apk&downloadUrl=' + url)
						break;
						case 'wgt':
							this.$router.push('/appUpdate?type=wgt&downloadUrl=' + url)
						break;
						default:
						break;
					}
				})
			}).catch(err => {
				// loading.setTitle('网络异常，请检查网络')
				plus.nativeUI.closeWaiting()
			})
		},
		intWebSocket(){
			if ("WebSocket" in window){
				this.websock = new WebSocket(`wss://filfox.info/socket.io/?EIO=3&transport=websocket`)
				this.websock.onopen = this.webSocketonopen;
				this.websock.onmessage = this.webSocketonmessage;
				this.websock.onclose = this.webSocketonclose;
				this.websock.onerror = this.webSocketonerror;
			} else {
				console.log('您的浏览器不支持websocket,请升级浏览器！')
			}
		},
		webSocketonopen(ws){
			console.log('Websock已连接...')
			if(this.timer) clearInterval(this.timer)
			this.websock.send(2)
			this.timer = setInterval(()=>{
				this.websock.send(2)
			},25000)
			this.websock.send(42+JSON.stringify(["subscribe","blockchain"]));
			this.websock.send(42+JSON.stringify(["subscribe","account"]));
			this.websock.send(42+JSON.stringify(["subscribe","tipset"]));
		},
		webSocketonmessage(e){
			if(e.data.slice(0,2) == '42') {
				let data = JSON.parse(e.data.slice(2))
				if (data && data[0] == "blockchain/overview") {
					this.setOverview(data[1])
				} else if(!(data[1] instanceof Array)) {
					this.setHeight(data[1].height)
				}
			}
		},
		webSocketonclose(e){
			console.log('websocket关闭重连')
			console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
			setTimeout(()=>{this.intWebSocket()},1000)
		},
		webSocketonerror(){
			console.log('websocket链接异常！')
		},
	}
}
</script>


<style lang="less">
#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background-color: #F6F6F6;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	.child-view {
		position: absolute;
		top: 0;
		left: 0;
		width:100%;
		height: 100%;
		transition: all .4s cubic-bezier(.55,0,.1,1);
	}
	&>.loading{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(255, 255, 255, 0);
		z-index: 100000000000;
		/deep/.van-loading{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		.van-loading__spinner{
			width: .4rem;
			height: .4rem;
		}
		.van-loading__text{
			color: #178FE4;
			font-size: .28rem;
		}
    }
  }
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(1rem, 0);
  transform: translate(1rem, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-1rem, 0);
  transform: translate(-1rem, 0);
}

</style>
