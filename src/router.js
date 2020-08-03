import Vue from "vue"
import Router from "vue-router"
import store from '@/store.js'
import { h5Plus } from '@/assets/h5Plus'
import { Dialog } from 'vant'

Router.prototype.goBack = function (n) {
	store.state.isBack = true
	// store.commit("closeWait");
	// store.state.popupIsShow = false;  //关闭页面弹出框
	this.go(n)
}

Vue.use(Router)

const router =  new Router({
	// mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'index',
			component: () => import('@/views/index/index'),
			redirect: '/home',
			children: [
				{
					path: '/home',
					name: 'home',
					meta: { isLogin: true, isRoot: true },
					component: () => import('@/views/home/home')
				},
				{
					path: '/war',
					name: 'war',
					meta: { isLogin: true, statusBar: '#00D984', isRoot: true },
					component: () => import('@/views/war/war')
				},
				{
					path: '/my',
					name: 'my',
					meta: { isLogin: true, statusBar: '#00D984', isRoot: true },
					component: () => import('@/views/my/my')
				}
			]
		},
		{
			path: "/register",
			name: "register",
			component: () => import("./views/account/register")
		},
		{
			path: "/registerSuccess",
			name: "registerSuccess",
			component: () => import("./views/account/registerSuccess")
		},
		{
			path: "/setLoginPwd",
			name: "setLoginPwd",
			component: () => import("./views/account/setLoginPwd")
		},
		{
			path: "/login",
			name: "login",
			meta: { isRoot: true },
			component: () => import("./views/account/login")
		},
		{
			path: "/assets",
			name: "assets",
			component: () => import("./views/my/assets")
		},
		{
			path: "/recharge",
			name: "recharge",
			component: () => import("./views/home/recharge")
		},
		{
			path: "/rechargeRecord",
			name: "rechargeRecord",
			component: () => import("./views/home/recharge/record")
		},
		{
			path: "/withdraw",
			name: "withdraw",
			component: () => import("./views/home/withdraw")
		},
		{
			path: "/withdrawRecord",
			name: "withdrawRecord",
			component: () => import("./views/home/withdraw/record")
		},
		{
			path: "/invite",//邀请
			name: "invite",
			component: () => import("./views/home/invite")
		},
		{
			path: "/inviteRecord",  //编辑头像
			name: "inviteRecord",
			component: () => import("./views/war/inviteRecord")
		},
		{
			path: "/inviteShare",//邀请分享
			name: "inviteShare",
			component: () => import("./views/home/inviteShare")
		},
		{
			path: "/downloadInviteImg",//下载邀请分享
			name: "downloadInviteImg",
			component: () => import("./views/home/downloadInviteImg")
		},
		{
			path: "/userInfo",
			name: "userInfo",
			component: () => import("./views/my/userInfo")
		},
		{
			path: "/aboutUS",  //联系我们
			name: "aboutUS",
			component: () => import("./views/my/aboutUS")
		},
		{
			path: "/updateLoginPwd",  //修改登录密码
			name: "updateLoginPwd",
			component: () => import("./views/my/updateLoginPwd")
		},
		{
			path: "/updateFundsPwd",  //修改资金密码
			name: "updateFundsPwd",
			component: () => import("./views/my/updateFundsPwd")
		},
		{
			path: "/inputFundPwd1",  //修改资金密码
			name: "inputFundPwd1",
			component: () => import("./views/my/inputFundPwd1")
		},
		{
			path: "/inputFundPwd2",  //修改资金密码
			name: "inputFundPwd2",
			component: () => import("./views/my/inputFundPwd2")
		},
		{
			path: "/location",  //区号选择
			name: "location",
			component: () => import("./views/account/location")
		},
		{
			path: "/notice",  //公告列表
			name: "notice",
			component: () => import("./views/home/notice")
		},
		{
			path: "/noticeDetails",  //公告详情
			name: "noticeDetails",
			component: () => import("./views/home/noticeDetails")
		},
		{
			path: "/forgotPwd",  //忘记密码
			name: "forgotPwd",
			component: () => import("./views/account/forgotPwd")
		},
		{
			path: "/helpCenter",  //帮助中心
			name: "helpCenter",
			component: () => import("./views/my/helpCenter")
		},
		{
			path: "/setting",  //设置
			name: "setting",
			component: () => import("./views/my/setting")
		},
		{
			path: "/editAvatar",  //编辑头像
			name: "editAvatar",
			component: () => import("./views/account/editAvatar")
		},
		{
			path: "/teammateEarnings",  //船员累计给我赚钱
			name: "teammateEarnings",
			component: () => import("./views/war/teammateEarnings")
		},
		{
			path: "/teamEarnings",  //舰队收益
			name: "teamEarnings",
			component: () => import("./views/war/teamEarnings")
		},
		{
			path: "/teamEarningsExtract",  //舰队收益提取
			name: "teamEarningsExtract",
			component: () => import("./views/war/teamEarningsExtract")
		},
		{
			path: "/rankings",  //排行榜
			name: "rankings",
			component: () => import("./views/home/rankings")
		},
		{
			path: "/wallet",  //钱包
			name: "wallet",
			meta: { statusBar: '#0ED8AB' },
			component: () => import("./views/wallet/index")
		},
		{
			path: "/orderList",  //交易订单列表
			name: "orderList",
			component: () => import("./views/wallet/orderList")
		},
		{
			path: "/orderDetails",  //交易订单详情
			name: "orderDetails",
			component: () => import("./views/wallet/orderDetails")
		},
		{
			path: "/billDetails",  //充提币订单详情
			name: "billDetails",
			component: () => import("./views/wallet/billDetails")
		},
		{
			path: "/ticket",  //购买奖池入场券
			name: "ticket",
			component: () => import("./views/home/lottery/ticket")
		},
		{
			path: "/activateAccount",  //激活账户
			name: "activateAccount",
			component: () => import("./views/my/activateAccount")
		},
		{
			path: "/buyShip",  //购买船只
			name: "buyShip",
			meta: { statusBar: '#00D984', keepAlive: true },
			component: () => import("./views/home/ship/buyShip")
		},
		{
			path: "/shipInfo",  //船舶信息
			name: "shipInfo",
			component: () => import("./views/home/ship/shipInfo")
		},
		{
			path: "/resultTipsPage",  //结果提示页面
			name: "resultTipsPage",
			component: () => import("./views/index/resultTipsPage")
		},
		{
			path: "/appUpdate",  //app升级页面
			name: "appUpdate",
			meta: { isRoot: true },
			component: () => import("./views/index/appUpdate")
		},
		{
			path: "/lottery",  //大转盘抽奖
			name: "lottery",
			component: () => import("./views/home/lottery")
		},
		{
			path: "/lotteryRule",  //大转盘抽奖规则
			name: "lotteryRule",
			component: () => import("./views/home/lottery/rule")
		},
		{
			path: "/billList",  //我的账单
			name: "billList",
			component: () => import("./views/wallet/billList")
		},
		{
			path: "/task",  //邀请任务
			name: "task",
			meta: { statusBar: '#86CE60' },
			component: () => import("./views/task/index")
		},
		{
			path: "/taskRule",  //邀请任务规则
			name: "taskRule",
			meta: { statusBar: '#86CE60' },
			component: () => import("./views/task/taskRule")
		}
	]
});


// 路由切换配置
router.beforeEach((to, from, next) => {
	if(store.state.isBack || to.path == sessionStorage.getItem('frompath')) {
	  store.state.transitionName = "slide-right";
	  sessionStorage.removeItem("frompath");
	}else {
	  store.state.transitionName = "slide-left";
	  sessionStorage.setItem("frompath",from.path);
	}
	store.state.isBack = false;
	//修改系统状态栏样式
	if(to.meta.statusBar) {
		h5Plus.setStatusBarBackground(to.meta.statusBar)
		h5Plus.setStatusBarStyle("light")
	}else if(from.meta.statusBar) {
		h5Plus.setStatusBarBackground("#FFFFFF")
		h5Plus.setStatusBarStyle("dark")
	}
	//登录拦截
	if(to.meta.isLogin) {
		if(!localStorage.getItem("token")) {
			// Dialog.confirm({
			// 	message: '请先登录账号',
			// 	confirmButtonText:'注册/登录'
			// }).then(() => {
			// 	next({path: "login?back=1"})
			// }).catch(() => {
					
			// })
			next({path: "login?back=1"})
		} else {
			next(true);
		}
	}else {
		next(true);
	}  
})


export default router