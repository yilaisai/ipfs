<template>
	<div class="notice-page">
		<HeaderBar title="公告列表">
			<a href="javascript:;" class="other" @click="readAll">全部已读</a>
		</HeaderBar>
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
			>
			<div class="item" v-for="(item,index) in list" :key="index" @click="$router.push('/noticeDetails?id=' + item.id)">
				<div class="text">
					<h4>{{item.title}}</h4>
					<span>{{$fmtDate(item.createTime, 'full')}}</span>
				</div>
				<i v-if="readNoticeArr.indexOf(item.id) < 0"></i>
			</div>
		</van-list>
	</div>
</template>

<script>
import { getBannersAndNotices } from '@/api/request'
export default {
	data() { 
		return {
			list: [],
			loading: false,
			finished: false,
			pageNum: 1,
			readNoticeArr: []
		}
	},
	mounted() {
		this.readNoticeArr = JSON.parse(localStorage.getItem('readNoticeArr')) || []
	},
	methods: {
		onLoad() {
			// 异步更新数据
			this.getData()
		},
		getData() {
			getBannersAndNotices({
				pageNum: this.pageNum,
				pageSize: 20
			}).then(res => {
				this.list = this.list.concat(res.result.noticeInfos)
				this.loading = false
				// if(res.result.nextPage == 0) {
				// 	this.finished = true
				// }
				this.finished = true
			}).catch(err => {
				this.finished = true
				this.loading = false
			})
		},
		readAll() {
			getBannersAndNotices({
				pageNum: this.pageNum,
				pageSize: 20121212
			}).then(res => {
				let arr = []
				res.result.noticeInfos.forEach((val, idx) => {
					arr.push(val.id)
				})
				this.readNoticeArr = arr
				localStorage.setItem('readNoticeArr', JSON.stringify(arr))
			})
		}
	}
}
</script>

<style lang="less" scoped>
.notice-page{
	display: flex;
	flex-direction: column;

	.van-list {
		flex: 1;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		padding: .3rem;
		.item {
			position: relative;
			display: flex;
			align-items: center;
			background-color: #fff;
			border-radius: .08rem;
			margin-bottom: .15rem;
			padding: .1rem;
			img {
				height: 1.5rem;
				width: 2rem;
			}
			.text {
				margin: 0 .2rem;
				h4 {
					margin-bottom: .2rem;
				}
			}
			i {
				position: absolute;
				top: .2rem;
				right: .2rem;
				width: .12rem;
				height: .12rem;
				background-color: red;
				border-radius: 50%;
			}
		}
	}
}
</style>