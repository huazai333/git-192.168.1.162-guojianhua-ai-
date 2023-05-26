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
            >添加点位</el-button
          >
        </el-form-item>

        <span>
          <el-form-item>
            <el-input v-model="listQuery.name" placeholder="点位信息" />
          </el-form-item>
          <!--          <el-form-item>
            <el-select v-model="search.roleName" placeholder="角色">
              <el-option label="请选择" value />
              <div v-for="(role, index) in roleList" :key="index">
                <el-option :label="role.name" :value="role.name" />
              </div>
            </el-select>
          </el-form-item>-->
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
        label="摄像头名称"
        align="center"
        prop="name"
        width="200"
      />
      <el-table-column label="rtsp地址" align="center" prop="rtspUrl" />
      <el-table-column label="执行任务" align="center" prop="tasks">
        <template slot-scope="scope">
          <span v-for="val in scope.row.cameraAlgorithmTasks" >
            &nbsp; &nbsp;<el-tag type="success">{{ val }}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click.native.prevent="jump(scope.row)"
            >任务配置</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click.native.prevent="removeAccount(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      :current-page="page"
      :page-size="limit"
      :total="total"
      layout="total, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="30%">
      <el-form
        ref="tmpAccount"
        status-icon
        class="small-space"
        label-position="left"
        label-width="auto"
        :model="tmpAccount"
        :rules="createRules"
      >
        <!-- <el-form-item label="序号" prop="serialNumber">
          <el-input
            v-model="tmpAccount.serialNumber"
            type="text"
            prefix-icon="el-icon-edit"
            auto-complete="off"
            :disabled="dialogStatus === 'updateRole'"
          />
        </el-form-item> -->
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="tmpAccount.name"
            type="text"
            prefix-icon="el-icon-edit"
            auto-complete="off"
            :disabled="dialogStatus === 'updateRole'"
          />
        </el-form-item>
        <el-form-item label="rtsp" prop="rtspUrl">
          <el-input
            v-model="tmpAccount.rtspUrl"
            type="text"
            prefix-icon="el-icon-edit"
            auto-complete="off"
            :disabled="dialogStatus === 'updateRole'"
          />
        </el-form-item>

        <!--        <el-form-item
          v-if="dialogStatus === 'updateRole'"
          label="角色"
        >
          <el-select v-model="tmpAccount.roleId" placeholder="请选择">
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>-->
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
      page: 1, // 当前页码
      limit: 10, // 每页数
      total: 0, // 总条数
      listQuery: {
        name: "",
        page: 1, // 页码
        size: 10, // 每页数量
      },
      dialogStatus: "add",
      dialogFormVisible: false,
      textMap: {
        updateRole: "修改账号角色",
        update: "修改账号",
        add: "添加点位",
      },
      btnLoading: false, // 按钮等待动画
      tmpAccount: {
        // serialNumber: "",
        name: "",
        rtspUrl: "",
      },
      removeId: {
        id: "",
      },
      search: {
        page: null,
        size: null,
        accountName: null,
        roleName: null,
      },
      createRules: {
        // serialNumber: [{ required: true, trigger: "blur" }],
        name: [{ required: true, trigger: "blur" }],
        rtspUrl: [{ required: true, trigger: "blur" }],
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
    jump(row) {
      this.$router.push({
        name: "algorithmConfiguration",
        query: { resData: row.id, url: row.rtspUrl },
      });
    },
    // unix2CurrentTime,
    /**
     * 获取所有角色
     */
    getRoleList() {
      getRoleList()
        .then((response) => {
          this.roleList = response.data.list;
        })
        .catch((res) => {
          this.$message.error("加载角色失败");
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
        url: "system/cameraInfo/page",
        method: "get",
        params: this.listQuery,
      })
        .then((response) => {
          this.accountList = response.data.data.records;
          this.total = Number(response.data.data.total);

          // this.total = response.data.total
          /*        for (let i = 0; i < this.accountList.length; i++) {
          const filterObject = {}
          filterObject.text = this.accountList[i].roleName
          filterObject.value = this.accountList[i].roleName
          this.filterRoleNameList.push(filterObject)
        }*/
          this.listLoading = false;
        })
        .catch((res) => {
          this.$message.error("加载账户列表失败");
          this.listLoading = false;
        });
    },
    // searchBy() {
    //   this.btnLoading = true;
    //   this.listLoading = true;
    //   this.search.page = this.listQuery.page;
    //   this.search.size = this.listQuery.size;
    //   search(this.search);
    //   this.$http({
    //     url: this.$http.adornUrl("/account/search"),
    //     method: "post",
    //     data: this.search,
    //   })
    //     .then((response) => {
    //       this.accountList = response.data.list;
    //       this.total = response.data.total;
    //       this.listLoading = false;
    //       this.btnLoading = false;
    //     })
    //     .catch((res) => {
    //       this.$message.error("搜索失败");
    //     });
    // },
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
      this.tmpAccount.name = "";
      this.tmpAccount.rtspUrl = "";
      this.tmpAccount.serialNumber = "";
    },
    /**
     * 添加用户
     */
    addAccount() {
      this.$refs.tmpAccount.validate((valid) => {
        if (valid && this.isUniqueDetail(this.tmpAccount)) {
          this.btnLoading = true;
          this.$http
            .post("system/cameraInfo/save", this.tmpAccount)
            .then(() => {
              this.$message.success("添加成功");
              this.getAccountList();
              this.dialogFormVisible = false;
              this.btnLoading = false;
            })
            .catch((res) => {
              this.$message.error("添加账户失败");
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
      this.tmpAccount.serialNumber = this.accountList[index].serialNumber;
      this.tmpAccount.name = this.accountList[index].name;
      this.tmpAccount.rtspUrl = this.accountList[index].rtspUrl;
    },
    /**
     * 更新用户
     */
    updateAccount() {
      updateAccount(this.tmpAccount);

      this.$http({
        url: this.$http.adornUrl("/account/" + this.tmpAccount.Id),
        method: "put",
        data: accountForm,
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
      this.tmpAccount.serialNumber = this.accountList[index].serialNumber;
      this.tmpAccount.name = this.accountList[index].name;
      this.tmpAccount.rtspUrl = this.accountList[index].rtspUrl;
    },
    /**
     * 更新用户角色
     */
    updateAccountRole() {
      updateAccountRole(this.tmpAccount)
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
     * 用户资料是否唯一
     * @param account 用户
     */
    isUniqueDetail(account) {
      for (let i = 0; i < this.accountList.length; i++) {
        if (this.accountList[i].name === account.name) {
          this.$message.error("账户名已存在");
          return false;
        }
      }
      return true;
    },
    /**
     * 删除用户
     * @param index 用户下标
     */
    removeAccount(id) {
      this.$confirm("删除该布点信息？", "警告", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      })
        .then(() => {
          this.$http.get("system/cameraInfo/remove?id="+id).then(() => {
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