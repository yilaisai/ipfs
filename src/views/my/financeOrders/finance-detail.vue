<template>
  <div class='finance-detail-page'>
    <HeaderBar title="产品详情" color="#000"></HeaderBar>
    <div class="content">
      <div class="detail-top">
        <h5 class="name">{{detail.name}}</h5>
        <div class="text">
          <p>
            <span>{{bigNumber(detail.rate*1).times(100)}}%</span>
            <span>利率</span>
          </p>
          <p>
            <span>{{detail.day}}天</span>
            <span>产品期限</span>
          </p>
        </div>
        <div class="tags">
          <span>低风险</span>
          <span>稳健收益</span>
          <span>随时申购</span>
        </div>
      </div>
      <div class="detail-mid">
        <div>
          <span>金额</span>
          <span>{{detail.amount}}</span>
        </div>
        <div>
          <span>预计收益</span>
          <span>{{detail.isReward == 0?detail.reward:bigNumber(detail.reward).plus(detail.amount)}}</span>
        </div>
        <div>
          <span>距离到期</span>
          <span>{{detail.remainDay == 0?'进行中':detail.remainDay >0?detail.remainDay + '天':'已结束'}}</span>
        </div>
      </div>
      <div class="detail-btm">
        <span>购买日期</span>
        <span>{{detail.createTimestamp | fmtDate('full')}}</span>
      </div>
      <div class="tips">
        <h5>说明</h5>
        <p>1.到期后会将您的本金及利息全部释放到您的账户余额中。</p>
        <p>2.每月可提取一次利息。<span @click="$router.push({path:'/extract-interest',query:{data:JSON.stringify(detail)}})">立即提取</span></p>
      </div>
      <div class="agreement">查看《产品购买协议》</div>
    </div>
  </div>
</template>
<script>
  import bigNumber from 'bignumber.js'
  export default {
    data() {
      return { 
        detail:''
      }
    },
    mounted(){
     
      if(this.$route.query.data) {
        this.detail = JSON.parse(this.$route.query.data)
      }
      
      console.log(this.detail)
    },
    methods: {
      bigNumber(val){
        return bigNumber(val)
      }
    },
  }
</script>
<style lang='less' scoped>
  .finance-detail-page {
    background: #F1F4F7;
    display: flex;
    flex-direction: column;
    .content {
      position: relative;
      flex:1;
      display: flex;
      flex-direction: column;
      .detail-top {
        padding:.4rem;
        margin-bottom:.02rem;
        background: #FFF;
        display: flex;
        flex-direction: column;
        align-items: center;
        .name {
          margin-bottom:.4rem;
          color:#323232;
          font-size:.32rem;
        }
        .text {
          width:100%;
          margin-bottom:.4rem;
          display: flex;
          >p {
            flex:1;
            display: flex;
            flex-direction: column;
            align-items: center;
            span {
              &:first-of-type {
                margin-bottom:.08rem;
                color:#D9930B;
                font-size:.4rem;
              }
              &:last-of-type {
                color:#969696;
                font-size:.24rem;
              }
            }
          }
        }
        .tags {
          width:100%;
          display: flex;
          span {
            margin-right:.2rem;
            padding:.07rem .1rem;
            border-radius: .04rem;
            background: rgba(237,243,250,.5);
            color:#96AAC3;
            font-size:.22rem;
          }
        }
      }
      .detail-mid {
        margin-bottom:.02rem;
        padding:.4rem;
        background: #FFF;
        display: flex;
        justify-content: space-between;
        align-items: center;
        >div {
          display: flex;
          flex-direction: column;
          span {
            &:first-of-type {
              margin-bottom:.08rem;
              font-size:.24rem;
              color:#969696;
            }
            &:last-of-type {
              font-size:.3rem;
              color:#000;
            }
          }
          &:nth-of-type(2) {
            align-items: center;
            span {
              &:last-of-type {
                color:#FA6400;
              }
            }
          }
          &:last-of-type {
            align-items: flex-end;
          }
        }
      }
      .detail-btm {
        margin-bottom:.2rem;
        padding:.4rem;
        background: #FFF;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          &:first-of-type {
            color:#969696;
            font-size:.24rem;
          }
          &:last-of-type {
            font-size:.3rem;
            color:#000;
          }
        }
      }
      .tips {
        padding:.4rem .4rem .8rem;
        background: #FFF;
        h5 {
          margin-bottom:.2rem;
          color:#646464;
          font-size:.24rem;
        }
        p {
          margin-bottom:.16rem;
          color:#969696;
          font-size:.24rem;
          span {
            color:#FA6400;
          }
          &:last-of-type {
            margin-bottom:0;
          }
        }
      }
      .agreement {
        position: absolute;
        bottom:.6rem;
        left:50%;
        color:#D9930B;
        font-size:.24rem;
        transform: translateX(-50%);
      }
    }
  }
</style>