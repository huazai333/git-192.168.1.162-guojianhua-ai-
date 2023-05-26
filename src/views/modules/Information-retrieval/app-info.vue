<template>
	<el-card shadow="never" class="aui-card--fill">
		<el-table
				:data="app"
				style="width: 100%">
			<el-table-column label="">
				<template slot="header" slot-scope="scope">
					应用信息
				</template>
				<el-table-column
						fit="true"
						prop="packages"
						align="center"
						label="包名"
				        width="250" >
				</el-table-column>
				<el-table-column
						prop="name"
						align="center"
						label="应用名">
				</el-table-column>
				<el-table-column
						prop="appVer"
						align="center"
						label="应用版本">
				</el-table-column>
				<el-table-column
						prop="installType"
						align="center"
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
						label="首次安装时间">
				</el-table-column>
				<el-table-column
						prop="lastReportTime"
						align="center"
						label="最后安装时间">
				</el-table-column>
				<el-table-column
						prop="installType"
						align="center"
						label="卸载次数">
				</el-table-column>
				<el-table-column
						prop="status"
						align="center"
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
						label="上报时间">

				</el-table-column>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	export default {
		data() {

			return {
				dataList: [],
				checkList: [],
				tableData:[],
				trajectory:[],
				feature: [],
				app:[],
				loading: false,
				pagesize: 20,
				currentPage:1,
			}
		},
		computed: {
		},
		created() {
			console.log(this.$route.query.key)
			this.getDeviceInfo(this.$route.query.key);
		},
		mounted(){
			/*console.log(this.$route.query.key)
			this.getDeviceInfo(this.$route.query.key);*/
		},
		methods: {
			 add0(m){return m<10?'0'+m:m },
			dataFormat:function(row){
				let date = row.itime
				console.log(date )
				if (date){
					let time = new Date(date*1000);
					let y = time.getFullYear();
					let m = time.getMonth()+1;
					let d = time.getDate();
					let h = time.getHours();
					let mm = time.getMinutes();
					let s = time.getSeconds();
					return y +'-'+ this.add0(m) + '-'+ this.add0(d) +' '+ this.add0(h) + ':'+ this.add0(mm) + ':'+ this.add0(s);
				}
				return ''
			},
			dataFormat1:function(row){
				let date = row.lastReportTime
				console.log(date )
				if (date){
					let time = new Date(date*1000);
					let y = time.getFullYear();
					let m = time.getMonth()+1;
					let d = time.getDate();
					let h = time.getHours();
					let mm = time.getMinutes();
					let s = time.getSeconds();
					return y +'-'+ this.add0(m) + '-'+ this.add0(d) +' '+ this.add0(h) + ':'+ this.add0(mm) + ':'+ this.add0(s);
				}
				return ''
			},
			getDeviceInfo(key) {
				this.$http(
						{ url: '/system/device/' + key, method: 'get' }).then(({ data: res }) => {
					if (res.code !== 0) {
						return
					}
					this.app = res.data.app;

				})
			}

		}
	}
</script>
<style lang="scss" scoped>
	.el-table {
		.student-img {
			vertical-align: top;
			width: 53px;
			height: 70px;
		}
	}
</style>
