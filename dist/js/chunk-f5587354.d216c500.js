(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f5587354"],{"20fd":function(t,a,n){t.exports=n.p+"img/noData.3b572ea8.svg"},"9b9e":function(t,a,n){"use strict";var i=n("f0ba"),s=n.n(i);s.a},"9bfe":function(t,a,n){"use strict";n.r(a);var i=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"finance-earnings-page"},[i("HeaderBar",{attrs:{title:"收益明细",color:"#000"}}),i("div",{staticClass:"content"},[i("div",{staticClass:"detail"},[i("div",[i("p",[t._v("累计收益 (FIL)")]),i("p",[i("span",[t._v(t._s(t.totalAmount))]),i("span",[t._v("FIL")])])])]),i("div",{staticClass:"list"},[t._m(0),t.list.length?i("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(a){t.loading=a},expression:"loading"}},t._l(t.list,(function(a){return i("div",{key:a,staticClass:"item",on:{click:function(n){t.$router.push({path:"/finance-detail",query:{data:JSON.stringify(a)}})}}},[i("span",[t._v(t._s(a.name))]),i("span",[t._v(t._s(a.reward))])])})),0):i("div",{staticClass:"noData"},[i("img",{attrs:{src:n("20fd"),alt:""}}),i("span",[t._v("暂无收益明细哦，快去购买理财产品吧")])])],1)])],1)},s=[function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"tabs"},[n("span",[t._v("资产名称")]),n("span",[t._v("累计收益")])])}],e=n("0c6d"),l={data:function(){return{totalAmount:"",list:[],finished:!1,loading:!1,pageNum:1,pageSize:10,total:0}},mounted:function(){this.getList(),this.getSum()},methods:{getList:function(){var t=this;Object(e["l"])({pageNum:this.pageNum,pageSize:this.pageSize,isReward:1}).then((function(a){200===a.code&&(t.total=a.result.total,t.list=t.list.concat(a.result.list),t.loading=!1,t.list.length>=t.total&&(t.finished=!0))}))},getSum:function(){var t=this;Object(e["n"])({isReward:1}).then((function(a){t.totalAmount=a.result.realReward}))},onLoad:function(){this.pageNum++,this.getList()}}},o=l,c=(n("9b9e"),n("9ca4")),u=Object(c["a"])(o,i,s,!1,null,"425b070c",null);a["default"]=u.exports},f0ba:function(t,a,n){}}]);