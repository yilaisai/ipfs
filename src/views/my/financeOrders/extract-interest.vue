<template>
  <div class='extract-interest-page'>
    <HeaderBar title="利息提取" color="#000" class="header">
      <div @click="$router.push('/extract-list')">
        <img src="../../../assets/img/icon/list.png" alt="">
      </div>
    </HeaderBar>
    <div class="content">
      <div class="top">
        <div class="detailBox">
          <div>
            <span>{{detail.sendReward}}</span>
            <span>已提取利息（Fil）</span>
          </div>
          <div>
            <span>{{detail.enReward}}</span>
            <span>可提取利息（Fil）</span>
          </div>
        </div>
        <div class="inputBox">
          <input type="text" v-model="amount" placeholder="请输入提取数量" @input="amountInput">
          <span @click="amount = detail.enReward">全部</span>
        </div>
      </div>
      <div class="button">
        <van-button @click="confirmExtract">确认提取</van-button>
      </div>
    </div>
  </div>
</template>
<script>
  import { catchFinance } from '@/api/request'
  export default {
    data() {
      return { 
        detail:'',
        amount:''
      }
    },
    mounted(){
      if(this.$route.query.data) {
        this.detail = JSON.parse(this.$route.query.data)
      }
    },
    methods: {
      amountInput(){
        this.amount = this.amount + ""
        this.amount = this.amount.replace(/^\.$/g,"")  //清除第一个“.”   
        this.amount = this.amount.replace(/[^\d.]/g,"")  //清除“数字”和“.”以外的字符   
        this.amount = this.amount.replace(/\.{2,}/g,".") //只保留第一个. 清除多余的   
        this.amount = this.amount.replace(".","$#$").replace(/\./g,"").replace("$#$",".")  
        this.amount = this.amount.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/,'$1$2.$3') //只能输入四个小数   
        if(this.amount.indexOf(".") < 0 && this.amount != ""){ //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
          this.amount = parseFloat(this.amount)
        }
      },
      confirmExtract(){
        if (!this.amount) {
          return this.$toast('请输入提取数量!')
        }
        catchFinance({amount:this.amount,financeId:this.detail.id}).then(res => {
          if(res.code === 200) {
            this.$toast('提交完成！')
            this.$router.go(-2)
          }
        })
      }
    },
  }
</script>
<style lang='less' scoped>
  .extract-interest-page {
    background: #F1F4F7;
    display: flex;
    flex-direction: column;
    .content {
      position: relative;
      flex:1;
      display: flex;
      flex-direction: column;
      .top {
        background: #FFF;
        padding: 0 .4rem;
        display: flex;
        flex-direction: column;
        .detailBox {
          display: flex;
          padding:.6rem 0;
          border-bottom:.01rem solid #DCDCDC;
          >div {
            flex:1;
            display: flex;
            flex-direction: column;
            align-items: center;
            span {
              line-height: .4rem;
              color:#D9930B;
              font-size:.4rem;
              &:last-of-type {
                color:#969696;
                font-size:.24rem;
              }
            }
          }
        }
        .inputBox {
          height:.96rem;
          background: #F6F9FC;
          position: relative;
          margin:.6rem 0;
          border-radius: .12rem;
          overflow: hidden;
          input {
            width: 100%;
            height:100%;
            padding:0 1rem 0 .2rem;
            background: transparent;
            border:none;
            outline: none;
            box-sizing: border-box;
            font-size:.28rem;
          }
          span {
            position: absolute;
            top:.14rem;
            right:0;
            padding:.2rem;
            line-height: 1em;
            color:#42C1CA;
            font-size:.28rem;
          }
        } 
      }
      .button {
        padding:.6rem .4rem;
        /deep/ .van-button {
          width:100%;
          height: .88rem;
          background-color: #FA6400;
          border: 1px solid #FA6400;
          font-size: .32rem;
          border-radius: .12rem;
          color:#FFF;
        }
      }
    }
  }
</style>