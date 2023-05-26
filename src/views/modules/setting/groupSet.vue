<template >
  <div class="m_center">
    <div class="item1">
      <div class="tit">
        <h5>群体分析模型配置</h5>
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

        <el-form-item label="模型名称：" prop="modelName" style="width: 20%">
          <el-input
            v-model="modelForm.modelName"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="所属类型：" prop="type" style="width: 20%">
          <el-select v-model="modelForm.type">
            <el-option label="刑侦" value="1"></el-option>
            <el-option label="禁毒" value="2"></el-option>
            <el-option label="国保" value="3"></el-option>
            <el-option label="治安" value="4"></el-option>
            <el-option label="反恐" value="5"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="群体分析阈值："
          prop="groupThreshold"
          style="width: 20%"
        >
          <el-input
            v-model.number="modelForm.groupThreshold"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>

        <div class="small_tit">共时空关联</div>

        <el-form-item
          label="同时空地理坐标范围跨度(米)："
          prop="distanceRange"
          style="width: 20%"
        >
          <el-input
            v-model.number="modelForm.distanceRange"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="同时空时间范围跨度(分钟)："
          prop="timeRange"
          style="width: 20%"
        >
          <el-input
            v-model.number="modelForm.timeRange"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="设备同时空权重系数："
          prop="commonCoordinateDeviceCoefficient"
          style="width: 20%"
        >
          <el-input
            v-model.number="modelForm.commonCoordinateDeviceCoefficient"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <div class="small_tit">共热点关联</div>
        <el-form-item
          label="设备共热点权重系数："
          prop="commonWifiDeviceCoefficient"
          style="width: 20%"
        >
          <el-input
            v-model.number="modelForm.commonWifiDeviceCoefficient"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <div class="small_tit">共IP关联</div>
        <el-form-item
          label="设备共IP权重系数："
          prop="commonIpDeviceCoefficient"
          style="width: 20%"
        >
          <el-input
            v-model.number="modelForm.commonIpDeviceCoefficient"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <div class="small_tit">共设备关联</div>
        <el-form-item
          label="设备共设备权重系数："
          prop="deviceRelationCoefficient"
          style="width: 20%"
        >
          <el-input
            v-model.number="modelForm.deviceRelationCoefficient"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>

        
        <div class="tit">
          <h5>设备配置</h5>
          <div class="btn">
            <el-button type="primary" @click="addDevice()">添加设备</el-button>
          </div>
        </div>
        <!-- tabel区域 -->
        <el-table :data="dataSource" style="width: 100%">
          <el-table-column
            label="设备号码"
            prop="devPhone"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="设备IMEI"
            prop="devImei"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="设备IMSI"
            prop="devImsi"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            label="设备MAC"
            prop="devMac"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            label="设备添加时间"
            prop="date"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <!-- <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="修改"
                placement="top"
              >
                <el-button
                  size="mini"
                  type="success"
                  icon="el-icon-edit"
                  @click="modify(scope)"
                  circle
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="top-end"
              >
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="del(scope)"
                  circle
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column> -->
        </el-table>

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

    <!-- 添加 -->
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="40%"
    >
      <el-form
        label-width="120px"
        :rules="formAddRules"
        ref="fAdd"
        :model="relate"
      >
        <el-form-item label="设备号码:" prop="devPhone"
          ><el-input v-model="relate.devPhone"></el-input>
        </el-form-item>
        <el-form-item label="设备imei:" prop="devImei">
          <el-input v-model="relate.devImei"></el-input>
        </el-form-item>
        <el-form-item label="设备imsi:" prop="devImsi"
          ><el-input v-model="relate.devImsi"></el-input>
        </el-form-item>
        <el-form-item label="设备mac:" prop="devMac"
          ><el-input v-model="relate.devMac"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="addok()" v-loading="loading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      title="修改"
      :visible.sync="dialogVisible2"
      :before-close="handleClose"
      width="40%"
    >
      <el-form
        label-width="120px"
        :rules="formAddRules"
        ref="fAdd"
        :model="relate"
      >
        <el-form-item label="设备号码:" prop="devPhone"
          ><el-input v-model="relate.devPhone"></el-input>
        </el-form-item>
        <el-form-item label="设备imei:" prop="devImei">
          <el-input v-model="relate.devImei"></el-input>
        </el-form-item>
        <el-form-item label="设备imsi:" prop="devImsi"
          ><el-input v-model="relate.devImsi"></el-input>
        </el-form-item>
        <el-form-item label="设备mac:" prop="devMac"
          ><el-input v-model="relate.devMac"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="changeok()" v-loading="loading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      // 模型ID 状态
      id: "",
      //   模型状态 0：已启用  1：已暂停
      state: 1,
      // 模型
      modelForm: {
        modelType: "3",
        modelName: "群体分析",
        type: "1",
        distanceRange: 50,
        timeRange: 20,
        commonWifiDeviceCoefficient: 1,
        commonIpDeviceCoefficient: 1,
        commonCoordinateDeviceCoefficient: 1,
        deviceRelationCoefficient: 1,
        groupThreshold: 10,
      },
      modelRules: {
        modelName: [{ required: true, message: "请输入", trigger: "blur" }],
        type: [{ required: true, message: "请选择", trigger: "blur" }],
        distanceRange: [
          { required: true, message: "请输入" },
          { type: "number", message: "必须为数字值" },
          {
            pattern: /\b[1-9]\d{0,1}\b|\b[1-4]\d\d\b|\b500\b/,
            message: "范围在1-500",
            trigger: "blur",
          },
        ],
        timeRange: [
          { required: true, message: "请输入" },
          { type: "number", message: "必须为数字值" },
          {
            pattern: /^([12][0-9]|30|[1-9])$/,
            message: "范围在1-30",
            trigger: "blur",
          },
        ],
        commonWifiDeviceCoefficient: [
          { required: true, message: "请输入" },
          { type: "number", message: "必须为数字值" },
          {
            pattern: /^([1-9]|10)$/,
            message: "范围在1-10",
            trigger: "blur",
          },
        ],
        commonIpDeviceCoefficient: [
          { required: true, message: "请输入" },
          { type: "number", message: "必须为数字值" },
          {
            pattern: /^([1-9]|10)$/,
            message: "范围在1-10",
            trigger: "blur",
          },
        ],
        commonCoordinateDeviceCoefficient: [
          { required: true, message: "请输入" },
          { type: "number", message: "必须为数字值" },
          {
            pattern: /^([1-9]|10)$/,
            message: "范围在1-10",
            trigger: "blur",
          },
        ],
        deviceRelationCoefficient: [
          { required: true, message: "请输入" },
          { type: "number", message: "必须为数字值" },
          {
            pattern: /^([1-9]|10)$/,
            message: "范围在1-10",
            trigger: "blur",
          },
        ],
        groupThreshold: [
          { required: true, message: "请输入" },
          { type: "number", message: "必须为数字值" },
          {
            pattern: /^(1|[1-9]\d?|100)$/,
            message: "范围在1-100",
            trigger: "blur",
          },
        ],
      },

