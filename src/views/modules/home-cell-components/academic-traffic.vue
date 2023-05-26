<template>
	<div ref='acav' :class="[isFullScreen?'cols':'','col']">
	</div>
</template>
<script>
	import {
		mapGetters
	} from "vuex";
	export default {
		data() {
			return {
				dataList: [],
			}
		},
		computed: {
			...mapGetters(['isFullScreen']),
		},
		mounted(){
              var myChart = echarts.init(this.$refs.acav);
              var option = {
 title: {
    text: '数据123',
    left: '45%',
    top: '40%',
    textAlign: 'center',
    textStyle: {
      fontSize: '16',
      fontWeight: '500',
      color: '#909dff',
      textAlign: 'center',
    },
  },
  series: [
    {
      type: 'pie',
      startAngle: 0,
      radius: ['80%', '70%'],
      center: ['50%', '50%'],
      data: [
        {
          value: 30,
          name:'dds',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#5a8bfa',
                },
                {
                  offset: 1,
                  color: '#831bdb',
                },
              ]),
              shadowColor: 'rgba(175,143,230,.5)',
              shadowBlur: 10,
            },
          },
          label: {
            show: false,
          },
          labelLine: {
            normal: {
              smooth: true,
              lineStyle: {
                width: 0,
              },
            },
          },
          hoverAnimation: false,
        },
        {
          label: {
            show: false,
          },
          labelLine: {
            normal: {
              smooth: true,
              lineStyle: {
                width: 0,
              },
            },
          },
          value: 100 - 20,
          hoverAnimation: true,
          itemStyle: {
            color: 'rgba(79,76,192, 0.3)',
          },
        },
      ],
    },
  ],
			  }
			  myChart.setOption(option);
		}
	}
</script>

<style scoped lang="scss">
	.academic-traffic {
		color: blue;
	}
	.el-progress{
		margin-left: 20%;
	}
</style>
