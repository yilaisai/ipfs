<template>
  <div class='finance-record-page'>
    <HeaderBar title="交易记录" :back="true"  color="white" class="header"></HeaderBar>
    <van-tabs 
    v-model="active" 
    sticky 
    color="#2C353F" 
    @change="changeTable">
      <van-tab :title="num == 0?'全部':num == 1?'进行中':'已结束'" v-for="(tab,num) in 3" :key="num">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          v-if="list.length"
          >
          <ul>
            <li class="nav">
              <span>资金名称</span>
              <span>累计收益</span>
              <span>状态</span>
            </li>
            <li v-for="(item,index) in list" :key="index">
              <span>{{item.name}}</span>
              <span>{{item.reward}}</span>
              <span>{{item.isReward == 0?'进行中':'已结束'}}</span>
            </li>
          </ul>
        </van-list>
        <div v-else class="noData">
          <img src="../../../../public/img/noData.svg" alt="">
          <span>暂无交易记录哦，快去购买理财产品吧</span>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
  import axios from 'axios'
  import { getFinanceList } from '@/api/request'
  export default {
    data() {
      return { 
        active:0,
        list:[],
        totalPower:'',
        totalRewards:'',
        loading: false,
        finished: false,
        pageSize:10,
        pageNum:1,
        total:0,
        isReward:'',
      }
    },
    mounted(){
      this.getList()
    },
    methods: {
      getList(){
        getFinanceList({
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          isReward:this.isReward
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
      onLoad(){
        console.log('onload')
        this.pageNum++
        this.getList()
      },
      changeTable(){
        console.log(this.active)
        this.list = []
        this.isReward = this.active == 0?'':this.active == 1? 0 : 1
        let dom = document.getElementsByClassName('van-tabs__content')
        dom[0].scrollTo(0,0)
        this.pageNum = 1
        this.loading = false
        this.finished = false
        this.getList()
      },
    },
  }
</script>
<style lang='less' scoped>
  .finance-record-page {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #FFF;
    /deep/ .van-tabs {
      flex:1;
      display: flex;
      flex-direction: column;
      overflow-y: hidden;

      .van-tabs__wrap {
        height:.8rem;
      }
      .van-tabs__content {
        overflow: auto;
      }
      ul {
        position: relative;
        padding-top:.4rem;
        background: #FFF;
        li {
          padding:.4rem .3rem;
          border-bottom:.01rem solid #DCDCDC;
          display: flex;
          align-items: center;
          justify-content: space-between;
          span {
            flex:1;
            color:#000;
            font-size:.3rem;
            font-weight: 500;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            &:nth-of-type(2) {
              text-align: center;
            }
            &:last-of-type {
              color:#D9930B;
              text-align: right;
            }
          }
        }
        .nav {
          position: fixed;
          left:0;
          top:1.7rem;
          width:100%;
          height:.4rem;
          padding:0 .3rem;
          background:#F1F4F7;
          border-bottom:none;
          span {
            line-height: .4rem;
            color:#969696;
            font-size:.22rem;
          }
        }
      }
    }
    .noData {
      padding-top:2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width:1.6rem;
        height:1.6rem;
        margin-bottom:.2rem;
      }
      span {
        color:#C8C8C8;
        font-size:.28rem;
      }
    }
  }
</style>