// 设备
      dataSource: [],
      loading: false,
      relate: {
        modelId: "",
        devPhone: "",
        devMac: "",
        devImsi: "",
        devImei: "",
      },
      dialogVisible: false,
      dialogVisible2: false,
      formAddRules: {
        devPhone: [
          //   { required: true, message: "请输入", trigger: "blur" },
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        devImei: [
          //   { required: true, message: "请输入", trigger: "blur" },
          {
            pattern: /^[\d]{15}(?:[\d]{2})?$/,
            message: "请输入正确的IMEI号码",
            trigger: "blur",
          },
        ],
        devMac: [
          //   { required: true, message: "请输入", trigger: "blur" },
          {
            pattern: /^([0-9a-fA-F]{2})(([:][0-9a-fA-F]{2}){5})$/,
            message: "请输入正确的MAC号码",
            trigger: "blur",
          },
        ],
        devImsi: [
          //   { required: true, message: "请输入", trigger: "blur" },
          {
            pattern: /^4600[0,1,2,3,5,6,7]\d{10}$/g,
            message: "请输入正确的IMSI号码",
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
      // 判断有无配置数据
      if (this.groupList.length != 0) {
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
                message: "模型已开启",
              });
              this.state = 0;
            } else {
              this.$message({
                type: "warning",
                message: "开启失败",
              });
            }
          })
          .finally(() => {});
      } else {
        this.$message({
          type: "warning",
          message: "请配置数据",
        });
      }
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
          this.modelForm.timeRange = this.modelForm.timeRange / 60;
          this.getList();

          this.state = res.data.model.state;

        //   this.$refs.fAdd.resetFields();
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
        this.modelForm.timeRange = this.modelForm.timeRange * 60;
        let data = JSON.parse(JSON.stringify(this.modelForm));
        this.$http
          .post("/system/model/add", data)
          .then(({ data: res }) => {
            this.modelForm.timeRange = this.modelForm.timeRange / 60;
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
        this.modelForm.timeRange = this.modelForm.timeRange * 60;

        let data = JSON.parse(JSON.stringify(this.modelForm));
        this.$http
          .post("/system/model/update", data)
          .then(({ data: res }) => {
            this.modelForm.timeRange = this.modelForm.timeRange / 60;
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

    // 设备信息 增删改查
    getList() {
      this.$http({
        url: "system/group/list?modelId=" + this.id,
      }).then((res) => {
        if (res.data.code == 0) {
          this.dataSource = res.data.data.list;

          if (this.state === 0 && this.dataSource.length === 0) {
            this.pause();
          }
        }
      });
    },
    // 关闭时清空
    handleClose() {
      //   let obj = this.relate;
      //   for (var i in obj) {
      //     obj[i] = "";
      //   }
      this.$refs.fAdd.resetFields();
      this.dialogVisible = false;
      this.dialogVisible2 = false;
    },
    //删除
    del(scope) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .post("system/keydevice/del/" + scope.row.devId)
            .then((res) => {
              console.log(res, "删除");
              if (res.data.code == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getList();
              } else {
                this.$message({
                  type: "info",
                  message: "删除失败!",
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addDevice() {
      if (this.id) {
        this.dialogVisible = true;
        this.relate.modelId = this.id;
      } else {
        this.$message({
          type: "warning",
          message: "请先配置模型",
        });
      }
    },
    //添加
    addok() {
      this.$refs.fAdd.validate((valid) => {
        if (!valid) return;
        if (
          this.relate.devPhone ||
          this.relate.devImsi ||
          this.relate.devImei ||
          this.relate.devMac
        ) {
          this.loading = true;
          let data = JSON.parse(JSON.stringify(this.relate));
          this.$http
            .post("system/group/save", data)
            .then((res) => {
              console.log(res, "添加");
              if (res.data.code == 0) {
                this.$message({
                  type: "success",
                  message: "添加成功",
                });
                this.dialogVisible = false;
                this.getList();
              } else {
                this.$message({
                  type: "warning",
                  message: "添加失败",
                });
                this.dialogVisible = false;
              }
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          this.$message({
            type: "warning",
            message: "手机号码、IMEI、IMSI、MAC至少填入一项",
          });
          return;
        }
      });
    },
    //修改
    modify(scope) {
      this.dialogVisible2 = true;
      this.relate.devPhone = scope.row.devPhone;
      this.relate.devMac = scope.row.devMac;
      this.relate.devImsi = scope.row.devImsi;
      this.relate.devImei = scope.row.devImei;
      this.relate.devModel = scope.row.devModel;
      this.relate.devId = scope.row.devId;
    },
    //确认修改
    changeok() {
      this.$refs.fAdd.validate((valid) => {
        if (!valid) return;
        this.loading = true;
        let data = JSON.parse(JSON.stringify(this.relate));
        this.$http
          .post("system/keydevice/update", data)
          .then((res) => {
            console.log(res, "修改");
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "修改成功",
              });
              this.dialogVisible2 = false;
              this.getList();
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
</style>
