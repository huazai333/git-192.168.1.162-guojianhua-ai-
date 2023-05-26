<template>
  <el-card shadow="never" class="aui-card--fill">
    <el-form ref="ruleForm" :model="dataForm" label-width="80px" inline>
      <el-form-item label="预警类型：" prop="type">
        <el-select v-model="dataForm.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区域名称：" prop="name">
        <el-input
          v-model="dataForm.arwName"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="预警Mac：" prop="name">
        <el-input
          v-model="dataForm.WarningMac"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button @click="search">查询</el-button>
        <el-button type="warning" @click="resetQuery()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList">
      <el-table-column
        prop="aresId"
        label="预警区域id"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="aresName"
        label="预警区域名称"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="warningDate"
        label="预警时间"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="warningType"
        label="预警类型"
        align="center"
        width="210"
      >
        <template slot-scope="scope">
          <div>
            <span v-if="scope.row.warningType === 1">出界预警</span>
            <span v-else>入界预警</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="controlAddress"
        label="布控地址"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
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
  </el-card>
</template>

<script>
import mixinViewModule from "@/mixins/view-module";
//import viewStaff from './view'
/*import viewStaff from './staff/staff-view'*/
import { getDictLabel, getDictDataList } from "@/utils";
import upload from "@/components/public/upload-excel-or-img";
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
  mixins: [mixinViewModule],
  components: {
    //viewStaff
  },
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: "/system/areawarning",
        getDataListIsPage: true,
        activatedIsNeed: false,
        createdIsNeed: true,
      },
      page: 0,
      limit: 6,
      genderList: getDictDataList("informationType"),
      dataForm: {
        WarningMac: "",
        arwName: "",
        type: "",
      },
      dataList: [],
      checkList: [],
      loading: false,
      options: [
        {
          value: "1",
          label: "出界报警",
        },
        {
          value: "2",
          label: "入界报警",
        },
      ],
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
    search() {
      this.page = 0;
      this.query();
    },
    resetQuery() {
      this.page = 0;
      this.dataForm = {
        WarningMac: "",
        arwName: "",
        type: "",
      };
      this.query();
    },
    viewHandle(row) {
      console.log(row);
      this.$router.push({ name: "equipment-info", query: row });
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
    formatterInTime(row) {
      if (null !== row.endTime && row.endTime.length > 10) {
        return row.endTime.substring(0, 10);
      }
      return row.endTime;
    },
    addStaff() {},
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
