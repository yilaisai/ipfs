(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-810c06c4"],{"1e14":function(t,a,e){},b929:function(t,a,e){"use strict";var s=e("1e14"),n=e.n(s);n.a},bbbf:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"withdraw-detail-page"},[e("HeaderBar",{attrs:{title:"提现详情",back:!0,shadow:!0,color:"white"}}),e("div",{staticClass:"main"},[e("ul",[e("li",{staticClass:"amount"},[e("span",[t._v("- "+t._s(t.detail.amount))]),e("span",[t._v("FIL")])]),t._m(0),t._m(1),e("li",[e("span",[t._v("状态")]),e("span",[t._v(t._s(t._f("filterStatus")(t.detail.recdStatus)))])]),0==t.detail.recdStatus?e("li",[e("span",[t._v("备注")]),e("span",[t._v(t._s(t.detail.sysRemark))])]):t._e(),e("li",[e("span",[t._v("提现地址")]),e("span",{staticClass:"word"},[t._v(t._s(t.detail.targetCoinAddr))])]),e("li",[e("span",[t._v("TXID")]),e("span",{staticClass:"word"},[t._v(t._s(t.detail.txId))])]),e("li",[e("span",[t._v("手续费")]),e("span",[t._v(t._s(t.detail.fee)+" FIL")])]),e("li",[e("span",[t._v("时间")]),e("span",[t._v(t._s(t._f("fmtDate")(t.detail.createTimestamp,"full"))+" ")])])])])],1)},n=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("li",[e("span",[t._v("类型")]),e("span",[t._v("提现")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("li",[e("span",[t._v("主网")]),e("span",[t._v("Filecoin")])])}],i={data:function(){return{detail:""}},mounted:function(){console.log(JSON.parse(this.$route.query.data)),this.detail=JSON.parse(this.$route.query.data)},methods:{},filters:{filterStatus:function(t){switch(t){case 0:return"提现失败";case 1:return"提现成功";case 2:return"待审核";case 3:return"审核成功";default:break}}}},r=i,l=(e("b929"),e("9ca4")),c=Object(l["a"])(r,s,n,!1,null,"5c5708ee",null);a["default"]=c.exports}}]);