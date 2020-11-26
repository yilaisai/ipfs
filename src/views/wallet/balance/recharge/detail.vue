<template>
  <div class='recharge-detail-page'>
    <HeaderBar title="充值详情" :back="true" :shadow="true" color="white"></HeaderBar>
    <div class="main">
      <ul>
        <li class="amount">
          <span>+ {{detail.amount}}</span>
          <span>FIL</span>
        </li>
        <li>
          <span>类型</span>
          <span>充值</span>
        </li>
        <li>
          <span>主网</span>
          <span>Filecoin</span>
        </li>
        <li>
          <span>状态</span>
          <span>{{detail.optStatus | filterStatus}}</span>
        </li>
        <li>
          <span>TXID</span>
          <span class="word">{{detail.txId}}</span>
        </li>
        <li @click="ImagePreview(detail.urls.split(','))">
          <span>充值凭证</span>
          <span>点击查看</span>
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
  import { ImagePreview } from 'vant';
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
      ImagePreview(urls){
        return ImagePreview(urls)
      }
    },
    filters:{
      filterStatus(status){
        switch(status) {
          case 0:
            return '充值失败'
            break;
          case 1:
            return '充值成功'
            break;
          case 2:
            return '待审核'
            break;
          case 3:
            return '审核失败'
            break;
          default:
            break;
        }
      }
    }
  }
</script>
<style lang='less' scoped>
  .recharge-detail-page {
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
            color:#323232;
            font-size:.28rem;
            &:first-of-type {
              color:#969696;
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
            color:#128758;
            &:last-of-type {
              position: relative;
              top:.05rem;
              margin-left:.15rem;
              font-size:.32rem;
              color:#128758;
            }
          }
        }
      }
    }
  }
</style>