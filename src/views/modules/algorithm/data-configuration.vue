<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-refresh"
            @click.native.prevent="back()"
            >返回</el-button
          >
        </el-form-item>

        <span>
          <el-form-item label="选择摄像头" prop="Alarmname">
            <el-select v-model="listQuery.Alarmname">
              <el-option
                v-for="item in Authorizations"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="选择算法" prop="alarmid">
            <el-select v-model="listQuery.alarmid">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="时间">
            <el-date-picker
              v-model="listQuery.headCreateTime"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
            <span> &nbsp;-&nbsp; </span>
            <el-date-picker
              v-model="listQuery.tailCreateTime"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="btnLoading"
              @click="getAccountList"
              >查询</el-button
            >
          </el-form-item>
          <el-form-item>
          <el-button
            type="success"
            icon="el-icon-refresh"
            @click.native.prevent="getAccountList"
            >刷新</el-button
          >
        </el-form-item>
        </span>
      </el-form>
    </div>
    <el-table
      v-loading.body="listLoading"
      :header-cell-style="{ background: '#F5F5F5' }"
      :data="accountList"
      element-loading-text="loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="#" align="center" width="80">
        <template slot-scope="scope">
          <span v-text="getIndex(scope.$index)" />
        </template>
      </el-table-column>
      <el-table-column label="图片" align="center" prop="alarnImg" width="100">
        <template slot-scope="scope">
          <img
            :src="scope.row.alarmbjImg"
            style="height: 50px;width:50px; "
            @click="showAddAccountDialog(scope.row.alarmImg)"
          />
        </template>
      </el-table-column>
      <el-table-column label="报警类型" align="center" prop="alarmRemark" />
      <el-table-column label="摄像头名称" align="center" prop="alarmCamera" />
      <el-table-column label="报警时间" align="center" prop="alarmTime" />
    </el-table>
    <el-pagination
    background
      :current-page="listQuery.page"
      :page-size="listQuery.size"
      :total="total"
      layout="total,  prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      style="width: 100%; height: 800px"
    >
      <img :src="big_img_src" style="height: 100%; width: 100%" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      image_src: "http://" + window.location.hostname + ":8080/img/",
      big_img_src: "",
      Authorizations: [],
      authorizationsQuery: {
        name: "",
        page: 1, // 页码
        size: 10, // 每页数量
      },
      options: [
        {
          value: "01",
          label: "抽烟检测",
        },
        {
          value: "02",
          label: "安全帽检测",
        },
        {
          value: "03",
          label: "戴口罗检测",
        },
        {
          value: "04",
          label: "烟雾检测",
        },
        {
          value: "05",
          label: "火焰检测",
        },
        {
          value: "06",
          label: "手套检测",
        },
        {
          value: "07",
          label: "人流检测",
        },
        {
          value: "08",
          label: "跌倒检测",
        },
        {
          value: "09",
          label: "离岗检测",
        },

        {
          value: "10",
          label: "睡岗检测",
        },
        {
          value: "11",
          label: "打电话检测",
        },
        {
          value: "12",
          label: "反光衣检测",
        },
        {
          value: "13",
          label: "电瓶车检测",
        },
      ],
      value: "",
      accountList: [], // 用户列表
      roleList: [], // 全部角色
      filterRoleNameList: [], // 用于过滤表格角色的列表 http://element-cn.eleme.io/#/zh-CN/component/table#shai-xuan
      listLoading: false, // 数据加载等待动画
      total: 0, // 数据总数
      alarmname: "",
      headCreateTime: "",
      tailCreateTime: "",
      listQuery: {
        headCreateTime: "",
        tailCreateTime: "",
        alarmid: "",
        Alarmname: "",
        page: 1, // 页码
        size: 10, // 每页数量
      },
      dialogStatus: "add",
      dialogFormVisible: false,
      textMap: {
        updateRole: "修改账号角色",
        update: "修改账号",
        add: "查看大图",
      },
      btnLoading: false, // 按钮等待动画
    };
  },
  created() {

    // 获取摄像头 
    this.getAuthorizations();
    // 获取列表
    this.getAccountList(this.$route.query.resData);
    // this.initParams()
    
    // this.getData(this.$route.query.resData);
  },
  activated () {
    this.getAccountList(this.$route.query.resData);
  },
  computed: {
    ...mapGetters(["accountId"]),
  },
  methods: {
    back(){
        this.$router.go(-1)
    },
    // 获取摄像头
    getAuthorizations() {
      this.$http({
        url: "system/cameraInfo/page",
        method: "get",
        params: this.authorizationsQuery,
      }).then((response) => {
        this.Authorizations = response.data.data.records;
      });
    },
    initParams() {
      const routerParams = this.$route.params.alarmCode;
      this.listQuery.alarmid = routerParams;
    },
    /**
     * 获取设备列表
     */
    getAccountList(code) {
        console.log(code)
      this.listLoading = true;
      this.listQuery.alarmid = code;
      this.$http({
        url: "system/yxyTest/list",
        method: "get",
        params: this.listQuery,
      })
        .then((response) => {
          this.accountList = response.data.data.records;
          this.total = Number(response.data.data.total);
          this.listLoading = false;
        })
        .catch((res) => {
          this.$message.error("加载失败");
          this.listLoading = false;
        });
    },
    /**
     * 改变每页数量
     * @param size 页大小
     */
    handleSizeChange(size) {
      this.listQuery.size = size;
      this.listQuery.page = 1;
      this.getAccountList();
    },
    /**
     * 改变页码
     * @param page 页号
     */
    handleCurrentChange(page) {
      this.listQuery.page = page;
      this.getAccountList();
    },
    /**
     * 表格序号
     * 可参考自定义表格序号
     * http://element-cn.eleme.io/#/zh-CN/component/table#zi-ding-yi-suo-yin
     * @param index 数据下标
     * @returns 表格序号
     */
    getIndex(index) {
      return (this.listQuery.page - 1) * this.listQuery.size + index + 1;
    },
    showAddAccountDialog(src){
        console.log(src)
        this.dialogFormVisible = true
        this.big_img_src = src
    }
  },
};
</script>

<style lang="scss" scoped>
    .app-container{
        padding: 20px;
    }
</style>