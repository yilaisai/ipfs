<template>
  <div class='lock-page'>
    <HeaderBar title="180天线性释放(75%)明细" color="#323232"></HeaderBar>
    <van-tabs 
      class="tabs"
      v-model="form.lineStatus" 
      sticky 
      color="#2C353F" 
      @change="changeTable">
      <van-tab title="锁仓中">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad">
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <div class="date">{{item.createDate | dateForm}} 期</div>
              <div class="detail">
                <p>
                  <span>收益</span>
                  <span>{{item.amount}} Fil</span>
                </p>
                <p>
                  <span>锁仓</span>
                  <span>{{BigNumber(item.amount).minus(item.lineUseAmount)}} Fil</span>
                </p>
                <p>
                  <span>已释放</span>
                  <span>{{item.lineUseAmount}} Fil</span>
                </p>
                <p>
                  <span>已释放天数</span>
                  <span>{{item.lineUseTime}} Fil</span>
                </p>
              </div>
            </li>
          </ul>
        </van-list>
      </van-tab>
      <van-tab title="已结束">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad">
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <div class="date">{{item.createDate | dateForm}} 期</div>
              <div class="detail">
                <p>
                  <span>收益</span>
                  <span>{{item.amount}} Fil</span>
                </p>
                <p>
                  <span>锁仓</span>
                  <span>{{BigNumber(item.amount).minus(item.lineUseAmount)}} Fil</span>
                </p>
                <p>
                  <span>已释放</span>
                  <span>{{item.lineUseAmount}} Fil</span>
                </p>
                <p>
                  <span>已释放天数</span>
                  <span>{{item.lineUseTime}} Fil</span>
                </p>
              </div>
            </li>
          </ul>
        </van-list>
      </van-tab>
    </van-tabs>
    <footer class="footer">
      <div>
        锁仓中：<span>{{totalLockAmount}}</span> Fil
      </div>
      <div>
        累计释放：<span>{{totalUseAmount}}</span> Fil
      </div>
    </footer>
  </div>
</template>
<script>
  import {getMineRewardList, getSumMineRewardList} from '@/api/request'
  import BigNumber from 'bignumber.js'
  export default {
    data() {
      return { 
        active:0,
        list:[],
        finished:false,
        loading:false,
        total:0,
        totalUseAmount:'',
        totalLockAmount:'',
        form:{
          pageNum:0,
          pageSize:10,
          lineStatus:0,
          type:3
        }
      }
    },
    mounted(){

    },
    methods: {
      onLoad(){
        this.form.pageNum++
        this.getData()
        this.getSum()
      },
      getData(){
        getMineRewardList(this.form).then(res => {
          let result = res.result
          this.total = result.total
          this.list = this.form.pageNum == 1?result.list:this.list.concat(result.list)
          this.loading = false;
          if (this.list.length >= this.total) {
            this.finished = true;
          }
        })
      },
      getSum(){
        getSumMineRewardList(this.form).then(res => {
          let result = res.result
          this.totalUseAmount = result.totalUseAmount
          this.totalLockAmount = BigNumber(result.totalReward).minus(this.totalUseAmount)
        })
      },
      changeTable(){
        let dom = document.getElementsByClassName('van-tabs__content')
        dom[0].scrollTo(0,0)
        this.form.pageNum = 0
        this.loading = false
        this.finished = false
        this.list = []
      },
      BigNumber(val){
        return BigNumber(val)
      }
    },
    filters:{
      dateForm(val){
        return  val.toString().slice(0,4) + '.' + val.toString().slice(4,6) + '.' + val.toString().slice(6)
      }
    }
  }
</script>
<style lang='less' scoped>
  .lock-page {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #FFF;
    /deep/ .van-tabs {
      flex:1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .van-tabs__line {
        width:.6rem !important;
      }
      .van-tabs__content {
        min-height: .1rem;
        overflow: auto;
        ul {
          li {
            display: flex;
            flex-direction: column;
            .date {
              height:.4rem;
              line-height: .4rem;
              padding:0 .2rem;
              background: #F1F4F7;
              color:#969696;
              font-size:.2rem;
            }
            .detail {
              background: #FFF;
              padding:.2rem;
              display: flex;
              justify-content: space-between;
              p {
                display: flex;
                flex-direction: column;
                text-align: center;
                &:first-of-type {
                  text-align: left;
                }
                &:last-of-type {
                  text-align: right;
                }
                span {
                  margin-bottom:.05rem;
                  color:#969696;
                  font-size:.22rem;
                  &:last-of-type {
                    margin-bottom:0;
                    color:#323232;
                    font-size:.24rem;
                  }
                }
              }
            }
          }
        }
      }
    }
    .footer {
      height:1rem;
      background: #FFF;
      box-shadow: 0px -2px 10px 0px rgba(230, 230, 230, 0.5);
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size:.28rem;
      color:#000;
      span {
        color:#FA6400;
      }
    }

  }
</style>