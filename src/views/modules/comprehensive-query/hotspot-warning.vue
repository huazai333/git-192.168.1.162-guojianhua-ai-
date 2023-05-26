<template>
  <el-card>
    <el-form :inline="true" :model="queryParameter" class="demo-form-inline">
      <el-form-item label="热点名称：">
        <el-input placeholder="请输入" v-model="queryParameter.ssid"></el-input>
      </el-form-item>
      <el-form-item label="热点mac地址：">
        <el-input
          placeholder="请输入"
          v-model="queryParameter.wifiMac"
        ></el-input> 
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchQuery()">查询</el-button>
        <el-button type="primary" @click="resetEvent()">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="dataList" style="width: 100%">
      <el-table-column prop="wifiMac" label="热点mac地址" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="connectNum" label="连接次数" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="type" label="异常时间段" show-overflow-tooltip align="center">
        <template slot-scope="scope">
            <div>
                <span v-if="scope.row.type === 1">全天</span>
                <span v-if="scope.row.type === 2">晚上</span>
            </div>
        </template>
      </el-table-column>
      <el-table-column prop="startHour" label="开始时刻" show-overflow-tooltip align="center">
        <template slot-scope="scope">
            <div>
                <span>{{scope.row.startHour}}点</span>
            </div>
        </template>
      </el-table-column>
      <el-table-column prop="endHour" label="结束时刻" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <div>
                <span>{{scope.row.endHour}}点</span>
            </div>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="采集时间" :formatter="dataFormat" show-overflow-tooltip align="center"></el-table-column> 
      
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="viewHandle(scope.row)">详情</el-button>
          </div>
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

  </el-card>
</template>

<script>
import { getHos } from "@/api/api.js";
export default {
  data() {
    return {
      dataList: [],
      queryInfo: {
        page: 1,
        limit: 10,
      },
      total: 0,
      queryParameter: {
        ssid: null,
        wifiMac: null,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    add0(m) {
        return m < 10 ? "0" + m : m;
    },
    dataFormat: function (row) {
        let date = row.date;
        // console.log(date);
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
    resetEvent() {
      this.queryParameter = {};
      this.getList();
    },
    async getList() {
      const { data: res } = await getHos(this.queryInfo);
      if (res.code == 0) {
        this.dataList = res.data.list;
        this.total = res.data.total;
      }
    },
    async searchQuery() {
      let params = {
        wifiMac: this.queryParameter.wifiMac,
        ssid: this.queryParameter.ssid,
        size: this.queryInfo.page,
        limit: this.queryInfo.limit,
      };
      const { data: res } = await this.$http("/system/ssidwarning/sel", {
        params: params,
      });
      if (res.code == 0) {
        this.dataList = res.data.list;
        this.total = res.data.total;
      }
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
    viewHandle(row) {
      this.$router.push({ name: "hotspot-warning-info", query: { wifiMac: row.wifiMac } });
    },
  },
};
</script>

<style scoped>
</style>
