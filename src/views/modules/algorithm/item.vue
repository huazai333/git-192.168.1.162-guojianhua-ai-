<template>
  <div class="center">
    <el-card class="center_left">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
      </div>
      <div class="text item" style="width: 100%">
        <el-form
          :model="dataForm2"
          ref="tmpAccount"
          status-icon
          class="small-space"
          label-position="left"
          label-width="130px"
          style="width: 500px; margin-left: 50px"
        >
          <el-form-item v-if="showEl == true">
            <el-switch
              v-model="dataForm2.cameraId"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-switch
              v-model="dataForm2.state"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="inputUrl" hidden>
            <el-input
              type="text"
              style="width: 47%"
              v-model="dataForm2.inputUrl"
            />
          </el-form-item>
          <el-form-item label="睡岗判断阈值" v-if="type == 'sleep'">
            <el-input type="text" style="width: 47%" v-model="dataForm2.var" />
          </el-form-item>
          <el-form-item label="检测框置信度">
            <el-input type="text" style="width: 47%" v-model="dataForm2.conf" />
          </el-form-item>
          <el-form-item label="目标置信度">
            <el-input type="text" style="width: 47%" v-model="obj" />
          </el-form-item>
          <el-form-item label="极大值抑制阈值">
            <el-input type="text" style="width: 47%" v-model="dataForm2.iou" />
          </el-form-item>
          <el-form-item label="指定TPU">
            <el-input
              type="text"
              style="width: 47%"
              v-model="dataForm2.devId"
            />
          </el-form-item>
          <el-form-item label="消防通道拥堵时间" v-if="type == 'xf'">
            <el-input
              type="text"
              style="width: 47%"
              v-model="dataForm2.ydTime"
            />
          </el-form-item>
          <el-form-item label="离岗时间" v-if="type == 'leave'">
            <el-input
              type="text"
              style="width: 47%"
              v-model="dataForm2.lgTime"
            />
          </el-form-item>
          <el-form-item label="限制人数" v-if="type == 'personNumber'">
            <el-input
              type="text"
              style="width: 47%"
              v-model="dataForm2.personNumber"
            />
          </el-form-item>
          <el-form-item label="抽帧间隔">
            <el-input
              type="text"
              style="width: 47%"
              v-model="dataForm2.czTime"
            />
          </el-form-item>
          <el-form-item label="睡岗间隔时间" v-if="type == 'sleep'">
            <el-input
              type="text"
              style="width: 47%"
              v-model="dataForm2.jgTime"
            />
          </el-form-item>

          <el-form-item>
            <el-button @click="submit(dataForm2)">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="center_right">
      <div class="img-box">
        <div id="pic" ref="pic">
          <img :src="imagePath" alt="" />
          <canvas id="myCanvas"></canvas>
        </div>
      </div>
      <div class="btn_more">
        <!-- <el-button type="success">创建识别规则</el-button> -->
        <el-button type="danger" class="delLine" @click="delLine()"
          >重置识别区域</el-button
        >
        <!-- <el-button type="primary">保存识别规则</el-button> -->
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imagePath: "http://192.168.1.99:8080/img/15.jpg?1683682408433",
      showEl: false,
      title: "抽烟检测",
      type: "smog",
      cameraId: "",
      algorithmId:"",
      rtspUrl: "",
      id: "",
      obj: "0.7",
      dataForm2: {
        cameraId: "",
        algorithmId: "",
        name: this.title,
        inputUrl: "rtsp://admin:admin@192.168.1.103:8557/h264",
        type: this.type,
        var: "50",
        conf: "0.5",
        iou: "0.7",
        pointList: [
          {
            x: 289,
            y: 289,
          },
          {
            x: 300,
            y: 429,
          },
          {
            x: 458,
            y: 558,
          },
          {
            x: 224,
            y: 341,
          },
        ],
        ydTime: "5",
        lgTime: "1",
        jgTime: "2000",
        czTime: "7",
        sleepTime: "500",
        personNumber: "1",
        devId: "cuda:6",
        state: "0",
        sleepTime: "500",
        personNumber: "1",
      },

      // 画布
      canvas: null,
      // 画布上下文
      ctx: null,
      pointList: [],

      // 绘制矩形存放点
      rectList: [],

      // 当前绘制的矩形点
      curRectPoint: {},

      curRectPointsArr: [],

      startDrawRect: false,

      startMoveRect: false,

      arcInfo: {
        radius: 5,
        curPointColor: "#ff0000",
        pointColor: "blue",
      },
      isPolygonPointExist: false,
      curMovePoint: {}, // 当前移动点的坐标

      curMovePointIndex: 0, // 当前移动点的下标

      curMoveRectPointList: [], // 当前移动的矩形坐标数组

      startResizeRect: false,

      curResizePointIndex: 0,

      curResizeRectPointList: [], // 当前改变大小的矩形坐标数组
      drawType: "polygon",

      dotList: "",
      configure: [],
    };
  },
  name: "item",

  created() {},
  mounted() {
    this.init("myCanvas");

    this.drawCanvasBgRect();

    this.initCanvasEvent();
  },
  methods: {
    delLine() {
      //this.getimge();
      this.pointList = [];
      this.dataForm2.pointList = [];
      this.init("myCanvas");

      this.drawCanvasBgRect();

      this.initCanvasEvent();
      // this.canvas.fillStyle = '#ffffff';
    },
    getConfigure() {
      console.log("执行了getConfigure");
      var cameraId = this.dataForm2.cameraId;
      this.$http
        .get("system/cameraInfo/getCameraTaskInfo?id=" + cameraId)
        .then((res) => {
          // console.log(res);
          if (res.data.code === 0) {
            this.configure = res.data.data.algorithmTaskVOList;

            this.initConfigure(this.type);
          }
        });
    },
    submit(dataForm) {
      this.$http({
        url: "system/cameraAlgorithmTask/saveOrUpdate",
        method: "post",
        data: dataForm,
      }).then((res) => {
        // console.log(res)
        if (res.data.code === 0) {
          this.$message.success("提交成功");
          this.getConfigure();
        }
      });
    },
    getTitle(type) {
      switch (type) {
        case "smoke":
          this.title = "抽烟检测";
          break;
        case "helmet":
          this.title = "安全帽检测";
          break;
        case "mask":
          this.title = "戴口罩检测";
          break;
        case "fire":
          this.title = "火焰检测";
          break;
        case "glove":
          this.title = "手套检测";
          break;
        case "personCnt":
          this.title = "人流检测";
          break;
        case "fall":
          this.title = "跌倒检查";
          break;
        case "leave":
          this.title = "离岗检测";
          break;
        case "sleep":
          this.title = "睡岗检测";
          break;
        case "phone":
          this.title = "打电话检查";
          break;
        case "reflective":
          this.title = "反光衣检测";
          break;
        case "electromobile":
          this.title = "电瓶车检查";
          break;
      }
    },
    initConfigure(type) {
      console.log("执行了initConfigure");
      this.init("myCanvas");
      this.drawCanvasBgRect();
      this.initCanvasEvent();
      this.pointList = [];
      this.configure.forEach((cof) => {
        if (cof.type === type) {
          let pointStrs = cof.pointList.match(/\((.+?)\)/g);
          let list = [];
          this.dataForm2 = { ...cof };
          console.log(this.dataForm2, this.dataForm2.algorithmId);
          pointStrs.forEach((item) => {
            let point = item.replace("(", "").replace(")", "").split(",");
            list.push({ x: parseInt(point[0]), y: parseInt(point[1]) });
          });
          this.dataForm2.pointList = [];
          //绘制多边形
          if (list.length > 1) {
            list.forEach((item) => {
              this.handleMouseDown({
                offsetX: item.x / 3,
                offsetY: item.y / 3,
              });
            });
          }
        }
      });
    },
    getimge(cameraId) {
      /* getImg(this.dataForm2.cameraId).then((response) => {
        console.log(response);
        if (response.code === 0) {
          this.imagePath=response.data;
          this.initConfigure(this.type);
        }
      });*/
      //   console.log("创建文件");
      this.imagePath =
        "http://" +
        window.location.hostname +
        ":8080/img/" +
        cameraId +
        ".jpg?" +
        Date.now();
    },
    openVideo(id) {
      this.$http({
        url: "system/algorithmInfo/getCameraAlgorithmTaskList",
        method: "get",
        params: { id },
      })
        .then((response) => {
          this.imagePath =
            "http://" +
            window.location.hostname +
            ":8080/img/" +
            id +
            ".jpg?" +
            Date.now();
        })
        .catch((res) => {
          this.$message.error("加载数据失败！");
        });
    },
    initTab(type, cameraId, url) {
      this.type = type;
      this.getTitle(type);
      this.dataForm2 = {
        algorithmId: "",
        name: this.title,
        inputUrl: "rtsp://admin:admin@192.168.1.103:8557/h264",
        type: type,
        var: "50",
        conf: "0.5",
        iou: "0.7",
        cameraId: cameraId,
        pointList: [
          {
            x: 289,
            y: 289,
          },
          {
            x: 300,
            y: 429,
          },
          {
            x: 458,
            y: 558,
          },
          {
            x: 224,
            y: 341,
          },
        ],
        ydTime: "5",
        lgTime: "1",
        jgTime: "2000",
        czTime: "7",
        sleepTime: "500",
        personNumber: "1",
        devId: "cuda:6",
        state: "0",
        sleepTime: "500",
        personNumber: "1",
      };
      this.getConfigure();
      this.openVideo(cameraId);
    },
    /* 检测绑定事件 */
    addHandler(ele, type, handler, _this) {
      try {
        if (typeof handler === `function`) {
          if (ele.addEventListener) {
            ele.addEventListener(
              type,
              (e) => {
                handler.call(_this, e);
              },
              false
            );
          } else if (ele.attachEvent) {
            ele.attachEvent(`on${type}`, (e) => {
              handler.call(_this, e);
            });
          } else {
            ele[`on${type}`] = handler;
          }
        }
      } catch (e) {
        // console.log(e);
      }
    },
    /* 通过removeHandler */
    removeHandler(ele, type, handler) {
      try {
        if (ele.removeEventListener) {
          ele.removeEventListener(type, handler, false);
        } else if (ele.deattachEvent) {
          ele.deattachEvent(`on${type}`, handler);
        } else {
          ele[`on${type}`] = null;
        }
      } catch (e) {
        // console.log(e);
      }
    },
    throttleDuration(method, delay, duration, _this) {
      let timer = null;
      let begin = new Date();

      return (...args) => {
        const context = _this;
        const current = new Date();
        clearTimeout(timer);
        if (current - begin >= duration) {
          method.apply(context, args);
          begin = current;
        } else {
          timer = setTimeout(() => {
            method.apply(context, args);
          }, delay);
        }
      };
    },
    // 随机生成颜色
    getRandomColor() {
      const colorValue = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        `a`,
        `b`,
        `c`,
        `d`,
        `e`,
        `f`,
      ];
      let s = `#`;
      for (let i = 0; i < 6; i++) {
        s += colorValue[Math.floor(Math.random() * 16)];
      }

      return s;
    },
    // 自定义合并对象
    merge(orgData, targetData) {
      for (const key in targetData) {
        if (typeof orgData[key] === `object`) {
          orgData[key] = this.merge(orgData[key], targetData[key]);
        } else if (Array.isArray(orgData[key])) {
          orgData[key] =
            typeof targetData[key] !== `undefined` && targetData[key].length > 0
              ? targetData[key]
              : orgData[key];
        } else {
          orgData[key] =
            typeof targetData[key] !== `undefined`
              ? targetData[key]
              : orgData[key];
        }
      }
      return orgData;
    },
    // 浅克隆
    clone(opts) {
      return JSON.parse(JSON.stringify(opts));
    },
    // 获取元素据浏览器左顶点的距离
    getPositionByElement(target) {
      let top = 0;
      let left = 0;
      while (target.offsetParent) {
        top += target.offsetTop;
        left += target.offsetLeft;
        target = target.offsetParent;
      }
      return {
        top,
        left,
      };
    },
    // 获取在dom元素上点击的坐标
    getPointOnEle(e) {
      e = e || window.event;
      return {
        x: e.offsetX,
        y: e.offsetY,
      };
    },
    // 通过偏移量和角度获取新的坐标点
    getPointByOffsetAndAngle(point = {}, offset = 0, angle = 0, dl = 1) {
      return {
        x: point.x + offset * dl * Math.sin((angle * Math.PI) / 180),
        y: point.y + offset * dl * Math.cos((angle * Math.PI) / 180),
      };
    },
    // 获取鼠标旋转角度
    getRotateByMouseMove(orgP, startP, endP) {
      const lengthAB = Math.sqrt(
        this.diffPow(orgP.x, startP.x) + this.diffPow(orgP.y, startP.y)
      );
      const lengthAC = Math.sqrt(
        this.diffPow(orgP.x, endP.x) + this.diffPow(orgP.y, endP.y)
      );
      const lengthBC = Math.sqrt(
        this.diffPow(startP.x, endP.x) + this.diffPow(startP.y, endP.y)
      );

      if (lengthAB === 0 || lengthAC === 0 || lengthBC === 0) {
        return 0;
      }
      const cosA =
        (this.pow(lengthAB) + this.pow(lengthAC) - lengthBC * lengthBC) /
        (2 * lengthAB * lengthAC);
      const angleA = (Math.acos(cosA) * 180) / Math.PI;
      if (
        (startP.x - orgP.x) * (endP.y - orgP.y) -
          (endP.x - orgP.x) * (startP.y - orgP.y) >
        0
      ) {
        return -angleA;
      }
      return angleA;
    },
    // 获取圆形的类正方形四个点
    getPointListByCircular(point, radius) {
      const dif = Math.sqrt(this.pow(radius) / 2);
      const pointList = [];
      pointList.push({
        x: point.x + dif,
        y: point.y - dif,
      });
      pointList.push({
        x: point.x + dif,
        y: point.y + dif,
      });
      pointList.push({
        x: point.x - dif,
        y: point.y + dif,
      });
      pointList.push({
        x: point.x - dif,
        y: point.y - dif,
      });

      return pointList;
    },
    // 计算一个数的平方
    pow(x) {
      return x * x;
    },
    // 计算两个数差值的平方
    diffPow(x, y) {
      return (x - y) * (x - y);
    },
    // 计算两个数和的平方
    sumPow(x, y) {
      return (x + y) * (x + y);
    },
    // 判断点是否在圆形内部
    inSideCircle(point, circle) {
      const r = circle.r || 0;
      if (r === 0) return false;
      const dx = circle.x - point.x;
      const dy = circle.y - point.y;
      return this.pow(dx) + this.pow(dy) <= this.pow(r);
    },
    // 判断点是否在多边形内部
    inSidePolygon(point, vs) {
      const { x, y } = point;
      let inside = false;
      for (let i = 0, len = vs.length, j = len - 1; i < len; j = i++) {
        const xi = vs[i].x;
        const yi = vs[i].y;
        const xj = vs[j].x;
        const yj = vs[j].y;
        const intersect =
          yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) {
          inside = !inside;
        }
      }
      return inside;
    },
    // 判断是否是有效坐标点
    isPoint(point = {}) {
      return (
        point.x !== undefined &&
        point.x !== null &&
        point.y !== undefined &&
        point.y !== null
      );
    },
    // 判断是否是相同的坐标点
    isSamePoint(point1 = {}, point2 = {}, dif = 2) {
      return (
        this.isPoint(point1) &&
        this.isPoint(point2) &&
        Math.abs(point1.x - point2.x) <= dif &&
        Math.abs(point1.y - point1.y) <= dif
      );
    },
    // 获取两点之间的中心点
    getCenterPoint(point1 = {}, point2 = {}) {
      return {
        x: this.filterToFixed(((point1.x || 0) + (point2.x || 0)) / 2),
        y: this.filterToFixed(((point1.y || 0) + (point2.y || 0)) / 2),
      };
    },
    // 获取做了偏移之后的新点坐标
    getSuperPoint(point = {}, diffPoint = {}) {
      return {
        x: this.filterToFixed((point.x || 0) + (diffPoint.x || 0)),
        y: this.filterToFixed((point.y || 0) + (diffPoint.y || 0)),
      };
    },
    // 计算两个坐标点之间的偏移量
    getDiffByTwoPoint(point1 = {}, point2 = {}) {
      return {
        x: this.filterToFixed((point1.x || 0) - (point2.x || 0)),
        y: this.filterToFixed((point1.y || 0) - (point2.y || 0)),
      };
    },
    // 获取滚轮的方向属性
    getWheelDelta(e) {
      let delta;
      if (e.wheelDelta) {
        // IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
        delta = e.wheelDelta / 120;
        // 因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
        if (e.opera) delta = -delta;
      } else if (e.detail) {
        // FF浏览器使用的是detail,其值为“正负3”
        delta = -e.detail / 3;
      }
      return {
        delta,
        type: delta > 0 ? 1 : -1,
      };
    },
    filterToFixed(num, n = 2) {
      try {
        return parseFloat(num.toFixed(n), 10);
      } catch (e) {
        return num;
      }
    },
    // 初始化

    init(id) {
      this.canvas = document.getElementById(id);
      this.canvas.width = 640;
      this.canvas.height = 360;
      this.ctx = document.getElementById(id).getContext(`2d`);
    },

    // 绘制canvas背景
    drawCanvasBgRect() {
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = "rgba(0,0,0,0)";
      //   this.ctx.globalAlpha = 0;
      this.ctx.fill();
      this.ctx.closePath();
    },

    // 初始化鼠标事件
    initCanvasEvent() {
      this.addHandler(this.canvas, `mousedown`, this.handleMouseDown, this);

      this.addHandler(this.canvas, `mousemove`, this.handleMouseMove, this);

      this.addHandler(this.canvas, `mouseup`, this.handleMouseUp, this);
    },

    // 鼠标按下
    handleMouseDown(e) {
      e = e || window.event;
      const point = this.getPointOnEle(e, this.canvas);

      // 绘制多边形
      if (this.drawType === "polygon") {
        this.delDrawPolygonInfoData(point);
      }

      // 绘制矩形
      if (this.drawType === "rect") {
        this.delDealRectInfoData(point);
      }
    },

    // 鼠标移动
    // handleMouseMove(e) {
    //   e = e || window.event;
    //   const point = this.getPointOnEle(e, this.canvas);

    //   if (this.drawType === "polygon") {
    //     // 如果没有选中关键点，则直接返回
    //     if (!this.isPolygonPointExist) {
    //       return;
    //     }
    //     this.pointList.splice(this.curMovePointIndex, 1, point);
    //     this.drawPolygon();
    //     this.drawPolygonKeyPoints();
    //   }

    //   // 矩形
    //   if (this.drawType === "rect") {
    //     let stPoint = this.curRectPoint;

    //     if (this.startDrawRect) {
    //       // 绘制新矩形
    //       let pointsArr = [];
    //       pointsArr.push(stPoint);
    //       pointsArr.push(new Point({ x: point.x, y: stPoint.y }));
    //       pointsArr.push(point);
    //       pointsArr.push(new Point({ x: stPoint.x, y: point.y }));

    //       this.curRectPointsArr = pointsArr;

    //       this.drawRectInfo(stPoint, pointsArr);
    //       this.drawRectKeyPoints(pointsArr);
    //     }

    //     if (this.startMoveRect) {
    //       // 移动矩形
    //       let points = this.clone(this.curRectPointsArr);

    //       let offsetX = point.x - stPoint.x;
    //       let offsetY = point.y - stPoint.y;

    //       points.forEach((item) => {
    //         item.x = item.x + offsetX;
    //         item.y = item.y + offsetY;
    //       });

    //       this.curMoveRectPointList = points;

    //       this.drawRectInfo(points[0], points);
    //       this.drawRectKeyPoints(points);
    //     }

    //     if (this.startResizeRect) {
    //       // 移动矩形
    //       let points = this.clone(this.curRectPointsArr);
    //       let stPoint = [];
    //       if (this.curResizePointIndex == 0) {
    //         stPoint = points[2];
    //       } else if (this.curResizePointIndex == 1) {
    //         stPoint = points[3];
    //       } else if (this.curResizePointIndex == 2) {
    //         stPoint = points[0];
    //       } else if (this.curResizePointIndex == 3) {
    //         stPoint = points[1];
    //       }

    //       let pointsArr = [];
    //       pointsArr.push(stPoint);
    //       pointsArr.push(new Point({ x: point.x, y: stPoint.y }));
    //       pointsArr.push(point);
    //       pointsArr.push(new Point({ x: stPoint.x, y: point.y }));

    //       this.curResizeRectPointList = pointsArr;

    //       this.drawRectInfo(pointsArr[0], pointsArr);
    //       this.drawRectKeyPoints(pointsArr);
    //     }
    //   }
    // },

    // 鼠标按起
    handleMouseUp(e) {
      this.isPolygonPointExist = false;
      this.curMovePoint = {};
      this.curMovePointIndex = 0;

      if (this.drawType === "rect") {
        // 如果是绘制矩形
        if (this.startDrawRect) {
          if (this.curRectPointsArr.length > 0) {
            this.rectList.push(this.curRectPointsArr);
          }
        }

        // 如果是移动矩形
        if (this.startMoveRect) {
          this.rectList.push(this.curMoveRectPointList);
        }

        // 如果是移动矩形
        if (this.startResizeRect) {
          this.rectList.push(this.curResizeRectPointList);
        }

        // console.log(this.rectList);

        this.startDrawRect = false;
        this.startMoveRect = false;
        this.startResizeRect = false;

        this.curRectPoint = {};
        this.curMoveRectPointList = [];
        this.curResizeRectPointList = [];
        this.curResizePointIndex = 0;
      }
    },

    // 处理多边形绘制数据
    delDrawPolygonInfoData(point) {
      for (let index = 0; index < this.pointList.length; index++) {
        let item = this.pointList[index];
        if (
          Math.abs(item.x - point.x) < this.arcInfo.radius &&
          Math.abs(item.y - point.y) < this.arcInfo.radius
        ) {
          this.isPolygonPointExist = true;
          this.curMovePoint = item;
          this.curMovePointIndex = index;
          return;
        }
      }
      this.isPolygonPointExist = false;
      this.pointList.push(point);
      this.drawPolygon();
      this.drawPolygonKeyPoints();

      //this.dataForm2.pointList = this.pointList;
      this.dataForm2.pointList.push({ x: point.x * 3, y: point.y * 3 });

      //   console.log(this.dataForm2.pointList);
    },

    delDealRectInfoData(point) {
      this.curRectPoint = point;

      // 判断当前鼠标是否在已绘制的矩形框内，如果是，则拖动当前矩形框
      if (this.rectList.length > 0) {
        // 判断移动矩形
        for (let index = 0; index < this.rectList.length; index++) {
          let pointList = this.rectList[index];
          const isGraphicalInSide = this.inSidePolygon(point, pointList);

          if (isGraphicalInSide) {
            this.startMoveRect = true;
            this.curRectPointsArr = this.rectList.splice(index, 1)[0];
            return;
          }
        }

        // 判断 拖动顶点，改变矩形形状
        for (let index = 0; index < this.rectList.length; index++) {
          let pointList = this.rectList[index];

          for (let sindex = 0; sindex < pointList.length; sindex++) {
            let item = pointList[sindex];
            if (
              Math.abs(item.x - point.x) < this.arcInfo.radius &&
              Math.abs(item.y - point.y) < this.arcInfo.radius
            ) {
              this.startResizeRect = true;
              this.curResizePointIndex = sindex;
              this.curRectPointsArr = this.rectList.splice(index, 1)[0];
              return;
            }
          }
        }
      }
      this.startDrawRect = true;
    },

    drawRectInfo(stPoint, pointArr) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.drawRect(stPoint, pointArr);

      if (this.rectList.length > 0) {
        this.rectList.forEach((item, index) => {
          this.drawRect(item[0], item);
        });
      }
    },

    drawRect(stPoint, pointArr) {
      this.ctx.beginPath();
      this.ctx.lineWidth = "1";
      this.ctx.moveTo(stPoint.x, stPoint.y);
      pointArr.forEach((item, index) => {
        if (index > 0) {
          this.ctx.lineTo(item.x, item.y);
        }
      });

      this.ctx.lineTo(stPoint.x, stPoint.y);
      this.ctx.strokeStyle = "#000";
      this.ctx.stroke();
      this.ctx.closePath();
    },

    // 当前绘制对象对矩形时，绘制的关键点
    drawRectKeyPoints(pointList) {
      pointList.forEach((item) => {
        this.drawArc(item.x, item.y, this.arcInfo.pointColor);
      });
      if (this.rectList.length > 0) {
        this.rectList.forEach((points, index) => {
          points.forEach((point) => {
            this.drawArc(point.x, point.y, this.arcInfo.pointColor);
          });
        });
      }
    },

    // 绘制多边形
    drawPolygon() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.strokeStyle = "#000";
      this.ctx.beginPath();
      this.ctx.moveTo(this.pointList[0].x, this.pointList[0].y);
      for (var i = 1; i < this.pointList.length; i++) {
        this.ctx.lineTo(this.pointList[i].x, this.pointList[i].y);
      }
      this.ctx.closePath();
      this.ctx.stroke();
    },

    // 绘制多边形的关键点
    drawPolygonKeyPoints() {
      if (this.pointList.length === 0) {
        return;
      }

      let pointList = this.pointList.slice(0);

      // 如果是移动关键点，则点绘制统一的颜色
      if (!this.isPolygonPointExist) {
        let curPoint = pointList.pop();
        // 绘制当前点
        this.drawArc(curPoint.x, curPoint.y, this.arcInfo.curPointColor);
      }

      pointList.forEach((item) => {
        this.drawArc(item.x, item.y, this.arcInfo.pointColor);
      });
    },

    // 绘图圆点
    drawArc(x, y, color) {
      this.ctx.beginPath();
      this.ctx.fillStyle = color;
      this.ctx.arc(x, y, this.arcInfo.radius, 0, 2 * Math.PI, false);
      this.ctx.fill();
      this.ctx.closePath();
    },
  },
};
</script>

<style lang="scss" scoped>
.center{
    display: flex;
    justify-content: space-between;
    .center_left{
        flex: 1;
    }
    .center_right{
        flex: 1;
        margin-top: 0 !important;
    }
}
</style>
