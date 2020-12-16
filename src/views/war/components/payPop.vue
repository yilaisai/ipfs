<template>
  <div>
    <van-popup v-model="show" get-container="body" closeable round position="bottom"  class="payPop">
      <div class="title">
        <span>确认订单</span>
      </div>
      <div class="content">
        <div class="detailBox">
          <div>
            <span>商品名称</span>
            <span>{{item.name}}</span>
          </div>
          <div>
            <span>合约期限</span>
            <span>{{Math.floor(item.proTime / 30)}}</span>
          </div>
          <div>
            <span>单价</span>
            <span>¥ {{item.price}}</span>
          </div>
          <div>
            <span>购买数量（T）</span>
            <van-stepper v-model="item.buyAmount" integer min="1" :max="item.remainAmount" />
          </div>
        </div>
        <div class="inputBox">
          <div>
            <span>总金额</span>
            <span>¥ {{bigNumber(item.buyAmount).times(item.price)}}</span>
          </div>
          <div>
            <span>联系人</span>
            <input type="text" v-model="name">
          </div>
          <div>
            <span>手机号码</span>
            <input type="number" v-model="phone" maxlength="11">
          </div>
        </div>
      </div>
      <div class="btns">
        <div class="tips" @click="active = !active">
          <span :class="[{'active':active},'radio']"><img src="../../../assets/img/icon/ticked.svg" alt="" v-if="active"></span>
          <p>我已阅读并同意</p>
          <span class="agreement" @click.stop="showTips = true">《租赁协议》</span>
        </div>
        <van-button type="primary" @click="confirmBuy">立即购买</van-button>
      </div>
    </van-popup>
    <van-dialog v-model="showTips" class="popTips" title="深圳星际云储存科技有限公司云储力租赁服务协议" :showConfirmButton="false" closeOnClickOverlay>
      <div class="text1">
        <p>甲方：已确认注册的用户</p>
        <p>乙方：深圳星际云储存科技有限公司</p>
        <p>统一社会信用代码:91440300MA5FMKMK8N </p>
      </div>
      <div class="text2">
        <p>乙方是一家专注于存储服务器研发、生产、销售、托管为一体的高科技企业，长期致力于分布式存储数据中心建设，通过在IPFS网络上提供存储及检索服务以获取IPFS通证奖励。</p>
        <br/>
        <p>乙方基于IPFS通证激励机制定制生产服务器，进行大型数据库的搭建并提供相应算力存储，旨在为用户提供专业的服务器存储空间租赁服务，方便客户以简单方式参与到IPFS通证的奖励机制中来，同时也为用户提供手机端实时查询、更新服务器数据的后台服务。</p>
        <br/>
        <p>云储力租赁是指甲方租赁乙方存储服务器的存储空间用于IPFS存储，租赁期间委托乙方管理，支付租赁费用和技术服务费，收取收益的行为。甲方签订本合约时已经确认并理解云储力租赁的具体含义。</p>
        <br/>
        <p>甲方已经充分了解乙方相关产品及服务的相关运作原理和后续服务，认为该服务属于数据存储的高端服务，服务运行合法合规，已经充分认识到这将是未来的数据存储及传输技术，也充分知悉该业务的风险和商机。</p>
        <br/>
        <p>甲乙双方经友好协商，本着平等自愿、诚信互的原则，就甲方租乙方存储服务器的储存空间(以下简称储存空间＂)并委托乙方进行托管服务的事项在深圳市罗湖区宝安北路3008号宝能中心A栋1603室达成如下条款，由双方共同恪守执行。</p>
        <br/>
        <h5>第一条服务内容与方式</h5>
        <p>1、甲方向乙方租赁分布式存储服务设备的存储空间，实际租赁数量以用户在本APP上填报为准，存储空间租赁单价以本APP显示价格为准。</p>
        <p>2、本协议所述租赁服务期自存储空间服务器安装及数据封装、测试完成之日起开始计算(本协议生效日至存储空间服务器安装及数据封装、测试完成不超过15-45个工作日)。合同有效期以本APP显示年限为准，到期后由双方参考市场价格协商确定续签，甲方应提前30天申请，同等条件下甲方享有优先续租权。</p>
        <p>3、存储空间有效期结束后，如双方未能继续合作，质押通证的释放以IPFS通证官方公布为准。</p>
        <p>4、自签约之日起，甲方需一次性向乙方支付本APP上显示的订单货款。</p>
        <br/>
        <h5>第二条甲方收益发放</h5>
        <p>1、乙方按照甲方所租赁的服务器存储空间容量占乙方服务器总存储空间容量的比例计算甲方每日应分配的IPFS通证奖励，扣除乙方应收取的托管服务费后即为用户实际获得的收益。</p>
        <p>2、甲方的租赁合约从账户激活之日起开始计算收益，收益以IPFS通证结算，乙方于每日向甲方账户结算并发放前日应分配的IPFS通证奖励(具体发放细则，以乙方公布为准)。</p>
        <p>3、托管服务费结算方式:乙方按照甲方每日应分配的IPFS通证奖励数量的25％收取托管服务费，在每日甲方应分配IPFS通证奖励中直接扣除。</p>
        <br/>
        <h5>第三条甲方权益保障</h5>
        <p>1、为保障甲方收益，乙方将不断提升技术实力，积极应对项目変化并及时作出有效调整，同时紧跟国家相关政策，最大限度的保证甲方相关收益。</p>
        <p>2、如因乙方技术原因导致甲方所租赁的存储设备无法产生IPFS通证奖励收益，甲方有权要求乙方根据本协议订单金额无息退款。</p>
        <p>3、如出现上述第三条第2款之情形，乙方应于甲方发出退款申请之日起三十个工作日内将甲方所支付相应货款无息退还至甲方指定账户。</p>
        <br/>
        <h5>第四条免责条款</h5>
        <p>1、分布式存储服务器空租赁服务属于特殊定制的服务，请谨慎选择，一经达成协议，如非因乙方主观违约，甲方所支付费用概不退还。</p>
        <p>2、IPFS通证目前具体收益均为预估值，双方均无异议。</p>
        <p>3、IPFS通证的价格会因市场发生剧烈波动的情况，本协议不作收益保障承诺，甲方需深入了解并谨慎选择投资。</p>
        <p>4、如因相关国家法律、法规和规范性文件的制定或者修改等客观情况发生变化，导致IPFS通证网络服务被叫停、或者禁止的，本协议自动终止，双方不得相互追究责任，由此造成的损失须自行承担，甲方已支付的费用概不退还。</p>
        <p>5、因不可抗力的因素导致乙方设备无法正常运作而致使甲方遭受损失的，乙方不承担责任，甲方对此无异议，并不会以任何理由对此提出抗辩或要求乙方承担责任。</p>
        <p>6、本协议不涉及数字资产交易，若甲方自行参与第三方的数字资产交易，应当自行承担责任和风险。</p>
        <br/>
        <h5>第五条适用法律与争议解决</h5>
        <p>本协议履行适用中华人民共和国的法律。任何基于本协议产生的或与协议相关的争议应由双方友好协商解決。如协商不成，任何一方均有权向合同签订地法院提起诉讼。</p>
        <br/>
        <h5>第六条其他</h5>
        <p>本协议自注册用户确认租赁乙方存储空间并实际付款后即时生效。</p>
        <br/>
        <h4>风险告知函</h4>
        <br/>
        <p>您好，非常感谢您对深圳星际云储存科技有限公司(以下简称本公司)的信任，并租赁IPFS分布式存储服务器空间。请您仔细阅读以下内容，充分知晓相关风险。可能影响您资金投资及回收的您与本公司双方互不承担任何责任。</p>
        <br/>
        <h5>第一、投资风险来源</h5>
        <p>1、国家政策风险</p>
        <p>政府行为协议订立以后，政府颁布新的法律，政策或采取行政措施，可能导致协议不能履行或不能完全履行。</p>
        <p>2、不可抗力风险</p>
        <p>协议当事人在签订协议时不可预见，在协议履行过程中不可避免且不能克服的自然灾害、政府行为和社会性突发事件等不可抗力因素的出现，可能导致您的投资遭受损失。</p>
        <p>注:自然灾害:包括洪涝，干旱灾害.台风等气象灾害，火山、地震灾害，山体崩塌，滑坡、泥石流等地质灾害，风暴潮、海等海洋灾害，森林草原火灾和重大生物灾害等，战争等，可能导致协议不能履行或不能完全履行。</p>
        <p>3、因您的过错导致损失的风险</p>
        <p>该过错包括但不限于決策失误，操作不当、保管不当、遗忘或泄露密码、密码被他人破解、您使用的计算机系统被第三方侵入、您委托他人代理交易时他人恶意或不当操作等，可能导致您的资金损失。</p>
        <p>4、可能存在的其他风险。</p>
        <br/>
        <h5>第二、投资人的禁止行为</h5>
        <p>1、提供虚假信息;</p>
        <p>2、不具备任何投资风险意识、风险识别能力</p>
        <p>3、利用跟本公司的交易从事洗钱或其他违法、违纪行为;</p>
        <br/>
        <p>如您租赁IPFS分布式存储服务器空间的投资过程中出现以上行为，您需依法承担由此产生的法律责任与所造成的一切损失。</p>
        <br/>
        <h5>第三、投资人确认</h5>
        <p>本《风险告知函》不能且无法揭示您租赁IPFS分布式存储设备及获取相关服务的商业行为可能面临的全部风险，在您决定进行IPFS分布式存储服务器投资时，您应对您可能面临的风险进行充分评估并审慎采取相关行动，签署相关协议。您应知悉，在相关政策风险、市场风险、不可抗力风险、您的过错导致的风险出现时，您应自担风险，本公司不对此承担任何责任。在您签署本风险提示函时，即视为您已充分阅读并理解本风险提示函的全部内容，且您已知悉需自行承担租IPFS分布式存储设备及获取相关服务的商业行为可能面临的相关风险并在此承诺不为禁止性行为。</p>
      </div>
      <van-button @click="showTips = false;active = true">我已阅读并同意</van-button>
    </van-dialog>
  </div>
  
