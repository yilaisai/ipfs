(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-abeead24"],{"6e7d":function(t,e,n){},d1da:function(t,e,n){"use strict";var r=n("6e7d"),o=n.n(r);o.a},e002:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"setting-page"},[n("HeaderBar",{attrs:{title:"设置"}}),n("div",{staticClass:"main"},[n("van-cell-group",[n("van-cell",{attrs:{title:"头像","is-link":"",to:"/editAvatar"},scopedSlots:t._u([{key:"right-icon",fn:function(){return[n("img",{staticClass:"user-logo",attrs:{src:t.userInfo.iconUrl,alt:""}})]},proxy:!0}])}),n("van-cell",{attrs:{title:"昵称","is-link":"",value:t.userInfo.nickName,to:"/userinfo"}}),n("van-cell",{attrs:{title:"手机号",value:t.userInfo.phone+"（已绑定）"}}),n("van-cell",{attrs:{title:"登录密码","is-link":"",value:"修改",to:"/updateLoginPwd"}}),n("van-cell",{attrs:{title:"资金密码","is-link":"",value:0==t.userInfo.isSetFund?"未设置":"修改",to:"/updateFundsPwd"}}),t.version?n("van-cell",{attrs:{title:"版本号",value:t.version}}):t._e()],1),n("button",{staticClass:"logout",on:{click:t.logout}},[t._v("退出登录")])],1)],1)},o=[],i=(n("5ab2"),n("6d57"),n("e10e"),n("73d1")),a=(n("f548"),n("9f3a"));function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){Object(i["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var l={data:function(){return{checked:!0,version:!1}},mounted:function(){var t=this;this.$h5Plus.getAppVersion().then((function(e){t.version=e})).catch((function(e){t.version=window.H5_VERSION+"(H5)"}))},methods:{logout:function(){var t=this;this.$dialog.confirm({title:"提示",message:"确定要退出登录？"}).then((function(){localStorage.clear(),t.$router.replace("/login")})).catch((function(){}))}},computed:s({},Object(a["b"])(["userInfo"]))},u=l,f=(n("d1da"),n("9ca4")),d=Object(f["a"])(u,r,o,!1,null,"7cf8fee3",null);e["default"]=d.exports}}]);