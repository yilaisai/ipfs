<template>
  <div class='overView-page'>
    <HeaderBar title="全网信息" :back="true" :shadow="true" color="white" class="header"></HeaderBar>
    <div class="main">
      <div class="view">
        <div class="title">概览</div>
        <ul class="content">
          <li>
            <span>区块高度</span>
            <span>{{height}}</span>
          </li>
          <li>
            <span>全网有效算力</span>
            <span>{{$changeToPiB(overview.totalQualityAdjPower) || 0}} PiB</span>
          </li>
          <li>
            <span>活跃矿工数</span>
            <span>{{overview.activeMiners}}</span>
          </li>
          <!-- <li>
            <span>24h平均挖矿收益</span>
            <span>{{overview.totalQualityAdjPower}} FIL/TiB</span>
          </li> -->
          <li>
            <span>近24h产出量</span>
            <span>{{Math.round(overview.dailyCoinsMined/1000000000000000000)}} FIL</span>
          </li>
          <li>
            <span>平均区块间隔</span>
            <span>{{Math.round(overview.averageTipsetInterval*100)/100}} 秒</span>
          </li>
          <li>
            <span>平均每高度区块数量</span>
            <span>{{Math.round(overview.averageTipsetBlocks*100)/100}}</span>
          </li>
          <li>
            <span>每区块奖励</span>
            <span>{{Math.round(overview.blockReward/100000000000000)/10000}} FIL</span>
          </li>
          <li>
            <span>最新价格</span>
            <span>{{overview.price}} $</span>
          </li>
        </ul>
      </div>
      <div class="canvas">
        <div class="title">24h基础手续费率走势(attoFIL)</div>
        <div id="canvas"></div>
      </div>
      <div class="rank">
        <div class="title">
          <span class="left">挖矿排行榜</span>
          <span class="right" @click="$router.push('/rank')">更多<img src="../../assets/img/home/right2.png" alt=""></span>
        </div>
        <ul class="content">
          <li class="nav">
            <span>排名</span>
            <span>矿工</span>
            <span>标签</span>
            <span>有效算力/占比</span>
            <span>地区</span>
          </li>
          <li v-for="(item,index) in list" :key="index">
            <span v-if="index == 0"><img src="../../assets/img/icon/first.png" alt=""></span>
            <span v-else-if="index == 1"><img src="../../assets/img/icon/second.png" alt=""></span>
            <span v-else-if="index == 2"><img src="../../assets/img/icon/third.png" alt=""></span>
            <span v-else><span>{{index+1}}</span></span>
            <span>{{item.address}}</span>
            <span v-if="item.tag">{{item.tag.name}}</span>
            <span v-else>--</span>
            <span>{{Math.round(item.qualityAdjPower/1024/1024/1024/1024/1024*10)/10}} PiB/ {{Math.round(item.qualityAdjPower/totalPower*10000)/100}}%</span>
            <span v-if="item.location">{{item.location.countryName}}</span>
            <span v-else>N/A</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import echarts from "../../assets/echarts"
  import axios from 'axios'
  export default {
    data() {
      return { 
        data:{
          x:[],
          y:[],
        },
        list:[],
        totalPower:''
      }
    },
    mounted(){
      this.getFeeData()
      this.getList()
    },
    methods: {
      getFeeData(){
        axios.get('https://filfox.info/api/v1/stats/base-fee?duration=24h&samples=48').then(res => {
          this.handleDate(res.data)
        })
      },
      getList(){
        axios.get('https://filfox.info/api/v1/miner/top-miners/power?count=5',{
          headers:{
            Locale:'zh'
          }
        }).then(res => {
          if(res.status == 200) {
            this.list = res.data.miners
            this.totalPower = res.data.totalQualityAdjPower
          }
        })
      },
      handleDate(list){
        list.forEach(el => {
          this.$set(el,'hour',this.$fmtDate(el.timestamp*1000,'hour'))
          this.data.x.push(this.$fmtDate(el.timestamp*1000,'hour'))
          this.data.y.push(el.baseFee)
        })
        this.initCanvas()
      },
      initCanvas(){
        console.log(this.data)
        this.drawLine()
      },
      drawLine(){
        var myChart = echarts.init(document.getElementById('canvas'));
        let option = {
          grid:{
              left: '5%',
              right: '5%',
              bottom:'5%',
              top:'10%',
              containLabel: true,
              show:true,
              borderColor:'transparent'
          },
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            boundaryGap:false,
            data: this.data.x,
            axisLine:{
              show:false
            },
            axisTick:{
              show:false
            },
          },
          yAxis: {
            type: 'value',
            axisLine:{
              show:false  //不显示Y轴的轴线
            },
            axisTick:{
              show:false  //不现实Y轴的刻度
            },
            splitLine: {
              show: false
            },
            nameTextStyle:{
              fontSize:16
            }
          },
          series: [{
            type:'line',
            data:this.data.y,
            smooth:true,
            itemStyle:{   //拐点样式
                color:'#FF6E1F'
            },
            lineStyle:{   //折线样式
              color:'#FF6E1F'
            },
            areaStyle:{   //填充区域样式
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#FF6E1F' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#FFF' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                },
                opacity:.5
            },
            showSymbol: false
          }],
        }
        myChart.setOption(option)
      }
    },
    computed: {
      ...mapState(['overview','height'])
    },
  }