</template>
<script>
  import bigNumber from 'bignumber.js'
  import {buyMine} from '@/api/request'
  export default {
    props:['showDialog','item'],
    data() {
      return { 
        name:'',
        phone:'',
        active:false,
        showTips:false
      }
    },
    computed:{
      show:{
        get(){
          return this.showDialog
        },
        set(val){
          this.$emit('toggleShow',val)
        }
      }
    },
    methods: {
      bigNumber(val) {
        return bigNumber(val)
      },
      confirmBuy(){
        if(!this.name || !this.phone ) {
          this.$toast('联系人、手机号码不能为空！')
          return 
        }
        if(!this.active) {
          this.$toast('请阅读并同意《租赁协议》！')
          return 
        }
        buyMine({
          phone:this.phone,
          proId :this.item.id,
          realName :this.name,
          tAmount :this.item.buyAmount,
        }).then(res => {
          this.$toast(res.msg)
          this.show = false
          this.phone = ''
          this.name = ''
          this.active = false
          this.$router.push({path:'/my-orderDetail',query:{id:res.result}})
        })
      }
    },
  }
</script>
<style lang='less' scoped>
  .payPop {
    // height:30%;
    display: flex;
    flex-direction: column;
    .title {
      height:.92rem;
      line-height: .92rem;
      text-align: center;
      border-bottom:.01rem solid #DCDCDC;
      color:#000;
      font-size:.32rem;
    }
    .content {
      display: flex;
      flex-direction: column;
      .detailBox {
        margin-bottom:.2rem;
        padding:.4rem .5rem;
        display: flex;
        flex-direction: column;
        background:  #F6F9FC;
        >div {
          margin-bottom:.2rem;
          display: flex;
          justify-content: space-between;
          span {
            line-height: 1em;
            font-size:.28rem;
            color:#000;
            font-weight: 500;
            &:first-of-type {
              color:#6D7278;
              font-weight: 400;
            }
          }
          /deep/ .van-stepper {
            .van-stepper__input {
              width:1rem;
              margin:0;
              background: #FFF;
              border-top:.01rem solid #B4B4B4;
              border-bottom:.01rem solid #B4B4B4;
            }
            .van-stepper__minus {
              background: #FFF;
              border:.01rem solid #B4B4B4;
            }
            .van-stepper__plus {
              background: #FFF;
              border:.01rem solid #B4B4B4;
            }
          }
          &:last-of-type {
            margin-bottom:0;
          }
        }
      }
      .inputBox {
        padding:.4rem .5rem;
        display: flex;
        flex-direction: column;
        background:  #F6F9FC;
        >div {
          margin-bottom:.2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:last-of-type {
            margin-bottom:0;
          }
          span {
            color:#FA6400;
            font-size:.28rem;
            &:first-of-type {
              color:#6D7278;
            }
          }
          input {
            width:4.2rem;
            height:.54rem;
            padding:0 .2rem;
            font-size:.24rem;
            border:.01rem solid #B4B4B4;
            border-radius: .06rem;
            box-sizing: border-box;
            &::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            &::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          }
        }
      }
    }
    .btns {
      background: #FFF;
      padding:.5rem;
      .tips {
        margin-bottom:.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .radio {
          position: relative;
          width:.24rem;
          height:.24rem;
          border-radius: 50%;
          margin-right:.1rem;
          background: transparent;
          border:.01rem solid #07C160;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          &.active {
            background: #07C160;
            border:none;
          }
          img {
            width:.14rem;
          }
        }
        p {
          color:#000;
          font-size:.24rem;
        } 
        .agreement {
          margin-left:.05rem;
          color:#07C160;
          font-size:.24rem;
        }
      }
      .van-button {
        width:100%;
        height:.96rem;
        border: .12rem;
        background: #FA6400;
        border-radius: .12rem;
        font-size:.34rem;
      }
    }
  }
  .popTips {
    width:90%;
    height:70%;
    padding:.2rem .3rem;
    overflow-y: auto;
    box-sizing: border-box;
    .text1,.text2,.text3,.text4 {
      margin-bottom:.5rem;
      h5 {
        font-size:.26rem;
      }
      p {
        font-size:.22rem;
      }
    }
    .text1 {
      display: flex;
      flex-direction: column;
    }
    .text4 {
      p {
        display: flex;
        span {
          flex:1;
        }
      }
    }
    .van-button {
      display: block;
      margin:0 auto;
      background: #FA6400;
      border-radius: .12rem;
      font-size:.26rem;
      color:#FFF;
    }
  }
</style>