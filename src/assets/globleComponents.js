import HeaderBar from '@/components/common/headerbar'  //顶部导航条

const gbComponents = (Vue) => {
	if(gbComponents.installed) return
	Vue.component('HeaderBar', HeaderBar)
}

export default gbComponents

