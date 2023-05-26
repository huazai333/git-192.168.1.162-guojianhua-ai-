<template>
  <el-card shadow="never" class="aui-card--fill">
    <el-form ref="ruleForm" :model="dataForm" label-width="80px" inline>
      <el-form-item label="任务名称" prop="task_id">
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

    <el-table :data="dataList">
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
        label-width="80px"
      >
        <el-form-item label="任务名称" prop="taskName">
          <el-input
            v-model="addForm.taskName"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>

        <div class="tit" style="margin-bottom: 5px">设备一：</div>
        <el-form-item label="手机号码：" prop="devPhone" class="half">
          <el-input
            v-model="addForm.devPhone"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="Imei" prop="devImei" class="half">
          <el-input
            v-model="addForm.devImei"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="Imsi" prop="devImsi" class="half">
          <el-input
            v-model="addForm.devImsi"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="Mac" prop="devMac" class="half">
          <el-input
            v-model="addForm.devMac"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>

        <div class="tit" style="margin-bottom: 5px">设备二：</div>
        <el-form-item label="手机号码：" prop="devPhone2" class="half">
          <el-input
            v-model="addForm.devPhone2"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="Imei" prop="devImei2" class="half">
          <el-input
            v-model="addForm.devImei2"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="Imsi" prop="devImsi2" class="half">
          <el-input
            v-model="addForm.devImsi2"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="Mac" prop="devMac2" class="half">
          <el-input
            v-model="addForm.devMac2"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="时间" prop="addData" class="time">
          <el-date-picker
            v-model="addForm.addData"
            value-format="yyyy-MM-dd HH:mm:ss"
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
import mixinViewModule from "@/mixins/view-module";
import { mapState } from "vuex";
import { getDictLabel } from "@/utils";
import { getTaskStatusName } from "@/utils/taskStatus";
export default {
  computed: {
    ...mapState({ id: "id" }),
  },
  mixins: [mixinViewModule],

  data() {
    return {
      dialogVisible: false,
      data: [],
      addForm: {
        req_type: 8,
        devKey: null,
        devImei: null,
        devImsi: null,
        devMac: null,
        devPhone: null,
        devKey2: null,
        devImei2: null,
        devImsi2: null,
        devMac2: null,
        devPhone2: null,
        time1: null,
        time2: null,
        addData: [],
        taskName: "",
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
        req_type: 8,
        task_id: null,
        startTime: null,
        overTime: null,
      },
      dataList: [],
      checkList: [],
      loading: false,
      formAddRules: {
        addData: [{ required: true, message: "请选择时间", trigger: "blur" }],
        taskName: [{ required: true, message: "请输入", trigger: "blur" }],
        devPhone: [
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        devImei: [
          {
            pattern: /^[\d]{15}(?:[\d]{2})?$/,
            message: "请输入正确的IMEI号码",
            trigger: "blur",
          },
        ],
        devMac: [
          {
            pattern: /^([0-9a-fA-F]{2})(([:][0-9a-fA-F]{2}){5})$/,
            message: "请输入正确的MAC号码",
            trigger: "blur",
          },
        ],
        devImsi: [
          {
            pattern: /^4600[0,1,2,3,5,6,7]\d{10}$/g,
            message: "请输入正确的IMSI号码",
            trigger: "blur",
          },
        ],
        devPhone2: [
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        devImei2: [
          {
            pattern: /^[\d]{15}(?:[\d]{2})?$/,
            message: "请输入正确的IMEI号码",
            trigger: "blur",
          },
        ],
        devMac2: [
          {
            pattern: /^([0-9a-fA-F]{2})(([:][0-9a-fA-F]{2}){5})$/,
            message: "请输入正确的MAC号码",
            trigger: "blur",
          },
        ],
        devImsi2: [
          {
            pattern: /^4600[0,1,2,3,5,6,7]\d{10}$/g,
            message: "请输入正确的IMSI号码",
            trigger: "blur",
          },
        ],
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

        if (
          (this.addForm.devPhone ||
            this.addForm.devImsi ||
            this.addForm.devImei ||
            this.addForm.devMac) &&
          (this.addForm.devPhone2 ||
            this.addForm.devImsi2 ||
            this.addForm.devImei2 ||
            this.addForm.devMac2)
        ) {
          this.loading = true;
          var device1 = {
            devKey: this.addForm.devKey,
            devImei: this.addForm.devImei,
            devImsi: this.addForm.devImsi,
            devMac: this.addForm.devMac,
            devPhone: this.addForm.devPhone,
          };
          var device2 = {
            devKey: this.addForm.devKey2,
            devImei: this.addForm.devImei2,
            devImsi: this.addForm.devImsi2,
            devMac: this.addForm.devMac2,
            devPhone: this.addForm.devPhone2,
          };
          this.addForm.time1 = this.addForm.addData[0];
          this.addForm.time2 = this.addForm.addData[1];

          console.log(this.addForm.time1);
          console.log(this.addForm.time2);
          var params = {
            taskName: this.addForm.taskName,
            device1: device1,
            device2: device2,
            req_type: 8,
            time1: this.addForm.time1,
            time2: this.addForm.time2,
          };

          let data = JSON.parse(JSON.stringify(params));
          this.$http
            .post("/hadoop/task/linkAnalysis", data)
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
        } else {
          this.$message({
            type: "warning",
            message: "两个设备的手机号码、IMEI、IMSI、MAC至少填入一项",
          });
          return;
        }
      });
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
      //   console.log(row);
      this.$router.push({ name: "linkInfo", query: { task_id: row.taskId,task_name:row.taskName }, });
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
  },
};
</script>

<style lang="scss" scoped>
.half {
  display: inline-block !important;
  width: 50% !important;
}
.time {
  .el-date-editor--datetimerange.el-input,
  .el-date-editor--datetimerange.el-input__inner {
    width: 100%;
  }
}
</style>