<template>
  <div class="bList" >
	 <div style="padding-top:20px;color:#B3F9FF">重点人员预警列表</div>
	  <!-- <p>用户数据状态</p> -->
    <dv-scroll-board :config="config" :class="[isFullScreen?'cols':'','col']" />
  </div>
</template>
<script>
import {
		mapGetters
	} from "vuex";
export default {
  data() {
    return {
      config: {
        header: ["列1", "列2", "列3"],
        data: [
          ["行1列1", "行1列2", "行1列3"],
          ["行2列1", "行2列2", "行2列3"],
          ["行3列1", "行3列2", "行3列3"],
          ["行4列1", "行4列2", "行4列3"],
          ["行5列1", "行5列2", "行5列3"],
          ["行6列1", "行6列2", "行6列3"],
          ["行7列1", "行7列2", "行7列3"],
          ["行8列1", "行8列2", "行8列3"],
          ["行9列1", "行9列2", "行9列3"],
          ["行10列1", "行10列2", "行10列3"],
        ],
        index: true,
        columnWidth: [50],
		rowNum:9,
		 // 表头背景色
        headerBGC: '#151B57',
        // 奇数行背景色
        oddRowBGC: '#09102E',
        // 偶数行背景色
        evenRowBGC: '#070A17',
// columnWidth: [50, 100, 200],
      },
    };
  },
  computed: {
			...mapGetters(['isFullScreen']),
		},
};
</script>
<style scoped lang="scss">
.bList{
	margin:auto;
	width: 95%;
	height:100%;
	/* border: 1px red solid; */
}
.dboard{
	width: 100%;
	height:45vh;
}
h5{
	/* padding-top:15px; */
}
.col {
			height: calc(calc(100vh - 100px)/2);
			border-radius: 4px;
		}
		.cols {
			height: calc(calc(100vh - (14px))/1.8);
			border-radius: 4px;
		}
</style>