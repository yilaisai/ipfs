if(window.location.href.indexOf('ourmcm.com') >= 0 || window.location.href.indexOf(':808') >= 0){//开发环境
	window.SERVER_PATH = "https://api.ourmcm.com"
	window.INVITE_URL = "https://web.ourmcm.com"
	window.SERVER_PATH = "https://api.ipfs1606.com"
	window.INVITE_URL = "https://web.ipfs1606.com"
}else if(window.location.href.indexOf('ipfs1606.com') >= 0) {
	window.SERVER_PATH = "https://api.ipfs1606.com"
	window.INVITE_URL = "https://web.ipfs1606.com"
}else {
	window.SERVER_PATH = "https://api.ipfs1606.com"
	window.INVITE_URL = "https://web.ipfs1606.com"
}


//h5版本号
window.H5_VERSION = "4.02"  
