<template>
  <el-card>
    <!-- 查询区域 -->
    <div>
      <el-form :inline="true" :model="queryParameter" class="demo-form-inline">
        <el-form-item label="地点名称:">
          <el-input
            placeholder="请输入"
            v-model="queryParameter.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="经度:">
          <el-input
            placeholder="请输入"
            v-model="queryParameter.lng"
          ></el-input>
        </el-form-item>
        <el-form-item label="纬度:">
          <el-input
            placeholder="请输入"
            v-model="queryParameter.lat"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchQuery()">查询</el-button>
          <el-button type="primary" @click="resetEvent()">重置</el-button>
          <el-button type="primary" @click="importHandle()">导入</el-button>
          <el-button type="primary" @click="dialogVisible = true"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- tabel区域 -->
    <el-table :data="dataSource" style="width: 100%">
      <el-table-column
        label="地点名称"
        prop="name"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="经度"
        prop="lng"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="纬度"
        prop="lat"
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改" placement="top">
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
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
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
        <el-form-item label="经度:" prop="lng"
          ><el-input v-model="relate.lng"></el-input>
        </el-form-item>
        <el-form-item label="纬度:" prop="lat"
          ><el-input v-model="relate.lat"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-loading="loading" @click="addok()"
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
        <el-form-item label="地点名称:" prop="name"
          ><el-input v-model="relate.name"></el-input>
        </el-form-item>
        <el-form-item label="经度:" prop="lng"
          ><el-input v-model="relate.lng"></el-input>
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
    </el-dialog>
    <upload
      ref="studentUploadExcel"
      template-url="./template/equipment/重点APP导入表模板.xls"
      :upload-url="importUrl"
    ></upload>
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
        lng: "",
        lat: "",
      }, //条件查询参数
      queryInfo: {
        page: 1,
        limit: 10,
      },
      loading: false,
      total: 0,
      relate: {
        name: null,
        lng: null,
        lat: null,
      }, //添加参数
      dialogVisible: false,
      dialogVisible2: false,
      formAddRules: {
        name: [{ required: true, message: "请输入值", trigger: "blur" }],
        lng: [
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
      }, //非空验证
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http({
        url: "system/coordinate/list",
        method: "get",
        params: {
          ...this.queryInfo,
        },
      }).then((res) => {
        if (res.data.code == 0) {
          this.dataSource = res.data.data.list;
          this.total = res.data.data.total;
        }
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
        lng: "",
        lat: "",
      };
      this.getList();
    },
    //修改
    modify(scope) {
      this.dialogVisible2 = true;
      this.relate.name = scope.row.name;
      this.relate.lng = scope.row.lng;
      this.relate.lat = scope.row.lat;
    },
    //删除
    del(scope) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = JSON.parse(JSON.stringify(scope.row));
          this.$http.post("system/coordinate/del", data).then((res) => {
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
      this.dialogVisible = false;
      this.dialogVisible2 = false;
    },
    //添加
    addok() {
      this.$refs.fAdd.validate((valid) => {
        if (!valid) return;
        this.loading = true;
        let data = JSON.parse(JSON.stringify(this.relate));
        this.$http
          .post("system/coordinate/add", data)
          .then((res) => {
            if (res.status == 200) {
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
          .post("system/coordinate/update", data)
          .then((res) => {
            if (res.status == 200) {
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
        url: "system/coordinate/list",
        method: "get",
        params: {
          ...this.queryParameter,
        },
      }).then((res) => {
        if (res.data.code == 0) {
          this.dataSource = res.data.data.list;
        } else {
          this.$message({
            type: "info",
            message: "查询失败",
          });
        }
      });
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
    //清空
    clearForm() {
      let obj = this.relate;
      for (var i in obj) {
        obj[i] = "";
      }
    },
  },
};
</script>

<style scoped>
</style>