(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5f220601"],{"5d14":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"notice-details"},[a("HeaderBar",{attrs:{title:"公告详情"}}),t.pageData.title?a("div",{staticClass:"main"},[a("h3",[t._v(t._s(t.pageData.title))]),a("p",{staticClass:"time"},[t._v(t._s(t.$fmtDate(t.pageData.createTime,"full")))]),a("p",{staticClass:"content",domProps:{innerHTML:t._s(t.pageData.content)}})]):t._e()],1)},n=[],r=(a("6d57"),a("0c6d")),s={data:function(){return{pageData:{}}},mounted:function(){var t=this,e=JSON.parse(localStorage.getItem("readNoticeArr"))||[];Object(r["q"])({id:this.$route.query.id}).then((function(a){t.pageData=a.result;var i=!0;e.forEach((function(e,a){e==t.$route.query.id&&(i=!1)})),i&&(e.push(t.$route.query.id),localStorage.setItem("readNoticeArr",JSON.stringify(e)))}))},methods:{}},c=s,o=(a("b614"),a("9ca4")),u=Object(o["a"])(c,i,n,!1,null,"30bd6fa4",null);e["default"]=u.exports},"89dd":function(t,e,a){},b614:function(t,e,a){"use strict";var i=a("89dd"),n=a.n(i);n.a}}]);