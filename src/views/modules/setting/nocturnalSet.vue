<template >
  <div class="m_center">
    <div class="item1">
      <div class="tit">
        <h5>昼伏夜出模型配置</h5>
        <div class="btn">
          <el-button v-if="id && state === 1" type="info" disabled
            >已暂停</el-button
          >
          <el-button v-if="id && state === 0" type="primary" disabled
            >已启用</el-button
          >
          <el-button v-if="id && state === 0" type="warning" @click="pause()"
            >暂停</el-button
          >
          <el-button v-if="id && state === 1" type="primary" @click="start()"
            >启用</el-button
          >
          <el-button v-if="id" type="danger" @click="delModel()"
            >删除</el-button
          >
          <el-button type="primary" @click="back()">返回</el-button>
        </div>
      </div>
      <el-form
        ref="modelForm"
        :model="modelForm"
        :rules="modelRules"
        label-width="auto"
        label-position="top"
        :inline="true"
      >
        <div class="small_tit">基本属性</div>
        <el-form-item
          label="模型名称："
          prop="modelName"
          style="width: 20%; display: inline-block"
        >
          <el-input
            v-model="modelForm.modelName"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item
          label="所属类型："
          prop="type"
          style="width: 20%; display: inline-block"
        >
          <el-select v-model="modelForm.type">
            <el-option label="刑侦" value="1"></el-option>
            <el-option label="禁毒" value="2"></el-option>
            <el-option label="国保" value="3"></el-option>
            <el-option label="治安" value="4"></el-option>
            <el-option label="反恐" value="5"></el-option>
          </el-select>
        </el-form-item>

        <div class="small_tit">定义夜晚时间段</div>
        <el-form-item
          label="夜晚起始："
          prop="nocturnal_night_start"
          style="width: 20%; display: inline-block"
        >
          <el-input
            v-model.number="modelForm.nocturnal_night_start"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="夜晚结束："
          prop="nocturnal_night_end"
          style="width: 20%; display: inline-block"
        >
          <el-input
            v-model.number="modelForm.nocturnal_night_end"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <div class="small_tit">分析时间范围</div>
        <el-form-item
          label="连续统计天数："
          prop="nocturnal_day_cnt"
          style="width: 20%; display: inline-block"
        >
          <el-input
            v-model.number="modelForm.nocturnal_day_cnt"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <div class="small_tit">预警上报临界值</div>
        <el-form-item
          label="统计的天数中昼伏夜出的比例："
          prop="nocturnal_rate"
          style="width: 20%; display: inline-block"
        >
          <el-input
            v-model.number="modelForm.nocturnal_rate"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>

        <!-- <div class="tit">
          <h5>请选择区域</h5>
          <div class="btn">
            <el-button type="primary" @click="clearMap()">重置区域</el-button>
          </div>
        </div>
        <baidu-map class="map" center="喀什地区" :zoom="12">
          <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          <bm-polygon
            :path="polygonPath"
            stroke-color="blue"
            :stroke-opacity="0.5"
            :stroke-weight="2"
            :editing="true"
            @lineupdate="updatePolygonPath"
            :massClear="true"
          />
        </baidu-map> -->

        <div style="text-align: center; margin: 22px 0">
          <el-button type="primary" @click="resetForm('modelForm')"
            >重置</el-button
          >
          <el-button type="primary" v-if="id" @click="updataModel"
            >修改模型</el-button
          >
          <el-button type="primary" v-else @click="addModel">确定</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      activeName: "first",
      // 模型ID 状态
      id: "",
      //   模型状态 0：已启用  1：已暂停
      state: 1,
      polygonPath: [
        { lng: 75.995137, lat: 39.493922 },
        { lng: 75.952593, lat: 39.450699 },
        { lng: 76.033656, lat: 39.453374 },
      ],
      // 模型
      modelForm: {
        modelType: "5",
        modelName: "昼伏夜出",
        type: "1",
        nocturnal_night_start: 0,
        nocturnal_night_end: 7,
        nocturnal_day_cnt: 7,
        nocturnal_rate: 57,
        location: "",
      },
      modelRules: {
        modelName: [{ required: true, message: "请输入", trigger: "blur" }],
        type: [{ required: true, message: "请选择", trigger: "blur" }],
        nocturnal_night_start: [
          { required: true, message: "请输入" },
          { type: "number", message: "必须为数字值" },
          {
            pattern: /^(2[0-3]|[0-1]?\d)$/,
            message: "范围在0-23",
            trigger: "blur",
          },
        ],
        nocturnal_night_end: [
          { required: true, message: "请输入" },
          { type: "number", message: "必须为数字值" },
          {
            pattern: /^(2[0-3]|[0-1]?\d)$/,
            message: "范围在0-23",
            trigger: "blur",
          },
        ],
        nocturnal_day_cnt: [
          { required: true, message: "请输入" },
          { type: "number", message: "必须为数字值" },
          {
            pattern: /^([12][0-9]|30|[1-9])$/,
            message: "范围在2-30",
            trigger: "blur",
          },
        ],
        nocturnal_rate: [
          { required: true, message: "请输入" },
          { type: "number", message: "必须为数字值" },
          {
            pattern: /^(1|[1-9]\d?|100)$/,
            message: "范围在1-100",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getInfo(this.$route.query);
  },
  mounted() {
    this.getInfo(this.$route.query);
  },
  activated() {
    this.getInfo(this.$route.query);
  },
  watch: {
    $route(to, from) {
      this.init();
    },
  },
  methods: {
    clearMap() {
      this.polygonPath = [
        { lng: 75.995137, lat: 39.493922 },
        { lng: 75.952593, lat: 39.450699 },
        { lng: 76.033656, lat: 39.453374 },
      ];
    },
    updatePolygonPath(e) {
      this.polygonPath = e.target.getPath();

      //   console.log(this.polygonPath);
    },
    // 暂停模型
    pause() {
      let data = {
        modelId: this.id,
        modelType: this.modelForm.modelType,
        modelStatus: 1,
      };
      data = JSON.parse(JSON.stringify(data));
      this.$http
        .post("/system/model/modelOnOff", data)
        .then(({ data: res }) => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "暂停成功",
            });
            console.log(res);
            this.state = 1;
          } else {
            this.$message({
              type: "warning",
              message: "暂停失败",
            });
          }
        })
        .finally(() => {});
    },
    // 开启
    start() {
      let data = {
        modelId: this.id,
        modelType: this.modelForm.modelType,
        modelStatus: 0,
      };
      data = JSON.parse(JSON.stringify(data));
      this.$http
        .post("/system/model/modelOnOff", data)
        .then(({ data: res }) => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "开启成功",
            });
            console.log(res);
            this.state = 0;
          } else {
            this.$message({
              type: "warning",
              message: "开启失败",
            });
          }
        })
        .finally(() => {});
    },
    // 删除
    delModel() {
      let data = {
        modelId: this.id,
        modelType: this.modelForm.modelType,
        modelStatus: 1,
      };
      data = JSON.parse(JSON.stringify(data));
      this.$http
        .post("/system/model/del", data)
        .then(({ data: res }) => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.$router.go(-1);
          } else {
            this.$message({
              type: "warning",
              message: "删除失败",
            });
          }
        })
        .finally(() => {});
    },
    // 路由跳转清除当前数据
    init() {
      Object.assign(this.$data, this.$options.data.call(this));
    },
    // 返回
    back() {
      window.history.go(-1);
    },
    // 获取模型信息
    getInfo(item) {
      if (item.item) {
        this.$http({
          url: "/system/model/" + item.item,
          method: "get",
        }).then(({ data: res }) => {
          this.id = res.data.model.id;
          this.modelForm = JSON.parse(res.data.model.parameter);
        //   this.polygonPath = JSON.parse(res.data.model.parameter).location;
          this.modelForm.nocturnal_rate = parseFloat((this.modelForm.nocturnal_rate*100).toFixed(2))  ;

          this.state = res.data.model.state;
        });
      }
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.modelForm = {};
    },
    // 添加模型
    addModel() {
      this.$refs.modelForm.validate((valid) => {
        if (!valid) return;
        this.loading = true;
        // this.modelForm.location = this.polygonPath;
        this.modelForm.nocturnal_rate = parseFloat((this.modelForm.nocturnal_rate/100).toFixed(2))
        this.modelForm.model_name = this.modelForm.modelName
        let data = JSON.parse(JSON.stringify(this.modelForm));
        this.$http
          .post("/system/model/add", data)
          .then(({ data: res }) => {
            this.modelForm.nocturnal_rate = parseFloat((this.modelForm.nocturnal_rate*100).toFixed(2))
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: "添加成功",
              });
              this.id = res.data;
            } else {
              this.$message({
                type: "warning",
                message: "添加失败",
              });
            }
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    // 修改模型
    updataModel() {
      this.$refs.modelForm.validate((valid) => {
        if (!valid) return;
        this.loading = true;

        this.modelForm["modelId"] = this.id;
        // this.modelForm.location = this.polygonPath;
        this.modelForm.nocturnal_rate = parseFloat((this.modelForm.nocturnal_rate/100).toFixed(2))
        this.modelForm.model_name = this.modelForm.modelName
        let data = JSON.parse(JSON.stringify(this.modelForm));
        this.$http
          .post("/system/model/update", data)
          .then(({ data: res }) => {
            this.modelForm.nocturnal_rate = parseFloat((this.modelForm.nocturnal_rate*100).toFixed(2))
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: "修改成功",
              });
              this.id = res.data;
            } else {
              this.$message({
                type: "warning",
                message: "修改失败",
              });
            }
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
  },
};
</script>
<style lang="scss">
.m_center {
  padding: 20px;
  .tit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 22px;
    h5 {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .small_tit {
    font-size: 17px;
    font-weight: bold;
  }
  .item1 {
    border-bottom: 1px solid #dedede;
    margin-bottom: 22px;
  }
  .item2 {
    margin-bottom: 22px;
  }
}
body .aui-content .el-tabs .el-tabs__header {
  box-shadow: none !important;
  .el-tabs__nav-wrap::after {
    display: none;
  }
  .el-tabs__active-bar {
    display: none;
  }
  .el-tabs__item {
    color: #333;
    font-size: 20px;
    padding: 0 20px;
    &.is-active {
      background: #2a3f54;
      border-radius: 3px;
      color: #fff;
    }
  }
}
.el-form--inline .el-form-item {
  margin-right: 0 !important;
  padding: 0 10px;
  .el-select {
    display: block;
  }
}
.map {
  width: 100%;
  height: 400px;
}
</style>
