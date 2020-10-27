<template>
  <div class='recharge-page'>
    <HeaderBar title="充值" :back="true" :shadow="true" color="white" class="header"></HeaderBar>
    <div class="main">
      <div class="flex-wrap amount-wrap">
        <label>充值数量</label>
        <div>
          <input type="text" v-model="amount" placeholder="请输入充值数量" @input="amountInput">
        </div>
      </div>
      <div class="flex-wrap">
        <label>请向以下地址进行转账</label>
        <div class="copyBox">
          <span class="text">{{address}}</span>
          <span class="line"></span>
          <span class="copy" v-clipboard:copy="address" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span>
        </div>
      </div>
      <div class="flex-wrap tips">
        <p>温馨提示：</p>
        <p class="red">1、请确保实际转账数量与上方填写数量一致；</p>
        <p class="red">2、转账后请务必上传转账凭证，等待平台审核是否到账。</p>
      </div>
      <div class="flex-wrap">
        <label>TXID</label>
        <textarea v-model="TXID" placeholder="请输入TXID"></textarea>
      </div>
      <div class="flex-wrap">
        <label>上传充值凭证（最多3张）</label>
        <van-uploader v-model="fileList" :after-read="afterRead" @delete="deleteImg"  multiple max-count="3" />
      </div>
    </div>
    <footer>
			<button class="full scale" @click="recharge">提交</button>
		</footer>
  </div>
</template>
<script>
  import {getCaptchaPhone, withDraw, uploadFile} from '@/api/request'
  import CountDownBtn from '@/components/common/countDownBtn.vue'
  import Md5 from 'js-md5'
  import lrz from 'lrz'
  export default {
    data() {
      return { 
        amount:'',
        address:'078b24fb3c1f844cd54ee4c99c5c7b397576d295138deb0b51d218db017d12cb',
        TXID:'',
        fileList:[],
        urls:[]
      }
    },
    mounted(){
    },
    methods: {
      amountInput(){
        this.amount = this.amount + ""
        this.amount = this.amount.replace(/^\.$/g,"")  //清除第一个“.”   
        this.amount = this.amount.replace(/[^\d.]/g,"")  //清除“数字”和“.”以外的字符   
        this.amount = this.amount.replace(/\.{2,}/g,".") //只保留第一个. 清除多余的   
        this.amount = this.amount.replace(".","$#$").replace(/\./g,"").replace("$#$",".")  
        this.amount = this.amount.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3') //只能输入四个小数   
        if(this.amount.indexOf(".") < 0 && this.amount != ""){ //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
          this.amount = parseFloat(this.amount)
        }
      },
      recharge(){
        
      },
      onCopy(){
        this.$toast('复制成功')
      },
      onError(err){
        this.$toast('复制失败，请手动复制')
      },
      afterRead(filesObj){
        filesObj.status = 'uploading';
        filesObj.message = '上传中...';
        lrz(filesObj.content, {quality: 0.8}).then((rst)=>{
          const params = {
            files: rst.file,
            type: 'AVATAR',
            fileName: filesObj.file.name,
				  }
          uploadFile(params).then(res=>{
            filesObj.status = ''
            filesObj.message = '';
            this.urls.push(res.result.urls[0])
            console.log(this.urls)
          }).catch(err => {
            filesObj.status = ''
            filesObj.message = '';
            this.fileList.pop()
            console.log(this.urls)
          })

        })
      },
      deleteImg(file,item,files){
        this.urls.splice(item.index,1)
        console.log(this.urls)
      }
    }
  }
</script>
<style lang='less' scoped>
  .recharge-page {
    display: flex;
    flex-direction: column;
    background: #FFF;
    .main {
      flex:1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding: .6rem .5rem;
      .flex-wrap {
        display: flex;
        flex-direction: column;
        margin-bottom:.4rem;
        label {
          margin-bottom:.1rem;
        }
        input {
          width:100%;
          height:.96rem;
          padding:0 .2rem;
          background: #F6F9FC;
          border-radius: .12rem;
          box-sizing: border-box;
          font-size:.28rem;
          color:#232323;
          &::placeholder {
            color:#B4B4B4;
          }
        }
        .copyBox {
          width:100%;
          height:1.3rem;
          padding:.2rem;
          background: #F6F9FC;
          border-radius: .12rem;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          span {
            height:100%;
          }
          .text {
            flex:1;
            margin-right:.16rem;
            line-height: .44rem;
            color:#323232;
            font-size:.24rem;
            word-break:break-all;
          }
          .line {
            position: relative;
            top:.1rem;
            height:.7rem;
            width:.02rem;
            border-radius: .02rem;
            background: #D2DFEB;
          }
          .copy {
            padding:0 .16rem;
            color:#42C1CA;
            font-size:.28rem;
            line-height: .9rem;
          }
        }
        textarea {
          padding:.34rem .2rem;
          background: #F6F9FC;
          font-size:.28rem;
          color:#232323;
          border-radius: .12rem;
          border:none;
          box-sizing: border-box;
          resize:none;
          &::placeholder {
            color:#B4B4B4;
          }
        }
      }
      .tips {
        p {
          margin-bottom:.2rem;
          line-height: 1em;
          color:#969696;
          font-size:.22rem;
          &.red {
            margin-bottom:.16rem;
            color:#C83C3C;
            &:last-of-type {
              margin-bottom:0;
            }
          }
        }
      }
    }
    footer {
      width:100%;
      padding:.4rem .5rem;
      height:1.76rem;
      background: #FFF;
      box-shadow: 0rem -.02rem .1rem 0rem rgba(230, 230, 230, 0.5);
      box-sizing: border-box;
      button {
        height:.96rem;
        font-size:.34rem;
        color:#FFF;
      }
    }

  }
</style>