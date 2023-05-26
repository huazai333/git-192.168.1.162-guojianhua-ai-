<template>
  <el-card shadow="never" class="aui-card--fill">
    <el-form
      ref="ruleForm"
      :model="dataForm"
      label-width="100px"
      inline
      :rules="formAddRules"
    >
      <el-button type="primary" @click="add" style="margin-bottom: 10px"
        >添加设备</el-button
      >

      <div v-for="(item, index) in formAdd" :key="index">
        <el-form-item label="设备手机号码:">
          <el-form-item>
            <el-input v-model="item.devPhone"></el-input>
          </el-form-item>
          <el-form-item label="设备mac:">
            <el-input v-model="item.devKey"></el-input>
          </el-form-item>
          <el-form-item label="设备imei:">
            <el-input v-model="item.devImei"></el-input>
          </el-form-item>
          <el-form-item label="设备imsi:">
            <el-input v-model="item.devImsi"></el-input>
          </el-form-item>
          <el-button type="danger" @click="delInput(item, index)">-</el-button>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="时间" prop="addData">
          <el-date-picker
            v-model="dataForm.addData"
            value-format="timestamp"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button @click="search">查询</el-button>
          <el-button type="warning" @click="resetForm('ruleForm')"
            >重置</el-button
          >
        </el-form-item>
      </div>
    </el-form>

    <el-table :data="data" style="width: 100%">
      <el-table-column type="index" label="序号" align="center" width="50">
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="device_info.devPhone"
        label="设备手机号"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="device_info.devImei"
        label="设备IMEI"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="device_info.devImsi"
        label="设备IMSI"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="device_info.devMac"
        label="设备Mac"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="trajectory"
        label="轨迹详情"
      >
        <template slot-scope="scope">
          <div>
            <el-button
              type="text"
              @click="
                detail = true;
                getRule(scope);
              "
              >查看</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="轨迹详情" :visible.sync="detail" width="60%">
      <el-table
        :data="
          trajectory.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="50">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="位置经纬度"
        >
          <template slot-scope="scope">
            {{ scope.row.lng + "," + scope.row.lat }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="itime"
          label="时间"
          sortable
          :formatter="dataFormat"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="trajectory.length"
        :page-size="pageSize"
        @current-change="currentChange"
        @size-change="handleSizeChange"
        :page-sizes="[10]"
        :current-page="currentPage"
      >
      </el-pagination>
    </el-dialog>
  </el-card>
</template>

<script>
import { Message } from "element-ui";

export default {
  filters: {
    formatterDate(timeStr) {
      if (undefined !== timeStr && timeStr.length > 10) {
        return timeStr.substring(0, 10);
      }
      return timeStr;
    },
    filterLabel(val, type) {
      return getDictLabel(type, val);
    },
  },
  components: {},
  data() {
    return {
      data: [],
      detail: false,
      trajectory: [],
      pageSize: 10,
      currentPage: 1,

      dataForm: {
        time1: "",
        time2: "",
        addData: [],
      },
      list: [],
      formAdd: [
        {
          devPhone: "",
          devMac: "",
          devImei: "865509049459070",
          devImsi: "",
        },
      ],
      formAddRules: {
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
        addData: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  computed: {},
  methods: {
    currentChange(e) {
      this.currentPage = e;
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
    },
    getRule(item) {
      this.trajectory = item.row.trajectory;
    },
    search() {
      this.getDeviceInfo();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // 当存在 el-date-picker && （ type="daterange"||type="datetimerange"）时，将变量定义为daterange
      if (this.daterange) {
        this.daterange = null;
      }
      this.dataForm = {};
      this.formAdd = [
        {
          devPhone: "",
          devMac: "",
          devImei: "",
          devImsi: "",
        },
      ];
    },
    // 时间戳转换时间
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    dataFormat: function (row) {
      let date = row.itime;
      if (date) {
        let time = new Date(date * 1000);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return (
          y +
          "-" +
          this.add0(m) +
          "-" +
          this.add0(d) +
          " " +
          this.add0(h) +
          ":" +
          this.add0(mm) +
          ":" +
          this.add0(s)
        );
      }
      return "";
    },
    getDeviceInfo() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return;
        this.list = [];
        for (var i = 0; i < this.formAdd.length; i++) {
          this.list.push(this.formAdd[i]);
        }

        this.dataForm.time1 = this.dataForm.addData[0] / 1000;
        this.dataForm.time2 = this.dataForm.addData[1] / 1000;

        var params = {
          device: this.list,
          time1: this.dataForm.time1,
          time2: this.dataForm.time2,
        };

        let data = JSON.parse(JSON.stringify(params));
        this.$http
          .post("/hadoop/task/crowdTrajectory", data)
          .then(({ data: res }) => {
            if (res.code == 0) {
              console.log(res);
              this.data = res.data.data.result;
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
    //新增文本框增加按钮
    add(item) {
      this.formAdd.push(
        //增加就push进数组一个新值
        {
          devPhone: "",
          devMac: "",
          devImei: "",
          devImsi: "",
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
.el-table {
  .student-img {
    vertical-align: top;
    width: 53px;
    height: 70px;
  }
}
</style>


