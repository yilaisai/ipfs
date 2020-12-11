<template>
  <div class='orderDetail'>
    <HeaderBar title="我的订单" :back="true"  color="white" class="transparent"></HeaderBar>
    <div class="top"></div>
    <div class="bottom">
      <div class="content">
        <div class="bg1"></div>
        <div class="bg2"></div>
        <div class="container">
          <div class="container-top">
            <img src="../../../assets/img/icon/waiting.svg" alt="" v-if="detail.status == 0">
            <img src="../../../assets/img/icon/success.svg" alt="" v-if="detail.status == 1">
            <img src="../../../assets/img/icon/fail.svg" alt="" v-if="detail.status == 2">
            <img src="../../../assets/img/icon/cancel.svg" alt="" v-if="detail.status == 3">
            <p>{{detail.status == 0?'已提交审核，请耐心等待':detail.status == 1?'已完成':detail.status == 2?'审核失败':'已取消'}}</p>
          </div>
          <div class="container-mid">
            <div>
              <span>商品名称</span>
              <span>{{detail.name}}</span>
            </div>
            <div>
              <span>合约期限</span>
              <span>{{Math.floor(detail.proTime / 30)}} 个月</span>
            </div>
            <div>
              <span>单价</span>
              <span>¥ {{detail.price}}</span>
            </div>
            <div>
              <span>购买数量(T)</span>
              <span>{{detail.amount}}</span>
            </div>
          </div>
          <div class="container-btm">
            <div>
              <span>总金额</span>
              <span class="orange">¥ {{bigNumber(detail.price).times(detail.amount)}}</span>
            </div>
            <div>
              <span>联系人</span>
              <span>{{detail.realName}}</span>
            </div>
            <div>
              <span>手机号码</span>
              <span>{{detail.conPhone}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getUserBuyMineAudits} from '@/api/request'
  import bigNumber from 'bignumber.js'
  export default {
    data() {
      return { 
        id:'',
        detail:''
      }
    },
    mounted(){
      if(this.$route.query.id) {
        this.id = this.$route.query.id
      }
      this.getData()
    },
    methods: {
      getData(){
        getUserBuyMineAudits({
          pageSize:10,
          pageNum:1,
          id:this.id
        }).then(res => {
          if(res.code == 200) {
            this.detail = res.result.list[0]
          }
        })
      },
      bigNumber(val) {
        return bigNumber(val)
      }
    },
  }
</script>
<style lang='less' scoped>
  .orderDetail {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background:  #42C1CA;
    .top {
      height:2.4rem;
    }
    .bottom {
      padding:0 .3rem;
      position: relative;
      flex:1;
      background: #E2E8ED;
      .content {
        position: relative;
        top:-1.3rem;
        left:0;
        width:100%;
        height:8.76rem;
        background: #FFF;
        border-radius: 0 0 .16rem .16rem;
        z-index:2;
        .bg1 {
          width:calc(100% + 0.2rem);
          height:.24rem;
          position: absolute;
          top:-.12rem;
          left:-.1rem;
          background: #36ABB4;
          border-radius: .5rem;
          z-index:5;
        }
        .bg2 {
          position: absolute;
          top:0;
          left:0;
          width:100%;
          height:.28rem;
          background: linear-gradient(180deg, rgba(54, 171, 180, 0.6) 0%, rgba(255, 255, 255, 0) 100%);
          z-index:9;
        }
        .container {
          position: relative;
          width:100%;
          height:100%;
          padding:0 .2rem;
          background: #FFF;
          border-radius: 0 0 .16rem .16rem;
          z-index:6;
          &-top {
            position: relative;
            height:2.75rem;
            border-bottom:.02rem dashed #CBD3DD;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            img {
              margin-bottom:.18rem;
              width:.8rem;
              height:.8rem;
            }
            p {
              line-height: 1em;
              color:#000;
              font-size:.34rem;
            }
            &::before {
                content:'';
                position: absolute;
                bottom:-.15rem;
                left:-.45rem;
                width:.3rem;
                height:.3rem;
                background: #E2E7ED;
                border-radius: 50%;
                z-index:9;
              }
              &::after {
                content:'';
                position: absolute;
                bottom:-.15rem;
                right:-.45rem;
                width:.3rem;
                height:.3rem;
                background: #E2E7ED;
                border-radius: 50%;
                z-index:9;
              }
          }
          &-mid {
            padding:.75rem .1rem .6rem;
            border-bottom:.02rem dotted #cbd3dd;
            >div {
              margin-bottom:.3rem;
              display: flex;
              justify-content: space-between;
              &:last-of-type {
                margin-bottom:0;
              }
              span {
                line-height: 1em;
                font-size:.28rem;
                color:#323232;
                &:first-of-type {
                  color:#969696;
                }
              }
            }
          }
          &-btm {
            padding:.6rem 0;
            >div {
              margin-bottom:.3rem;
              display: flex;
              justify-content: space-between;
              &:last-of-type {
                margin-bottom:0;
              }
              span {
                line-height: 1em;
                font-size:.28rem;
                color:#323232;
                &:first-of-type {
                  color:#969696;
                }
                &.orange {
                  color:#FA6400;
                }
              }
            }
          }
        }
      }
    }
  }
</style>