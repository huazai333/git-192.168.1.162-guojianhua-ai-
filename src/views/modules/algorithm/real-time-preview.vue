<template>
  <div class="app-container">
    <div class="filter-container">
      <el-main>
        <div class="center">
          <div class="center_left">
            <el-card style="height: 100%">
              <div slot="header" class="clearfix">
                <span style="font-size: 20px; font-weight: bold">布点设备</span>
              </div>

              <div
                class="item_list text item"
                v-for="item in options"
                :key="item.id"
              >
                <!-- <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                    :rtsp="item.rtspUrl"
                    :time="item.time"
                    @click.native="handleChange(item)"
                  >
                  </el-option>
                </el-select> -->

                <el-radio
                  v-model="radio"
                  :value="item.name"
                  :rtsp="item.rtspUrl"
                  :label="item.name"
                  @input="handleChange(item)"
                  >{{ item.name }}</el-radio
                >

                <el-row v-if="cameraId === item.id">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="开启算法"
                    placement="top-start"
                  >
                    <el-button
                      type="primary"
                      icon="el-icon-video-play"
                      circle
                      @click="open()"
                      style="border-radius: 5px"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="暂停算法"
                    placement="top-start"
                  >
                    <el-button
                      type="danger"
                      style="border-radius: 5px"
                      icon="el-icon-video-pause"
                      circle
                      @click="pause()"
                    >
                    </el-button>
                  </el-tooltip>
                </el-row>
              </div>
            </el-card>
          </div>
          <div class="center_mid">
            <el-card style="height: 100%">
              <div slot="header" class="clearfix">
                <span style="font-size: 20px; font-weight: bold">实时预览</span>
              </div>
              <div style="transform: translateY(-10px)">
                <el-button
                  type="success"
                  v-for="item in taskList"
                  :key="item.id"
                  >{{ item.type }}</el-button
                >
              </div>
              <div class="text item">
                <el-card shadow="never" class="aui-card--fill">
                  <div>
                    <video-control
                      ref="videoControl"
                      :msg="rtspUrl"
                    ></video-control>
                  </div>
                </el-card>
              </div>
            </el-card>
          </div>
          <div class="center_right">
            <el-card style="height: 100%">
              <div slot="header" class="clearfix">
                <span style="font-size: 20px; font-weight: bold">预警信息</span>
              </div>
              <div
                class="text item"
                v-for="item in waringList"
                :key="item.id"
              >
                <el-card>
                  <div class="alarmItem">
                    <img :src="item.alarmbjImg" />
                    <div class="word">
                      <p>
                        预警类型:<el-tag type="danger">{{
                          item.alarmRemark
                        }}</el-tag>
                      </p>
                      <p>预警时间:{{ item.alarmTime }}</p>
                      <p>摄像头名称:{{ item.alarmCamera }}</p>
                    </div>
                  </div>
                </el-card>
              </div>
            </el-card>
          </div>
        </div>
      </el-main>
    </div>
  </div>
</template>

