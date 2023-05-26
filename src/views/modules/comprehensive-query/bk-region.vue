<template>
  <el-card>
    <div>
      <el-form :inline="true" :model="queryParameter" class="demo-form-inline">
        <!-- <el-form-item label="区域id:">
          <el-input
            placeholder="请输入"
            v-model="queryParameter.areaId"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="区域名称:">
          <el-input
            placeholder="请输入"
            v-model="queryParameter.areaName"
          ></el-input>
        </el-form-item>
        <el-form-item label="布控时间:">
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
          <el-button type="primary" @click="searchQuery()">查询</el-button>
          <el-button type="primary" @click="resetEvent()">重置</el-button>
          <el-button type="primary" @click="dialogVisible = true"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- table区域 -->
    <div>
      <el-table :data="dataSource" style="width: 100%">
        <el-table-column label="重点区域id" prop="areaId" show-overflow-tooltip align="center"> </el-table-column>
        <el-table-column label="区域名称" prop="areaName" show-overflow-tooltip align="center"> </el-table-column>

        <el-table-column prop="areaType" label="区域类型" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{ scope.row.areaType == 1 ? "禁止进入" : scope.row.areaType == 2 ? "禁止离开" : "流动统计" }}
          </template>
        </el-table-column>
        <el-table-column label="布控地址" prop="controlAddress" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="controlDate" label="布控时间" show-overflow-tooltip align="center"> </el-table-column>
        <!-- <el-table-column label="布控人" prop="controlUserid" show-overflow-tooltip align="center"> </el-table-column> -->
        <el-table-column prop="isDelete" label="是否撤控" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{ scope.row.isDelete == 1 ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="top"
            >
              <el-button
                size="mini"
                type="success"
                icon="el-icon-edit"
                @click="modify(scope)"
                circle
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top-end"
            >
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="del(scope)"
                circle
              ></el-button>
            </el-tooltip>
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
    </div>
    <!-- 添加弹框 -->
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="80%"
      v-loading="loading"
    >
      <el-form
        label-width="120px"
        :rules="formAddRules"
        ref="fAdd"
        :model="regionAdd"
       
      >
        <el-form-item label="区域名称:" prop="areaName"  
          ><el-input
           placeholder="请输入"
            v-model="regionAdd.areaName"
          ></el-input>
        </el-form-item>

        <el-form-item label="区域类型:" prop="areaType">
          <el-select v-model="regionAdd.areaType" placeholder="请选择区域类型">
            <el-option label="禁止进入" value="1"></el-option>
            <el-option label="禁止离开" value="2"></el-option>
            <el-option label="流动统计" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="布控原因:" prop="controlReason"
          ><el-input
            placeholder="请输入内容"
            v-model="regionAdd.controlReason"
          ></el-input>
        </el-form-item>
        <el-form-item label="布控地址:" prop="controlAddress">
          <el-input
            type="textarea"
            v-model="regionAdd.controlAddress"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <baidu-map
            :center="center"
            :zoom="zoom"
            @click="getClickInfo"
            style="height: 500px"
            :scroll-wheel-zoom="true"
            @ready="readyHandler"
          >
            <bm-polygon
           anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
              :path="dataForm.middle"
              v-for="(item, index) in dataForm.middle"
              :key="index"
              stroke-color="blue"
              :stroke-opacity="0.5"
              :stroke-weight="2"
              :editing="true"
              :fillOpacity="0.1"
              @lineupdate="updatePolygonPath"
            >
            </bm-polygon>
          </baidu-map>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addok" v-loading="loading">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改弹框 -->
    <el-dialog
      title="修改"
      :visible.sync="dialogVisible2"
      :before-close="handleClose"
      width="80%"
    >
      <el-form
        label-width="120px"
        :model="regionAdd"
        :rules="formAddRules"
        ref="fAdd"
      >
        <el-form-item label="区域名称:" prop="areaName"
          ><el-input
            placeholder="请输入内容"
            v-model="regionAdd.areaName"
          ></el-input>
        </el-form-item>

        <el-form-item label="区域类型:" prop="areaType">
          <el-select v-model="regionAdd.areaType">
            <el-option label="禁止进入" :value="1">禁止进入</el-option>
            <el-option label="禁止离开" :value="2">禁止离开</el-option>
            <el-option label="流动统计" :value="3">流动统计</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="布控原因:" prop="controlReason"
          ><el-input
            placeholder="请输入内容"
            v-model="regionAdd.controlReason"
          ></el-input>
        </el-form-item>
        <el-form-item label="布控地址:" prop="controlAddress">
          <el-input
            type="textarea"
            v-model="regionAdd.controlAddress"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-form-item>
            <baidu-map
              :center="center"
              :zoom="zoom"
              @click="getClickInfo"
              style="height: 500px"
              :scroll-wheel-zoom="true"
              @ready="readyHandler"
            >
              <bm-polygon
                anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                :path="dataForm.middle"
                v-for="(item, index) in list"
                :key="index"
                stroke-color="blue"
                :stroke-opacity="0.1"
                :stroke-weight="2"
                :editing="true"
                :fillOpacity="0.1"
                @lineupdate="updatePolygonPath"
                @remove="removes"
              >
              </bm-polygon>
            </baidu-map>
          </el-form-item>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="changeok()" v-loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { BmPolygon } from "vue-baidu-map";
import { mapState } from "vuex";
import { getBkregion } from "@/api/api.js";
export default {
  computed: {
    ...mapState({ id: "id" }),
  },
  components: { BmPolygon },
  data() {
    return {
      loading:false,
      data: [],
      zoom: 16,
      center: {
        //  lng: 0, lat: 0 
      },
      dataForm: {
        id: "",
        name: "",
        middle: [],
        remarks: "",
      },
      list: [],
      list1:[],
      animation: ["BMAP_ANIMATION_BOUNCE", ""],
      dataSource: [],
      dataSource1: [], //详情表数据
      dataSource2: [], //详情数据类型
      regionAdd: {
        areaId: null,
        areaName: null,
        controlReason: null,
        controlAddress: null,
        areaType: null,
      }, //添加参数
      formAdd: [
        {
          lng: null,
          lat: null,
        },
      ],
      queryInfo: {
        page: 1,
        limit: 10,
      },
      total: 0,
      queryParameter: {
        areaId: "",
        areaName: "",
        startTime: "",
        overTime: "",
      }, //查询参数
      formAddRules: {
        areaName: [{ required: true, message: "请输入值", trigger: "blur" }],
        controlUserid: [
          { required: true, message: "请输入值", trigger: "blur" },
        ],
        areaType: [{ required: true, message: "请输入值", trigger: "change" }],
        controlReason: [
          { required: true, message: "请输入值", trigger: "blur" },
        ],
        controlAddress: [
          { required: true, message: "请输入值", trigger: "blur" },
        ],
      }, //非空验证
      dialogVisible: false, //添加弹框
      dialogVisible2: false, //修改弹框
    };
  },
  created() {
    this.getList(this.queryInfo);
  },
  methods: {
    updatePolygonPath(e) {
      this.dataForm.middle = e.target.getPath();
    },
    removes() {},
    readyHandler({ BMap, map }) {
       const _this = this
      // 获取自动定位方法
      var geolocation = new BMap.Geolocation()
      // 获取逆解析方法实例
      this.myGeo = new BMap.Geocoder()
      // 获取自动定位获取的坐标信息
      geolocation.getCurrentPosition(
        function (r) {
          _this.center = {
            lng: r.point.lng,
            lat: r.point.lat
          }
          _this.point = {
            lng: r.point.lng,
            lat: r.point.lat
          }
        },
        { enableHighAccuracy: true }
      )
      // this.isRead = true;
      this.zoom = 15;
      // this.getList();
    },
    getClickInfo(e) {
      if (this.dataForm.id) {
        return;
      }
      const lng = e.point.lng;
      const lat = e.point.lat;
      this.dataForm.middle.push({ lng: lng, lat: lat });
    },

    async getList() {
      const { data: res } = await getBkregion(this.queryInfo);
      if (res.code == 0) {
        this.dataSource = res.data.list;
        this.total = res.data.total;
      }
    },

    //查询
    async searchQuery() {
      var queryParameters = {
        areaId: this.queryParameter.areaId,
        areaName: this.queryParameter.areaName,
        startTime: this.data[0],
        overTime: this.data[1],
      };
      const { data: res } = await getBkregion(queryParameters);
      if (res.code == 0) {
        this.dataSource = res.data.list;
      } else {
        this.$message({
          type: "info",
          message: "查询失败",
        });
      }
    },
    //重置
    resetEvent() {
      this.queryParameter = {
        areaId: "",
        areaName: "",
        startTime: "",
        overTime: "",
      };
      this.data = []
      this.getList();
    },
    //删除
    del(scope) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .post(
              "/system/reg/del?areaId=" +
                scope.row.areaId +
                "&revokeUserid=" +
                this.$store.state.user.id
            )
            .then((res) => {
              if (res.data.code == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getList();
              } else {
                this.$message({
                  type: "info",
                  message: "删除失败!",
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //新增文本框删除按钮
    delInput(index) {
      if (this.formAdd.length <= 1) {
        return false;
      }
      this.formAdd.splice(index, 1);
    },
    addok() {
      this.$refs.fAdd.validate((valid) => {
        if (!valid) return;
        this.loading = true;
        for (var i = 0; i < this.dataForm.middle.length; i++) {
          this.list.push(this.dataForm.middle[i]);
        }
        var params = {
          areaName: this.regionAdd.areaName,
          controlUserid: this.$store.state.user.id,
          controlReason: this.regionAdd.controlReason,
          controlAddress: this.regionAdd.controlAddress,
          areaType: this.regionAdd.areaType,
          list: this.list,
        };
        let data = JSON.parse(JSON.stringify(params));
       this.$http.post("/system/reg/add", data).then(({data:res})=>{
         if (res.code == 0) {
          this.$message({
            type: "success",
            message: "添加成功",
          });
          this.dialogVisible = false;
          this.clearForm();
          this.getList();
          this.handleClose()
        } else {
          this.$message({
            type: "warning",
            message: "添加失败",
          });
        }
       }).finally(()=>{
         this.loading = false
       });
       
      });
      
    },
    //修改传值
    modify(scope) {
      console.log(scope);
      this.dialogVisible2 = true;
      this.regionAdd.areaType = scope.row.areaType;
      this.regionAdd.areaName = scope.row.areaName;
      this.regionAdd.controlReason = scope.row.controlReason;
      this.regionAdd.controlAddress = scope.row.controlAddress;
      this.regionAdd.areaId = scope.row.areaId;
      this.dataForm.middle = scope.row.list;
    },
    changeok() {
      this.$refs.fAdd.validate((valid) => {
        if (!valid) return;
        this.loading = true
          for (var i = 0; i < this.list.length; i++) {
          this.list1.push(this.list[i]);
        }
        var params = {
          areaId: this.regionAdd.areaId,
          areaName: this.regionAdd.areaName,
          controlUserid: this.$store.state.user.id,
          controlReason: this.regionAdd.controlReason,
          controlAddress: this.regionAdd.controlAddress,
          areaType: this.regionAdd.areaType,
          list: this.list1,
        };
        let data = JSON.parse(JSON.stringify(params));
        this.$http.post("/system/reg/update", data).then((res) => {
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
            this.dialogVisible2 = false;
            this.clearForm();
            this.getList();
          } else {
               this.$message({
              type: "warning",
              message: "修改失败",
            });
          }
        }).finally(()=>{
          this.loading = false
        });
      });
    },
    handleClose() {
      let obj = this.regionAdd;
      for (var i in obj) {
        obj[i] = null;
      }

      this.dialogVisible = false,
      this.dialogVisible2 = false;
    },
    clearForm() {
      let obj = this.regionAdd;
      for (var i in obj) {
        obj[i] = null;
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
  },
};
</script>

<style scoped>
.jw .el-input {
  width: 220px;
}
.el-select{
  width: 50%;
}
</style>