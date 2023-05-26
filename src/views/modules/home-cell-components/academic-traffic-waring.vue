<template>
  <div class="academic-traffic">
    <div class="body">
      <div class="topList">
        <div class="tapp">
          <div class="tLeft">
            <img src="../../../assets/img/center-details-data1.png" alt="" />
          </div>
          <div class="tRight">
            <p style="margin-top:10%">人员流出总统及</p>
            <p>100万/次</p>
          </div>
        </div>
        <div class="tapp">
          <div class="tLeft">
            <img src="../../../assets/img/center-details-data2.png" alt="" />
          </div>
          <div class="tRight">
            <p style="margin-top:10%">人员流动总统计</p>
            <p>100万/次</p>
          </div>
        </div>
        <div class="tapp">
          <div class="tLeft">
            <img src="../../../assets/img/center-details-data3.png" alt="" />
          </div>
          <div class="tRight">
            <p style="margin-top:10%">人员流入总统计</p>
            <p>100万/次</p>
          </div>
        </div>
      </div>
      <div class="topList">
        <div class="tapp">
          <div class="tLeft">
            <img src="../../../assets/img/center-details-data4.png" alt="" />
          </div>
          <div class="tRight">
            <p style="margin-top:10%">人员聚集预警统计</p>
            <p>100万/次</p>
          </div>
        </div>
        <div class="tapp">
          <div class="tLeft">
            <img src="../../../assets/img/center-details-data5.png" alt="" />
          </div>
          <div class="tRight">
            <p style="margin-top:10%">预警人员</p>
            <p>100万/次</p>
          </div>
        </div>
        <div class="tapp">
          <div class="tLeft">
            <img src="../../../assets/img/center-details-data6.png" alt="" />
          </div>
          <div class="tRight">
            <p style="margin-top:10%">区域统计</p>
            <p>100万/次</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dataList: [],
    };
  },
  computed: {
    ...mapGetters(["isFullScreen"]),
  },
};
</script>

<style scoped lang="scss">
.academic-traffic,
.body {
  width: 100%;
  height: 95%;
  // border: 1px red solid;
//   border-radius: 10px;
  .topList {
    width: 100%;
    height: calc(calc(13vh - 10px));
    display: flex;
    .tapp {
      width: 32%;
      height: 90%;
      margin: 10px 0 0 10px;
      border: 1px aqua solid;
      border-radius: 10px;
      display: flex;
      .tLeft {
        width: 35%;
        height: 100%;
        img {
          width: 90%;
          height: 80%;
          margin-top: 10px;
        }
      }
      .tRight {
        width: 65%;
        height: 100%;
        overflow: hidden;
        color: #B3F9FF;
      }
    }
  }
}
</style>
