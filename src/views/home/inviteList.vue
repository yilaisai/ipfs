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
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="content">
          <van-empty class="empty-image" :image="'./img/empty.png'" description="暂时还没有排名信息" v-if="!list.length"/>
          <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
            v-else
          >
            <van-cell v-for="(item,index) in list" :key="index" class="item">
              <span class="rank" v-if="index>2">
                <i>{{index+1}}</i>
              </span>
              <span v-else>
                <img src="../../assets/img/icon/first.png" alt="" v-if="index == 0">
                <img src="../../assets/img/icon/second.png" alt="" v-else-if="index == 1">
                <img src="../../assets/img/icon/third.png" alt="" v-else-if="index == 2">
              </span>
              <span>{{item.phone}}</span>
              <span>{{item.nickName}}</span>
              <span>{{item.tamount}}</span>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>
<script>
  import {getInviteUsers} from '@/api/request'
  export default {
    data() {
      return {
        list:[],
        pageNum: 1,
        pageSize: 10,
        refreshing:false,
        loading:false,
        finished:false,
      }
    },
    mounted(){
      this.getList()
    },
    methods: {
      getList(){
        getInviteUsers({
          pageNum:this.pageNum,
          pageSize:this.pageSize 
        }).then(res => {
          if (this.refreshing) {
						this.list = []
						this.refreshing = false
					}
					let list = res.result.list
					this.total = res.result.total
					for (let i = 0 ; i <list.length ; i++) {
            list[i].phone = list[i].phone.slice(0,3)+'****'+ list[i].phone.slice(6,10)
						this.list.push(list[i])
					}
					this.loading = false
					if (this.list.length>=this.total) {
						this.finished = true;
					}
        })
      },
      onRefresh(){
        this.pageNum = 1
        this.finished = false;
        this.loading = true;
        this.getList()
        this.$toast('刷新列表')
      },
      onLoad(){
        this.pageNum++
        this.getList()
      },
    },
  }
</script>
<style lang='less' scoped>
  .inviteList-page {
    display: flex;
    flex-direction: column;
    .main {
      flex:1;
      display: flex;
      flex-direction: column;
      .bg {
        width:100%;
        height:2.32rem;
        background: url('../../assets/img/bg/bg13.png') no-repeat center/100%;
      }
      .list {
        flex:1;
        background: #FFF;
        display: flex;
        flex-direction: column;
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
        .content {
          flex:1;
        }
        .item {
          height:.9rem;
          padding:0 .4rem;
          
          /deep/ .van-cell__value {
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
  }
</style>