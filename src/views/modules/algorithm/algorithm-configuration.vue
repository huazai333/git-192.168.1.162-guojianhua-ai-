<template>
  <div class="app-container">
    <div class="filter-container">
      <el-main>
        <el-button @click="countReset()" style="margin-bottom: 20px"
          >算法重置</el-button
        >
        <el-tabs
          type="border-card"
          @tab-click="tabsHandleClick"
          v-model="tabType"
        >
          <el-tab-pane label="抽烟检测" name="smoke"> </el-tab-pane>

          <el-tab-pane label="安全帽检测" name="helmet"> </el-tab-pane>

          <el-tab-pane label="戴口罩检测" name="mask"> </el-tab-pane>

          <el-tab-pane label="火焰检测" name="fire"> </el-tab-pane>

          <el-tab-pane label="手套检测" name="glove"> </el-tab-pane>

          <el-tab-pane label="人流检测" name="personCnt"> </el-tab-pane>

          <el-tab-pane label="跌倒检测" name="fall"> </el-tab-pane>

          <el-tab-pane label="离岗检测" name="leave"> </el-tab-pane>

          <el-tab-pane label="睡岗检测" name="sleep"> </el-tab-pane>

          <el-tab-pane label="打电话检测" name="phone"> </el-tab-pane>

          <el-tab-pane label="反光衣检测" name="reflective"> </el-tab-pane>

          <el-tab-pane label="电瓶车检测" name="electromobile"> </el-tab-pane>
          <Item ref="item" :type="tabType"></Item>
        </el-tabs>
      </el-main> 
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import Item from "./item";

export default {
  components: { Item },
  data() {
    return {
      tabType: "smoke",

      
      pageVideo: "",
      dictList: [],
    };
  },
  created() {

  },
  activated() {
    
  },
  mounted() {
    this.pageVideo = this.$route.query.url;
    this.getData(this.$route.query.resData);

    /*    this.init("myCanvas");
        this.init("myCanvas2");

        this.drawCanvasBgRect();

        this.initCanvasEvent();*/
  },
  computed: {
    ...mapGetters(["accountId"]),
  },
  methods: {
    selectdictList() {
      this.$http({
        url: this.$http.adornUrl("/dict/selectDict"),
        method: "get",
      }).then((response) => {});
    },
    countReset() {
      this.$http({
        url: this.$http.adornUrl("/configure/startTask"),
        method: "get",
      }).then((response) => {
        this.$message.success("重置成功");
      });
    },
    tabsHandleClick(tab, event) {
      this.tabType = tab.name;
      this.$refs["item"].initTab(this.tabType, this.pageId, this.pageVideo);
    },
    getData(id) {
      this.pageId = id;
      /*      if (item) {
              item.forEach((item, index) => {

                if (item.type == "smoke") {
                  this.dataForm1 = item;
                } else if (item.type == "leave") {
                  this.dataForm2 = item;
                } else if (item.type == "sleep") {
                  this.dataForm3 = item;
                } else if (item.type == "helmet") {
                  this.dataForm4 = item;
                }
              });
            }*/
      this.$refs["item"].initTab(this.tabType, id, this.pageVideo);
    },
    
    
  },
};
</script>

<style lang="scss">
// 显示图片区域
body {
  background-color: transparent !important;
}

iframe {
  body,
  html {
    background-color: transparent !important;
  }
}

.img-box {
  position: relative;
  text-align: center;
  margin-top: 100px;

  #pic {
    display: inline-block;
    position: relative;

    img {
      width: 640px;
      height: 360px;
    }
  }
}

.btn_more {
  margin-top: 50px;
  text-align: center;
}

// canvas绝对定位，盖在图片上方，这里的z-indext如果没有设置，则canvas无法使用

#myCanvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

#myCanvas2 {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.iframe {
}
</style>
<style scope>
body .aui-content .el-tabs .el-tabs__header {
  box-shadow: none !important;
}
</style>