<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
<script>
import { mapGetters } from "vuex";
import videoControl from "./video-control";
export default {
  components: {
    videoControl,
  },
  data() {
    return {
      radio: "",
      vdieoimg: "",
      cameraId: "",
      path: "",
      waringList: [],
      currentPicture: "",
      rtspUrl: "",
      waringData: [
        { name: "抽烟预警", path: "", time: "", bkname: "生产车间" },
      ],
      checkList: [],
      options: [],
      value: "",
      filterText: "",
      count: "",
      vedios: [],
      websocket: "",
      data: [
        {
          id: 1,
          label: "大院值班室",
        },
        {
          id: 2,
          label: "总装生产车间",
        },
        {
          id: 3,
          label: "南消防通道",
        },
        {
          id: 4,
          label: "北消防通道",
        },
      ],
      pageId: "",
      pageName: "",
      pageVideo: "",
      taskList: [],
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.createWs();
    // this.getCounts();
  },

  mounted() {
    // 获取设备
    this.test();
  },
  computed: {
    ...mapGetters(["accountId"]),
    new() {
      return Date().now();
    },
  },

  methods: {
    open() {
      if (
        this.cameraId === "" ||
        this.cameraId === null ||
        this.cameraId === undefined
      ) {
        this.$message.error("请先选择设备");
      } else {
        var cameraId = this.cameraId;
        this.$http({
          url: "system/cameraPreview/open",
          method: "get",
          params: { cameraId },
        })
          .then((response) => {
            this.$message.success("开启算法");
          })
          .catch((res) => {
            this.$message.error("开启算法失败！");
          });
      }
    },
    pause() {
      if (
        this.cameraId === "" ||
        this.cameraId === null ||
        this.cameraId === undefined
      ) {
        this.$message.error("请先选择设备");
      } else {
        var cameraId = this.cameraId;
        this.$http({
          url: "system/cameraPreview/pause",
          method: "get",
          params: { cameraId },
        })
          .then((response) => {
            this.$message.success("暂停算法");
          })
          .catch((res) => {
            this.$message.error("暂停算法失败！");
          });
      }
    },
    handleChange(val) {
      this.pageId = val.id;
      this.cameraId = val.id;
      this.rtspUrl = val.rtspUrl;
      //   this.pageVideo = val.rtsp;
      //   this.rtspUrl = val.rtspUrl;
      //   var vlc = document.getElementById("vlc_back");
      //   var idd = vlc.playlist.add(this.rtspUrl);
      //   vlc.playlist.playItem(idd);
      //   this.cameraId = val.id;
      //   this.openVideo(this.pageId);
      this.getTaskist(this.pageId);

      //   this.startVideo();
      //   播放视频
      this.$refs.videoControl.startVideo(this.rtspUrl);
    },
    startVideo() {
      setInterval(this.valChange, 90); // 注意: 第一个参数为方法名的时候不要加括号;
    },
    valChange() {
      var url =
        "http://" +
        window.location.hostname +
        ":8080/img/" +
        this.pageId +
        ".jpg?" +
        Date.now();
      var ajax = new XMLHttpRequest();
      ajax.open("GET", url, true);
      ajax.send("");
      ajax.onreadystatechange = function () {
        if (ajax.status === 200) {
          document.getElementById("img").setAttribute("src", url);
        }
      };
      //this.vdieoimg = "http://" + window.location.hostname + ":8080/img/" + this.pageId + ".jpg?" + Date.now();
      //this.vdieoimg="http://"+window.location.hostname+":8080/img/show.jpg?"+Date.now();
    },
    openVideo(id) {
      getVideo(id);
      this.$http({
        url: "/algorithmInfo/getCameraAlgorithmTaskList",
        method: "get",
        params: { id },
      })
        .then((response) => {
          this.startVideo();
          this.$message.success("开启预览");
        })
        .catch((res) => {
          this.$message.error("加载数据失败！");
        });
    },
    getTaskist(cameraId) {
      //   getAndState(id);
      this.$http({
        url: "system/algorithmInfo/getCameraAlgorithmTaskList",
        method: "get",
        params: { cameraId },
      })
        .then((res) => {
          this.taskList = res.data.data;

          for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].type == "smoke") {
              this.taskList[i].type = "烟雾检测";
            } else if (this.taskList[i].type == "helmet") {
              this.taskList[i].type = "安全帽检测";
            } else if (this.taskList[i].type == "mask") {
              this.taskList[i].type = "戴口罩检测";
            } else if (this.taskList[i].type == "fire") {
              this.taskList[i].type = "火焰检测";
            } else if (this.taskList[i].type == "glove") {
              this.taskList[i].type = "手套检测";
            } else if (this.taskList[i].type == "personCnt") {
              this.taskList[i].type = "人流检测";
            } else if (this.taskList[i].type == "fall") {
              this.taskList[i].type = "跌倒检查";
            } else if (this.taskList[i].type == "leave") {
              this.taskList[i].type = "离岗检测";
            } else if (this.taskList[i].type == "sleep") {
              this.taskList[i].type = "睡岗检测";
            } else if (this.taskList[i].type == "phone") {
              this.taskList[i].type = "打电话检查";
            } else if (this.taskList[i].type == "reflective") {
              this.taskList[i].type = "反光衣检测";
            } else if (this.taskList[i].type == "electromobile") {
              this.taskList[i].type = "电瓶车检查";
            }
          }
        })
        .catch((res) => {
          this.$message.error("加载数据失败！");
        });
    },
    getCounts() {
      this.$http({
        url: "/configure/count/",
        method: "get",
      })
        .then((response) => {
          this.count = response.data;
        })
        .catch((res) => {
          this.$message.error("暂无数据");
        });
    },
    //获取设备
    test() {
      this.$http({
        url: "system/cameraInfo/getCameraInfoList",
        method: "get",
      })
        .then((res) => {
          this.options = res.data.data;

          setTimeout(function () {
            if (res.data.data.length > 0) {
              this.value = res.data.data[0].id;
              //this.handleChange(response.data[0])
            }
          }, 500);
        })
        .catch((res) => {
          this.$message.error("暂无数据");
        });
    },
    jump(id) {
      /*    alert(window.location.hostname);
        alert(window.location.host);*/
      this.$router.push({
        name: "算法配置",
        query: { resData: id, url: this.pageVideo },
      });
      /*        get(id).then((res) => {
                this.$router.push({ name:'算法配置',params: { resData: res.data }})
            })*/
    },
    createWs() {
      // 判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        // this.websocket = new WebSocket('ws://' + document.location.host + '/websocket/' + this.token)
        // this.websocket = new WebSocket(
        // //   "ws://" + window.location.hostname + ":8080/system/websocket"
        // "ws://192.168.62.182:8080/system/websocket"
        // );
        this.websocket = new WebSocket("ws://192.168.62.182:8080/system/web");
        console.log("连接----------------------------------成功");
        //this.websocket = new WebSocket('ws://192.168.1.99:8098/websocket')
      } else {
        alert("当前浏览器 Not support websocket");
      }

      // 连接发生错误的回调方法
      this.websocket.onerror = function () {
        console.log("失败");
        // setMessageInnerHTML('WebSocket连接发生错误')
      };

      // 连接成功建立的回调方法
      this.websocket.onopen = function (e) {
        console.log(e, "成功");
      };

      // 接收到消息的回调方法
      this.websocket.onmessage = (event) => {
        console.log(event);
        const jsonObj = JSON.parse(event.data);
        this.waringList.unshift(jsonObj);
        console.log(jsonObj);
        if (this.waringList.length > 5) {
          this.waringList.splice(5, 1);
        }
        this.$http({
          url: "system/yxyTest/save",
          method: "post",
          data: jsonObj,
        }).then((response) => {
          if (response.code === 0) {
          }
        });
        // }
      };

      // 连接关闭的回调方法
      this.websocket.onclose = function () {
        // setMessageInnerHTML('WebSocket连接关闭')
      };

      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function () {
        this.closeWebSocket();
      };
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    /*      fullScreen (vedios) {
        vedios.forEach(item => {
            var vlc = document.getElementById("vlc")
            vlc.video.aspectRatio = '16:10' // 设置比例
            vlc.playlist.playItem(item.rtsp) // 重新加载
        })
        },*/
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    passStatus(index) {
      this.$router.push({ name: "map", query: { type: 2, value: index } });
    },
    /**
     * 获取锁列表
     */
    getLockList() {
      this.listLoading = true;
      this.$http({
        url: "/yq/touch/device",
        method: "get",
        params: this.listQuery,
      })
        .then((response) => {
          this.accountList = response.data.records;
          this.total = response.data.total;
          this.listLoading = false;
        })
        .catch((res) => {
          this.$message.error("加载数据失败！");
        });
    },
    searchBy() {
      this.btnLoading = true;
      this.listLoading = true;
      this.search.page = this.listQuery.page;
      this.search.size = this.listQuery.size;
      this.$http({
        url: "/yq/in/device",
        method: "get",
        params: this.search,
      })
        .then((response) => {
          this.accountList = response.data.list;
          this.total = response.data.total;
          this.listLoading = false;
          this.btnLoading = false;
        })
        .catch((res) => {
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
      this.getLockList();
    },
    /**
     * 改变页码
     * @param page 页号
     */
    handleCurrentChange(page) {
      this.listQuery.page = page;
      this.getLockList();
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
      this.tmpAccount.email = "";
      this.tmpAccount.name = "";
      this.tmpAccount.password = "";
    },
    /**
     * 显示修改用户对话框
     * @param index 用户下标
     */
    toDevice(index) {
      const carNum = this.accountList[index].carNum;
      this.$router.push({
        name: "device",
        params: {
          carNum: carNum,
        },
      });
    },
    toVideo(index) {
      const carId = this.accountList[index].id;
      this.$router.push({
        name: "video",
        params: {
          carId: carId,
        },
      });
    },
    /**
     * 更新用户
     */
    updateAccount() {
      updateAccount(this.tmpAccount)
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
      this.tmpAccount.accountId = this.accountList[index].id;
      this.tmpAccount.email = this.accountList[index].email;
      this.tmpAccount.name = this.accountList[index].name;
      this.tmpAccount.password = "";
      this.tmpAccount.roleId = this.accountList[index].roleId;
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
        if (this.accountList[i].email === account.email) {
          this.$message.error("邮箱已存在");
          return false;
        }
      }
      return true;
    },
  },
};
</script>

<style lang="scss">
.el-scrollbar__view {
  height: 100%;
}
</style>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  .filter-container {
    height: 100%;
    .el-main {
      height: 100%;
    }
  }
}
.center {
  display: flex;
  height: 100%;
  justify-content: space-between;
  .center_left {
    flex: 2;
    .item_list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
    }
  }
  .center_mid {
    flex: 7;
  }
  .center_right {
    flex: 3;
    .alarmItem {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      img {
        flex: 1;
        width: 60px;
      }
      .word {
        padding-left: 10px;
        flex: 4;
        p {
          line-height: 35px;
          font-size: 16px;
          color: #333;
        }
      }
    }
  }
}
</style>