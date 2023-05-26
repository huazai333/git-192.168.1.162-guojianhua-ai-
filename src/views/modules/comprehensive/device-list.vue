<template>
  <el-card shadow="never" class="aui-card--fill">
    <el-table :data="data" style="width: 100%">
        <el-table-column
        show-overflow-tooltip
        prop="deviceModel"
        label="型号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="brand"
        label="品牌"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="version"
        label="版本"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="imei"
        label="IMEI"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="mac"
        label="Mac地址"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="macChange"
        label="是否更改过Mac地址"
        show-overflow-tooltip
        align="center"
      >
      <template slot-scope="scope">
         {{ scope.row.macChange === "true" ? '是' : '否'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="language"
        label="语言"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="timeZone"
        label="时区"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="viewHandle(scope.row)"
              >档案信息</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { Message } from "element-ui";
import Base64 from 'base-64'
export default {
  data() {
    return {
      data: [],
      start:"",
      end:"",
    };
  },
  computed: {},
  mounted() {
    let paramsString = Base64.decode(this.$route.query.params)
    console.log(paramsString)
    this.getDeviceInfo(JSON.parse(paramsString));
  },
  activated() {
    let paramsString = Base64.decode(this.$route.query.params)
    this.getDeviceInfo(JSON.parse(paramsString));
  },

  methods: {
    isJson(obj){
      return typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !data.length
    },
    getDeviceInfo(item) {
      console.log(item);
      this.start = item.start
      this.end = item.end
      let data = item.device;
      this.$http.post("/kepler/v2/list", data).then(({ data: res }) => {
        if (res.code == 0) {
            this.data = res.data
        } else {
          Message.warning(res.msg);
        }
      });
    },
     // 跳转详情
    viewHandle(row) {
        var params = {
            key: row.key,
            type:row.type,
            start: this.start,
            end: this.end,
          };
      this.$router.push({ name: "base-Information", query: params });
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
