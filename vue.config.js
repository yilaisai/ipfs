module.exports = {
	// 基本路径
	baseUrl: './',
	productionSourceMap: false,
	chainWebpack: (config) => {
		const imagesRule = config.module.rule("images")
		imagesRule
			.use('url-loader')
			.loader('url-loader')
			.tap(options => Object.assign(options, { limit: 10260, deleteOriginalAssets: true }))
	},
	pwa: {
		name: '星际云',
		short_name: "星际云",
  		description: "星际云",
		themeColor: '#5DD5DD',
		msTileColor: '#5DD5DD',
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: 'black',
		backgroundColor: '#5DD5DD',
		permissions: {
			"desktop-notification": {
			  "description": "Needed for creating system notifications."
			}
		},
	 
		// 配置 workbox 插件
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
		  // InjectManifest 模式下 swSrc 是必填的。
		  swSrc: 'src/service-worker.js', // 本地service-worker.js相对路径
		  importWorkboxFrom: 'disabled', // 决定是否引入workbox
		  importScripts: 'https://cdn.myun.info/workbox-v4.3.1/workbox-sw.js',
		  exclude: [/\.html$/, /\.css.map$/, /service-worker.js$/] // 缓存列表排除的文件，可以是文件名或正则
		}
	}
}
