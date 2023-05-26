<template >

	<div class="detail_page">
		<div class="center">
			<div class="title">
				<h1>IMEI:{{ feature.imeis }} 档案信息</h1>
			</div> 
			<!-- feature -->
			<div class="item1 item">
				<div class="tit">
					<i class="el-icon-mobile-phone"></i>
					<span>设备信息</span> 
				</div>
				<div class="list">
					<el-row :gutter="10"> 
						<el-col :span="8">
							<div class="grid-content bg-purple">
								<span>系统类型：</span>
								<i>{{ feature.platform === 'A'?'安卓':'IOS' }}</i>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="grid-content bg-purple">
								<span>上报机型：</span> 
								<i>{{ feature.model }}</i>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="grid-content bg-purple">
								<span>设备品牌：</span>
								<i>{{ feature.brandNew }}</i>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="grid-content bg-purple">
								<span>操作系统：</span>
								<i>{{ feature.osVersion }}</i>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="grid-content bg-purple">
								<span>MAC：</span>
								<i>{{ feature.macAddress }}</i>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="grid-content bg-purple">
								<span>IMEI：</span>
								<i>{{ feature.imeis }}</i>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="grid-content bg-purple">
								<span>IMSI：</span>
								<i>{{ feature.imsis }}</i>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="grid-content bg-purple">
								<span>语言：</span>
								<i>{{ feature.lang }}</i>
							</div>
						</el-col>
					</el-row>
				</div>
			</div>
			<!-- trajectory --> 
			<div class="item2 item"> 
				<div class="tit">
					<i class="el-icon-map-location"></i>
					<span>位置信息</span>
				</div>
				<el-table :data="trajectory" style="width: 100%;margin-top:10px">
					<el-table-column
							prop="country"
							align="center"
							show-overflow-tooltip 
							label="国家">
					</el-table-column>
					<el-table-column
							prop="province"
							show-overflow-tooltip 
							align="center"
							label="省">
					</el-table-column>
					<el-table-column
							prop="city"
							show-overflow-tooltip 
							align="center"
							label="市">
					</el-table-column>
					<el-table-column
							prop="address"
							show-overflow-tooltip 
							align="center"
							label="地址">
						<template slot-scope="scope">
								{{(scope.row.area).replace('\\N','') + (scope.row.district).replace('\\N','') + (scope.row.town).replace('\\N','') + (scope.row.village).replace('\\N','') + (scope.row.road).replace('\\N','')}}
						</template>
					</el-table-column>
					<el-table-column
							prop="lng"
							show-overflow-tooltip 
							align="center"
							label="经度">
					</el-table-column>
					<el-table-column
							align="center"
							show-overflow-tooltip 
							prop="lat"
							label="纬度">
					</el-table-column>
					<el-table-column
							align="center"
							show-overflow-tooltip 
							prop="coordinateSource"
							label="地址来源">
					</el-table-column>
					<el-table-column
							:formatter="dataFormat"
							align="center"
							show-overflow-tooltip 
							prop="itime"
							label="上报时间">
					</el-table-column>
				</el-table>
			</div>
			<!-- app -->
			<div class="item3 item">
				<div class="tit">
					<i class="el-icon-goods"></i>
					<span>App信息</span>
				</div>
				<el-table :data="app.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%;margin-top:10px">

					<el-table-column
								fit="true"
								prop="packages"
								align="center"
								show-overflow-tooltip 
								label="包名"
								width="250" >
						</el-table-column>
						<el-table-column
								prop="name"
								align="center"
								show-overflow-tooltip 
								label="应用名">
						</el-table-column>
						<el-table-column
								prop="appVer"
								align="center"
								show-overflow-tooltip 
								label="应用版本">
						</el-table-column>
						<el-table-column
								prop="installType"
								align="center"
								show-overflow-tooltip 
								label="应用类型">
							<template slot-scope="scope">
								<span v-if="scope.row.installType=='-1'" style="color:white;"> 未知</span>
								<span v-else-if="scope.row.installType=='0'" style="color:white;"> 普通应用</span>
								<span v-else-if="scope.row.installType=='1'" style="color:white;"> 系统应用</span>
								<span v-else-if="scope.row.installType=='2'" style="color:white;"> 系统应用后来升级过</span>
								<span v-else-if="scope.row.installType=='3'" style="color:white;"> 预装应用</span>
							</template>
						</el-table-column>
						<el-table-column
								prop="firstReportTime"
								align="center"
								show-overflow-tooltip 
								label="首次安装时间">
						</el-table-column>
						<el-table-column
								prop="lastReportTime"
								align="center"
								show-overflow-tooltip 
								label="最后安装时间">
						</el-table-column>
						<el-table-column
								prop="installType"
								align="center"
								show-overflow-tooltip 
								label="卸载次数">
						</el-table-column>
						<el-table-column
								prop="status"
								align="center"
								show-overflow-tooltip 
								label="应用状态">
							<template slot-scope="scope">
								<span v-if="scope.row.status=='0'" style="color:#f56c6c;"> 卸载</span>
								<span v-else-if="scope.row.status=='1'" style="color:#67C23A;"> 保留</span>
								<span v-else-if="scope.row.status=='2'" style="color:#67C23A;"> 新安装</span>
							</template>
						</el-table-column>
						<el-table-column
								:formatter="dataFormat1"
								prop="lastReportTime"
								align="center"
								show-overflow-tooltip 
								label="上报时间">

						</el-table-column>
				</el-table>
			</div>
			<!-- trajectory -->
			<div class="item1 item">
				<div class="tit">
					<i class="el-icon-magic-stick"></i>
					<span>热点信息</span>
				</div>
				<el-table :data="trajectory" style="width: 100%;margin-top:10px">
					<el-table-column
								prop="ssid"
								show-overflow-tooltip 
								align="center"
								label="热点名称">
						</el-table-column>
						<el-table-column
						show-overflow-tooltip 
								align="center"
								prop="ip"
								label="ip">
						</el-table-column>
						<el-table-column 
						show-overflow-tooltip 
								align="center"
								prop="wifi"
								label="WIFMAC">
						</el-table-column>
						<el-table-column
								:formatter="dataFormat"
								show-overflow-tooltip 
								align="center"
								prop="itime"
								label="连接时间">
						</el-table-column>
						<el-table-column
						show-overflow-tooltip 
								align="center"
								prop="type"
								label="连接类型">
						</el-table-column>
						<el-table-column
						show-overflow-tooltip 
								align="center"
								prop="networkType"
								label="数据源">
						</el-table-column>
						<el-table-column
						show-overflow-tooltip 
								align="center"
								prop="coordinate"
								label="经纬度">
		&lt;!&ndash;                    <template slot-scope="scope">
								{{(scope.row.lng + ',' + scope.row.lng)}}
							</template>&ndash;&gt;
						</el-table-column>
						<el-table-column
						show-overflow-tooltip 
								align="center"
								:formatter="dataFormat"
								prop="itime"
								label="上报时间">
						</el-table-column>
				</el-table>
			</div>
			<!-- trajectory -->
			<div class="item1 item">
				<div class="tit">
					<i class="el-icon-cpu"></i>
					<span>基站信息</span>
				</div>
				<el-table
						:data="trajectory"
						style="width: 100%;margin-top:10px">
					<el-table-column
					show-overflow-tooltip 
								align="center"
								prop="cellId"
								label="基站ID">
						</el-table-column>
						<el-table-column
						show-overflow-tooltip 
								align="center"
								prop="locationAreaCode"
								label="区域代码">
						</el-table-column>
						<el-table-column
						show-overflow-tooltip 
								align="center"
								prop="mobileCountryCode"
								label="接入号码">
						</el-table-column>
						<el-table-column
						show-overflow-tooltip 
								align="center"
								prop="mobileNetworkCode"
								label="网络代码">
						</el-table-column>
						<el-table-column
						show-overflow-tooltip 
								align="center"
								prop="radioType"
								label="上网模式">
						</el-table-column>
						<el-table-column
						show-overflow-tooltip 
								align="center"
								prop="networkType"
								label="网络类型">
						</el-table-column>
						<el-table-column
						show-overflow-tooltip 
								align="center"
								prop="coordinate"
								label="坐标信息">
						</el-table-column>
						<el-table-column
						show-overflow-tooltip 
								align="center"
								:formatter="dataFormat"
								prop="itime"
								label="上报时间">
						</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
  
