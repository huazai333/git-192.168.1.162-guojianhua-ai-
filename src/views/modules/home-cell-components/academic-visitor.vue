<template>
		<div ref='acav' :class="[isFullScreen ? 'cols' : '', 'col']"></div>
</template>
<script>
import {
		mapGetters
	} from "vuex";
	export default {
		data() {
			return {
			chartInstane:null,
      titleFontSize:null
			}
		},
		computed: {
			...mapGetters(['isFullScreen']),
		},
	    mounted(){
        this.initChart();
        window.addEventListener('resize',this.screenAdapter);
        this.screenAdapter()
		},
    destroyed(){
   window.removeEventListener('resize',this.screenAdapter)
    },
    methods:{
      initChart(){
        this.chartInstane = echarts.init(this.$refs.acav)
        const initOption ={
          title: {
    text: '新增设备数据统计',
	textStyle:{
      color:'#B3F9FF',
      fontSize:12
    }
  },
    
  radar: {
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: '#3c468b',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
    indicator: [
      { name: '魅族', max: 6500 },
      { name: '小米', max: 16000 },
      { name: '华为', max: 30000 },
      { name: 'vivo', max: 38000 },
      { name: 'OPPO', max: 52000 },
      { name: '苹果', max: 25000 }
    ]
  },
  series: [
    {
      type: 'radar',
	   symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: '#3c468b',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1
            }
          },
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget'
        },
       
      ]
    }
  ]
        }
        this.chartInstane.setOption(initOption)
      },
      screenAdapter () {
      this.titleFontSize = this.$refs.acav.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: this.titleFontSize
          }
        },
        series: [
          {
            radius: this.titleFontSize * 4.5,
            center: ['40%', '40%']
          }
        ]
      }
      this.chartInstane.setOption(adapterOption)
      this.chartInstane.resize()
    },
    }
	}
</script>

<style scoped lang="scss">
.col {
  border-radius: 4px;
}
.cols {
  border-radius: 4px;
}
</style>
