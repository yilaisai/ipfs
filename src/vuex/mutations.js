import Vue from 'vue'
const mutations = {
	setLoading(state,val) {
		if(val==0){
			state.dialogs = 0
		}else{
			state.dialogs += val
		}
	},
	setCoinInfo(state, val) {
		state.coinInfo = val
	},
	saveAssetInfo(state, payload) {
		state.assetInfo = payload
	},
	saveUserInfo(state, payload) {
		state.userInfo = payload
	},
	setToken(state, val) {
		if(val) {
			localStorage.setItem('token', val)
		}else {
			localStorage.removeItem('token')
		}
		state.token = val
	},
	setOverview(state, payload) { 
		state.overview = payload
	},
	setHeight(state, payload) {
		state.height = payload
	}
}

export default mutations
