<template>
	<div class="dormitory-traffic">
		<div class="title">
			宿舍通行记录
			<div class="angle-border left-top-border"></div>
			<div class="angle-border right-top-border"></div>
			<div class="angle-border left-bottom-border"></div>
			<div class="angle-border right-bottom-border"></div>
		</div>
		<div>
			<el-table :data="dataList" style="width: 95%" :height="isFullScreen?'440':'300'">
				<el-table-column label="照片" align="center" width="80">
					<template slot-scope="scope">
						<el-image :src="$ImgServerUrl+ scope.row.imageUrl" fit='fill'>
							<div slot="error" class="image-slot">
								<img class="student-img" src="../../../assets/img/person.jpg">
							</div>
						</el-image>
					</template>
				</el-table-column>
				<el-table-column label="姓名" show-overflow-tooltip align="center" width="80">
					<template slot-scope="scope">
						<el-button type="text" size="mini" @click="routeHandle(scope.row.recognitionName)">{{scope.row.recognitionName}}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="temperature" label="体温(℃)" align="center" width="80">
					<template slot-scope="scope">
						<span v-if="scope.row.temperature<37.3" style="color:#67C23A;"> {{ scope.row.temperature}}</span>
						<span v-else style="color:#f56c6c;"> {{ scope.row.temperature }}</span>
					</template>
				</el-table-column>
				<el-table-column label="状态" align="center" width="80">
					<template slot-scope="scope">
						<span v-if="scope.row.verificationType==1" style="color:#67C23A;" class="el-icon-d-arrow-right"> {{ $getDictLabel("accessEquipType", scope.row.verificationType) }}</span>
						<span v-else style="color:#f56c6c;" class="el-icon-d-arrow-left"> {{ $getDictLabel("accessEquipType", scope.row.verificationType) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createDate" label="通行时间" align="center">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
import {
		mapGetters
	} from "vuex";
	export default {
		data() {
			return {
				dataList: [],
			}
		},
		created() {
			this.$http.get('/system/index/dormitoryPeerRecord')
				.then(({
					data: res
				}) => {
					if (res.code != 0) {
						return this.$message.error(res.msg)
					}
					if (res.data.length > 10) {
						this.dataList = res.data.slice(0, 5)
					}

				})
		},
		computed: {
			...mapGetters(['isFullScreen']),
		},
		activated() {
			const timer = setInterval(() => {
				this.getDataList();
			}, 3 * 1000);
			this.$once("hook:deactivated", () => {
				clearInterval(timer)
			})
			this.$once("hook:destroyed", () => {
				clearInterval(timer)
			})
		},
		methods: {
			getDataList() {
				this.$http.get('/system/index/dormitoryPeerRecord')
					.then(({
						data: res
					}) => {
						if (res.code != 0) {
							return this.$message.error(res.msg)
						}
						this.dataList = res.data
					})
			},
			routeHandle(name) {
				sessionStorage.setItem("peerName", name)
				this.$router.push({
					path: 'statistics-accessRecord'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.dormitory-traffic {
		color: #FFF;

		.el-image {
			width: 40px;
			height: 50px;
		}

		.title {
			font-size: 18px;
			line-height: 36px;
			background-color: #133C6F;
			width: 138px;
			text-align: center;
			position: relative;
			color: #fff;
			margin-bottom: 20px;

			.angle-border {
				position: absolute;
				width: 12px;
				height: 12px;
			}

			.left-top-border {
				top: -6px;
				left: -6px;
				border-left: 1px solid #01FFFF;
				border-top: 1px solid #01FFFF;
			}

			.right-top-border {
				top: -6px;
				right: -6px;
				border-right: 1px solid #01FFFF;
				border-top: 1px solid #01FFFF;
			}

			.left-bottom-border {
				bottom: -6px;
				left: -6px;
				border-left: 1px solid #01FFFF;
				border-bottom: 1px solid #01FFFF;
			}

			.right-bottom-border {
				bottom: -6px;
				right: -6px;
				border-right: 1px solid #01FFFF;
				border-bottom: 1px solid #01FFFF;
			}
		}

		.student-img {
			width: 50px;
			height: 50px;
		}

		/deep/ .el-table__body-wrapper::-webkit-scrollbar {
			width: 6px; // 横向滚动条
			height: 6px; // 纵向滚动条 必写
		}

		// 滚动条的滑块
		/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
			background-color: #555;
			border-radius: 3px;
		}
	}
</style>
