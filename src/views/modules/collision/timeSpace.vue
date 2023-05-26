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
        <el-button type="primary" @click="add" style="margin-bottom: 10px"
          >添加地点</el-button
        >
        <div v-for="(item, index) in formAdd" :key="index">
          <el-form-item
            label="地点名称:"
            style="width: 50%; display: inline-block"
          >
            <el-input v-model="item.name"></el-input>
          </el-form-item>
          <el-form-item
            label="范围(m):"
            style="width: 50%; display: inline-block"
          >
            <el-input v-model="item.radius"></el-input>
          </el-form-item>
          <el-form-item label="经度:" style="width: 50%; display: inline-block">
            <el-input v-model="item.lon"></el-input>
          </el-form-item>
          <el-form-item label="纬度:" style="width: 50%; display: inline-block">
            <el-input v-model="item.lat"></el-input>
          </el-form-item>
          <el-form-item label="时间" prop="data">
            <el-date-picker
              v-model="item.data"
              value-format="timestamp"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker
            ><el-button
              type="danger"
              @click="delInput(item, index)"
              style="margin-left: 5px"
              >-</el-button
            >
          </el-form-item>
        </div>
        <el-form-item label="出现次数：" prop="value">
          <el-input
            v-model="addForm.value"
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
      mixinViewModuleOptions: {
        getDataListURL: "/hadoop/task/list",
        deleteURL: "/hadoop/task/del",
        getDataListIsPage: true,
        activatedIsNeed: false,
        deleteIsBatchKey: "taskId",
      },
      limit: 6,
      dataForm: {
        req_type: 12,
        task_id: null,
        startTime: null,
        overTime: null,
      },
      dataList: [],
      loading: false,
      formAddRules: {
        taskName: [{ required: true, message: "请输入", trigger: "blur" }],
        value: [{ required: true, message: "请输入", trigger: "blur" }],
      },

      addForm: {
        req_type: 12,
        taskName: [],
        value: "",
      },
      list: [],
      formAdd: [
        {
          name: "",
          lon: "",
          lat: "",
          radius: "",
          data: [],
          starttime: "",
          endtime: "",
        },
      ],
    };
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
            this.formAdd[i].starttime = this.formAdd[i].data[0] / 1000;
            this.formAdd[i].endtime = this.formAdd[i].data[1] / 1000;

            this.list.push(this.formAdd[i]);
        }
        var params = {
          taskName: this.addForm.taskName,
          areas: this.list,
          value: this.addForm.value,
        };

        let data = JSON.parse(JSON.stringify(params));
        this.$http
          .post("/hadoop/task/spatiotemporalCollision", data)
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
        name: "timeSpace_info",
        query: { task_id: row.taskId,task_name:row.taskName },
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭并清除数据嘛？")
        .then((_) => {
          this.addForm = {};
          this.$refs.ruleFormAdd.resetFields();
          this.formAdd=[
        {
          name: "",
          lon: "",
          lat: "",
          radius: "",
          data: [],
          starttime: "",
          endtime: "",
        },
      ],
          done();
        })
        .catch((_) => {});
    },
    //新增文本框增加按钮
    add(item) {
      this.formAdd.push(
        //增加就push进数组一个新值
        {
         name: "",
          lon: "",
          lat: "",
          radius: "",
          data: [],
          starttime: "",
          endtime: "",
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
