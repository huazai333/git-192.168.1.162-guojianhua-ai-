<template>
  <div class="app-container">
    <div>
      <el-button type="primary" @click.native.prevent="showAddAccountDialog"
        >新增算法</el-button
      >
    </div>
    <div class="card_list">
      <div class="card" v-for="item in dataList" :key="item.id">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{ item.name }}</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="goDetail(item.alarmCode)">查看更多</el-button>
            </div>
          <!-- <div slot="header">
            {{ item.createTime }}
            <div>
              <span style="margin-right: 10px">{{ item.name }}</span>
              <el-button
                v-if="item.isDeleted == 0"
                size="mini"
                type="primary"
                icon="el-icon-loading"
                circle
              ></el-button>
              <el-button
                v-else
                size="mini"
                type="warning"
                icon="el-icon-close"
                circle
              ></el-button>
            </div>
            <el-button type="text" @click="goDetail(item.alarmCode)"
              >数据总数：{{ item.quantity }}条</el-button
            >
          </div> -->
          <div class="word">
            <div class="text item">
            启动时间：{{ item.createTime }}
          </div>
          <div class="text item">
            运行状态：
            <el-button
                v-if="item.isDeleted == 0"
                size="mini"
                type="primary"
                icon="el-icon-loading"
                circle
              ></el-button>
              <el-button
                v-else
                size="mini"
                type="warning"
                icon="el-icon-close"
                circle
              ></el-button>
          </div>
          <div class="text item">
            数据总数：<span>{{ item.quantity }}</span>条
          </div>
          <div class="text item introduce">
           <div class="tit">功能描述：</div> 
           <div class="introduce">{{ item.introduce }}</div>
          </div>
          </div>
        </el-card>
      </div>
    </div>

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
        <el-form-item label="算法名称" prop="name">
          <el-input
            v-model="tmpAccount.name"
            type="text"
            prefix-icon="el-icon-edit"
            auto-complete="off"
            :disabled="dialogStatus === 'updateRole'"
          />
        </el-form-item>
        <el-form-item label="算法介绍" prop="introduce">
          <el-input
            v-model="tmpAccount.introduce"
            type="text"
            prefix-icon="el-icon-edit"
            auto-complete="off"
            :disabled="dialogStatus === 'updateRole'"
          />
        </el-form-item>
        <el-form-item label="算法编号" prop="code">
          <el-input
            v-model="tmpAccount.code"
            type="text"
            prefix-icon="el-icon-edit"
            auto-complete="off"
            :disabled="dialogStatus === 'updateRole'"
          />
        </el-form-item>
        <el-form-item label="编码类型" prop="alarmCode">
          <el-input
            v-model="tmpAccount.alarmCode"
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
export default {
  data() {
    return {
      dataList: [],
      dialogFormVisible: false,
      dialogStatus: "add",
      textMap: {
        updateRole: "修改账号角色",
        update: "修改账号",
        add: "添加服务",
      },
      btnLoading: false, // 按钮等待动画
      tmpAccount: {
        type: "ALGORITHM_TASK",
        code: "",
        name: "",
        alarmCode: "",
        introduce: "",
      },
      createRules: {
        code: [
          {
            required: true,
            trigger: "blur",
            pattern: /^[A-Za-z]+$/,
            message: "请输入英文字母",
          },
        ],
        name: [{ required: true, trigger: "blur",message: "必填", }],
        alarmCode: [
          {
            required: true,
            trigger: "blur",
            pattern: /^[0-9]*$/,
            message: "请输入数字",
          },
        ],
        introduce: [{ required: true, trigger: "blur",
        message: "必填", }],
      },
    };
  },
  created() {
    this.getList();
  },
  computed: {},
  methods: {
    // 获取列表
    getList() {
      this.$http({
        url: "/system/dict/selectListDict",
        method: "get",
      }).then((res) => {
        this.dataList = res.data.data;
      });
    },
    // 去往详情页
    goDetail(alarmCode) {
      this.$router.push({
        name: "data-configuration",
        query: { resData: alarmCode },
      });
    },
    // 新增按钮

    showAddAccountDialog() {
      // 显示新增对话框
      this.dialogFormVisible = true;
      this.dialogStatus = "add";
      this.tmpAccount.code = "";
      this.tmpAccount.name = "";
      this.tmpAccount.alarmCode = "";
      this.tmpAccount.introduce = "";
    },
    // 判断唯一
     isUniqueDetail(account) {
      for (let i = 0; i < this.dataList.length; i++) {
        if (this.dataList[i].code === account.code) {
          this.$message.error("该算法编号已存在");
          return false;
        }
        if (this.dataList[i].alarmCode === account.alarmCode) {
          this.$message.error("该编码类型已存在");
          return false;
        }
      }
      return true;
    },
    // 新增算法
        addAccount() {
      this.$refs.tmpAccount.validate((valid) => {
        if (valid && this.isUniqueDetail(this.tmpAccount)) {
          this.btnLoading = true;
          this.$http({
            url: "system/dict/saveDataDict",
            method: "post",
            data: this.tmpAccount,
          })
            .then(() => {
              this.$message.success("添加成功");
              this.getList();
              this.dialogFormVisible = false;
              this.btnLoading = false;
            })
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 10px;
  .card_list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .card {
      width: 25%;
      padding: 10px 2px;
      .el-card__header {
        // > div {
        //   display: flex;
        //   justify-content: space-between;
        //   align-items: center;
        // }
      }
      .el-card__body {
        padding: 0 !important;
        .word{

        height: 180px;
        }
        .text.item{
            margin-bottom: 20px;
            span{
                font-size: 18px;
                color: #17B3A3;
            }
        }
        .text.item.introduce{
            display: flex;
            justify-content: flex-start;
            .tit{
            }
            .introduce{
                flex: 5;
            }
        }
      }
    }
  }
}
</style>