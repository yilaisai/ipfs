(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c025341"],{4486:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"auth2-page"},[a("HeaderBar",{attrs:{title:"实名认证"}}),a("div",{staticClass:"main"},[a("p",{staticClass:"tips"},[t._v("请您上传一张手持身份证正面照和个人签字的照片，个人签字的内容包含 (文案 : Hosen) 和 (当前日期 : xx 年 xx 月 xx 日)，请确保照片个人签字的内容清晰可见。")]),t._m(0),a("van-uploader",{attrs:{"after-read":t.uploadCardBack}},[a("img",{directives:[{name:"show",rawName:"v-show",value:!t.imgurl,expression:"!imgurl"}],staticClass:"default-img",attrs:{src:s("8457")}}),a("img",{directives:[{name:"show",rawName:"v-show",value:t.imgurl,expression:"imgurl"}],staticClass:"default-img",attrs:{src:t.imgurl}})]),a("button",{staticClass:"full scale",on:{click:t.nextStep}},[t._v("提交认证")])],1)],1)},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("p",{staticClass:"tips2"},[t._v("1、人像清晰 "),s("br"),t._v("2、证件号码清晰"),s("br"),t._v("3、手写文字清晰"),s("br"),t._v("4、手写文字包含规定文案及当前日期")])}],n=(s("cc57"),s("0c6d")),r=s("6be6"),c=s.n(r),u={data:function(){return{name:"",id:"",imgurl:""}},methods:{uploadCardBack:function(t){var e=this,s=t.file.size<3e5?.65:.5;c()(t.content,{quality:s}).then((function(s){var a={files:s.file,type:"userInfo",fileName:t.file.name};Object(n["A"])(a).then((function(t){e.imgurl=t.result.urls[0]}))}))},nextStep:function(){var t=this;""!=this.imgurl?Object(n["updateSeniorImg"])({imgurl:this.imgurl}).then((function(e){t.$toast.success(e.msg),t.$router.push("/my")})):this.$toast("图片未上传完成")}}},l=u,o=(s("c613"),s("9ca4")),m=Object(o["a"])(l,a,i,!1,null,"c37e43da",null);e["default"]=m.exports},8457:function(t,e,s){t.exports=s.p+"img/senior.e25f7aca.png"},c613:function(t,e,s){"use strict";var a=s("d1f5"),i=s.n(a);i.a},d1f5:function(t,e,s){}}]);