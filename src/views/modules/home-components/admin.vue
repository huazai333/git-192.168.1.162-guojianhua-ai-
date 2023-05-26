<template>
	<!-- <div>
		<el-row :gutter="20">
			<el-col :span="8">
				<div class="grid-content bg-all">
					<i class="el-icon-menu"></i>
					<div>
						<p>{{ all }}</p>
						<p>全部</p>
					</div>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="grid-content bg-finshed">
					<i class="el-icon-finished"></i>
					<div>
						<p>{{ Finished }}</p>
						<p>已完成</p>
					</div>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="grid-content bg-unfinshed">
					<i class="el-icon-refresh-left"></i>
					<div>
						<p>{{ incomplete }}</p>
						<p>未完成</p>
					</div>
				</div>
			</el-col>
		</el-row>

		<div style="height: 20px"></div>

		<el-row :gutter="20">
			<el-col :span="8">
				<div class="grid-content bg-alarm">
					<i class="el-icon-alarm-clock"></i>
					<div>
						<p>{{ equipment }}</p>
						<p>设备预警</p>
					</div>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="grid-content bg-alarm">
					<i class="el-icon-alarm-clock"></i>
					<div>
						<p>{{ wifi }}</p>
						<p>热点预警</p>
					</div>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="grid-content bg-alarm">
					<i class="el-icon-alarm-clock"></i>
					<div>
						<p>{{ region }}</p>
						<p>区域预警</p>
					</div>
				</div>
			</el-col>
		</el-row>

		<el-row>
			<div style="min-height: 10vh"></div>
			<el-col :span="24">
				<academic-yunying></academic-yunying>
			</el-col>
		</el-row>
	</div> -->

	<div>
		<div class="container_left">
			<!-- 首页列表展示 -->
			<div class="list">
				<el-row :gutter="20">
					<el-col :span="8">
						<div class="grid-content bg-all">
							<i class="el-icon-menu"></i>
							<div>
								<p>{{ all }}</p>
								<p>全部</p>
							</div>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-finshed">
							<i class="el-icon-finished"></i>
							<div>
								<p>{{ Finished }}</p>
								<p>分析完成</p>
							</div>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-unfinshed">
							<i class="el-icon-refresh-left"></i>
							<div>
								<p>{{ incomplete }}</p>
								<p>分析中</p>
							</div>
						</div>
					</el-col>
				</el-row>
				<div style="height:20px"></div>
				<el-row :gutter="20">
					<router-link to="/eq-warning">
						<el-col :span="8">
							<div class="grid-content bg-alarm">
								<i class="el-icon-alarm-clock"></i> 
								<div>
									<p>{{ equipment }}</p>
									<p>设备预警</p>
								</div>
							</div>
						</el-col>
					</router-link>
					<router-link to="/wifi-warning">
					<el-col :span="8">
						<div class="grid-content bg-alarm">
							<i class="el-icon-alarm-clock"></i>
							<div>
								<p>{{ wifi }}</p>
								<p>热点预警</p>
							</div>
						</div>
					</el-col>
					</router-link>
					<router-link to="/base-qy">
					<el-col :span="8">
						<div class="grid-content bg-alarm">
							<i class="el-icon-alarm-clock"></i>
							<div>
								<p>{{ region }}</p>
								<p>区域预警</p>
							</div>
						</div>
					</el-col>
					</router-link>
				</el-row>
			</div>
			<div style="height:20px"></div>
			<!-- 首页柱形图 -->
			<academic-yunying></academic-yunying>
		</div>
		<div class="container_right">
			<!-- 首页饼状图 -->
			<academic-pie></academic-pie>
			<div style="height:20px"></div>
			<!-- 首页列表 -->
			<academic-news></academic-news>
		</div>
	</div>

			
</template>

<script>
import AcademicYunying from "../home-cell-components/academic-yunying.vue";
import AcademicPie from "../home-cell-components/academic-pie.vue";
import AcademicNews from "../home-cell-components/academic-news.vue";
export default {
  components: {
    AcademicYunying,
	AcademicPie,
	AcademicNews
  },
  data() {
    return {
      begin: null, //定时器名称
      all: null,
      Finished: null,
      incomplete: null,
      equipment: null,
      wifi: null,
      region: null,
    };
  },
  created() {
    //  this.begin = setInterval(()=>{
    this.getData();
    //  },3000);
  },
  methods: {
    getData() {
      this.$http("/hadoop/task/getState?state=0").then((res) => {
        this.all = res.data.data;
      });
      this.$http("/hadoop/task/getState?state=4").then((res) => {
        this.Finished = res.data.data;
      });
      this.$http("/hadoop/task/getState?state=5").then((res) => {
        this.incomplete = res.data.data;
      });
      this.$http("/system/devicewarning/count").then((res) => {
        this.equipment = res.data.data;
      });
      this.$http("/system/ssidwarning/count").then((res) => {
        this.wifi = res.data.data;
      });
      this.$http("/system/areawarning/count").then((res) => {
        this.region = res.data.data;
      });
    },
  },
  beforeDestroy() {
    console.log("关闭页面");
    clearInterval(this.begin);
    this.begin = null;
  },
};
</script>

<style scoped lang="scss">
// .bg-all {
// 	background: #5583ee;
// }
// .bg-finshed {
// 	background: #67c23a;
// }
// .bg-unfinshed {
// 	background: #f56c6c;
// }
// .bg-alarm {
// 	background: #e6a23c;
// }
// .grid-content {
// 	display: flex;
// 	border-radius: 4px;
// 	min-height: 100px;
// 	align-items: center;
// 	i{
// 		font-size: 70px;
// 		color: #eee;
// 		margin: 0 20px;
// 	}
// 	p {
// 		text-align: center;
// 		// line-height: 10px;
// 		text-shadow: 1px 1px 0px rgb(211, 211, 214);
// 		font-size: 25px;
// 		color: #fff;
// 	}
// }

.container_left{
	width: 70%;
	float: left;
	.bg-all {
		background: #5583ee;
	}
	.bg-finshed {
		background: #67c23a;
	}
	.bg-unfinshed {
		background: #f56c6c;
	}
	.bg-alarm {
		background: #e6a23c;
	}
	.grid-content {
		display: flex;
		border-radius: 4px;
		min-height: 140px;
		align-items: center;
		i{
			font-size: 70px;
			color: #eee;
			margin: 0 20px;
		}
		p {
			text-align: center;
			// line-height: 10px;
			text-shadow: 1px 1px 0px rgb(211, 211, 214);
			font-size: 25px;
			color: #fff;
		}
	}
}
.container_right{
	width: 29%;
	float: right;
}
</style>