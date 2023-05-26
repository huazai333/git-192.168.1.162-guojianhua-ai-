
<template>	
	<div class="com-chart" ref="seller_ref"></div>
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
				trigger: 'item',
				triggerOn: 'mousemove'
			},
			series: [
				{
				type: 'tree',
				data: null,
				top: '1%',
				left: '7%',
				bottom: '1%',
				right: '20%',
				symbolSize: 7,
				label: {
					position: 'left',
					verticalAlign: 'middle',
					align: 'right',
					fontSize: 16
				},
				leaves: {
					label: {
					position: 'right',
					verticalAlign: 'middle',
					align: 'left'
					}
				},
				emphasis: {
					focus: 'descendant'
				},
				expandAndCollapse: true,
				animationDuration: 550,
				animationDurationUpdate: 750
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
				{
					"name": "flare",
					"children": [
						{
							"name": "analytics",
							"children": [
								{
									"name": "cluster"
								},
								{
									"name": "cluster"
								},
								{
									"name": "cluster"
								}
							]
						},
						{
							"name": "animate",
							"children": [
								{
									"name": "Easing", 
									"value": 17010
								},
								{
									"name": "Easing", 
									"value": 17010
								},
								{
									"name": "Easing", 
									"value": 17010
								}
							]
						},
					]
				}
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


.com-chart {
	width: 100%;
	height: calc(100vh - 70px - 42px - 30px);
	background: #fff;
}

</style>