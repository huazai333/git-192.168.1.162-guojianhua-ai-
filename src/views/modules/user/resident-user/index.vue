<template>
	<el-card shadow="never" class="aui-card--fill">
		<el-form ref="ruleForm" :model="dataForm" label-width="80px" inline>
			<el-form-item label="姓名" prop="name">
				<el-input v-model="dataForm.name" placeholder="请输入" clearable></el-input>
			</el-form-item>
<!--			<el-form-item label="职工编号" prop="code">
				<el-input v-model="dataForm.code" placeholder="请输入" clearable></el-input>
			</el-form-item>-->
			<el-form-item>
				<el-button @click="search">查询</el-button>
				<el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
				<!--<el-button type="primary" @click="addStaff">新建</el-button>-->
				<!--<el-button type="success" @click="uploadExcel">导入信息</el-button>-->
				<!--<el-button type="success" @click="uploadImg"  v-if="$hasPermission('system:scworkersarchives:importImg')">导入图片</el-button>-->
				<!--<el-button type="success" @click="exportHandle" v-loading="loading">导出信息</el-button>-->
			</el-form-item>
		</el-form>
		<el-table :data="dataList" @selection-change="checkListHandle">
			<!--<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>-->
			<el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
			<el-table-column label="照片">
				<template slot-scope="scope">
					<el-image class="student-img" :src="$ImgServerUrl+scope.row.photo" :preview-src-list="previewList">
						<div slot="error" class="image-slot">
							<img class="student-img" src="../../../../assets/img/person.jpg">
						</div>
					</el-image>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
			<el-table-column prop="unitName" label="常驻单位" show-overflow-tooltip></el-table-column>
			<el-table-column prop="code" label="编号" show-overflow-tooltip></el-table-column>
			<el-table-column prop="mobile" label="手机号码" show-overflow-tooltip></el-table-column>
			<el-table-column prop="sex" label="性别" :formatter="formatterSex" show-overflow-tooltip></el-table-column>
			<el-table-column prop="endTime" label="有效期" :formatter="formatterInTime" show-overflow-tooltip></el-table-column>
			<el-table-column prop="status" label="状态"  show-overflow-tooltip>
				<template slot-scope="scope">
					<el-tag v-if="scope.row.status === 1" size="small" type="success">正常</el-tag>
					<el-tag v-else-if="scope.row.status === 2" size="small" type="warning">失效</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<div>
						<el-button type="text" @click="viewHandle(scope.row)">详情</el-button>
						<!--<el-button type="text" @click="editHandle(scope.row)">修改</el-button>-->
						<el-button  type="text" size="small" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination :current-page="page" :page-sizes="[6,10, 20, 50, 100,500]" :page-size="limit" :total="total" layout="total, sizes, prev, pager, next, jumper"
		 @size-change="pageSizeChangeHandle" @current-change="pageCurrentChangeHandle">
		</el-pagination>
		<!-- 新增修改 -->
		<!--<add-or-update ref="addOrUpdate"></add-or-update>-->
		<!-- 查看 -->
		<view-staff ref="viewStaff"></view-staff>
		<!-- 批量上传图片 -->
		<upload ref="staffUploadImg" tips="支持jpg、png文件，文件大小不超过500kb，文件命名方式“工号_姓名”" accept="image/png,image/jpeg,image/jpg"
		 upload-url="/system/scworkersarchives/importImg"></upload>
		<!-- 批量上传信息 -->
		<upload ref="staffUploadExcel" template-url="./template/教职工信息导入表模板.xls" upload-url="/system/scworkersarchives/importInfoExcel"></upload>

	</el-card>
</template>

<script>
	import mixinViewModule from '@/mixins/view-module'
	/*import addOrUpdate from './staff/staff-add-or-update'*/
	import viewStaff from './view'
	import {
		getDictLabel
	} from '@/utils'
	import upload from '@/components/public/upload-excel-or-img'
	export default {
		mixins: [mixinViewModule],
		components: {
			/*addOrUpdate,*/
			viewStaff,
			upload
		},
		data() {

			return {
				mixinViewModuleOptions: {
					getDataListURL: '/system/resident/user',
					deleteURL: '/system/resident/user',
					getDataListIsPage: true,
					activatedIsNeed: false
				},
				limit: 6,
				dataForm: {
					name: '',
					code: ''
				},
				dataList: [],
				checkList: [],
				loading: false,
			}
		},
		computed: {
			previewList() {
				return this.dataList.map(item => {
					return this.$ImgServerUrl + item.photo
				})
			},
		},
		methods: {
			// 选择需要导出的人员
			checkListHandle(param) {
				this.checkList = param.map(item => {
					return item.scWaid
				})
			},
			// 导出
			exportHandle() {
				if (this.checkList.length === 0) {
					return this.$message.warning(`请勾选需要导出的数据`)
				}
				this.loading = true
				this.$http.post(`/system/scworkersarchives/pageExport`, this.checkList, {
					responseType: "blob"
				}).then(res => {
					const content = res.data;
					const blob = new Blob([content], {
						type: "application/vnd.ms-excel;charset=utf-8"
					});
					const fileName = "职工信息";
					if ("download" in document.createElement("a")) {
						const elink = document.createElement("a");
						elink.download = fileName;
						elink.style.display = "none";
						elink.href = URL.createObjectURL(blob);
						document.body.appendChild(elink);
						elink.click();
						URL.revokeObjectURL(elink.href);
						document.body.removeChild(elink);
					} else {
						navigator.msSaveBlob(blob, fileName);
					}
				}).catch(() => {}).finally(() => {
					this.loading = false
				})
			},
			addStaff() {
				this.$refs['addOrUpdate'].init()
			},
			search() {
				this.page = 1;
				this.query();
			},
			resetQuery() {
				this.page = 1;
				this.dataForm = {
					scWaname: '',
					scEmpno: ''
				};
				this.query();
			},
			viewHandle(row) {
				this.$refs['viewStaff'].init(row)
			},
			editHandle(row) {
				this.$refs['addOrUpdate'].init(row)
			},
			uploadExcel() {
				this.$refs['staffUploadExcel'].init()
			},
			uploadImg() {
				this.$refs['staffUploadImg'].init()
			},
			trackHandle(row) {
				this.$router.push({
					path: "/xwyl-track",
					query: {
						tid: row.scUwbid
					}
				})
			},
			formatterType(row) {
				return getDictLabel('employType', row.scEmptype)
			},
			formatterSex(row) {
				return getDictLabel('gender', row.sex)
			},
			formatterInTime(row){
				if (null !== row.endTime && row.endTime.length > 10) {
					return row.endTime.substring(0,10)
				}
				return row.endTime
			}
		}
	}
</script>
<style lang="scss" scoped>
	.el-table {
		.student-img {
			vertical-align: top;
				width: 33px;
			height: 40px;
		}
	}
</style>
