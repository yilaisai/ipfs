(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cb6ab96c"],{1355:function(t,e,n){},"20fd":function(t,e,n){t.exports=n.p+"img/noData.3b572ea8.svg"},"2a6f":function(t,e,n){"use strict";var r=n("1355"),i=n.n(r);i.a},"4e69":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"myOrders-page"},[r("HeaderBar",{staticClass:"header",attrs:{title:"我的订单",back:!0,color:"white"}}),r("van-tabs",{attrs:{sticky:"",color:"#2C353F","immediate-check":!1,"before-change":t.beforeChange},on:{change:t.changeTable},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},t._l(4,(function(e){return r("van-tab",{key:e,attrs:{title:1==e?"全部":2==e?"审核中":3==e?"已完成":"已取消"}},[t.list.length?r("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[r("ul",t._l(t.list,(function(e,i){return r("li",{key:i},[r("div",{staticClass:"item-content",on:{click:function(n){return t.$router.push({path:"/my-orderDetail",query:{id:e.id}})}}},[r("div",{staticClass:"item-top"},[r("span",[t._v("订单号")]),r("span",[t._v(t._s(e.id))])]),r("div",{staticClass:"item-btm"},[r("div",{staticClass:"name"},[r("span",[t._v(t._s(e.name))]),r("span",[t._v("x"+t._s(e.amount))])]),r("div",{staticClass:"amount"},[r("span",[t._v("¥ "+t._s(e.price)+"T")]),r("span",[t._v("实付 ¥"),r("i",[t._v(t._s(t.bigNumber(e.amount).times(e.price)))])])]),0==e.status?r("img",{attrs:{src:n("d09c"),alt:""}}):1==e.status?r("img",{attrs:{src:n("5c06"),alt:""}}):2==e.status?r("img",{attrs:{src:n("9e61"),alt:""}}):3==e.status?r("img",{attrs:{src:n("d49f"),alt:""}}):t._e()])]),0==e.status?r("div",{staticClass:"item-btn"},[r("van-button",{staticClass:"btn",on:{click:function(n){t.activeItem=e,t.showConfirm=!0}}},[t._v("取消订单")])],1):t._e()])})),0)]):t.finished?r("div",{staticClass:"noData"},[r("img",{attrs:{src:n("20fd"),alt:""}}),r("span",[t._v("暂无订单")])]):t._e()],1)})),1),r("van-dialog",{attrs:{title:"确认取消订单","show-cancel-button":""},on:{cancel:function(e){t.showConfirm=!1},confirm:t.cancelOrder},model:{value:t.showConfirm,callback:function(e){t.showConfirm=e},expression:"showConfirm"}})],1)},i=[];n("6a61");function a(t,e,n,r,i,a,o){try{var s=t[a](o),c=s.value}catch(u){return void n(u)}s.done?e(c):Promise.resolve(c).then(r,i)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(r,i){var o=t.apply(e,n);function s(t){a(o,r,i,s,c,"next",t)}function c(t){a(o,r,i,s,c,"throw",t)}s(void 0)}))}}n("82ae");var s=n("0c6d"),c=n("b1c1"),u=n.n(c),h={data:function(){return{active:0,list:[],auditList:[],finishList:[],cancelList:[],totalPower:"",totalRewards:"",loading:!1,finished:!1,pageSize:10,pageNum:1,total:0,status:"",showConfirm:!1,activeItem:""}},mounted:function(){this.getData()},methods:{getList:function(){var t=o(regeneratorRuntime.mark((function t(){var e,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=this.active,0!=this.active){t.next=12;break}return t.next=4,this.getData();case 4:if(e=t.sent,n==this.active){t.next=7;break}return t.abrupt("return");case 7:this.total=e.total,this.list=this.list.concat(e.list),this.list.length>=this.total&&(this.finished=!0),t.next=43;break;case 12:if(1!=this.active){t.next=24;break}return t.next=15,this.getData();case 15:if(e=t.sent,n==this.active){t.next=18;break}return t.abrupt("return");case 18:this.total=e.total,this.auditList=this.auditList.concat(e.list),this.auditList.length>=this.total&&(this.finished=!0),console.log(this.auditList.length),t.next=43;break;case 24:if(2!=this.active){t.next=35;break}return t.next=27,this.getData();case 27:if(e=t.sent,n==this.active){t.next=30;break}return t.abrupt("return");case 30:this.total=e.total,this.finishList=this.finishList.concat(e.list),this.finishList.length>=this.total&&(this.finished=!0,console.log("finished")),t.next=43;break;case 35:return t.next=37,this.getData();case 37:if(e=t.sent,n==this.active){t.next=40;break}return t.abrupt("return");case 40:this.total=e.total,this.cancelList=this.cancelList.concat(e.list),this.cancelList.length>=this.total&&(this.finished=!0);case 43:this.loading=!1;case 44:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),getData:function(){var t=this;Object(s["v"])({pageNum:this.pageNum,pageSize:this.pageSize,status:this.status}).then((function(e){200===e.code&&(t.total=e.result.total,t.list=t.list.concat(e.result.list),t.loading=!1,t.list.length>=t.total&&(t.finished=!0))}))},onLoad:function(){console.log("onload"),console.log(this.loading),this.pageNum++,this.getData()},changeTable:function(){console.log("第"+(this.active+1)+"个报表"),this.list=[],this.auditList=[],this.finishList=[],this.cancelList=[],this.status=0==this.active?"":1==this.active?0:2==this.active?1:4;var t=document.getElementsByClassName("van-tabs__content");t[0].scrollTo(0,0),this.pageNum=1,this.loading=!1,this.finished=!1,this.getData()},beforeChange:function(){return console.log(this.loading),!this.loading&&!!(this.loading||this.finished||1!=this.pageNum||this.list.length)},bigNumber:function(t){return u()(t)},cancelOrder:function(){var t=this;Object(s["C"])({id:this.activeItem.id,status:3}).then((function(e){t.$toast(e.msg),t.pageNum=1,t.list=[],t.getData()}))}}},l=h,f=(n("2a6f"),n("9ca4")),d=Object(f["a"])(l,r,i,!1,null,"4ecbfa01",null);e["default"]=d.exports},"5c06":function(t,e,n){t.exports=n.p+"img/order-finish.bdb3a006.svg"},"6a61":function(t,e,n){var r=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",o=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(S){c=function(t,e,n){return t[e]=n}}function u(t,e,n,r){var i=e&&e.prototype instanceof g?e:g,a=Object.create(i.prototype),o=new j(r||[]);return a._invoke=E(t,n,o),a}function h(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(S){return{type:"throw",arg:S}}}t.wrap=u;var l="suspendedStart",f="suspendedYield",d="executing",p="completed",v={};function g(){}function m(){}function y(){}var b={};b[a]=function(){return this};var w=Object.getPrototypeOf,x=w&&w(w(D([])));x&&x!==n&&r.call(x,a)&&(b=x);var L=y.prototype=g.prototype=Object.create(b);function _(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function k(t,e){function n(i,a,o,s){var c=h(t[i],t,a);if("throw"!==c.type){var u=c.arg,l=u.value;return l&&"object"===typeof l&&r.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,o,s)}),(function(t){n("throw",t,o,s)})):e.resolve(l).then((function(t){u.value=t,o(u)}),(function(t){return n("throw",t,o,s)}))}s(c.arg)}var i;function a(t,r){function a(){return new e((function(e,i){n(t,r,e,i)}))}return i=i?i.then(a,a):a()}this._invoke=a}function E(t,e,n){var r=l;return function(i,a){if(r===d)throw new Error("Generator is already running");if(r===p){if("throw"===i)throw a;return P()}n.method=i,n.arg=a;while(1){var o=n.delegate;if(o){var s=C(o,n);if(s){if(s===v)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===l)throw r=p,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=d;var c=h(t,e,n);if("normal"===c.type){if(r=n.done?p:f,c.arg===v)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=p,n.method="throw",n.arg=c.arg)}}}function C(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator["return"]&&(n.method="return",n.arg=e,C(t,n),"throw"===n.method))return v;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var i=h(r,t.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,v;var a=i.arg;return a?a.done?(n[t.resultName]=a.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,v):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,v)}function N(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(N,this),this.reset(!0)}function D(t){if(t){var n=t[a];if(n)return n.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var i=-1,o=function n(){while(++i<t.length)if(r.call(t,i))return n.value=t[i],n.done=!1,n;return n.value=e,n.done=!0,n};return o.next=o}}return{next:P}}function P(){return{value:e,done:!0}}return m.prototype=L.constructor=y,y.constructor=m,m.displayName=c(y,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,c(t,s,"GeneratorFunction")),t.prototype=Object.create(L),t},t.awrap=function(t){return{__await:t}},_(k.prototype),k.prototype[o]=function(){return this},t.AsyncIterator=k,t.async=function(e,n,r,i,a){void 0===a&&(a=Promise);var o=new k(u(e,n,r,i),a);return t.isGeneratorFunction(n)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},_(L),c(L,s,"Generator"),L[a]=function(){return this},L.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=D,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(O),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function i(r,i){return s.type="throw",s.arg=t,n.next=r,i&&(n.method="next",n.arg=e),!!i}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],s=o.completion;if("root"===o.tryLoc)return i("end");if(o.tryLoc<=this.prev){var c=r.call(o,"catchLoc"),u=r.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return i(o.catchLoc,!0);if(this.prev<o.finallyLoc)return i(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return i(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return i(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var a=i;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=t,o.arg=e,a?(this.method="next",this.next=a.finallyLoc,v):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),O(n),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;O(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:D(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=r}catch(i){Function("r","regeneratorRuntime = r")(r)}},"9e61":function(t,e,n){t.exports=n.p+"img/order-fail.acf453fc.svg"},d09c:function(t,e,n){t.exports=n.p+"img/order-audit.272798dc.svg"},d49f:function(t,e,n){t.exports=n.p+"img/order-cancel.0552b86e.svg"}}]);