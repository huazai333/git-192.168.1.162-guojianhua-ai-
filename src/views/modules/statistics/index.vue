<template>
	<el-card shadow="never" class="aui-card--fill">
		<el-form ref="ruleForm" :model="dataForm" label-width="80px" inline>
			<el-form-item label="账号" prop="id">
				<el-select v-model="dataForm.id" placeholder="请选择" clearable filterable>
					<el-option v-for="item in eqList" :key="item.id" :label="item.username" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
<!--			<el-form-item label="职工编号" prop="code">
				<el-input v-model="dataForm.code" placeholder="请输入" clearable></el-input>
			</el-form-item>-->
			<el-form-item>
				<el-button @click="search">查询</el-button>
				<el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
				<el-button type="primary" @click="addStaff">新建</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="dataList" @selection-change="checkListHandle">
			<el-table-column prop="userId" label="预警账号ID" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userName" label="预警账号" show-overflow-tooltip></el-table-column>
			<el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<div>
						<el-button  type="text" size="small" @click="deleteHandle(scope.row.warningId)">{{ $t('delete') }}</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination :current-page="page" :page-sizes="[6,10, 20, 50, 100,500]" :page-size="limit" :total="total" layout="total, sizes, prev, pager, next, jumper"
		 @size-change="pageSizeChangeHandle" @current-change="pageCurrentChangeHandle">
		</el-pagination>
		<add-or-update ref="addOrUpdate"></add-or-update>
	</el-card>
</template>

<script>
	import mixinViewModule from '@/mixins/view-module'
	/*import addOrUpdate from './staff/staff-add-or-update'*/
	import addOrUpdate from '@/views/modules/statistics/add-or-update/'
	import {
		getDictLabel
	} from '@/utils'

	export default {
		mixins: [mixinViewModule],
		components: {
			/*addOrUpdate,*/
			addOrUpdate
		},
		data() {

			return {
				mixinViewModuleOptions: {
					getDataListURL: '/system/feven/waring',
					deleteURL: '/system/feven/waring',
					getDataListIsPage: true,
					activatedIsNeed: false
				},
				limit: 6,
				dataForm: {
					id: '',
					username: ''
				},
				dataList: [],
				checkList: [],
				eqList:[],
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
		created() {
			this.getEquipList()
		},
		methods: {
			getEquipList() {
				this.$http({
					url: "/sys/user/getAll",
					method: "get"
				}).then(({
							 data: res
						 }) => {
					if (res.code != 0) {
						return this.$message(res.msg)
					}
					this.eqList = res.data
					console.log(this.eqList)
				})
			},
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
