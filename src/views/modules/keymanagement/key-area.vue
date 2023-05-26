<template>
  <el-card>
    <!-- 查询区域 -->
    <div>
      <el-form :inline="true" :model="queryParameter" class="demo-form-inline">
        <el-form-item label="区域名称:">
          <el-input
            placeholder="请输入"
            v-model="queryParameter.name"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchQuery()">查询</el-button>
          <el-button type="primary" @click="resetEvent()">重置</el-button>
          <el-button type="primary" @click="importHandle()">导入</el-button>
          <el-button type="primary" @click="dialogVisible = true"
            >新增多边形区域</el-button
          >
          <el-button type="primary" @click="dialogVisible5 = true"
            >新增圆形区域</el-button
          >
        </el-form-item>
      </el-form>
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
      </el-table-column>
    </el-table>

    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.page"
      :page-sizes="[5, 8, 10]"
      :page-size="queryInfo.limit"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>
    <!-- 添加弹框 -->
    <el-dialog
      title="添加"
      v-if="dialogVisible"
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
        <el-form-item label="区域名称:" prop="name">
          <el-input v-model="relate.name"></el-input>
        </el-form-item>
        <el-form-item label="阈值:" prop="threshold">
          <el-input v-model="relate.threshold"></el-input>
        </el-form-item>

        <el-button type="primary" @click="add" style="margin-bottom: 10px"
          >添加坐标</el-button
        >

        <div v-for="(item, index) in formAdd" :key="index">
          <el-form-item label="经度:" style="width: 40%; display: inline-block">
            <el-input v-model="item.lon"></el-input>
          </el-form-item>
          <el-form-item label="纬度:" style="width: 40%; display: inline-block">
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
      v-if="dialogVisible5"
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
        <el-form-item label="区域名称:" prop="name">
          <el-input v-model="relate1.name"></el-input>
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
          <el-input v-model="relate1.radius"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible5 = false">取 消</el-button>
        <el-button type="primary" v-loading="loading" @click="addok1()"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 修改 -->
    <!-- <el-dialog
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
        <el-form-item label="地点名称:" prop="name"
          ><el-input v-model="relate.name"></el-input>
        </el-form-item>
        <el-form-item label="经度:" prop="lon"
          ><el-input v-model="relate.lon"></el-input>
        </el-form-item>
        <el-form-item label="纬度:" prop="lat"
          ><el-input v-model="relate.lat"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" v-loading="loading" @click="changeok()"
          >确 定</el-button
        >
      </span>
    </el-dialog> -->
    <upload
      ref="studentUploadExcel"
      template-url="./template/equipment/重点APP导入表模板.xls"
      :upload-url="importUrl"
    ></upload>

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
        
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
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
  </el-card>
</template>

<script>
import upload from "@/components/public/upload-excel-or-img";
import { mapState } from "vuex";
export default {
  components: { upload },
  computed: {
    ...mapState({ id: "id" }),
  },
  data() {
    const importUrl = "/system/keyapp/import/" + this.$store.state.user.id;
    return {
      importUrl: importUrl,
      dataSource: [], //列表数据
      queryParameter: {
        name: "",
      }, //条件查询参数
      queryInfo: {
        page: 1,
        limit: 10,
      },
      total: 0,
      loading: false,
      relate: {
        name: null,
        threshold: null,
      }, //添加参数
      relate1: {
        name: null,
        threshold: null,
        lon: null,
        lat: null,
        radius: null,
      },
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      dialogVisible5: false,
      formAddRules: {
        name: [{ required: true, message: "请输入值", trigger: "blur" }],
        threshold: [
          { required: true, message: "请输入值", trigger: "blur" },
          {
            pattern: /^([1-9][0-9]*)$/,
            message: "请输入大于0的整数",
            trigger: "blur",
          },
        ],
      }, //非空验证
      formAddRules1: {
        name: [{ required: true, message: "请输入值", trigger: "blur" }],
        threshold: [
          { required: true, message: "请输入值", trigger: "blur" },
          {
            pattern: /^([1-9][0-9]*)$/,
            message: "请输入大于0的整数",
            trigger: "blur",
          },
        ],
        lon: [
          { required: true, message: "请输入值", trigger: "blur" },
          {
            pattern:
              /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180\.0{1,10})$/,
            message: "请输入正确的经度",
            trigger: "blur",
          },
        ],
        lat: [
          { required: true, message: "请输入值", trigger: "blur" },
          {
            pattern: /^[\-\+]?((0|([1-8]\d?))(\.\d{1,10})?|90(\.0{1,10})?)$/,
            message: "请输入正确的经纬度",
            trigger: "blur",
          },
        ],
        radius: [
          { required: true, message: "请输入值", trigger: "blur" },
          {
            pattern: /^([1-9][0-9]*)$/,
            message: "请输入大于0的整数",
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
    this.getList();
  },
  methods: {
    getList() {
      this.$http({
        url: "system/area/list",
        method: "get",
        params: {
          ...this.queryInfo,
        },
      }).then((res) => {
        this.dataSource = res.data.data.list;
        this.total = res.data.data.total
      });
    },
    //导入
    importHandle() {
      this.$refs["studentUploadExcel"].init();
    },
    //重置
    resetEvent() {
      this.queryParameter = {
        name: "",
      };
      this.getList();
    },
    // 详情
    viewHandle(scope) {
      this.dialogVisible3 = true;

      this.polygonPath = JSON.parse(scope.row.points);
    },
    viewHandle2(scope) {
      this.dialogVisible4 = true;
      this.circlePath = JSON.parse(scope.row.points);
    },
    //修改
    // modify(scope) {
    //   this.dialogVisible2 = true;
    //   this.relate.name = scope.row.name;
    //   this.relate.lon = scope.row.lon;
    //   this.relate.lat = scope.row.lat;
    // },
    //删除
    del(scope) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            id: scope.row.id,
            name: scope.row.name,
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
      this.dialogVisible2 = false;
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
          name: this.relate.name,
          threshold: this.relate.threshold,
          points: this.list,
          tag: 2,
          type: "add",
        };

        let data = JSON.parse(JSON.stringify(params));
        this.$http
          .post("system/area/add", data)
          .then((res) => {
            if (res.data.code == 200) {
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
          name: this.relate1.name,
          threshold: this.relate1.threshold,
          points: {
            center: {
              lon: this.relate1.lon,
              lat: this.relate1.lat,
            },
            radius: this.relate1.radius,
          },
          tag: 1,
          type: "add",
        };

        let data = JSON.parse(JSON.stringify(params));
        this.$http
          .post("system/area/add", data)
          .then((res) => {
            if (res.data.code == 200) {
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
    //确认修改
    changeok() {
      this.$refs.fAdd.validate((valid) => {
        if (!valid) return;
        this.loading = true;
        let data = JSON.parse(JSON.stringify(this.relate));
        this.$http
          .post("system/area/update", data)
          .then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "修改成功",
              });
              this.dialogVisible2 = false;
              this.getList();
              this.clearForm();
            } else {
              this.$message({
                type: "success",
                message: "修改失败",
              });
            }
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    searchQuery() {
      this.$http({
        url: "system/area/list",
        method: "get",
        params: {
          ...this.queryParameter,
        },
      }).then((res) => {
        this.dataSource = res.data.data.list;
        this.total = res.data.data.total
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

    handleSizeChange(size) {
      this.queryInfo.page = 1;
      this.queryInfo.limit = size;
      this.getList();
    },
    handleCurrentChange(num) {
      this.queryInfo.page = num;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 600px;
}
</style>