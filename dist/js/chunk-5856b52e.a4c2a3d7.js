(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5856b52e"],{6531:function(t,e,n){"use strict";var r=n("a440"),o=n.n(r);o.a},a440:function(t,e,n){},e002:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"setting-page"},[n("HeaderBar",{attrs:{title:"设置"},on:{goBack:t.goBack}}),n("div",{staticClass:"main"},[n("van-cell-group",[n("van-cell",{attrs:{title:"头像","is-link":"",to:"/editAvatar"},scopedSlots:t._u([{key:"right-icon",fn:function(){return[n("img",{staticClass:"user-logo",attrs:{src:t.userInfo.iconUrl,alt:""}})]},proxy:!0}])}),n("van-cell",{attrs:{title:"昵称","is-link":"",value:t.userInfo.nickName,to:"/userinfo"}}),n("van-cell",{attrs:{title:"手机号",value:t.userInfo.phone+"（已绑定）"}}),n("van-cell",{attrs:{title:"登录密码","is-link":"",value:"修改",to:"/updateLoginPwd"}}),n("van-cell",{attrs:{title:"资金密码","is-link":"",value:0==t.userInfo.isSetFundPwd?"未设置":"修改",to:"/updateFundsPwd"}}),n("van-cell",{attrs:{title:"实名认证","is-link":"",value:-1==t.userInfo.auditStatus?"未认证":0==t.userInfo.auditStatus?"未通过":2==t.userInfo.auditStatus?"审核中":1==t.userInfo.auditStatus?"已通过":"未认证"},on:{click:t.goAuth}}),t.version?n("van-cell",{attrs:{title:"版本号",value:t.version}}):t._e()],1),n("button",{staticClass:"logout",on:{click:t.logout}},[t._v("退出登录")])],1)],1)},o=[],a=(n("5ab2"),n("6d57"),n("e10e"),n("ce3c")),i=(n("f548"),n("9f3a"));function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){Object(a["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var c={data:function(){return{checked:!0,version:!1}},mounted:function(){var t=this;this.$h5Plus.getAppVersion().then((function(e){t.version=e})).catch((function(e){t.version=window.H5_VERSION+"(H5)"}))},methods:{logout:function(){var t=this;this.$dialog.confirm({title:"提示",message:"确定要退出登录？"}).then((function(){localStorage.clear(),t.$router.replace("/login")})).catch((function(){}))},goAuth:function(){2!=this.userInfo.auditStatus&&(-1==this.userInfo.auditStatus?this.$router.push("/auth1"):this.$router.push("/authStatus"))},goBack:function(){var t=this;setTimeout((function(){t.$router.replace("/my")}),50)}},computed:u({},Object(i["b"])(["userInfo"]))},l=c,f=(n("6531"),n("9ca4")),p=Object(f["a"])(l,r,o,!1,null,"68e974ab",null);e["default"]=p.exports}}]);