<template>
  <div ref='acav' :class="[isFullScreen ? 'cols' : '', 'col']"></div>
</template>

<script>
import tempWebsocket from "@/websocket/system";
import { mapGetters } from "vuex";
export default {
  mixins: [tempWebsocket],
  computed: {
    ...mapGetters(["isFullScreen"]),
  },
  data() {
    return {
      chartInstane:null,
      titleFontSize:null
    };
  },
  mounted() {
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
      const initOption = {
        title:{
          text:'新增数据类型统计',
          left:'center',
          textStyle: {
          color: "#B3F9FF",
        }
        },
       
         series: [
        {
          name: "新增数据类型统计",
          type: "pie",
          //  radius: '50%',
          data: [
            { value: 735, name: "安卓" },
            { value: 1048, name: "苹果" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
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
            center: ['50%', '30%']
          }
        ]
      }
      this.chartInstane.setOption(adapterOption)
      this.chartInstane.resize()
    },
  }
};
</script>

<style scoped lang="scss">
.col {
  border-radius: 4px;
}
.cols {
  border-radius: 4px;
}
</style>
