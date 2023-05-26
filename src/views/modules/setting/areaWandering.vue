<template >
  <div class="m_center">
    <div class="item1">
      <div class="tit">
        <h5>模型配置</h5>
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

        <div style="text-align: center; margin-bottom: 22px">
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
    <div class="item2">
      <div class="tit">
        <div class="btn">
          <el-button type="primary" @click="addArea()"
            >新增多边形区域</el-button
          >
          <el-button type="primary" @click="addArea5()">新增圆形区域</el-button>
        </div>
      </div>

      <!-- tabel区域 -->
      <el-table :data="dataSource" style="width: 100%">
        <el-table-column
          label="区域名称"
          prop="areaName"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="区域类型"
          prop="tag"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.tag === 1 ? "圆形区域" : "多边形区域" }}
          </template>
        </el-table-column>
        <el-table-column
          label="阈值(出现次数)"
          prop="threshold"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="添加日期"
          prop="date"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column label="区域详情" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.tag === 1"
              type="text"
              @click="viewHandle2(scope)"
            >
              详情
            </el-button>
            <el-button
              v-if="scope.row.tag === 2"
              type="text"
              @click="viewHandle(scope)"
            >
              详情
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-tooltip class="item" effect="dark" content="修改" placement="top">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-edit"
              @click="modify(scope)"
              circle
            ></el-button>
          </el-tooltip> -->

            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="del(scope)"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加弹框 -->
      <el-dialog
        title="添加"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose"
      >
        <el-form
          label-width="80px"
          :rules="formAddRules"
          ref="fAdd"
          :model="relate"
        >
          <el-form-item label="区域名称:" prop="areaName">
            <el-input v-model="relate.areaName"></el-input>
          </el-form-item>
          <el-form-item label="阈值:" prop="threshold">
            <el-input v-model="relate.threshold"></el-input>
          </el-form-item>

          <el-button type="primary" @click="add" style="margin-bottom: 10px"
            >添加坐标</el-button
          >

          <div v-for="(item, index) in formAdd" :key="index">
            <el-form-item
              label="经度:"
              style="width: 40%; display: inline-block"
            >
              <el-input v-model="item.lon"></el-input>
            </el-form-item>
            <el-form-item
              label="纬度:"
              style="width: 40%; display: inline-block"
            >
              <el-input v-model="item.lat"></el-input>
            </el-form-item>
            <el-button
              style="width: 40px; display: inline-block; margin-left: 5px"
              type="danger"
              @click="delInput(item, index)"
              >-</el-button
            >
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" v-loading="loading" @click="addok()"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <el-dialog
        title="添加"
        :visible.sync="dialogVisible5"
        width="40%"
        :before-close="handleClose"
      >
        <el-form
          label-width="80px"
          :rules="formAddRules1"
          ref="fAdd1"
          :model="relate1"
        >
          <el-form-item label="区域名称:" prop="areaName">
            <el-input v-model="relate1.areaName"></el-input>
          </el-form-item>
          <el-form-item label="阈值:" prop="threshold">
            <el-input v-model="relate1.threshold"></el-input>
          </el-form-item>

          <el-form-item label="经度:" prop="lon">
            <el-input v-model="relate1.lon"></el-input>
          </el-form-item>
          <el-form-item label="纬度:" prop="lat">
            <el-input v-model="relate1.lat"></el-input>
          </el-form-item>
          <el-form-item label="范围(m):" prop="radius">
            <el-input v-model.number="relate1.radius"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible5 = false">取 消</el-button>
          <el-button type="primary" v-loading="loading" @click="addok1()"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <!-- 多边形详情 -->
      <el-dialog
        title="区域详情"
        v-if="dialogVisible3"
        :visible.sync="dialogVisible3"
        :before-close="handleClose"
        width="40%"
      >
        <baidu-map class="map" :center="polygonPath[0]" :zoom="8">
          <bm-polygon
            :path="polygonPath"
            stroke-color="blue"
            :stroke-opacity="0.5"
            :stroke-weight="2"
          />
        </baidu-map>
      </el-dialog>
      <!-- 圆形 -->
      <el-dialog
        title="区域详情"
        v-if="dialogVisible4"
        :visible.sync="dialogVisible4"
        :before-close="handleClose"
        width="40%"
      >
        <baidu-map class="map" :center="circlePath.center" :zoom="12">
          <bm-circle
            :center="circlePath.center"
            :radius="circlePath.radius"
            stroke-color="blue"
            :stroke-opacity="0.5"
            :stroke-weight="2"
          ></bm-circle>
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        </baidu-map>
      </el-dialog>
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
      // 模型
      modelForm: {
        modelType: "8",
        modelName: "重点区域徘徊",
        type: "1",
      },
      modelRules: {
        modelName: [{ required: true, message: "请输入", trigger: "blur" }],
        type: [{ required: true, message: "请选择", trigger: "blur" }],
      },

      dataSource: [], //列表数据
      loading: false,
      relate: {
        areaName: null,
        threshold: null,
      }, //添加参数
      relate1: {
        areaName: null,
        threshold: null,
        lon: null,
        lat: null,
        radius: null,
      },
      dialogVisible: false,
      dialogVisible3: false,
      dialogVisible4: false,
      dialogVisible5: false,
      formAddRules: {
        areaName: [{ required: true, message: "请输入值", trigger: "blur" }],
        threshold: [{ required: true, message: "请输入值", trigger: "blur" }],
         lon: [
          { required: true, message: "请输入值", trigger: "blur" },
          {
            pattern: /^[-\+]?\d+(\.\d+)/,
            message: "请正确填写坐标",
            trigger: "blur",
          },
        ],
        lat: [
          { required: true, message: "请输入值", trigger: "blur" },
          {
            pattern: /^[-\+]?\d+(\.\d+)/,
            message: "请正确填写坐标",
            trigger: "blur",
          },
        ],
      }, //非空验证
      formAddRules1: {
        areaName: [{ required: true, message: "请输入值", trigger: "blur" }],
        threshold: [{ required: true, message: "请输入值", trigger: "blur" }],
        lon: [
          { required: true, message: "请输入值", trigger: "blur" },
          {
            pattern: /^[-\+]?\d+(\.\d+)/,
            message: "请正确填写坐标",
            trigger: "blur",
          },
        ],
        lat: [
          { required: true, message: "请输入值", trigger: "blur" },
          {
            pattern: /^[-\+]?\d+(\.\d+)/,
            message: "请正确填写坐标",
            trigger: "blur",
          },
        ],
        radius: [
          { required: true, message: "请输入值", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
          {
            pattern: /^(1|[1-9]\d?|100)$/,
            message: "范围在1-100",
            trigger: "blur",
          },
        ],
      }, //非空验证

      polygonPath: [],
      circlePath: {},
      list: [],
      formAdd: [
        {
          lon: "",
          lat: "",
        },
      ],
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
      if (this.dataSource.length != 0) {
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
          this.state = res.data.model.state;
        this.getList();

        //   this.$refs.fAdd.resetFields();
        //     this.$refs.fAdd1.resetFields();
          
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

        let data = JSON.parse(JSON.stringify(this.modelForm));
        this.$http
          .post("/system/model/add", data)
          .then(({ data: res }) => {
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

        let data = JSON.parse(JSON.stringify(this.modelForm));
        this.$http
          .post("/system/model/update", data)
          .then(({ data: res }) => {
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
    addArea() {
      if (this.id) {
        this.dialogVisible = true;
      } else {
        this.$message({
          type: "warning",
          message: "请先配置模型",
        });
      }
    },
    addArea5() {
      if (this.id) {
        this.dialogVisible5 = true;
      } else {
        this.$message({
          type: "warning",
          message: "请先配置模型",
        });
      }
    },
    getList() {
      this.$http({
        url: "system/area/modelAll?modelId=" + this.id,
        method: "get",
      }).then((res) => {
        if (res.data.code == 0) {
          this.dataSource = res.data.data;

        //   if (this.state === 0 && this.dataSource.length === 0) {
        //     this.pause();
        //   }
        }
      });
    },
    // 详情
    viewHandle(scope) {
      this.dialogVisible3 = true;

      this.polygonPath = scope.row.point;
    },
    viewHandle2(scope) {
      this.dialogVisible4 = true;
      this.circlePath = scope.row.point;
    },
    //删除
    del(scope) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            areaId: scope.row.areaId,
            modelId: scope.row.modelId,
            type: "delete",
          };
          this.$http.post("system/area/del", data).then((res) => {
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
    handleClose() {
        // this.$refs.fAdd.resetFields();
        // this.$refs.fAdd1.resetFields();

      let obj = this.relate;
      for (var i in obj) {
        obj[i] = "";
      }
      this.formAdd = [
        {
          lon: "",
          lat: "",
        },
      ];
      this.relate1 = {
        name: "",
        threshold: "",
        lon: "",
        lat: "",
        radius: "",
      };
      this.dialogVisible = false;
      this.dialogVisible3 = false;
      this.dialogVisible4 = false;
      this.dialogVisible5 = false;
    },
    //添加
    addok() {
      this.$refs.fAdd.validate((valid) => {
        if (!valid) return;
        this.loading = true;

        for (var i = 0; i < this.formAdd.length; i++) {
          this.list.push(this.formAdd[i]);
        }

        var params = {
          modelId: this.id,
          modelName: this.modelForm.modelName,
          areaName: this.relate.areaName,
          threshold: this.relate.threshold,
          points: "",
          point: this.list,
          tag: 2,
          type: "add",
        };

        let data = JSON.parse(JSON.stringify(params));
        this.$http
          .post("system/area/add", data)
          .then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "添加成功",
              });
              this.dialogVisible = false;
              this.clearForm();
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
      });
    },

    //添加
    addok1() {
      this.$refs.fAdd1.validate((valid) => {
        if (!valid) return;
        this.loading = true;

        var params = {
          modelId: this.id,
          modelName: this.modelForm.modelName,
          areaName: this.relate1.areaName,
          threshold: this.relate1.threshold,
          point: {
            center: {
              lon: this.relate1.lon,
              lat: this.relate1.lat,
            },
            radius: this.relate1.radius,
          },
          points: "",
          tag: 1,
          type: "add",
        };

        let data = JSON.parse(JSON.stringify(params));
        this.$http
          .post("system/area/add", data)
          .then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "添加成功",
              });
              this.dialogVisible5 = false;
              this.clearForm();
              this.getList();
            } else {
              this.$message({
                type: "warning",
                message: "添加失败",
              });
              this.dialogVisible5 = false;
            }
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    //清空
    clearForm() {
      let obj = this.relate;
      for (var i in obj) {
        obj[i] = "";
      }
    },
    //新增文本框增加按钮
    add(item) {
      this.formAdd.push(
        //增加就push进数组一个新值
        {
          lon: "",
          lat: "",
        }
      );
    },
    //新增文本框删除按钮
    delInput(index) {
      if (this.formAdd.length <= 1) {
        return false;
      }
      this.formAdd.splice(index, 1);
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
.map {
  width: 100%;
  height: 600px;
}
.el-form--inline .el-form-item {
  margin-right: 0 !important;
  padding: 0 10px;
  .el-select {
    display: block;
  }
}
</style>