</script>
<style lang='less' scoped>
  .overView-page {
    display: flex;
    flex-direction: column;
    background:#F1F4F7;
    overflow: hidden;
    .main {
      flex:1;
      padding: .2rem;
      overflow: auto;
      .view {
        background: #FFF;
        border-radius: .12rem;
        .title {
          padding:0 .3rem;
          height:.92rem;
          line-height: .92rem;
          color:#323232;
          font-size:.32rem;
          font-weight:500;
          border-bottom:.01rem solid #E6E6E6;
        }
        .content {
          padding:.3rem;
          li {
            margin-bottom:.2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              line-height: 1em;
              font-size:.28rem;
              color:#323232;
              &:first-of-type {
                color:#969696;
              }
            }
            &:last-of-type {
              margin-bottom:0;
            }
          }
        }
      }
      .canvas {
        margin:.2rem 0;
        background: #FFF;
        border-radius: .12rem;
        .title {
          padding:0 .3rem;
          height:.92rem;
          line-height: .92rem;
          color:#323232;
          font-size:.32rem;
          font-weight:500;
          border-bottom:.01rem solid #E6E6E6;
        }
        #canvas {
          width:100%;
          height:3.12rem;
        }
      }
      .rank {
        background: #FFF;
        border-radius: .12rem;
        .title {
          padding:0 .2rem 0 .3rem;
          height:.92rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .left {
            font-size:.32rem;
            font-weight: 500;
            color:#323232;
          }
          .right {
            padding: .1rem;
            color:#FF6E1F;
            font-size:.24rem;
            img {
              width:.11rem;
              margin-left:.04rem;
            }
          }
        }
        ul {
          li {
            height:.86rem;
            padding:0 .3rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              height:100%;
              line-height: .86rem;
              flex:1;
              border-bottom:.01rem solid #E6E6E6;
              color:#323232;
              font-size:.24rem;
              font-weight: 500;
              text-align: center;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
              &:first-of-type {
                flex:none;
                width:.4rem;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                  width:.4rem;
                  pointer-events:auto;
                }
                span {
                  height:.4rem;
                  border-radius: 50%;
                  background: #F5F5F5;
                  color:#FF6E1F;
                }
              }
              &:last-of-type {
                text-align: right;
                flex:none;
                width:1rem;
              }
              &:nth-of-type(4) {
                flex:none;
                width:2rem;
              }
            }
            &:last-of-type {
              span {
                border-bottom:none;
              }
            }
          }
          .nav {
            height:.6rem;
            background: rgba(230,230,230,.6);
            span {
              border-bottom:none;
              line-height: .6rem;
              color:#969696;
              font-size:.2rem;
            }
          }
        }
      }
    }
  }
</style>