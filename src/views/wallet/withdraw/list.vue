<template>
  <div class='withdraw-list-page'>
    <HeaderBar title="提现记录" :back="true" :shadow="true" color="white">
    </HeaderBar>
    <div class="main">
      <ul>
        <li class="title">
          <span>类型</span>
          <span>数量</span>
          <span>币种</span>
          <span>状态</span>
        </li>
      </ul>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="data">
        <van-empty class="empty-image" :image="'./img/nodata.png'" description="暂无提现记录" v-if="!list.length"/>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          v-else>
          <van-cell v-for="(item,index) in list" :key="index">
            <div class="item-top">
              <span>提现</span>
              <span>{{item.amount}}</span>
              <span>FIL</span>
              <span :class="item.status == 1?'black':item.status == 2?'green':item.status == 3?'gray':'red'">{{item.recdStatus | filterStatus}}</span>
            </div>
            <div class="item-btm" @click="$router.push({path:'/withdrawDetail',query:{data:JSON.stringify(item)}})">
              <span>{{item.createTimestamp | fmtDate('full')}}</span>
              <img src="../../../assets/img/icon/arrow2.svg" alt="" >
            </div>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
  import {getWithdrawList} from '@/api/request'
  import {fmtDate} from '@/assets/utils'
  export default {
    data() {
      return { 
        list:[],
        pageNum :1,
        pageSize :8,
        refreshing:false,
        loading:false,
        finished:false,
        total:0,
      }
    },
    mounted(){
      this.getWithdrawList()
    },
    methods: {
      getWithdrawList(){
        getWithdrawList({
          pageNum :this.pageNum,
          pageSize :this.pageSize
        }).then(res => {
          if (this.refreshing) {
            this.list = []
            this.refreshing = false
          }
          let list = res.result.list
          this.total = res.result.total * 1
          for (let i = 0 ; i <list.length ; i++) {
            this.list.push(list[i])
          }
          this.loading = false
          if (this.list.length>=this.total) {
            this.finished = true;
            
          }
        })
      },
      onRefresh(){
        this.finished = false;
        this.loading = true;
        this.getWithdrawList()
        this.$toast('刷新列表')
      },
      onLoad(){
        this.pageNum++
        this.getWithdrawList()
      },
    },
    filters:{
      filterStatus(status){
        switch(status) {
          case 0:
            return '提现失败'
            break;
          case 1:
            return '提现成功'
            break;
          case 2:
            return '待审核'
            break;
          case 3:
            return '审核成功'
            break;
          default:
            break;
        }
      }
    }
  }
</script>
<style lang='less' scoped>
  .withdraw-list-page {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    .main {
      flex:1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      ul {
        .title {
          height:.64rem;
          padding:0 .4rem;
          background: #F6F9FC;
          color:#646464;
          font-size:.24rem;
          display: flex;
          flex-direction:row;
          align-items: center;
          border-bottom:0;
          span {
            flex:1;
            text-align: center;
            color:#646464;
            font-size:.24rem;
            &:first-of-type {
              text-align: left;
            }
            &:last-of-type {
              text-align: right;
            }
          }
        }
      }
      .data {
        flex:1;
        overflow-y:auto;
        /deep/ .van-pull-refresh__head {
          height:.64rem;
        }
        /deep/ .van-list {
          .van-cell {
            height:1.42rem;
            padding:.3rem .4rem;
            
            border-bottom:.01rem solid #DCE7F1;
            .van-cell__value {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            .item-top {
              display: flex;
              align-items: center;
              span {
                flex:1;
                text-align: center;
                color:#323232;
                font-size:.28rem;
                &:first-of-type {
                  text-align: left;
                }
                &:last-of-type {
                  text-align: right;
                }
                &.black {
                  color:#323232;
                }
                &.green {
                  color:#128758;
                }
                &.gray {
                  color:#969696;
                }
                &.red {
                  color:#DE2A2A;
                }
              }
            }
            .item-btm {
              display: flex;
              align-items: center;
              justify-content: space-between;
              span {
                color:#646464;
                font-size:.24rem;
              }
              img {
                width:.11rem;
                height:.2rem;
                padding:.1rem;
              }
            }
          }
        }
      }
    }
  }
</style>