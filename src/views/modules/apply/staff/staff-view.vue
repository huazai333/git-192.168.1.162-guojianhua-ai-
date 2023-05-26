<template>
	<el-dialog title="详情" :visible.sync="dialogVisible" width="700px" :close-on-click-modal="false">
		<div>
			<el-row>
				<el-col :span="3">照片：</el-col>
				<el-col :span="9">
					<el-image class="student-img" :src="$ImgServerUrl+dataForm.photo">
						<div slot="error" class="image-slot">
							<img class="student-img" src="../../../../assets/img/person.jpg">
						</div>
					</el-image>
				</el-col>
				<el-col :span="12">
					<el-row>
						<el-col :span="6">姓名：</el-col>
						<el-col :span="18">{{dataForm.name}}</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">性别：</el-col>
						<el-col :span="18">{{dataForm.sex | filterLabel('gender')}}</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">职工编号：</el-col>
						<el-col :span="18">{{dataForm.mobile}}</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">常驻单位：</el-col>
						<el-col :span="18">{{dataForm.unitName}}</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="3">联系电话：</el-col>
				<el-col :span="9">{{dataForm.mobile}}</el-col>
				<el-col :span="3">编号：</el-col>
				<el-col :span="9">{{dataForm.code}}</el-col>
			</el-row>
			<el-row>
				<el-col :span="3">身份证号：</el-col>
				<el-col :span="9">{{dataForm.idcard}}</el-col>
				<el-col :span="3">入职时间：</el-col>
				<el-col :span="9">{{dataForm.inTime | formatterInTime(dataForm.inTime)}}</el-col>
			</el-row>
			<el-row>
				<el-col :span="3"> 登记时间：</el-col>
				<el-col :span="9">{{dataForm.createTime}}</el-col>
				<el-col :span="3"> 登记人：</el-col>
				<el-col :span="9">{{dataForm.applyUserName}}</el-col>
			</el-row>
			<el-row>
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
			color: rgb(133, 127, 127);
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
