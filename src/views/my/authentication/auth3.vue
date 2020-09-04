<template>
    <div class="auth2-page">
        <HeaderBar title="身份认证" :shadow="true"></HeaderBar>
        <div class="main">
            <!-- <p class="tips">请您上传一张手持身份证正面照和个人签字的照片，个人签字的内容包含 (文案 : Hosen) 和 (当前日期 : xx 年 xx 月 xx 日)，请确保照片个人签字的内容清晰可见。</p>
            <p class="tips2">1、人像清晰 <br />2、证件号码清晰<br />3、手写文字清晰<br />4、手写文字包含规定文案及当前日期</p> -->
            <van-uploader :after-read="uploadCardBack">
                <img v-show="!imgurl" class="default-img" src="../../../assets/img/my/senior.svg" />
                <img v-show="imgurl" class="default-img" :src="imgurl" />
            </van-uploader>
            <div class="tips">
                <p class="title">注意事项：</p>
                <p>1、人像清晰</p>
                <p>2、证件号码清晰</p>
            </div>
            <button class="full scale" @click="nextStep">提交认证</button>
        </div>
    </div>
</template>

<script>
import { uploadFile, updateSeniorImg } from '@/api/request'
import lrz from 'lrz'
export default {
    data() {
        return {
            name: '',
            id: '',
            imgurl: '',
        }
    },
    methods: {
        uploadCardBack(files) {
            let quality_size=files.file.size<300000?0.65:0.5
            lrz(files.content, {quality:quality_size}).then((rst)=>{
                const params = {
                    files: rst.file,
                    type: 'userInfo',
                    fileName: files.file.name,
                }
                uploadFile(params).then(res=>{
                    this.imgurl = res.result.urls[0]
                })
            })
        },
        nextStep() {
            if(this.imgurl == '') {
                this.$toast('图片未上传完成')
                return
            }
            updateSeniorImg({
                imgurl: this.imgurl,
            }).then(res => {
                this.$toast.success(res.msg)
                this.$store.dispatch('getUserInfo')
                this.$router.push('/setting')
            })
        }
    }
}
</script>

<style lang="less" scoped>
.auth2-page {
    display: flex;
    flex-direction: column;
    background: #FFF;
    .main {
        overflow-y: auto;
        // .tips {
        //     padding: .2rem .4rem;
        //     color: #DE2A2A;
        //     font-size: .22rem;
        //     background:rgba(255,250,223,.68);
        // }
        // .tips2 {
        //     padding: .2rem .4rem;
        //     color: #646464;
        //     font-size: .24rem;
        // }
        h4 {
            font-size: .28rem;
            color: #646464;
            text-align: center;
            margin: .4rem 0 .2rem;
        }
        .default-img {
            display: block;
            width: 100%; 
            padding:1rem 1rem 0;
            margin: 0 auto;
            box-sizing: border-box;
        }
        .tips {
            padding:.4rem 1rem 0;
            color:#646464;
            font-size:.24rem;
            .title {
                margin-bottom:.24rem;
            }
            p {
                line-height: 1em;
                margin-bottom:.14rem;
            }
        }
        button {
            display: block;
            width: 90%;
            margin: .8rem auto;
            border-radius: .12rem;
        }
    }
}
</style>