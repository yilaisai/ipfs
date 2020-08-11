import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from 'vant';
import 'vant/lib/index.css';
import gbComponents from './assets/globleComponents';
import Utils from './assets/utils'
import './assets/less/base.less';
import FastClick from 'fastclick';
import VueClipboard from 'vue-clipboard2'
import './registerServiceWorker'
import h5Plus from '@/assets/h5Plus'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueClipboard)
Vue.use(Vant);
Vue.use(gbComponents);
Vue.use(Utils)
Vue.use(h5Plus)

Vue.config.productionTip = false;
Vue.prototype.$config = {
	transStatusMap: {
		0:'失败',
		1:'成功',
		2:'等待',
		3:'审核中',
		4:'审核不通过'
	}
}
Vue.prototype.$fmtNumber = function(type, val) {
	if(type == '%2') {
		return Math.floor(val * 10000) / 100
	}
	return val
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


window.onUserClickBack = function() {
	const routeNameArr = ['home', 'war', 'my']
	store.commit("setLoading",0)
	if(routeNameArr.indexOf(router.app.$route.name) >= 0) {
		// window.app.exitToBackground()
	} else {
		// if( router.app.$route.name === 'invite' || router.app.$route.name === 'trustShare'){
		// 	if(sessionStorage.getItem('invite')){
		// 		sessionStorage.removeItem('invite')
		// 		window.app.dismissPop()
		// 		return
		// 	}else{
				router.goBack(-1)
		// 	}
			
		// }
		
	}
}

window.addEventListener('beforeinstallprompt', event => {
	event.userChoice.then(result => {console.log(result.outcome)
	})
})