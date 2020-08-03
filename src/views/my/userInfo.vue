<template>
	<div class="userinfo-page">
		<HeaderBar title="个人资料"></HeaderBar>
		<div class="main">
			<div class="flex-wrap">
				<img :src="userInfo.iconUrl" alt="">
				<div>
					<p>{{userInfo.phone}}</p>
					<p v-if="userInfo.roleId > 0">ID : {{userInfo.userId}}</p>
				</div>
			</div>
			<div class="nickname">
				<label>昵称</label>
				<span v-show="!isEdit">{{userInfo.nickName}}</span>
				<input v-show="isEdit" v-model="inputValue" type="text">
				<a href="javascript:;" v-show="!isEdit" @click="edit">修改</a>
			</div>
			<button class="scale full" v-show="isEdit" @click="save">保存</button>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { editNickName } from '@/api/request'
export default {
	data() { 
		return {
			isEdit: false,
			inputValue: ''
		}
	},
	methods: {
		edit() {
			this.isEdit = true
			this.inputValue = this.userInfo.nickName
		},
		save() {
			if(this.inputValue.length > 8) {
				this.$toast('昵称太长啦~')
				return
			}
			editNickName({nickName: this.inputValue}).then(res => {
				this.$toast.success(res.msg)
				this.isEdit = false
				this.$store.dispatch('getUserInfo')
			})
		}
	},
	computed: {
		...mapState(['userInfo'])
	}
}
</script>

<style lang="less" scoped>
.userinfo-page{
	.main {
		padding: .3rem;
		.flex-wrap {
			display: flex;
			align-items: center;
			background-color: #fff;
			border-radius: 0.08rem;
			margin-bottom: .15rem;
			padding: .38rem .28rem;
			font-size: .28rem;
			img {
				width: 1rem;
				height: 1rem;
				margin-right: .18rem;
				border-radius: 50%;
			}
		}
		.nickname {
			display: flex;
			align-items: center;
			background-color: #fff;
			padding: .4rem .3rem;
			border-radius: .08rem;
			font-size: .28rem;
			label {
				flex: 1;
			}
			a {
				margin-left: .2rem;
			}
			input {
				background-color: #F6F6F6;
				color: #000;
				padding: 0 .2rem;
				height: .6rem;
				border-radius: .04rem;
				min-width: 4rem;
			}
		}
		button {
			margin-top: .6rem;
		}
	}
}
</style>