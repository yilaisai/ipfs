import { $http } from '@/axios'

//注册第一步校验
export function checkUserRegister(data) {
	return $http.postFormData('/app/user/open/checkUserRegister', data)
}
//注册
export function phoneRegister(data) {
	return $http.post('/app/user/open/phoneRegister', data)
}
//随机获取昵称
export function getNewNickName(data) {
	return $http.post('/app/user/open/getNewNickName', data)
}
//登录
export function phoneLogin(data) {
	return $http.postFormData('/app/user/open/phoneLogin', data)
}
//获取手机验证码
export function getCaptchaPhone(data) {
	return $http.postFormData('/util/open/sendPhoneCaptcha', data)
}
//获取手机验证码(已登录)
export function getCaptchaPhone2(data) {
	return $http.postFormData('/util/sendPhoneCaptcha', data)
}
//获取验证码
export function getCaptcha(data) {
	return $http.get('/app/user/captcha', data)
}
//获取资产信息
export function myAccount(data) {
	return $http.post('/app/user/myAccount', data)
}
//修改登录密码
export function updateLoginPwd(data) {
	return $http.post('/app/user/updateLoginPwd', data)
}
//忘记密码
export function forgetLoginPwd(data) {
	return $http.post('/app/user/open/forgetLoginPwd', data)
}
//修改资金密码
export function updateFundPwd(data) {
	return $http.post('/app/user/updateFundPwd', data)
}
//获取个人信息
export function myInfo(data) {
	return $http.post('/app/user/index', data)
}
//获取币种信息
export function getCoinInfo(data) {
	return $http.postFormData('/app/user/getCoinInfo', data)
}
//公告消息列表
export function getNoticeList(data, config = {}) {
	return $http.postFormData('/app/notice/open/getNoticeList', data, config)
}
//获取公告详情
export function getNoticeInfo(data) {
	return $http.postFormData('/app/notice/open/getNoticeInfo', data)
}
//军械库
export function getUserGameDrops(data) {
	return $http.postFormData('/app/game/getUserGameDrops', data)
}
//买抢
export function userBuy(data) {
	return $http.postFormData('/app/game/userBuy', data)
}
//团队投资列表
export function getUserTeamSumGun(data) {
	return $http.postFormData('/app/game/getUserTeamSumGun', data)
}
//投资装备
export function getUserJoinGameRecd(data) {
	return $http.postFormData('/app/game/getUserJoinGameRecd', data)
}
//提币 POST 
export function withdraw(data) {
	return $http.postFormData('/app/user/withdraw', data)
}
//获取用户币种列表
export function getUserCoinList(data) {
	return $http.postFormData('/app/user/getUserCoinList', data)
}
//提币/充币记录
export function transferList(data) {
	return $http.postFormData('/app/user/transferList', data)
}
//投资奖励-投资记录
export function getUserGameRewards(data) {
	return $http.postFormData('/app/game/getUserGameRewards', data)
}
//团队奖励
export function getUserInviteRewards(data) {
	return $http.postFormData('/app/game/getUserInviteRewards', data)
}
//团队-团队信息列表
export function myTeam(data) {
	return $http.postFormData('/app/game/myTeam', data)
}
//首页我的信息/投资奖励信息/团队我的信息/团队奖励
export function myIndexInfo(data) {
	return $http.postFormData('/app/user/index', data, {noLoading: true})
}
//资金流水
export function userCoinChange(data) {
	return $http.postFormData('/app/user/userCoinChange', data)
}
//存力产品列表
export function getMinePros(data = {}) {
	data.pageNum = 1
	data.pageSize = 100
	return $http.postFormData('/app/user/getMinePros', data)
}
// 我的合约 
export function getMyMinePro(data = {}) {
	data.pageNum = 1
	data.pageSize = 100
	return $http.postFormData('/app/user/getMyMinePro', data)
}
//
export function getCoinFeeInfo(data) {
	return $http.postFormData('/app/user/getCoinFeeInfo', data)
}

//舰队排行榜
export function findHomeNavalRankings(data) {
	return $http.postFormData('/app/rankings/findHomeNavalRankings', data)
}
//收益排行榜
export function findHomeEarningsRankings(data) {
	return $http.postFormData('/app/rankings/findHomeEarningsRankings', data)
}
//用户各种邀请船员 
export function findCrews(data) {
	return $http.postFormData('/app/invite/recd/findCrews', data)
}
//用户/舰队收益流水 
export function getBoatRewardList(data) {
	return $http.postFormData('/app/invite/recd/getBoatRewardList', data)
}

//获取版本信息
export function getVersionInfo(data) {
	return $http.postFormData('/app/user/open/getVersionInfo', data)
}

//购买抽奖券 
export function buyBoatTicket(data) {
	return $http.postFormData('/app/user/buyBoatTicket', data)
}

//购买船只
export function userBuyBoat(data) {
	return $http.postFormData('/app/user/userBuyBoat', data)
}

//获取首页banner
export function getBannersAndNotices(data) {
	return $http.postFormData('/app/user/getBannersAndNotices', data)
}

//激活账户
export function userActive(data) {
	return $http.postFormData('/app/user/userActive', data)
}

//文件上传
export function uploadFile(data) {
	let formData = new FormData()  // 创建form对象
	formData.append('files', data.files)
	formData.append('fileName', data.fileName)
	formData.append('type', data.type)
	let config = {
		headers: {'Content-Type': 'multipart/form-data'}
	}
	return $http.post('/util/open/uploadFile', formData, config)
}

//修改昵称
export function editNickName(data) {
	return $http.postFormData('/app/user/changeNickName', data)
}

//修改头像
export function editUserIcon(data) {
	return $http.postFormData('/app/user/editUserIcon', data)
}

//提取舰队收益
export function withdrawTicket(data) {
	return $http.postFormData('/app/user/withdrawTicket', data)
}

//获取船只信息
export function boatInfo(data) {
	return $http.postFormData('/app/index/boatInfo', data).then(res => {
		res.result.map((val,idx) => {
			let upgradeNum = 0
			if(idx != 0) {
				upgradeNum = res.result[idx - 1].inviteActiveNum
			}
			val.upgradeNum = upgradeNum
		})
		return Promise.resolve(res)
	}).catch(err => {
		return Promise.reject(err)
	})
}
//转移合约
export function transMine(data) {
	return $http.postFormData('/app/user/transMine', data)
}