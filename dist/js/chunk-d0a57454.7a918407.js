(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d0a57454"],{"20fd":function(t,a,i){t.exports=i.p+"img/noData.3b572ea8.svg"},"432d":function(t,a,i){},"6b82":function(t,a,i){"use strict";i.r(a);var e=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"finance-record-page"},[e("HeaderBar",{staticClass:"header",attrs:{title:"交易记录",back:!0,color:"white"}}),e("van-tabs",{attrs:{sticky:"",color:"#2C353F"},on:{change:t.changeTable},model:{value:t.active,callback:function(a){t.active=a},expression:"active"}},t._l(3,(function(a,s){return e("van-tab",{key:s,attrs:{title:0==s?"全部":1==s?"进行中":"已结束"}},[t.list.length?e("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(a){t.loading=a},expression:"loading"}},[e("ul",[e("li",{staticClass:"nav"},[e("span",[t._v("资金名称")]),e("span",[t._v("累计收益")]),e("span",[t._v("状态")])]),t._l(t.list,(function(a,i){return e("li",{key:i},[e("span",[t._v(t._s(a.name))]),e("span",[t._v(t._s(a.reward))]),e("span",[t._v(t._s(0==a.isReward?"进行中":"已结束"))])])}))],2)]):e("div",{staticClass:"noData"},[e("img",{attrs:{src:i("20fd"),alt:""}}),e("span",[t._v("暂无交易记录哦，快去购买理财产品吧")])])],1)})),1)],1)},s=[],n=(i("82ae"),i("0c6d")),o={data:function(){return{active:0,list:[],totalPower:"",totalRewards:"",loading:!1,finished:!1,pageSize:10,pageNum:1,total:0,isReward:""}},mounted:function(){this.getList()},methods:{getList:function(){var t=this;Object(n["i"])({pageNum:this.pageNum,pageSize:this.pageSize,isReward:this.isReward}).then((function(a){200===a.code&&(t.total=a.result.total,t.list=t.list.concat(a.result.list),t.loading=!1,t.list.length>=t.total&&(t.finished=!0))}))},onLoad:function(){console.log("onload"),this.pageNum++,this.getList()},changeTable:function(){console.log(this.active),this.list=[],this.isReward=0==this.active?"":1==this.active?0:1;var t=document.getElementsByClassName("van-tabs__content");t[0].scrollTo(0,0),this.pageNum=1,this.loading=!1,this.finished=!1,this.getList()}}},l=o,c=(i("da31"),i("9ca4")),d=Object(c["a"])(l,e,s,!1,null,"775bf0a2",null);a["default"]=d.exports},da31:function(t,a,i){"use strict";var e=i("432d"),s=i.n(e);s.a}}]);