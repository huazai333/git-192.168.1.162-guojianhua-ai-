<template>
  <el-card>
    <!-- table区域 -->
    <div>
      <el-table :data="list" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table
              :data="scope.row.accompany_device"
              style="width: 100%"
              label="伴随设备"
            >
              <el-table-column
                label="伴随设备信息"
                show-overflow-tooltip
                align="center"
              >
                <el-table-column
                  prop="device_info.devKey"
                  label="设备key"
                  show-overflow-tooltip
                  align="center"
                >
                </el-table-column>
              </el-table-column>
              <el-table-column
                prop="accompany_num"
                label="伴随次数"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="proportion"
                label="所占比例"
                show-overflow-tooltip
                align="center"
              >
                <template slot-scope="scope">
                  {{ scope.row.proportion * 100 + "%" }}
                </template>
              </el-table-column>
              <el-table-column
                prop="trajectory"
                label="伴随详情" 
                show-overflow-tooltip
                align="center"
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
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" align="center" width="50">
        </el-table-column>
        <el-table-column
          label="重点设备信息"
          show-overflow-tooltip
          align="center"
        >
          <el-table-column
            prop="key_device_info.devType"
            label="设备类型"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ typeSizeFn(scope) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="key_device_info.devPhone"
            label="手机号码"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="key_device_info.devModel"
            label="设备型号"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="key_device_info.devImei"
            label="IMEI"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="key_device_info.devImsi"
            label="IMSI"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="key_device_info.devMac"
            label="Mac"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="trajectory_num"
          label="轨迹数量"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="伴随详情" :visible.sync="detail" width="60%">
      <el-table :data="trajectory" style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="50">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="伴随位置(经纬度)"
        >
          <template slot-scope="scope">
            {{ scope.row.lng + "," + scope.row.lat }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="itime"
          label="伴随时间"
          sortable
          :formatter="dataFormat"
        >
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      detail: false,
      trajectory: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    typeSizeFn(scope) {
      scope = scope.row.key_device_info.devType;
      return scope == 1
        ? "涉政"
        : scope == 2
        ? "涉恐"
        : scope == 3
        ? "涉毒"
        : scope == 4
        ? "宗教"
        : scope == 5
        ? "涉黄"
        : scope == 6
        ? "涉赌"
        : scope == 7
        ? "涉诈"
        : "其他";
    },
    //获取列表数据
    getList() {
      this.$http({ url: "system/accompany/all", method: "get" }).then((res) => {
        if (res.data.code == 0) {
          console.log(res.data);
          this.list = res.data.data;
        }
      });
    },
    getRule(item) {
      this.trajectory = item.row.trajectory;
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
  },
};
</script>

<style lang="scss">
.el-table__expanded-cell[class*="cell"] {
  padding: 10px !important;
}
</style>