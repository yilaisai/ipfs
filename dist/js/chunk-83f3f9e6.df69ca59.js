(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-83f3f9e6"],{1825:function(a,t,r){"use strict";var e=r("93d1"),s=r.n(e);s.a},6413:function(a,t,r){a.exports=r.p+"img/cardFront.83f1f353.png"},"93d1":function(a,t,r){},b229:function(a,t,r){"use strict";r.r(t);var e=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"auth2-page"},[e("HeaderBar",{attrs:{title:"实名认证"}}),e("div",{staticClass:"main"},[e("p",{staticClass:"tips"},[a._v("证件需在有效期内，照片文字清晰可见，图片格式支持 JPG/PNG,大小不超过 2M")]),e("h4",[a._v("请上传您的身份证人像面")]),e("van-uploader",{attrs:{"after-read":a.uploadCardFront}},[e("img",{directives:[{name:"show",rawName:"v-show",value:!a.cardFrontUrl,expression:"!cardFrontUrl"}],staticClass:"default-img",attrs:{src:r("f62d")}}),e("img",{directives:[{name:"show",rawName:"v-show",value:a.cardFrontUrl,expression:"cardFrontUrl"}],staticClass:"default-img",attrs:{src:a.cardFrontUrl}})]),e("h4",[a._v("请上传您的身份证国徽面")]),e("van-uploader",{attrs:{"after-read":a.uploadCardBack}},[e("img",{directives:[{name:"show",rawName:"v-show",value:!a.cardBackUrl,expression:"!cardBackUrl"}],staticClass:"default-img",attrs:{src:r("6413")}}),e("img",{directives:[{name:"show",rawName:"v-show",value:a.cardBackUrl,expression:"cardBackUrl"}],staticClass:"default-img",attrs:{src:a.cardBackUrl}})]),e("button",{staticClass:"full scale",on:{click:a.nextStep}},[a._v("下一步")])],1)],1)},s=[],c=(r("cc57"),r("0c6d")),n=r("6be6"),i=r.n(n),o={data:function(){return{cardBackUrl:"",cardFrontUrl:""}},created:function(){if(sessionStorage.getItem("authInfo")){var a=JSON.parse(sessionStorage.getItem("authInfo"));console.log(a),this.cardBackUrl=a.cardBackUrl||"",this.cardFrontUrl=a.cardFrontUrl||""}},methods:{uploadCardBack:function(a){var t=this,r=a.file.size<3e5?.65:.5;i()(a.content,{quality:r}).then((function(r){var e={files:r.file,type:"userInfo",fileName:a.file.name};Object(c["A"])(e).then((function(a){t.cardBackUrl=a.result.urls[0]}))}))},uploadCardFront:function(a){var t=this,r=a.file.size<3e5?.65:.5;i()(a.content,{quality:r}).then((function(r){var e={files:r.file,type:"userInfo",fileName:a.file.name};Object(c["A"])(e).then((function(a){t.cardFrontUrl=a.result.urls[0]}))}))},nextStep:function(){var a=this;""!=this.cardBackUrl&&""!=this.cardFrontUrl?Object(c["checkCardImg"])({cardBackUrl:this.cardBackUrl,cardFrontUrl:this.cardFrontUrl}).then((function(t){var r=JSON.parse(sessionStorage.getItem("authInfo"));r.cardBackUrl=a.cardBackUrl,r.cardFrontUrl=a.cardFrontUrl,sessionStorage.setItem("authInfo",JSON.stringify(r)),a.$router.push("/auth3")})):this.$toast("图片未上传完成")}}},l=o,d=(r("1825"),r("9ca4")),u=Object(d["a"])(l,e,s,!1,null,"435b54b6",null);t["default"]=u.exports},f62d:function(a,t,r){a.exports=r.p+"img/cardBack.9031d176.png"}}]);