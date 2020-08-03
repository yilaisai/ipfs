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
		name: '彼岸',
		short_name: "彼岸",
  		description: "彼岸",
		themeColor: '#242A37',
		msTileColor: '#242A37',
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: 'black',
		backgroundColor: '#242A37',
	 
		// 配置 workbox 插件
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
		  // InjectManifest 模式下 swSrc 是必填的。
		  swSrc: './public/service-worker.js', // 本地service-worker.js相对路径
		  importWorkboxFrom: 'disabled', // 决定是否引入workbox
		  exclude: [/\.html$/, /\.css.map$/, /service-worker.js$/] // 缓存列表排除的文件，可以是文件名或正则
		}
	}
}
