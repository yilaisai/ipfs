(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b67c5834"],{"2dea":function(e,a,p){"use strict";p.r(a);var n=function(){var e=this,a=e.$createElement,p=e._self._c||a;return p("div",{staticClass:"order_details-page"},[p("HeaderBar",{attrs:{title:"账单详情"}}),p("div",{staticClass:"main"},[p("h3",[e._v(e._s(e.pageInfo.typeStr)+"("+e._s(e.pageInfo.coinName)+")")]),p("h2",[e._v(e._s(0==e.pageInfo.subOrAdd?"-":"+")+e._s(7==e.pageInfo.optType?e.$BigNumber(e.pageInfo.amount).minus(e.pageInfo.fee):e.pageInfo.amount))]),p("ul",[p("li",[p("label",[e._v("类型")]),p("span",[e._v(e._s(e.pageInfo.typeStr))])]),p("li",[p("label",[e._v("状态")]),p("span",[e._v(e._s(1==e.pageInfo.recdStatus?"成功":"失败"))])]),0==e.pageInfo.optType||1==e.pageInfo.optType||7==e.pageInfo.optType||8==e.pageInfo.optType?p("li",[p("label",[e._v("主网")]),p("span",[e._v(e._s(9==e.pageInfo.coinId?"OMNI":"ERC20"))])]):e._e(),1==e.pageInfo.optType||7==e.pageInfo.optType?p("li",[p("label",[e._v("充币地址")]),p("span",[e._v(e._s(e.pageInfo.fromAddr))])]):e._e(),0==e.pageInfo.optType||8==e.pageInfo.optType?p("li",[p("label",[e._v("提币地址")]),p("span",[e._v(e._s(e.pageInfo.toAddr))])]):e._e(),0==e.pageInfo.optType||1==e.pageInfo.optType?p("li",[p("label",[e._v("TXID")]),p("span",[e._v(e._s(e.pageInfo.txId))])]):e._e(),0==e.pageInfo.optType||1==e.pageInfo.optType||7==e.pageInfo.optType||8==e.pageInfo.optType?p("li",[p("label",[e._v("手续费")]),p("span",[e._v(e._s(e.pageInfo.fee)+" USDT")])]):e._e(),p("li",[p("label",[e._v("时间")]),p("span",[e._v(e._s(e.pageInfo.createTime))])])])])],1)},o=[],t={data:function(){return{pageInfo:this.$route.query.data}},mounted:function(){console.log(this.$route.query.data)}},s=t,f=(p("4689"),p("9ca4")),l=Object(f["a"])(s,n,o,!1,null,"9ecd87a6",null);a["default"]=l.exports},4689:function(e,a,p){"use strict";var n=p("e278"),o=p.n(n);o.a},e278:function(e,a,p){}}]);