<template>
  <div>
    <van-popup v-model="show" closeable round position="bottom"  class="payPop">
      <div class="title">
        <span>确认提现</span>
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
    <van-dialog v-model="showTips" class="popTips" title="云储力租赁合约" :showConfirmButton="false" closeOnClickOverlay>
      <div class="text1">
        <p>甲方：山东星际云科技发展有限公司</p>
        <p>乙方：______________________</p>
        <p>合同编号：____________________ </p>
      </div>
      <div class="text2">
        <p>甲方：山东星际云科技发展有限公司</p>
        <p>统一社会信用代码：91370502MA3RBA290K</p>
        <p>联系地址：山东省东营市东营区北一路402号黄河大数据港909室</p>
        <p>联系电话：0546-6388878</p>
        <br/>
        <p>乙方：</p>
        <p>身份证号码/统一社会信用代码：</p>
        <p>联系地址：</p>
        <p>联系电话：</p>
      </div>
      <div class="text3">
        <p>甲方拥有存储服务器，乙方租用甲方存储服务器中的存储空间用于Filecoin挖矿，根据《中华人民共和国民法总则》、《中华人民共和国合同法》相关法律规定，经过甲方、乙方平等友好协商，自愿达成以下协议：</p>
        <h5>一、云储力租赁</h5>
        <p>云储力租赁是指乙方租赁甲方存储服务器的存储空间用于Filecoin挖矿，租赁期间委托甲方管理，支付租赁费用和技术服务费，收取收益的行为。乙方签订本合约时已经确认并理解云储力租赁的具体含义。</p>
        <h5>二、租赁数量、费用</h5>
        <p>1.甲方存储空间以计算机存储单位TB作为计算单位（1TB视为云储力1份），以1TB的整数倍进行租赁，租赁费用：¥     元/TB/年。（存储空间最小单位为1GB，1PB=1000TB、1TB=1000GB）。</p>
        <p>2.本合约乙方租赁甲方存储空间     TB ，费用合计人民币         元（大写：                  ），该费用在本合约生效之日起3天内支付。甲方根据租赁费用已全部支付时间先后顺序和矿池建设情况确定乙方租赁空间挖矿时间，乙方未全部支付租赁费用，甲方不安排乙方租赁的存储空间参与挖矿，也不计算收益。</p>
        <p>3.甲方收取乙方租赁费用，依法将开具相应票据。</p>
        <p>4.乙方租赁的存储空间位于甲方存储服务器内，而存储服务器属于定制产品，所以乙方租赁的存储空间属于定制服务，本合约被终止或者被解除的，乙方所支付的租赁费用不予退还。</p>
        <h5>三、租赁期限</h5>
        <p>1.本合约租赁期限 16个月，具体以乙方首次上线挖矿之日（上线挖矿时间以甲方通知为准）起开始计算。</p>
        <p>2.乙方支付足额的租赁费用后，Filecoin主网上线后15天内或者本合约生效后15天内（以后到者为准），甲方安排乙方租赁的存储空间进行挖矿。</p>
        <p>3.本合约期满后，本合约终止。乙方继续租赁甲方存储空间的，应重新签订合约。</p>
        <h5>四、租赁物交付、管理</h5>
        <p>1.乙方所租赁的存储空间位于甲方存储服务器内，属于种类物，无法区分，且乙方委托甲方管理，甲方收到含有乙方租赁存储空间的存储服务器即视为已经乙方交付租赁物，具体以甲方通知为准。</p>
        <p>2.乙方了解并接受甲方技术人员对乙方租赁存储空间的管理，为便于Filecoin顺利挖矿，同意并接受甲方加装相应的软件、硬件，加装的软件、硬件所有权归甲方所有。</p>
        <p>3.乙方租赁期间通知甲方变更或者通过甲方线上系统变更注册账户信息的，视为有效变更，甲方可以根据乙方变更后账户信息通知、交易，乙方应对变更后的账户信息承担责任。</p>
        <p>4.数据存储器正式上线运营后，如果产不出币，甲方给乙方全额退款。</p>
        <h5>五、技术服务费</h5>
        <p>1.乙方将租赁的存储空间交由甲方管理，乙方应向甲方支付技术服务费，技术服务费主要用于矿场维护、矿机部署、矿机维修、技术运维、租金、电费、带宽费及甲方公司其他经营成本支出等。</p>
        <p>2.技术服务费按照乙方租赁的存储空间挖矿产出的Filecoin数量的20%支付，乙方同意在甲方实时扣除技术服务费后，将乙方应得云储力收益汇入乙方注册账户。</p>
        <p>3.甲方有权根据项目实验室具体规则调整技术服务费收取标准，技术服务费收费标准变更以甲方通知为准。</p>
        <p>4.乙方在云储力租赁期间，乙方支付的技术服务费按照当月Filecoin官方平均交易价格折算现金价值，若乙方当月技术服务费现金价值不足以支付乙方租赁空间相应矿场维护、矿机部署、矿机维修、技术运维、租金、电费、带宽费及甲方公司其他经营成本支出时，甲方有权与乙方协商变更技术服务费的支付方式和数额，双方在乙方收到通知之日起15日内未达成协议的，甲方可以停止乙方租赁的存储空间继续Filecoin挖矿，甲方有权从乙方未分配收益中扣除技术服务费，而不视为甲方违约。</p>
        <h5>六、云储力收益结算</h5>
        <p>1.乙方同意以乙方注册的甲方系统同期参与Filecoin挖矿所有存储空间来平均计算云储力收益。</p>
        <p>2.乙方云储力收益自乙方参与挖矿之日起计算。</p>
        <p>3.乙方挖矿收益在扣除技术费后属于乙方应得收益，甲方将乙方应得云储力收益汇入乙方在甲方系统注册的账户，乙方应妥善保管注册账户信息。</p>
        <p>4.乙方了解并接受甲方对乙方应得云储力收益分配方式，认可甲方系统计算的乙方挖矿收益和乙方应得云储力收益。</p>
        <p>5.乙方应得云储力收益计算公式：乙方应得云储力收益=乙方持有云储力份数÷甲方同期矿池总规模×甲方同期产币量×（1-技术服务费20%）。</p>
        <p>6.乙方应得云储力收益依法应缴纳税费的，乙方应依法纳税。</p>
        <h5>七、风险提示</h5>
        <p>1.乙方明知并确认Filecoin挖矿难度会不定期调整，且Filecoin有可能发生剧烈波动。币价波动或者挖矿难度调整都会导致Filecoin应得云储力收益对应的现金价值发生变动。不管从数字货币、法币角度，甲方不保障乙方能够回本。乙方签订本合约前，已经仔细、充分评估自身风险承受能力，在可接受的风险控制范围内投资租赁甲方存储空间进行Filecoin挖矿。</p>
        <p>2.乙方明知并确认甲方存储服务器是定制产品，甲方根据乙方本合约约定定制存储服务器，乙方明知并确认已支付的云储力租赁费用不予退还的。</p>
        <p>3.乙方明知并确认Filecoin挖矿过程中可能会遭遇因黑客攻击、错峰用电等第三方原因导致挖矿中止、中断的，不视为甲方违约，甲方对第三方原因造成的损失不承担责任，但是甲方会及时通知用户，并在中止、中断情形消失后顺延本合约。</p>
        <p>4.乙方应妥善保管账户信息、验证工具及验证信息，因包括但限于黑客攻击、泄露、被盗等第三方原因导致乙方财产损失的，甲方不承担责任。</p>
        <p>5.乙方明知并确认本合约不涉及数字资产交易，乙方自行参与第三方的数字资产交易，应当自行承担责任和风险。</p>
        <p>6.乙方了解并接受，如因相关国家法律、法规和规范性文件的制定或者修改等客观情况发生变化，导致Filecoin挖矿行为被叫停或者禁止的，本合约自动终止，双方不得相互追究责任，由此造成的损失须自行承担，乙方已支付的费用概不退还。</p>
        <h5>八、违约责任</h5>
        <p>1.乙方逾期30天未足额支付租赁费用，乙方已经支付的租赁费用不予退还，甲方可以要求乙方继续履行合同，也可以解除合同，要求乙方按照本合约约定支付租赁费用。</p>
        <p>2.乙方应得云储力收益逾期7天未分配的，乙方可以要求甲方每逾期1天乙方应得云储力收益千分之三支付违约金，但是因系统崩溃、黑客攻击、政府执法、停电等第三方原因导致逾期分配的，甲方不需要支付违约金。</p>
        <p>3.守约方因追究违约方的责任所支付的包括但不限于律师费、仲裁费、公证费、公告费、鉴定费、保全保险费、评估费等合理费用，违约方应承担。</p>
        <h5>九、权利限制</h5>
        <p>乙方了解并接受Filecoin挖矿开始后，非法定或者甲方原因，乙方不得终止本合约。</p>
        <h5>十、本合约解除、终止</h5>
        <p>本合约出现以下情形之一时，本合约终止、解除：</p>
        <p>1.本合约期限届满，本合约终止。</p>
        <p>2.乙方逾期30日支付租赁费用的，甲方可以单方通知乙方解除本合约。</p>
        <p>3.甲方非正常原因逾期7日分配收益的，乙方可以单方通知甲方解除本合约。</p>
        <p>4.本合约履行中遭遇不可抗力的，任意一方可以通知对方解除本合约。</p>
        <p>5.甲方或者乙方丧失主体资格，又没有继承人或者承受者的，本合约终止。</p>
        <p>6.乙方技术服务费现金价值不足以支付乙方相应存储空间相应矿场维护、矿机部署、矿机维修、技术运维、租金、电费、带宽费及甲方公司其他经营成本支出时，且双方在乙方收到通知之日起15日内未达成变更协议的，甲方可以在未达成变更协议之日起单方通知乙方终止本合约。</p>
        <p>7.其他根据法律规定或者本合约约定可以解除、终止本合约的。</p>
        <h5>十一、通知、送达</h5>
        <p>1.甲方、乙方通过本合约首部预留的联络信息，以电话、短信、微信、电子邮件、信件、函件等方式送达的，视为甲方、乙方已经履行送达义务，视为有效送达。</p>
        <p>2.本合约履行过程中，甲方或者乙方联络信息发生变更的，应及时通知对方，对方在收到甲方或者乙方变更通知前，按照原有联络信息送达的，视为有效送达，乙方或者甲方因此造成损失的，甲方或者乙方不承担责任。</p>
        <h5>十二、争议解决</h5>
        <p>1.本协议履行过程中发生争议，可以协商解决；也可以提交深圳国际仲裁院按照仲裁时有效的仲裁规则仲裁裁决，仲裁裁决是终局性的，对双方有约束力。</p>
        <p>2.仲裁适用中华人民共和国法律。</p>
        <h5>十三、附则</h5>
        <p>1.甲方拥有本合约最终解释权，解释权以通知或者甲方系统官网文件。</p>
        <p>2.本合约未约定的，甲方、乙方可以签订补充协议；未签订补充协议的，按照《中华人民共和国民法总则》、《中华人民共和国合同法》等相关法律法规处理；法律法规未规定的，可以按照行业习惯处理。</p>
        <p>3.乙方明知并确认自身租赁的是特殊电子产品，为提高交易效率和充分考虑云储力特殊性、乙方群体地域广泛性，本合约履行过程中，乙方同意由甲方根据整体经营政策调整来履行本合约。</p>
        <p>4.本合约自甲方、乙方签字或者盖章后生效。</p>
        <p>5.本合约一式两份，甲方、乙方各执一份，各份具有同等效力。</p>
      </div>
      <div class="text4">
        <p>
          <span>甲方（盖章）：公司 </span>
          <span>乙方：</span>
        </p>
        <p>
          <span>签字代表：</span>
          <span>签字代表：</span>
        </p>
        <p>
          <span>日期：&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;日</span>
          <span>日期：&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;日</span>
        </p>
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
      padding-left:1rem;
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