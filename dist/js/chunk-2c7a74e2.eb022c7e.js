(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2c7a74e2"],{6615:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"edit-avatar-page"},[r("HeaderBar",{attrs:{title:"个人头像"}}),r("div",{staticClass:"main"},[r("van-uploader",{attrs:{"after-read":e.imgSelected,"max-size":5242880},on:{oversize:e.imgOversize}},[r("img",{attrs:{src:e.userInfo.iconUrl,alt:""}})])],1)],1)},c=[],i=(r("5ab2"),r("6d57"),r("e10e"),r("73d1")),a=(r("cc57"),r("9f3a")),o=r("0c6d"),s=r("6be6"),u=r.n(s);function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){Object(i["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var p={data:function(){return{}},methods:{imgSelected:function(e){var t=this;u()(e.content,{quality:.8}).then((function(r){var n={files:r.file,type:"AVATAR",fileName:e.file.name};Object(o["A"])(n).then((function(e){console.log(e.result.urls[0]),Object(o["c"])({iconUrl:e.result.urls[0],type:1}).then((function(e){t.$store.dispatch("getUserInfo")}))}))}))},imgOversize:function(e){this.$toast.fail("图片过大！请选择5M以内的图片")}},computed:l({},Object(a["b"])(["userInfo"]))},b=p,O=(r("832d"),r("9ca4")),d=Object(O["a"])(b,n,c,!1,null,"270561ae",null);t["default"]=d.exports},"6f07":function(e,t,r){},"832d":function(e,t,r){"use strict";var n=r("6f07"),c=r.n(n);c.a}}]);