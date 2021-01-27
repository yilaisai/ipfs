<template>
  <div class='withdraw-detail-page'>
    <HeaderBar title="提现详情" :back="true" :shadow="true" color="white"></HeaderBar>
    <div class="main">
      <ul>
        <li class="amount">
          <span>- {{detail.amount}}</span>
          <span>FIL</span>
        </li>
        <li>
          <span>类型</span>
          <span>提现</span>
        </li>
        <li>
          <span>主网</span>
          <span>Filecoin</span>
        </li>
        <li>
          <span>状态</span>
          <span>{{detail.recdStatus | filterStatus}}</span>
        </li>
        <li v-if="detail.recdStatus == 0">
          <span>备注</span>
          <span>{{detail.sysRemark}}</span>
        </li>
        <li>
          <span>提现地址</span>
          <span class="word">{{detail.targetCoinAddr}}</span>
        </li>
        <li>
          <span>TXID</span>
          <span class="word">{{detail.txId}}</span>
        </li>
        <li>
          <span>手续费</span>
          <span>{{detail.fee}} FIL</span>
        </li>
        <li>
          <span>时间</span>
          <span>{{detail.createTimestamp | fmtDate('full')}} </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  
  export default {
    data() {
      return { 
        detail:''
      }
    },
    mounted(){
      console.log(JSON.parse(this.$route.query.data))
      this.detail = JSON.parse(this.$route.query.data)
    },
    methods: {
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
  .withdraw-detail-page {
    background: #F6F9FC;
    .main {
      background: #FFF;
      ul {
        li {
          padding:.36rem .4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom:.01rem solid #E6E6E6;
          span {
            color:#969696;
            font-size:.28rem;
            &:last-of-type {
              color:#323232;
            }
            &.word {
              max-width: 4.35rem;
              font-size:.22rem;
              word-break:break-all;
              text-align: right;
            }
          }
        }
        .amount {
          height:2.04rem;
          padding:0;
          display: flex;
          justify-content: center;
          span {
            font-size:.44rem;
            color:#C83C3C;
            &:last-of-type {
              position: relative;
              top:.05rem;
              margin-left:.15rem;
              font-size:.32rem;
              color:#C83C3C;
            }
          }
        }
      }
    }
  }
</style>