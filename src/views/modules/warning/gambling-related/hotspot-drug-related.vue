<template>
  <el-card shadow="never" class="aui-card--fill">
    <el-form ref="ruleForm" :model="dataForm" label-width="80px" inline>
      <el-form-item label="布控时间:">
        <el-date-picker
          v-model="data"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="FullTime"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="search">查询</el-button>
        <el-button type="warning" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="dataList" >
      <el-table-column
        prop="wifiName"
        label="wifi名称"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="wifiMac"
        label="wifiMac"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <!-- <el-table-column
        prop="type"
        label="热点类型"
        show-overflow-tooltip
        align="center"
        :formatter="typechange"
      >
      </el-table-column> -->
      <el-table-column
        prop="score"
        label="阈值"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="预警时间"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="viewHandle(scope.row)"
              >详情</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      :page-sizes="[6, 10, 20, 50, 100, 500]"
      :page-size="limit"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="pageSizeChangeHandle"
      @current-change="pageCurrentChangeHandle"
    >
    </el-pagination>

    <el-dialog title="详情" :visible.sync="dialogTableVisible" width="85%">
      <el-table :data="devList" style="width: 100%">
        <el-table-column label="重点设备" align="center">
          <el-table-column prop="devPhone" label="手机号" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="devImei" label="IMEI" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="devImsi" label="IMSI" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="devMac" label="MAC" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="devType" label="类型" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <span>{{ typeSizeFn(scope) }}</span>
                </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table :data="appList" style="width: 100%;margin-top:10px;">
        <el-table-column label="敏感APP" align="center">
          <el-table-column prop="appName" label="APP名称" show-overflow-tooltip align="center">
          </el-table-column>
           <el-table-column prop="appPackage" label="APP包名" show-overflow-tooltip align="center">
          </el-table-column>
           <el-table-column prop="appType" label="类型" show-overflow-tooltip align="center">
               <template slot-scope="scope">
                    <span>{{ typeSizeFn1(scope) }}</span>
                </template>
          </el-table-column>
           <el-table-column prop="appFrequency" label="次数" show-overflow-tooltip align="center">
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-card>
</template>

<script>
import mixinViewModule from "@/mixins/view-module";
import { getDictLabel } from "@/utils";
export default {
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
      mixinViewModuleOptions: {
        getDataListURL: "/system/keywifiwarning",
        getDataListIsPage: true,
        activatedIsNeed: true,
      },
      limit: 6,
      data: [],
      dialogTableVisible: false,
      dataForm: {
        mac: "",
        imei: "",
        imsi: "",
        type: "6",
      },
      dataList: [],
      appList: [],
      devList: [],

    };
  },
  computed: {
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
    typeSizeFn1(scope) {
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
    typechange: function (row) {
        let date = row.type;
        date = date.split(',')
        const newDate = date.map(function(item){
            if(item === "1"){
                item = '涉政'
                return item
            }
            else if(item === "2"){
                item = '涉恐'
                return item
            }
            else if(item === "3"){
                item = '涉毒'
                return item
            }
            else if(item === "4"){
                item = '宗教'
                return item
            }
            else if(item === "5"){
                item = '涉黄'
                return item
            }
            else if(item === "6"){
                item = '涉赌'
                return item
            }
            else if(item === "7"){
                item = '涉诈'
                return item
            }
        })
        date = newDate.toString()
        return date
    },
    search() {
      this.page = 1;
      this.query();
    },
    FullTime() {
        (this.dataForm.startTime = this.data[0]),
        (this.dataForm.overTime = this.data[1]);
    },
    resetQuery() {
      this.page = 1;
      this.dataForm = {
        type: 6
      };
      this.query();
    },
    viewHandle(row) {
      this.dialogTableVisible = true;
      this.$http({
        url: "/system/keywifiwarning/sel?wifiMac=" + row.wifiMac,
        method: "get",
      }).then(({ data: res }) => {
        this.devList = res.data.devList
        this.appList = res.data.appList
      });
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
