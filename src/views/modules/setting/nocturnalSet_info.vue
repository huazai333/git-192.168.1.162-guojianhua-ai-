<template>
  <el-card>
    <!-- table区域 -->
    <div>
        <h5
        style="
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 20px;
        "
      >
        {{ JSON.parse(modelName) }}分析结果
      </h5>
      <el-table :data="list" style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="devPhone"
          label="手机号"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="devImei"
          label="IMEI"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="devImsi"
          label="IMSI"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="devMac"
          label="Mac"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="recordDate"
          label="时间"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">

             <div style="max-height: 80px; overflow-y: auto">
                <div v-for="(item, index) in scope.row.recordDate" :key="index">
                  {{ item }}
                </div>
              </div>

              
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      modelId: "",
      list: [],
    };
  },
  created() {
    this.getInfo(this.$route.query);
  },
  mounted() {
    this.getInfo(this.$route.query);
  },
  activated() {
    this.getInfo(this.$route.query);
  },
  methods: {
    //获取列表数据
    getInfo(item) {
      this.modelId = item.item;
      this.modelName = item.itemName;
      this.$http({
        url: "/system/vespertine/model?modelId=" + item.item,
        method: "get",
      }).then(({ data: res }) => {
        this.list = res.data.list;

        let sendStuList = res.data.list.map(item=>{
            return {...item,recordDate:item.recordDate.split("-")}
        })

         this.list = sendStuList

        console.log(this.list)
      });
    },
    // 时间戳转换时间
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    dataFormat: function (row) {
      let date =  row.recordDate;
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
  },
};
</script>