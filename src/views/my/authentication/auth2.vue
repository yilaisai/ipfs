<template>
    <div class="auth2-page">
        <HeaderBar title="身份认证" :shadow="true"></HeaderBar>
        <div class="main">
            <p class="tips">证件需在有效期内，照片文字清晰可见，图片格式支持 JPG/PNG,大小不超过 2M</p>
            <h4>请上传您的身份证人像面</h4>
            <van-uploader :after-read="uploadCardFront">
                <img v-show="!cardFrontUrl" class="default-img" src="../../../assets/img/my/cardFront.svg" />
                <img v-show="cardFrontUrl" class="default-img" :src="cardFrontUrl" />
            </van-uploader>
            <h4>请上传您的身份证国徽面</h4>
            <van-uploader :after-read="uploadCardBack">
                <img v-show="!cardBackUrl" class="default-img" src="../../../assets/img/my/cardBack.svg" />
                <img v-show="cardBackUrl" class="default-img" :src="cardBackUrl" />
            </van-uploader>
            <button class="full scale" @click="nextStep">下一步</button>
        </div>
    </div>
</template>

<script>
import { uploadFile, checkCardImg } from '@/api/request'
import lrz from 'lrz'
export default {
    data() {
        return {
            cardBackUrl: '',
            cardFrontUrl: ''
        }
    },
    created() {
        if(sessionStorage.getItem('authInfo')) {
            const authInfo = JSON.parse(sessionStorage.getItem('authInfo'))
            console.log(authInfo)
            this.cardBackUrl = authInfo.cardBackUrl || ''
            this.cardFrontUrl = authInfo.cardFrontUrl || ''
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
                    this.cardBackUrl = res.result.urls[0]
                })
            })
            
        },
        uploadCardFront(files) {
            let quality_size=files.file.size<300000?0.65:0.5
            lrz(files.content, {quality:quality_size}).then((rst)=>{
                const params = {
                    files: rst.file,
                    type: 'userInfo',
                    fileName: files.file.name,
                }
                uploadFile(params).then(res=>{
                    this.cardFrontUrl = res.result.urls[0]
                })
            })
        },
        nextStep() {
            if(this.cardBackUrl == '' || this.cardFrontUrl == '') {
                this.$toast('图片未上传完成')
                return
            }
            checkCardImg({
                cardBackUrl: this.cardBackUrl,
                cardFrontUrl: this.cardFrontUrl
            }).then(res => {
                let authInfo = JSON.parse(sessionStorage.getItem('authInfo'))
                authInfo.cardBackUrl = this.cardBackUrl
                authInfo.cardFrontUrl = this.cardFrontUrl
                sessionStorage.setItem('authInfo', JSON.stringify(authInfo))
                this.$router.push('/auth3')
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
        .tips {
            padding: .2rem .4rem;
            color: #DE2A2A;
            font-size: .22rem;
            background:rgba(255,250,223,.68);
        }
        h4 {
            font-size: .28rem;
            color: #646464;
            text-align: center;
            margin: .4rem 0 .2rem;
        }
        .default-img {
            width:100%;
            display: block;
            padding:0 1rem;
            margin: 0 auto;
            box-sizing: border-box;
        }
        button {
            display: block;
            width: 90%;
            margin: .6rem auto;
        }
    }
}
</style>