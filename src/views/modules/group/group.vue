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
          {{getTaskStatus(scope.row.state)}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
         <template slot-scope="scope">
          <div v-if="scope.row.state === 4">
              
              <el-button type="text" @click="viewHandle(scope.row)"
              >详情</el-button
            >
            </div>
          <div v-else>
            暂无数据
          </div>
        </template>
      </el-table-column>
    </el-table>
    
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
        <el-form-item label="群体/团伙ID" prop="devId">
          <el-input
            v-model="addForm.devId"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="群体/团伙类型" prop="devType">
            <el-select v-model="addForm.devType" placeholder="请选择">
                <el-option label="涉政" value="1"></el-option>
                <el-option label="涉恐" value="2"></el-option>
                <el-option label="涉毒" value="3"></el-option>
                <el-option label="宗教" value="4"></el-option>
                <el-option label="涉黄" value="5"></el-option>
                <el-option label="涉赌" value="6"></el-option>
                <el-option label="涉诈" value="7"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="设备imei" prop="devImei">
          <el-input
            v-model="addForm.devImei"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="设备imsi" prop="devImsi">
          <el-input
            v-model="addForm.devImsi"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="设备Mac" prop="devMac">
          <el-input
            v-model="addForm.devMac"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="设备号码" prop="devPhone">
          <el-input
            v-model="addForm.devPhone"
            placeholder="请输入"
            clearable
          ></el-input>
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
import mixinViewModule from "@/mixins/view-module";
import { mapState } from "vuex";
import { getDictLabel } from "@/utils";
import { getTaskStatusName } from "@/utils/taskStatus";
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
        req_type: 7,
        taskName: "",
        devId: "",
        devType: "",
        devImsi: "",
        devImei: "",
        devPhone: "",
        devMac: "",
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
        req_type: 7,
        task_id: null,
        startTime: null,
        overTime: null,
      },
      dataList: [],
      checkList: [],
      loading: false,
      formAddRules: {
        devId: [{ required: true, message: "请输入", trigger: "blur" }],
        devType: [{ required: true, message: "请选择", trigger: "blur" }],
        taskName: [{ required: true, message: "请选择", trigger: "blur" }]
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
    getTaskStatus(status){
      return getTaskStatusName(status)
    },
    //新增
    addok() {
      this.$refs.ruleFormAdd.validate((valid) => {
        if (!valid) return;
        this.loading = true;

        var params = {
            devId: this.addForm.devId,
            devType: this.addForm.devType,
            devImsi: this.addForm.devImsi,
            devImei: this.addForm.devImei,
            devMac: this.addForm.devMac,
            devPhone: this.addForm.devPhone,
            taskName:this.addForm.taskName
        };

        let data = JSON.parse(JSON.stringify(params));
        this.$http
          .post("/hadoop/task/groupAnalysis", data)
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
      this.$router.push({ name: "group_info", query: { task_id: row.taskId } });
    },
    handleClose(done) {
      this.$confirm("确认关闭并清除数据嘛？")
        .then((_) => {
          this.addForm = {};
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
