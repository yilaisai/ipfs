(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09e596d9"],{"6b68":function(t,e,s){"use strict";var a=s("a83b"),i=s.n(a);i.a},a83b:function(t,e,s){},ad38:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"transfer-record-page"},[s("HeaderBar",{attrs:{title:"存力转移记录"}}),s("van-tabs",{attrs:{swipeable:"",border:!1,color:"#000000","title-active-color":"#000000","title-inactive-color":"#969696"},on:{change:t.getData},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[s("van-tab",{attrs:{title:"全部"}},[s("ul",[t._l(t.list0,(function(e,a){return s("li",{key:a},[s("div",[s("h3",{class:{red:1!=e.subOrAdd}},[t._v(t._s(1==e.subOrAdd?"+":"-")+t._s(e.tamount)+" "),s("sub",[t._v("T")])]),s("span",[t._v("来自 "+t._s(e.fromPhone))])]),s("div",[s("span",[t._v(t._s(e.name))]),s("span",[t._v(t._s(e.id))])]),s("div",[s("span",[t._v(t._s(0==e.isActive?"未激活":"已激活"))]),s("p",[t._v("时间 : "+t._s(t.$fmtDate(e.createTimeStamp,"full")))])])])})),0==t.list0.length?s("van-empty",{attrs:{description:"暂无记录"}}):t._e()],2)]),s("van-tab",{attrs:{title:"转入"}},[s("ul",[t._l(t.list1,(function(e,a){return s("li",{key:a},[s("div",[s("h3",{class:{red:1!=e.subOrAdd}},[t._v(t._s(1==e.subOrAdd?"+":"-")+t._s(e.tamount)+" "),s("sub",[t._v("T")])]),s("span",[t._v("来自 "+t._s(e.fromPhone))])]),s("div",[s("span",[t._v(t._s(e.name))]),s("span",[t._v(t._s(e.id))])]),s("div",[s("span",[t._v(t._s(0==e.isActive?"未激活":"已激活"))]),s("p",[t._v("时间 : "+t._s(t.$fmtDate(e.createTimeStamp,"full")))])])])})),0==t.list1.length?s("van-empty",{attrs:{description:"暂无记录"}}):t._e()],2)]),s("van-tab",{attrs:{title:"转出"}},[s("ul",[t._l(t.list2,(function(e,a){return s("li",{key:a},[s("div",[s("h3",{class:{red:1!=e.subOrAdd}},[t._v(t._s(1==e.subOrAdd?"+":"-")+t._s(e.tamount)+" "),s("sub",[t._v("T")])]),s("span",[t._v("来自 "+t._s(e.fromPhone))])]),s("div",[s("span",[t._v(t._s(e.name))]),s("span",[t._v(t._s(e.id))])]),s("div",[s("span",[t._v(t._s(0==e.isActive?"未激活":"已激活"))]),s("p",[t._v("时间 : "+t._s(t.$fmtDate(e.createTimeStamp,"full")))])])])})),0==t.list2.length?s("van-empty",{attrs:{description:"暂无记录"}}):t._e()],2)])],1)],1)},i=[],n=s("0c6d"),r={data:function(){return{active:0,list0:[],list1:[],list2:[],pageNum:1,pageSize:1e3}},mounted:function(){this.getData(0)},methods:{showHelp:function(){this.$dialog.alert({message:"有效船员是指<br/>等级达到Lv1及以上的船员",confirmButtonText:"我知道了"}).then((function(){}))},getData:function(t){var e=this;Object(n["n"])({type:t,pageNum:this.pageNum,pageSize:this.pageSize}).then((function(s){e["list"+t]=s.result.list}))}}},l=r,v=(s("6b68"),s("9ca4")),c=Object(v["a"])(l,a,i,!1,null,"6d1450a6",null);e["default"]=c.exports}}]);