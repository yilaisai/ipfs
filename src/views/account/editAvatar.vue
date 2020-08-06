<template>
	<div class="edit-avatar-page">
		<HeaderBar title="个人头像"></HeaderBar>
		<div class="main">
			<van-uploader :after-read="imgSelected" @oversize="imgOversize" :max-size="2 * 1024 * 1024">
				<img :src="userInfo.iconUrl" alt="">
			</van-uploader>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { uploadFile, editNickName } from '@/api/request'
import lrz from 'lrz'
export default {
	data() { 
		return {

		}
	},
	methods: {
		imgSelected(filesObj) {
			lrz(filesObj.content, {quality: 0.8}).then((rst)=>{
                const params = {
                    files: rst.file,
                    type: 'AVATAR',
                    fileName: filesObj.file.name,
				}
                uploadFile(params).then(res=>{
					console.log(res.result.urls[0])
					editNickName({iconUrl: res.result.urls[0], type: 1}).then(res => {
						this.$store.dispatch('getUserInfo')
					})
                })
            })
		},
		imgOversize(filesObj) {
			this.$toast.fail('图片过大！请选择2M以内的图片')
		}
	},
	computed: {
		...mapState(['userInfo'])
	}
}
</script>

<style lang="less" scoped>
.edit-avatar-page{
	display: flex;
	flex-direction: column;
	background-color: #222222;
	.com-header-bar {
		background-color: transparent;
		color: #fff;
		/deep/.go-back {
			background: url('../../../public/img/arrow_left_white.png') no-repeat center;
			background-size: 50%;  
		}
	}
	.main {
		flex: 1;
		position: relative;
		.van-uploader {
			position: absolute;
			width: 100%;
			top: 40%;
			transform: translateY(-50%);
			/deep/.van-uploader__input-wrapper {
				width: 100%;
			}
			img {
				width: 100%;
			}
		}
		
	}
}
</style>