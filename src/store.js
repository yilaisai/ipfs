import Vue from "vue"
import Vuex from "vuex"
import mutations from "./vuex/mutations"
import actions from './vuex/actions'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})



Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		dialogs:0,
		coinInfo: [],
		assetInfo: {},
		userInfo:{},
		isBack: false,
		transitionName: "slide-left",
		token: '',
		overview:{
			power:{}
		},
		height:0,
	},
	mutations,
	actions,
	plugins: [vuexLocal.plugin]
})
