if(window.location.href.indexOf('supercards.io') >= 0 || window.location.href.indexOf(':808') >= 0){//开发环境
	// window.SERVER_PATH = "http://192.168.120.53:7011"
	window.SERVER_PATH = "https://api.supercards.io"
}else if(window.location.href.indexOf('travel-around.world') >= 0) {
	window.SERVER_PATH = "https://api.supercards.io"
	window.INVITE_URL = "https://web.supercards.io"
}else {
	window.SERVER_PATH = "https://api.supercards.io"
	window.INVITE_URL = "https://web.supercards.io"
}

//h5版本号
window.H5_VERSION = "1.0"  