</template>
 
<script>
export default {
	data() {
		return {
			dataList: [],
			checkList: [],
			tableData: [],
			trajectory: [],
			feature: [],
			app: [],
			loading: false,
			pagesize: 20,
			currentPage: 1,
			deviceKey: "",
			appCount: "0",
			featureCount: "0",
			trajectoryCount: "0",
			size: "medium",
		};
	},
	computed: {
	},
	created() {
	},
	mounted() {
		this.getDeviceInfo(this.$route.query);
	},
	activated() {
		// 获取数据
		this.getDeviceInfo(this.$route.query);
	},
	methods: {
		passStatus() {
			this.$router.push({ name: "app-info", query: { key: this.key } });
		},
		add0(m) {
			return m < 10 ? "0" + m : m;
		},
		dataFormat: function (row) {
			let date = row.itime;
			// console.log(date);
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
		dataFormat1: function (row) {
			let date = row.lastReportTime;
			// console.log(date);
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
		getDeviceInfo(item) {
			// console.log(row)
			this.key = item.deviceKey;
			this.$http({ url: "/system/device/" + item.deviceKey, method: "get" }).then(
				({ data: res }) => {
					
					
					if (res.code !== 0) {
						return;
					}
					this.feature = {
						...item, 
						...res.data.feature,
					};

					//   this.feature = [this.feature][0];
					this.app = res.data.app;
					this.appCount = this.app.length;
					this.trajectory = res.data.trajectory;
					this.trajectoryCount = this.trajectory.length;

					// console.log(res)
					
				}
			);
		},
		renderHeader(h, params) {
		},
	},
};
</script>
<style lang="scss" scoped>

.detail_page {
	background: #fff;
	padding: 40px;
	.center {
		width: 100%;
		margin: 0 auto;
		.title {
			text-align: center;
			h1 {
				font-size: 30px;
				font-weight: bold;
				margin-top: 20px;
			}
		}
		.item{
			.tit {
				border-bottom: 2px solid #333;
				margin-top: 40px;
				display: flex;
				align-items: center;
				padding-bottom: 5px;
				margin-bottom: 30px;
				i {
					color: #333;
					font-size: 30px;
				}
				span {
					font-size: 20px;
					font-weight: bold;
					line-height: 1;
				}
			}
			.list{
				padding: 0 30px;
			}
		}
		.item1 {
			.list {
				.grid-content {
					font-size: 16px;
					line-height: 30px;
					span {
						color: #333;
						font-weight: bold;
					}
					i {
						color: #666;
					}
				}
			}
		}
		.item2 {
			.list {
				ul {
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					li {
						width: 33.33333%;
						margin-bottom: 20px;
						h5 {
						font-size: 18px;
						margin-bottom: 5px;
						}
						p {
						font-size: 16px;
						color: #666;
						line-height: 24px;
						span {
							color: #333;
						}
						}
					}
				}
			}
		}
		.item3 {
			.list {
				ul {
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					flex-wrap: wrap;
					li {
						width: 33.33333%;
						font-size: 16px;
						color: #666;
						line-height: 24px;
					}
				}
			}
		}
	}
}
</style>