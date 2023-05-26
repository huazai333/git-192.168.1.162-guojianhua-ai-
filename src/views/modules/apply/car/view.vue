<template>
	<el-dialog title="详情" :visible.sync="dialogVisible" width="700px" :close-on-click-modal="false">
		<div>
			<el-row>
				<el-col :span="3">姓名：</el-col>
				<el-col :span="9">{{dataForm.name}}</el-col>
				<el-col :span="3">车牌号：</el-col>
				<el-col :span="9">{{dataForm.carNum}}</el-col>
			</el-row>
			<el-row>
				<el-col :span="3">联系电话：</el-col>
				<el-col :span="9">{{dataForm.mobile}}</el-col>
				<el-col :span="3">状态：</el-col>
				<el-col :span="9">{{dataForm.status | formatterStatus(dataForm.status)}}</el-col>
			</el-row>
			<el-row>
				<el-col :span="3">通行时间：</el-col>
				<el-col :span="9">{{dataForm.startDate | formatterInTime(dataForm.startDate)}} - {{dataForm.endDate | formatterInTime(dataForm.endDate)}}</el-col>
				<el-col :span="3"> 登记时间：</el-col>
				<el-col :span="9">{{dataForm.createTime}}</el-col>
			</el-row>
			<el-row>
				<el-col :span="3"> 登记人：</el-col>
				<el-col :span="9">{{dataForm.applyUserName}}</el-col>
				<el-col :span="3"> 描述：</el-col>
				<el-col :span="9">{{dataForm.describes}}</el-col>
			</el-row>
		</div>
	</el-dialog>
</template>
<script>
	import {
		getDictLabel
	} from '@/utils'
	export default {
		filters: {
			formatterStatus(status){
				if (1 === status) return '审核中'
				else if (2 === status) return '审核通过'
				else if (3 === status) return '审核不通过'
				else if (4 === status) return '已取消'
			},
			formatterInTime(timeStr){
				if (undefined !== timeStr && timeStr.length > 10) {
					return timeStr.substring(0,10)
				}
				return timeStr
			},
			filterLabel(val, type) {
				return getDictLabel(type, val)
			},
		},
		data() {
			return {
				dialogVisible: false,
				deptName:'',
				dataForm: {
					deptName : ''
				},
			}
		},
		methods: {
			init(data) {
				this.dataForm = { ...data
				};
				this.$http({url:'/sys/dept/' + this.dataForm.deptId,method:'get'}).then(({ data: res }) => {
					if (res.code !== 0) {
						return
					}

					this.deptName = res.data.name
				})
				this.dialogVisible = true;
			},
		}
	}
</script>
<style lang="scss" scoped>
	.el-dialog {
		.el-row {
			color: rgb(131, 129, 129);
			line-height: 35px;

			.el-col-3 {
				text-align: right;
			}

			.student-img {
				width: 106px;
				height: 150px;
			}
		}
	}
</style>
