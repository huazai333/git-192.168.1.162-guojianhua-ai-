<template>
  <el-card>
    <!-- 查询区域 -->
    <div>
      <el-form :inline="true" :model="queryParameter" class="demo-form-inline">
        <!-- <el-form-item label="devId:">
          <el-input
            placeholder="请输入"
            v-model="queryParameter.devId"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="设备号码:">
          <el-input
            placeholder="请输入"
            v-model="queryParameter.devPhone"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备类型:">
          <el-select v-model="queryParameter.devType">
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
      <!-- <el-table-column label="devId" prop="devId" show-overflow-tooltip align="center"> </el-table-column> -->
      <el-table-column
        label="设备号码"
        prop="devPhone"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <!-- <el-table-column label=" 设备imsi" prop="devImsi"> </el-table-column>
      <el-table-column label=" 设备imei" prop="devImei"> </el-table-column> -->
      <el-table-column
        label=" 设备类型"
        prop="devType"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          {{ typeSizeFn(scope) }}
        </template>
      </el-table-column>
      <el-table-column
        label="设备型号"
        prop="devModel"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        label="设备添加时间"
        prop="devDate"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <!-- <el-table-column label="设备删除标记" prop="devDelete" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          {{ scope.row.devDelete == "1" ? "是" : "否" }}
        </template>
      </el-table-column> -->
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
        <el-form-item label="设备mac:" prop="devMac"
          ><el-input v-model="relate.devMac"></el-input>
        </el-form-item>
        <el-form-item label="设备imsi:" prop="devImsi"
          ><el-input v-model="relate.devImsi"></el-input>
        </el-form-item>
        <el-form-item label="设备imei:" prop="devImei">
          <el-input v-model="relate.devImei"></el-input>
        </el-form-item>
        <!-- <el-form-item label="设备型号:" prop="devModel"
          ><el-input v-model="relate.devModel"></el-input>
        </el-form-item> -->
        <el-form-item label="设备类型" prop="devType">
          <el-select v-model="relate.devType">
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
        <el-form-item label="设备mac:" prop="devMac"
          ><el-input v-model="relate.devMac"></el-input>
        </el-form-item>
        <el-form-item label="设备imsi:" prop="devImsi"
          ><el-input v-model="relate.devImsi"></el-input>
        </el-form-item>
        <el-form-item label="设备imei:" prop="devImei">
          <el-input v-model="relate.devImei"></el-input>
        </el-form-item>
        <!-- <el-form-item label="设备型号:" prop="devModel"
          ><el-input v-model="relate.devModel"></el-input>
        </el-form-item> -->

        <el-form-item label="设备类型" prop="devType">
          <el-select v-model="relate.devType">
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
        <el-button type="primary" @click="changeok()" v-loading="loading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <upload
      ref="studentUploadExcel"
      template-url="./template/equipment/重点设备导入表模板.xls"
      :upload-url="importUrl"
    ></upload>
  </el-card>
</template>

<script>
import upload from "@/components/public/upload-excel-or-img";
import { mapState } from "vuex";
export default {
  components: { upload },
  data() {
    const importUrl = "/system/keydevice/import/" + this.$store.state.user.id;
    return {
      importUrl: importUrl,
      dataSource: [], //列表数据
      queryParameter: {
        // devId: "",
        devPhone: "",
        devType: "",
      },
      //条件查询参数
      queryInfo: {
        page: 1,
        limit: 10,
      },
      total: 0,
      loading: false,
      relate: {
        devPhone: null,
        devMac: null,
        devImsi: null,
        devImei: null,
        devType: null,
        // devModel: null,
      }, //添加参数
      dialogVisible: false,
      dialogVisible2: false,
      formAddRules: {
        devPhone: [
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
          { required: true, message: "请输入值", trigger: "blur" },
        ],
        devImei: [
          {
            pattern: /^[\d]{15}(?:[\d]{2})?$/,
            message: "请输入正确的IMEI号码",
            trigger: "blur",
          },
          { required: true, message: "请输入值", trigger: "blur" },
        ],
        devMac: [
          {
            pattern: /^([0-9a-fA-F]{2})(([:][0-9a-fA-F]{2}){5})$/,
            message: "请输入正确的MAC号码",
            trigger: "blur",
          },
          { required: true, message: "请输入值", trigger: "blur" },
        ],
        devImsi: [
          {
            pattern: /^4600[0,1,2,3,5,6,7]\d{10}$/g,
            message: "请输入正确的IMSI号码",
            trigger: "blur",
          },
          { required: true, message: "请输入值", trigger: "blur" },
        ],
        // devModel: [{ required: true, message: "请输入值", trigger: "blur" }],
        devType: [{ required: true, message: "请输入值", trigger: "change" }],
      }, //非空验证
    };
  },
  computed: {
    ...mapState({ id: "id" }),
  },
  created() {
    this.getList();
    console.log(this.$store.state.user.id, 111111111111);
  },
  methods: {
    typeSizeFn(scope) {
      scope = scope.row.devType;
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
        url: "system/keydevice/list",
        params: { ...this.queryInfo },
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
        devId: "",
        devPhone: "",
        devType: "",
      };
      this.getList();
    },
    handleClose() {
      let obj = this.relate;
      for (var i in obj) {
        obj[i] = "";
      }
      this.dialogVisible = false;
      this.dialogVisible2 = false;
    },
    //修改
    modify(scope) {
      console.log(scope);
      this.dialogVisible2 = true;
      this.relate.devPhone = scope.row.devPhone;
      this.relate.devMac = scope.row.devMac;
      this.relate.devImsi = scope.row.devImsi;
      this.relate.devImei = scope.row.devImei;
      this.relate.devType = scope.row.devType;
      this.relate.devId = scope.row.devId;
      // this.clearForm()
    },
    //删除
    del(scope) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.post("system/keydevice/" + scope.row.devId).then((res) => {
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
    //添加
    addok() {
      this.$refs.fAdd.validate((valid) => {
        if (!valid) return;
        this.loading = true;
        let data = JSON.parse(JSON.stringify(this.relate));
        this.$http
          .post("system/keydevice/add", data)
          .then((res) => {
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: "添加成功",
              });
              this.dialogVisible = false;
              this.getList();
              this.clearForm();
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
          .post("system/keydevice/update", data)
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
        url: "system/keydevice/list",
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
      this.relate.devId = null;
      this.relate.devPhone = null;
      this.relate.devImsi = null;
      this.relate.devImei = null;
      this.relate.devModel = null;
      this.relate.addUnit = null;
      this.relate.addUser = null;
    },
  },
};
</script>

<style scoped>
</style>