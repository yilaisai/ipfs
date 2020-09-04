<template>
  <div class='withdraw-page'>
    <HeaderBar title="提现" :back="true" :shadow="true" color="white" class="header">
      <div class="record" @click="$router.push('/withdrawList')">操作记录</div>
    </HeaderBar>
    <div class="main">
      <div class="coin-wrap">
        <label>链名称</label>
        <ul>
          <li v-for="(item,index) in coinList" :key="index" :class="{'active':activeIndex == index}" @click="activeIndex = index">{{item}}</li>
        </ul>
      </div>
      <div class="address-wrap">
        <label>提币地址</label>
        <div>
          <input type="text" v-model.trim="address" placeholder="输入或长按粘贴地址" >
          <!-- <img class="addressList" src="../../../assets/img/icon/book.png" alt="" @click="$router.push('/addressManage')"> -->
        </div>
      </div>
      <div class="amount-wrap">
        <label>数量</label>
        <div class="inputBox">
          <input type="text" v-model="amount" @input="clearNoNum_Amount" placeholder="输入提币数量">
          <div>
            <span>{{coin}}</span>
            <span class="line"></span>
            <span @click="amount = userInfo.amount">ALL</span>
          </div>
        </div>
        <div class="tips">
          <span>可用：</span>
          <span>{{userInfo.amount}} {{coin}}</span>
        </div>
      </div>
      <div class="fee-wrap">
        <label>手续费</label>
        <div>
          <input type="text" v-model.trim="userInfo.outFee" :disabled="true" >
          <span>{{coin}}</span>
        </div>
      </div>
      <div class="kindly-tips">
        <p>温馨提示：</p>
        <p>1、最小提现额度为 1 {{coin}}；</p>
        <p>2、提现预计在 T+1 个工作日内到账；</p>
        <p>3、发起提现后请耐心等待客服审核哦。</p>
      </div>
    </div>
    <footer>
			<button class="full scale" @click="withdraw">提币</button>
		</footer>
    <van-popup v-model="show" position="bottom">
      <h5>确认提现</h5>
      <div class="content">
        <ul class="detail">
          <li>
            <span>币种</span>
            <span>{{coin}}</span>
          </li>
          <li>
            <span>链名称</span>
            <span>{{coinList[activeIndex]}}</span>
          </li>
          <li>
            <span>提现地址</span>
            <span>{{address}}</span>
          </li>
          <li>
            <span>提现数量</span>
            <span>{{amount}}</span>
          </li>
          <li>
            <span>手续费</span>
            <span>{{userInfo.outFee}}</span>
          </li>
        </ul>
        <div class="flex-wrap">
					<input type="text" v-model.trim="code" placeholder="请输入短信验证码">
					<CountDownBtn v-model="btnDisabled" @click.native="getCaptchaPhone"></CountDownBtn>
				</div>
        <div class="flex-wrap">
					<input type="password" v-model.trim="fundPwd"  placeholder="请输入资金密码">
				</div>
        <button class="full scale" @click="conofirm">确认提现</button>
      </div>  
    </van-popup>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import {getCaptchaPhone, withDraw} from '@/api/request'
  import CountDownBtn from '@/components/common/countDownBtn.vue'
  import Md5 from 'js-md5'
  export default {
    data() {
      return { 
        coinList:['FILECOIN'],
        coin:'',
        activeIndex:0,
        address:'',
        amount:'',
        balance:5000,
        fee:5,
        show:false,
        btnDisabled:false,
        code:'',
        fundPwd:''
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    mounted(){
      this.coin = this.$route.query.coin
      console.log(this.userInfo)
    },
    methods: {
      clearNoNum_Amount(){  
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
      withdraw(){
        if (!this.address || !this.amount) {
          this.$toast('请输入提币地址及数量！')
          return
        }
        // if(this.amount >this.userInfo.amount - this.userInfo.outFee) {
        //   this.$toast('提币数量超过余额数量！')
        //   return
        // }
        this.show = true
      },
      conofirm(){
        if(!this.code || !this.fundPwd) {
          this.$toast('请输入验证码！')
          return
        }
        withDraw({
          addr:this.address,
          amount:this.amount,
          code:this.code,
          fundPwd:Md5(this.fundPwd),
          onLoading:true
        }).then(res => {
          this.$toast(res.msg)
          this.$store.dispatch('getUserInfo')
          this.$router.push('/earnings')
        }).catch(err => {
          if (err.code == 500) {
            this.$toast(err.msg)
            this.$router.push('/updateFundsPwd')
          }
        })
      },
      getCaptchaPhone(){
        if(this.btnDisabled == true) return
        this.btnDisabled = true
        getCaptchaPhone({
          areaCode: this.userInfo.phoneArea,
          phone: this.userInfo.phone,
          type: 'WITHDRAW',
          onLoading:true
        }).then(res => {
          this.$toast.success(res.msg)
        }).catch(err => {
          this.btnDisabled = false
        })
      }
    },
    components:{
      CountDownBtn
    }
  }
</script>
<style lang='less' scoped>
  .withdraw-page {
    display: flex;
    flex-direction: column;
    background: #FFF;
    .header {
      .record {
        color:#969696;
        font-size:.28rem;
      }
    }
    .main {
      flex:1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding: .4rem .5rem;
      .coin-wrap {
        margin-bottom:.4rem;
        label {
          font-size:.24rem;
          color:#646464;
        }
        >ul {
          margin-top:.1rem;
          display: flex;
          align-items: center;
          li {
            margin-right:.15rem;
            padding:.1rem .2rem;
            background-color: #F6F9FC;
            color:#b3bfd0;
            &.active {
              color:#42C1CA;
              background:#fff url('../../../assets/img/bg/bg12.png') no-repeat center/100%;
            }
          }
        }
      }
      .address-wrap {
        margin-bottom:.4rem;
        label {
          color:#646464;
          font-size:.24rem;
        }
        >div {
          position: relative;
          height:.96rem;
          margin-top:.1rem;
          display: flex;
          align-items: center;
          input {
            flex:1;
            height:100%;
            background: #F6F9FC;
            padding:0 .6rem 0 .2rem;
            border-radius: .12rem;
            font-size:.28rem;
            &::placeholder {
              color:#B4B4B4;
            }
          }
          .addressList {
            position: absolute;
            top:50%;
            right:.2rem;
            width:.28rem;
            height:.3rem;
            margin-top:-.15rem;
            pointer-events:auto;
          }
        }
      }
      .amount-wrap {
        margin-bottom:.4rem;
        label {
          font-size:.24rem;
          color:#646464;
        }
        .inputBox {
          position: relative;
          height:.96rem;
          margin-top:.1rem;
          input {
            width:100%;
            height:100%;
            background: #F6F9FC;
            padding:0 1.8rem 0 .2rem;
            border-radius: .12rem;
            font-size:.28rem;
            color:#323232;
            box-sizing: border-box;
            &::placeholder {
              color:#B4B4B4;
            }
          }
          >div {
            position: absolute;
            top:.24rem;
            right:.2rem;
            display: flex;
            align-items: center;
            span {
              color:#969696;
              font-size:.28rem;
              &:last-of-type {
                padding:.1rem;
                color:#42C1CA;
              }
            }
            .line {
              margin:0 .1rem 0 .2rem;
              width:.02rem;
              height:.28rem;
              background: #D2DFEB;
              border:0.02rem;
            }
          }
        } 
        .tips {
          margin-top:.1rem;
          span {
            color:#969696;
            font-size:.24rem;
            &:last-of-type {
              color:#42C1CA;
            }
          }
        }
      }
      .fee-wrap {
        margin-bottom:.8rem;
        label {
          color:#646464;
          font-size:.24rem;
        }
        >div {
          position: relative;
          height:.96rem;
          margin-top:.1rem;
          display: flex;
          align-items: center;
          input {
            flex:1;
            height:100%;
            background: #F6F9FC;
            padding:0 .6rem 0 .2rem;
            border-radius: .12rem;
            font-size:.28rem;
            &::placeholder {
              color:#B4B4B4;
            }
          }
          span {
            position: absolute;
            top:.34rem;
            right:.2rem;
            font-size:.28rem;
            color:#969696;
          }
        }
      }
      .kindly-tips {
        p {
          margin-bottom:.16rem;
          line-height: 1em;
          font-size:.22rem;
          color:#96AAC3;
          &:first-of-type {
            margin-bottom:.2rem;
          }
          &:last-of-type {
            margin-bottom:0;
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
      }
    }
    /deep/ .van-popup {
      border-radius: .32rem .32rem 0 0;
      h5 {
        height:1.32rem;
        line-height: 1.32rem;
        border-bottom:.01rem solid #DCDCDC;
        color:#000;
        font-size:.32rem;
        font-weight: 500;
        text-align: center;
      }
      .content {
        padding:.5rem .5rem .8rem;
        .detail {
          padding:.4rem .3rem;
          margin-bottom:.4rem;
          background: #F6F9FC;
          border-radius: .12rem;
          li {
            margin-bottom:.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              color:#6D7278;
              font-size:.28rem;
              &:last-of-type {
                color:#000;
              }
            }
            &:last-of-type {
              margin-bottom:0;
            }
          }
        }
        .flex-wrap {
          margin-bottom:.2rem;
          background-color: transparent;
          display: flex;
          align-items: center;
          height: 1rem;
          border-radius:.12rem;
          overflow: hidden;
          &:last-of-type {
            margin-bottom:.6rem;
          }
          input {
            flex: 1;
            height:100%;
            background-color: #F6F9FC;
            color: #000000;
            margin-right: .2rem;
            padding: 0 .3rem;
            font-size: .3rem;
            border-radius:.12rem;
          }
          a {
            color: #6BC40D;
            border: 1px solid #6BC40D;
            line-height: .36rem;
            border-radius: .18rem;
            padding: 0 .1rem;
            margin-right: .3rem;
          }
          /deep/.aef-countdownbtn {
						height: 100%;
						background-color: #6BC40D;
						border-radius:.12rem;
						width: 2rem;
						button {
							height: 100%;
							width: 100%;
							color: #fff;
							margin: 0;
						}
					}
        }
        button {
          height:.96rem;
          border-radius: .12rem;
          font-weight: 500;
        }
      }
    }
  }
</style>