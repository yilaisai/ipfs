(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f5587354"],{"20fd":function(t,a,i){t.exports=i.p+"img/noData.3b572ea8.svg"},"9b9e":function(t,a,i){"use strict";var n=i("f0ba"),s=i.n(n);s.a},"9bfe":function(t,a,i){"use strict";i.r(a);var n=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"finance-earnings-page"},[n("HeaderBar",{attrs:{title:"收益明细",color:"#000"}}),n("div",{staticClass:"content"},[n("div",{staticClass:"detail"},[n("div",[n("p",[t._v("累计收益 (FIL)")]),n("p",[n("span",[t._v(t._s(t.totalAmount))]),n("span",[t._v("FIL")])])])]),n("div",{staticClass:"list"},[t._m(0),t.list.length?n("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(a){t.loading=a},expression:"loading"}},t._l(t.list,(function(a){return n("div",{key:a,staticClass:"item",on:{click:function(i){t.$router.push({path:"/finance-detail",query:{data:JSON.stringify(a)}})}}},[n("span",[t._v(t._s(a.name))]),n("span",[t._v(t._s(a.reward))])])})),0):n("div",{staticClass:"noData"},[n("img",{attrs:{src:i("20fd"),alt:""}}),n("span",[t._v("暂无收益明细哦，快去购买理财产品吧")])])],1)])],1)},s=[function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"tabs"},[i("span",[t._v("资产名称")]),i("span",[t._v("累计收益")])])}],e=i("0c6d"),l={data:function(){return{totalAmount:"",list:[],finished:!1,loading:!1,pageNum:1,pageSize:10,total:0}},mounted:function(){this.getList(),this.getSum()},methods:{getList:function(){var t=this;Object(e["j"])({pageNum:this.pageNum,pageSize:this.pageSize,isReward:1}).then((function(a){200===a.code&&(t.total=a.result.total,t.list=t.list.concat(a.result.list),t.loading=!1,t.list.length>=t.total&&(t.finished=!0))}))},getSum:function(){var t=this;Object(e["l"])({isReward:1}).then((function(a){t.totalAmount=a.result.realReward}))},onLoad:function(){this.pageNum++,this.getList()}}},o=l,c=(i("9b9e"),i("9ca4")),u=Object(c["a"])(o,n,s,!1,null,"425b070c",null);a["default"]=u.exports},f0ba:function(t,a,i){}}]);