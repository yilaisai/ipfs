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
		path: "/wallet",  //钱包
		name: "wallet",
		meta: { statusBar: '#0ED8AB' },
		component: () => import("@/views/wallet/index")
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
		path: '/earningsDetails',
		name: 'earningsDetails',
		meta: { isLogin: true },
		component: () => import('@/views/wallet/earnings/index')
	},
	{
		path: '/withdraw',
		name: 'withdraw',
		meta: { isLogin: true },
		component: () => import('@/views/wallet/withdraw/index')
	},
	{
		path: '/withdrawList',
		name: 'withdrawList',
		meta: { isLogin: true },
		component: () => import('@/views/wallet/withdraw/list')
	},
	{
		path: '/withdrawDetail',
		name: 'withdrawDetail',
		meta: { isLogin: true },
		component: () => import('@/views/wallet/withdraw/detail')
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
]
export default wallet