(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-22d5b1b9"],{"20fd":function(t,a,e){t.exports=e.p+"img/noData.3b572ea8.svg"},"6b82":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"finance-record-page"},[i("HeaderBar",{staticClass:"header",attrs:{title:"交易记录",back:!0,color:"white"}}),i("van-tabs",{attrs:{sticky:"",color:"#2C353F"},on:{change:t.changeTable},model:{value:t.active,callback:function(a){t.active=a},expression:"active"}},t._l(3,(function(a,n){return i("van-tab",{key:n,attrs:{title:0==n?"全部":1==n?"进行中":"已结束"}},[t.list.length?i("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(a){t.loading=a},expression:"loading"}},[i("ul",t._l(t.list,(function(a,e){return i("li",{key:e,on:{click:function(e){t.$router.push({path:"/finance-detail",query:{data:JSON.stringify(a)}})}}},[i("span",[t._v(t._s(a.name))]),i("span",[t._v(t._s(0==a.isReward?a.amount:t.bigNumber(a.amount).plus(a.reward)))]),i("span",[t._v(t._s(0==a.isReward?"进行中":"已结束"))])])})),0)]):i("div",{staticClass:"noData"},[i("img",{attrs:{src:e("20fd"),alt:""}}),i("span",[t._v("暂无交易记录哦，快去购买理财产品吧")])])],1)})),1)],1)},n=[],s=(e("82ae"),e("0c6d")),o=e("b1c1"),c=e.n(o),l={data:function(){return{active:0,list:[],totalPower:"",totalRewards:"",loading:!1,finished:!1,pageSize:20,pageNum:1,total:0,isReward:""}},mounted:function(){this.getList()},methods:{getList:function(){var t=this;Object(s["j"])({pageNum:this.pageNum,pageSize:this.pageSize,isReward:this.isReward}).then((function(a){200===a.code&&(t.total=a.result.total,t.list=t.list.concat(a.result.list),t.loading=!1,t.list.length>=t.total&&(t.finished=!0))}))},onLoad:function(){console.log("onload"),this.pageNum++,this.getList()},changeTable:function(){console.log(this.active),this.list=[],this.isReward=0==this.active?"":1==this.active?0:1;var t=document.getElementsByClassName("van-tabs__content");t[0].scrollTo(0,0),this.pageNum=1,this.loading=!1,this.finished=!1,this.getList()},bigNumber:function(t){return c()(t)}}},r=l,u=(e("91f2"),e("9ca4")),d=Object(u["a"])(r,i,n,!1,null,"bf5b6c90",null);a["default"]=d.exports},"91f2":function(t,a,e){"use strict";var i=e("9c0c"),n=e.n(i);n.a},"9c0c":function(t,a,e){}}]);