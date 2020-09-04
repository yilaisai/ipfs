<template>
	<div class="auth1-page">
		<HeaderBar title="实名认证" :shadow="true"></HeaderBar>
		<div class="main">
			<!-- <van-cell-group>
                <van-cell title="姓名" />
                <van-field v-model.trim="realName" placeholder="请输入" />
                <van-cell title="身份证号" />
                <van-field  v-model.trim="cardNo" placeholder="请输入" 
                oninput="value=value.replace(/[^0-9|xX]/g,'')"
                onkeyup="value=value.replace(/[^0-9|xX]/g,'')"
                onpaste="value=value.replace(/[^0-9|xX]/g,'')"/>
            </van-cell-group> -->
            <div class="inputBox">
                <div class="name">
                    <span>姓名</span>
                    <input type="text" v-model.trim="realName" placeholder="请输入">
                </div>
                <div class="cardNoBox">
                    <span>身份证号</span>
                    <input type="text" v-model.trim="cardNo" placeholder="请输入"
                    oninput="value=value.replace(/[^0-9|xX]/g,'')"
                    onkeyup="value=value.replace(/[^0-9|xX]/g,'')"
                    onpaste="value=value.replace(/[^0-9|xX]/g,'')">
                </div>
            </div>
            <button class="full scale" @click="nextStep">下一步</button>
		</div>
	</div>
</template>

<script>
import {updateRealInfo} from '@/api/request'
export default {
    data() {
        return {
            realName: '',
            cardNo: '',
            routeFrom: ''
        }
    },
    created() {
        if(sessionStorage.getItem('authInfo')) {
            const authInfo = JSON.parse(sessionStorage.getItem('authInfo'))
            this.realName = authInfo.realName
            this.cardNo = authInfo.cardNo
        }
    },
    methods: {
        nextStep() {
            if(this.realName == '') {
                this.$toast('请输入姓名')
                return
            }
            if(this.cardNo == '') {
                this.$toast('请输入身份证号')
                return
            }
            if(this.cardNo.length != 15 && this.cardNo.length != 18) {
                this.$toast('请输正确的身份号')
                return 
            }
            updateRealInfo({
                realName: this.realName,
                cardNo: this.cardNo
            }).then(res => {
                sessionStorage.setItem('authInfo', JSON.stringify({
                    realName: this.realName,
                    cardNo: this.cardNo
                }))
                this.$router.push('/auth2')
            })
        }
    },
    beforeRouteLeave(to, from, next) {
        if(to.path == '/my' && sessionStorage.getItem("frompath") == '/auth2') {
            this.$dialog.confirm({
				message: '当前已提交部分认证信息,确定现在退出？',
				confirmButtonText:'确定'
			}).then(() => {
                sessionStorage.removeItem('authInfo')
				next(true)
			}).catch(() => {
				next(false)
			})
        }else{
            next(true)
        }
    }
}
</script>

<style lang="less" scoped>
.auth1-page {
    background: #FFF;
    .main {
        padding:.5rem;
        .inputBox {
            >div {
                margin-bottom:.5rem;
                display: flex;
                flex-direction: column;
                span {
                    margin-bottom:.12rem;
                    color:#646464;
                    font-size:.32rem;
                    font-weight: 500;
                }
                input {
                    padding:0 .32rem;
                    height:.96rem;
                    outline: none;
                    border:none;
                    border-radius:.12rem;
                    background: #F6F9FC;
                    font-size:.32rem;
                }
            }
        }
    }
    button {
        display: block;
        margin: 1rem auto 0;
        border-radius: .12rem;
    }
}

</style>