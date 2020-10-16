<template>
  <div class='rank-page'>
    <HeaderBar title="挖矿排行榜" :back="true"  color="white" class="header"></HeaderBar>
    <van-tabs 
    v-model="active" 
    sticky 
    color="#2C353F" 
    @change="changeTable">
      <van-tab title="有效算力">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <ul class="left">
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
              <span v-if="item.qualityAdjPower.length>15">{{$changeToPiB(item.qualityAdjPower)}} PiB/ {{Math.round(item.qualityAdjPower/totalPower*10000)/100}}%</span>
              <span v-else>{{$changeToPiB(item.qualityAdjPower,'TiB')}} TiB/ {{Math.round(item.qualityAdjPower/totalPower*10000)/100}}%</span>
              <span v-if="item.location">{{item.location.countryName}}</span>
              <span v-else>N/A</span>
            </li>
          </ul>
        </van-list>
      </van-tab>
      <van-tab title="出块数">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <ul class="mid">
            <li class="nav">
              <span>排名</span>
              <span>矿工</span>
              <span>出块份数</span>
              <span>出块奖励/占比</span>
              <span>地区</span>
            </li>
            <li v-for="(item,index) in list" :key="index">
              <span v-if="index == 0"><img src="../../assets/img/icon/first.png" alt=""></span>
              <span v-else-if="index == 1"><img src="../../assets/img/icon/second.png" alt=""></span>
              <span v-else-if="index == 2"><img src="../../assets/img/icon/third.png" alt=""></span>
              <span v-else><span>{{index+1}}</span></span>
              <span>{{item.address}}</span>
              <span>{{item.weightedBlocksMined}}</span>
              <span>{{Math.round(item.totalRewards/10000000000000000)/100}} FIL/ {{Math.round(item.totalRewards/totalRewards*10000)/100}}%</span>
              <span v-if="item.location">{{item.location.countryName}}</span>
              <span v-else>N/A</span>
            </li>
          </ul>
        </van-list>
      </van-tab>
      <van-tab title="算力增速">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <ul class="right" v-if="active == 2">
            <li class="nav">
              <span>排名</span>
              <span>矿工</span>
              <span>算力增速</span>
              <span>矿机当量</span>
              <span>算力增量</span>
              <span>地区</span>
            </li>
            <li v-for="(item,index) in list" :key="index">
              <span v-if="index == 0"><img src="../../assets/img/icon/first.png" alt=""></span>
              <span v-else-if="index == 1"><img src="../../assets/img/icon/second.png" alt=""></span>
              <span v-else-if="index == 2"><img src="../../assets/img/icon/third.png" alt=""></span>
              <span v-else><span>{{index+1}}</span></span>
              <span>{{item.address}}</span>
              <span v-if="item.rawBytePowerGrowth && item.rawBytePowerGrowth.length>15">{{$changeToPiB(item.rawBytePowerGrowth)}} PiB/天</span>
              <span v-else-if="item.rawBytePowerGrowth">{{$changeToPiB(item.rawBytePowerGrowth,'TiB')}} TiB/天</span>
              <span>{{Math.round(item.equivalentMiners*100)/100}}</span>
              <span v-if="item.qualityAdjPowerDelta && item.qualityAdjPowerDelta.length>15">{{$changeToPiB(item.qualityAdjPowerDelta)}} PiB</span>
              <span v-else-if="item.qualityAdjPowerDelta">{{$changeToPiB(item.qualityAdjPowerDelta,'TiB')}} TiB</span>
              <span v-if="item.location">{{item.location.countryName}}</span>
              <span v-else>N/A</span>
            </li>
          </ul>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return { 
        active:0,
        list:[],
        totalPower:'',
        totalRewards:'',
        loading: false,
        finished: false,
        pageSize:50,
        page:-1,
        totalCount:0,
      }
    },
    mounted(){
    },
    methods: {
      onLoad(){
        this.getData()
      },
      changeTable(){
        let dom = document.getElementsByClassName('van-tabs__content')
        dom[0].scrollTo(0,0)
        this.page = 0
        this.loading = false
        this.finished = false
        if(this.active == 0) {
          axios.get(`https://filfox.info/api/v1/miner/list/power?pageSize=${this.pageSize}&page=${this.page}`,{
            headers:{
              Locale:'zh'
            }
          }).then(res => {
            if(res.status === 200) {
              let data = res.data
              this.totalCount = data.totalCount
              this.totalPower = data.totalQualityAdjPower
              this.list = data.miners
            }
          })
        } else if(this.active == 1){
          axios.get(`https://filfox.info/api/v1/miner/list/blocks?pageSize=${this.pageSize}&page=${this.page}&duration=24h`,{
            headers:{
              Locale:'zh'
            }
          }).then(res => {
            if(res.status === 200) {
              let data = res.data
              this.totalCount = data.totalCount
              this.totalPower = data.totalQualityAdjPower
              this.totalRewards = data.totalRewards
              this.list = data.miners
            }
          })
        } else if (this.active == 2) {
          axios.get(`https://filfox.info/api/v1/miner/list/power-growth?pageSize=${this.pageSize}&page=${this.page}&duration=24h`,{
            headers:{
              Locale:'zh'
            }
          }).then(res => {
            if(res.status === 200) {
              let data = res.data
              this.totalCount = data.totalCount
              this.totalPower = data.totalQualityAdjPower
              this.list = data.miners
            }
          })
        }
      },
      getData(){
        this.page++
        if(this.active == 0) {
          axios.get(`https://filfox.info/api/v1/miner/list/power?pageSize=${this.pageSize}&page=${this.page}`,{
            headers:{
              Locale:'zh'
            }
          }).then(res => {
            if(res.status === 200) {
              this.handleData(res.data)
            }
          })
        } else if(this.active == 1){
          axios.get(`https://filfox.info/api/v1/miner/list/blocks?pageSize=${this.pageSize}&page=${this.page}&duration=24h`,{
            headers:{
              Locale:'zh'
            }
          }).then(res => {
            if(res.status === 200) {
              this.handleData(res.data)
            }
          })
        } else if (this.active == 2) {
          axios.get(`https://filfox.info/api/v1/miner/list/power-growth?pageSize=${this.pageSize}&page=${this.page}&duration=24h`,{
            headers:{
              Locale:'zh'
            }
          }).then(res => {
            if(res.status === 200) {
              this.handleData(res.data)
            }
          })
        }
      },
      handleData(data){
        this.totalCount = data.totalCount
        this.totalPower = data.totalQualityAdjPower
        this.totalRewards = data.totalRewards
        for(let i = 0;i<data.miners.length;i++) {
          this.list.push(data.miners[i])
        }
        this.loading = false;
        if (this.list.length >= this.totalCount) {
          this.finished = true;
        }
      }
    },
  }
</script>
<style lang='less' scoped>
  .rank-page {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /deep/ .van-tabs {
      flex:1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .van-tabs__wrap {
        height:.8rem;
      }
      .van-tabs__content {
        overflow: auto;
      }
      ul {
        position: relative;
        padding-top:.6rem;
        background: #FFF;
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
              width:.45rem;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                width:.4rem;
                pointer-events:auto;
              }
              span {
                width:.45rem;
                height:.45rem;
                line-height: .45rem;
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
          position: fixed;
          left:0;
          top:1.7rem;
          width:100%;
          height:.6rem;
          background:#F1F4F7;
          span {
            border-bottom:none;
            line-height: .6rem;
            color:#969696;
            font-size:.2rem;
          }
        }
      }
      .mid {
        li {
          span {
            &:nth-of-type(4) {
              width:2.5rem;
            }
          }
        }
      }
      .right {
        li {
          span {
            &:nth-of-type(3) {
              flex:none;
              width:1.8rem;
            }
            &:nth-of-type(4) {
              flex:1;
            }
          }
        }
      }
    }
  }
</style>