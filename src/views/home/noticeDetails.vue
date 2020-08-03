<template>
	<div class="notice-details">
		<HeaderBar title="公告详情"></HeaderBar>
		<div class="main">
			<h3>{{pageData.title}}</h3>
			<p class="time">{{pageData.createTime}}</p>
			<p class="content">{{pageData.content}}</p>
		</div>
	</div>
</template>

<script>
import { getNoticeInfo } from '@/api/request'
export default {
	data() { 
		return {
			pageData: {}
		}
	},
	mounted() {
		let readNoticeArr = JSON.parse(localStorage.getItem('readNoticeArr')) || []
		getNoticeInfo({id: this.$route.query.id}).then(res => {
			this.pageData = res.result
			let flag = true
			readNoticeArr.forEach((val, idx) => {
				if(val == this.$route.query.id) {
					flag = false
				}
			})
			if(flag) {
				readNoticeArr.push(this.$route.query.id)
				localStorage.setItem('readNoticeArr', JSON.stringify(readNoticeArr))
			}
		})
	},
	methods: {
		

	}
}
</script>

<style lang="less" scoped>
.notice-details{
	display: flex;
	flex-direction: column;
	.main {
		flex: 1;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		padding: 0 .2rem;
		h3 {
			text-align: center;
			font-size: .3rem;
			padding: .1rem;
		}
		.time {
			text-align: center;
			font-size: .14rem;
		}
		.content {
			padding: .2rem 0 .1rem;
		}
	}
}
</style>