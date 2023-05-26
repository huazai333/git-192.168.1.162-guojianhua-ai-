<!-- 商家销量统计的横向柱状图 -->
<template>
	<div class="com-container">
		<div class="title">
			<h5>
				<i class="el-icon-pie-chart"></i>
				预警分析饼状图
			</h5>
		</div>
		<div class="center">	
			<div class="com-chart" ref="seller_ref"></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			chartInstance: null,
			allData: null, // 服务器返回的数据
		};
	},
	mounted() {
		this.initChart();
		this.getData();
		//    setInterval(() => {

		// }, 3000);
		window.addEventListener("resize", this.screenAdapter);
		// 在页面加载完成的时候, 主动进行屏幕的适配
		this.screenAdapter();
	},
	destroyed() {
		// 在组件销毁的时候, 需要将监听器取消掉
		window.removeEventListener("resize", this.screenAdapter);
	},
	methods: {
		// 初始化echartInstance对象
		initChart() {
			this.chartInstance = this.$echarts.init(this.$refs.seller_ref);
			// 对图表初始化配置的控制
			const initOption = {
				tooltip: {
					trigger: 'item'
				},
				series: [
					{
					type: 'pie',
					radius: '70%',
					// 图表数据data
					data: null,
					emphasis: {
						itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
					}
				]
			};
			this.chartInstance.setOption(initOption);
		},
		// 获取服务器的数据
		async getData() {
			const { data: res } = await this.$http.get("/system/keyapp/type");
			
			// this.allData = res.data
			this.allData = [
				{ value: 11, name: '涉恐' },
				{ value: 2, name: '涉赌' },
				{ value: 2, name: '涉政' },
				{ value: 11, name: '涉诈' },
				{ value: 1, name: '宗教' },
				{ value: 2, name: '涉毒' },
				{ value: 2, name: '涉黄' },
			]
			this.updateChart();
		},
		// 更新图表
		updateChart() {
			const dataOption = {
				series: [
					{
						data: this.allData,
					},
				],
			};
			this.chartInstance.setOption(dataOption);
		},

		// 当浏览器的大小发生变化的时候, 会调用的方法, 来完成屏幕的适配
		screenAdapter() {
			// console.log(this.$refs.seller_ref.offsetWidth)
			const titleFontSize = (this.$refs.seller_ref.offsetWidth / 100) * 1.6;
			// 和分辨率大小相关的配置项
			const adapterOption = {
				tooltip: {
					axisPointer: {
						lineStyle: {
							width: titleFontSize,
						},
					},
				},
				series: [
					{
						// barWidth: titleFontSize,
						// itemStyle: {
						//   barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0],
						// },
					},
				],
			};
			this.chartInstance.setOption(adapterOption);
			// 手动的调用图表对象的resize 才能产生效果
			this.chartInstance.resize();
		},
	},
};
</script>

<style lang="scss"  scoped>
.com-container {
	width: 100%;
	height: 300px;
	background: #fff;
	border: 1px solid #dedede;
	.title{
		height: 40px;
		line-height: 40px;
		font-size: 18px;
		font-weight: bold;
		padding-left: 20px;
		border-bottom: 1px solid #dedede;
	}
	.com-chart {
		width: 100%;
		height: 260px;
	}
}

</style>
