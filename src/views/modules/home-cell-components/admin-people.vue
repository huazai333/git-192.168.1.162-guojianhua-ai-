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
  created(){
    this.$http("/hadoop/task/select").then(res=>{
      console.log(res)
    })
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
          text:'分析数据统计',
          left:'center',
          textStyle: {
          color: "#B3F9FF",
        }
        },
       
         series: [
        {
          name: "分析数据统计",
          type: "pie",
          //  radius: '50%',
          data: [
            { value: 735, name: "设备分析" },
            { value: 1048, name: "敏感APP分析条数" },
            { value: 580, name: "热点分析" },
            { value: 484, name: "流动人员" },
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
            center: ['50%', '40%']
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
