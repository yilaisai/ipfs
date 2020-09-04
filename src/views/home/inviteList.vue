<template>
  <div class='inviteList-page'>
    <HeaderBar color="green" title="直邀矿池节点"></HeaderBar>
    <div class="main">
      <div class="bg"></div>
      <div class="list">
        <div class="title">
          <span>排名</span>
          <span>用户账号</span>
          <span>用户昵称</span>
          <span>矿池云储力(T)</span>
        </div>
        <div v-for="(item,index) in list" :key="index" class="item">
          <span class="rank" v-if="index>2">
            <i>{{index+1}}</i>
          </span>
          <span v-else>
            <img src="../../assets/img/icon/first.png" alt="" v-if="index == 0">
            <img src="../../assets/img/icon/second.png" alt="" v-else-if="index == 1">
            <img src="../../assets/img/icon/third.png" alt="" v-else-if="index == 2">
          </span>
          <span>{{item.account}}</span>
          <span>{{item.name}}</span>
          <span>{{item.amount}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        list:[
          {
            account:'178****3439',
            name:'王欣',
            amount:'100000'
          },
          {
            account:'178****3439',
            name:'王欣',
            amount:'100000'
          },
          {
            account:'178****3439',
            name:'王欣',
            amount:'100000'
          },
          {
            account:'178****3439',
            name:'王欣',
            amount:'100000'
          },
          {
            account:'178****3439',
            name:'王欣',
            amount:'100000'
          },
        ]
      }
    },
    methods: {
    },
  }
</script>
<style lang='less' scoped>
  .inviteList-page {
    .main {
      .bg {
        width:100%;
        height:2.32rem;
        background: url('../../assets/img/bg/bg13.png') no-repeat center/100%;
      }
      .list {
        background: #FFF;
        .title {
          height:.68rem;
          padding:0 .4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          span {
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
        .item {
          height:.9rem;
          padding:0 .4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top:.01rem solid #E6E6E6;
          span {
            flex:1;
            display: flex;
            align-items: center;
            text-align: center;
            justify-content: center;
            &:first-of-type {
              text-align: left;
              justify-content: flex-start;
            }
            &:last-of-type {
              text-align: right;
              justify-content: flex-end;
            }
            img {
              width:.4rem;
            }
          }
          span.rank {
            i {
              font-style: normal;
              width:.4rem;
              height:.4rem;
              line-height: .4rem;
              color:#2FB9C3;
              font-size:.24rem;
              background: #F5F5F5;
              border-radius: 50%;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>