(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c8e1b390"],{4813:function(t,o,s){"use strict";var e=s("abbb"),a=s.n(e);a.a},"4d05":function(t,o){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAoCAYAAACIC2hQAAAETUlEQVRYR+2YX2hbdRTHv997b2v/5KZapxPd5r+5h4oI6oMPIogvY8IQFGUobVMfujZNxtBqkVnSiqN1yDRNUuswSUEnlL0N9E1UfHF7m/NhyhhOB5pOaZO0sU1yj9yUtM1N0t40abuH/p4u95x7fp/fued8+XGIWiwR6qFoB4gTECogTyZi18Lw+YxahDdjsNpATWOfP6WqyhgET1tiXaSonnhf+0/V7lEVqD5xdhcyCycBvAFAKQNjgJwUKgPJnvZYNcCVZ3RqSnVOJ3sEHAZwR8HmpECkRAJklqQvHnsgAN9zmY0AVwTqCESfhSJ+Ch4v2oy8LCq9zBoZAcZK+gC/iCLeZE/Xt5XC2gJtHJ+8TxXjQwqOlKjrGRJD8djvAfh8S9kys35z/qhAhiFotWadkHNpaXgz5T7yh13gtUF9U/X63anjkOwJgA5L0HXrb506nhORkaRxzyl4Dy2sB1wW1BmMHBTgEwAHSgS5SBFPvK/LVkc3haJPqiIBoEgZTN25CsHxhNt1fi3YItCWUPghA8ppiBwu8eE0KO8mYtc3oJFCPRjtgMgIyN0lavwbKnXH4kdf+60U8AroxESTM1M/YAD9BBoKnZkRyrjWiMEZl2tmvd+0lr3V/4UzrWZ8gPQBqFvtK8ACgdMJzH8Atzu52pYDdQQnX4YYH5HYV3xSfG+o8Mx1u36uBtD6rePTcJuSpV+A5602AW4oYH/c3flV3sbGYHivSv5KsWbR7G92J3o7P6sloDWWHprsgBjRIlhiUc2wbdbbeXVZmJ2B8JCQg1ZnReP+2e4lx81ajf4zezRVK5YpYjTR6xpYzmjuIRJp0FO4DMEuAC154/aAyqwIZ5MptQ397XOFoACWNG+xH5C3txNUIH5q6fcT3d03i5op/0IPRkdvBdCku+uYtdQKdHQHdI1OtDaT+et3MlqVdPl8iqN13535GM23a/N/t690e1HXmy+2o0btHnLTmql5LPKYotFpF6SUn5HOJuc8XZdAyqaAOoPhswKal+xarPMJt+twzUFztyMtMwMpTEI1xBlF2VNz0OaPz+xW6rS/qgErFvvsI5sPSnwHQ76sCJx8CcDBlY7fAlCS4/Hezt5KQPVQZASCd7YFVA9G3wLwan5zyRqHkt6u6VIH2FZQRyDiJ+HJg5kNkurpuHHLgAIwABqAmGOf1aOfLMDcWKV4FfoSW1CjldRmOd8dUIuOXgFxoaLMCp4A8KjtrgcxCgP/2NkkLeq5/zzt16yCvyXyZAdw+dSCF+J9rq/LgeqhyIsQPpP3r8tqw/96X49vqOsdoeggRYYqAbQLWlN5avFHH86q8gOBeyuFZZmMCvinAlwxIAcI7F2Jyx8JlJziCWQ/gPvL1mjO4PffplN/UOpyWmZ7JbOp6+a8aEsuJbap1nKcmqp3xObM4W5jTeIBaU1bvMvWxLnSDR2B6Csk3hOiqhs+DUmCOJVwu6L/Aw3eYl+p6y7aAAAAAElFTkSuQmCC"},5060:function(t,o,s){"use strict";s.r(o);var e=function(){var t=this,o=t.$createElement,s=t._self._c||o;return s("div",{staticClass:"goods-detaild-page"},[s("HeaderBar",{attrs:{title:t.goods.name,shadow:!0}}),s("div",{staticClass:"main scroll-y"},[s("div",{staticClass:"goods"},[s("div",{staticClass:"details"},[s("div",{staticClass:"flex-wrap"},[t._m(0),s("span",[t._v(t._s(t.goods.tAmount)+" "),s("sub",[t._v("T")])])]),s("div",{staticClass:"flex-wrap"},[t._m(1),s("p",[t._v(t._s(t.goods.address))])]),s("div",{staticClass:"flex-wrap"},[t._m(2),s("span",[t._v(t._s(t.goods.remainAmount)+" "),s("sub",[t._v("T")])])]),s("div",{staticClass:"flex-wrap"},[t._m(3),s("span",[t._v(t._s(t.goods.proTime)+" "),s("sub",[t._v("个月")])])])]),s("div",{staticClass:"buybar"},[s("div",{staticClass:"price"},[s("h4",[t._v("现价 : "+t._s(t.goods.price)+"RMB/T")]),s("s",[t._v("原价 : "+t._s(t.goods.orgPrice)+"RMB/T")]),s("div",[s("span",[t._v("数量")]),s("van-stepper",{attrs:{integer:"",min:"1",max:t.goods.remainAmount},model:{value:t.goods.buyAmount,callback:function(o){t.$set(t.goods,"buyAmount",o)},expression:"goods.buyAmount"}})],1)]),s("van-button",{attrs:{type:"primary",size:"large"},on:{click:function(o){return t.$router.push({path:"/confirmOrder",query:{goods:t.goods}})}}},[t._v("立即购买")])],1)]),t._m(4)])],1)},a=[function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",[e("label",[t._v("发售存力")]),e("img",{attrs:{src:s("544e"),alt:""}})])},function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",[e("label",[t._v("托管机房")]),e("img",{attrs:{src:s("4d05"),alt:""}})])},function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",[e("label",[t._v("剩余存力")]),e("img",{attrs:{src:s("698f"),alt:""}})])},function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",[e("label",[t._v("合约期限")]),e("img",{attrs:{src:s("544e"),alt:""}})])},function(){var t=this,o=t.$createElement,s=t._self._c||o;return s("div",{staticClass:"text-details"},[s("h3",[t._v("合约详情")]),s("h4",[t._v("技术服务费")]),s("p",[t._v("收取挖矿产出 Filecoin 数量的 20% 作为技术服务费。技术服务费包括：矿场维护、矿机部署、矿机维修、人力资源支出等费用。")]),s("h4",[t._v("托管服务费")]),s("p",[t._v("用户购买星际云矿池的存储空间租赁服务即 IPFS·Filecoin 云存力服务已包含第一年托管费，托管费包括第一年服务期限内的 IP 地址费、电费、带宽费、网络安全、星际云矿池系统使用费等费用。")]),s("h4",[t._v("存力收益结算")]),s("p",[t._v("根据星际云矿池的每日实际挖矿收益及用户购买星际云合约的份额比例计算用户每日挖矿收益，扣除矿池收取的技术服务费后即为用户实际获得的挖矿收益。"),s("br"),t._v("Filecoin 云存力合约从 Filecoin 主网上线第八天开始计算收益，挖矿收益以 Filecoin 结算，挖矿产出收益 T+1 进入用户账户。"),s("br"),t._v("所有的规则及收益都是公开透明的，星际云矿池节点的地址也是公开透明且不可篡改的。星际云矿池也将按照 IPFS·Filecoin官方既定规则给予存力持有用户分配收益。")]),s("h4",[t._v("合约期限及终止")]),s("p",[t._v("1、存力合约有效期自 Filecoin 主网上线第八天开始计算（前七天为接入主网的调试时间）。"),s("br"),t._v("2、因 Filecoin 挖矿难度调整或币价发生剧烈波动，可能导致挖矿收益无法支付电费和托管费的情况，如果合约收入不足以支付托管费，服务器将停止运行，则合约自动终止。"),s("br"),t._v("3、如发生不可抗力事件，星际云矿池有权终止合约而不视为违约。不可抗力包括但不限于地震、台风、水灾、火灾等自然原因和战争、动乱、政府禁令等社会原因。")]),s("h4",[t._v("风险保障")]),s("p",[t._v("1、为保障客户的收益，降低客户挖矿产出风险，星际云矿池将会为租赁存力合约的用户配置 1:1 备用矿机，为其提供存力挖矿产出保障。即当矿机出现故障、损坏等情况，导致客户收益受损时，该部分损失由备用服务器的挖矿收益进行补充。备用服务器的有效期与存力合约的期限相同。"),s("br"),t._v("2、收益到账可能会遇到网络延迟或堵塞现象，星际云矿池会准备每天收益的两倍作为风险保证金，优先使用保证金垫付用户收益，最大程度避免发生到账延迟情况。")]),s("h4",[t._v("风险提示")]),s("p",[t._v("1 、Filecoin 通证有可能发生价格剧烈波动的情况，且挖矿难度会不定期调整。币价波动或挖矿难度调整都可能导致IPFS·Filecoin 云存力合约的收益变动。无论从数字货币还是法币角度，本合约不作退款承诺。用户须仔细评估自己的风险承受能力，在可接受的风控范围内投资数字货币挖矿。"),s("br"),t._v("2 、本合约不涉及数字资产交易，若用户自行参与第三方的数字资产交易，应当自行承担责任和风险。"),s("br"),t._v("3 、用户了解并接受，如因相关国家法律、法规和规范性文件的制定或者修改等客观情况发生变化，导致 Filecoin 挖矿行为被叫停或者禁止的，本协议自动终止，双方不得相互追究责任，由此造成的损失需自行承担。"),s("br"),t._v("合约发行方对本合约条款保留所有解释权。")])])}];function i(t){return i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}var n={name:"goodsDetails",data:function(){return{goods:null}},activated:function(){"object"==i(this.$route.query.goods)&&(this.goods=this.$route.query.goods)}},A=n,r=(s("4813"),s("9ca4")),l=Object(r["a"])(A,e,a,!1,null,"50d1a086",null);o["default"]=l.exports},"544e":function(t,o){t.exports="data:image/png;base64,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"},"698f":function(t,o){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAqCAYAAAAqAaJlAAAErUlEQVRYR+1ZXWgcVRT+zkzWJiazpoWKv6Falfr35A9KRREfklb7oNb4IOhuotXuRqkIRisiqFjShwZNZpNCmtn0RSyIYqoGFVEfKlIFEYuSgkJriWKDzc7Gn272fjK7O9PsZjeT2d2o1M7bnXt+vnvuuWfO/UYQ8DESyS0AVzpqQh5Jxbted000Duy9JKRnOz2TSnvL7nlo0h23mKObRWStMyYknY5FzCDuJYiwI2uYycMAL8vpCT6xY9HbXRth0+og8L47ppLN6ccjb7pjw7T2A7gzrytTdixyQRD/pw/Yxt1jbXoWrfNXL1T7Bbi48O6gEu1hd16E60Ux4ckLnlLQPnLHGjkA8Nb8mMeV6Hd4uorZUOjsn357tHOmUrTLRjY8aG2koB/AFUG2qXZZmQMwrsDYbDz6c6m9BWDDibENpBoHoNfuvGoLk3ZaXY/ebrtoV0vNGab1HYB1Vbuph6IIAT5rx6J9FcE2m9Z5GjBVOK0E+TlERurh388GKc2A2ilAU15WJux4ZENFsOFh63Jm4dVFQHrteGSnn6N6zRsJ6xCIqwr2Dtjx6PozYOsRXd/Itgwmr9Z0XptzpuR8grtOOa6cBuGRkVX4C6uCgkytDh9DZ+cf5fRKwE6KhhdcuVSzPi4tpvW8AC+Wd1oG7J49hvGn/gYEHSADfwEBzkHTdtlbI70LKlFxzhZNa8K1gcEa5mgfIE8HjWiRvIizyk2pWOTd+e9LIlsPsNanAAqfzCoh58Cql1KxLm+bHUu+YJuGxi4MZeWiXMoy2yYa9i2Ws4aZPADw5oLMlICvLAUyRZpAnCqDIjvsWGR7xciKfCNK2+LlrDrxdVHOLaXOloA9ZMej1ywF7Mrd+86Zm5s94cn6gQVqr7OVwBoD1jrRCx2aIlM9XV/MX8R/C6xpOU13RwFgxo5Hz6o72HDC2kaicLpFB3hugJz10sCoM1gSJ0Uw7WLJNGg3VVG6ig7YsoEtPQdV1tkKYAdH76JIW86JQKVj0eEa06Bsnb1HA+93ZghpAbCxmjTwqwhVHLBpQD5z7apMZuv/s3QtQ2SXr87+I2DDr43dCF0VPp9cTchzAXI2BcC7avsADgHYFOAL9qMAr7ryDdmQFbh0tSSsCSHa/SLpOy/cbse6dlTsDUoMVFe6HK6LGAaq6WXzCCg4CdGvS2998NtlBetU0bBpPUHgAUjAmwKFFB7RKX0z8cgHpdH3bRFb+61WNug5VjCrcY1AfbxYzvpubw0CJWC/0pR+n2tuZvqHo4HrbA1YfFV9L4zzLSyln/X1WIPA6Qu2DH30JYEkNId7Wt5HFJoJ9bJAVhQ8TdjxaGX6yBEq2gqHIKvqul3jwnJ+8UwpdbWQ8hwabacS54r8b1Ke39v4/QbE4+n5yy5PJg/tbadS/QCvrDFGwdTJOYj2tspkema3PfJLqfKijIpzTdezLKLpoeE9IfNNNnCQlKhnVOQWgfKabhE8qZR86M6LRhPEbYXxr6R4P08kxOyKBnXseHcxgewb2cXCceZvzRKTJTCxZpjJbiDPD5A4mu6JeAxO45C1JqTkXm/bdb6Teix62B0bg2N3Q3hpTlc4W3pP88P8N6RjRgFlhWkpAAAAAElFTkSuQmCC"},abbb:function(t,o,s){}}]);