/**
 * html5+ 硬件扩展api
 */
const h5Plus = {
	//设置状态栏背景色
	setStatusBarBackground(color) {
		try {
			plus.navigator.setStatusBarBackground(color)
		} catch (error) {
			
		}
	},
	//设置状态栏样式
	setStatusBarStyle(color) {
		try {
			plus.navigator.setStatusBarStyle(color)
		} catch (error) {
			
		}
	},
	// 添加返回键操作
	addBackbutton(callback) {
		try {
			if(window.plus) {
				plus.key.addEventListener("backbutton",function(e){
					callback()
				},false);
			} else {
				document.addEventListener('plusready', () => {
					plus.key.addEventListener("backbutton",function(e){
						callback()
					},false);
				}, false);
			}
		} catch (error) {
		}
	},
	// 系统提示框
	toast(text) {
		try {
			plus.nativeUI.toast(text)
		} catch (error) {
			
		}
	},
	showWaiting() {
		var w = plus.nativeUI.showWaiting("等待中...");
	},
	//退出应用
	quit() {
		try {
			plus.runtime.quit()
		} catch (error) {
			
		}
	},
	//检测升级检测
	appUpdataHandler(payload, callback) {
		this.getAppVersion().then(res => {
			const osName = plus.os.name
			let versionArr = []
			if(osName == 'iOS') {
				versionArr = payload.iosVersion.split('.')
			}else {
				versionArr = payload.adrVersion.split('.')
			}
			// app内部资源版本号
			const appVersion = res
			const appVersionArr = appVersion.split('.')
			
			if(Number(versionArr[0]) < Number(appVersionArr[0])) {
				return
			}
			if(Number(versionArr[0]) > Number(appVersionArr[0])) {
				
				if(osName == 'iOS') {
					plus.nativeUI.confirm("检测到新版本,是否马上更新?", function(e) {
						if(e.index == 0) {
							callback('url', payload.iosPath)
						}else {
							plus.runtime.quit();
							plus.nativeUI.showWaiting("请更新版本", {
								modal: true
							})
						}
					}, "提示", ["马上更新", "退出程序"])
				}else {
					plus.nativeUI.confirm("检测到新版本,是否马上更新?", function(e) {
						if(e.index == 0) {
							callback('apk', payload.adrPath)
						}else {
							plus.runtime.quit();
							plus.nativeUI.showWaiting("请更新版本", {
								modal: true
							})
						}
					}, "提示", ["下载安装", "退出程序"])
				}
				return
			}else if(Number(versionArr[0]) == Number(appVersionArr[0])) {
				if(versionArr[1] && Number(versionArr[1]) > 0) {
					console.log(Number(versionArr[1]), Number(appVersionArr[1]))
					// 服务器有子版本号 并且大于0
					if(appVersionArr[1]) {
						//app有子版本号
						if(Number(versionArr[1]) > Number(appVersionArr[1])) {
							//app有子版本号 并且 小于服务器最新子版本
							//更新wgt包
							plus.nativeUI.confirm("检测到新版本,是否马上更新?", function(e) {
								if(e.index == 0) {
									callback('wgt', payload.path)
								}else {
									plus.runtime.quit();
									plus.nativeUI.showWaiting("请更新版本", {
										modal: true
									})
								}
							}, "提示", ["下载更新", "退出程序"])
						}
					}else {
						//app没有子版本号
						plus.nativeUI.confirm("检测到新版本,是否马上更新?", function(e) {
							if(e.index == 0) {
								callback('wgt', payload.path)
							}else {
								plus.runtime.quit();
								plus.nativeUI.showWaiting("请更新版本", {
									modal: true
								})
							}
						}, "提示", ["下载更新", "退出程序"])
					}
				}
			}
		})
		
		
	},
	getAppVersion() {
		return new Promise((resolve, reject) => {
			try {
				plus.runtime.getProperty( plus.runtime.appid, function ( wgtinfo ) {
					//appid属性
					var wgtStr = "appid:"+wgtinfo.appid;
					//version属性
					wgtStr += "<br/>version:"+wgtinfo.version;
					//name属性
					wgtStr += "<br/>name:"+wgtinfo.name;
					//description属性
					wgtStr += "<br/>description:"+wgtinfo.description;
					//author属性
					wgtStr += "<br/>author:"+wgtinfo.author;
					//email属性
					wgtStr += "<br/>email:"+wgtinfo.email;
					//features 属性
					wgtStr += "<br/>features:"+wgtinfo.features;
					console.log( wgtStr );
					resolve(wgtinfo.version)
				} );
			} catch (error) {
				reject(error)
			}
		})
	},
	//创建本地消息
	createMessage(content, payload, option = {sound: 'system'}) {
		try {
			plus.push.createMessage(content, payload, option)
		} catch (error) {
			
		}
	},
	//打开链接
	openURL(url) {
		try {
			plus.runtime.openURL(url, () => {
				this.toast('开打链接失败！')
			})
		} catch (error) {
			window.open(url)
		}
	}
}

export default {
	install(Vue) {
		Object.defineProperty(Vue.prototype, '$h5Plus', {
			value: h5Plus
		})
	}
}

export { h5Plus }