<template>
  <div class='financeOrders-page'>
    <header>
      <a href="javascript:;" class="go-back" @click="goBack"></a>
      <h2>我购买的理财产品</h2>
    </header>
    <div class="total">
      <div class="title">
        <p>总资产（FIL）</p>
        <h5>{{amount}}</h5>
      </div>
      <div class="sum">
        <div>
          <span>累计收益 (FIL)</span>
          <p>{{realReward}}</p>
        </div>
        <div>
          <span>预计收益 (FIL)</span>
          <p>{{preReward}}</p>
        </div>
      </div>
    </div>
    <div class="tabs">
      <div @click="$router.push('/finance-earnings')">
        <img src="../../../assets/img/icon/detail.svg" alt="">
        <span>收益明细</span>
      </div>
      <div @click="$router.push('/finance-record')">
        <img src="../../../assets/img/icon/record.svg" alt="">
        <span>交易记录</span>
      </div>
    </div>
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(item,index) in list" :key="index" class="item">
          <div class="item-top">
            <p>
              <span>{{item.name}}</span>
              <span>{{item.day}}</span>
            </p>
            <img src="../../../../public/img/arrow_right.png" alt="">
          </div>
          <div class="item-bottom">
            <p class="amount">
              <span>金额</span>
              <span>{{item.amount}}</span>
            </p>
            <p class="rewards">
              <span>预计收益</span>
              <span>{{item.reward}}</span>
            </p>
            <p class="times">
              <span>距离到期</span>
              <span>{{item.remainDay}}天</span>
            </p>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
  import { myFinance, getFinanceList } from '@/api/request'
  export default {
    data() {
      return { 
        total:{},
        amount:'',
        preReward:'',
        realReward:'',
        list:[],
        loading:false,
        finished:false,
        pageNum:0,
        pageSize:10,
        total:0,
      }
    },
    mounted(){
      this.getTotal()
    },
    methods: {
      getTotal(){
        myFinance().then(res => {
          let result = res.result
          this.amount = result.amount
          this.preReward = result.preReward
          this.realReward = result.realReward
        })
      },
      getList(){
        getFinanceList({
          pageNum:this.pageNum,
          pageSize:this.pageSize,
        }).then(res => {
          if(res.code === 200 ) {
            this.total = res.result.total
            this.list = this.list.concat(res.result.list)
            this.loading = false
            if(this.list.length >= this.total) {
              this.finished = true
            }
          }
        })
      },
      goBack(){
        this.$router.go(-1)
      },
      onLoad(){
        this.pageNum++
        this.getList()
      }
    },
  }
</script>
<style lang='less' scoped>
  .financeOrders-page {
    height:100%;
    display: flex;
    flex-direction: column;
    background: #F1F4F7;
    header {
      position: absolute;
      z-index: 12;
      width:100%;
      height: .9rem;
      line-height: .9rem;
      background-color: transparent;
      color: #333333;
      .go-back {
        position: absolute;
        width: .9rem;
        height: .9rem;     
        top: 0;
        left: 0;
        background: url('../../../../public/img/arrow_left_white.png') no-repeat center;
        background-size: 50%;   
      }
      h2 {
        font-size: .32rem;
        text-align: center;
        font-weight: 600;
        padding: 0 1rem;
        height: .9rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow : ellipsis;
        color:#FFF;
      }
    }
    .total {
      height:3.64rem;
      padding-top:.9rem;
      background: linear-gradient(225deg, #FC9664 0%, #F75D34 100%);
      box-sizing: border-box;
      display:flex;
      flex-direction: column;
      .title {
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          margin-bottom:.2rem;
          line-height: 1em;
          font-size:.24rem;
          color:rgba(255,255,255,.7);
        }
        h5 {
          font-size:.64rem;
          font-weight: 500;
          color:#FFF;
        }
      }
      .sum {
        height:1.2rem;
        background: rgba(255,255,255,.1);
        display: flex;
        align-items: center;
        
        >div {
          height:100%;
          flex:1;
          padding:.18rem 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          span {
            line-height: .31rem;
            font-size:.22rem;
            color:rgba(255,255,255,.7);
          }
          p {
            line-height: .5rem;
            font-size:.36rem;
            font-weight: 500;
            color:#FFF;
          }
        }
      }
    }
    .tabs {
      margin-bottom:.2rem;
      padding:.4rem 0 ;
      background: #FFF;
      display: flex;
      >div {
        position: relative;
        flex:1;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          margin-right:.16rem;
        }
        span {
          font-size:.3rem;
          font-weight: 500;
          color:#000;
        }
        &:first-of-type {
          img {
            width:.4rem;
            height:.4rem;
          }
          &::after {
            content:'';
            position: absolute;
            right:0;
            top:-.1rem;
            width:.01rem;
            height:.6rem;
            background: #C8C8C8;
          }
        }
        &:last-of-type {
          img {
            width:.36rem;
            height:.4rem;
          }
        }
        
      }
    }
    .list {
      flex:1;
      background: #FFF;
      overflow: hidden;
      /deep/ .van-list {
        height:100%;
        overflow-y:auto;
        .item {
          padding:.4rem;
          border-bottom:.01rem solid #DCDCDC;
          display: flex;
          flex-direction: column;
          &-top {
            margin-bottom:.4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            p {
              display: flex;
              align-items: center;
              span {
                &:first-of-type {
                  margin-right:.1rem;
                  color:#D9930B;
                  font-size:.34rem;
                }
                &:last-of-type {
                  line-height: 1em;
                  padding:.05rem .14rem;
                  background-color: #F4F4F4;
                  border-radius: .06rem;
                  font-size:.24rem;
                  color:#D9930B;
                }
              }
            }
            img {
              position: relative;
              right:-.1rem;
              width:.11rem;
              height:.2rem;
              padding:.1rem;
            }
          }
          &-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            >p {
              display: flex;
              flex-direction: column;
              span {
                &:first-of-type {
                  margin-bottom:.08rem;
                  line-height: .24rem;
                  color:#969696;
                  font-size:.24rem;
                }
                &:last-of-type {
                  line-height: .3rem;
                  font-size:.3rem;
                  color:#000; 
                }
              }
              &.rewards {
                text-align: center;
                span {
                  &:last-of-type {
                    color:#FA6400;
                  }
                }
              }
              &.times {
                text-align: right;
              }
            }
          }
        }
      }
    }
  }
</style>