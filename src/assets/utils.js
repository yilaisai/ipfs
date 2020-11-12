import BigNumber from 'bignumber.js'
import Vue from 'vue'


const bus = new Vue()

/**
 * 格式化时间
 * @param {Object} obj
 * @param {String} type
 */
const fmtDate = (obj, type) => {
	obj = obj * 1
	let date = new Date(obj)
	let y = 1900 + date.getYear()
	let m = "0" + (date.getMonth() + 1)
	let d = "0" + date.getDate()
	let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
	let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
	let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
	switch(type) {
	case 'full':
		return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length) + " " + h + ":" + minutes + ":" + s
		break
	case 'time':
		return h + ":" + minutes + ":" + s
		break
	case 'month':
		
		return m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length) + " " + h + ":" + minutes
		break
	case 'hour':
		return h + ":" + minutes
		break
	default: 
		return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length)
		break
	}
}
Vue.filter('fmtDate',fmtDate)
/**
 * 账号格式化
 * @param {String} str
 */
const fmtAccount = (str) => {
	if(/^[0-9]*$/.test(str)) {
		return str.replace(/(.{3}).*(.{4})/, "$1****$2")
	}else if(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(str)) {
		return str.replace(/(.{2}).*(@.{6})/, "$1****$2")
	}else {
		return str.replace(/(.{4}).*(.{4})/, "$1....$2")
	}
}

/**
 * 元素高度设置
 */
const setHeight = elem => {
	var fh = elem.parentNode
	elem.style.height = fh.clientHeight + "px"
}

/**
 * 客户端下载
 */
const downLoadApp = data => {
	const ua = navigator.userAgent.toLowerCase()
	let u = navigator.userAgent
	let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
	let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
	if(isAndroid) {
		if(ua.match('micromessenger')) {
			data.showGuidePop = true
		}else {
			window.location.href = window.ANDURL
		}
	} else if(isiOS) {
		if(ua.match(' qq')) {
			data.showGuidePop = true
		}else {
			window.location.href = window.IOSURL
		}
	} else {
		data.$dialog.alert({
			mes: '非Android、iOS'
		})
	}
}

/**
 * 检测浏览器语言
 */
const getLanguage = () => {
	let language = null
	let lang = ""
	if (navigator.appName == 'Netscape'){
		language = navigator.language
	} else{
		language = navigator.browserLanguage
	}
	if (language.indexOf('en') > -1){
		lang = "en-US"
	} else if (language.indexOf('zh') > -1){
		lang = "zh-CN"
	} else{
		lang = "en-US"
	}
	return lang
}

const IsPC = () => {
	var userAgentInfo = navigator.userAgent
	var Agents = ["Android", "iPhone",
		"SymbianOS", "Windows Phone",
		"iPad", "iPod", "android"]
	var flag = true
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false
			break
		}
	}
	return flag
}

const getBrowser = () => {
	var e = {
		version: function() {
			var e = navigator.userAgent
			return {
				ios: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				android: e.indexOf("Android") > -1 || e.indexOf("Adr") > -1,
				mobilePhone: !!e.match(/AppleWebKit.*Mobile.*/),
				trident: e.indexOf("Trident") > -1,
				presto: e.indexOf("Presto") > -1,
				webkit: e.indexOf("AppleWebKit") > -1,
				gecko: e.indexOf("Gecko") > -1 && -1 == e.indexOf("KHTML"),
				iphone: e.indexOf("iPhone") > -1,
				iPad: e.indexOf("iPad") > -1,
				webApp: e.indexOf("Safari"),
				weixin: e.indexOf("MicroMessenger"),
				QQ: " qq" == e.match(/\sQQ/i)
			}
		}(),
		browserLanguage: (navigator.language || navigator.browserLanguage).toLowerCase()
	}
	e.version.ios || e.version.android || e.version.mobilePhone
	return e
}


/**
 * 数字小数位截取
 */
const decimalNumber = (number, decimal = 0) => {
	let n = new BigNumber(number)
	return BigNumber( Math.floor( n.times(Math.pow(10, decimal)) ) ).div(Math.pow(10, decimal))
}

/**
 * websocket获取到数据单位转换
 */
 const changeToPiB = (number,unit = 'PiB') => {
	if(unit == 'PiB') {
		return Math.round((number/1024/1024/1024/1024/1024)*100)/100
	} else if (unit == 'TiB') {
		return Math.round((number/1024/1024/1024/1024)*100)/100
	}
 }

 /**
 * 收益类型匹配
 */
const changeOptType = (val) => {
	return val == 0?'提币':val == 1?'充币':val == 2?'基础收益':val == 3?'矿池收益':val ==4?'分红收益':val ==5?'提币审核失败':val == 6?'系统回收':val == 7?'系统补发':val == 8?'基础线性锁仓':val == 9?'基础线性释放':val == 10?'矿池线性锁仓':val == 11?'矿池线性释放':'未分类'
}
Vue.filter('changeOptType',changeOptType)
const extendMethods = {
	fmtDate,
	fmtAccount,
	setHeight,
	downLoadApp,
	getLanguage,
	IsPC,
	getBrowser,
	BigNumber,
	decimalNumber,
	bus,
	changeToPiB,
	changeOptType
}

export default {
	install(Vue) {
		for(let [k, v] of Object.entries(extendMethods)) {
			Object.defineProperty(Vue.prototype, '$' + k, {
				value: v
			})
		}
	}
}

export {
	fmtDate,
	fmtAccount,
	setHeight,
	downLoadApp,
	getLanguage,
	IsPC,
	getBrowser,
	BigNumber,
	decimalNumber,
	bus,
	changeOptType
}
