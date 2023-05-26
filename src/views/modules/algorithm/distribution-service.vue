<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-refresh"
            @click.native.prevent="getAccountList"
            >刷新</el-button
          >
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-plus"
            @click.native.prevent="showAddAccountDialog"
            >添加对接平台</el-button
          >
        </el-form-item>

        <span>
          <el-form-item label="请输入服务名称：">
            <el-input v-model="listQuery.carNum" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="btnLoading"
              @click="getAccountList"
              >查询</el-button
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
      <el-table-column
        label="服务名称"
        align="center"
        prop="serviceName"
        width="200"
      />
      <el-table-column
        label="公司代码"
        align="center"
        prop="orgCode"
        width="200"
      />
      <el-table-column
        label="报警图片上传地址"
        align="center"
        prop="serviceFile"
      />
      <el-table-column
        label="报警信息上传地址"
        align="center"
        prop="serviceHttp"
      />
      <el-table-column
        label="服务状态"
        align="center"
        prop="serviceType"
        width="200"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.serviceType"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change = changState(scope.row)
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            @click.native.prevent="removeAccount(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="tmpAccount"
        status-icon
        class="small-space"
        label-position="left"
        label-width="auto"
        :model="tmpAccount"
        :rules="createRules"
      >
        <el-form-item label="服务名称" prop="serviceName">
          <el-input
            v-model="tmpAccount.serviceName"
            type="text"
            prefix-icon="el-icon-edit"
            auto-complete="off"
            :disabled="dialogStatus === 'updateRole'"
          />
        </el-form-item>
        <el-form-item label="消息地址" prop="serviceHttp">
          <el-input
            v-model="tmpAccount.serviceHttp"
            type="text"
            prefix-icon="el-icon-edit"
            auto-complete="off"
            :disabled="dialogStatus === 'updateRole'"
          />
        </el-form-item>
        <el-form-item label="图片地址" prop="serviceFile">
          <el-input
            v-model="tmpAccount.serviceFile"
            type="text"
            prefix-icon="el-icon-edit"
            auto-complete="off"
            :disabled="dialogStatus === 'updateRole'"
          />
        </el-form-item>
        <el-form-item label="公司代码" prop="orgCode">
          <el-input
            v-model="tmpAccount.orgCode"
            type="text"
            prefix-icon="el-icon-edit"
            auto-complete="off"
            :disabled="dialogStatus === 'updateRole'"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="dialogFormVisible = false"
          >取消</el-button
        >
        <el-button
          v-if="dialogStatus === 'add'"
          type="danger"
          @click.native.prevent="$refs['tmpAccount'].resetFields()"
          >重置</el-button
        >
        <el-button
          v-if="dialogStatus === 'add'"
          type="success"
          :loading="btnLoading"
          @click.native.prevent="addAccount"
          >添加</el-button
        >
        <el-button
          v-if="dialogStatus === 'update'"
          type="primary"
          :loading="btnLoading"
          @click.native.prevent="updateAccount"
          >更新资料</el-button
        >
        <el-button
          v-if="dialogStatus === 'updateRole'"
          type="primary"
          :loading="btnLoading"
          @click.native.prevent="updateAccountRole"
          >更新角色</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      accountList: [], // 用户列表
      roleList: [], // 全部角色
      filterRoleNameList: [], // 用于过滤表格角色的列表 http://element-cn.eleme.io/#/zh-CN/component/table#shai-xuan
      listLoading: false, // 数据加载等待动画
      total: 0, // 数据总数
      listQuery: {
        carNum: "",
        page: 1, // 页码
        size: 10, // 每页数量
      },
      dialogStatus: "add",
      dialogFormVisible: false,
      textMap: {
        updateRole: "修改账号角色",
        update: "修改账号",
        add: "添加服务",
      },
      btnLoading: false, // 按钮等待动画
      tmpAccount: {
        serviceName: "",
        serviceHttp: "",
        serviceFile: "",
        orgCode: "",
        serviceType: 1,
      },
      search: {
        page: null,
        size: null,
        accountName: null,
        roleName: null,
      },
      createRules: {
        serviceName: [{ required: true, trigger: "blur" }],
        serviceHttp: [{ required: true, trigger: "blur" }],
        serviceFile: [{ required: true, trigger: "blur" }],
        orgCode: [{ required: true, trigger: "blur" }],
      },
    };
  },
  created() {
    /*    if (this.hasPermission('role:update')) {
      this.getRoleList()
    }*/

    this.getAccountList();
  },
  computed: {
    ...mapGetters(["accountId"]),
  },
  methods: {
    changState(row) {
        console.log(row)
      this.$http({
        url: "system/InterfaceServices/upStart",
        method: "put",
        data: row,
      })
        .then((response) => {
          this.$message.success("更新成功");
          this.dialogFormVisible = false;
        })
        .catch((response) => {
          this.$message.error("更新失败");
        });
    },
    initParams() {
      const routerParams = this.$route.params.carNum;
      this.listQuery.carNum = routerParams;
    },
    /**
     * 获取设备列表
     */
    getAccountList() {
      this.listLoading = true;
      this.$http({
        url: "system/InterfaceServices/list",
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
    searchBy() {
      this.btnLoading = true;
      this.listLoading = true;
      this.search.page = this.listQuery.page;
      this.search.size = this.listQuery.size;
      this.$http({
        url: this.$http.adornUrl("/account/search"),
        method: "post",
        data: this.search,
      })
        .then((response) => {
          this.accountList = response.data.list;
          this.total = response.data.total;
          this.listLoading = false;
          this.btnLoading = false;
        })
        .catch((response) => {
          this.$message.error("搜索失败");
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
    /**
     * 显示添加用户对话框
     */
    showAddAccountDialog() {
      // 显示新增对话框
      this.dialogFormVisible = true;
      this.dialogStatus = "add";
      this.tmpAccount.serviceName = "";
      this.tmpAccount.serviceHttp = "";
      this.tmpAccount.serviceFile = "";
      this.tmpAccount.orgCode = "";
    },
    /**
     * 添加用户
     */
    addAccount() {
      this.$refs.tmpAccount.validate((valid) => {
        if (valid && this.isUniqueDetail(this.tmpAccount)) {
          this.btnLoading = true;
          this.$http({
            url: "system/InterfaceServices/save",
            method: "post",
            data: this.tmpAccount,
          })
            .then(() => {
              this.$message.success("添加成功");
              this.getAccountList();
              this.dialogFormVisible = false;
              this.btnLoading = false;
            })
            .catch((res) => {
              this.$message.error("添加失败");
              this.btnLoading = false;
            });
        }
      });
    },
    /**
     * 显示修改用户对话框
     * @param index 用户下标
     */
    showUpdateAccountDialog(index) {
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
    },
    /**
     * 更新用户
     */
    updateAccount() {
      this.$http({
        url: this.$http.adornUrl("/account/detail"),
        method: "put",
        data: this.tmpAccount,
      })
        .then(() => {
          this.$message.success("更新成功");
          this.getAccountList();
          this.dialogFormVisible = false;
        })
        .catch((res) => {
          this.$message.error("更新失败");
        });
    },
    /**
     * 显示修改用户角色对话框
     * @param index 用户下标
     */
    showUpdateAccountRoleDialog(index) {
      this.dialogFormVisible = true;
      this.dialogStatus = "updateRole";
    },
    /**
     * 用户资料是否唯一
     * @param account 用户
     */
    isUniqueDetail(account) {
      for (let i = 0; i < this.accountList.length; i++) {
        if (this.accountList[i].serviceName === account.serviceName) {
          this.$message.error("该服务已存在");
          return false;
        }
      }
      return true;
    },
    /**
     * 删除用户
     * @param index 用户下标
     */
    removeAccount(index) {
      this.$confirm("删除该布点信息？", "警告", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      })
        .then(() => {
          const id = this.accountList[index].id;
          this.$http({
            url: "system/InterfaceServices/" + id,
            method: "delete",
          }).then(() => {
            this.$message.success("删除成功");
            this.getAccountList();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
    .app-container{
        padding: 20px;
    }
</style>