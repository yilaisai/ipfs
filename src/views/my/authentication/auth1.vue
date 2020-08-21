<template>
	<div class="auth1-page">
		<HeaderBar title="实名认证"></HeaderBar>
		<div class="main">
			<van-cell-group>
                <van-field label="姓名" v-model.trim="realName" placeholder="请输入" />
                <van-field label="身份证号" v-model.trim="cardNo" placeholder="请输入" 
                oninput="value=value.replace(/[^0-9|xX]/g,'')"
                onkeyup="value=value.replace(/[^0-9|xX]/g,'')"
                onpaste="value=value.replace(/[^0-9|xX]/g,'')"/>
            </van-cell-group>
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
button {
    display: block;
    margin: .4rem auto 0;
    width: 90%;
}
</style>