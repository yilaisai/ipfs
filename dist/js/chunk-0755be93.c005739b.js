(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0755be93"],{"65d1":function(e,t,a){"use strict";var r=a("757f"),o=a.n(r);o.a},"757f":function(e,t,a){},f0c0:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"auth1-page"},[a("HeaderBar",{attrs:{title:"实名认证",shadow:!0}}),a("div",{staticClass:"main"},[a("div",{staticClass:"inputBox"},[a("div",{staticClass:"name"},[a("span",[e._v("姓名")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.realName,expression:"realName",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"请输入"},domProps:{value:e.realName},on:{input:function(t){t.target.composing||(e.realName=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})]),a("div",{staticClass:"cardNoBox"},[a("span",[e._v("身份证号")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.cardNo,expression:"cardNo",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"请输入",oninput:"value=value.replace(/[^0-9|xX]/g,'')",onkeyup:"value=value.replace(/[^0-9|xX]/g,'')",onpaste:"value=value.replace(/[^0-9|xX]/g,'')"},domProps:{value:e.cardNo},on:{input:function(t){t.target.composing||(e.cardNo=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})])]),a("button",{staticClass:"full scale",on:{click:e.nextStep}},[e._v("下一步")])])],1)},o=[],s=a("0c6d"),n={data:function(){return{realName:"",cardNo:"",routeFrom:""}},created:function(){if(sessionStorage.getItem("authInfo")){var e=JSON.parse(sessionStorage.getItem("authInfo"));this.realName=e.realName,this.cardNo=e.cardNo}},methods:{nextStep:function(){var e=this;""!=this.realName?""!=this.cardNo?15==this.cardNo.length||18==this.cardNo.length?Object(s["A"])({realName:this.realName,cardNo:this.cardNo}).then((function(t){sessionStorage.setItem("authInfo",JSON.stringify({realName:e.realName,cardNo:e.cardNo})),e.$router.push("/auth2")})):this.$toast("请输正确的身份号"):this.$toast("请输入身份证号"):this.$toast("请输入姓名")}},beforeRouteLeave:function(e,t,a){"/my"==e.path&&"/auth2"==sessionStorage.getItem("frompath")?this.$dialog.confirm({message:"当前已提交部分认证信息,确定现在退出？",confirmButtonText:"确定"}).then((function(){sessionStorage.removeItem("authInfo"),a(!0)})).catch((function(){a(!1)})):a(!0)}},i=n,c=(a("65d1"),a("9ca4")),u=Object(c["a"])(i,r,o,!1,null,"50180eeb",null);t["default"]=u.exports}}]);