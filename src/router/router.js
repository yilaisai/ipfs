import Vue from "vue"
import Router from "vue-router"
import store from '@/store.js'
import { h5Plus } from '@/assets/h5Plus'
import { Dialog } from 'vant'

import my from './routes/my'
import wallet from './routes/wallet'
import account from './routes/account'

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
		...my,
		...wallet,
		...account,
		{
			path: '/',
			name: 'index',
			component: () => import('@/views/index/index'),
			redirect: '/home',
			children: [
				{
					path: '/home',
					name: 'home',
					meta: { isLogin: true, statusBar: '#5DD5DD', isRoot: true },
					component: () => import('@/views/home/home')
				},
				{
					path: '/war',
					name: 'war',
					meta: { isLogin: true, isRoot: true },
					component: () => import('@/views/war/war')
				},
				{
					path: '/earnings',
					name: 'earnings',
					meta: { isLogin: true, isRoot: true },
					component: () => import('@/views/wallet/earnings/list')
				},
				{
					path: '/my',
					name: 'my',
					meta: { isLogin: true, statusBar: '#5DD5DD', isRoot: true },
					component: () => import('@/views/my/my')
				}
			]
		},
		{
			path: "/invite",//邀请
			name: "invite",
			component: () => import("@/views/home/invite")
		},
		{
			path: "/inviteList",//邀请
			name: "inviteList",
			component: () => import("@/views/home/inviteList")
		},
		{
			path: "/inviteShare",//邀请分享
			name: "inviteShare",
			component: () => import("@/views/home/inviteShare")
		},

		{
			path: "/notice",  //公告列表
			name: "notice",
			component: () => import("@/views/home/notice")
		},
		{
			path: "/noticeDetails",  //公告详情
			name: "noticeDetails",
			component: () => import("@/views/home/noticeDetails")
		},
		{
			path: "/resultTipsPage",  //结果提示页面
			name: "resultTipsPage",
			component: () => import("@/views/index/resultTipsPage")
		},
		{
			path: "/appUpdate",  //app升级页面
			name: "appUpdate",
			meta: { isRoot: true },
			component: () => import("@/views/index/appUpdate")
		},
		{
			path: "/goodsDetails",  //商品详情
			name: "goodsDetails",
			component: () => import("@/views/war/goodsDetails")
		},
		{
			path: "/confirmOrder",  //商品详情
			name: "confirmOrder",
			component: () => import("@/views/home/placeOrder/confirmOrder")
		},
		{
			path: "/checkstand",  //收银台
			name: "checkstand",
			component: () => import("@/views/home/placeOrder/checkstand")
		},
		{
			path: "/overView",  //全网信息
			name: "overView",
			component: () => import("@/views/overView/index")
		},
		{
			path: "/rank",  //全网信息
			name: "rank",
			component: () => import("@/views/overView/rank")
		},
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
			h5Plus.setStatusBarBackground('#42C1CA')
			h5Plus.setStatusBarStyle("light")
		} else {
			next(true);
		}
	}else {
		next(true);
	}  
})


export default router