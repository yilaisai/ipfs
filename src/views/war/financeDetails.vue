<template>
  <div class='financeDetails-page'>
    <HeaderBar title="商品详情" :back="true"  color="white" class="header"></HeaderBar>
    <div class="main"> 
      <div class="top">
        <div class="title">
          <p>
            <span>{{goods.name}}</span>
            <!-- <span class="tag">热销必选</span>
            <span class="tag" v-if="goods.remark">{{goods.remark}}</span> -->
          </p>
          <p>查看《产品购买协议》</p>
        </div>
        <div class="detail">
          <p>
            <span>{{rate}}%起</span>
            <span>年化利率</span>
          </p>
          <p>
            <span>{{day}}天起</span>
            <span>稳健收益 低风险</span>
          </p>
        </div>
      </div>
      <div class="bottom" v-if="goods.rates">
        <h5 class="title">商品属性</h5>
        <ul>
          <li v-for="(item,index) in goods.rates.split(',')" :key="index" @click="choose(index)" :class="{'active':activeIndex == index}">
            <span>{{goods.days.split(',')[index]}} 天</span>
            <span>年化利率{{goods.rates.split(',')[index]}}%</span>
          </li>
        </ul>
        <div class="buyBox">
          <p>
            <span>购买金额</span>
            <span>可用余额 : {{userInfo.amount}} FIL</span>
          </p>
          <div class="inputBox">
            <input type="text" v-model="amount" placeholder="请输入购买金额">
            <span>FIL</span>
          </div>
        </div>
        <div class="tips">
          <h5>说明</h5>
          <p>1.购买后将冻结您的账户余额；</p>
          <p>2.到期后会将您的本金及利息全部释放到您的账户余额中。</p>
        </div>
        <van-button type="primary" @click="buy" :disabled="!amount">立即购买</van-button>
      </div>
    </div>
    <van-popup v-model="showPop" class="popWin">
      <div class="top">
        <p class="title">确认购买？</p>
        <input type="password" v-model="fundPwd" placeholder="请输入资金密码" ref="input">
      </div>
      <div class="bottom">
        <div class="confirm" @click="confirmBuy">确定</div>
        <div class="cancel" @click="showPop = false">取消</div>
      </div>
    </van-popup>
    <van-popup v-model="showTips" class="popTips">
      <div class="text">购买成功！</div>
      <div class="btn" @click="$router.push('/financeOrders')">立即查看</div>
    </van-popup>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import { buyFinance } from '@/api/request'
  import Md5 from 'js-md5'
  export default {
    data() {
      return { 
        goods:'',
        activeIndex:0,
        amount:'',
        rate:'',
        day:'',
        showPop:false,
        showTips:false,
        fundPwd:''
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    mounted(){
      if(this.$route.query.goods) {
        this.goods = JSON.parse(this.$route.query.goods)
        this.rate = this.goods.rates.split(',')[0]
        this.day = this.goods.days.split(',')[0]
      }
    },
    methods: {
      choose(index){
        this.activeIndex = index
        this.rate = this.goods.rates.split(',')[index]
        this.day = this.goods.days.split(',')[index]
      },
      buy(){
        if(this.userInfo.amount < this.amount) {
            this.$toast('余额不足！')
            return
        }
        this.showPop = true
        this.fundPwd = ''
        // buyFinance({
        //   amount:this.amount,
        //   day:this.day,
        //   financeId:this.goods.id,
        //   rate:this.rate
        // }).then(res => {
          
        // })
      },
      confirmBuy(){
        if(!this.fundPwd) return
        buyFinance({
          amount:this.amount,
          day:this.day,
          financeId:this.goods.id,
          rate:this.rate/100,
          fundPwd:Md5(this.fundPwd)
        }).then(res => {
          this.showPop = false
          this.showTips = true
          this.amount = ''
          this.$store.dispatch('getUserInfo')
        })
      }
    },
  }
</script>
<style lang='less' scoped>
  .financeDetails-page {
    display: flex;
    flex-direction: column;
    .main {
      flex:1;
      display: flex;
      flex-direction: column;
      .top {
        margin-bottom:.2rem;
        padding:.2rem .4rem;
        background: #FFF;
        .title {
					display: flex;
          flex-direction: column;
          margin-bottom:.4rem;
					p {
						&:first-of-type {
							margin-bottom:.1rem;
							display: flex;
							align-items: center;
							span {
								&:first-of-type {
									line-height: 1em;
									font-size:.34rem;
									font-weight: 500;
									color:#000;
								}
								&.tag {
                  padding:.07rem .1rem;
                  margin-left:.1rem;
									border:.01rem solid #999;
									border-radius: .17rem;
									line-height: 1em;
									color:#999;
                  font-size:.2rem;
                  box-sizing: border-box;
								}
							}
						}
						&:last-of-type {
							color:#D9930B;
							font-size:.24rem;
						}
					}
				}
				.detail {
					display: flex;
					p {
						flex:1;
						display: flex;
						flex-direction: column;
						span {
							&:first-of-type {
								line-height: 1em;
								font-size:.4rem;
								margin-bottom:.06rem;
							}
							&:last-of-type {
								color:#969696;
								font-size:.24rem;
							}
						
						}
						&:first-of-type {
							span {
								&:first-of-type {
									color:#D9930B;
								}
							}
						}
						&:last-of-type {
							span {
								&:first-of-type {
									color:#000;
								}
							}
						}
					}
				}
      }
      .bottom {
        flex:1;
        padding:.4rem;
        background: #FFF;
        display: flex;
        flex-direction: column;
        .title {
          line-height: 1em;
          margin-bottom:.2rem;
          color:#646464;
          font-size:.34rem;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width:2.1rem;
            height:1.28rem;
            margin-right:.2rem;
            margin-bottom:.2rem;
            background: #FFF;
            border-radius: .16rem;
            border:.01rem solid #DCDCDC;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            &:nth-of-type(3n) {
              margin-right:0;
            }
            
            span {
              &:first-of-type {
                line-height: 1em;
                margin-bottom:.12rem;
                font-size:.32rem;
                color:#D9930B;
              }
              &:last-of-type {
                color:#969696;
                font-size:.24rem;
              }
            }
            &.active {
              background: #FA6400;
              border:none;
              span {
                color:#FFF;
              }
            }
          }
        }
        .buyBox {
          margin:.2rem 0 .4rem;
          p {
            margin-bottom:.2rem;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            span {
              &:first-of-type {
                line-height: 1em;
                color:#646464;
                font-size:.34rem;
              }
              &:last-of-type {
                line-height: 1em;
                color:#646464;
                font-size:.24rem;
              }
            }
          }
          .inputBox {
            position: relative;
            width:100%;
            height:.96rem;
            background: #F6F9FC;
            border-radius: .12rem;
            input {
              width:100%;
              height:100%;
              padding:0 .8rem 0 .2rem;
              font-size:.28rem;
              outline: none;
              border:none;
              background: transparent;
              box-sizing: border-box;
              &::placeholder {
                color:#B4B4B4;
              }
            }
            span {
              position: absolute;
              right:.2rem;
              top:50%;
              transform: translateY(-50%);
              color:#000;
              font-size:.28rem;
            }
          }
        }
        .tips {
          h5 {
            line-height: 1em;
            margin-bottom:.2rem;
            font-size:.24rem;
            color:#646464;
          }
          p {
            line-height: 1em;
            margin-bottom:.14rem;
            font-size:.24rem;
            color:#969696;
            &:last-of-type {
              margin-bottom:0;
            }
          }
        }
        .van-button {
					width:100%;
          height:.88rem;
          margin-top:.8rem;
					font-size:.32rem;
					background-color: #FA6400;
					border: 1px solid #FA6400;
				}
      }
    }
    .popWin {
      width:80%;
      border-radius: .14rem;
      .top {
        padding:.6rem .5rem;
        .title {
          margin-bottom:.6rem;
          color:#323232;
          font-size:.32rem;
          text-align: center;
        }
        input {
          width:100%;
          padding:0 .2rem;
          height:.96rem;
          background: #F6F9FC;
          border-radius: .12rem;
          outline: none;
          border:none;
          font-size:.28rem;
          box-sizing: border-box;
        }
      }
      .bottom {
        display: flex;
        height:1rem;
        line-height: 1rem;
        border-top:.01rem solid #DDD;
        text-align: center;
        font-size:.32rem;
        .confirm {
          flex:1;
          color:#42C1CA;
          border-right:.01rem solid #DDD;
        }
        .cancel {
          flex:1;
          color:#969696;
        }
      }
    }
    .popTips {
      width:80%;
      border-radius: .14rem;
      .text {
        padding:1rem 0;
        color:#323232;
        font-size:.32rem;
        text-align:center;
      }
      .btn {
        height:1rem;
        line-height: 1rem;
        border-top:.01rem solid #DDD;
        color: #42C1CA;
        font-size:.32rem;
        font-weight: 600;
        text-align: center;
      }
    }
  }
</style>