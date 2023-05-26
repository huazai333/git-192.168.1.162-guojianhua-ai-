<template>
	<el-card shadow="never" class="aui-card--fill">
		<el-form ref="ruleForm" :model="dataForm" label-width="80px" inline>
			<el-form-item label="人员类型" prop="type">
				<el-select v-model="dataForm.type" placeholder="请选择" >
					<el-option v-for="item in genderList" :key="item.dictLabel" :label="item.dictLabel" :value="item.dictValue">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="人员姓名" prop="name">
				<el-input v-model="dataForm.name" placeholder="请输入"  clearable ></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="search">查询</el-button>
				<el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
				<el-button type="primary" @click="addStaff">新建</el-button>
				<el-button type="success" @click="exportHandle" v-loading="loading">导入信息</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="dataList" >
			<el-table-column prop="key" label="姓名"  align="center" width="210"></el-table-column>
			<el-table-column prop="model" label="身份证" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="brandNew" label="布控类型" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="osVersion" label="人员状态" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="timeZone" label="预警区域" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="lang" label="布控时间" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column label="轨迹分析" align="center">
				<template slot-scope="scope">
					<div>
						<el-button type="text" @click="viewHandle(scope.row)">轨迹分析</el-button>
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
	//import viewStaff from './view'
	/*import viewStaff from './staff/staff-view'*/
	import addOrUpdate from '@/views/modules/comprehensive-query/add-or-update/'
	import {
		getDictLabel,
		getDictDataList
	} from '@/utils'
	import upload from '@/components/public/upload-excel-or-img'
	export default {
		filters: {
			formatterDate(timeStr){
				if (undefined  !== timeStr && timeStr.length > 10) {
					return timeStr.substring(0,10)
				}
				return timeStr
			},
			filterLabel(val, type) {
				return getDictLabel(type, val)
			},
		},
		mixins: [mixinViewModule],
		components: {
			//viewStaff
			addOrUpdate
		},
		data() {

			return {
				mixinViewModuleOptions: {
				/*	getDataListURL: '/system/device',
					getDataListIsPage: true,
					activatedIsNeed: false,
					createdIsNeed:true*/
				},
				page:0,
				limit: 6,
				genderList: getDictDataList('informationType'),
				dataForm: {
					name: '',
					type:'3'
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
			search() {
				this.page = 0;
				this.query();
			},
			addStaff() {
				this.$refs['addOrUpdate'].init()
			},
			resetQuery() {
				this.page = 0;
				this.dataForm = {
					scWaname: '',
					scEmpno: ''
				};
				this.query();
			},
			viewHandle(row) {
				console.log(row)
				this.$router.push({ name: 'equipment-info',query:row})
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
			width: 53px;
			height: 70px;
		}
	}
</style>
