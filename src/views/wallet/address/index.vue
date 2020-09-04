<template>
  <div class='addressManage-page'>
    <HeaderBar title="地址管理" :back="true" :shadow="true" color="white" class="header">
      <img src="../../../assets/img/icon/add.png" alt="" class="addIcon" @click="$router.push('/addAddress')">
    </HeaderBar>
    <div class="main">
      <div class="addressList" v-if="addressList.length>0">
        <van-swipe-cell v-for="(item,index) in addressList" :key="index">
          <div class="detail">
            <van-radio :name="item.id" v-model="radion"></van-radio>
            <div class="text">
              <span class="name">{{item.name}}</span>
              <span class="address">{{item.address}}</span>
              <span class="remark">备注：{{item.mark}}</span>
            </div>
          </div>
          <template #right>
            <div class="edit">
              <img src="../../../assets/img/icon/edit.png" alt="">
            </div>
            <div class="delete" @click="showPop = true;deleteItem = item">
              <img src="../../../assets/img/icon/delete.png" alt="">
            </div>
          </template>
        </van-swipe-cell>
        <div class="btn">
          <button class="full scale">使用</button>
        </div>
      </div>
      <div class="noAddress" v-else>
        <img src="../../../assets/img/icon/book.png" alt="">
        <span class="tips">还没有添加到地址簿，快去添加吧!</span>
        <button class="full scale"  @click="$router.push('/addAddress')">添加地址</button>
      </div>
    </div>
    <van-dialog v-model="showPop" title="确认删除" show-cancel-button confirmButtonText="确认删除" cancelButtonColor="#969696" @confirm="confirmDelete">
      <div class="deleteDetail">
        <span class="name">{{deleteItem.name}}</span>
        <span class="address">{{deleteItem.address}}</span>
        <span class="remark">备注：{{deleteItem.mark}}</span>
      </div>
    </van-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return { 
        addressList:[{
          name:'AAA',
          address:'sjfdlkasdjflfdsaj',
          id:2,
          mark:'备注1'
        },{
          name:'BBB',
          address:'sjfdlkasdjflfdsaj',
          id:4,
          mark:'备注2'
        }],
        radion:2,
        showPop:false,
        deleteItem:''
      }
    },
    methods: {
      confirmDelete(){

      }
    },
  }
</script>
<style lang='less' scoped>
  .addressManage-page {
    display: flex;
    flex-direction: column;
    background: #F6F9FC;
    .header {
      .addIcon {
        width:.32rem;
        height:.32rem;
        pointer-events: auto;
      }
    }
    .main {
      flex:1;
      .addressList {
        /deep/ .van-swipe-cell {
          height:1.68rem;
          border-bottom:.01rem solid #E6E6E6;
          background: #FFF;
          .van-swipe-cell__wrapper{
            height:100%;
            .detail {
              height:100%;
              padding:.24rem .4rem;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              .van-radio {
                .van-radio__icon--checked {
                  .van-icon {
                    border-color:#42C1CA;
                    background: #42C1CA;
                  }
                }
              }
              .text {
                height:100%;
                margin-left:.2rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .name {
                  line-height: 1em;
                  font-size:.28rem;
                  color:#323232
                }
                .address {
                  line-height: 1em;
                  font-size:.26rem;
                  color:#323232;
                }
                .remark {
                  line-height: 1em;
                  color:#969696;
                  font-size:.24rem; 
                }
              }
            }
            .van-swipe-cell__right {
              display: flex;
              align-items: center;
              
              .edit {
                width:1.22rem;
                height:1.68rem;
                background: #42C1CA;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                  width:.38rem;
                }
              }
              .delete {
                width:1.22rem;
                height:1.68rem;
                background: #FF0400;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                  width:.4rem;
                }
              }
            }
          }
          
        }
        .btn {
          margin-top:.8rem;
          padding:0 .5rem;
          button {
            height:.96rem;
            border-radius: .12rem;
            font-size:.34rem;
            font-weight: 600;
          }
        }
      }
      .noAddress {
        height:100%;
        background: #FFF;
        padding:2.8rem .5rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        img {
          width:1.12rem;
          height:1.2rem;
          margin-bottom:.3rem;
        }
        .tips {
          margin-bottom:.8rem;
          color:#B1BCBC;
          font-size:.28rem;
        }
        button {
          height:.96rem;
          border-radius: .12rem;
          font-size:.34rem;
          font-weight: 600;
        }
      }
    }
    /deep/ .van-dialog {
      .van-dialog__header {
        padding:.6rem 0 .4rem;
        color:#323232;
        font-size:.32rem;
        font-weight: 500;
      } 
      .van-dialog__content {
        padding:0 .5rem .6rem;
        .deleteDetail {
          padding:.4rem;
          display: flex;
          flex-direction: column;
          background: #F6F9FC;
          border-radius: .12rem;
          .name {
            margin-bottom:.2rem;
            line-height: 1em;
            color:#323232;
            font-size:.28rem;
            font-weight: 500;
          }
          .address {
            margin-bottom:.22rem;
            line-height: 1em;
            font-size:.26rem;
            color:#323232;
          }
          .remark {
            line-height: 1em;
            font-size:.24rem;
            color:#969696;
          }
        }
      }
      .van-dialog__footer {

      }
    }
  }
</style>