<template>
  <el-card shadow="never" class="aui-card--fill">
    <el-form ref="ruleForm" :model="dataForm" label-width="80px" inline>
      <el-form-item label="任务ID" prop="task_id">
        <el-input
          v-model="dataForm.task_id"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="时间" prop="data">
        <el-date-picker
          v-model="data"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="resetForm('ruleForm')"
          >重置</el-button
        >
        <el-button type="primary" @click="dialogVisible = true">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="dataList" @selection-change="checkListHandle">
        <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column>
      <el-table-column
        prop="taskName"
        label="任务名称"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="userName"
        label="用户"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="reqTime"
        label="创建时间"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="state"
        label="任务状态"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          {{ getTaskStatus(scope.row.state) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.state === 4">
            <el-button type="text" @click="viewHandle(scope.row)"
              >详情</el-button
            >
          </div>
          <div v-else>暂无数据</div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
    background
      :current-page="page"
      :page-sizes="[6, 10, 20, 50, 100, 500]"
      :page-size="limit"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="pageSizeChangeHandle"
      @current-change="pageCurrentChangeHandle"
    >
    </el-pagination>

    <!-- 添加  -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="30%"
    >
      <el-form
        ref="ruleFormAdd"
        :model="addForm"
        :rules="formAddRules"
        label-width="120px"
      >
        <el-form-item label="任务名称" prop="taskName">
          <el-input
            v-model="addForm.taskName"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="热点Mac" prop="wifiMac">
          <el-input
            v-model="addForm.wifiMac"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="addData">
          <el-date-picker
            v-model="addForm.addData"
            value-format="timestamp"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addok">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { getTaskStatusName } from "@/utils/taskStatus";
import mixinViewModule from "@/mixins/view-module";
import { mapState } from "vuex";
import { getDictLabel } from "@/utils";
export default {
  computed: {
    ...mapState({ id: "id" }),
  },
  filters: {
    formatterDate(timeStr) {
      if (undefined !== timeStr && timeStr.length > 13) {
        return timeStr.substring(0, 13);
      }
      return timeStr;
    },
  },
  mixins: [mixinViewModule],

  data() {
    return {
      dialogVisible: false,
      data: [],
      addForm: {
        req_type: 2,
        wifiMac: "",
        time1: "",
        time2: "",
        addData: [],
      },
      mixinViewModuleOptions: {
        getDataListURL: "/hadoop/task/list",
        deleteURL: "/hadoop/task/del",
        getDataListIsPage: true,
        activatedIsNeed: false,
        deleteIsBatchKey: "taskId",
      },
      limit: 6,
      dataForm: {
        req_type: 2,
        task_id: "",
        startTime: "",
        overTime: "",
      },
      dataList: [],
      checkList: [],
      loading: false,
      formAddRules: {
        wifiMac: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            pattern: /^([A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}$/,
            message: "请输入正确的MAC号码",
            trigger: "blur",
          },
        ],
        taskName: [{ required: true, message: "请输入", trigger: "blur" }],
        addData: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  computed: {
    previewList() {
      return this.dataList.map((item) => {
        return this.$ImgServerUrl + item.photo;
      });
    },
  },
  methods: {
    getTaskStatus(status) {
      return getTaskStatusName(status);
    },
    //新增
    addok() {
      this.$refs.ruleFormAdd.validate((valid) => {
        if (!valid) return;
        this.loading = true;

        var wifi = {
          wifiMac: this.addForm.wifiMac,
        };
        this.addForm.time1 = this.addForm.addData[0] / 1000;
        this.addForm.time2 = this.addForm.addData[1] / 1000;

        var params = {
          wifi: JSON.parse(JSON.stringify(wifi)),
          time1: this.addForm.time1,
          time2: this.addForm.time2,
          taskName: this.addForm.taskName,
        };

        let data = JSON.parse(JSON.stringify(params));
        this.$http
          .post("/hadoop/task/wifiRelationAnalysis", data)
          .then(({ data: res }) => {
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: "添加成功",
              });
              this.dialogVisible = false;
              this.query();
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

    //取消申请
    cancelHandle(id) {
      this.$confirm("是否取消当前申请?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      }).then(() => {
        this.$http({ url: "/system/visitor/apply/" + id, method: "put" })
          .then(({ data: res }) => {
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              this.query();
              return;
            }
            return this.$message.error("操作失败");
          })
          .catch(() => {
            return this.$message.error("操作失败");
          });
      });
    },

    // 选择需要导出的人员
    checkListHandle(param) {
      this.checkList = param.map((item) => {
        return item.scWaid;
      });
    },
    // 导出
    exportHandle() {
      if (this.checkList.length === 0) {
        return this.$message.warning(`请勾选需要导出的数据`);
      }
      this.loading = true;
      this.$http
        .post(`/system/scworkersarchives/pageExport`, this.checkList, {
          responseType: "blob",
        })
        .then((res) => {
          const content = res.data;
          const blob = new Blob([content], {
            type: "application/vnd.ms-excel;charset=utf-8",
          });
          const fileName = "职工信息";
          if ("download" in document.createElement("a")) {
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href);
            document.body.removeChild(elink);
          } else {
            navigator.msSaveBlob(blob, fileName);
          }
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
    addStaff() {
      this.$refs["addOrUpdate"].init();
    },
    search() {
      if (this.data) {
        this.dataForm.startTime = this.data[0];
        this.dataForm.overTime = this.data[1];
      }
      this.task_id = this.dataForm.task_id;
      this.page = 1;
      this.query();
    },
    resetQuery() {
      this.page = 1;
      this.dataForm = {
        scWaname: "",
        scEmpno: "",
      };
      this.query();
    },
    viewHandle(row) {
      this.$router.push({ name: "wifi_info", query: { task_id: row.taskId,task_name:row.taskName } });
    },
    handleClose(done) {
      this.$confirm("确认关闭并清除数据嘛？")
        .then((_) => {
          this.addForm = {};
          this.$refs.ruleFormAdd.resetFields();
          done();
        })
        .catch((_) => {});
    },
    editHandle(row) {
      this.$refs["addOrUpdate"].init(row);
    },
    uploadExcel() {
      this.$refs["staffUploadExcel"].init();
    },
    uploadImg() {
      this.$refs["staffUploadImg"].init();
    },
    trackHandle(row) {
      this.$router.push({
        path: "/xwyl-track",
        query: {
          tid: row.scUwbid,
        },
      });
    },
    formatterType(row) {
      return getDictLabel("employType", row.scEmptype);
    },
    formatterSex(row) {
      return getDictLabel("gender", row.sex);
    },
  },
};
</script>
<style lang="scss" scoped>
// .el-table {
//   // .student-img {
//   //   vertical-align: top;
//   //   width: 53px;
//   //   height: 70px;
//   // }
// }
</style>
