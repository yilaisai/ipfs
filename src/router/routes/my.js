const my = [
	{
		path: '/authStatus', //身份认证状态
		name: 'authStatus',
		component: () => import('@/views/my/authentication/status')
	},
	{
		path: '/auth1',
		name: 'auth1',
		component: () => import('@/views/my/authentication/auth1')
	},
	{
		path: '/auth2',
		name: 'auth2',
		component: () => import('@/views/my/authentication/auth2')
	},
	{
		path: '/auth3',
		name: 'auth3',
		component: () => import('@/views/my/authentication/auth3')
	},
	{
		path: "/assets",
		name: "assets",
		component: () => import("@/views/my/assets")
	},
	{
		path: "/userInfo",  //用户信息
		name: "userInfo",
		component: () => import("@/views/my/userInfo")
	},
	{
		path: "/aboutUS",  //联系我们
		name: "aboutUS",
		component: () => import("@/views/my/aboutUS")
	},
	{
		path: "/updateLoginPwd",  //修改登录密码
		name: "updateLoginPwd",
		component: () => import("@/views/my/updateLoginPwd")
	},
	{
		path: "/updateFundsPwd",  //修改资金密码
		name: "updateFundsPwd",
		component: () => import("@/views/my/updateFundsPwd")
	},
	{
		path: "/inputFundPwd1",  //修改资金密码
		name: "inputFundPwd1",
		component: () => import("@/views/my/inputFundPwd1")
	},
	{
		path: "/inputFundPwd2",  //修改资金密码
		name: "inputFundPwd2",
		component: () => import("@/views/my/inputFundPwd2")
	},
	{
		path: "/helpCenter",  //帮助中心
		name: "helpCenter",
		component: () => import("@/views/my/helpCenter")
	},
	{
		path: "/setting",  //设置
		name: "setting",
		component: () => import("@/views/my/setting")
	},
]
export default my