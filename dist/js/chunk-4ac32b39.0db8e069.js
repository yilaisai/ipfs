(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4ac32b39"],{4296:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"earnings-page"},[n("div",{staticClass:"banner"},[n("HeaderBar",{attrs:{title:t.coin+"收益记录",color:"transparent"}}),n("div",{staticClass:"content"},[n("div",{staticClass:"flex-wrap"},[n("div",[n("img",{attrs:{src:"./img/coin/"+t.coin+".png",alt:""}}),n("h3",[t._v(t._s("FIL"==t.coin?t.userInfo.totalAmount:0))]),n("span",[t._v("累计收益("+t._s(t.coin)+")")])]),n("div",[n("img",{attrs:{src:"./img/coin/"+t.coin+".png",alt:""}}),n("h3",[t._v(t._s("FIL"==t.coin?t.userInfo.amount:0))]),n("span",[t._v("账户余额("+t._s(t.coin)+")")])])]),n("van-button",{attrs:{type:"primary",size:"large"},on:{click:t.withdraw}},[t._v("提现")])],1)],1),n("div",{staticClass:"table"},[n("ul",[n("li",{staticClass:"head"},[n("span",[t._v("挖矿云储力 (T)")]),n("span",[t._v("24小时收益 ("+t._s(t.coin)+")")]),n("span",[t._v("收益类型")]),n("span",[t._v("时间 ")])])]),n("van-pull-refresh",{staticClass:"list",on:{refresh:t.onRefresh},model:{value:t.refreshing,callback:function(e){t.refreshing=e},expression:"refreshing"}},[t.list.length?n("van-list",{attrs:{finished:t.finished},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.list,(function(e,i){return n("van-cell",{key:i},[n("span",[t._v(t._s(e.activeAmount))]),n("span",[t._v(t._s(e.amount))]),n("span",[t._v(t._s(0==e.type?"基础收益":1==e.type?"奖励收益":"分红收益"))]),n("span",[t._v(t._s(t._f("fmtDate")(e.createTimeStamp,"full")))])])})),1):n("van-empty",{staticClass:"empty-image",attrs:{image:"./img/empty.png",description:"暂时还没有收益信息哦"}})],1)],1)])},a=[],s=(n("5ab2"),n("6d57"),n("e10e"),n("ce3c")),r=n("9f3a"),o=n("0c6d");function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){Object(s["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var u={data:function(){return{coin:"FIL",coinList:["BTC","ETH","EOS","XMR","FIL"],selectShow:!1,list:[],loading:!1,finished:!1,refreshing:!1,formData:{pageNum:1,pageSize:10},total:0}},mounted:function(){this.coin=this.$route.query.coin,"FIL"==this.coin&&this.getList()},methods:{getList:function(){var t=this;Object(o["m"])({pageNum:this.formData.pageNum,pageSize:this.formData.pageSize},{noLoading:!0}).then((function(e){t.refreshing&&(t.list=[],t.refreshing=!1);var n=e.result.list;t.total=e.result.total;for(var i=0;i<n.length;i++)t.list.push(n[i]);t.loading=!1,t.list.length>=t.total&&(t.finished=!0)}))},getMoreList:function(){var t=this;Object(o["m"])({pageNum:this.formData.pageNum,pageSize:this.formData.pageSize},{noLoading:!0}).then((function(e){t.refreshing&&(t.list=[],t.refreshing=!1,t.formData.pageNum=1);var n=e.result.list;t.total=e.result.total;for(var i=0;i<n.length;i++)t.list.push(n[i]);t.loading=!1,t.list.length>t.total&&(t.finished=!0)}))},withdraw:function(){this.$router.push({path:"/withdraw",query:{coin:this.coin}})},onLoad:function(){this.formData.pageNum++,this.getList()},onRefresh:function(){this.formData.pageNum=1,this.finished=!1,this.loading=!0,this.getList(),this.$toast("刷新列表")}},computed:l({},Object(r["b"])(["userInfo"]))},f=u,p=(n("b20f"),n("9ca4")),h=Object(p["a"])(f,i,a,!1,null,"cf76d0bc",null);e["default"]=h.exports},b20f:function(t,e,n){"use strict";var i=n("bcc3"),a=n.n(i);a.a},bcc3:function(t,e,n){}}]);