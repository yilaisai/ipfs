(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7f0de42c"],{"160f":function(t,e,o){},"418e":function(t,e,o){"use strict";var s=o("160f"),r=o.n(s);r.a},8866:function(t,e,o){"use strict";o.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"confirm-order-page"},[s("HeaderBar",{attrs:{title:"确认订单",shadow:!0}}),s("div",{staticClass:"main"},[s("div",{staticClass:"goods"},[s("h3",[t._v(t._s(t.goods.name))]),s("div",{staticClass:"content"},[s("img",{attrs:{src:o("d409"),alt:""}}),s("div",{staticClass:"ctn-right"},[s("h4",[t._v(t._s(t.goods.name))]),s("div",[s("span",[t._v("¥ "+t._s(t.goods.price))]),s("label",[t._v("数量")]),s("van-stepper",{attrs:{integer:"",min:"1",max:t.goods.remainAmount},model:{value:t.goods.buyAmount,callback:function(e){t.$set(t.goods,"buyAmount",e)},expression:"goods.buyAmount"}})],1)])]),s("p",[s("label",[t._v("购买帐号")]),s("span",[t._v(t._s(t.userInfo.phone))])]),s("h5",[s("p",[s("label",[t._v("商品小计")]),s("span",[t._v("¥ "+t._s(t.$BigNumber(t.goods.price).times(t.goods.buyAmount)))])])])]),s("van-button",{attrs:{type:"primary",size:"large"},on:{click:t.pay}},[t._v("立即支付")])],1)],1)},r=[],n=(o("5ab2"),o("6d57"),o("e10e"),o("73d1")),a=(o("f548"),o("9f3a"));function c(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,s)}return o}function i(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?c(Object(o),!0).forEach((function(e){Object(n["a"])(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):c(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var u={data:function(){return{value:1,goods:{}}},created:function(){this.goods=this.$route.query.goods,console.log(this.goods)},methods:{pay:function(){this.$router.replace("/checkstand?price="+this.$BigNumber(this.goods.price).times(this.goods.buyAmount))}},computed:i({},Object(a["b"])(["userInfo","assetInfo"]))},p=u,d=(o("418e"),o("9ca4")),l=Object(d["a"])(p,s,r,!1,null,"153c65e0",null);e["default"]=l.exports},d409:function(t,e,o){t.exports=o.p+"img/goods1.fe3990bb.png"}}]);