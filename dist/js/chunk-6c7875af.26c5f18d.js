(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c7875af"],{"025a":function(t,e,n){},"29dd":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAgCAMAAAAlvKiEAAABIFBMVEUAAACqqqqqqqqdnZ2fn5+WlpacnJyZmZmenp6Xl5eZmZmXl5eenp6ZmZmcnJyXl5eWlpaZmZmYmJiZmZmbm5uampqZmZmampqZmZmYmJiZmZmYmJiampqYmJiXl5eZmZmXl5eZmZmYmJiYmJiXl5eYmJiWlpaZmZmXl5eXl5eWlpaYmJiYmJiXl5eYmJiYmJiXl5eWlpaYmJiXl5eWlpaXl5eXl5eXl5eWlpaWlpaXl5eXl5eWlpaXl5eWlpaWlpaXl5eWlpaXl5eXl5eWlpaXl5eWlpaWlpaXl5eWlpaXl5eXl5eWlpaXl5eWlpaWlpaXl5eWlpaXl5eXl5eWlpaWlpaXl5eWlpaXl5eWlpaXl5eXl5eWlpaWlpaXl5eWlpbi4kBpAAAAX3RSTlMACQwNEBESFBUWGRsdHh8gIiMlKCkrLTAyNDc5Oj5AQUJGSEpMTU5QUVNVV1lgY2pscHR2gZO2uL7AwsfIyc/R1dbX2tvc3eDh4uTm5+nq7O3u8PLz9PX29/j5+vv9/ryGg5UAAADcSURBVBgZXcFnI0IBGAXgIxHZESGj7L03lS0iLknz/P9/4dxv79vzAMicRtBppcbrKLzNBslcDM5anVKIw8lWKQ9DcBYqlJcxOOmA8jYBZ/qT8jEFZ/Kd8jUDZ/yV8j0HZ/SZ8puBM3hPqa3CiRcozS04sRyltQOn54bS3oPTfcnQIayuM4aOYUQuGDqCEb2itPdh9OUorV0Y8VtKcxvG8COlvg4jUaRUszCSJcrPPIxUmRLMwkgHlHIKxmKFUkrCWPqjFBMwNhqUpxFYJ5S7AXgHLeb70Wn5vBfePzwlQq+9TnpVAAAAAElFTkSuQmCC"},4296:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"earnings-page"},[a("div",{staticClass:"banner"},[a("HeaderBar",{attrs:{title:t.coin+"收益记录",color:"transparent"}}),a("div",{staticClass:"content"},[a("div",{staticClass:"flex-wrap flex-top"},[a("div",{on:{click:function(e){return t.$router.push("/balance")}}},[a("h3",[t._v(t._s("FIL"==t.coin?t.userInfo.amount:0))]),a("span",[t._v("账户余额("+t._s(t.coin)+") "),a("img",{staticClass:"icon",attrs:{src:n("29dd")}})])]),a("div",{on:{click:function(e){return t.$router.push("/balance")}}},[a("h3",[t._v(t._s("FIL"==t.coin?t.userInfo.gasAmount:0))]),a("span",[t._v("gas费("+t._s(t.coin)+")")])])]),a("div",{staticClass:"flex-wrap"},[a("div",[a("h3",[t._v(t._s("FIL"==t.coin?t.userInfo.totalAmount:0))]),a("span",[t._v("累计收益("+t._s(t.coin)+")")])]),a("div",[a("h3",[t._v(t._s("FIL"==t.coin?t.userInfo.totalWithdraw:0))]),a("span",[t._v("累计提现("+t._s(t.coin)+")")])])]),a("div",{staticClass:"flex-wrap"},[a("div",[a("h3",[t._v(t._s("FIL"==t.coin?t.userInfo.pledge:0))]),a("span",[t._v("质押("+t._s(t.coin)+")")])]),a("div",[a("h3",[t._v(t._s("FIL"==t.coin?t.userInfo.poolAmount:0))]),a("span",[t._v("锁仓("+t._s(t.coin)+")")])])])])],1),a("div",{staticClass:"table"},[a("ul",[a("li",{staticClass:"head"},[a("span",[t._v("挖矿云储力(T)")]),a("span",[t._v("收益("+t._s(t.coin)+")")]),a("span",[t._v("收益类型")]),a("span",[t._v("时间 ")])])]),a("van-pull-refresh",{staticClass:"list",on:{refresh:t.onRefresh},model:{value:t.refreshing,callback:function(e){t.refreshing=e},expression:"refreshing"}},[t.list.length?a("van-list",{attrs:{finished:t.finished},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.list,(function(e,n){return a("van-cell",{key:n},[a("span",[t._v(t._s(t.userInfo.activeTAmount))]),a("span",[t._v(t._s("6"==e.optType?"-"+e.amount:e.amount))]),a("span",[t._v(t._s(t._f("changeOptType")(e.optType)))]),a("span",[t._v(t._s(t._f("fmtDate")(e.createTimeStamp,"full")))])])})),1):a("van-empty",{staticClass:"empty-image",attrs:{image:"./img/empty.png",description:"暂时还没有收益信息哦"}})],1)],1)])},i=[],s=(n("5ab2"),n("6d57"),n("e10e"),n("ce3c")),l=n("9f3a"),o=n("0c6d");function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){Object(s["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var p={data:function(){return{coin:"FIL",coinList:["BTC","ETH","EOS","XMR","FIL"],selectShow:!1,list:[],loading:!1,finished:!1,refreshing:!1,formData:{pageNum:1,pageSize:10},total:0}},mounted:function(){this.coin=this.$route.query.coin,"FIL"==this.coin&&this.getList()},methods:{getList:function(){var t=this;Object(o["y"])({pageNum:this.formData.pageNum,pageSize:this.formData.pageSize},{noLoading:!0}).then((function(e){t.refreshing&&(t.list=[],t.refreshing=!1);var n=e.result.list;t.total=e.result.total;for(var a=0;a<n.length;a++)t.list.push(n[a]);t.loading=!1,t.list.length>=t.total&&(t.finished=!0)}))},withdraw:function(){this.$router.push({path:"/withdraw",query:{coin:this.coin}})},onLoad:function(){this.formData.pageNum++,this.getList()},onRefresh:function(){this.formData.pageNum=1,this.finished=!1,this.loading=!0,this.getList(),this.$toast("刷新列表")},goBalance:function(){"FIL"==this.coin?this.$router.push("/balance"):this.$toast("暂未开放")},goLock:function(){"FIL"==this.coin?this.$router.push("/earningsLock"):this.$toast("暂未开放")}},computed:c({},Object(l["c"])(["userInfo"]))},u=p,m=(n("d06e"),n("9ca4")),f=Object(m["a"])(u,a,i,!1,null,"2f3c8ffe",null);e["default"]=f.exports},d06e:function(t,e,n){"use strict";var a=n("025a"),i=n.n(a);i.a}}]);