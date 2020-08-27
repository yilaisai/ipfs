import { myAccount,myIndexInfo } from '@/api/request'
const actions = {
	getUserAssetInfo({ commit }) {
		const token = localStorage.getItem('token')
		if(!token) return
		myAccount().then(res => {
			commit('saveAssetInfo', res.result)
		})
	},
	getUserInfo({ commit }){
		const token = localStorage.getItem('token')
		if(!token) return
		myIndexInfo().then(res => {
			console.log('【UserInfo】',res.result)
			localStorage.setItem('inviteCode', res.result.inviteCode)
			commit('saveUserInfo', res.result)
		})
	}
}

export default actions
