<template>
	<div class="aef-dropdownMenu">
		<div class="menu-content">
			<div class="menu-value" @click.stop="show = true">
				<span>{{activeText}}</span>
				<i :class="{'show': show}"></i>
			</div>
			<ul v-show="show">
				<li v-for="(item, index) in options" :key="index" :class="{'active' : item.value === value}" @click.stop="$emit('change', item.value);show = false">{{item.text}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		options: {
			type: Array,
			default: () => {
				return []
			}
		},
		value: {
			default: ''
		}
	},
	model: {
		prop: 'value',
		event: 'change'
	},
	data() { 
		return {
			activeText: '',
			show: false
		}
	},
	mounted() {
		for(let i in this.options) {
			if(this.options[i].value === this.value) {
				this.activeText = this.options[i].text
			}
		}
		window.addEventListener("click", this.showHandler)
	},
	methods: {
		showHandler(e) {
			const targetClassName = e.target.className
            if(targetClassName !== "aef-dropdownMenu" && e.target.parentElement.className !== "aef-dropdownMenu") {
                this.show = false
            }
        }
	},
	watch: {
		value(newVal, oldVal) {
			for(let i in this.options) {
				if(this.options[i].value === newVal) {
					this.activeText = this.options[i].text
				}
			}
		}
	},
	destroyed() {
        window.removeEventListener("click", this.showHandler)
    }
}
</script>

<style lang="less" scoped>
.aef-dropdownMenu{
	display: inline-block;
	position: relative;
	width: 1.7rem;
	height: .4rem;
	vertical-align: middle;
	.menu-content {
		position: relative;
		z-index: 121212;
		border: .02rem solid #FFF1D4;
		border-radius: .04rem;
		background-color: #FFF1D4;
		color: #641E18;
		.menu-value {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 1.7rem;
			height: .4rem;
			font-size: .2rem;
			padding: 0 .12rem 0 .2rem;
			i {
				width: .15rem;
				height: .08rem;
				background: url(../../../public/img/dropdownmenu_icon.png) no-repeat center;
				background-size: 100% 100%;
				&.show {
					transform: rotate(180deg);
				}
			}
		}
		ul {
			background-color: #FFF1D4;
			li {
				font-size: .2rem;
				color: #641E18;
				padding: .1rem .2rem;
				&.active {
					color: #641E18;
					background-color: #E1C896;
				}
			}
		}
	}
}
</style>