if(window.location.href.indexOf('supercards.io') >= 0 || window.location.href.indexOf(':808') >= 0){//开发环境
	// window.SERVER_PATH = "http://192.168.120.53:7011"
	window.SERVER_PATH = "https://api.supercards.io"
	window.INVITE_URL = "https://web.supercards.io"
}else if(window.location.href.indexOf('ipfs1606.com') >= 0) {
	window.SERVER_PATH = "https://api.ipfs1606.com"
	window.INVITE_URL = "https://web.ipfs1606.com"
}else {
	window.SERVER_PATH = "https://api.ipfs1606.com"
	window.INVITE_URL = "https://web.ipfs1606.com"
}

//h5版本号
window.H5_VERSION = "1.0"  