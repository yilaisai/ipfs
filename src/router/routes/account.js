const account = [
	{
		path: "/register",
		name: "register",
		component: () => import("@/views/account/register")
	},
	{
		path: "/registerSuccess",
		name: "registerSuccess",
		component: () => import("@/views/account/registerSuccess")
	},
	{
		path: "/setLoginPwd",
		name: "setLoginPwd",
		component: () => import("@/views/account/setLoginPwd")
	},
	{
		path: "/login",
		name: "login",
		meta: { isRoot: true, statusBar: '#42C1CA' },
		component: () => import("@/views/account/loginRegister")
	},
	{
		path: "/location",  //区号选择
		name: "location",
		component: () => import("@/views/account/location")
	},
	{
		path: "/forgotPwd",  //忘记密码
		name: "forgotPwd",
		component: () => import("@/views/account/forgotPwd")
	},
	{
		path: "/editAvatar",  //编辑头像
		name: "editAvatar",
		component: () => import("@/views/account/editAvatar")
	},
]
export default account