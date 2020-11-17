const wallet = [
	{
		path: "/hashrate",  //云储力
		name: "hashrate",
		meta: { statusBar: '#42C1CA' },
		component: () => import("@/views/wallet/hashrate/index")
	},
	{
		path: "/transferSelect",  //云储力转移选择产品
		name: "transferSelect",
		component: () => import("@/views/wallet/hashrate/transferSelect")
	},
	{
		path: "/hashrateTransfer",  //云储力转移选择产品
		name: "hashrateTransfer",
		meta: { statusBar: '#42C1CA' },
		component: () => import("@/views/wallet/hashrate/transfer")
	},
	{
		path: "/orderList",  //交易订单列表
		name: "orderList",
		component: () => import("@/views/wallet/orderList")
	},
	{
		path: "/transferRecord",  //云储力转移记录
		name: "transferRecord",
		component: () => import("@/views/wallet/transferRecord")
	},
	{
		path: "/orderDetails",  //交易订单详情
		name: "orderDetails",
		component: () => import("@/views/wallet/orderDetails")
	},
	{
		path: "/billDetails",  //充提币订单详情
		name: "billDetails",
		component: () => import("@/views/wallet/billDetails")
	},
	{
		path: "/billList",  //我的账单
		name: "billList",
		component: () => import("@/views/wallet/billList")
	},
	{
		path: '/earningsDetails',  //收益记录
		name: 'earningsDetails',
		meta: { isLogin: true },
		component: () => import('@/views/wallet/earnings/index')
	},
	{
		path: '/earningsLock',  //锁仓列表
		name: 'earningsLock',
		meta: { isLogin: true },
		component: () => import('@/views/wallet/earnings/lock')
	},
	{
		path: '/withdraw',
		name: 'withdraw',
		meta: { isLogin: true },
		component: () => import('@/views/wallet/balance/withdraw/index')
	},
	{
		path: '/withdrawList',
		name: 'withdrawList',
		meta: { isLogin: true },
		component: () => import('@/views/wallet/balance/withdraw/list')
	},
	{
		path: '/withdrawDetail',
		name: 'withdrawDetail',
		meta: { isLogin: true },
		component: () => import('@/views/wallet/balance/withdraw/detail')
	},
	{
		path: '/addressManage',
		name: 'addressManage',
		meta: { isLogin: true },
		component: () => import('@/views/wallet/address/index')
	},
	{
		path: '/addAddress',
		name: 'addAddress',
		meta: { isLogin: true },
		component: () => import('@/views/wallet/address/add')
	},
	{
		path: '/balance',
		name: 'balance',
		meta: { isLogin: true },
		component: () => import('@/views/wallet/balance/index')
	},
	{
		path: '/recharge',
		name: 'recharge',
		meta: { isLogin: true },
		component: () => import('@/views/wallet/balance/recharge/index')
	},
	{
		path: '/rechargeDetail',
		name: 'rechargeDetail',
		meta: { isLogin: true },
		component: () => import('@/views/wallet/balance/recharge/detail')
	},
]
export default wallet