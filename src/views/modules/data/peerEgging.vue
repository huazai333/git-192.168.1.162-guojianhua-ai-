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
      <!-- <el-table-column prop="req_type" label="请求类型" :formatter="formatterSex" show-overflow-tooltip align="center"></el-table-column> -->

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
      width="40%"
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

        <el-button type="primary" @click="add" style="margin-bottom: 10px"
          >添加设备</el-button
        >
        <div v-for="(item, index) in formAdd" :key="index" class="jw">
          <el-form-item
            label="设备手机号码"
            prop="devPhone"
            style="width: 50%; display: inline-block"
          >
            <el-input
              v-model="item.devPhone"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="设备imei"
            prop="devImei"
            style="width: 50%; display: inline-block"
          >
            <el-input
              v-model="item.devImei"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="设备imsi"
            prop="devImsi"
            style="width: 50%; display: inline-block"
          >
            <el-input
              v-model="item.devImsi"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="设备Mac"
            prop="devMac"
            style="width: 50%; display: inline-block"
          >
            <el-input
              v-model="item.devMac"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>

          <el-button
            type="danger"
            @click="delInput(item, index)"
            style="margin-left: 5%"
            >删除</el-button
          >
        </div>

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
      list: [],
      formAdd: [
        {
          devImsi: "",
          devImei: "",
          devMac: "",
          devPhone: "",
        },
      ],
      addForm: {
        req_type: 15,
        time1: "",
        time2: "",
        taskName: [],
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
        req_type: 15,
        task_id: "",
        startTime: "",
        overTime: "",
      },
      dataList: [],
      checkList: [],
      loading: false,
      formAddRules: {
        taskName: [{ required: true, message: "请输入", trigger: "blur" }],
        addData: [{ required: true, message: "请输入", trigger: "blur" }],
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

        for (var i = 0; i < this.formAdd.length; i++) {
          this.list.push(this.formAdd[i]);
        }

        this.addForm.time1 = this.addForm.addData[0] / 1000;
        this.addForm.time2 = this.addForm.addData[1] / 1000;

        var params = {
          taskName: this.addForm.taskName,
          device: this.list,
          time1: this.addForm.time1,
          time2: this.addForm.time2,
        };

        let data = JSON.parse(JSON.stringify(params));
        this.$http
          .post("/hadoop/task/reverseSearchAccompany", data)
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
      this.$router.push({
        name: "peerEgging_info",
        query: { task_id: row.taskId,task_name:row.taskName },
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭并清除数据嘛？")
        .then((_) => {
          this.addForm = {};
          this.$refs.ruleFormAdd.resetFields();
          this.formAdd = [
            {
              devImsi: "",
              devImei: "",
              devMac: "",
              devPhone: "",
            },
          ];
          done();
        })
        .catch((_) => {});
    },
    //新增文本框增加按钮
    add(item) {
      this.formAdd.push(
        //增加就push进数组一个新值
        {
          devImsi: "",
          devImei: "",
          devMac: "",
          devPhone: "",
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
<style lang="scss" scoped>
// .el-table {
//   // .student-img {
//   //   vertical-align: top;
//   //   width: 53px;
//   //   height: 70px;
//   // }
// }
</style>
