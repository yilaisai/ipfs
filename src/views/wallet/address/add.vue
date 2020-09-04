<template>
  <div class='addAddress-page'>
    <HeaderBar title="添加地址" :back="true" :shadow="true" color="white" class="header"></HeaderBar>
    <div class="main">
      <div class="address-wrap">
        <label>地址</label>
        <div class="inputBox">
          <input type="text" placeholder="输入或长按粘贴地址" v-model.trim="address">
          <img src="../../../assets/img/icon/saoyisao.png" alt="" class="saoyisao" @click.stop="saoyisao">
        </div>
      </div>
      <div class="remark-wrap">
        <label>备注</label>
        <input type="text" placeholder="标签信息最多 20 个字符" v-model.trim="remark">
      </div>
      <button class="full scale">确定</button>
    </div>
    <van-popup v-model="showScan" position="bottom" :style="{ height: '75%' }"  @click-overlay="closeScan">
			<div id="bcid">
			</div>
		</van-popup>
  </div>
</template>
<script>
  export default {
    data() {
      return { 
        address:'',
        remark:'',
        showScan:false
      }
    },
    methods: {
      saoyisao() {
        this.showScan = true
        this.$nextTick(()=>{
          this.intScan()
        })
      },
      intScan() {
        if (!window.plus){
          this.$dialog.alert({
            message: '请在客户端操作'
          })
          this.showScan = false
          return;
        }
        let This = this
        This.scan =  new plus.barcode.Barcode('bcid', [plus.barcode.QR, plus.barcode.EAN8, plus.barcode.EAN13], {
          frameColor: '#009DE2',
          scanbarColor: '#009DE2',
        });
        This.scan.start()
        This.scan.onmarked = function(type,result){
          switch (type) {
            case window.plus.barcode.QR:
              type = 'QR';
              break;
            case window.plus.barcode.EAN13:
              type = 'EAN13';
              break;
            case window.plus.barcode.EAN8:
              type = 'EAN8';
              break;
            default:
              type = '其它' + type;
              break;
          }
          This.address = result
          This.scan.close();
          This.showScan = false
        }
        This.scan.onerror = function(){
          This.$toast('无法识别条码！')
          This.$router.push('/asset')
        }
      },
      closeScan(){
        if (!window.plus){return;} this.scan.close()
      }
    },
  }
</script>
<style lang='less' scoped>
  .addAddress-page {
    background: #FFF;
    .main {
      padding: .4rem .5rem;
      >div {
        label {
          font-size:.24rem;
          color:#646464;
        }
      }
      .address-wrap {
        margin-bottom:.4rem;
        .inputBox {
          margin-top:.1rem;
          position: relative;
          input {
            width:100%;
            height:.96rem;
            padding:0 .8rem 0 .2rem;
            background: #F6F9FC;
            border-radius: .12rem;
            font-size:.28rem;
            color:#232323;
            box-sizing: border-box;
            &::placeholder {
              color:#B4B4B4;
            }
          }
          .saoyisao {
            position: absolute;
            right:0;
            top:50%;
            width:.32rem;
            height:.32rem;
            padding:.2rem;
            margin-top:-0.36rem;
            pointer-events: auto;
          }
        }
      }
      .remark-wrap {
        margin-bottom:.8rem;
        input {
          margin-top:.1rem;
          width:100%;
          height:.96rem;
          padding:0 .2rem;
          background: #F6F9FC;
          border-radius: .12rem;
          font-size:.28rem;
          color:#232323;
          box-sizing: border-box;
          &::placeholder {
            color:#B4B4B4;
          }
        }
      }
      button {
        height:.96rem;
        border-radius: .12rem;
        font-size:.34rem;
      }
    }
  }
</style>