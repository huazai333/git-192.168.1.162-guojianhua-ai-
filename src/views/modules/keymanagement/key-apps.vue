<template>
  <el-card>
    <!-- 查询区域 -->
    <div>
      <el-form :inline="true" :model="queryParameter" class="demo-form-inline">
        <!-- <el-form-item label="appId:">
          <el-input
            placeholder="请输入"
            v-model="queryParameter.appId"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="app名称:">
          <el-input
            placeholder="请输入"
            v-model="queryParameter.appName"
          ></el-input>
        </el-form-item>
        <el-form-item label="app类型:">
          <el-select v-model="queryParameter.appType">
            <el-option label="涉恐" value="1"></el-option>
            <el-option label="涉赌" value="2"></el-option>
            <el-option label="涉政" value="3"></el-option>
            <el-option label="涉诈" value="4"></el-option>
            <el-option label="宗教" value="5"></el-option>
            <el-option label="涉毒" value="6"></el-option>
            <el-option label="涉黄" value="7"></el-option>
          </el-select>
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
        label="app名称"
        prop="appName"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column label="app包名" show-overflow-tooltip prop="appPackage">
      </el-table-column>
      <el-table-column
        label="app类型"
        prop="appType"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          {{ typeSizeFn(scope) }}
        </template>
      </el-table-column>
      <el-table-column
        label="app添加时间"
        prop="appDate"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="addUnit"
        label="添加单位"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="addUser"
        label="添加人员"
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
      v-if="dialogVisible"
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
        <el-form-item label="app名称:" prop="appName"
          ><el-input v-model="relate.appName"></el-input>
        </el-form-item>
        <el-form-item label="app包名:" prop="appPackage"
          ><el-input v-model="relate.appPackage"></el-input>
        </el-form-item>
        <el-form-item label="app类型" prop="appType">
          <el-select v-model="relate.appType">
            <el-option label="涉恐" value="1"></el-option>
            <el-option label="涉赌" value="2"></el-option>
            <el-option label="涉政" value="3"></el-option>
            <el-option label="涉诈" value="4"></el-option>
            <el-option label="宗教" value="5"></el-option>
            <el-option label="涉毒" value="6"></el-option>
            <el-option label="涉黄" value="7"></el-option>
          </el-select>
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
      v-if="dialogVisible2"
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
        <el-form-item label="appName:" prop="appName"
          ><el-input v-model="relate.appName"></el-input>
        </el-form-item>
        <el-form-item label="app包名:" prop="appPackage"
          ><el-input v-model="relate.appPackage"></el-input>
        </el-form-item>
        <el-form-item label="app类型" prop="appType">
          <el-select v-model="relate.appType">
            <el-option label="涉恐" :value="1"></el-option>
            <el-option label="涉赌" :value="2"></el-option>
            <el-option label="涉政" :value="3"></el-option>
            <el-option label="涉诈" :value="4"></el-option>
            <el-option label="宗教" :value="5"></el-option>
            <el-option label="涉毒" :value="6"></el-option>
            <el-option label="涉黄" :value="7"></el-option>
          </el-select>
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
        appId: "",
        appName: "",
        appType: "",
      }, //条件查询参数
      queryInfo: {
        page: 1,
        limit: 10,
      },
      loading: false,
      total: 0,
      relate: {
        appName: null,
        appPackage: null,
        appType: null,
      }, //添加参数
      dialogVisible: false,
      dialogVisible2: false,
      formAddRules: {
        appName: [{ required: true, message: "请输入值", trigger: "blur" }],
        appPackage: [
          { required: true, message: "请输入值", trigger: "blur" },
          {
            pattern: /^([a-zA-Z_][a-zA-Z0-9_]*)+([.][a-zA-Z_][a-zA-Z0-9_]*)+$/,
            message: "请输入正确的包名",
            trigger: "blur",
          },
        ],
        appType: [{ required: true, message: "请输入值", trigger: "change" }],
      }, //非空验证
    };
  },
  created() {
    this.getList();
  },
  methods: {
    typeSizeFn(scope) {
      scope = scope.row.appType;
      return scope == 1
        ? "涉恐"
        : scope == 2
        ? "涉赌"
        : scope == 3
        ? "涉政"
        : scope == 4
        ? "涉诈"
        : scope == 5
        ? "宗教"
        : scope == 6
        ? "涉毒"
        : scope == 7
        ? "涉黄"
        : "其他";
    },
    getList() {
      this.$http({
        url: "system/keyapp/list",
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
        appId: "",
        appName: "",
        appType: "",
      };
      this.getList();
    },
    //修改
    modify(scope) {
      this.dialogVisible2 = true;
      this.relate.appName = scope.row.appName;
      this.relate.appPackage = scope.row.appPackage;
      this.relate.appType = scope.row.appType;
    },
    //删除
    del(scope) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .post("system/keyapp/del/" + scope.row.appId)
            .then((res) => {
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
          .post("system/keyapp/add", data)
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
          .post("system/keyapp/update", data)
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
        url: "system/keyapp/list",
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