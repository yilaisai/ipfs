<template>
  <div class='extract-list-page'>
    <HeaderBar title="利息提取记录" color="#000" class="header"></HeaderBar>
    <div class="content">
      <div class="title">
        <span>数量</span>
        <span>产品名称</span>
        <span>提取时间</span>
      </div>
      <div class="list">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="(item,index) in list" :key="index" class="item">
            <span>{{item.amount}}</span>
            <span>{{item.name}}</span>
            <span>{{item.createTimestamp | fmtDate}}</span>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
  import {getExtractList} from '@/api/request'
  export default {
    data() {
      return { 
        loading:false,
        finished:false,
        list:[],
        pageNum:0,
        pageSize:10,
        total:0
      }
    },
    methods: {
      getList(){
        getExtractList({
          pageNum:this.pageNum,
          pageSize:this.pageSize
        }).then(res => {
          if(res.code == 200) {
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
  .extract-list-page {
    background: #F1F4F7;
    display: flex;
    flex-direction: column;
    .content {
      position: relative;
      flex:1;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      .title {
        position: fixed;
        top:0.9rem;
        left:0;
        width:100%;
        height:.4rem;
        padding:0 .3rem;
        background:  #F1F4F7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          color:#969696;
          font-size:.22rem;
          flex:1;
          text-align: center;
          &:first-of-type {
            text-align: left;
          }
          &:last-of-type {
            text-align: right;
          }
        }
      }
      .list {
        flex:1;
        padding-top:.4rem;
        background: #FFF;
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding:.4rem .3rem;
          border-bottom:.01rem solid #DCDCDC;
          span {
            flex:1;
            font-size:.3rem;
            color:#000;
            text-align: center;
            &:first-of-type {
              text-align: left;
            }
            &:last-of-type {
              text-align: right;
            }
          }
        }
      }
    }
  }
</style>