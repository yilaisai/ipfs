(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c45b4d6"],{4194:function(t,A,o){"use strict";var a=o("41a7"),s=o.n(a);s.a},"41a7":function(t,A,o){},"4c63":function(t,A,o){"use strict";var a=function(){var t=this,A=t.$createElement,a=t._self._c||A;return a("div",[a("van-popup",{staticClass:"payPop",attrs:{"get-container":"body",closeable:"",round:"",position:"bottom"},model:{value:t.show,callback:function(A){t.show=A},expression:"show"}},[a("div",{staticClass:"title"},[a("span",[t._v("确认订单")])]),a("div",{staticClass:"content"},[a("div",{staticClass:"detailBox"},[a("div",[a("span",[t._v("商品名称")]),a("span",[t._v(t._s(t.item.name))])]),a("div",[a("span",[t._v("合约期限")]),a("span",[t._v(t._s(Math.floor(t.item.proTime/30)))])]),a("div",[a("span",[t._v("单价")]),a("span",[t._v("¥ "+t._s(t.item.price))])]),a("div",[a("span",[t._v("购买数量（T）")]),a("van-stepper",{attrs:{integer:"",min:"1",max:t.item.remainAmount},model:{value:t.item.buyAmount,callback:function(A){t.$set(t.item,"buyAmount",A)},expression:"item.buyAmount"}})],1)]),a("div",{staticClass:"inputBox"},[a("div",[a("span",[t._v("总金额")]),a("span",[t._v("¥ "+t._s(t.bigNumber(t.item.buyAmount).times(t.item.price)))])]),a("div",[a("span",[t._v("联系人")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],attrs:{type:"text"},domProps:{value:t.name},on:{input:function(A){A.target.composing||(t.name=A.target.value)}}})]),a("div",[a("span",[t._v("手机号码")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],attrs:{type:"number",maxlength:"11"},domProps:{value:t.phone},on:{input:function(A){A.target.composing||(t.phone=A.target.value)}}})])])]),a("div",{staticClass:"btns"},[a("div",{staticClass:"tips",on:{click:function(A){t.active=!t.active}}},[a("span",{class:[{active:t.active},"radio"]},[t.active?a("img",{attrs:{src:o("a62f"),alt:""}}):t._e()]),a("p",[t._v("我已阅读并同意")]),a("span",{staticClass:"agreement",on:{click:function(A){A.stopPropagation(),t.showTips=!0}}},[t._v("《租赁协议》")])]),a("van-button",{attrs:{type:"primary"},on:{click:t.confirmBuy}},[t._v("立即购买")])],1)]),a("van-dialog",{staticClass:"popTips",attrs:{title:"深圳星际云储存科技有限公司云储力租赁服务协议",showConfirmButton:!1,closeOnClickOverlay:""},model:{value:t.showTips,callback:function(A){t.showTips=A},expression:"showTips"}},[a("div",{staticClass:"text1"},[a("p",[t._v("甲方：已确认注册的用户")]),a("p",[t._v("乙方：深圳星际云储存科技有限公司")]),a("p",[t._v("统一社会信用代码:91440300MA5FMKMK8N ")])]),a("div",{staticClass:"text2"},[a("p",[t._v("乙方是一家专注于存储服务器研发、生产、销售、托管为一体的高科技企业，长期致力于分布式存储数据中心建设，通过在IPFS网络上提供存储及检索服务以获取IPFS通证奖励。")]),a("br"),a("p",[t._v("乙方基于IPFS通证激励机制定制生产服务器，进行大型数据库的搭建并提供相应算力存储，旨在为用户提供专业的服务器存储空间租赁服务，方便客户以简单方式参与到IPFS通证的奖励机制中来，同时也为用户提供手机端实时查询、更新服务器数据的后台服务。")]),a("br"),a("p",[t._v("云储力租赁是指甲方租赁乙方存储服务器的存储空间用于IPFS存储，租赁期间委托乙方管理，支付租赁费用和技术服务费，收取收益的行为。甲方签订本合约时已经确认并理解云储力租赁的具体含义。")]),a("br"),a("p",[t._v("甲方已经充分了解乙方相关产品及服务的相关运作原理和后续服务，认为该服务属于数据存储的高端服务，服务运行合法合规，已经充分认识到这将是未来的数据存储及传输技术，也充分知悉该业务的风险和商机。")]),a("br"),a("p",[t._v("甲乙双方经友好协商，本着平等自愿、诚信互的原则，就甲方租乙方存储服务器的储存空间(以下简称储存空间＂)并委托乙方进行托管服务的事项在深圳市罗湖区宝安北路3008号宝能中心A栋1603室达成如下条款，由双方共同恪守执行。")]),a("br"),a("h5",[t._v("第一条服务内容与方式")]),a("p",[t._v("1、甲方向乙方租赁分布式存储服务设备的存储空间，实际租赁数量以用户在本APP上填报为准，存储空间租赁单价以本APP显示价格为准。")]),a("p",[t._v("2、本协议所述租赁服务期自存储空间服务器安装及数据封装、测试完成之日起开始计算(本协议生效日至存储空间服务器安装及数据封装、测试完成不超过15-45个工作日)。合同有效期以本APP显示年限为准，到期后由双方参考市场价格协商确定续签，甲方应提前30天申请，同等条件下甲方享有优先续租权。")]),a("p",[t._v("3、存储空间有效期结束后，如双方未能继续合作，质押通证的释放以IPFS通证官方公布为准。")]),a("p",[t._v("4、自签约之日起，甲方需一次性向乙方支付本APP上显示的订单货款。")]),a("br"),a("h5",[t._v("第二条甲方收益发放")]),a("p",[t._v("1、乙方按照甲方所租赁的服务器存储空间容量占乙方服务器总存储空间容量的比例计算甲方每日应分配的IPFS通证奖励，扣除乙方应收取的托管服务费后即为用户实际获得的收益。")]),a("p",[t._v("2、甲方的租赁合约从账户激活之日起开始计算收益，收益以IPFS通证结算，乙方于每日向甲方账户结算并发放前日应分配的IPFS通证奖励(具体发放细则，以乙方公布为准)。")]),a("p",[t._v("3、托管服务费结算方式:乙方按照甲方每日应分配的IPFS通证奖励数量的25％收取托管服务费，在每日甲方应分配IPFS通证奖励中直接扣除。")]),a("br"),a("h5",[t._v("第三条甲方权益保障")]),a("p",[t._v("1、为保障甲方收益，乙方将不断提升技术实力，积极应对项目変化并及时作出有效调整，同时紧跟国家相关政策，最大限度的保证甲方相关收益。")]),a("p",[t._v("2、如因乙方技术原因导致甲方所租赁的存储设备无法产生IPFS通证奖励收益，甲方有权要求乙方根据本协议订单金额无息退款。")]),a("p",[t._v("3、如出现上述第三条第2款之情形，乙方应于甲方发出退款申请之日起三十个工作日内将甲方所支付相应货款无息退还至甲方指定账户。")]),a("br"),a("h5",[t._v("第四条免责条款")]),a("p",[t._v("1、分布式存储服务器空租赁服务属于特殊定制的服务，请谨慎选择，一经达成协议，如非因乙方主观违约，甲方所支付费用概不退还。")]),a("p",[t._v("2、IPFS通证目前具体收益均为预估值，双方均无异议。")]),a("p",[t._v("3、IPFS通证的价格会因市场发生剧烈波动的情况，本协议不作收益保障承诺，甲方需深入了解并谨慎选择投资。")]),a("p",[t._v("4、如因相关国家法律、法规和规范性文件的制定或者修改等客观情况发生变化，导致IPFS通证网络服务被叫停、或者禁止的，本协议自动终止，双方不得相互追究责任，由此造成的损失须自行承担，甲方已支付的费用概不退还。")]),a("p",[t._v("5、因不可抗力的因素导致乙方设备无法正常运作而致使甲方遭受损失的，乙方不承担责任，甲方对此无异议，并不会以任何理由对此提出抗辩或要求乙方承担责任。")]),a("p",[t._v("6、本协议不涉及数字资产交易，若甲方自行参与第三方的数字资产交易，应当自行承担责任和风险。")]),a("br"),a("h5",[t._v("第五条适用法律与争议解决")]),a("p",[t._v("本协议履行适用中华人民共和国的法律。任何基于本协议产生的或与协议相关的争议应由双方友好协商解決。如协商不成，任何一方均有权向合同签订地法院提起诉讼。")]),a("br"),a("h5",[t._v("第六条其他")]),a("p",[t._v("本协议自注册用户确认租赁乙方存储空间并实际付款后即时生效。")]),a("br"),a("h4",[t._v("风险告知函")]),a("br"),a("p",[t._v("您好，非常感谢您对深圳星际云储存科技有限公司(以下简称本公司)的信任，并租赁IPFS分布式存储服务器空间。请您仔细阅读以下内容，充分知晓相关风险。可能影响您资金投资及回收的您与本公司双方互不承担任何责任。")]),a("br"),a("h5",[t._v("第一、投资风险来源")]),a("p",[t._v("1、国家政策风险")]),a("p",[t._v("政府行为协议订立以后，政府颁布新的法律，政策或采取行政措施，可能导致协议不能履行或不能完全履行。")]),a("p",[t._v("2、不可抗力风险")]),a("p",[t._v("协议当事人在签订协议时不可预见，在协议履行过程中不可避免且不能克服的自然灾害、政府行为和社会性突发事件等不可抗力因素的出现，可能导致您的投资遭受损失。")]),a("p",[t._v("注:自然灾害:包括洪涝，干旱灾害.台风等气象灾害，火山、地震灾害，山体崩塌，滑坡、泥石流等地质灾害，风暴潮、海等海洋灾害，森林草原火灾和重大生物灾害等，战争等，可能导致协议不能履行或不能完全履行。")]),a("p",[t._v("3、因您的过错导致损失的风险")]),a("p",[t._v("该过错包括但不限于決策失误，操作不当、保管不当、遗忘或泄露密码、密码被他人破解、您使用的计算机系统被第三方侵入、您委托他人代理交易时他人恶意或不当操作等，可能导致您的资金损失。")]),a("p",[t._v("4、可能存在的其他风险。")]),a("br"),a("h5",[t._v("第二、投资人的禁止行为")]),a("p",[t._v("1、提供虚假信息;")]),a("p",[t._v("2、不具备任何投资风险意识、风险识别能力")]),a("p",[t._v("3、利用跟本公司的交易从事洗钱或其他违法、违纪行为;")]),a("br"),a("p",[t._v("如您租赁IPFS分布式存储服务器空间的投资过程中出现以上行为，您需依法承担由此产生的法律责任与所造成的一切损失。")]),a("br"),a("h5",[t._v("第三、投资人确认")]),a("p",[t._v("本《风险告知函》不能且无法揭示您租赁IPFS分布式存储设备及获取相关服务的商业行为可能面临的全部风险，在您决定进行IPFS分布式存储服务器投资时，您应对您可能面临的风险进行充分评估并审慎采取相关行动，签署相关协议。您应知悉，在相关政策风险、市场风险、不可抗力风险、您的过错导致的风险出现时，您应自担风险，本公司不对此承担任何责任。在您签署本风险提示函时，即视为您已充分阅读并理解本风险提示函的全部内容，且您已知悉需自行承担租IPFS分布式存储设备及获取相关服务的商业行为可能面临的相关风险并在此承诺不为禁止性行为。")])]),a("van-button",{on:{click:function(A){t.showTips=!1,t.active=!0}}},[t._v("我已阅读并同意")])],1)],1)},s=[],n=(o("cc57"),o("b1c1")),p=o.n(n),i=o("0c6d"),e={props:["showDialog","item"],data:function(){return{name:"",phone:"",active:!1,showTips:!1}},computed:{show:{get:function(){return this.showDialog},set:function(t){this.$emit("toggleShow",t)}}},methods:{bigNumber:function(t){return p()(t)},confirmBuy:function(){var t=this;this.name&&this.phone?this.active?Object(i["b"])({phone:this.phone,proId:this.item.id,realName:this.name,tAmount:this.item.buyAmount}).then((function(A){t.$toast(A.msg),t.show=!1,t.phone="",t.name="",t.active=!1,t.$router.push({path:"/my-orderDetail",query:{id:A.result}})})):this.$toast("请阅读并同意《租赁协议》！"):this.$toast("联系人、手机号码不能为空！")}}},v=e,r=(o("4194"),o("9ca4")),l=Object(r["a"])(v,a,s,!1,null,"87f5d972",null);A["a"]=l.exports},"4d05":function(t,A){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAoCAYAAACIC2hQAAAETUlEQVRYR+2YX2hbdRTHv997b2v/5KZapxPd5r+5h4oI6oMPIogvY8IQFGUobVMfujZNxtBqkVnSiqN1yDRNUuswSUEnlL0N9E1UfHF7m/NhyhhOB5pOaZO0sU1yj9yUtM1N0t40abuH/p4u95x7fp/fued8+XGIWiwR6qFoB4gTECogTyZi18Lw+YxahDdjsNpATWOfP6WqyhgET1tiXaSonnhf+0/V7lEVqD5xdhcyCycBvAFAKQNjgJwUKgPJnvZYNcCVZ3RqSnVOJ3sEHAZwR8HmpECkRAJklqQvHnsgAN9zmY0AVwTqCESfhSJ+Ch4v2oy8LCq9zBoZAcZK+gC/iCLeZE/Xt5XC2gJtHJ+8TxXjQwqOlKjrGRJD8djvAfh8S9kys35z/qhAhiFotWadkHNpaXgz5T7yh13gtUF9U/X63anjkOwJgA5L0HXrb506nhORkaRxzyl4Dy2sB1wW1BmMHBTgEwAHSgS5SBFPvK/LVkc3haJPqiIBoEgZTN25CsHxhNt1fi3YItCWUPghA8ppiBwu8eE0KO8mYtc3oJFCPRjtgMgIyN0lavwbKnXH4kdf+60U8AroxESTM1M/YAD9BBoKnZkRyrjWiMEZl2tmvd+0lr3V/4UzrWZ8gPQBqFvtK8ACgdMJzH8Atzu52pYDdQQnX4YYH5HYV3xSfG+o8Mx1u36uBtD6rePTcJuSpV+A5602AW4oYH/c3flV3sbGYHivSv5KsWbR7G92J3o7P6sloDWWHprsgBjRIlhiUc2wbdbbeXVZmJ2B8JCQg1ZnReP+2e4lx81ajf4zezRVK5YpYjTR6xpYzmjuIRJp0FO4DMEuAC154/aAyqwIZ5MptQ397XOFoACWNG+xH5C3txNUIH5q6fcT3d03i5op/0IPRkdvBdCku+uYtdQKdHQHdI1OtDaT+et3MlqVdPl8iqN13535GM23a/N/t690e1HXmy+2o0btHnLTmql5LPKYotFpF6SUn5HOJuc8XZdAyqaAOoPhswKal+xarPMJt+twzUFztyMtMwMpTEI1xBlF2VNz0OaPz+xW6rS/qgErFvvsI5sPSnwHQ76sCJx8CcDBlY7fAlCS4/Hezt5KQPVQZASCd7YFVA9G3wLwan5zyRqHkt6u6VIH2FZQRyDiJ+HJg5kNkurpuHHLgAIwABqAmGOf1aOfLMDcWKV4FfoSW1CjldRmOd8dUIuOXgFxoaLMCp4A8KjtrgcxCgP/2NkkLeq5/zzt16yCvyXyZAdw+dSCF+J9rq/LgeqhyIsQPpP3r8tqw/96X49vqOsdoeggRYYqAbQLWlN5avFHH86q8gOBeyuFZZmMCvinAlwxIAcI7F2Jyx8JlJziCWQ/gPvL1mjO4PffplN/UOpyWmZ7JbOp6+a8aEsuJbap1nKcmqp3xObM4W5jTeIBaU1bvMvWxLnSDR2B6Csk3hOiqhs+DUmCOJVwu6L/Aw3eYl+p6y7aAAAAAElFTkSuQmCC"},"544e":function(t,A){t.exports="data:image/png;base64,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"},"698f":function(t,A){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAqCAYAAAAqAaJlAAAErUlEQVRYR+1ZXWgcVRT+zkzWJiazpoWKv6Falfr35A9KRREfklb7oNb4IOhuotXuRqkIRisiqFjShwZNZpNCmtn0RSyIYqoGFVEfKlIFEYuSgkJriWKDzc7Gn272fjK7O9PsZjeT2d2o1M7bnXt+vnvuuWfO/UYQ8DESyS0AVzpqQh5Jxbted000Duy9JKRnOz2TSnvL7nlo0h23mKObRWStMyYknY5FzCDuJYiwI2uYycMAL8vpCT6xY9HbXRth0+og8L47ppLN6ccjb7pjw7T2A7gzrytTdixyQRD/pw/Yxt1jbXoWrfNXL1T7Bbi48O6gEu1hd16E60Ux4ckLnlLQPnLHGjkA8Nb8mMeV6Hd4uorZUOjsn357tHOmUrTLRjY8aG2koB/AFUG2qXZZmQMwrsDYbDz6c6m9BWDDibENpBoHoNfuvGoLk3ZaXY/ebrtoV0vNGab1HYB1Vbuph6IIAT5rx6J9FcE2m9Z5GjBVOK0E+TlERurh388GKc2A2ilAU15WJux4ZENFsOFh63Jm4dVFQHrteGSnn6N6zRsJ6xCIqwr2Dtjx6PozYOsRXd/Itgwmr9Z0XptzpuR8grtOOa6cBuGRkVX4C6uCgkytDh9DZ+cf5fRKwE6KhhdcuVSzPi4tpvW8AC+Wd1oG7J49hvGn/gYEHSADfwEBzkHTdtlbI70LKlFxzhZNa8K1gcEa5mgfIE8HjWiRvIizyk2pWOTd+e9LIlsPsNanAAqfzCoh58Cql1KxLm+bHUu+YJuGxi4MZeWiXMoy2yYa9i2Ws4aZPADw5oLMlICvLAUyRZpAnCqDIjvsWGR7xciKfCNK2+LlrDrxdVHOLaXOloA9ZMej1ywF7Mrd+86Zm5s94cn6gQVqr7OVwBoD1jrRCx2aIlM9XV/MX8R/C6xpOU13RwFgxo5Hz6o72HDC2kaicLpFB3hugJz10sCoM1gSJ0Uw7WLJNGg3VVG6ig7YsoEtPQdV1tkKYAdH76JIW86JQKVj0eEa06Bsnb1HA+93ZghpAbCxmjTwqwhVHLBpQD5z7apMZuv/s3QtQ2SXr87+I2DDr43dCF0VPp9cTchzAXI2BcC7avsADgHYFOAL9qMAr7ryDdmQFbh0tSSsCSHa/SLpOy/cbse6dlTsDUoMVFe6HK6LGAaq6WXzCCg4CdGvS2998NtlBetU0bBpPUHgAUjAmwKFFB7RKX0z8cgHpdH3bRFb+61WNug5VjCrcY1AfbxYzvpubw0CJWC/0pR+n2tuZvqHo4HrbA1YfFV9L4zzLSyln/X1WIPA6Qu2DH30JYEkNId7Wt5HFJoJ9bJAVhQ8TdjxaGX6yBEq2gqHIKvqul3jwnJ+8UwpdbWQ8hwabacS54r8b1Ke39v4/QbE4+n5yy5PJg/tbadS/QCvrDFGwdTJOYj2tspkema3PfJLqfKijIpzTdezLKLpoeE9IfNNNnCQlKhnVOQWgfKabhE8qZR86M6LRhPEbYXxr6R4P08kxOyKBnXseHcxgewb2cXCceZvzRKTJTCxZpjJbiDPD5A4mu6JeAxO45C1JqTkXm/bdb6Teix62B0bg2N3Q3hpTlc4W3pP88P8N6RjRgFlhWkpAAAAAElFTkSuQmCC"},a039:function(t,A){t.exports="data:image/png;base64,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"},a62f:function(t,A,o){t.exports=o.p+"img/ticked.040d0815.svg"}}]);