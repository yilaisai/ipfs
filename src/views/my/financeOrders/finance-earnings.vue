<template>
  <div class='finance-earnings-page'>
    <HeaderBar title="收益明细" color="#000"></HeaderBar>
    <div class="content">
      <div class="detail">
        <div>
          <p>累计收益 (FIL)</p>
          <p>
            <span>2,200.34</span>
            <span>FIL</span>
          </p>
        </div>
      </div>
      <div class="list">
        <div class="tabs">
          <span>资产名称</span>
          <span>累计收益</span>
        </div>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          v-if="list.length"
        >
          <div v-for="item in list" :key="item" class="item" @click="$router.push('/finance-detail')">
            <span>{{item.name}}</span>
            <span>{{item.reward}}</span>
          </div>
        </van-list>
        <div v-else class="noData">
          <img src="../../../../public/img/noData.svg" alt="">
          <span>暂无收益明细哦，快去购买理财产品吧</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getFinanceList } from '@/api/request'
  export default {
    data() {
      return { 
        list:[],
        finished:false,
        loading:false,
        pageNum:1,
        pageSize:10,
        total:0,
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
          isReward:1
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
        this.pageNum++
        this.getList()
      }
    },
  }
</script>
<style lang='less' scoped>
  .finance-earnings-page {
    height:100%;
    display: flex;
    flex-direction: column;
    background: #FFF;
    overflow: hidden;
    .content {
      flex:1;
      overflow:hidden;
      display: flex;
      flex-direction: column;
      .detail {
        padding:.3rem;
        >div {
          width:100%;
          height:2.2rem;
          background: url('../../../assets/img/bg/bg15.png') no-repeat center center;
          background-size:100% 2.2rem;
          border-radius: .12rem;
          padding:.6rem;
          box-sizing: border-box;
          p {
            &:first-of-type {
              line-height: 1em;
              margin-bottom:.12rem;
              color:#FFF;
              font-size:.24rem;
            }
            &:last-of-type {
              display: flex;
              align-items: flex-end;
              span {
                color:#FFF;
                &:first-of-type {
                  line-height: 1em;
                  font-size:.64rem;
                  margin-right:.1rem;
                } 
                &:last-of-type {
                  font-size:.32rem;
                }
              }
            }
          }
        }
      }
      .list {
        flex:1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .tabs {
          padding:0 .3rem;
          height:.4rem;
          background: #F1F4F7;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            color:#969696;
            font-size:.22rem;
          }
        } 
        /deep/ .van-list  {
          flex:1;
          overflow: auto;
          .item {
            padding:.4rem .3rem;
            display: flex;
            justify-content: space-between;
            border-bottom:.01rem solid #DCDCDC;
            span {
              font-size:.3rem;
              &:last-of-type {
                color:#000;
              }
              &:last-of-type {
                color:#D9930B;
              } 
            }
          }
        }
        .noData {
          flex:1;
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
    }
    
  }
</style>