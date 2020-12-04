<template>
  <div class='balance-page'>
    <HeaderBar title="账户余额" :back="true"  color="#323232" class="header"></HeaderBar>
    <div class="main">
      <div class="top">
        <div class="total">
          <p>余额</p>
          <p>
            <span>{{userInfo.amount || 0}}</span>
            <span>FIL</span>
          </p>
        </div>
        <div class="btns">
          <div class="recharge" @click="$router.push('/recharge')">
            <img src="../../../assets/img/icon/recharge.png" alt="">
            <span>充值</span>
          </div>
          <div class="withdraw" @click="$router.push('/withdraw')">
            <img src="../../../assets/img/icon/withdraw.png" alt="">
            <span>提现</span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <van-tabs 
          v-model="active" 
          sticky 
          color="#2C353F" 
          @change="changeTable">  
          <van-tab title="充值记录">
            <div class="tab">
              <span>类型</span>
              <span>数量</span>
              <span>币种</span>
              <span>状态</span>
            </div>
            <div class="container">
                <van-list
                  v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad">
                  <ul>
                    <li class="item" v-for="(item,index) in list" :key="index" @click="$router.push({path:'/rechargeDetail',query:{data:JSON.stringify(item)}})">
                      <div class="item-top">
                        <span>充值</span>
                        <span>{{item.amount}}</span>
                        <span>FIL</span>
                        <span :class="item.optStatus == 0?'gray':item.optStatus ==1 ?'':item.optStatus ==2?'green':'red'">{{item.optStatus | filterRecharge}}</span>
                      </div>
                      <div class="item-bottom">
                        <span>{{item.createTimestamp | fmtDate('full')}}</span>
                        <img src="../../../assets/img/icon/arrow3.png" alt="">
                      </div>
                    </li>
                  </ul>
                </van-list>
            </div>
          </van-tab>
          <van-tab title="提现记录">
            <div class="tab">
              <span>类型</span>
              <span>数量</span>
              <span>币种</span>
              <span>状态</span>
            </div>
            <div class="container">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
                <ul>
                  <li class="item" v-for="(item,index) in list" :key="index" @click="$router.push({path:'/withdrawDetail',query:{data:JSON.stringify(item)}})">
                    <div class="item-top">
                      <span>提现</span>
                      <span>{{item.amount}}</span>
                      <span>FIL</span>
                      <span :class="item.recdStatus == 0?'red':item.recdStatus ==1 ?'green':item.recdStatus ==2?'green':'gray'">{{item.recdStatus | filterWithdraw}}</span>
                    </div>
                    <div class="item-bottom">
                      <span>{{item.createTimestamp | fmtDate('full')}}</span>
                      <img src="../../../assets/img/icon/arrow3.png" alt="">
                    </div>
                  </li>
                </ul>
              </van-list>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import {getRechargeList, getWithdrawList} from '@/api/request'
  export default {
    data() {
      return { 
        loading:false,
        finished:false,
        list:[],
        total:0,
        form:{
          pageNum:0,
          pageSize:6,
        },
        active:0
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    mounted(){
      this.getData()
    },
    methods: {
      onLoad(){
        console.log('onload')
        this.getData()
      },
      getData(){
        this.form.pageNum++
        if(this.active == 0) {
          // 充值记录
          getRechargeList(this.form).then(res => {
            let result = res.result
            this.total = result.total
            this.list = this.form.pageNum == 1?result.list:this.list.concat(result.list)
            this.loading = false;
            if (this.list.length >= this.total) {
              this.finished = true;
            }
          })
        } else {
          //提现记录
          getWithdrawList(this.form).then(res => {
            let result = res.result
            this.total = result.total
            this.list = this.form.pageNum == 1?result.list:this.list.concat(result.list)
            this.loading = false;
            if (this.list.length >= this.total) {
              this.finished = true;
            }
          })
        }
      },
      changeTable(){
        this.list = []
        let dom = document.getElementsByClassName('van-tabs__content')
        dom[0].scrollTo(0,0)
        this.form.pageNum = 0
        this.loading = false
        this.finished = false
        this.onLoad()
      }
    },
    filters:{
      filterRecharge(val) {
        switch(val) {
          case 0:
            return '审核失败'
            break
          case 1:
            return '充值成功'
            break
          case 2:
            return '待审核'
            break
          case 3:
            return '审核成功'
            break
          default:
            break
        }
      },
      filterWithdraw(val){
        switch(val) {
          case 0:
            return '审核失败'
            break
          case 1:
            return '提现成功'
            break
          case 2:
            return '待审核'
            break
          case 3:
            return '审核成功'
            break
          default:
            break
        }
      },

    },
  }
</script>
<style lang='less' scoped>
  .balance-page {
    background: #F1F4F7;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .main {
      flex:1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .top {
        padding:0 .3rem .3rem;
        margin-bottom:.1rem;
        background: #FFF;
        .total {
          width:100%;
          height:2.2rem;
          padding:.6rem;
          margin-bottom:.3rem;
          background: url(../../../assets/img/bg/bg15.png) no-repeat center;
          background-size: 100% 2.2rem;
          box-sizing: border-box;
          p {
            color:#FFF;
            &:first-of-type {
              font-size:.24rem;
            }
            &:last-of-type {
              span {
                font-size:.64rem;
                &:last-of-type {
                  margin-left:.1rem;
                  font-size:.32rem;
                }
              }
            }
          }
        }
        .btns {
          padding:0 .3rem;
          display: flex;
          justify-content: space-between;
          >div {
            width:3rem;
            height:.64rem;
            border-radius: .06rem;
            border: .01rem solid #C8C8C8;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width:.36rem;
              height:.3rem;
              margin-right:.18rem;
            }
            span {
              font-size:.28rem;
              font-weight: 500;
              color:#191919;
            }
          }
        }
      }
      .bottom {
        flex:1;
        background: #FFF;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        /deep/ .van-tabs {
          display: flex;
          flex-direction: column;
          overflow-y: hidden;
          .van-tabs__content {
            flex:1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            .van-tab__pane {
              height:100%;
              display: flex;
              flex-direction: column;
              .container {
                flex:1;
                overflow: hidden;
              }
            }
          }
        }
        .title {
          height:1rem;
          line-height: 1rem;
          padding:0 .3rem;
          color:#191919;
          font-size:.4rem;
          font-weight: 500;
          box-sizing: border-box;
        }
        .tab {
          height:.4rem;
          padding:0 .3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #F1F4F7;
          span {
            flex:1;
            color:#969696;
            font-size:.22rem;
            text-align: center;
            &:first-of-type {
              text-align: left;
            }
            &:last-of-type {
              text-align: right;
            }
          }
        }
        /deep/ .van-list {
          height:100%;
          overflow-y:auto;
        }
        ul {
          .item {
            padding:.3rem;
            display: flex;
            flex-direction: column;
            border-bottom:.01rem solid #DCE7F1;
            &-top {
              margin-bottom:.3rem;
              display: flex;
              align-items: center;
              justify-content: space-between;
              span {
                flex:1;
                color:#323232;
                font-size:.28rem;
                text-align: center;
                &:first-of-type {
                  text-align: left;
                }
                &:last-of-type {
                  text-align: right;
                  &.green {
                    color:#128758;
                  }
                  &.red {
                    color:#C83C3C;
                  }
                  &.gray {
                    color:#969696;
                  }
                }
              }
            }
            &-bottom {
              display: flex;
              align-items: center;
              justify-content: space-between;
              span {
                color:#646464;
              }
              img {
                width:.11rem;
                height:.2rem;
              }
            }
          }
        }
      }
    }
  }
</style>