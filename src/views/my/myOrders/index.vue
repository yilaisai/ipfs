<template>
  <div class='myOrders-page'>
    <HeaderBar title="我的订单" :back="true"  color="white" class="header"></HeaderBar>
    <van-tabs 
    v-model="active" 
    sticky 
    color="#2C353F" 
    :immediate-check="false"
    :before-change="beforeChange"
    @change="changeTable">
      <van-tab :title="num == 1?'全部':num == 2?'审核中':num == 3?'已完成':'已取消'" v-for="num in 4" :key="num">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          v-if="list.length"
          >
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <div class="item-content" @click="$router.push({path:'/my-orderDetail',query:{id:item.id}})">
                <div class="item-top">
                  <span>订单号</span>
                  <span>{{item.id}}</span>
                </div>
                <div class="item-btm">
                  <div class="name">
                    <span>{{item.name}}</span>
                    <span>x{{item.amount}}</span>
                  </div>
                  <div class="amount">
                    <span>¥ {{item.price}}</span>
                    <span>实付 ¥<i>{{bigNumber(item.amount).times(item.price) }}</i></span>
                  </div>
                  <img src="../../../../public/img/order-audit.svg" alt="" v-if="item.status == 0">
                  <img src="../../../../public/img/order-finish.svg" alt="" v-else-if="item.status == 1">
                  <img src="../../../../public/img/order-fail.svg" alt="" v-else-if="item.status == 2">
                  <img src="../../../../public/img/order-cancel.svg" alt="" v-else-if="item.status == 3">
                </div>
              </div>
              <div class="item-btn" v-if="item.status == 0">
                <van-button class="btn" @click="activeItem = item;showConfirm = true">取消订单</van-button>
              </div>
            </li>
          </ul>
        </van-list>
        <div v-else-if="finished" class="noData">
          <img src="../../../../public/img/noData.svg" alt="">
          <span>暂无订单</span>
        </div>
      </van-tab>
      <!-- <van-tab title="审核中">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          v-if="list.length"
          >
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <span>{{item.amount}}</span>
              <van-button size="mini" v-if="item.status == 0" @click="cancelOrder(item)">取消订单</van-button>
            </li>
          </ul>
        </van-list>
        <div v-else class="noData">
          <img src="../../../public/img/noData.svg" alt="">
          <span>暂无订单</span>
        </div>
      </van-tab>
      <van-tab title="已完成">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          v-if="list.length"
          >
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <span>{{item.amount}}</span>
              <van-button size="mini" v-if="item.status == 0" @click="cancelOrder(item)">取消订单</van-button>
            </li>
          </ul>
        </van-list>
        <div v-else class="noData">
          <img src="../../../public/img/noData.svg" alt="">
          <span>暂无订单</span>
        </div>
      </van-tab>
      <van-tab title="已取消">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          v-if="list.length"
          >
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <span>{{item.amount}}</span>
              <van-button size="mini" v-if="item.status == 0" @click="cancelOrder(item)">取消订单</van-button>
            </li>
          </ul>
        </van-list>
        <div v-else class="noData">
          <img src="../../../public/img/noData.svg" alt="">
          <span>暂无订单</span>
        </div>
      </van-tab> -->
    </van-tabs>
    <van-dialog v-model="showConfirm" title="确认取消订单" show-cancel-button @cancel="showConfirm = false" @confirm="cancelOrder">
    </van-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  import { getUserBuyMineAudits, optUserBuyMineAudit } from '@/api/request'
  import bigNumber from 'bignumber.js'
  export default {
    data() {
      return { 
        active:0,
        list:[],
        auditList:[],
        finishList:[],
        cancelList:[],
        totalPower:'',
        totalRewards:'',
        loading: false,
        finished: false,
        pageSize:10,
        pageNum:1,
        total:0,
        status:'',
        showConfirm:false,
        activeItem:''
      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      async getList(){
        let res;
        let oldActive = this.active;
        if (this.active == 0) {
          res = await this.getData()
          if (oldActive != this.active) return
          this.total = res.total
          this.list = this.list.concat(res.list)
          if(this.list.length >= this.total) {
            this.finished = true
          }
        } else if(this.active == 1) {
          res = await this.getData()
          if (oldActive != this.active) return
          this.total = res.total
          this.auditList = this.auditList.concat(res.list)
          if(this.auditList.length >= this.total) {
            this.finished = true
          }
          console.log(this.auditList.length)
        } else if (this.active == 2) {
          res = await this.getData()
          if (oldActive != this.active) return
          this.total = res.total
          this.finishList = this.finishList.concat(res.list)
          if(this.finishList.length >= this.total) {
            this.finished = true
            console.log('finished')
          }
          
        } else {
          res = await this.getData()
          if (oldActive != this.active) return
          this.total = res.total
          this.cancelList = this.cancelList.concat(res.list)
          if(this.cancelList.length >= this.total) {
            this.finished = true
          }
        }
        this.loading = false
      },
      getData(){
        getUserBuyMineAudits({
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          status:this.status
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
        // return new Promise ((resolve, reject) => {
        //   getUserBuyMineAudits({
        //     pageNum:this.pageNum,
        //     pageSize:this.pageSize,
        //     status:this.status
        //   }).then(res=>{
        //     console.log("获取到数据时的pageNum："+this.pageNum)
        //     setTimeout(()=>{
        //       resolve(res.result)
        //     },500) 
        //   })
        // })
      },
      onLoad(){
        console.log('onload')
        console.log(this.loading)
        this.pageNum++
        this.getData()
      },
      changeTable(){
        console.log("第"+(this.active+1)+"个报表")
        this.list = []
        this.auditList = []
        this.finishList = []
        this.cancelList = []
        this.status = this.active == 0?'':this.active == 1? 0 : this.active == 2? 1 : 4
        let dom = document.getElementsByClassName('van-tabs__content')
        dom[0].scrollTo(0,0)
        this.pageNum = 1
        this.loading = false
        this.finished = false
        this.getData()
      },
      beforeChange(){
        console.log(this.loading)
        if(this.loading) {
          return false
        } else if(!this.loading && !this.finished && this.pageNum == 1 && !this.list.length) { 
          return false
        } else {
          return true
        }
      },
      bigNumber(val){
        return bigNumber(val)
      },
      cancelOrder(){
        optUserBuyMineAudit({
          id:this.activeItem.id,
          status:3
        }).then(res => {
          this.$toast(res.msg)
          this.pageNum = 1
          this.list = []
          this.getData()
        })
      }
    },
  }
</script>
<style lang='less' scoped>
  .myOrders-page {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #FFF;
    /deep/ .van-tabs {
      flex:1;
      display: flex;
      flex-direction: column;
      overflow-y: hidden;
      background: #E2E8ED;
      .van-tabs__wrap {
        height:.8rem;
        .van-tab--active {
          color:#42C1CA;
        }
        .van-tabs__line {
          background-color:#42C1CA !important;
        }
      }
      .van-tabs__content {
        overflow: auto;
        background: #E2E8ED;
      }
      ul {
        padding:.2rem;
        position: relative;
        li {
          margin-bottom:.1rem;
          display: flex;
          flex-direction: column;
          background: #FFF;
          &:last-of-type {
            margin-bottom:0;
          }
          .item-content {
            padding:0 .3rem;
            display: flex;
            flex-direction: column;
            .item-top {
              position: relative;
              padding:.3rem 0;
              border-bottom:.01rem dashed #CBD3DD;
              display: flex;
              justify-content: space-between;
              align-items: center;
              span {
                line-height: 1em;
                font-size:.28rem;
                color:#323232;
              }
            }
            .item-btm {
              position: relative;
              padding:.4rem 0;
              display: flex;
              flex-direction: column;
              &::before {
                content:'';
                position: absolute;
                top:-.15rem;
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
                top:-.15rem;
                right:-.45rem;
                width:.3rem;
                height:.3rem;
                background: #E2E7ED;
                border-radius: 50%;
                z-index:9;
              }
              .name {
                margin-bottom:.2rem;
                display: flex;
                justify-content: space-between;
                span {
                  line-height: 1em;
                  font-size:.24rem;
                  color:#323232;
                }
              }
              .amount {
                display: flex;
                justify-content: space-between;
                span {
                  font-size:.24rem;
                  color:#323232;
                  &:last-of-type {
                    color:#969696;
                    font-size:.2rem;
                    i {
                      font-style: normal;
                      font-weight: 500;
                      color:#FA6400;
                      font-size:.24rem;
                    }
                  }
                }
              }
              img {
                position: absolute;
                width:1rem;
                height:1rem;
                left:50%;
                top:50%;
                margin-left:-.5rem;
                margin-top:-.5rem;
              }
            }
          }
          .item-btn {
            padding:.2rem .3rem;
            border-top:.01rem dashed #CBD3DD;
            display: flex;
            justify-content: flex-end;
            .btn {
              height:.6rem;
              padding:0 .42rem;
              color:#646464;
              font-size:.24rem;
              border-radius: .12rem;
              border:.01rem solid #B4B4B4;
            }
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
        color:#bbb;
        font-size:.28rem;
      }
    }
  }
</style>