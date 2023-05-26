<template>
  <el-card>
    <!-- 查询区域 -->
    <div>
      <el-form :inline="true" :model="queryParameter" class="demo-form-inline">
        <el-form-item label="热点名称:">
          <el-input
            placeholder="请输入"
            v-model="queryParameter.ssid"
          ></el-input>
        </el-form-item>
        <el-form-item label="热点Mac:">
          <el-input
            placeholder="请输入"
            v-model="queryParameter.mac"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchQuery()">查询</el-button>
          <el-button type="primary" @click="resetEvent()">重置</el-button>
          <el-button type="success" @click="dialogVisible = true"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- table区域 -->
    <div>
      <el-table :data="dataSource" style="width: 100%">
        <el-table-column prop="ssid" label="热点名称"> </el-table-column>
        <el-table-column prop="mac" label="热点Mac"> </el-table-column>
        <el-table-column prop="address" label="热点地址"> </el-table-column>
        <el-table-column prop="controlDate" label="布控时间"> </el-table-column>
        <el-table-column prop="ssidType" label="报警类型">
          <template slot-scope="scope">{{
            scope.row.ssidType == "1" ? "扫描连接报警" : "异常设备报警"
          }}</template>
        </el-table-column>
        <el-table-column prop="state" label="是否撤控">
          <template slot-scope="scope">{{
            scope.row.state == "0" ? "否" : "是"
          }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="详情"
              placement="top-start"
            >
              <el-button
                size="mini"
                type="success"
                icon="el-icon-folder"
                @click="details(scope)"
                circle
              ></el-button>
            </el-tooltip>
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
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="del(scope)"
                circle
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.page"
        :page-sizes="[5, 8, 10]"
        :page-size="queryInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 新增弹框 -->
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="40%"
    >
      <el-form
        label-width="120px"
        :rules="formAddRules"
        ref="fAdd"
        :model="bkAdd"
      >
        <el-form-item label="预警类型:" prop="isAppear">
          <el-select v-model="bkAdd.isAppear">
            <el-option label="扫描连接报警" :value="1"></el-option>
            <el-option label="异常设备报警" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="热点名称:" prop="bkName"
          ><el-input placeholder="请输入内容" v-model="bkAdd.bkName"></el-input>
        </el-form-item>

        <el-form-item label="布控原因:" prop="controlReason"
          ><el-input
            placeholder="请输入内容"
            v-model="bkAdd.controlReason"
          ></el-input>
        </el-form-item>
        <el-form-item label="布控设备描述:" prop="devDescribe">
          <el-input type="textarea" v-model="bkAdd.devDescribe"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addok" v-loading="loading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 修改弹框 -->
    <el-dialog
      title="修改"
      :visible.sync="dialogVisible2"
      :before-close="handleClose"
      width="40%"
    >
      <el-form
        label-width="120px"
        :model="bkAdd"
        :rules="formAddRules"
        ref="fAdd"
      >
        <div v-for="(item, index) in list" :key="index + 1" class="jw">
          <el-form-item label="数据类型:" prop="type">
            <el-input placeholder="请输入内容" v-model="item.type"></el-input>
            值: <el-input v-model="item.value" clearable></el-input>
            <el-button
              type="danger"
              @click="delInput2(index)"
              style="margin-left: 5%"
              >-</el-button
            >
          </el-form-item>
        </div>
        <el-button type="primary" @click="changeAdd">+</el-button>
        <el-form-item label="是否预警:" prop="isAppear">
          <el-select v-model="bkAdd.isAppear">
            <el-option label="是" :value="1">是</el-option>
            <el-option label="否" :value="0">否</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="布控人员姓名:" prop="bkName"
          ><el-input placeholder="请输入内容" v-model="bkAdd.bkName"></el-input>
        </el-form-item>
        <el-form-item label="布控人身份证:" prop="idCard"
          ><el-input placeholder="请输入内容" v-model="bkAdd.idCard"></el-input>
        </el-form-item>
        <el-form-item label="常住地址:" prop="idCard"
          ><el-input
            placeholder="请输入内容"
            v-model="bkAdd.bkAddress"
          ></el-input>
        </el-form-item>
        <el-form-item label="布控原因:" prop="controlReason"
          ><el-input
            placeholder="请输入内容"
            v-model="bkAdd.controlReason"
          ></el-input>
        </el-form-item>
        <el-form-item label="布控设备描述:" prop="devDescribe">
          <el-input type="textarea" v-model="bkAdd.devDescribe"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="changeok()" v-loading="loading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 详情弹框 -->
    <el-dialog title="详情" :visible.sync="dialogVisible3" width="50%">
      <el-descriptions
        v-for="(item, index) of dataSource1"
        :key="index"
        :column="2"
        border
      >
        <el-descriptions-item label="是否撤控:" v-if="item.isState == 1"
          >是</el-descriptions-item
        >
        <el-descriptions-item label="是否撤控:" v-if="item.isState == 0"
          >否</el-descriptions-item
        >
        <el-descriptions-item label="是否出现预警:" v-if="item.isAppear == 1"
          >是</el-descriptions-item
        >
        <el-descriptions-item label="是否出现预警:" v-if="item.isAppear == 0"
          >否</el-descriptions-item
        >
        <el-descriptions-item label="撤控人:"> </el-descriptions-item>
        <el-descriptions-item label="布控设备描述:"
          >{{ item.devDescribe }}
        </el-descriptions-item>
        <el-descriptions-item label="布控人员常驻地址:"
          >{{ item.bkAddress }}
        </el-descriptions-item>
        <el-descriptions-item label="布控原因:"
          >{{ item.controlReason }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions
        v-for="(item, index) in dataSource2"
        :key="index + 1"
        :column="2"
        border
      >
        <el-descriptions-item :label="item.type">{{
          item.type
        }}</el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible3 = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 批量上传信息 -->
    <upload
      ref="studentUploadExcel"
      template-url="./template/equipment/设备布控表导入模板.xls"
      :upload-url="importUrl"
    ></upload>
  </el-card>
</template>

<script>
import { mapState } from "vuex";
import { getBkssid } from "@/api/api.js";
import test from "../relationship-map/test.vue";
import upload from "@/components/public/upload-excel-or-img";
export default {
  components: { test, upload },
  data() {
    const valTowValue = (rule, value, callback) => {
      if (value === "" || value === null) {
        callback(new Error("请选择"));
      } else if (
        this.formAddRules.type === "" ||
        this.formAddRules.value === null
      ) {
        callback(new Error());
      } else {
        callback();
      }
    };
    const importUrl = "/system/per/import/" + this.$store.state.user.id;
    return {
      importUrl: importUrl,
      loading: false,
      list: [],
      data: [],
      dataSource: [], //表格数据
      dataSource1: [], //详情表数据
      dataSource2: [], //详情数据类型
      queryParameter: {
        ssid: null,
        mac: null,
      }, //查询参数
      total: 0, //总页数
      queryInfo: {
        page: 1,
        limit: 10,
      },
      //分页
      dialogVisible: false, //新增弹框
      dialogVisible2: false, //修改弹框
      dialogVisible3: false, //详情弹框
      formAdd: [
        {
          type: null,
          value: null,
        },
      ], //新增参数
      formChange: [
        {
          type: null,
          value: null,
        },
      ], //数据类型修改参数
      bkAdd: {
        isAppear: null,
        bkName: null,
        idCard: null,
        addUserid: null,
        controlReason: null,
        bkAddress: null,
        devDescribe: null,
      },
      formAddRules: {
        type: [
          {
            required: true,
            validator: valTowValue,
            message: "请输入数据类型",
            trigger: "blur",
          },
        ],
        value: [{ required: true, message: "请输入值", trigger: "blur" }],
        isAppear: [
          { required: true, message: "请选择是否预警", trigger: "change" },
        ],
        bkName: [
          { required: true, message: "请输入布控人员姓名", trigger: "blur" },
        ],
        idCard: [
          { required: true, message: "请输入布控人身份证", trigger: "blur" },
        ],
        addUserid: [
          { required: true, message: "请输入布控人id", trigger: "blur" },
        ],

        controlReason: [
          { required: true, message: "请输入布控原因", trigger: "blur" },
        ],
        devDescribe: [
          { required: true, message: "请输入布控设备描述", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapState({ id: "id" }),
  },
  created() {
    this.getList(this.queryInfo);
  },
  methods: {
    //获取列表数据
    async getList() {
      const { data: res } = await getBkssid(this.queryInfo);
      if (res.code == 0) {
        this.dataSource = res.data.list;
        this.total = res.data.total;
      }
    },
    //查询
    searchQuery() {
      var params = {
        mac: this.queryParameter.mac,
        ssid: this.queryParameter.ssid,
      };
      this.$http({
        url: "/system/scssidinfo",
        params: {
          ...params,
        },
      }).then((res) => {
        if (res.data.code == 0) {
          console.log(res.data);
          this.dataSource = res.data.data.list;
        }
      });
    },
    //重置
    resetEvent() {
      (this.data = []), this.getList();
    },
    handleClose() {
      let obj = this.bkAdd;
      for (var i in obj) {
        obj[i] = "";
      }
      this.list = [];
      this.dialogVisible = false;
      this.dialogVisible2 = false;
    },
    //新增
    addok() {
      this.$refs.fAdd.validate((valid) => {
        if (!valid) return;
        this.loading = true;
        for (var i = 0; i < this.formAdd.length; i++) {
          this.list.push(this.formAdd[i]);
        }
        var params = {
          isAppear: this.bkAdd.isAppear,
          bkName: this.bkAdd.bkName,
          idCard: this.bkAdd.idCard,
          addUserid: this.$store.state.user.id,
          controlDate: this.bkAdd.controlDate,
          controlReason: this.bkAdd.controlReason,
          devDescribe: this.bkAdd.devDescribe,
          bkAddress: this.bkAdd.bkAddress,
          list: this.list,
        };
        let data = JSON.parse(JSON.stringify(params));
        this.$http
          .post("/system/per/add", data)
          .then(({ data: res }) => {
            if (res.code == 0) {
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
              this.clearForm();
            }
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    add(item) {
      this.formAdd.push(
        //增加就push进数组一个新值
        {
          type: "",
          value: "",
        }
      );
    },
    changeAdd() {
      this.list.push(
        //增加就push进数组一个新值
        {
          type: "",
          value: "",
        }
      );
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
            .post(
              "/system/per/del?devId=" +
                scope.row.devId +
                "&revokeUserid=" +
                this.$store.state.user.id
            )
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
    //新增文本框删除按钮
    delInput(index) {
      if (this.formAdd.length <= 1) {
        return false;
      }
      this.formAdd.splice(index, 1);
    },
    //修改文本框删除按钮
    delInput2(index) {
      if (this.list.length <= 1) {
        return false;
      }
      this.list.splice(index, 1);
    },
    //修改传值scope
    modify(scope) {
      console.log(scope.row.list);
      this.dialogVisible2 = true;
      for (var i = 0; i < scope.row.list.length; i++) {
        this.list.push(scope.row.list[i]);
      }
      this.bkAdd.isAppear = scope.row.isAppear;
      this.bkAdd.bkName = scope.row.bkName;
      this.bkAdd.idCard = scope.row.idCard;
      this.bkAdd.controlDate = scope.row.controlDate;
      this.bkAdd.controlReason = scope.row.controlReason;
      this.bkAdd.devDescribe = scope.row.devDescribe;
      this.bkAdd.devId = scope.row.devId;
      this.bkAdd.bkAddress = scope.row.bkAddress;
      this.bkAdd.addUserid = this.$store.state.user.id;
    },
    //确认修改
    changeok() {
      this.$refs.fAdd.validate((valid) => {
        if (!valid) return;
        this.loading = true;
        var params = {
          isAppear: this.bkAdd.isAppear,
          bkName: this.bkAdd.bkName,
          idCard: this.bkAdd.idCard,
          addUserid: this.$store.state.user.id,
          controlDate: this.bkAdd.controlDate,
          controlReason: this.bkAdd.controlReason,
          devDescribe: this.bkAdd.devDescribe,
          devId: this.bkAdd.devId,
          list: this.list,
        };

        let data = JSON.parse(JSON.stringify(params));
        this.$http
          .post("/system/per/update", data)
          .then(({ data: res }) => {
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: "修改成功",
              });
              this.clearForm();
              this.getList();

              this.list = [];
              this.dialogVisible2 = false;
            } else {
              this.$message({
                type: "info",
                message: "修改失败",
              });
              this.list = [];
              this.clearForm();
            }
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    //详情
    details(scope) {
      this.$http("/system/scssidinfo/" + scope.row.devId).then((res) => {
        if (res.data.code == 0) {
          this.dataSource1 = res.data.data.list;
          this.dataSource2 = this.dataSource1[0].list;
          this.dialogVisible3 = true;
        }
      });
    },
    //导入
    importHandle() {
      this.$refs["studentUploadExcel"].init();
    },
    //清空表单数据
    clearForm() {
      let obj = this.bkAdd;
      for (var i in obj) {
        obj[i] = "";
      }
      this.list = [];
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

<style scoped>
.jw .el-input {
  width: 180px;
}
</style>
