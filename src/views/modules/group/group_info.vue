<template >
  <div class="detail_page">
    <el-table :data="tableList" style="width: 100%">
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="devPhone"
        label="手机号"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="devImei"
        label="Imei"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="devImsi"
        label="Imsi"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="devMac"
        label="Mac"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="groupType"
        label="类型"
      >
		<template slot-scope="scope">
			{{
				scope.row.groupType == 1 ? "疑似涉政人员" : 
				scope.row.groupType == 2 ? "疑似涉恐人员" : 
				scope.row.groupType == 3 ? "疑似涉毒人员" : 
				scope.row.groupType == 4 ? "疑似涉教人员" : 
				scope.row.groupType == 5 ? "疑似涉黄人员" : 
				scope.row.groupType == 6 ? "疑似涉赌人员" : 
				scope.row.groupType == 7 ? "疑似涉诈人员" : 
				"未知" 
			}}
		</template>
	  </el-table-column>
    </el-table>
  </div>
</template>
 
<script>
export default {
  filters: {},
  data() {
    return {
      task_id: "",
      tableList: [],
    };
  },
  computed: {},
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
    // 获取详情信息
    getInfo(item) {
      this.task_id = item.task_id;
      this.$http({
        url: "/hadoop/task/getResult?task_id=" + this.task_id,
        method: "get",
      }).then(({ data: res }) => {
        this.tableList = res.data.groupResult;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.detail_page {
  background: #fff;
  padding: 40px;
}
</style>
