<template>
	<el-dialog title="下发" width="450px" :visible.sync="dialogVisible" :close-on-click-modal="false">
		<div style="height: 300px;width: 450px">
			<el-tree
					:data="deptList"
					:props="{ label: 'name', children: 'children' }"
					node-key="id"
					ref="deptListTree"
					accordion
					:check-strictly="true"
					show-checkbox>
			</el-tree>
		</div>
		<el-form ref="form" label-width="80px" inline>
			<el-form-item>
				<el-button type="success" @click="sendFace">下发</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>
<script>
	import {
		getDictDataList
	} from "@/utils";
	export default {
		props: {
			aeids: {
				type: Array,
				default: []
			},
			accessType: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				deptList:[],
				dialogVisible: false,

				total: 0,
				pageInfo: {
					page: 1,
					limit: 10
				},
				checkedList: [],
				dataList: [],

			};
		},

		computed: {

		},
		methods: {
			init() {
				this.dialogVisible = true;

				this.getDeptList();
			},
			// 获取部门列表
			getDeptList () {
				return this.$http.get('/sys/dept/list').then(({ data: res }) => {
					if (res.code !== 0) {
						return this.$message.error(res.msg)
					}
					this.deptList = res.data
				}).catch(() => {})
			},
			search() {
				this.pageInfo.page = 1;
			},

			sendFace() {

				// console.log({
				// 	fiveDoors: this.aeids,
				// 	ids: this.userids,
				// })
				// return



				if (this.checkedList.length == 0) {
					return this.$message.warning(`请勾选需要变更密码的设备`)
				}
				this.$http(this.accessType === "eight" ? {
					url: "/system/scaidooreight/transfacelisttodoor",
					method: "post",
					timeout: 0,
					data: {
						aeids: this.aeids,
						userids: this.userids,
						usertype: this.dataForm.type
					}
				} : {
					url: "/system/fvscdevice/saveEqToFace",
					method: "post",
					timeout: 0,
					data: {
						fiveDoors: this.aeids,
						ids: this.userids,
						// userids: this.userids,
						// usertype: this.dataForm.type
					}
				}).then(({
					data: res
				}) => {
					if (res.code != 0) {
						return this.$message.error(res.msg)
					}
					this.$message.warning("正在下发中...")
					// this.$message.success('所选人员已下发到指定设备')
					// this.$parent.$parent.query();
				})
			},
			handleSelectionChange(data) {
				this.checkedList = data;
			},
			pageSizeChangeHandle(size) {
				this.pageInfo.limit = size;
				this.query()
			},
			pageCurrentChangeHandle(page) {
				this.pageInfo.page = page;
				this.query()
			},
		},
	};
</script>
<style lang="scss" scoped>
	.el-dialog {
		.el-button {
			margin-left: 20px;
		}

		.el-table {
			.student-img {
				vertical-align: top;
					width: 33px;
			height: 40px;
			}
		}
	}
</style>
